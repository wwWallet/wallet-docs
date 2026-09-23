---
---

# Browser / OS Compatibility

## WebAuthn and Passkeys
wwWallet is designed to be compatible with the PRF extension to WebAuthn, ensuring a streamlined and secure registration and authentication process.

To check which Browsers / OS support this, consult the [PRF compatibility matrix](https://github.com/wwWallet/wallet-frontend#prf-compatibility).

## Sharing over Bluetooth
wwWallet supports presenting certain credentials over Bluetooth Low Energy (BLE) by utilizing the WebBluetooth API. 

For browser support check [MDN's WebBluetooth API page](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API).

## Installable Progressive Web App
Browser support for installable PWAs varies by browser and platform. Chromium browsers generally support it on most operating systems, while other browsers provide different installation mechanisms. See [MDN's overview of PWA installation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) for details. 

Firefox does not support manifest-based PWA installation on desktop in the same way as Chromium browsers. Instead, Firefox provides [installable Web Apps](https://firefox-source-docs.mozilla.org/browser/components/taskbartabs/docs/index.html) which offer a similar app-like experience. The desktop feature is enabled by default on Windows. Firefox also supports [installing Web Apps on Android](https://support.mozilla.org/en-US/kb/use-web-apps-firefox-android).