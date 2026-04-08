---
---

# function signCredentials()

The `signCredentials()` function is responsible for handling
the signing process of each credentail format. This function passes
all the required parameters to the credential signer instance to
sign a credential.


```ts
function signCredentials(
	credentialConfigurationId: string,
	metadata: OpenidCredentialIssuerMetadata,
	claims: GenericClaims,
	attestedKeys: JWK[],
	disclosureFrameMap: Map<string, Record<string, unknown>>,
	requestOpts: PlainIssueCredentialRequestOptions,
	createOpts: CredentialIssuerCreateOptions
): Promise<Result<string[], CredentialRequestError>>
```
