---
sidebar_position: 3
---

# Configuring the supported credentials for an issuer


## Create a configurable supported credential using the SupportedCredentialProtocol

Verifiable Credentials that can be issued are described by the SupportedCredentialProtocol:

```ts
interface SupportedCredentialProtocol {
	getCredentialIssuerConfig(): CredentialIssuerConfig;
	getId(): string;
	getFormat(): VerifiableCredentialFormat;
	getTypes(): string[];
	getDisplay(): Display;

	getResources(userSession: UserSession): Promise<CategorizedRawCredential<any>[]>;
	signCredential(userSession: UserSession, holderDID: string): Promise<{ format: VerifiableCredentialFormat, credential: any }>;

	exportCredentialSupportedObject(): CredentialSupported;
}

```

Creating a custom credential to be issued is as simple as implementing the above functions for that credential.

1. Create a file in the `src/configuration` folder containing the custom credential's class, implementing `SupportedCredentialProtocol`.

```ts
class EdiplomasBlueprint implements SupportedCredentialProtocol {}
```

2. Implement the functions described on the `SupportedCredentialProtocol` interface.

```ts title=src/configuration/IssuersConfiguration.ts
...
uoaIssuer.addSupportedCredential(new EdiplomasBlueprint(uoaIssuer))

```

An example of the `SupportedCredentialProtocol` implementation is the `src/configuration/EdiplomasBlueprint.ts`