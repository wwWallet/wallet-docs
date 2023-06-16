import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/wallet-docs/markdown-page',
    component: ComponentCreator('/wallet-docs/markdown-page', '181'),
    exact: true
  },
  {
    path: '/wallet-docs/docs',
    component: ComponentCreator('/wallet-docs/docs', '2ee'),
    routes: [
      {
        path: '/wallet-docs/docs/category/development-environment-setup',
        component: ComponentCreator('/wallet-docs/docs/category/development-environment-setup', 'fcf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/category/enterprise-issuer',
        component: ComponentCreator('/wallet-docs/docs/category/enterprise-issuer', 'd44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/category/enterprise-wallet-core',
        component: ComponentCreator('/wallet-docs/docs/category/enterprise-wallet-core', 'aa6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/category/showcase',
        component: ComponentCreator('/wallet-docs/docs/category/showcase', 'e76'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/development-environment-setup/getting-started',
        component: ComponentCreator('/wallet-docs/docs/development-environment-setup/getting-started', '36c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/enterprise-issuer/application-setup',
        component: ComponentCreator('/wallet-docs/docs/enterprise-issuer/application-setup', '567'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/enterprise-issuer/authentication',
        component: ComponentCreator('/wallet-docs/docs/enterprise-issuer/authentication', '0cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/enterprise-issuer/configuring-credentials',
        component: ComponentCreator('/wallet-docs/docs/enterprise-issuer/configuring-credentials', 'b32'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/enterprise-issuer/configuring-issuer',
        component: ComponentCreator('/wallet-docs/docs/enterprise-issuer/configuring-issuer', '617'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/enterprise-wallet-core/application-setup',
        component: ComponentCreator('/wallet-docs/docs/enterprise-wallet-core/application-setup', '14b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/enterprise-wallet-core/specification',
        component: ComponentCreator('/wallet-docs/docs/enterprise-wallet-core/specification', 'd8f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/wallet-docs/docs/showcase/',
        component: ComponentCreator('/wallet-docs/docs/showcase/', '7ae'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/wallet-docs/',
    component: ComponentCreator('/wallet-docs/', '99f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
