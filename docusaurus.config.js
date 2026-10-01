// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'wwWallet Docs',
  tagline: 'Get started with Issuing and Verifying credentials today!',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://wwwallet.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/wallet-docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wwWallet', // Usually your GitHub org/user name.
  projectName: 'wallet-start', // Usually your repo name.

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.svg',
      navbar: {
        title: 'wwWallet Docs',
        logo: {
          alt: 'wwWallet Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/wwWallet/wwwallet',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Get Started',
            items: [
              {
                label: 'Getting Started',
                to: '/wallet-docs/docs/category/getting-started',
              },
              {
                label: 'Development Setup',
                to: '/wallet-docs/docs/getting-started/development-setup',
              },
            ],
          },
          {
            title: 'Core Sections',
            items: [
              {
                label: 'Wallet Architecture',
                to: '/wallet-docs/docs/category/wallet-architecture',
              },
              {
                label: 'Wallet Handbook',
                to: '/wallet-docs/docs/category/wallet-handbook',
              },
              {
                label: 'Showcase',
                to: '/wallet-docs/docs/showcase',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'GitHub Repository',
                href: 'https://github.com/wwWallet/wwwallet',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} wwWallet, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: lightCodeTheme,
      },
    }),
};

module.exports = config;
