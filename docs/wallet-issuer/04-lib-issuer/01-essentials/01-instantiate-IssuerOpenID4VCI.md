---
position: 1
---

# Creating an IssuerOpenID4VCI object


```ts



// the Credential Request Store can be changed to a Database or Redis, by providing your
// own implementation of the GenericStore interface
const credentialRequestStore = new MemoryStore<string, CredentialRequestWithClaims>(10000);


export const credentialRequestHelper = createCredentialRequestHelper(credentialRequestStore);

export const issuer = createIssuerOpenID4VCI(config.url + '/openid', {
    stateStore: new MemoryStore<string, State>(10000), // can be changed to other store
    credentialOfferStore: new MemoryStore <string, CredentialOffer>(100000), // can be chaned to other store
	clockTolerance: config.clockTolerance,
	findAccount: findAccount,
	credentialRequestHelper,
	proofTypesSupported: [ProofTypesSupported.JWT, ProofTypesSupported.ATTESTATION],
	requireKeyBindingInCredentialConfigurationIds: [],
	getAllTrustedPemCertificates: localTrustedCertsManager.getAllPemCertificates,
	secret: secret,
	authorizationServerUrl: config.authorizationServerUrl,
	credentialSigner: signer,
	x5c: [pemToBase64(fs.readFileSync(path.join(__dirname, '../../../keys/pem.crt'), 'utf-8'))],
	introspectionEndpointBasicAuthString: config.introspectionEndpointBasicAuthString,
	credentialRequestEncryption: {
		encryptionRequired: false,
		keypair: {
			alg: config.jweEncryptionAlg,
			publicKeyJwk: publicKeyJwk,
			privateKeyJwk: privateKeyJwk,
		},
	},
	display: config.display,
	vctDocumentProvider: vctDocumentProvider,
});

Object.entries(supportedCredentialConfigurations).map(([credentialConfigurationId, conf]) => issuer.registerSupportedCredentialConfiguration(credentialConfigurationId, conf, disclosureFrameMap[credentialConfigurationId]));

```

