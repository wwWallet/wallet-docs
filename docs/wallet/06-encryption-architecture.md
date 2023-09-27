---
sidebar_position: 1
---

# Encryption Architecture

wwWallet uses the [WebAuthn `prf` extension](https://w3c.github.io/webauthn/#prf-extension)
to derive encryption keys for the wallet contents, including the user's private
proof signing key. This document explains the encryption architecture and its
design rationale, as well as providing critique of the same.

![Diagram: Wallet encryption architecture](../../static/img/diagrams/wallet-encryption-architecture.svg)
<!-- Diagram source: https://drive.google.com/file/d/11WwhOANrvVkPccRf5_uUMU9NaOgyzWN3/view -->

The wallet uses the following keys and data types, as labeled in the above diagram:

- `EncryptedContainer`: The user's wallet contents in encrypted form. This is
  stored both in the backend server database, and downloaded to the client's
  [local storage][localStorage] when the user signs in to the wallet.

- `PrivateData`: The cleartext contents of an `EncryptedContainer`. This
  contains both sensitive data, namely **privateKey**, and non-sensitive data,
  including the user's DID and public proof signing key. All of these contents
  are encrypted at rest on both the server side and the client side.

- **privateKey**: The user's proof signing secp256r1 private key. This is the
  long-lived key that is used to prove the user's ownership of the wallet. This
  key is generated once, as part of creating the user's wallet when they first
  create a wwWallet account.

  The **privateKey** member of `PrivateData` is encrypted an additional time
  using the same encryption key.

  **privateKey** is only kept in volatile memory, and is not written to
  persistent storage in unencrypted form.

- **mainKey**: The 256-bit AES-GCM encryption key of the `EncryptedContainer`.
  This is used to decrypt the contained `PrivateData` and is itself stored in
  encrypted (wrapped) form in the `EncryptedContainer`, encrypted using each of
  the user's **prfKey**s and, if applicable, **passwordKey**.

  This key is generated once, as part of creating the user's wallet when they
  first create a wwWallet account.

  **mainKey** is only kept in volatile memory, and is not written to persistent
  storage in unencrypted form.

- **prfKey**: An 256-bit AES-KW key-wrapping key derived using the WebAuthn
  `prf` extension. This is used to unwrap the **mainKey** in order to decrypt
  the `EncryptedContainer` contents during sign-in.

  The user may have 0 or more instances of **prfKey** (or at least 1, when
  password authentication is disabled), each corresponding to a WebAuthn
  credential the user may use to sign in to the backend service.

  The **prfSalt** and HKDF parameters used to derive **prfKey** are randomly
  generated once, when the corresponding WebAuthn credential is registered.

  **prfKey** is only kept in volatile memory, and is not written to persistent
  storage in unencrypted form.

- **passwordKey**: A 256-bit AES-KW key-wrapping key derived from a password
  using PBKDF2. This is a legacy feature that is usually disabled. Like
  **prfKey**, this is used to unwrap the **mainKey** in order to decrypt the
  `EncryptedContainer` contents during sign-in.

  The PBKDF2 salt used to derive **passwordKey** is randomly generated once,
  when the account is created. Changing the password is not possible as of this
  writing.

  **passwordKey** is only kept in volatile memory, and is not written to
  persistent storage in unencrypted form.

- **innerSessionKey**: A 256-bit AES-GCM encryption key used to decrypt the
  `EncryptedContainer` for the duration of a session.

  Upon successful sign-in, the user's **prfKey** or **passwordKey** is used to
  unwrap **mainKey** which in turn decrypts the `EncryptedContainer` to access
  the cleartext `PrivateData`. The `PrivateData` is then re-encrypted using a
  newly generated **innerSessionKey**, resulting in the ciphertext
  `privateDataJwe` which is stored in the client's [session
  storage][sessionStorage]. The **innerSessionKey** is in turn wrapped using
  **outerSessionKey**, and this wrapped **innerSessionKey** is also stored in
  session storage.

- **outerSessionKey**: A 256-bit AES-KW key-wrapping key used to wrap the
  **innerSessionKey** for the duration of a session.

  Upon successful sign-in, the **innerSessionKey** is wrapped using a newly
  generated **outerSessionKey**. The **outerSessionKey** is then stored in
  cleartext using the browser's [IndexedDB
  API][indexeddb].

  IndexedDB is used for this because it preserves the type of the stored value,
  allowing **outerSessionKey** to be an unextractable [`CryptoKey`][cryptokey]
  object. This is in contrast to local storage and session storage which only
  support string values, requiring any keys stored there to be either stored in
  cleartext or wrapped using another key.


## Design rationale

The primary concerns during the development of this design was to keep all key
material on the client side, and to minimize the exposure of long-lived secrets.
Thus we keep the wallet contents encrypted at rest, and introduced the session
keys by the following rationale.


### Re-encrypting wallet contents to session keys

Since we keep the wallet contents encrypted at rest, we need to decrypt it
whenever we need to access the contents. This would require handling the
**mainKey** for decryption, but the **mainKey** is a long-lived key that is not
easily replaceable (see below). Therefore we use the **mainKey** to decrypt the
contents only once, and then use temporary encryption keys for the remainder of
the session. This way we minimize the exposure of the **mainKey**.


