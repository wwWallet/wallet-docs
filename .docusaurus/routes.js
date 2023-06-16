import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/__docusaurus/debug',
    component: ComponentCreator('/docs/__docusaurus/debug', 'b3f'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/__docusaurus/debug/config', '24a'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/__docusaurus/debug/content', 'e11'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/__docusaurus/debug/globalData', 'f8f'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/__docusaurus/debug/metadata', 'b74'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/__docusaurus/debug/registry', '486'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/__docusaurus/debug/routes', '0c7'),
    exact: true
  },
  {
    path: '/docs/markdown-page',
    component: ComponentCreator('/docs/markdown-page', '17a'),
    exact: true
  },
  {
    path: '/docs/docs',
    component: ComponentCreator('/docs/docs', '55d'),
    routes: [
      {
        path: '/docs/docs/category/development-environment-setup',
        component: ComponentCreator('/docs/docs/category/development-environment-setup', '335'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/category/enterprise-issuer',
        component: ComponentCreator('/docs/docs/category/enterprise-issuer', 'dd7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/category/enterprise-wallet-core',
        component: ComponentCreator('/docs/docs/category/enterprise-wallet-core', 'ed6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/category/showcase',
        component: ComponentCreator('/docs/docs/category/showcase', 'e40'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/development-environment-setup/getting-started',
        component: ComponentCreator('/docs/docs/development-environment-setup/getting-started', 'ac8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/enterprise-issuer/application-setup',
        component: ComponentCreator('/docs/docs/enterprise-issuer/application-setup', '406'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/enterprise-issuer/authentication',
        component: ComponentCreator('/docs/docs/enterprise-issuer/authentication', '838'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/enterprise-issuer/configuring-credentials',
        component: ComponentCreator('/docs/docs/enterprise-issuer/configuring-credentials', '6c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/enterprise-issuer/configuring-issuer',
        component: ComponentCreator('/docs/docs/enterprise-issuer/configuring-issuer', '34a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/enterprise-wallet-core/application-setup',
        component: ComponentCreator('/docs/docs/enterprise-wallet-core/application-setup', '990'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/enterprise-wallet-core/specification',
        component: ComponentCreator('/docs/docs/enterprise-wallet-core/specification', 'a0c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/docs/showcase/',
        component: ComponentCreator('/docs/docs/showcase/', '8c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'f03'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
