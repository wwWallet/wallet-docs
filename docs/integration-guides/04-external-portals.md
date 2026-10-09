---
title: Initiating Credential Issuance from External Applications
sidebar_position: 4
description: Let a trusted external application initiate credential issuance and distribute credential offers to compatible wallets.
---

# Initiating Credential Issuance from External Applications

The `wallet-issuer`'s Credential Offer API lets an external application start issuance after completing its own business process, such as confirming eligibility or selecting a credential. The application requests an offer from the issuer, which creates and stores the offer and returns its URI. The application can then distribute that URI directly or encode it in a QR code.

## Enable the Credential Offer API

The API is disabled by default. Enable it in the issuer environment and configure a strong bearer token:

```dotenv
CREDENTIAL_OFFER_API_ENABLED=true
CREDENTIAL_OFFER_API_BEARER_TOKEN=replace-with-a-random-secret
```

Restart the issuer after changing these values. When the API is disabled, the credential-offer route is not registered. When it is enabled without a bearer token, the issuer refuses to start.

Store the same token in the external application's secret configuration. Never expose it to browser or other public client code: possession of the token allows a caller to request offers for any supported credential configuration.

## Choose the credential configuration and grant

The external application must send exactly one credential configuration ID. Available IDs are listed in the issuer metadata at:

```http
GET https://issuer.example.org/.well-known/openid-credential-issuer/openid
```

Use one of the following grants:

- `authorization_code` redirects the user through the configured authorization server. Supply an opaque `issuer_state` that the issuer and claims source can use to identify the issuance transaction.
- `urn:ietf:params:oauth:grant-type:pre-authorized_code` creates an offer that does not require a separate authorization step. Supply an opaque `sub` that identifies the credential data to the issuer's claims source.

Use the authorization-code grant when the user should authenticate or authorize issuance at the authorization server. Use the pre-authorized-code grant when the external application has already performed the required checks and is trusted to start issuance directly.

## Request an offer

From a trusted server-side component, send a `POST` request to the issuer's `/api/credential-offer-uri` endpoint.

### Authorization-code offer

```json
curl --request POST 'https://issuer.example.org/api/credential-offer-uri' \
  --header 'Authorization: Bearer replace-with-a-random-secret' \
  --header 'Content-Type: application/json' \
  --data '{
    "credential_configuration_ids": ["urn:credential:example"],
    "grants": {
      "authorization_code": {
        "issuer_state": "issuance-transaction-123"
      }
    }
  }'
```

### Pre-authorized-code offer

```json
curl --request POST 'https://issuer.example.org/api/credential-offer-uri' \
  --header 'Authorization: Bearer replace-with-a-random-secret' \
  --header 'Content-Type: application/json' \
  --data '{
    "credential_configuration_ids": ["urn:credential:example"],
    "grants": {
      "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
        "sub": "issuance-transaction-123"
      }
    }
  }'
```

A successful request returns `201 Created`:

```json
{
  "credential_offer_uri": "https://issuer.example.org/openid/credential-offer/offer-reference"
}
```

If transaction codes are enabled for pre-authorized issuance, the response also contains `tx_code`. Deliver that code to the user separately from the offer.

## Distribute the credential offer

The returned `credential_offer_uri` points to the offer hosted by the issuer. The external application can deliver it in any form supported by the target wallet, such as a direct handoff or a QR code.

## Handle failures and offer lifetime

The API returns JSON errors with `error` and `error_description` fields. The calling application should handle the following status codes:

- `400` for an invalid request or unsupported credential configuration ID.
- `401` for a missing or invalid bearer token.
- `501` when the request contains an unsupported grant type.
- `500` when the issuer cannot create the offer.

Configure offer lifetimes and revocation behavior with the following environment variables:

- Use `CREDENTIAL_OFFER_TTL_MS` to give generated offers a finite lifetime.
- Set `REVOKE_CREDENTIAL_OFFERS=true` when an offer should be consumed the first time its reference is retrieved.
- For pre-authorized issuance, `PRE_AUTHORIZED_CODE_GRANT_TTL_MS` controls the lifetime of the generated pre-authorized code.

For additional setup and configuration guidance, see the [`wallet-issuer` README](https://github.com/wwWallet/wallet-issuer/blob/master/README.md).
