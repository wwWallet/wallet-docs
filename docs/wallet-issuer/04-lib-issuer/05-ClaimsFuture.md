---
---

# type ClaimsFuture


```ts
export type ClaimsFuture<Claims> = PendingClaims | RejectedClaims | ResolvedClaims<Claims>;
```

Acts as a Value Wrapper that encapsulates both the claim data
and its current lifecycle state for safe propagation across the system.
This type enables functions to remain "context-aware" by requiring explicit
handling of pending and rejected states before accessing the payload. It models
Asynchronous State Transitions for claims, explicitly handling pending,
rejected, and resolved outcomes. This was required in order to support
deferred credential issuance scenarios.
