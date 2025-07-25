---
sidebar_position: 1
---

# Implementing BBS and JPT

THIS DOCUMENT IS A WORK IN PROGRESS.

Version 0.4.0 (?) of the wwWallet ecosystem includes experimental implementations of Zero-Knowledge Proofs (ZKP)
using the [JSON Proof Token (JPT)][jpt] format and a variant of the [BBS signature scheme][bbs-ietf].

## Overview

- Issuer-Verifier unlinkability will likely require ZKP solutions.
- The [BBS signature scheme][bbs-ietf] produces Zero-Knowledge Proofs of Knowledge (ZKPK)
  that can be used for unlinkable presentations,
  and is undergoing standardization in IETF.
- The proposal "Device Binding for BBS Signatures" by Cordian Daniluk and Anja Lehmann
  (Hasso-Plattner-Institute, University of Potsdam)
  describes a "Split BBS" scheme modified for provable security
  with a hardware secure element (SE) for holder binding.
  - BBS requires elliptic curve pairings, but not in the SE.
    The SE only needs to implement a modified Schnorr signature on the prime field curve.
  - The IETF draft is not compatible with Split BBS, but needs few modifications to be compatible.
  - A further modification proposed by Emil Lundberg (Yubico)
    adjusts the scheme to need only one round-trip to the SE instead of two.
    This proposal has been submitted to Anja Lehmann and Anna Lysyanskaya for security analysis.
    We will call this scheme "Split BBS v2.1".

- wwWallet 0.4.0 (?) includes a proof of concept of verifiable credentials
  using Split BBS v2.1 on the BLS12-381 curve.
  - The POC is based on the SD-JWT based wallet protocols,
    modified to use [JSON Proof Tokens (JPT)][jpt] in place of SD-JWT
    and BBS in place of ECDSA.
  - [SD-JWT VC claims metadata][sd-jwt-vctm] and [OpenID DCQL][dcql]
    serve crucial roles in mapping VC claims to BBS attributes.
  - The [IETF BBS construction][bbs-ietf] is used, but modified for Split BBS v2.1.


## Background

One of the more challenging requirements of EUDI is the privacy guarantees:
users should be in control of what data they disclose, and user tracking should be prevented as far as possible.
These requirements are impractical or impossible to satisfy with currently established public-key cryptography,
but can be satisfied by various Zero-Knowledge Proof (ZKP) techniques.
Many of these techniques are well understood in academia but do not yet have mature industry standards.

One of these techniques is the BBS signature scheme.
A BBS signature uses elliptic curve cryptography and curve pairings to commit to zero or more attribute values.
A BBS ZKPK discloses zero or more of those attribute values and guarantees that:
- the holder knows a signature made by the relevant issuer's public key.
- the holder knows all attribute value commitments signed by the issuer signature.
- all disclosed attribute values are equal to the corresponding commitments signed by the issuer.
- the verifier gains no other information beyond the previous three bullet points,
  any disclosed attribute values and the number of undisclosed attributes.
  In particular, the verifier knows the issuer public key but does not learn the issuer signature.
- if one of the attribute commitments is an elliptic curve public key,
  then each BBS ZKPK is also a proof of knowledge of the corresponding private key.
  This enables cryptographic holder binding for every ZKPK presentation,
  even without disclosing the public key in the ZKPK.


## Technical details


### Replacing SD-JWT with JPT in wallet protocols

The POC uses the SD-JWT based wallet protocols with minimal modifications
to use [JSON Proof Tokens (JPT)][jpt] in place of SD-JWT and BBS in place of ECDSA.


#### Introduction to JPT

JPT is designed as an equivalent of [JSON Web Tokens (JWT)][jwt] but using ZKP in place of conventional cryptography.

The main difference is that JWT has a single form while JPT has two,
and JWT has a single payload while JPT has one or more payloads.

A JWT consists of a header, a single payload and a signature.
An issued JPT consists of an issuer header, one or more payloads and one or more proof values;
and a presented JPT consists of a presentation header, an issuer header, a disclosure or non-disclosure of each payload and one or more proof values.
An issued JPT is to be known exclusively by the issuer and JPT holder,
while presented JPTs may be shared with verifiers.

