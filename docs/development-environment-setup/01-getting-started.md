---
sidebar_position: 1
---

# Getting started

## Development on docker containers


### Prerequisites

- Docker & Docker Compose

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
127.0.0.1 wallet-frontend
127.0.0.1 wallet-backend-server
127.0.0.1 wallet-enterprise-vid-issuer
127.0.0.1 wallet-enterprise-diploma-issuer
127.0.0.1 wallet-enterprise-acme-verifier
```

### Start the ecosystem

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

## References

### A - How to generate an Github access token to download the ssi-sdk npm package

Generate a Git Personal Access Token in order to install GUnet's `ssi-sdk` npm package:

  a. Go to https://github.com/settings/tokens
  
  b. Generate a new token with `read:packages` scope
  
  c. Save the token on the `.github-token` file on the root of the `wallet-ecosystem` local repository