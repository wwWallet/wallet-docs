---
sidebar_position: 5
---

# Add Trusted Certificates


The current Wallet Issuer implementation currently requires importing
the trust anchors to the filesystem under the `certs` directory. All files
need to have the extension `.pem`.

The `yarn setup` command in `wwwallet` repository initializes also this
directory with a trusted root certificate.
