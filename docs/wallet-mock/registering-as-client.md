---
sidebar_position: 2
---

# Registering as an OID4VCI Client

In order for a wallet to be able to receive verifiable credentials from an Enterprise Issuer, it must first be registered
as a Client to an Enterprise Issuer with a DID.


## How to create a key pair and a DID for the Wallet Provider using the `configwallet` CLI

```sh
export SERVICE_URL=http://127.0.0.1:8002
export SERVICE_SECRET=dsfsffeffdsfsdfsdfsdsdf
configwallet generate did   # this command will generate a key-pair and the JWK will be exposed in the /jwks endpoint.
```

Now that the DID of the Wallet Provider has been generated, the Wallet Provider must provide this DID through a secure off-bound process to an Enterprise Issuer who will trust client assertions issued with the corresponding public key in the /jwks endpoint.