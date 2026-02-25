---
sidebar_position: 2
---

# Connect with a Data Provider

The current Wallet Issuer implementation provides the capability to define a communication channel with a Data Provider to retrieve user's information in order to sign the credential.

Currently, the dataset is provided internally without communication with an external Data Provider.

The configuration file `config.accountFinder.ts` can be utilized to define the dataset retrieval method for any scope.