### Selection of client-side storage areas

We use the [Web Crypto API][webcrypto] for encryption, decryption and key
management operations. The `CryptoKey` objects do not survive page reload or
top-level navigation unless stored in some persistent storage. We use three
client-side storage areas: [local storage][localStorage], [session
storage][sessionStorage] and [IndexedDB][indexeddb].

#### Local storage

We store the `EncryptedContainer` in [local storage][localStorage] in
anticipation of the possibility to use the wallet in offline mode in the future.
We also cache some other parameters needed to resume an expired session:

- The WebAuthn RP ID for the wwWallet service, needed to derive **prfKey**s.
  This could be a configuration constant of the frontend app, but the backend
  already sends it during the initial authentication or signup, so we cache the
  value and eliminate the possibility of config mismatch.

- The user's WebAuthn user handle, needed to re-authenticate to the backend
  service.

- The **prfKey** derivation parameters for each user that has logged in on the
  machine, and a display name for the user. These are used to eliminate the need
  for the user to authenticate twice to sign in to the wallet: once to retrieve
  the `EncryptedContainer`, including the PRF salts used to derive a **prfKey**,
  and once to evaluate the PRF with the retrieved salt. The cached salt allows
  both of these steps to be performed in a single WebAuthn authentication
  ceremony. The user may delete any entry of this cache while logged out.

#### Session storage

We store the **innerSessionKey** and re-encrypted `privateDataJwe` in [session
storage][sessionStorage] so that they expire when the user closes the browser
tab.

#### IndexedDB

We store the **outerSessionKey** in [IndexedDB][indexeddb] in order to preserve
it as a `CryptoKey` object, in contrast to local storage and session storage
which require values to be serialized to strings for storage. This allows the
**outerSessionKey** to be an unextractable `CryptoKey` object.

Values stored in IndexedDB have a "best-effort" default lifetime, which is
possibly indefinite. In order to limit the lifetime of the session keys as a
whole, we combine the **outerSessionKey** stored in IndexedDB with the
**innerSessionKey** stored in session storage. Thus when the **innerSessionKey**
expires, the **outerSessionKey** becomes useless even if it remains in
IndexedDB.


### Encrypting **privateKey** twice

Since **privateKey** is more sensitive than other members of `PrivateData`,
we encrypt it an additional time so that we can access the other members of
`PrivateData` without exposing **privateKey** in cleartext unnecessarily.


## Critique

This design has some drawbacks, and some of the intended advantages are
debatable. The following critique may inform a revised design. This is not
exhaustive; we invite additional and ongoing review and critique of the design.


### Rotating the main encryption key

The **mainKey** cannot easily be replaced since that would require access to
each **prfKey** and **passwordKey** in order to update each corresponding key
wrapping. This could be solved by having each **prfKey** and **passwordKey**
wrap an ECDH private key instead of wrapping the **mainKey** directly, and
instead using ECDH to derive the wrapping key for the main key.


### "Unextractable" `CryptoKey`s

We introduced the **outerSessionKey** and thus the IndexedDB storage area in an
effort to keep our `CryptoKey` objects unextractable. However, unextractability
is primarily a defense against accidental programmer error. If there is
malicious code running in the web app, that code most likely also has read
access to all three of local storage, session storage and IndexedDB, and thus
has access to all the values it needs in order to decrypt and exfiltrate
`PrivateData` contents.

Any such malicious code can also overwrite properties of the
`window.crypto.subtle` object in order to intercept Web Crypto calls and alter
arguments, such as altering the `exportable` argument to `true` and exfiltrating
keys as well as cleartexts.

Finally, any values written to either of the three persistent storage areas
should be assumed to be readable by an adversary with read access to the client
device's file systems. Here it also doesn't matter whether keys are flagged as
extractable in the web platform; such an adversary has access to all key
material it needs in order to decrypt the `PrivateData` stored in the file
system.

Thus the **outerSessionKey** may be unnecessary; it may not be materially less
secure to simply store the **innerSessionKey** in cleartext in session storage.
Likewise the **innerSessionKey** might not improve security much either; it may
not be materially less secure to simply store the **mainKey** itself in
cleartext in session storage.


### Weak encryption at rest

Although the `EncryptedContainer` itself is stored in encrypted form, we also
store all encryption keys needed to decrypt it. This means that the encryption
at rest is at best a "security by obscurity" measure or, more charitably, a
dubious form of "defense in depth". It would thus be preferable to retrieve or
derive the encryption keys from data not stored in cleartext on the client
device.

The session keys could be eliminated in favour of simply re-deriving the
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
likely also have read access to all three of local storage, session storage and
IndexedDB, thus having access to the keys needed to decrypt **privateKey**
anyway.


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

Ideally the user's **privateKey** should be a hardware-bound key, so that even
if the **mainKey** or the `PrivateData` is exposed, an unauthorized party would
still not be able to sign proofs on behalf of the legitimate user. This is not
currently possible due to technical limitations. Although WebAuthn
authentication keys may be hardware-bound, they do not support signing arbitrary
data. Future extensions to the WebAuthn API might add the possibility to sign
arbitrary data with a hardware-bound private key.


[cryptokey]: https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey
[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[localStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[sessionStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[webcrypto]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
