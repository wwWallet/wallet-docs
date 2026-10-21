# Wallet Unit Attestations

## Context

A WIA authenticates a wallet instance to an Authorization Server. A KA attests the keys to which credentials are bound. Supporting the WUA lifecycle raises two architectural decisions: whether the WIA belongs in the wallet-state schema, and whether the initial implementation should target WE BUILD or the broader ABCA-12 feature set.

Persisting the WIA alongside its issuance session preserves the same attestation across PAR and Token requests and avoids a second Wallet Provider call. However, adding this field requires a wallet-state schema version and migration, and persistence alone does not address attestation expiry before token exchange or refresh.

ABCA-12 supports capabilities beyond the immediate WE BUILD requirements, including DPoP combined mode. Implementing all of them initially would expand mode selection, metadata handling and interoperability testing before those capabilities are needed.

## Decision

### Keep the WIA out of the wallet-state schema

We will obtain a WIA before PAR and request a fresh WIA before token exchange and authenticated refresh, using the public key from the existing issuance-session DPoP fields. The matching private key signs the Client Attestation PoP JWT.

The WIA JWT will not be persisted in wallet state. We retain schema version 3 and the existing key and issuance-session persistence, accepting the additional Wallet Provider requests instead of introducing a schema migration for a short-lived artifact.

This replaces the alternative implemented on `feat/wua-lifecycle`, which added a WIA session field and schema version 4. Each newly requested WIA remains bound to the same session key and client ID. Replacement of the WIA between PAR and Token must be verified against target issuers, since CS-01, CS-04 and TS3 do not explicitly describe that replacement.

### Start with a WE BUILD-only profile

We will initially implement the WE BUILD profile in the frontend's attestation flow and the corresponding Authorization Server validation. This is the supported implementation scope; it does not require removing existing server configuration options or claim that every WE BUILD conformance requirement is already implemented.

The initial flow uses `attest_jwt_client_auth`: the WIA is accompanied by a separate Client Attestation PoP JWT, with independent DPoP proofs where enabled. The implementation uses the same session key for both proofs. The KA remains separate from the WIA and is presented with the credential proof for credential-key binding.

We will introduce broader ABCA-12 features, including `attest_jwt_client_auth_dpop` combined mode, proactive challenge retrieval and additional-security-signal handling in a future version, by extending the supported profiles, adding new profiles, and negotiating capabilities with the receiving server.

## Consequences

### Positive

- No WIA field, migration or additional schema version is needed in wallet state.
- Fresh attestations accommodate authorization delays and later token refresh while preserving the session key.
- The initial ABCA scope is bounded by WE BUILD, reducing implementation and testing complexity.

### Negative

- Provider outages, authentication failures or rate limits can interrupt token exchange and refresh.
- Each newly issued WIA currently allocates a fresh status-list entry, increasing backend work.
- Servers requiring combined mode or other deferred ABCA-12 capabilities will not be supported initially.

## References

- [CS-01: Credential Issuance](https://github.com/webuild-consortium/wp4-architecture/blob/main/conformance-specs/cs-01-credential-issuance.md)
- [CS-04: WUA Lifecycle](https://github.com/decentralised-dataexchange/wp4-architecture/blob/main/conformance-specs/cs-04-wua-lifecycle.md)
- [TS3: Wallet Unit Attestations](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md)
- [ABCA draft 12](https://www.ietf.org/archive/id/draft-ietf-oauth-attestation-based-client-auth-12.html)
