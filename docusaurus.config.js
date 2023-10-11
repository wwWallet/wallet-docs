// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eDiplomas Wallet Ecosystem',
  tagline: 'Get started with Issuing and Verifying credentials today!',
  favicon: 'img/ediplomasLogo.png',

  // Set the production url of your site here
  url: 'https://wwwallet.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/wallet-docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gunet', // Usually your GitHub org/user name.
  projectName: 'wallet-start', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
      image: 'img/ediplomasLogo.png',
      navbar: {
        title: 'eDiplomas Wallet Ecosystem',
        logo: {
          alt: 'eDiplomas Logo',
          src: 'img/ediplomasLogo.png',
        },
        items: [
          {
            position: 'left',
            label: 'Documentation',
						href: "/wallet-docs/docs/category/development-environment-setup"
          },
          {
            href: 'https://github.com/gunet/wallet-ecosystem',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/wallet-docs/docs/category/development-environment-setup',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} eDiplomas Wallet, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: lightCodeTheme,
      },
    }),
};

module.exports = config;
