---
sidebar_position: 5
---

# Registering a Client

The Enterprise Issuer application uses OpenID for Verifiable Credential Issuance to issue Verifiable Credentials
to wallets. Hence, the `authorization_code` grant type is used as the primary way of issuing credentials, as it
is proved to be the most sucure.

In order for a wallet to be able to receive a verifiable credential from an Enterprise Issuer, it is required to be registered as a trusted client in the clients registry of the Enterprise Issuer.

The need for a mechanism that authenticates the client is inevitable because an Issuer should know conformance status of wallet with all the security and legal regulations.


## How to register a Client using the `configiss` CLI


### Configure with OIDC client_assertion

The Enterprise Issuer supports authentication of a client through client assertion with **private_key_jwt** client assertion method.

On the wallet-start/ directory, run the following commands:

```sh
chmod +x $PWD/enterprise-issuer/cli/configiss
export PATH="$PWD/enterprise-issuer/cli:$PATH"
export DB_HOST="127.0.0.1"
export DB_PORT=3307
export DB_USER=root
export DB_PASSWORD=root
export DB_NAME=issuer
configiss client remove --client_id did:key:dsfddfdf233e
configiss client create --client_id did:key:dsfddfdf233e --client_secret wallet-secret --redirect_uri http://127.0.0.1:7777 --jwks_uri http://127.0.0.1:7777/jwks
```

## How a Wallet Provider can be registered as a Client to an Enterprise Issuer


1. Wallet Provider creates a DID and exposes the public key in a JWKS endpoint (http://127.0.0.1:7777/jwks)
2. Wallet Provider sends the DID to the Authorization Server through an off-bound process (email or authenticated session).
3. When a wallet wants to receive a credential, this DID will be used as the value for the `client_id` parameter. The `client_assertion` will be a JWT signed with the Wallet Provider's private key. The `client_assertion_method` must have value `private_key_jwt` 
