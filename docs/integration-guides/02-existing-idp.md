---
title: Connecting the Authorization Server to an Existing IdP
sidebar_position: 2
description: Delegate credential-issuance authentication to an existing OpenID Connect identity provider.
---

# Connecting the Authorization Server to an Existing IdP

The `wallet-as` component can delegate user authentication to an existing OpenID Connect (OIDC) identity provider. This lets users sign in with an account they already have while `wallet-as` acts as the OAuth 2.0 authorization server for `wallet-issuer` or other OpenID4VCI issuers that support the required authorization-server metadata, matching scopes and OAuth 2.0 token introspection.

The mode described here is part of the Authorization Code Grant flow.

## Authentication modes

`wallet-as` provides two authentication modes. Select one with the `AUTHENTICATOR` environment variable:

- `user-pass-pid` displays the built-in sign-in page. A user can sign in with the configured demo username and password or, for eligible scopes, present a PID from a wallet that is matched to a local account.
- `auth-broker` redirects the user to an external OIDC provider and completes the `wallet-as` interaction after the provider authenticates the user.

Use `auth-broker` when an organization already operates an IdP and wants it to remain responsible for authentication. Only one authenticator can be active in a `wallet-as` instance.

## How the broker flow works

During an authorization-code flow, `wallet-as` redirects the user to the external IdP. The IdP authenticates the user and returns an authorization code to the broker callback. `wallet-as` exchanges the code, validates the response and uses the `sub` claim from the returned ID token as the authenticated account identifier. It then resumes the original authorization request.

When the wallet later requests a credential, the issuer introspects the access token with `wallet-as` to confirm that it is active and obtain the authenticated subject and authorized scopes.

The current broker implementation uses only `sub` from the external IdP's ID token. Choose an IdP client configuration that returns a stable subject identifier and ensure that issuer-side records use the same identifier where the authenticated subject is used to select credential data.

## Register `wallet-as` at the IdP

Create an OIDC client at the existing IdP with:

- the authorization code flow enabled
- `openid` in the allowed scopes
- the exact broker callback URI as a redirect URI
- a client secret for a confidential client or no client secret for a public client.

For a deployment exposed at `https://issuer.example.org/as`, register this redirect URI:

```text
https://issuer.example.org/as/interaction/authBroker/callback
```

If the external IdP supports RP-initiated logout, confirm that the client registration permits it and accepts the `post_logout_redirect_uri` sent by `wallet-as`.

The provider must publish OIDC discovery metadata and its token response must include an ID token containing `sub`. The discovery, token and JWKS endpoints must be reachable from `wallet-as`.

## Configure `wallet-as`

Set the public service URL, route base path and broker settings in the `wallet-as` environment:

```dotenv
SERVICE_URL=https://issuer.example.org/as
BASE_PATH=/as

AUTHENTICATOR=auth-broker
AUTH_BROKER_PROVIDER_URL=https://idp.example.org/oidc
AUTH_BROKER_CLIENT_ID=wallet-as
AUTH_BROKER_CLIENT_SECRET=replace-with-a-secret
AUTH_BROKER_SCOPE="openid profile email"
AUTH_BROKER_REDIRECT_URI=https://issuer.example.org/as/interaction/authBroker/callback
AUTH_BROKER_SKIP_LOGOUT=true
```

- `SERVICE_URL` is the full public URL of the authorization server, including any path prefix, while `BASE_PATH` is the path where the application mounts its routes. With the values shown above, the reverse proxy should preserve the `/as` prefix: for example, a public request to `/as/interaction/authBroker/callback` must reach `wallet-as` at `/as/interaction/authBroker/callback`.

- `AUTH_BROKER_PROVIDER_URL` is the external IdP's issuer URL, not an individual authorization or token endpoint. `wallet-as` discovers those endpoints from the issuer metadata.

- `AUTH_BROKER_CLIENT_SECRET` is optional. If it is omitted, `wallet-as` treats the upstream client as public and uses `none` for token endpoint authentication.

- `AUTH_BROKER_SCOPE` is a space-separated list and defaults to `openid`. The broker currently uses only the ID token's `sub`, so request `profile`, `email` or other scopes only when required by the IdP's policy.

- `AUTH_BROKER_REDIRECT_URI` defaults to `SERVICE_URL` followed by `/interaction/authBroker/callback`. Set it explicitly when proxy routing changes the public URL. It must exactly match both the public callback route and the redirect URI registered at the IdP.

- `AUTH_BROKER_SKIP_LOGOUT` defaults to `false`, allowing `wallet-as` to end the external IdP session after authentication when logout is supported. Set it to `true` to preserve that session for later authentication requests or to disable external IdP logout.

The broker stores its pending request state in the same Valkey-compatible data store used for `wallet-as` OIDC state. In a multi-instance deployment, all instances must use the same data store so that a callback can be handled by a different instance from the one that started the flow.

For all authorization-server settings, see the [wallet-as README](https://github.com/wwWallet/wallet-as/blob/master/README.md).

## Verify the integration

Restart `wallet-as`, then start an issuance flow that uses the authorization code grant. A successful integration should:

1. redirect the wallet or browser from `wallet-as` to the configured IdP
2. return to `/interaction/authBroker/callback` after authentication
3. resume the original `wallet-as` authorization request
4. return to the issuance flow with an authorization code.

Test with a user whose external IdP `sub` is known and confirm that the expected credential data is selected. Also test an expired IdP session, a rejected login and a repeated sign-in to verify the desired logout or session-reuse behavior.
