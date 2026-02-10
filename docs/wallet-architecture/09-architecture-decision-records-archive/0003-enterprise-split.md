# 3. Splitting wallet-enterprise into wallet-as, wallet-verifier, wallet-issuer

Date: 2026-02-09

## Status
Accepted

## Context
Presently the wallet-enterprise project hosts the source for both an Issuer and a Verifier, acting as complementary components to the core product. The Authorization Service is implemented as part of the Issuer logic and the Issuer cannot utilize a third party Authorization Server.

The monorepo structure of these services, combined with the Issuer's dependency on a single Authorization Server implementation, limits wwWallet's ability to function as a composable building block that can be integrated into existing ecosystems without imposing an all-inclusive, end-to-end solution.

## Decision
We will split wallet-enterprise into 3 separate, standalone services with their own repositories. The new projects will be:
- The Issuer (`wallet-issuer`) implementing OpenID4VCI
- The Verifier (`wallet-verifier`) implementing OpenID4VP
- The Authorization Server (`wallet-as`) implementing OIDC

Each service will default to working with each other but will otherwise be agnostic to the rest of the stack, as long as the relevant specs are implemented. Shared logic will be abstracted using `wallet-common`

## Consequences

### Positive
- Cleaner seperation of logic
- Interoperability with third parties, easier to select only the services each use case requires
- Easier to setup specific CI/CD flows and targeted tests

### Negative
- Setup overhead for the new repositories
- Change history will become harder to track