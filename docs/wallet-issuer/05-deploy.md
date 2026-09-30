---
sidebar_position: 5
---

# Deploy using Docker

The Wallet Issuer service currently does not depend on
external services for simplicity reasons however it has been designed
to allow different types of stores (memory cache or database for
persistent storage). By default, the Credential Issuer services uses
the memory store.


The container should be able to start with the following command:

```
docker run -p 8003:8003 \
    -e 'SERVICE_URL=https://qa-issuer.wwwallet.org' \
    -e 'SERVICE_PORT=8003' \
    -e 'AUTHORIZATION_SERVER_URL=https://qa-issuer.wwwallet.org/as' \
    -e 'INTROSPECTION_ENDPOINT_BASIC_AUTH_HEADER=dGVzdDoxMjMxMzMxMTIzMjIxMw==' \
    -e 'VCT_REGISTRY_URL=https://myvct-registry/type-metadata' \
    -v '$PWD/wallet-issuer/dataset/:/home/node/app/dataset/' \
    -v '$PWD/wallet-issuer/keys/:/home/node/app/keys/' \
    -v '$PWD/wallet-issuer/certs/:/home/node/app/certs/' \
    wwwallet/wallet-issuer:latest
```

