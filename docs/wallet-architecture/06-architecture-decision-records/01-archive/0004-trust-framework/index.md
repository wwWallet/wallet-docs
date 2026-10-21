---
sidebar_label: ADR 4. Trust framework
sidebar_class_name: wwcard-list
---

# 4. Trust framework

Date: 2026-10-05

Last updated: 2026-10-20

## Status

Work in progress

## Context

Credential issuers need evidence that they are interacting with a trusted wallet instance and that the keys receiving credentials meet their security requirements. Trust must also be withdrawn when the wallet instance or its key storage is compromised.

WE BUILD and EUDI ARF address these requirements through Wallet Unit Attestations (WUAs), comprised of Wallet Instance Attestations (WIAs) for client authentication and Key Attestations (KAs) for credential-key binding, together with revocation status lists.

## Decision

Attestation-Based Client Authentication (ABCA) will be implemented in `wallet-frontend` and `wallet-as`. The frontend will present a WIA and proof of possession at PAR and Token requests, including authenticated token refresh. The Authorization Server will validate the attestation, its proof of possession and the applicable WE BUILD requirements, establishing trust through configured Wallet Provider certificate trust anchors.

Wallet Provider WIA issuance and signed Token Status Lists will be implemented in `wallet-backend-server`, alongside its KA issuance functionality. The backend will issue attestations bound to wallet-supplied public keys, publish their revocation status and support revoking the associated wallet account's attestations.

The [Wallet Unit Attestations decision](./01-wallet-unit-attestations.md) records whether the implementation will obtain multiple WIAs on a single issuance or change the wallet-state schema, as well as whether it will target the WE BUILD profile, or also support broader ABCA-12 features.

## Consequences

### Positive

- Authorization Servers can authenticate wallet instances at PAR and Token endpoints using attestations from trusted Wallet Providers and proof of possession.
- Published status lists make wallet-account revocation observable to services validating attestations, and revoked accounts cannot obtain new attestations.
- The stack gains the attestation and status-list mechanisms needed for WE BUILD issuance interoperability.

### Negative

- Issuance and authenticated token refresh add Wallet Provider requests, increasing latency and introducing an additional availability dependency.
- Operators must configure Wallet Provider trust anchors and operate status-list publication and revocation services, including persistent storage and maintenance of revocation entries.
- Integrations must accommodate attestation headers, proof validation and revocation checks, increasing implementation and interoperability testing requirements.
