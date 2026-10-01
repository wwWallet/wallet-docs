# 2. Wallet state model

Date: 2025-12-04 (implemented 2025-08-04)

## Status

Accepted.

This ADR was written retroactively after the decision and implementation had already been made.


## Context

wwWallet plans to keep all user data (wherever possible) end-to-end encrypted on the client side
under encryption keys associated with the user's passkeys, under the user's sole control.
wwWallet also provides a hosted backend server which stores users' encrypted contents
so that accounts can be accessed on multiple client devices.

Whenever a user makes changes to their account in the frontend app,
the frontend automatically re-encrypts the new wallet contents and uploads the new encrypted data to the server.
Whenever the frontend fetches encrypted user data, it records a hash of that version of the data.
That previous version hash is then advertised whenever new data is uploaded,
and the server refuses the upload if the advertised hash does not match the encrypted data currently stored on the server.
This prevents data loss in case concurrent changes were made in different sessions.

However, prior to wallet-frontend commit [85b6d614f][fe-commit-e2ee]
there was no strategy for resolving such a conflict.
Since the data is encrypted, conflict resolution cannot be done on the server,
it must be done on the client side.
[wallet-frontend pull request #740][fe-pr-e2ee] added a data model to support conflict resolution.


## Decision

To enable automated conflict resolution between concurrent user sessions,
we will implement a wallet state data model as described in the [Data model](./data-model) subpage.

The data model is heavily inspired by the [Redux state architecture][redux-concepts],
the ["map-reduce" programming model][map-reduce]
and the [data model of the Git version control system][git-btmup],
and has the following main characteristics:

- State is modeled as a _base state_ and an array of _events_.
- The base state is never modified directly.
- The _current state_ can be computed by "applying" the events one at a time to the base state.
- Events have a creation timestamp.
  Events older than a set threshold (initially 30 days) are "folded into" the base state,
  meaning the event is applied to the base state and the resulting state becomes the new base state.
- Events are tagged with an identifier of the previous event.
  Whenever an event is "folded into" the base state,
  the new base state is tagged with an identifier of the folded event.
- Each base state and event has a _schema version_.
  Events can be applied to states of lower or equal schema version,
  and the resulting new state has the schema version of the event.
  Attempting to apply a lower-version event to a higher-version state is an error.

  Changes to the state data model require defining a new schema version,
  including new functions for creating and applying new event types.
  Once defined, an existing schema version must not be changed
  other than by pure refactorizations.
  This is to ensure that wallets containing events of older schema versions
  continue to work as intended at the time that wallet state was created.

  New events are always created using the latest schema version in the running frontend version.

This "tail" of events enables the frontend to resolve conflicts between concurrent sessions,
by attempting to linearize and de-duplicate diverged event histories.
This requires a shared point in both histories;
the event identifiers on events and base states enable locating that point
even if one history branch has more events folded into its base state.
This is also why events are "folded into" the base state only after 30 days have passed;
this leaves a window of 30 days where conflicts can be automatically detected and resolved.
At the same time, the 30-day threshold ensures that the event log does not continue growing forever,
consuming more storage space and taking longer to recompute the current state for every change.
We believe this is a good balance between performance and data safety.


## Consequences

### Positive

wallet-frontend can automatically detect and resolve state conflicts between concurrent user sessions,
preventing data loss in such cases.

wallet-frontend can ensure backwards compatibility with states from earlier app versions
in a structured and explicit way.


### Negative

This makes the wallet state data model significantly more complex.
Future changes to the data model will be much more cumbersome to make.

The 30-day threshold for "folding" events ensures a reasonable window for detecting and resolving conflicts,
but also means that the event log can grow without bound within that 30-day window.
This may degrade storage and processing performance for very long event chains,
as the whole event chain needs to be re-evaluated whenever the wallet is opened.


## See also

- [Redux: Core Concepts][redux-concepts]
- [MapReduce][map-reduce]
- [Git from the Bottom Up][git-btmup]


[fe-commit-e2ee]: https://github.com/wwWallet/wallet-frontend/commit/85b6d614fb163d76529f2b4736cf91743f26f3ea
[fe-pr-e2ee]: https://github.com/wwWallet/wallet-frontend/pull/740
[git-btmup]: https://jwiegley.github.io/git-from-the-bottom-up/
[map-reduce]: https://en.wikipedia.org/wiki/MapReduce
[redux-concepts]: https://redux.js.org/introduction/core-concepts
