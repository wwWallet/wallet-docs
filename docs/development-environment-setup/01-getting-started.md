---
sidebar_position: 1
---

# Getting started

## Case 1: Development on docker containers


### Prerequisites

- Docker & Docker Compose

### Clone the repositories

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


See [guide to install ssi-sdk](#a---how-to-generate-an-github-access-token-to-download-the-ssi-sdk-npm-package)

Launch the ecosystem:

```sh
node ecosystem.js up
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

### Configure `/etc/hosts`

Add the following lines in the /etc/hosts file:

```sh
127.0.0.1 wallet-mock
127.0.0.1 wallet-backend-server
127.0.0.1 wallet-enterprise-vid-issuer
127.0.0.1 wallet-enterprise-diploma-issuer
127.0.0.1 enterprise-verifier-core
127.0.0.1 wallet-enterprise-acme-verifier
```



### Configure the ecosystem

For demonstration purposes, we are going to set up a small ecosystem with:
- 1 Wallet Provider
- 1 Credential Issuer (University of Athens)
- 1 Credential VID Issuer (Gov Issuer)

The steps we are going to follow are:

1. [Wallet: Register National VID Issuer as an Issuer in the Wallet Provider's private Trusted Issuers Registry](#wallet-register-national-vid-issuer-as-an-issuer-in-the-wallet-providers-private-trusted-issuers-registry)
2. [Wallet: Register the University of Athens as an Issuer in the Wallet Provider's private Trusted Issuers Registry](#wallet-register-the-university-of-athens-as-an-issuer-in-the-wallet-providers-private-trusted-issuers-registry)


Alternatively, we can skip the separate steps and execute the following command:

```sh
node ecosystem.js init
```


#### Wallet: Register National VID Issuer as an Issuer in the Wallet Provider's private Trusted Issuers Registry

Login to the container:

```sh
docker exec -it wallet-backend-server sh
```

and execute the following commands:

```sh
cd cli/
yarn install
export DB_HOST="wallet-db"
export DB_PORT="3307"
export DB_USER="root"
export DB_PASSWORD="root"
export DB_NAME="wallet"
./configwallet.js create issuer \
  --friendlyName 'National VID Issuer' \
  --url http://wallet-enterprise-vid-issuer:8003 \
  --did did:ebsi:zyhE5cJ7VVqYT4gZmoKadFt \
  --client_id did:ebsi:zyhE5cJ7VVqYT4gZmoKadFt
```

#### Wallet: Register the University of Athens as an Issuer in the Wallet Provider's private Trusted Issuers Registry



Login to the container:

```sh
docker exec -it wallet-backend-server sh
```

```sh
cd cli/
yarn install
export DB_HOST="wallet-db"
export DB_PORT="3307"
export DB_USER="root"
export DB_PASSWORD="root"
export DB_NAME="wallet"
./configwallet.js create issuer \
  --friendlyName 'University of Athens' \
  --url http://wallet-enterprise-diploma-issuer:8000 \
  --did did:ebsi:zpq1XFkNWgsGB6MuvJp21vA \
  --client_id did:ebsi:zpq1XFkNWgsGB6MuvJp21vA
```


The `client_id` and `did` must be the DID of the issuer


## Case 2: Development on docker containers inside a Virtual Box VM (recommended for computers with x86_64 CPU architecture)


#### Prerequisites

- Virtual Box


Download the .ova image from the this [link](https://drive.google.com/file/d/1FX6jww_7614vo9jsTg7vznQv5Z3Inlhi/view?usp=drive_link)


#### VM credentials

```
user: user
pass: secret
```

The ecosystem is located at the directory `~/wallet-ecosystem`


## Run the complete flow

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


## Build the eDiplomas native mobile application on a Mac


0. Prepare the Xcode and create an iPhone 14 virtual device
1. Clone the wallet-ios repository
```
git clone git@github.com:gunet/wallet-ios.git
```

2. Open the project with Xcode

3. Press `command+R` to start the eDiplomas application

By default the application will communicate with the **wallet-backend-server** container on http://127.0.0.1:8002

To change the URL of the backend, you will need to change the `NetworkingConstants.backendUrl` constant at the wallet/VCNetworking/Constants.swift file, before building the application.

> Note: To perform the flow, you will need to start the flow from the issuers using the browser of the mobile, because the wallet mobile does not support Wallet-initiated flow at the moment.
> -  http://127.0.0.1:8003
> -  http://127.0.0.1:8000



## References

### A - How to generate an Github access token to download the ssi-sdk npm package

Generate a Git Personal Access Token in order to install GUnet's `ssi-sdk` npm package:

  a. Go to https://github.com/settings/tokens
  
  b. Generate a new token with `read:packages` scope
  
  c. Save the token on the `.github-token` file on the root of the `wallet-ecosystem` local repository