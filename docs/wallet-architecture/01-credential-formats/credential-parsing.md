# Credential Parsing

A parser is responsible for recognizing a credential format and transforming it into a common `ParsedCredential` structure.

The normalized model contains:

* Credential metadata
* Issuer information
* Validity information
* Signed claims
* Display metadata and warnings

By exposing a common representation, wallet features can operate independently of the underlying credential format.

## Parser Selection

Parsers are registered with the `ParsingEngine`.

When a credential is parsed, the engine invokes registered parsers until one successfully recognizes and parses the credential. This allows multiple credential formats to coexist within the same wallet while keeping format-specific logic isolated within each parser implementation.

### Unsupported Formats

A parser should only handle credentials that belong to its supported format.

If a parser determines that a credential is not of the expected format, it should return an `UnsupportedFormat` parsing error so that the next registered parser can attempt to process the credential.

## Credential Display Metadata

Credential formats often contain only the information required for cryptographic verification.

To support a richer user experience, parsers may resolve and expose display metadata such as:

* Human-readable credential names
* Localized labels
* Claim descriptions
* Credential images
* SVG templates and rendering information

This metadata is surfaced through the normalized credential model and can originate from format-specific metadata registries or external resolution services.

### Metadata Sources

Display metadata may originate from different sources depending on the credential format and deployment configuration.

Common sources, prioritized by the order in which they are currently used, include:

1. External, format-specific configured VC Type Metadata registries (example, [wwWallet's VCT Registry](https://registry.wwwallet.org/) for [SD-JWT VC Type Metadata (VCT Metadata)](https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-16.html#name-display-metadata) for the `dc+sd-jwt` credential format).
2. [OID4VCI Credential Issuer Metadata](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-credential-issuer-metadata) for all credential formats.
3. Application-defined metadata overrides.