---
sidebar_position: 1
---

# Getting started

## Browser and OS compatibility

You can consult the [PRF compatibility matrix](https://github.com/wwWallet/wallet-frontend#prf-compatibility) regarding browser support and supported operating systems.

## Development setup

Use the `wwwallet` repository as the entry point for local development. It is the orchestration repository for the current wwWallet stack and is intended to bring the individual components together into a working development environment.

The setup pulls together the wallet application core, the credential protocol services and the supporting infrastructure shown in the diagram below.

Developers should follow the setup instructions in `wwwallet` instead of configuring each repository manually. The individual repositories can still be developed independently, but `wwwallet` provides the easiest way to run the full ecosystem and test end-to-end issuance and presentation flows.

[![Repositories Diagram](/img/diagrams/repos.svg)](/img/diagrams/repos.svg)