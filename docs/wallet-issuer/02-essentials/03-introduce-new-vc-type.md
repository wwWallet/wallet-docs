---
sidebar_position: 3
---

# Introduce a custom VC Type

The Wallet Issuer service currently supports EUDI PID ('dc+sd-jwt' and
'mso_mdoc' formats), Diploma, EHIC and Power of Representation
credential types. To support a different VC type, the following files need
to be configured:

- config/supportedCredentialConfiguration.ts
- config/accountFinder.ts

The file `config/supportedCredentialConfiguration.ts`
needs to be extended by defining a new Supported Credential Configuration Metadata entry
based on the schema defined in the section [12.2 Credential IssuerMetadata](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-credential-issuer-metadata). It is recommended that all credential configurations are assigned a unique `scope` value for simplicity purposes.

To define the way that claims will retrieved from an Data Provide depening on the requested `scope` the
the file `config/accountFinder.ts` needs to be extended to support the new scope value.

Note that the new `scope` value must be a scope that is aggreed with the Authorization Server that the Wallet Issuer service is connected with.

## New credential format support

To support a completely new credential format, aside from the above changes,
the signCredentials(.) function from the `lib/issuer` module needs to be extended to supported
that additional credential format.