The presentation header is chosen solely by the JPT holder and may be different for each presentation,
while the issuer header must be disclosed and unchanged for all presentations.
To maintain unlinkability, the issuer header therefore must not include values that may serve as correlation handles.

The JPT holder may choose for each JPT presentation which payloads to disclose and which to not disclose.
Undisclosed payloads appear as empty slots in a fixed-order array.
Verifiers gain no information about undisclosed payloads except their position in the payloads array;
these positions may however leak additional information as we will discuss further in the next section.

JPT payloads correspond one to one with BBS attributes when BBS is used as the JPT proof algorithm.
The BBS signature scheme has "header" and "presentation header" parameters
which correspond directly to the JPT issuer header and presentation header respectively.


#### Using JPT for verifiable credentials

To use JPT for verifiable credentials (VC),
VC claims must first be mapped to JPT payloads, i.e., BBS attributes.
The wallet protocols already include a tool we can use for this:
[SD-JWT VC claims metadata][sd-jwt-vctm] and [OpenID DCQL][dcql].

An SD-JWT VC type metadata (VCTM) document has a structure like this (irrelevant values omitted for brevity):

```json
{
  "vct": "urn:eudi:pid:1",
  "name": "Example ARF 1.8 PID SD-JWT TYPE METADATA",
  "description": "...",
  "display": [ ... ],
  "claims": [
    {
      "path": ["family_name"],
      "sd": "always",
      "svg_id": "family_name",
      "display": [...]
    },
  ],
  "schema_uri": "...",
  "schema_uri#integrity": "..."
}
```

We can use the `"claims"` definition as an index of addressable claim paths.
We will ignore everything except the `"path"` attribute of each element in `"claims"`.
For example:

```json
{
  "claims": [
    {"path": ["jti"]},
    {"path": ["sub"]},
    {"path": ["iat"]},
    {"path": ["family_name"]},
    {"path": ["given_name"]},
    {"path": ["birthdate"]},
    {"path": ["place_of_birth"]},
    {"path": ["place_of_birth", "locality"]},
    {"path": ["place_of_birth", "region"]},
    {"path": ["place_of_birth", "country"]},
    {"path": ["nationalities", null]},
    {"path": ["nationalities"]},
    {"path": ["personal_administrative_number"]},
    {"path": ["picture"]},
    {"path": ["birth_family_name"]},
    {"path": ["birth_given_name"]},
    {"path": ["sex"]},
    {"path": ["email"]},
    {"path": ["phone_number"]},
    {"path": ["address"]},
    {"path": ["address", "formatted"]},
    {"path": ["address", "street_address"]},
    {"path": ["address", "house_number"]},
    {"path": ["address", "postal_code"]},
    {"path": ["address", "locality"]},
    {"path": ["address", "region"]},
    {"path": ["address", "country"]},
    {"path": ["age_equal_or_over"]},
    {"path": ["age_equal_or_over", "14"]},
    {"path": ["age_equal_or_over", "16"]},
    {"path": ["age_equal_or_over", "18"]},
    {"path": ["age_equal_or_over", "21"]},
    {"path": ["age_equal_or_over", "65"]},
    {"path": ["age_in_years"]},
    {"path": ["age_birth_year"]},
    {"path": ["issuing_authority"]},
    {"path": ["issuing_country"]},
    {"path": ["date_of_expiry"]},
    {"path": ["date_of_issuance"]},
    {"path": ["document_number"]},
    {"path": ["issuing_jurisdiction"]},
    {"path": ["trust_anchor"]}
  ],
}
```

The above definition would produce JPTs with 42 payloads,
each containing the claim value resolved from the corresponding `path` in the `claims` list.
Claim paths not present in the claim set map to empty payloads,
which the holder can choose to never disclose.
This enables the holder to selectively disclose attributes
with a granularity defined exactly by this list of claim paths.

