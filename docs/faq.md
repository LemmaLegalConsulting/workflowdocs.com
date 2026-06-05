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

* Some features, including drafting an AI letter and sending an AI questionnaire, use generative AI. Basic template completion and requesting documents do not.
* All AI queries are routed through the Microsoft Azure enterprise AI platform, and not a third-party vendor.
* AI is focused on generating high quality questions and summarizing existing case data, not providing legal advice.
* Your data is never used for training any AI model.
* AI features are always optional and clearly labeled.

## LegalServer integration and pricing

### What LegalServer APIs must be enabled to use WorkflowDocs?

* All WorkflowDocs clients need to add the Docassemble API from LegalServer. Currently, this costs $2500 + $50/month. This API allows WorkflowDocs to be added to your case profile, securely receive client data, and add completed documents to the case record.
* Some WorkflowDocs clients may additionally want to turn on the LegalServer Premium API suite. This costs $200/month, and enables your **custom interviews** to send data back to LegalServer to update an existing case, separate from sending files into the case record. The premium API is not required for any of the out-of-the-box features of WorkflowDocs. It is only required for custom interviews that need to update an existing case or create an intake. The LegalServer premium API is not specific to Docassemble or WorkflowDocs, and gives you several other integration opportunities with third-party platforms.

Check with [LegalServer](https://help.legalserver.org/article/1686-apis-application-programming-interfaces) for the latest pricing.
