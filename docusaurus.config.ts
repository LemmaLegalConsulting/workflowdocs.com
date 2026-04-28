import {themes as githubThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Workflow Docs',
  tagline: 'Smarter legal documents, integrated directly into LegalServer.',
  favicon: 'img/favicon.ico',

  future: {
    faster: true,
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://workflowdocs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LemmaLegalConsulting', // Usually your GitHub org/user name.
  projectName: 'workflowdocs.com', // Usually your repo name.

  onBrokenLinks: 'throw',

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        language: ["en"],
      }
    ],
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LemmaLegalConsulting/workflowdocs.com/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/workflowdocs_logo_wordmark.png',
    navbar: {
      title: '',
      logo: {
        alt: 'Workflow Docs Logo',
        src: 'img/workflowdocs_logo_wordmark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/about', label: 'About', position: 'left'},
        {to: '/security', label: 'Security', position: 'left'},
        {to: '/pricing', label: 'Pricing', position: 'left'},
        {
          href: 'https://outlook.office.com/book/LemmaLegal1@lemmalegal.com/s/SnPc6a2_OUCAMHLWlbXHYQ2?ismsaljsauthenabled',
          label: 'Request Demo',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Lemma Legal',
              href: 'https://lemmalegal.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'LegalServer',
              href: 'https://legalserver.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lemma Legal Consulting. Built with Docusaurus.`,
    },
    prism: {
      theme: githubThemes.github,
      darkTheme: githubThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