The drawback of this is of course that presentations can _only_ resolve claim paths explicitly declared in the VCTM.
For example, the definition above enables disclosure of _all_ values in the `"nationalities"` claim, but not of individual values.
Selective disclosure of individual values would require a declared path for each index:

```json
{
  "claims": [
    {"path": ["nationalities"]},
    {"path": ["nationalities", 0]},
    {"path": ["nationalities", 1]},
    {"path": ["nationalities", 2]}
  ],
}
```

This definition would enable selective disclosure of the first three `"nationalities"` elements,
but any elements beyond those could only be disclosed together with _all_ other elements.

However, selective disclosures under this definition leak a lower bound on the `"nationalities"` array:
if the holder discloses the `["nationalities", 1]` value,
this reveals that their `"nationalities"` claim contains at least two values even though only one value was disclosed.

This mapping is also not fully reversible for claim paths containing the `null` index,
which selects all elements of an array.
For example, imagine an array-valued `"addresses"` claim:

```json
{"path": ["addresses", null, "country"]}
```

This claim path would resolve to an array containing the `"country"` attribute of each element of the `"addresses"` claim.
This mapping is not reversible: for example, the payload value `["GR", "SE"]`
may have originated from either of the following claim sets or an infinite set of other values:

```json
{"addresses": [{ "country": "GR" },
               { "country": "SE" }]}

{"addresses": [{ "locality": "Stockholm" },
               { "country": "GR" },
               { "country": "SE" }]}
```

Therefore, verifiers requesting indefinite claim queries must be prepared to handle their results separately
from definite queries, whose results may be mapped back into one cohesive data structure.


#### Using JPT in place of SD-JWT

TODO

