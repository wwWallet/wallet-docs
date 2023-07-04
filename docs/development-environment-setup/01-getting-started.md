---
sidebar_position: 1
---

# Getting started


## Prerequisites

- Docker & Docker Compose


## Start the ecosystem

1. Clone wallet-ecosystem repository
```sh
git clone git@github.com:gunet/wallet-ecosystem.git
```
2. Launch VSCode in the newly created `wallet-ecosystem` folder
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




## Configure the ecosystem

For demonstration purposes, we are going to set up a small ecosystem with:
- 1 Wallet Provider
- 1 Credential Issuer (University of Athens)
- 1 Credential VID Issuer (Gov Issuer)

The steps we are going to follow are:

1. [Wallet: Register National VID Issuer as an Issuer in the Wallet Provider's private Trusted Issuers Registry](#wallet-register-national-vid-issuer-as-an-issuer-in-the-wallet-providers-private-trusted-issuers-registry)
2. [Wallet: Register the University of Athens as an Issuer in the Wallet Provider's private Trusted Issuers Registry](#wallet-register-the-university-of-athens-as-an-issuer-in-the-wallet-providers-private-trusted-issuers-registry)

3. [National VID Issuer: Register the Wallet Provider that we created as an OIDC client](#national-vid-issuer-register-the-wallet-provider-that-we-created-as-an-oidc-client)
4. [University of Athens Issuer: Register the Wallet Provider that we created as an OIDC client](#university-of-athens-issuer-register-the-wallet-provider-that-we-created-as-an-oidc-client)
5. [Enterprise Verifier Core: Create schemas and presentation definitions in order for the University of Athens Issuer to authenticate the users with VID](#enterprise-wallet-core-create-schemas-and-presentation-definitions-in-order-for-the-university-of-athens-issuer-to-authenticate-the-users-with-vid)



### Wallet: Register National VID Issuer as an Issuer in the Wallet Provider's private Trusted Issuers Registry

Login to the container:

```sh
docker exec -it wallet-backend-server sh
```

and execute the following commands:

```sh
cd cli/
yarn install
export DB_HOST="127.0.0.1"
export DB_PORT="3307"
export DB_USER="root"
export DB_PASSWORD="root"
export DB_NAME="wallet"
./configwallet.js create issuer \
	--friendlyName 'National VID Issuer' \
	--url http://127.0.0.1:8003 \
	--did did:ebsi:zyhE5cJ7VVqYT4gZmoKadFt \
	--client_id did:ebsi:zyhE5cJ7VVqYT4gZmoKadFt
```

### Wallet: Register the University of Athens as an Issuer in the Wallet Provider's private Trusted Issuers Registry



Login to the container:

```sh
docker exec -it wallet-backend-server sh
```

```sh
cd cli/
yarn install
export DB_HOST="127.0.0.1"
export DB_PORT="3307"
export DB_USER="root"
export DB_PASSWORD="root"
export DB_NAME="wallet"
./configwallet.js create issuer \
	--friendlyName 'University of Athens' \
	--url http://127.0.0.1:8000 \
	--did did:ebsi:zpq1XFkNWgsGB6MuvJp21vA \
	--client_id did:ebsi:zpq1XFkNWgsGB6MuvJp21vA
```


The `client_id` and `did` must be the DID of the issuer



### Enterprise Verifier Core: Create schemas and presentation definitions in order for the University of Athens Issuer to authenticate the users with VID

Alter the file `enterprise-verifier-core/cli/config.yaml` to create your schemas and presentation definitions.

In the `wallet-ecosystem/` directory, run the following to insert the transaction described in the config.yaml.

> Note: The ./configver command will insert the schemas and presentation definitions described in the `enterprise-wallet-core/cli/config.yaml` but not update them. This will change in later versions.


```yaml title=enterprise-verifier-core/cli/config.yaml
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

Login in the Enterprise Verifier Core container:

```sh
docker exec -it enterprise-verifier-core sh
```
and execute the following commands:

```sh
cd cli/
yarn install
export SERVICE_URL=http://127.0.0.1:9000
export ENTERPRISE_CORE_USER=""
export ENTERPRISE_CORE_SECRET=""
./configver.js clear  # clear old configuration
./configver.js       # send the new configuration
```

### Run the complete flow

After setting up the whole ecosystem, then you can follow the steps described below:

1. Visit the wallet mock client http://127.0.0.1:7777 to initialize your wallet
2. From this page, initiate the flow of VID Issuance by selecting the VID Issuer.  
Authenticate using the following credentials:  
username: `user`  
password: `secret` 
3. After the flow has finished, refresh your browser at the location http://127.0.0.1:7777  to get the credential from the backend.
4. If the flow has successfully been completed, you must be able to inspect the credential on the starting page. In the credentialSubject of the verifiable credential, the "personalIdentifier" field is the actual Social Security Number (SSN) of the End-user (holder). This personal identifier will later be used by Issuers or other Third-parties to authenticate the end-user or even use it to query their Resource Servers and fetch data corresponding to the end-user.
5. Initiate the flow of Diploma Issuance by selecting the eDiplomas Credential Issuer from the http://127.0.0.1:7777 location.
6. The eDiplomas Credential Issuer will request the VID of the end-user.
7. After the user has selected the VID to be sent, the University of Athens will receive the VID and trust it because it was issued by the National VID Issuer who is supposed to be registered on the Trusted Issuers Registry and have received the corresponding accreditations from a governmental body (Ministry). The eDiplomas Credential Issuer will utilize the personalIdentifier from the VID to query the Resource Server to find the diplomas of the end-user (holder).
8. After the end-user has selected the diplomas to be sent to the wallet, the user will end up in the location http://127.0.0.1:7777. After refreshing the page, the new diplomas will appear on the screen.
