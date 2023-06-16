import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/markdown-page',
    component: ComponentCreator('/docs/markdown-page', '96e'),
    exact: true
  },
  {
    path: '/docs/docs',
    component: ComponentCreator('/docs/docs', '938'),
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
    component: ComponentCreator('/docs/', '597'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
