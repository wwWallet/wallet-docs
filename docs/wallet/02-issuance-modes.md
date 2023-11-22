---
sidebar_position: 1
---

# Issuance Modes

| Device      | Initiation | Status |
| ----------- | ----------- | ----------- |
| Same-Device      | Wallet-Initiated       |   :white_check_mark:   |
| Cross-Device     | Wallet-Initiated       |                        |
| Same-Device      | Issuer-Initiated       |                        |
| Cross-Device     | Issuer-Initiated       |   :white_check_mark:   |


## Challenges

Typical web wallets could completely rely on the same-device flow. However, implementing the WebAuthn PRF extension could deem the same-device flow impossible due to devices' or browsers' incompatibility with PRF. Consequently, we aim to support cross-device flows as well, by redirecting the user to a device or browser that supports PRF (Android or Chrome).

We also aim to cover Issuer-Initiated scenarios but we first have find a way for wallets to be discoverable by issuers (i.e. wallet registry).

