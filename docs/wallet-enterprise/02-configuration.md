---
sidebar_position: 2
---

# Configuration

## 1 Configuring an Issuer without VID Authentication

What follows is the explanation of the vid-issuer wallet-enterprise configuration that exists on the wallet-ecosystem repository.

The process of creating your own issuers starts with you creating a new wallet-ecosystem with a wallet-enterprise git submodule and a wallet-enterprise-configuration directory in which you will place all the files which will be mounted on the wallet-enterprise repository container's filesystem to override the default behaviour.

A wallet enterprise configuration should have the following structure:

```
├── config
│   └── index.ts
├── dataset
│   └── vid-dataset.xlsx
├── Dockerfile
├── keys
│   ├── pem.crt
│   ├── pem.key
│   ├── pem.server.crt
│   ├── pem.server.key
│   ├── x5c.json
│   └── x5c.server.json
├── public
│   ├── images
            ....
│   └── styles
│       └── styles.css
├── src
│   └── configuration
│       ├── authentication
│       │   ├── authenticationChain.ts
│       │   ├── LocalAuthenticationComponent.ts
│       │   └── VerifierAuthenticationComponent.ts
│       ├── datasetParser.ts
│       ├── issuerSigner.ts
│       ├── locale.ts
│       ├── main.ts
│       ├── SupportedCredentialsConfiguration
│       │   └── VIDSupportedCredentialSdJwt.ts
│       ├── titles.ts
│       └── verifier
│           └── VerifierConfigurationService.ts
└── views
    ├── header.pug
    └── index.pug
```

### 1.1 How to change the UI

By mounting the views/ and public/ directories you manipulate the user interface (UI) of the Wallet Enterprise. In the example, we changed the `index.pug` and `header.pug` files to alter the default landing page. To change the texts you can change the `src/configuration/locale.ts` file

### 1.2 How to define which private keys and certificates to use for signing operations

Currently, the Wallet Enterprise requires the private keys to be stored on the filesystem. We are looking forward to support other types of private key storages such as the Remote HSM. At the moment the dependency injection model that is used by the Wallet Enterprise can be used to implement and plug-in new signing methods instead of providing the private keys through the filesystem.

In the keys/ directory, the programmer of the wallet-enterprise software is instructed to place the private keys with the same naming. The keys that include the ".server." substring are the RSA SSL certificate chain with the corresponding private key in order to sign the request object (JAR) for the OpenID4VP Authorization Request.

The keys without the ".server." substring will be used for signing operations from the issuer when issuing a verifiable credential.

### 1.3 How to provide my own dataset for the credentials

In the `dataset/` directory you can replace the vid-dataset.xlsx with your own dataset in any format of file type. The default that is used across the wallet-ecosystem is the excel format. This is not tied with the core wallet-enterprise but with the configuration/ directory which we are going to explain further on the next section. Keep in mind that you will also need to provide your own dataset parser if you are planning to use a dataset in a different format or structure.

### 1.4 Authentication

In the example of the VID Issuer the user is required to pass through a traditional username/password authentication. To configure the authentication method that you want to use, you can proceed with changing the `authenticationChain.ts` file in the `src/configuration/authentication/` directory by including new ones or replacing the already existing Authentication Components.

The purpose of these authentication components is to include additional data to the userSession stored in the database such as the username or other data that can be used for the **identity mapping** which will be explained in the next section.


### 1.5 Identity Mapping

The **"identity mapping"** phrase in this documentation page is referring to the procedure of binding an authenticated session (a user has successfully passed authentication through all the authentication components) with an actual entity in the dataset that you have provided.

The identity mapping procedure is taking place in the `SupportedCredentialsConfiguration/` directory where you can provide your own Supported Credential Configurations.

Each credential configuration must provide some metadata and two important functions related with the identity mapping, namingly the `getProfile()` and `generateCredentialResponse()`.

- `getProfile()` is executed when the user has reached to the consent page afrer successfully passing through all the authentication components mentioned earlier in a previous section.

- `generateCredentialResponse()` is executed when the wallet invokes the Credential Endpoint to request the issuance of the credential. This function is responsible for:
    - Defining the attributes that will be included in the credential payload
    - Providing which attributes are selectively disclosable
    - Call the signer function which the issuer has defined


### 1.6 Additional configurations & plug-ins

You can define additional plug-ins or configurations though the `main.ts` file in the `src/configuration/` directory. 

## 2 Configuring an Issuer with VID Authentication

Until completed, you can check the diploma-issuer or ehic-issuer wallet-enterprise configuration in the wallet-ecosystem repository.

TBD

## 3 Configurting a Verifier

Until completed, you can check the acme-verifier wallet-enterprise configuration in the wallet-ecosystem repository.

TBD