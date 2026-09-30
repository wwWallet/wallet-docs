---
---

# interface CredentialSigner


This interface serves as a customizable contract that allows
library users to implement their own credential signing logic based on
specific architectural needs. It provides a standardized structure for
issuing SD-JWT VCs and ISO mDL MSO MDoc credentials while offering
full control over key management and salt generation. By implementing
this interface, developers can flexibly define how signing occurs depending
on whether the issuer's keys are stored locally, in a HSM, or via a cloud provider.

The Wallet Issuer service implements this interface in the `src/signer.ts` file.

