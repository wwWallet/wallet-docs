---
sidebar_position: 2
---

# Specification 





## Overview

* **Abstracts** the complex functionalities of an **Enterprise Verifier Web Application**.
* **Interoperable** with the **EBSI** ecosystem.
* Is **languange agnostic**. The upper layer of the Verifier Application can be implemented using any web framework or programming language.
* Provides a generic API, ready to be adjusted to anyone's needs.
* Built using **open standards** (W3C VC, JWT, OIDC, OAuth2, JSON Schemas).




![alt](../../static/img/diagrams/architecture.svg)

## Database schema


- A **Schema** entity is associated with a set of **Scope** entities.
- A **Presentation Definition** entity is be associated with a set of **Schema** entities.
- A **Presentation Definition** entity can be associated with a subset of **Scopes** entities.
- A **Presentation Definition** entity is associated with many **Presentation** entities.


Hence, the following database schema is produced by the above relations.


![DB schema](../../static/img/diagrams/db-schema.svg)


## Credential-Verifier-as-a-Service Specification

![Credential-Verifier-as-a-Service](../../static/img/diagrams/wallet-enterprise-verifier-core%20spec.drawio.png)




## Standards

- OpenID for Credential Issuance: [Version 1.0-05](https://openid.net/specs/openid-connect-4-verifiable-credential-issuance-1_0-05.html)
- OpenID for Verifiable Presentations: [Version 1.0-10](https://openid.net/specs/openid-connect-4-verifiable-presentations-1_0-10.html#name-response)
- Verifiable Credential Format supported: **jwt_vc**
- Supported Encryption Algorithms: **ES256K**

