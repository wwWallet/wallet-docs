# 1. Oblivious HTTP as a Proxy Protocol

Date: 2025-10-23

## Status

Accepted

## Context

The Web platform imposes several challenges to the implementation of the wallet. One of these is the network request restrictions, the one encountered more often being CORS policies. The wallet depends on a proxy (hosted by the wallet provider) to fetch resources behind such restrictions.

While practical, the proxy exposes information about the holder's action to the provider, which has access to the interaction's with issuers and verifiers. 

## Decision

We will implement Oblivious HTTP ([RFC 9458](https://www.ietf.org/rfc/rfc9458.html)) as an opt-in setting. Oblivious HTTP allows a client to make multiple requests to an origin server without that server being able to link those requests to the client or to identify the requests as having come from the same client, while placing only limited trust in the nodes used to forward the messages. The protocol utilizes a relay (wallet provider's backend) and a gateway (commercial or self-hosted, seperate business entity from the provider).

## Consequences

### Positive
- Wallet provider cannot parse the target url or the body of the request, enhancing user privacy.
- Target resource servers get no information about the user's client since all requests originate for the relay (provider), enchancing user privacy.

### Negative
- A new step is added on each request, hurting perfomance.
- The gateway, a new part of the stack managed by a third-party, has access to the request's target and body, as well as the response from issuers and verifiers. This can be mitigated by implementing more privacy-centric profiles of OID specifications.
- Users can still be tracked in some cases. RFC 9458 has a section on [Privacy Considerations](https://www.ietf.org/rfc/rfc9458.html#name-privacy-considerations)

