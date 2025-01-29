---
sidebar_position: 1
---

# Security

## Benchmark

Can we safely use our web-wallet on a public kiosk using a Ybikey, or any other certified authenticator?

## Security and Trustworthiness

To ensure the security of the wallet, a high level of trust in their authentication and cryptographic binding mechanisms and integrity of digital wallets is essential. This trust is built upon two core wallet processes:

**Authentication to the Wallet Instance**

1. Cryptographic Binding of (Q)EAAs
2. Authentication to the Wallet Instance

To sign in to the wallet, we use WebAuthn for strong, phishing-resistant authentication. This approach enables a high **Level of Assurance (LoA)** in this authentication stage, thanks to WebAuthn’s authenticator attestation feature.

During WebAuthn credential registration, the server can define a policy specifying the acceptable types of authenticators. The newly created credential may then include cryptographic proof that the WebAuthn credential’s private key is held by an authenticator of an approved model. This ensures that the wallet provider can verify that users' authenticators meet the requirements for **high LoA**.

The wallet, as currently implemented, does not enforce an **authenticator attestation policy**, but one can be easily implemented.


**Cryptographic Binding of (Q)EAAs and Proof Types**

Users’ wallet contents, including all proof signing keys, are end-to-end encrypted on the client side using keys derived from the **WebAuthn PRF extension**. These encryption keys are never transmitted to the server, ensuring that users’ proof signing keys remain secure even in the event of a server-side breach. Once the user is authenticated using WebAuthn, they can download their encrypted wallet contents and decrypt them on the client side.

However, the WebAuthn PRF extension only supports the **derivation of software keys**. As a result, the wallet does not currently achieve **high LoA** for (Q)EAA proof signing keys. A compromised or malicious wallet provider could serve client code that **exfiltrates encryption keys**, potentially allowing an attacker to decrypt and misuse the user’s (Q)EAAs.

**Enhancing Security: WebAuthn Sign Extension Proposal**

To address the inherent limitations of software keys, we have proposed extensions to **WebAuthn and FIDO CTAP2** that introduce hardware-bound keys as a solution ([**WebAuthn sign ext**](https://github.com/w3c/webauthn/pull/2078)).

These extensions would enable the wallet to generate **hardware-bound asymmetric key pairs**, where the public keys can be tied as proof keys during credential issuance, while the private keys never leave the secure element of the **FIDO authenticator**.

During credential presentation, the wallet would use the WebAuthn extension to instruct the **FIDO authenticator** to sign the presentation with the **hardware-bound private key**. This mechanism ensures that the user has **sole control** of their (Q)EAA proof keys, even if wallet encryption keys are compromised.

**Privacy and Unlinkability Enhancements**

This mechanism complements the **batch issuance of single-use credentials**, which is recognized as a key approach to enhancing **holder privacy** and achieving **unlinkability** between relying parties or even within the same relying party.

Moreover, when [**Asynchronous Remote Key Generation (ARKG)**](https://datatracker.ietf.org/doc/draft-bradleylundberg-cfrg-arkg/) is integrated into **wwWallet**, it will allow the generation of multiple public keys without **user intervention** during the issuance process. That is, the wallet will autonomously generate public keys without interacting with the secure element—except when signing, which requires secure element usage.

Combined with the new "[**Key Attestation**](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#appendix-D)" **proof type in OID4VCI**, this approach ensures full **cryptographic proof of possession**, using unique keys for each credential presentation. It also achieves **RP-to-RP unlinkability**, while maintaining a seamless **user experience**, even for offline or performance-constrained WSCDs.

## Web App Security

