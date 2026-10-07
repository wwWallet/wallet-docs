---
description: Client-side credential issuance and presentation protocols, credential formats and supporting security standards.
---

# Communication Protocols and Standards

wwWallet implements credential issuance and presentation protocol logic on the client side. The wallet exchanges protocol messages with credential issuers and verifiers, while outbound HTTP requests may be transported through the wallet backend proxy or the optional Oblivious HTTP relay.

## Core credential exchange protocols

### OpenID for Verifiable Credential Issuance

[OpenID for Verifiable Credential Issuance 1.0 (OpenID4VCI)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-final.html) enables the wallet to request and receive credentials from an issuer.

| Area | Supported capabilities |
| --- | --- |
| Flow initiation and authorization | • Credential offers supplied by value through `credential_offer` or by reference through `credential_offer_uri`.<br />• OAuth 2.0 Authorization Code Grant and OpenID4VCI Pre-Authorized Code Grant.<br />• Public clients without a client secret.<br />• Credential authorization through `scope`, with `client_id`, `state`, optional `issuer_state` and optional `tx_code` as applicable to the selected flow.<br />• Credential Requests that select a `credential_configuration_id`. The `scope` parameter authorizes the credential; it does not identify the credential at the Credential Endpoint. |
| OAuth security | • PKCE using `S256`, as defined by [RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html).<br />• Pushed Authorization Requests (PAR), as defined by [RFC 9126](https://www.rfc-editor.org/rfc/rfc9126.html). The current Authorization Code flow requires the authorization server to advertise a PAR endpoint.<br />• DPoP-bound access tokens, as defined by [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html), when the authorization server advertises DPoP support. |
| Credential issuance | • JWT proofs and key-attestation proofs at the Credential Endpoint.<br />• Credential nonces obtained from the `nonce_endpoint`.<br />• Batch credential issuance, subject to the wallet's configured maximum accepted batch size.<br />• Deferred credential issuance using `transaction_id` and polling of the Deferred Credential Endpoint.<br />• Optional encrypted Credential Requests and Credential Responses using JWE.<br />• Refresh tokens and reuse of an active authorization session when supported by the authorization server. |
| Discovery | • Credential Issuer Metadata, including signed metadata when provided.<br />• OAuth 2.0 Authorization Server Metadata discovery. |

### OpenID for Verifiable Presentations

[OpenID for Verifiable Presentations 1.0 (OpenID4VP)](https://openid.net/specs/openid-4-verifiable-presentations-1_0-final.html) enables the wallet to respond to a verifier's authorization request by presenting selected credentials.

| Area | Supported capabilities |
| --- | --- |
| Authorization requests | • The `x509_san_dns` and `x509_hash` client identifier schemes.<br />• Signed JWT Authorization Request Objects supplied by reference through `request_uri`, following JWT-Secured Authorization Requests ([RFC 9101](https://www.rfc-editor.org/rfc/rfc9101.html)). There is no `signed_request_uri` parameter.<br />• Credential and claim selection using the Digital Credentials Query Language (DCQL).<br />• The `nonce` parameter for holder binding and replay protection.<br />• The `state` parameter for correlating authorization requests and responses.<br />• Optional `transaction_data` processing and validation. |
| Authorization responses | • `response_type=vp_token` and presentation responses carried in `vp_token`.<br />• The `direct_post` and encrypted `direct_post.jwt` response modes. The bundled verifier uses `direct_post.jwt` by default. |

## Credential formats

The issuance and presentation protocols carry credentials in the following formats:

| Format | Support |
| --- | --- |
| **SD-JWT VC (`dc+sd-jwt`)** | • Selective-disclosure credentials based on [SD-JWT-based Verifiable Digital Credentials (SD-JWT VC)](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/).<br />• The legacy `vc+sd-jwt` identifier is also accepted for presentations. |
| **ISO mdoc (`mso_mdoc`)** | Mobile documents based on ISO/IEC 18013-5. |

## Supporting OAuth and JOSE standards

The core exchanges depend on the following standards:

| Standard | Role |
| --- | --- |
| [OAuth 2.0 Authorization Framework (RFC 6749)](https://www.rfc-editor.org/rfc/rfc6749.html) | Provides the Authorization Code Grant. |
| [OAuth 2.0 Authorization Server Metadata (RFC 8414)](https://www.rfc-editor.org/rfc/rfc8414.html) | Enables authorization-server discovery. |
| [OAuth 2.0 Token Introspection (RFC 7662)](https://www.rfc-editor.org/rfc/rfc7662.html) | Used by the bundled issuer to validate access tokens. |
| [JWT `cnf` confirmation claims (RFC 7800)](https://www.rfc-editor.org/rfc/rfc7800.html) | Provides proof-of-possession key binding. |
| JOSE standards:<br />• [JWS (RFC 7515)](https://www.rfc-editor.org/rfc/rfc7515.html)<br />• [JWE (RFC 7516)](https://www.rfc-editor.org/rfc/rfc7516.html)<br />• [JWK (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517.html)<br />• [JOSE algorithms (RFC 7518)](https://www.rfc-editor.org/rfc/rfc7518.html)<br />• [JWT (RFC 7519)](https://www.rfc-editor.org/rfc/rfc7519.html) | Used for signed and encrypted protocol messages. |

## Related wallet communication and security standards

These mechanisms are part of the wider wwWallet architecture but are not themselves credential issuance or presentation protocols:

| Mechanism | Role |
| --- | --- |
| [WebAuthn](https://www.w3.org/TR/webauthn-3/) with its [PRF extension](https://www.w3.org/TR/webauthn-3/#prf-extension)| Used for wallet authentication and local key protection. |
| [Oblivious HTTP (RFC 9458)](https://www.rfc-editor.org/rfc/rfc9458.html) | Available through the privacy gateway, which also uses [Binary HTTP Messages (RFC 9292)](https://www.rfc-editor.org/rfc/rfc9292.html). |

Support for a mechanism means that it is implemented by the relevant wwWallet component. It does not by itself imply certification or complete conformance with every optional requirement of the referenced specification.
