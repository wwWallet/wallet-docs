---
sidebar_position: 2
---

# Configuring an issuer

## Initialize a legal person wallet

On the file `src/configuration/IssuersConfiguration.ts` you write code to read the keys of the legal persons and store them.
The keys must conform to the `LegalPersonWallet` type.

```ts title=src/configuration/IssuersConfiguration.ts
const uoaKeysPath = path.join(__dirname, '../../../keys/issuer-did.uoa.keys');
if(!fs.existsSync(uoaKeysPath))
	throw new Error('Keyfile does not exist');

const keysFile = fs.readFileSync(uoaKeysPath, 'utf-8'); // read keys from the file system
const uoaLegalPersonWallet = JSON.parse(keysFile) as LegalPersonWallet;


const legalPersonWallets: LegalPersonWallet[] = [];
legalPersonWallets.push(uoaLegalPersonWallet)
...
```


## Create an issuer instance

```ts title=src/configuration/IssuersConfiguration.ts
...
const uoaIssuer = new CredentialIssuerConfig(
	config.url + "/uoa",	// credential issuer identifier must be a unique url of the issuer
	uoaLegalPersonWallet,	// the Legal Person Wallet with which the credentials will be issued
	config.url,	// the authorization server url remains the same for all the issuers
	config.url + "/openid4vci/credential",	// Credential endpoint is the same for all issuers
);

export const issuersConfigurations = new Map<string, CredentialIssuerConfig>();
// issuers.set(mainIssuer.metadata.credential_issuer, mainIssuer);
issuersConfigurations.set(uoaIssuer.credentialIssuerIdentifier, uoaIssuer);

```