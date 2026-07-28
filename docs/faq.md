# Frequently Asked Questions

Here are some common questions about Workflow Docs.

## User Accounts and Authentication

### Do I need to set up new accounts for Workflow Docs?

No, accounts are optional. You can use single sign-on options supported by Docassemble, including:

- Office 365
- Google accounts
- Auth0 (and other supported identity providers)

## Usage and Limits

### Who is considered a "user" for pricing purposes?

A user is any employee or advocate who generates or requests a document, sends a signature request, or uses the AI questionnaire features within LegalServer.

### Are there any usage limits?

There is no limit to the number of templates you can create, the number of signature requests you can send, or the amount of documents generated. Workflow Docs uses a simple per-user pricing model.

## Hosting and Customization

### Can I host other Docassemble interviews on the same server?

Yes, with our review and provided the usage does not negatively impact the primary function of the server. We also offer dedicated branded hosting options with included support.

These interviews can also be connected to your LegalServer data, which will involve hourly billable time.

### How do AI Questionnaires differ from standard LegalServer forms?

AI Questionnaires are generated from a simple prompt and are specific to a single matter, acting as dynamic follow-ups to fill intake gaps. Standard LegalServer forms are typically static and used for program-wide data collection (like client experience surveys).

## How is AI used in WorkflowDocs?

- Some features, including drafting an AI letter and sending an AI questionnaire, use generative AI. Basic template completion and requesting documents do not.
- Workflow Docs typically uses Azure OpenAI Service. Server administrators may configure OpenAI directly, and template auto-labeling can use Google Gemini.
- AI is focused on generating high quality questions and summarizing existing case data, not providing legal advice.
- Customer data is not used to train AI models and is encrypted in transit and at rest. Handling and retention follow the configured provider's enterprise privacy and retention terms.
- AI features are always optional and clearly labeled.
- An administrator can also request that we disable AI-powered features for your site.
- The "Create an AI draft letter" option in the **Assemble documents** workflow can be hidden per organization by setting `enable ai draft letter: false` in the [client configuration](/docs/admin-guide#client-level-configuration).

## LegalServer integration and pricing

### What LegalServer APIs must be enabled to use WorkflowDocs?

- All WorkflowDocs clients need to add the Docassemble API from LegalServer. Currently, this costs $2500 + $50/month. This API allows WorkflowDocs to be added to your case profile, securely receive client data, and add completed documents to the case record.
- Some WorkflowDocs clients may additionally want to turn on the LegalServer Premium API suite. Built-in read-only and launch functions may not require premium write access, but write-back features such as questionnaire case notes and template companion actions use LegalServer API v2 write endpoints and may require the corresponding API entitlement and permissions. Check with LegalServer for the applicable access and pricing.

Check with [LegalServer](https://help.legalserver.org/article/1686-apis-application-programming-interfaces) for the latest pricing.
