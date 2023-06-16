---
sidebar_position: 1
---

# Getting started


## Prerequisites

- Docker & Docker Compose
- Visual Studio Code
- Docker VSCode extension
- Dev Containers VSCode extension


## Start the ecosystem

1. Clone wallet-start repository
```sh
git clone git@github.com:gunet/wallet-start.git
```
2. Launch VSCode in the newly created `wallet-start` folder
3. Initialize and update submodules

```sh
git submodule init
git submodule update --remote
```
4. Launch the ecosystem:

```sh
chmod +x ecosystem.sh
./ecosystem.sh up
```


The `up` command will build and start the containers with a default configuration for local development.


Run with `--help` argument for more actions:
```sh
./ecosystem.sh --help
```

To shut down the ecosystem run the following command:

```sh
./ecosystem.sh down
```

5. After the containers are up, enter a container using `Ctrl+Shift+P >Dev Containers: Attach to Running Container` vscode command and selecting a dev container
6. Move new VSCode workspace to the Work Directory folder (evident in development.Dockerfile), usually `/home/node/app`.



## Configure the ecosystem

For demonstration purposes, we are going to set up a small ecosystem with:
- 1 Wallet Provider
- 1 Credential Issuer (University of Athens)
- 1 Credential VID Issuer (Gov Issuer)

The steps we are going to follow are:

