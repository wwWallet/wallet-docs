# Credential Verification

Verification is intentionally separate from parsing.

A credential may be successfully parsed but still fail verification due to invalid signatures, expired validity periods, missing trust anchors, or format-specific validation failures.

Verifiers are responsible for:

* Signature validation
* Issuer trust validation
* Public key resolution
* Validity period checks
* Format-specific security requirements

The verification result is intentionally format-agnostic, allowing higher-level wallet workflows to treat all credential formats consistently.

## Public Key Resolution

Many credential formats require external public keys for signature verification.

The Credential Engine provides a dedicated public key resolution framework that can be extended to support different trust infrastructures, including:

* DID Documents
* JWKS endpoints
* OpenID-based metadata
* Trusted registries
* Proprietary trust systems

Resolvers are independent of credential formats and can be reused across multiple verifiers.