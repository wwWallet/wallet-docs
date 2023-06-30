import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/wallet-docs/__docusaurus/debug',
    component: ComponentCreator('/wallet-docs/__docusaurus/debug', '6f6'),
    exact: true
  },
  {
    path: '/wallet-docs/__docusaurus/debug/config',
    component: ComponentCreator('/wallet-docs/__docusaurus/debug/config', '494'),
    exact: true
  },
  {
    path: '/wallet-docs/__docusaurus/debug/content',
    component: ComponentCreator('/wallet-docs/__docusaurus/debug/content', 'd4d'),
    exact: true
  },
  {
    path: '/wallet-docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/wallet-docs/__docusaurus/debug/globalData', 'aff'),
    exact: true
  },
  {
    path: '/wallet-docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/wallet-docs/__docusaurus/debug/metadata', '5b4'),
    exact: true
  },
  {
    path: '/wallet-docs/__docusaurus/debug/registry',
    component: ComponentCreator('/wallet-docs/__docusaurus/debug/registry', 'cb0'),
    exact: true
  },
  {
    path: '/wallet-docs/__docusaurus/debug/routes',
    component: ComponentCreator('/wallet-docs/__docusaurus/debug/routes', '485'),
    exact: true
  },
  {
    path: '/wallet-docs/markdown-page',
    component: ComponentCreator('/wallet-docs/markdown-page', '975'),
    exact: true
  },
  {
    path: '/wallet-docs/docs',
    component: ComponentCreator('/wallet-docs/docs', 'e03'),
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
        path: '/wallet-docs/docs/development-environment-setup/ecoystem-diagram',
        component: ComponentCreator('/wallet-docs/docs/development-environment-setup/ecoystem-diagram', 'f08'),
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
    component: ComponentCreator('/wallet-docs/', 'fbd'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
