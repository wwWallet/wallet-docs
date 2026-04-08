---
---

# Account

## type FindAccount function


The FindAccount type is defined on lib/issues/Account directory


The purpose of this type is to define functions that will be used for
retrieving the claims of an Account for a specific set of scopes which
are allowed. The main identifier used for each account is the accountId
which is synonymous with the 'sub' claim. Additionally, the `ctx` parameter
includes the `credentialRequestHelper` which is utilized for managing the
pending ClaimFutures in cases where the credential is not ready to be sent
and therefore an asynchronous proceedure needs to follow.

[Example implementation of the FindAccount type](https://github.com/wwWallet/wallet-issuer/blob/babd3d3aac351d3b5e179100626cda20766b608f/config/accountFinder.ts)
