---
description: Run the complete wwWallet ecosystem locally with the wwwallet orchestration repository.
---

# Development Setup

Use the `wwwallet` [repository](https://github.com/wwWallet/wwwallet) as the entry point for local development. It is the orchestration repository for the current wwWallet stack and is intended to bring the individual components together into a working development environment.
Read the [Repositories](#the-repositories) section for information about how they are split.

## Quick Guide

After completing this Quick Guide, you will have a working development setup installed locally. You will be able to
create users and try out all the issuance and presentation flows end to end.

### Requirements

- **Git** with an SSH key added to GitHub (the submodules are cloned over SSH)
- **Node.js 24**
- **Yarn 1.x** (`npm i -g yarn`)
- **Docker** with Compose v2 (`docker compose`)
- **OpenSSL**

### Setup

```sh
git clone --recurse-submodules git@github.com:wwWallet/wwwallet.git
cd wwwallet
nvm use        # optional, switches to the pinned Node version
yarn install   # installs dependencies for every service
yarn setup     # creates .env files, keys and certificates
yarn start     # starts the databases in Docker and all services in watch mode
```

**First run only:** while `yarn start` is running, open a second terminal and run:

```sh
yarn init-db   # runs migrations and registers the local issuer, verifier and trusted certificate
```

### Done

| Service | URL |
|---|---|
| Wallet | http://localhost:3000 |
| Wallet backend | http://localhost:8002 |
| Issuer | http://localhost:8003 |
| Verifier | http://localhost:8005 |
| Authorization server | http://localhost:6060 |
| VCT registry | http://localhost:8097 |

Stop the services with `Ctrl+C`, then run `yarn down` to stop the Docker containers.

:::warning
`yarn setup` overwrites every `.env` file and regenerates all keys, so run it again only if you want a clean configuration.
:::

## The repositories

<div className="wwrepos">

  <div className="wwrepos__group">
    <div className="wwrepos__heading"><span className="wwrepos__dot wwrepos__dot--app"></span><span>Wallet application core</span></div>
    <ul className="wwrepos__list">
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-frontend">wallet-frontend</a><span className="wwrepos__desc">Web wallet UI, PWA</span></li>
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-backend-server">wallet-backend-server</a><span className="wwrepos__desc">Provider, storage, WebAuthn</span></li>
    </ul>
  </div>

  <div className="wwrepos__group">
    <div className="wwrepos__heading"><span className="wwrepos__dot wwrepos__dot--common"></span><span>Shared platform core</span></div>
    <ul className="wwrepos__list">
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-common">wallet-common</a><span className="wwrepos__desc">Credential, protocol, schema, crypto and rendering utilities</span></li>
    </ul>
  </div>

  <div className="wwrepos__group">
    <div className="wwrepos__heading"><span className="wwrepos__dot wwrepos__dot--protocol"></span><span>Credential protocol services</span></div>
    <ul className="wwrepos__list">
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-issuer">wallet-issuer</a><span className="wwrepos__desc">OpenID4VCI issuer</span></li>
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-verifier">wallet-verifier</a><span className="wwrepos__desc">OpenID4VP verifier</span></li>
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-as">wallet-as</a><span className="wwrepos__desc">OIDC / OAuth2 authorization server</span></li>
    </ul>
  </div>

  <div className="wwrepos__group">
    <div className="wwrepos__heading"><span className="wwrepos__dot wwrepos__dot--support"></span><span>Infrastructure and support</span></div>
    <ul className="wwrepos__list">
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wwwallet">wwwallet</a><span className="wwrepos__desc">Local dev orchestrator</span></li>
      <li className="wwrepos__item"><span className="wwrepos__name">privacy-gateway-server-go</span><span className="wwrepos__desc">OHTTP privacy gateway</span></li>
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/vct-registry">vct-registry</a><span className="wwrepos__desc">Credential type metadata</span></li>
    </ul>
  </div>

  <div className="wwrepos__group">
    <div className="wwrepos__heading"><span className="wwrepos__dot wwrepos__dot--wrapper"></span><span>Mobile wrappers</span></div>
    <ul className="wwrepos__list">
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-android-wrapper">wallet-android-wrapper</a><span className="wwrepos__desc">Android wrapper for the web wallet</span></li>
      <li className="wwrepos__item"><a className="wwrepos__name" href="https://github.com/wwWallet/wallet-ios-wrapper">wallet-ios-wrapper</a><span className="wwrepos__desc">iOS wrapper for the web wallet</span></li>
    </ul>
  </div>

</div>

[![Repositories Diagram](/img/diagrams/repos.svg)](/img/diagrams/repos.svg)