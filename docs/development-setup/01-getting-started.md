---
sidebar_position: 1
---

# Getting started

## Browser and OS compatibility

You can consult the [PRF compatibility matrix](https://github.com/wwWallet/wallet-frontend#prf-compatibility) regarding browser support and supported operating systems.


## Development on docker containers

### Prerequisites

- Docker & Docker Compose
- An SSH key added to GitHub

### Clone the repositories

1. Clone wallet-ecosystem repository
```sh
git clone git@github.com:wwWallet/wallet-ecosystem.git
```
2. Launch VSCode in the newly created `wallet-ecosystem` folder
3. Initialize and update submodules

```sh
git submodule init
git submodule update --remote
```


4. Create a github token using the [guide to install ssi-sdk](#a---how-to-generate-a-github-access-token-to-download-the-ssi-sdk-npm-package)



5. Configure `/etc/hosts`

Add the following lines in the /etc/hosts file:

```sh
127.0.0.1 wallet-frontend
127.0.0.1 wallet-backend-server
127.0.0.1 wallet-enterprise-vid-issuer
127.0.0.1 wallet-enterprise-diploma-issuer
127.0.0.1 wallet-enterprise-acme-verifier
```

6. Start the ecosystem

For demonstrative purposes, we are going to set up a small ecosystem with:
- 1 Wallet Provider
- 1 Credential Issuer (University of Athens)
- 1 Credential VID Issuer (Gov Issuer)

The initial configuration of the legal entities takes place once we start the ecosystem:

```sh
node ecosystem.js up -t
```

For more options, see:

```sh
node ecosystem.js up --help
```

To shut down the ecosystem run the following command:

```sh
node ecosystem.js down
```

## Supported Flows

#### Wallet-initiated Issuance Flow (Authorization Code Grant)
- Start the issuing from the wallet: [http://localhost:3000/add](http://localhost:3000/add)
- Redirect to the issuing platform and select a method of authentication
- Fetch, review and select a credential
- Return to the wallet with the received credential

#### Issuer-initiated Issuance Flow (Pre-authorized Code Flow)
- Start the issuing from the issuer's platform
  - VID Issuer: [http://wallet-enterprise-vid-issuer:8003/](http://wallet-enterprise-vid-issuer:8003/)
  - Diploma Issuer: [http://wallet-enterprise-diploma-issuer:8000/](http://wallet-enterprise-diploma-issuer:8003/)
- Select a method of authentication
- Fetch, review and select a credential
- Scan QR to receive credential on the wallet

#### Verifier-initiated Presentation Flow
- Start from the verifier's platform: [http://wallet-enterprise-acme-verifier:8005/](http://wallet-enterprise-acme-verifier:8005)
- Apply for a Software Engineer's job
- Scan the QR to present your VC

## References

### A - How to generate a Github access token to download the ssi-sdk npm package

Generate a Git Personal Access Token in order to install GUnet's `ssi-sdk` npm package:

  a. Go to https://github.com/settings/tokens
  
  b. Generate a new token with `read:packages` scope
  
  c. Save the token on a `.github-token` file on the root of the `wallet-ecosystem` local repository