1. [Wallet: Create a Wallet Provider DID](#create-a-wallet-provider-did)
2. [Wallet: Register National VID Issuer as an Issuer in the Wallet Provider's private Trusted Issuers Registry](#wallet-register-national-vid-issuer-as-an-issuer-in-the-wallet-providers-private-trusted-issuers-registry)
3. [Wallet: Register the University of Athens as an Issuer in the Wallet Provider's private Trusted Issuers Registry](#wallet-register-the-university-of-athens-as-an-issuer-in-the-wallet-providers-private-trusted-issuers-registry)

4. [National VID Issuer: Register the Wallet Provider that we created as an OIDC client](#national-vid-issuer-register-the-wallet-provider-that-we-created-as-an-oidc-client)
5. [University of Athens Issuer: Register the Wallet Provider that we created as an OIDC client](#university-of-athens-issuer-register-the-wallet-provider-that-we-created-as-an-oidc-client)
6. [Enterprise Wallet Core: Create schemas and presentation definitions in order for the University of Athens Issuer to authenticate the users with VID](#enterprise-wallet-core-create-schemas-and-presentation-definitions-in-order-for-the-university-of-athens-issuer-to-authenticate-the-users-with-vid)

### Wallet: Create a Wallet Provider DID

In order for a wallet to be able to receive verifiable credentials from an Enterprise Issuer, it must first be registered
as a Client to an Enterprise Issuer with a DID.

In the `wallet-start/` directory, run the following commands:
```sh
chmod +x $PWD/wallet-backend/cli/configwallet
export PATH="$PWD/wallet-backend/cli:$PATH"
export DB_HOST="127.0.0.1"
export DB_PORT="3307"
export DB_USER="root"
export DB_PASSWORD="root"
export DB_NAME="wallet"
configwallet create did -n admin -p sdfsdfewwerweweer  # this command will generate a key-pair and the JWK will be exposed in the /jwks endpoint.
```

You can now use this generated DID on the `config/config.development.ts` as **providerDID**. By default it will be set to "admin"



### Wallet: Register National VID Issuer as an Issuer in the Wallet Provider's private Trusted Issuers Registry

In the `wallet-start/` directory, run the following commands:

```sh
chmod +x $PWD/wallet-backend/cli/configwallet
export PATH="$PWD/wallet-backend/cli:$PATH"
export DB_HOST="127.0.0.1"
export DB_PORT="3307"
export DB_USER="root"
export DB_PASSWORD="root"
export DB_NAME="wallet"
configwallet create issuer \
	--friendlyName 'National VID Issuer' \
	--url http://127.0.0.1:8003 \
	--did did:ebsi:zyhE5cJ7VVqYT4gZmoKadFt \
	--client_id did:ebsi:zyhE5cJ7VVqYT4gZmoKadFt
```

### Wallet: Register the University of Athens as an Issuer in the Wallet Provider's private Trusted Issuers Registry

In the `wallet-start/` directory, run the following commands:

```sh
chmod +x $PWD/wallet-backend/cli/configwallet
export PATH="$PWD/wallet-backend/cli:$PATH"
export DB_HOST="127.0.0.1"
export DB_PORT="3307"
export DB_USER="root"
export DB_PASSWORD="root"
export DB_NAME="wallet"
configwallet create issuer \
	--friendlyName 'University of Athens' \
	--url http://127.0.0.1:8000 \
	--did did:ebsi:zpq1XFkNWgsGB6MuvJp21vA \
	--client_id did:ebsi:zpq1XFkNWgsGB6MuvJp21vA
```




The `client_id` and `did` must be the DID of the issuer

Now that the DID of the Wallet Provider has been generated, the Wallet Provider must provide this DID through a secure off-bound process to an Enterprise Issuer who will trust client assertions issued with the corresponding public key in the /jwks endpoint.

### National VID Issuer: Register the Wallet Provider that we created as an OIDC client

:::note Warning
The `client_id` must be the DID of the Wallet Provider. `redirect_uri` must be the URI which points to the wallet client. For demonstration purposes,
the `redirect_uri` will be a wallet mock server that we set up, but on production phase it will be "openid://". The `jwks_uri` is a URL in which all public keys of the wallet clients are available.
:::

On the `wallet-start/` directory, run the following commands:


```sh
chmod +x $PWD/enterprise-vid-issuer/cli/configiss
export PATH="$PWD/enterprise-vid-issuer/cli:$PATH"
export DB_HOST="127.0.0.1"
export DB_PORT=3307
export DB_USER=root
export DB_PASSWORD=root
export DB_NAME=vidissuer
configiss client remove --client_id did:key:dsfddfdf233e
configiss client create --client_id did:key:dsfddfdf233e --client_secret wallet-secret --redirect_uri http://127.0.0.1:7777 --jwks_uri http://127.0.0.1:8002/jwks
```


### University of Athens Issuer: Register the Wallet Provider that we created as an OIDC client

On the `wallet-start/` directory, run the following commands:


:::note Warning
The `client_id` must be the DID of the Wallet Provider. `redirect_uri` must be the URI which points to the wallet client. For demonstration purposes,
the `redirect_uri` will be a wallet mock server that we set up, but on production phase it will be "openid://". The `jwks_uri` is a URL in which all public keys of the wallet clients are available.
:::

```sh
chmod +x $PWD/enterprise-issuer/cli/configiss
export PATH="$PWD/enterprise-issuer/cli:$PATH"
export DB_HOST="127.0.0.1"
export DB_PORT=3307
export DB_USER=root
export DB_PASSWORD=root
export DB_NAME=issuer
configiss client remove --client_id did:key:dsfddfdf233e
configiss client create --client_id did:key:dsfddfdf233e --client_secret wallet-secret --redirect_uri http://127.0.0.1:7777 --jwks_uri http://127.0.0.1:8002/jwks
```




### Enterprise Wallet Core: Create schemas and presentation definitions in order for the University of Athens Issuer to authenticate the users with VID

Alter the file `enterprise-wallet-core/cli/config.yaml` to create your schemas and presentation definitions.

In the `wallet-start/` directory, run the following to insert the transaction described in the config.yaml.

> Note: The ./configver command will insert the schemas and presentation definitions described in the `enterprise-wallet-core/cli/config.yaml` but not update them. This will change in later versions.


```yaml title=enterprise-wallet-core/cli/config.yaml
schemas:
  EuropassId:
    title: Diploma Europass With Id
    uri: https://api-pilot.ebsi.eu/trusted-schemas-registry/v2/schemas/0x4dd3926cd92bb3cb64fa6c837539ed31fc30dd38a11266a91678efa7268cde09
    scopes:
      id:
        path: credentialSubject.id

  VID:
    title: Verifiable ID
    uri: https://api-pilot.ebsi.eu/trusted-schemas-registry/v2/schemas/z8Y6JJnebU2UuQQNc2R8GYqkEiAMj3Hd861rQhsoNWxsM
    scopes:
      personalIdentifier:
        path: credentialSubject.personalIdentifier


presentation_definitions:
  MyEuropassId:
    title: Diploma Europass
    description: A Presentation Definition containing Europass credentials
    requirements:
      EuropassId:
        scopes:
          - id
    visibility: true
    expirationDate: "1-1-2030"

  VIDwithPersonalID:
    title: VID with Personal Identifier
    description: Requesting VID with Personal Identifier as Required
    requirements:
      VID:
        scopes:
          - personalIdentifier
    visibility: true
    expirationDate: "1-1-2030"

```

Run the following commands in `wallet-start/` directory in order to register the Schemas and Presentation Definitions:

```sh
chmod +x $PWD/enterprise-wallet-core/cli/configver
export PATH="$PWD/enterprise-wallet-core/cli:$PATH"
export SERVICE_URL=http://127.0.0.1:9000
export ENTERPRISE_CORE_USER=""
export ENTERPRISE_CORE_SECRET=""
configver clear  # clear old configuration
configver       # send the new configuration
```