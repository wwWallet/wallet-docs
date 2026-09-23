---
---

# Development Setup

Use the `wwwallet` repository as the entry point for local development. It is the orchestration repository for the current wwWallet stack and is intended to bring the individual components together into a working development environment.

The setup pulls together the wallet application core, the credential protocol services and the supporting infrastructure shown in the diagram below.

Developers should follow the setup instructions in `wwwallet` instead of configuring each repository manually. The individual repositories can still be developed independently, but `wwwallet` provides the easiest way to run the full ecosystem and test end-to-end issuance and presentation flows.

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