---
id: send-questionnaire
title: Send Client a Questionnaire
sidebar_label: Send Questionnaire
---

# Send Client a Questionnaire Workflow

This workflow streamlines the process of sending dynamic intake or follow-up questionnaires to clients using Docassemble. The client answers in their own language, the system asks up to three intelligent follow-up questions to fill gaps, and a synthesized summary is delivered to you. When you leave **Save responses to LegalServer?** on, everything the workflow writes back to the matter — case notes and client-uploaded documents — is stored there.

:::info
To begin, navigate to the LegalServer matter profile and click the **Send client a questionnaire** link under the Docassemble Interviews block.
:::

## Step 1: Configure the Questionnaire

When the interview launches, the **advocate setup flow** starts with the **Ready to send the questionnaire?** screen, where you set up delivery:

- **Address message to** — the client's name (defaults to the matter's primary client).
- **Address message from** — your name (defaults to the matter's primary assignment).
- **Send link via email?** — on by default.
- **Send link via text message?** — on by default if your organization has [SMS enabled](/docs/admin-guide#sms--twilio-configuration).
- **Remote recipient's email / phone** — defaults to the matter's contact info; you can pick or type a new one.
- **Notify advocate after questionnaire is completed?** — toggle on to receive a summary email.
- **Advocate email address** — the address that should receive the completed summary.
- **Language for the questionnaire** — pick from your organization's [supported languages](/docs/admin-guide#languages). The default is the client's preferred written language.
- **Save responses to LegalServer?** — when on, the workflow writes back to the matter: a "questionnaire sent" case note, the completed-responses case note, and any client-uploaded documents. When off, nothing is written to LegalServer.

:::tip
If SMS is not enabled, the SMS-only fields are hidden and the link is only sent by email. If you can't turn off the SMS question, ask your administrator to enable SMS in the [client configuration](/docs/admin-guide#sms--twilio-configuration).
:::

## Step 2: Choose AI Background Information

On the same advocate setup screen, the **AI background field set** dropdown controls which matter information the suggestion generator may use for a LegalServer-launched questionnaire:

| Setting | Information shared with the suggestion generator |
| ------- | ----------------------------------------------- |
| **None** | No matter information; suggestions are generic |
| **Basic case information** | Case number, title, type, problem category, status / disposition, and key dates |
| **Case information and parties** | Basic information plus client contact details, parties, and litigations |
| **Case information, parties, and notes** | The above plus case notes |
| **Everything (all case details)** | The curated set of available matter fields |

Configured LegalServer custom fields are included with **Case information and parties** and the richer sets.

## Step 3: Write the Question

The **What do you want to ask the client?** screen normally shows 3–5 AI-generated suggestions. Pick one, or choose **Custom question** and write your own. You can also optionally set:

- **What makes a complete answer?** — list the factors that should be in a complete response, one per line. If you leave this blank, the system uses a sensible default rubric for legal-aid intake.

The system pre-generates a **structured questionnaire** with fields, labels, and choices for the question, then shows a **Review your questionnaire** screen so you can go back and adjust before sending.

## Step 4: Review and Send

On the review screen, confirm the generated questionnaire. Clicking **Next** sends the link by email and/or SMS and shows a **Please wait** screen. The link is valid for **72 hours**.

You'll receive a notification email when the client is done. If you need to send the link manually (for example, in a separate text-message thread), use the **Copy link** button on the waiting screen.

## What the Client Sees

The **client flow** runs in the client's preferred language:

1. A short confirmation screen ("Are you the right person?").
2. The main question chosen or written by the advocate, with a list of fields collected by the structured questionnaire.
3. Optional follow-up questions — the AI analyzes the client's answer and asks up to **3** targeted follow-ups to fill in gaps.
4. The client can **opt out of AI follow-ups** if they prefer to write a complete answer themselves.
5. The client can **upload supporting documents** along with their answers.
6. A **Review your information** screen with a synthesized summary that the client can edit.
7. A "Thank you" screen with the final summary.

## What the Advocate Receives

When the client is done, the system:

- Sends the advocate an **HTML email** containing the AI-synthesized summary. Client-uploaded documents are attached to the email, or linked when they are too large.
- When **Save responses to LegalServer?** is on, creates a **case note** on the LegalServer matter with the full conversation (initial question, initial response, and each follow-up Q&A pair) plus the uploaded documents, and uploads the supporting documents to the matter.
- No case notes or uploads are written to LegalServer when **Save responses to LegalServer?** is off.

The summary is always delivered in **English** so the legal team can read it directly, regardless of which language the client used.

## AI Use and Privacy

The system typically uses Azure OpenAI Service to:

- Suggest questions during advocate setup.
- Generate follow-up questions based on the client's responses.
- Synthesize a final summary of the conversation.

Only the fields in the selected preset are sent to the AI for advocate-facing suggestions. Choosing **None** produces generic suggestions.

Server administrators may configure OpenAI directly. Customer data is not used to train AI models and is encrypted in transit and at rest. Handling and retention follow the configured provider's enterprise privacy and retention terms. Template auto-labeling can use Google Gemini.

The client can opt out of the AI follow-up feature on a per-question basis; the questionnaire will still complete, but the AI won't ask intelligent follow-ups.

## Troubleshooting

- **"SMS delivery is not available"** — your organization has not enabled SMS. Send by email only, or ask your administrator to enable SMS.
- **The link has expired** — relaunch the workflow and send a new link. The 72-hour clock restarts each time.
- **The case note was not saved** — confirm that the interview was launched from the LegalServer matter profile and that **Save responses to LegalServer?** is on.
