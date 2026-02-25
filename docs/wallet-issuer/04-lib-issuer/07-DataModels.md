---
---

# Data Models

## State Data Model

The `State` data model is the main model used for the temporary storage
of credential issuance flow state.

- id: string;
- sub: unique identifier of the associated account
- clientId: client_id value received from the wallet
- attestedKeys: An array of JWK objects. These keys will be used
  to bind each verifiable credential with a unique public key provided
  by the wallet.
- credentialConfigurationId: string | null
- transactionId: Each credential request is binded to a single transaction id.
  This value is also used as an identifier for the credential request by
  the OpenID4VCI 1.0
- scope: Scopes to be released to the wallet during credential issuance
- iso_datetime_created: The timestamp in ISO string format, in which the state was created.
