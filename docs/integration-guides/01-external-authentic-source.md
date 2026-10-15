---
title: Using an External Authentic Source
sidebar_position: 1
description: Configure the issuer to retrieve credential claims from an existing authoritative service.
---

# Using an External Authentic Source

The default development setup reads credential claims from a local file of sample account data, but
the issuer can instead retrieve them from an external authentic source at issuance time. This keeps
the claims in the system responsible for them, while the issuer handles the OpenID4VCI flow and
signs the resulting credential.

Claims sources are selected by credential scope. Different scopes can use different remote
services, while scopes without a remote source continue to use the local sample data. This makes it
possible to introduce an external source one credential type at a time.

## Set up the issuer's supported credentials

Before connecting a claims source, make sure its credential scope is configured in the issuer. The
issuer includes a base set of supported credentials and allows deployments to add or override
credential configurations locally. See the wallet-issuer
[README](https://github.com/wwWallet/wallet-issuer#local-credential-configuration-overrides) for the
file names and current configuration format.

## Confirm the authentic source's compatibility

The external service must expose an HTTP endpoint that the issuer can call when it needs the claims
for the subject associated with an issuance flow. The issuer sends a `POST` request containing:

- `data.sub`: the subject identifier supplied by the issuance flow
- `data.issuer_state`: the issuer state, when an authorization-code flow provides one

An API key is optional. If one is configured, the issuer sends it in the `x-api-key` header by
default.

The service is expected to return the claims under a top-level `data` property. For example, a successful response could be

```json
{
    "data": {
        "given_name": "Erika",
        "family_name": "Mustermann"
    }
}
```

The returned claim names and structure must match the credential configuration that uses the scope.
If the endpoint is unavailable or returns an unsuccessful or malformed response, the issuer denies
the credential request.

Treat the subject and issuer state as opaque correlation values. Avoid putting personal data in
either value and ensure the authentic source releases claims only for requests it is authorized to
serve.

## Select a claims source

Add a claims-source configuration file to the `wallet-issuer` repository and associate each
remote-backed scope with its external service. Keep the endpoint URL and optional API key in the
issuer's environment rather than in the configuration file.

See the
[wallet-issuer claims source documentation](https://github.com/wwWallet/wallet-issuer#claims-sources)
for the appropriate filename, configuration fields, defaults and environment-variable examples.

Restart the issuer after adding or changing the local configuration.

## Relevant issuer files

- `config/claimsSourceConfigurations.ts` loads and validates the per-scope source configuration.
- `config/supportedCredentialConfigurations.ts` defines the credentials and scopes the issuer supports.
- `src/claims/providers/RemoteClaimsProvider.ts` defines the request and response contract with a remote source.
