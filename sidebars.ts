import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Advocate Guide',
      link: {
        type: 'doc',
        id: 'advocate-guide',
      },
      items: [
        'assemble-documents',
        'request-documents',
        'send-questionnaire',
      ],
    },
    'template-author-guide',
    'responsive-language',
    'template-variables',
    'full-variable-list',
    'legalserver-data-reference',
    'admin-guide',
    'faq',
  ],
};

export default sidebars;
