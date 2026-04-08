---
sidebar_position: 1
---

# Connect with an Authorization Server

Define the required parameters to integrate with an external Authorization Server.

## Overview

The Wallet Issuer component operates as a [OpenID for Verifiable Credentials Issuer](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html). To ensure that only authorized users or entities can request and receive verifiable credentials, the Issuer must outsource identity verification and token issuance to an external [OAuth Authorization Server (RFC6749)](https://datatracker.ietf.org/doc/html/rfc6749).

This integration ensures a secure handshake where the Wallet Issuer can:

- Validate incoming requests by communicating with the Authorization Server's introspection endpoint.

- Verify scopes to ensure the requester has the necessary permissions for specific credential types.

The following configuration steps outline how to establish this trust relationship using environment variables.

## Specify the URL of the Authorization Server

The first step to connect the Wallet Issuer component with an Authorization Server
is by defining the `AUTHORIZATION_SERVER_URL` environment variable variable. This variable is
mandatory since the Wallet Issuer component requires an externat Authorization Server component
to be operating.

## Scope alignment with the Authorization Server

In order for the Wallet Issuer component to interoperate with an Authorization Server, it is required
that both components agree on common scope names.

## Authenticate with the Introspection Endpoint of the Authorization Server


The current implementation of the Wallet Issuer component, implements the `client_secret_basic` introspection endpoint authentication mechanism as means of authentication with the [Token Introspection Endpoint(RFC7662)](https://datatracker.ietf.org/doc/html/rfc7662) of an Authorization Server component.

The configurations requires that the `INTROSPECTION_ENDPOINT_BASIC_AUTH_HEADER` environment variable is set.

The value of the `INTROSPECTION_ENDPOINT_BASIC_AUTH_HEADER` environment variable should be the base64-encoded credentials.

Example: `aXNzdWVyOnNlY3JldA==` which decodes to `issuer:secret`.
