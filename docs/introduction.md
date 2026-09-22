---
title: Welcome to wwWallet
hide_title: true
hide_table_of_contents: true
sidebar_position: 0
pagination_next: null
pagination_prev: null
---

<div className="wwhome-hero">
  <div className="wwhome-hero__copy">
    <h1 className="wwhome-hero__title">Welcome to wwWallet</h1>
    {/* Keep the text on one line: a text run on its own line is parsed as Markdown and escapes into a sibling <p>. */}
    <p className="wwhome-hero__lede">wwWallet is an open-source, web-based digital identity wallet for securely storing, managing and presenting verifiable credentials</p>
    <div className="wwhome-hero__actions">
      <a className="wwhome-btn wwhome-btn--primary" target="_blank" href="https://demo.wwwallet.org">Open the demo wallet</a>
      <a className="wwhome-btn wwhome-btn--ghost" href="/wallet-docs/docs/development-setup/getting-started">Get started</a>
    </div>
  </div>

  <div className="wwhome-shot">
    <img className="wwhome-shot__image" src="/wallet-docs/img/devices.png" alt="wwWallet open in a laptop browser and on a phone, both showing a list of stored credentials" />
  </div>
</div>

The project takes a browser-first approach to digital identity wallets, using Progressive Web
Applications, WebCrypto, WebAuthn, CTAP2 and related standards to provide wallet functionality
beyond native mobile apps. Its goal is to make identity wallets more accessible, interoperable and
flexible while preserving strong holder authentication and control over wallet keys.

This documentation explains how the wwWallet ecosystem is structured, how its main components work
together and how to set up, configure and use the wallet, issuer, verifier and supporting services.

## Quick Links

<div className="wwhome-actions">

  <a className="wwhome-card" href="/wallet-docs/docs/development-setup/getting-started">
    <span className="wwhome-card__title">
      <svg className="wwhome-card__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="15" rx="2"></rect>
        <path d="m7 9 3 2.5L7 14M13 14.5h4"></path>
      </svg>
      <span className="wwhome-card__label">Run the stack</span>
    </span>
    <span className="wwhome-card__body">Use the <code>wwwallet</code> orchestration repo instead of wiring each service by hand.</span>
    <span className="wwhome-card__more">Development Setup →</span>
  </a>

  <a className="wwhome-card" href="/wallet-docs/docs/development-setup/contribution-guidelines">
    <span className="wwhome-card__title">
      <svg className="wwhome-card__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="6" y1="3" x2="6" y2="15"></line>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
      </svg>
      <span className="wwhome-card__label">Contribute</span>
    </span>
    <span className="wwhome-card__body">Development workflow, pull request practice and how the core team reviews changes.</span>
    <span className="wwhome-card__more">Contribution Guidelines →</span>
  </a>

  <a className="wwhome-card" href="/wallet-docs/docs/category/wallet-handbook">
    <span className="wwhome-card__title">
      <svg className="wwhome-card__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5v-15Z"></path>
        <path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3"></path>
      </svg>
      <span className="wwhome-card__label">Using the wallet</span>
    </span>
    <span className="wwhome-card__body">How the wallet treats your data and how to manage or delete your account.</span>
    <span className="wwhome-card__more">Wallet Handbook →</span>
  </a>

  <a className="wwhome-card" href="/wallet-docs/docs/wallet-architecture/encryption-architecture">
    <span className="wwhome-card__title">
      <svg className="wwhome-card__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="10.5" width="16" height="10" rx="2"></rect>
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"></path>
      </svg>
      <span className="wwhome-card__label">Understand the crypto</span>
    </span>
    <span className="wwhome-card__body">WebAuthn PRF-derived keys and client-side encryption.</span>
    <span className="wwhome-card__more">Encryption architecture →</span>
  </a>

</div>
