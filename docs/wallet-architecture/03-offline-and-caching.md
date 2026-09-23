---
sidebar_position: 3
---

# Offline support and caching

Offline login is available only after the user has successfully logged in or created an account online on the same browser. That first online session stores the account information needed for local access. If the account has never been used on that browser, it cannot be opened offline.

Once the account is cached, the user can unlock the wallet with WebAuthn, view stored credentials and activity and make supported local changes while the backend is unavailable. Flows that depend on an issuer, verifier, or the wallet backend still require a network connection.

Offline support has three parts:

1. A service worker caches the application shell and static files.
2. Application code caches selected metadata and media in IndexedDB.
3. The encrypted wallet and the account information needed for local unlock are stored in the browser.

The service worker is limited to application delivery. Authenticated API responses and wallet data are handled by the application, where the storage and synchronization rules are explicit.

## Caching strategies

| Resource | Strategy | Notes |
| --- | --- | --- |
| Content-hashed JavaScript, CSS and other build files | Workbox precache | A new build produces new revisions, so outdated files can be removed safely. |
| Manifest, theme, logos, icons and PWA screenshots | Runtime-generated precache | URLs include a manifest or branding hash. Branding can therefore be updated when runtime configuration is injected, without rebuilding the application bundle. |
| `index.html` | Network-first | The worker waits up to three seconds for the network, then falls back to the app-shell cache. The cache is scoped by the configured base path. |
| Images | Stale-while-revalidate | The image cache holds up to 200 entries. Versioned branding images use the precache instead. |
| Fonts | Cache-first | The font cache holds up to 50 entries. |
| Issuer and verifier lists, account information and related backend data | IndexedDB | Depending on the caller, data is read from the cache first or refreshed from the network. Cached data is also used when a request fails. |
| Proxied metadata and remote media | IndexedDB | Caching is opt-in. `Cache-Control: max-age` is respected, with a default lifetime of 30 days when no value is provided. Binary responses are stored in a reload-safe form. |
| Encrypted wallet state | IndexedDB | The encrypted container is updated after wallet changes. Decrypted wallet contents are not persisted. |

For proxied requests, `useCache: true` allows a fresh cache hit. `useCache: false` forces a network refresh but still stores the successful response. If the option is omitted, successful responses are not persisted. Error caching is controlled separately through `cacheOnError`.

Opted-in responses marked `no-store` are kept only in memory for the current page session and only while connectivity is online or still being determined. They are not used as an offline fallback.

When the wallet is offline, the proxy skips the network and returns the persistent entry even if it has expired for normal online use. If no entry is available, it returns a local `504` response.

## Service worker registration and updates

The production build uses a custom Workbox service worker generated through Vite's `injectManifest` strategy. Registration happens after the page loads and is scoped to the wallet's configured base path. Before registering, the client verifies that the worker URL returns JavaScript. This prevents the development server's HTML fallback from being registered as a service worker.

When an update is found, the new worker activates immediately, takes control of open clients and removes outdated caches. Existing wallet tabs are then navigated to their current URL so they load the new application files. This navigation is skipped when the service worker is installed for the first time.

Browsers already check for service-worker updates periodically. wwWallet also requests an update check during authentication flows so a new deployment can be picked up sooner.

### Navigation fallback

The service worker only returns the application shell for known wallet routes. File requests, internal paths and paths handled by a configured proxy bypass the shell. Deployment-specific path prefixes are normalized before route matching.

Restricting the fallback prevents backend endpoints and unrelated URLs from being treated as application pages.

## Connectivity detection

`navigator.onLine` is not treated as proof of internet access. The wallet checks the backend's `/status` endpoint with a five-second timeout and uses that result as its online state.

- Browser `online` and `offline` events trigger a check.
- While offline, the wallet checks every seven seconds.
- While online and visible, it checks every 20 seconds.
- Online polling pauses while the page is hidden.

The measured response time is also used for the connection-quality indicator. When the wallet is offline, the UI shows a warning and disables network-dependent actions.

## Offline access and wallet encryption

After the user logs in online for the first time, the browser stores:

- Basic account information.
- The encrypted wallet.
- Metadata, logos and other previously downloaded resources.

When offline, the wallet does not contact the backend. The user unlocks the locally stored wallet with WebAuthn and the authenticator's PRF output is used to decrypt it. This is only a local unlock, not an online login verified by the backend.

Credentials and proof-signing keys remain encrypted. Display names, account identifiers, metadata and images are cached separately. The decryption key is kept only for the active browser session. See [Encryption Architecture](./06-encryption-architecture.md) for details.

## Reconnecting and synchronizing

Supported offline changes, such as credential deletion, are recorded in the local encrypted wallet.

When connectivity returns:

1. The wallet compares the server version with the last version seen by the browser, using an ETag.
2. If the server version is unchanged, synchronization is complete.
3. If the versions differ or the check fails, the wallet asks the user to authenticate again.
4. After authentication, the wallet merges the local and remote event histories, encrypts the result and updates the local cache.

An unfinished synchronization is remembered for the browser session, so reloading the page continues the appropriate authentication flow.

## Limitations

- Offline access works only after the account has been used online in the same browser with a compatible WebAuthn authenticator.
- After the service worker takes control, the wallet must be opened online once to cache the main page reliably.
- Features that depend on a server still require an internet connection. These include signup, credential issuance, remote verifier redirects and passkey management.
- Browser storage is separated by origin. The app-shell cache is also separated by base path, but other stored data may not be.
- Cached data may be removed when the user clears site data, uses private browsing, or the browser runs out of storage. Resources that were never downloaded are not available offline.
- Image and font caches have size limits. Metadata and proxy caches do not currently have an overall size limit or automatic cleanup.
- Offline behavior must be tested with a production build because the development server does not use the service worker.
