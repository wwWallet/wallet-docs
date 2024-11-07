---
---

# Encryption Architecture

## Changes from v3 to v4

- Deleted **sessionKey**. Instead the **mainKey** itself is now stored in
  cleartext for the duration of the session, and the **mainKey** is replaced
  whenever the encrypted contents change. The application now also terminates
  the session after 15 minutes (configurable) of user inactivity.

- `PrivateData` contents restructured to hold multiple credential key pairs
  instead of only a single **privateKey**.

## Changes from v2 to v3

- Introduced asymmetric (ECDH-ES) wrapping layer between
  **prfKey**/**passwordKey** and **mainKey**. This enables **mainKey** to be
  easily rotated as the new key can be re-encrypted under the public key of each
  **prfKey** and **passwordKey**, instead of requiring each **prfKey** and
  **passwordKey** to be available to re-wrap the new **mainKey**.

- **privateKey** now labeled in diagram as "ECDSA secp256r1" instead of "EC
  secp256r1".


## Changes from v1 to v2

- Deleted **outerSessionKey**. **innerSessionKey** is renamed to **sessionKey**
  and is now stored in plaintext in session storage alongside the
  `privateDataJwe` which it encrypts.

- Moved cache of WebAuthn RP ID and user handle from local storage to session storage.

These changes were made in order to support using the app in multiple tabs
signed in to the same account, and to sign out of existing tabs if any tab signs
out or signs in to a different account.


## Encryption Architecture v4

wwWallet uses the [WebAuthn `prf` extension](https://w3c.github.io/webauthn/#prf-extension)
to derive encryption keys for the wallet contents, including the user's private
proof signing keys. This document explains the encryption architecture and its
design rationale, as well as providing critique of the same.

[![Diagram: Wallet encryption architecture](../../static/img/diagrams/wallet-encryption-architecture-v4.svg)](../../static/img/diagrams/wallet-encryption-architecture-v4.svg)
<!-- Diagram source: https://drive.google.com/file/d/11WwhOANrvVkPccRf5_uUMU9NaOgyzWN3 -->

The wallet uses the following keys and data types, as labeled in the above diagram:

- `EncryptedContainer`: The user's wallet contents in encrypted form. This is
  stored both in the backend server database, and downloaded to the client's
  [local storage][localStorage] when the user signs in to the wallet.

- `PrivateData`: The cleartext contents of an `EncryptedContainer`. This
  contains both sensitive data, namely the proof signing **privateKey** of each
  credential, and non-sensitive data, including key identifiers and public keys.
  All of these contents are encrypted at rest on both the server side and the
  client side.

- `EphemeralEncapsulationInfo`: An ephemeral ECDH public key and auxiliary
  parameters to use for unwrapping the **mainKey** used to encrypt the
  `EncryptedContainer`. This is shared between all **prfKey**s and
  **passwordKey**s in the `EncryptedContainer`.

- `StaticEncapsulationInfo`: A wrapped copy of the **mainKey** along with a
  static ECDH key pair **wrapPublicKey** and **wrapPrivateKey**. This is unique
  per **prfKey** and **passwordKey**. The ECDH private key is in turn wrapped by
  the associated **prfKey** or **passwordKey**.

  When creating a new **mainKey**, a new **ephPublicKey** and **ephPrivateKey**
  pair is created and each `StaticEncapsulationInfo` is updated as follows. An
  ECDH exchange is made between **ephPrivateKey** and the **wrapPublicKey** of
  the `StaticEncapsulationInfo`. The resulting **wrappingKey** is used to wrap
  the new **mainKey**, and the resulting wrapping is stored in the
  `StaticEncapsulationInfo`. Finally, the **ephPublicKey** is stored in the
  `EphemeralEncapsulationInfo` of the `EncryptedContainer` and the
  **ephPrivateKey** is discarded.

  During sign-in, the user chooses a **prfKey** or **passwordKey** which is used
  to unwrap the **wrapPrivateKey** stored in the associated
  `StaticEncapsulationInfo`. The opposite ECDH exchange is made between
  **wrapPrivateKey** and the stored **ephPublicKey** to derive the
  **wrappingKey** used to unwrap the **mainKey** stored in the
  `StaticEncapsulationInfo`, and finally **mainKey** is used to decrypt the
  `EncryptedContainer`.

- **privateKey**: One of the user's proof signing secp256r1 private keys. Each
  **privateKey** is associated with a single digital credential, and is the
  long-lived key that is used to prove the user's ownership of that credential.
  Each key is generated as part of the credential issuance flow.

  Each **privateKey** member of `PrivateData` is encrypted an additional time
  using the same encryption key.

- **mainKey**: The 256-bit AES-GCM encryption key of the `EncryptedContainer`.
  This is used to decrypt the contained `PrivateData` and is itself stored in
  encrypted (wrapped) form in the `EncryptedContainer`, asymmetrically encrypted
  using each of the user's **prfKey**s and, if applicable, **passwordKey**.

  The **mainKey** is generated as part of creating the user's wallet when
  they first create a wwWallet account, and replaced any time the encrypted
  contents change.

  For user convenience, the **mainKey** is stored in cleartext in the client's
  [session storage][sessionStorage] for the duration of a session.

- **prfKey**: A 256-bit AES-GCM encryption key derived using the WebAuthn `prf`
  extension. This is used to wrap and unwrap an associated
  `StaticEncapsulationInfo` structure in order to decrypt the
  `EncryptedContainer` contents during sign-in.

  The user may have 0 or more instances of **prfKey** (or at least 1, when
  password authentication is disabled), each corresponding to a WebAuthn
  credential the user may use to sign in to the backend service. Each **prfKey**
  has its own unique associated `StaticEncapsulationInfo`.

  The **prfSalt** and HKDF parameters used to derive **prfKey** are randomly
  generated once, when the corresponding WebAuthn credential is registered.

  **prfKey** is only kept in volatile memory, and is never written to persistent
  storage.

- **passwordKey**: A 256-bit AES-GCM encryption key derived from a password
  using PBKDF2. This is a legacy feature that is usually disabled. Like
  **prfKey**, this is used to wrap and unwrap an associated
  `StaticEncapsulationInfo` structure in order to decrypt the
  `EncryptedContainer` contents during sign-in. The **passwordKey** has its own
  unique associated `StaticEncapsulationInfo`.

  The PBKDF2 salt used to derive **passwordKey** is randomly generated once,
  when the account is created. Changing the password is not possible as of this
  writing.

  **passwordKey** is only kept in volatile memory, and is never written to
  persistent storage.

- **wrapPrivateKey** and **wrapPublicKey**: The static ECDH keypair of a
  `StaticEncapsulationInfo`. These are used to perform an ECDH exchange with the
  **ephPublicKey** or **ephPrivateKey**, respectively, to derive the
  **wrappingKey** used to decrypt or encrypt the **mainKey**.

  Each **wrapPrivateKey** is kept encrypted in long-term storage. Each
  **wrapPublicKey** is stored in cleartext in the `StaticEncapsulationInfo`.

- **ephPrivateKey** and **ephPublicKey**: An ephemeral ECDH keypair for wrapping
  the **mainKey**. These are used to perform an ECDH exchange with a
  **wrapPublicKey** or **wrapPrivateKey**, respectively, to derive the
  **wrappingKey** used to decrypt or encrypt the **mainKey**.

  **ephPublicKey** is stored as an `EphemeralEncapsulationInfo` structure in the
  `EncryptedContainer`. **ephPrivateKey** is only kept in volatile memory, and
  is discarded after wrapping the **mainKey**.

  Upon successful sign-in, the **mainKey** is derived as described above and
  stored in cleartext in [session storage][sessionStorage] for the duration of
  the session. Whenever the application needs to access or modify the encrypted
  data, this stored **mainKey** is used to decrypt the local copy of the
  `EncryptedContainer`.


## Design rationale

The primary concerns during the development of this design was to keep all key
material on the client side, and to minimize the exposure of long-lived secrets.
The following subsections expand on the major design choices.


### Replacing the **mainKey** on changes

Using each encryption key for only a single message, by replacing the
**mainKey** anytime the encrypted contents change, reduces the exposure of
long-lived secrets. If a **mainKey** is stolen, it allows access to only a
single version of the encrypted contents - a version which was also present in
cleartext at the same time the **mainKey** was, so the exposed **mainKey** does
not increase the impact of the theft. This means that the protections for the
key do not need to be stronger than those for the message, so it is acceptable
to keep the key in cleartext whenever the message is also in cleartext.


### Selection of client-side storage areas

We use the [Web Crypto API][webcrypto] for encryption, decryption and key
management operations. The `CryptoKey` objects do not survive page reload or
top-level navigation unless stored in some persistent storage. We use two
client-side storage areas: [local storage][localStorage] and [session
storage][sessionStorage].

#### Local storage

We store the `EncryptedContainer` in [local storage][localStorage] in
anticipation of the possibility to use the wallet in offline mode in the future.
We also cache some other parameters:

- The **prfKey** derivation parameters for each user that has logged in on the
  machine, and a display name for the user. These are used to eliminate the need
  for the user to authenticate twice to sign in to the wallet: once to retrieve
  the `EncryptedContainer`, including the PRF salts used to derive a **prfKey**,
  and once to evaluate the PRF with the retrieved salt. The cached salt allows
  both of these steps to be performed in a single WebAuthn authentication
  ceremony. The user may delete any entry of this cache while logged out.

- The user's WebAuthn user handle, needed to detect if the user signs in to a
  different account in a different browser tab and log out of the older tab in
  that case.


#### Session storage

We store the **mainKey** in [session storage][sessionStorage] so that it expires
when the user closes the browser tab. The application will also erase the
**mainKey** after 15 minutes (configurable) of user inactivity.

We also cache some other parameters:

- The user's WebAuthn user handle, needed to detect if the user signs in to a
  different account in a different browser tab and log out of the older tab in
  that case.


### Encrypting **privateKey** twice

Since **privateKey**s are more sensitive than other members of `PrivateData`,
we encrypt it an additional time so that we can access the other members of
`PrivateData` without exposing **privateKey**s in cleartext unnecessarily.


### Using **prfKey** and **passwordKey** to wrap en ECDH private key

The [`deriveKey()`][derive-key] function in WebCrypto does not support deriving
an ECDH private key deterministically, for example from PRF output or from an
PBKDF2 output key. Therefore we instead have to generate the ECDH key pair
nondeterministically and store the wrapped private key.


## Critique

This design has some drawbacks, and some of the intended advantages are
debatable. The following critique may inform a revised design. This is not
exhaustive; we invite additional and ongoing review and critique of the design.


### Weak encryption at rest

The **mainKey** is stored in cleartext in [session storage][sessionStorage] for
user convenience: once logged in, the key can be used for the duration of the
session to access encrypted data. This means that although the
`EncryptedContainer` itself is stored in encrypted form, we also store the
encryption key needed to decrypt it. This means that the encryption at rest is
at best a "security by obscurity" obfuscation measure or, more charitably, a
dubious form of "defense in depth". It would thus be preferable to retrieve or
derive the encryption keys from data not stored in cleartext on the client
device.

The stored key could be eliminated in favour of simply re-deriving the
**prfKey** or **passwordKey** whenever sensitive contents need to be accessed.
This would require the user to perform an authentication ceremony (presenting a
WebAuthn credential or entering a password) for each access. This may or may not
be an acceptable user experience. The keys could be kept in application memory
for a short time to avoid bursts of multiple authentication prompts during a
single semantic user action. In fact the app already does this when adding or
deleting WebAuthn credentials, which each need a corresponding **prfKey**.


### Encrypting **privateKey** twice

Likewise, encrypting **privateKey** twice may not materially improve security
either. An adversary with read access to the other `PrivateData` members will
likely also have read access to both of local storage and session storage, thus
having access to the keys needed to decrypt **privateKey** anyway.


### **passwordKey** is not entirely client-side

When a **passwordKey** is used, the key material and algorithm parameters needed
to derive **passwordKey** are exposed to the backend service. To make
**passwordKey** entirely client-side, making it impossible for the backend
service to access the contents of the `EncryptedContainer`, a different
passphrase should be used to derive **passwordKey** than is used to sign in to
the backend service. Alternatively, some password blinding method such as a
[PAKE](https://en.wikipedia.org/wiki/Password-authenticated_key_agreement)
protocol might be used to keep the backend server from learning the user's
password.


### Software keys, not hardware keys

All cryptographic keys used by wwWallet are fundamentally software keys, held in
browser memory. This is due to technical limitations, some of which may change
in the future.

However, note the difference between encryption keys and signing keys.
Encryption and decryption inherently involves exposing the cleartext anyway, so
encryption keys do not need to be kept secret from parties accessing the
cleartext.

The WebAuthn `prf` extension simply returns pseudo-random data which wwWallet
uses to derive encryption keys. Thus the encryption keys are software keys held
by the browser, but the WebAuthn authenticator holding the PRF key is needed in
order to access the PRF outputs. This is sufficient hardware binding for
encryption keys, assuming the browser is benevolent.

Ideally the **privateKey**s should be hardware-bound keys, so that even if the
**mainKey** or the `PrivateData` is exposed, an unauthorized party would still
not be able to sign proofs on behalf of the legitimate user. This is not
currently possible due to technical limitations. Although WebAuthn
authentication keys may be hardware-bound, they do not support signing arbitrary
data. Future extensions to the WebAuthn API might add the possibility to sign
arbitrary data with a hardware-bound private key.


[cryptokey]: https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey
[derive-key]: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
[localStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[sessionStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[webcrypto]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API