- `dc+jpt`
- [Using SD-JWT PID metadata](https://github.com/wwWallet/wallet-enterprise/blob/d86d66b16d74fed45eedb643393a89ff5d763e9e/src/credentials/SupportedCredentialsConfiguration/PIDSupportedCredentialJptVCDM.ts#L29)
  - FIXME: Unnecessary inclusion of `dpk` in claims metadata (`dpk` is an implicit special payload)
- [`urn:eudi:pid:1:dc:jpt`](https://github.com/wwWallet/wallet-enterprise/blob/d86d66b16d74fed45eedb643393a89ff5d763e9e/src/credentials/SupportedCredentialsConfiguration/PIDSupportedCredentialJptVCDM.ts#L64)
- JOSE `typ: "jpt"`
- JOSE `alg: "experimental/SplitBBSv2.1"`
- Some claims deleted: `cnf`, `jti`, `vct#integrity`
- Some claims moved to issuer header: `vct`
- [Hacks to masquerade as SD-JWT to DCQL library](https://github.com/wwWallet/wallet-frontend/blob/c85b1f5e29481b9c202806252007dd1b3328adc4/src/lib/services/OpenID4VP/OpenID4VP.ts#L271-L282):

  ```
  shaped.vct = issuerHeader.vct;
  if (shaped.vct.endsWith(':dc:jpt')) {
      shaped.vct = shaped.vct.substring(0, shaped.vct.length - 7); // TODO: Unhack this
  }
  shaped.claims = signedJptClaims.simple;
  shaped.cryptographic_holder_binding = true;
  shaped.credentialIdentifier = vc.credentialIdentifier;
  shaped.credential_format = 'dc+sd-jwt'; // TODO: Unhack this
  for (const credQuery of dcqlJson.credentials) {
      if (credQuery.format === 'dc+jpt') {
          credQuery.format = 'dc+sd-jwt'; // TODO: Unhack this
      }
  }
  ```

  Otherwise wallet protocols mostly unchanged

- [`signedClaims` may now be `signedJptClaims`](https://github.com/wwWallet/wallet-enterprise/compare/refactor/default-credential-configurations...bbs#diff-cb0872c383f75c6a22329662c8d40ad9e5c06a5e206a4ae8c9685aeee38f9ed7R375)
- Implementation not resolving `vctm` from URL
- `transactionDataResponseParams` seems to just work


### Differences between IETF BBS and Split BBS v2.1

Split BBS v2.1 makes the following modifications compared to the [IETF BBS draft][bbs-ietf].
In summary:

- Split BBS v2.1 encodes a holder binding public key `dpk` as a special attribute.
- Split BBS v2.1 splits the computation of `T2` between host (client software) and SE.
  `T2` is omitted from the initial challenge hash,
  and the SE computes an additional hash over a random nonce, `T2` and first challenge digest.
- The additional random nonce may not be necessary; security analysis pending.


In more detail:

- Split BBS v2.1 always includes a special `dpk` (device public key) attribute,
  which is a public key on the G1 curve.
  This is the key held by the secure element (SE) and used for cryptographic holder binding.

  `dpk` must never be disclosed, and therefore has no corresponding message index.

- BBS attribute commitments are elliptic curve points,
  and the corresponding attribute values are the discrete logarithms of those points.
  The discrete logarithm of `dpk` is the SE secret key,
  so the issuer "blindly signs" the point `dpk` instead of computing the commitment point from a known message scalar.

- IETF BBS selects a pseudo-random list of message generators per cipher suite.
  Since the SE needs to sign ZKPK presentations using `dpk`,
  we choose the standard base point of G1 as a constant generator point `g1` for `dpk`.

- IETF BBS sets the first BBS attribute to a `domain` value
  which commits to the issuer public key `PK`,
  the generator point `Q_1` for `domain`,
  the generator points `H` for the other attributes,
  an arbitrary `header` octet string chosen by the issuer,
  and a domain constant `api_id` defined by the cipher suite.

  Split BBS v2.1 prepends the `dpk` generator to the `H` points in the `domain` calculation.

- BBS proof generation involves computing a `T2` value which encodes message commitments.
  Split BBS v2.1 renames this value to `T2bar` and omits `dpk` from the message commitments.

  Next, BBS proof generation computes a `challenge` hash over `T2` and other values.
  Split BBS v2.1 omits `T2bar` (renamed from `T2`) from this hash, and renames `challenge` to `c_host`.

  Finally, BBS proof generation uses `challenge` and a collection of random scalars, including one random scalar per message, to finish the proof.
  In Split BBS v2.1, the SE receives `T2bar` (renamed from `T2`) and `c_host` as inputs
  and chooses a random nonce `n` and a random scalar `rdsk`.
  The SE computes `T2 = T2bar + g1 * rdsk` and a second hash `c = -H(n, T2, c_host)`.
  Note that `c` is negated;
  this is because Daniluk-Lehmann's proposal writes `sa1 = rdsk - c * dsk` using subtraction
  (this is consistent with the Schnorr NIZK described in [RFC 8235][rfc8235-ec-nizk])
  while ProofFinalize in BBS uses addition in `m^_j = m~_j + undisclosed_j * challenge (mod r)`.
  The result is a signature over `c_host` and `T2bar` consisting of the scalar `sa1`, the challenge `c` and the nonce `n`.
  The client software finishes the proof using `sa1` as the proof scalar for `dpk` and `c` in place of `challenge`.

  The resulting proof contains the additional scalar `sa1` and nonce `n` compared to the IETF proof.
  The nonce `n` might not be necessary; security analysis of this is pending.

- BBS proof verification involves computing a `T2` value to verify message commitments.
  Split BBS v2.1 adds `g1 * sa1` into `T2` analogously to the other message commitments.

  Next, the BBS verification procedure computes `challenge` and uses it to verify the proof.
  Split BBS v2.1 renames `challenge` to `c_host` and omits `T2` from the computation of `challenge`,
  and uses `c = H(n, T2, c_host)` in place of `challenge`.



[bbs-ietf]: https://www.ietf.org/archive/id/draft-irtf-cfrg-bbs-signatures-08.html
[dcql]: https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-digital-credentials-query-l
[jpt]: https://www.ietf.org/archive/id/draft-ietf-jose-json-proof-token-10.html
[jwt]: https://www.rfc-editor.org/rfc/rfc7519.html
[rfc8235-ec-nizk]: https://www.rfc-editor.org/rfc/rfc8235#section-3.3
[sd-jwt-vctm]: https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-09.html#name-claim-metadata
