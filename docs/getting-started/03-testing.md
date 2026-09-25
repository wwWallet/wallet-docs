---
description: Find the starting point for checking wallet components and end-to-end flows.
---

# Testing

## End-to-end tests

The Playwright end-to-end tests cover account management and the main credential journeys in a real browser. They test credential issuance and presentation to a verifier. Both same-device links and cross-device QR codes are covered.

The tests require Playwright's Chromium and a running wallet environment.

From the root of the [`wwwallet`](https://github.com/wwWallet/wwwallet) repository, enter the `e2e` directory, then install and run the tests:

```sh
cd e2e/
yarn install
yarn playwright install chromium
yarn test
```

After installation, you can also run the suite from the repository root with `yarn test:e2e`.

The suite targets local services by default. To use another environment, copy `e2e/.env.template` to `e2e/.env` and set `WALLET_URL`, `ISSUER_URL`, `WALLET_AS_URL` and `VERIFIER_URL`. The tests do not start these services.

See the [`e2e` README](https://github.com/wwWallet/wwwallet/tree/main/e2e) for more details.
