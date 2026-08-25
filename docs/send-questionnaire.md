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

When the interview launches, the **advocate setup flow** starts with the **Ready to send the questionnaire?** screen, where you set up delivery and AI background:

- **Address message to** — the client's name (defaults to the matter's primary client).
- **Address message from** — your name (defaults to the matter's primary assignment).
- **Send link via email?** — on by default.
- **Send link via text message?** — on by default if your organization has [SMS enabled](/docs/admin-guide#sms--twilio-configuration).
- **Remote recipient's email / phone** — defaults to the matter's contact info; you can pick or type a new one.
- **Notify advocate after questionnaire is completed?** — toggle on to receive a summary email.
- **Advocate email address** — the address that should receive the completed summary.
- **Language for the questionnaire** — pick from your organization's [supported languages](/docs/admin-guide#languages). The default is the client's preferred written language.
- **Save responses to LegalServer?** — when on, the workflow writes back to the matter: a "questionnaire sent" case note, the completed-responses case note, and any client-uploaded documents. When off, nothing is written to LegalServer.
- **AI background field set** — (shown only when the interview is launched from a LegalServer matter and AI questionnaires are enabled for your organization) choose how much LegalServer matter data the AI may use to personalize its suggested questions:

| Setting | LegalServer data the AI sees |
| ------- | ---------------------------- |
| None | no matter data — the AI still suggests questions, but they are generic rather than personalized |
| Basic case information | case number, title, type, legal problem category, status / disposition, and opened, rejected, and closed dates |
| Case information and parties | the above plus the client's name, email, address, and phone, adverse and non-adverse parties, and litigations |
| Case information, parties, and notes | the above plus the case notes |
| Everything (all case details) | a curated copy of the matter details (excluding bulky file/document payloads and the most sensitive personal identifiers) |

:::tip
If SMS is not enabled, the SMS-only fields are hidden and the link is only sent by email. If you can't turn off the SMS question, ask your administrator to enable SMS in the [client configuration](/docs/admin-guide#sms--twilio-configuration).
:::

## Step 2: Compose Your Question

Next, you choose what to ask the client:

- **Pick a suggested question** — if you leave the question blank, the system uses AI to suggest **3–5 open-ended follow-up questions** for the client. The **AI background field set** you chose in Step 1 controls what matter data, if any, the AI sees: with **None** it generates generic intake questions, and with the richer presets it personalizes them to the case. Pick one of the suggestions.
- **Custom question** — choose **Custom question** from the suggestions screen to write your own, or type it up front in the **I already know what to ask (optional)** box (doing so skips the AI suggestions). Example: _"Tell us more about the unsafe conditions in your apartment."_
- **What makes a complete answer?** (optional) — list the factors that should be in a complete response, one per line. If you leave this blank, the system uses a sensible default rubric for legal-aid intake.

The system pre-generates a **structured questionnaire** with fields, labels, and choices for the question, then shows a **Review your questionnaire** screen so you can go back and adjust before sending.

## Step 3: Review and Send

On the review screen, confirm the generated questionnaire. Clicking **Next** sends the link by email and/or SMS and shows a **Please wait** screen. The link is valid for **72 hours**.

You'll receive a notification email when the client is done. If you need to send the link manually (for example, in a separate text-message thread), use the **Copy link** button on the waiting screen.

## What the Client Sees

The **client flow** runs in the client's preferred language:

1. A short confirmation screen ("Are you the right person?").
2. The main question, with a list of fields collected by the structured questionnaire.
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

When you select an **AI background field set**, the chosen LegalServer matter data is included in the suggestion request so the questions can be personalized to the case.

Server administrators may configure OpenAI directly. Customer data is not used to train AI models and is encrypted in transit and at rest. Handling and retention follow the configured provider's enterprise privacy and retention terms. Template auto-labeling can use Google Gemini.

The client can opt out of the AI follow-up feature on a per-question basis; the questionnaire will still complete, but the AI won't ask intelligent follow-ups.

## Troubleshooting

- **"SMS delivery is not available"** — your organization has not enabled SMS. Send by email only, or ask your administrator to enable SMS.
- **The link has expired** — relaunch the workflow and send a new link. The 72-hour clock restarts each time.
- **The case note was not saved** — confirm that the interview was launched from the LegalServer matter profile and that **Save responses to LegalServer?** is on.
