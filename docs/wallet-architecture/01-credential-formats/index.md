---
sidebar_position: 1
---
# Credential Formats

wwWallet provides a pluggable framework for supporting multiple Verifiable Credential formats. Each format is integrated through two independent components:

* **[Credential Parser](./credential-parsing)**  — Converts a raw credential into the wallet's normalized credential model.
* **[Credential Verifier](./credential-verification)** — Validates the authenticity and integrity of a credential.

This separation allows new credential formats to be added without changing the core engine.

## Currently Supported Formats

| Name                 | Format      | Parser          | Verifier          |
| -------------------- | ----------- | --------------- | ----------------- |
| SD-JWT VC            | `dc+sd-jwt` | `SDJWTVCParser` | `SDJWTVCVerifier` |
| ISO/IEC 18013-5:2021 | `mso_mdoc`  | `MsoMdocParser` | `MsoMdocVerifier` |

Both parsers and verifiers are registered during credential engine initialization.

## Extending the Framework

Supporting a new credential format typically requires:

1. Implementing a [CredentialParser](https://github.com/wwWallet/wallet-common/tree/master/src/credential-parsers).
2. Implementing a [CredentialVerifier](https://github.com/wwWallet/wallet-common/tree/master/src/credential-verifiers).
3. Registering the parser with the [ParsingEngine](https://github.com/wwWallet/wallet-common/blob/master/src/ParsingEngine.ts).
4. Exposing the verifier through the application.

Once registered, the new format becomes a first-class participant in credential issuance, storage, display, presentation, and verification workflows without requiring changes to existing format implementations.
