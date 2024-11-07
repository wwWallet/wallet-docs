---
sidebar_position: 2
---

# Credential Formats

### Currently supported formats

- `vc+sd-jwt`


### Credential format extension framework

The parsing of the credentials is centralized in the useContainer hook where all credential parsers are chained
in a [CredentialParserRegistry](https://github.com/wwWallet/wallet-frontend/blob/master/src/lib/interfaces/ICredentialParser.ts).

To add a credential parser in the chain, you would need to create an object that implements the ICredentialParser
interface and then include this parser in the rest of the chain by calling the addParser() function.

Keep in mind that the parsers are called in the same order that they have been added in the CredentialParserRegistry.

When a specific parser cannot parse the rawCredential, then it should throw an exception so that the next parser
of the chain can handle it.

We are currently using only one parser for the `vc+sd-jwt` which is defined on the [useContainer hook](https://github.com/wwWallet/wallet-frontend/blob/master/src/hooks/useContainer.ts).

This framework also gives the flexibility to hard-code specific credential display metadata for a specific issuer and vct, when these are absent from the possible sources.

The two sources that are currently used for the extraction of the display metadata for the `vc+sd-jwt` format are:

- OID4VCI Credential Issuer Metadata https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-wg-draft.html#name-credential-issuer-metadata-p
- SDJWT VC https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-05.html#name-display-metadata


The only exported attributes from a credential parser as defined on the [ICredentialParser](https://github.com/wwWallet/wallet-frontend/blob/master/src/lib/interfaces/ICredentialParser.ts) interface are `credentialFriendlyName`, `credentialImage`(containing the sources for the image) and `beautifiedForm` which is the JSON representation
of the credential.
