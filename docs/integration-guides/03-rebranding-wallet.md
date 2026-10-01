---
title: Rebranding the Wallet
sidebar_position: 3
description: Customize the wallet frontend to reflect your use case's purpose or your organization's branding.
---

# Rebranding the Wallet

The wallet can be rebranded with a custom name, tagline, logo, favicon and color theme.

## Wallet name and URL

Set the public identity in the wallet frontend environment:

```dotenv
WALLET_NAME="Example Wallet"
WALLET_TAGLINE="Your credentials, ready when you need them"
STATIC_PUBLIC_URL="https://wallet.example.org"
```

`WALLET_TAGLINE` is optional. If the wallet is hosted below a path such as `/wallet/`, also set `BASE_PATH`.

## Branding assets

Place custom assets in `wallet-frontend/branding/custom`:

```text
branding/custom/
├── favicon.ico
├── theme.json
├── logo/
│   ├── logo_light.svg
│   └── logo_dark.svg
└── screenshots/
    ├── screen_mobile_1.png
    ├── screen_mobile_2.png
    ├── screen_tablet_1.png
    └── screen_tablet_2.png
```

Custom files take precedence over the default wwWallet assets. Provide both light and dark logos. SVG is recommended, PNG is also supported and should be at least 512 by 512 pixels. Logos should be square and include enough padding to display well as app icons.

PWA screenshots are optional. If provided, they will appear in the browser’s install prompt to preview the PWA version before installation. Mobile screenshots must be 828 by 1792 pixels and tablet screenshots 2160 by 1620 pixels.

## Theme colors

Define the brand palette in `branding/custom/theme.json`:

```json
{
  "$schema": "../.schemas/theme.json",
  "brand": {
    "color": "hsl(217 66% 32%)",
    "colorLight": "hsl(217 46% 45%)",
    "colorLighter": "hsl(217 27% 60%)",
    "colorDark": "hsl(217 42% 42%)",
    "colorDarker": "hsl(217 16% 40%)"
  }
}
```

`color` is the primary brand color. The light variants support light mode and the dark variants support dark mode. All five fields are required.

HSL is recommended and each value must be a complete CSS color such as `hsl(217 66% 32%)`. Hexadecimal and RGB colors are also supported. Check that text and controls remain readable in both modes.

For supported screenshots and complete implementation details, see the [wallet-frontend README](https://github.com/wwWallet/wallet-frontend/blob/master/README.md) and its [branding guide](https://github.com/wwWallet/wallet-frontend/blob/master/branding/README.md).
