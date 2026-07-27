---
id: request-documents
title: Request Client Documents
sidebar_label: Request Documents
---

# Request Client Documents Workflow

This workflow enables you to send a checklist of documents to a client and collect their uploads — through email, SMS, or both. With the LegalServer upload toggle on and usable LegalServer launch data available, files are zipped and uploaded to the matter. A separate advocate notification is sent only when **Send copy to advocate** is on.

:::info
To begin, navigate to the LegalServer matter profile and click the **Request client documents** link under the Docassemble Interviews block.
:::

## Step 1: Specify the Documents

Build a checklist of the documents you need. For each entry, you can add a **title** (required) and an optional **description** that helps the client understand what to send.

For example:

| Title    | Description                                         |
| -------- | --------------------------------------------------- |
| Pay stub | Most recent pay stub from your employer.            |
| Lease    | A signed copy of your current lease.                |
| Photo ID | A clear photo of your driver's license or state ID. |

You can add as many items as you need by clicking **Add another**.

## Step 2: Configure the Request

On the request screen, you'll fill in the recipient and notification details.

### Who needs to send you the documents?

- **Client name** — defaults to the matter's primary client.
- **Request documents via**:
  - **Email** — sends a single email with a secure upload link.
  - **SMS** — sends a single text message with the link.
  - **Email and SMS** — sends to both channels.
  - _Note:_ The SMS options only appear if your organization has [SMS enabled](/docs/admin-guide#sms--twilio-configuration).
- **Client email / phone** — defaults are pre-filled from the matter; you can pick another or type a new one.

### Who should we notify when the request is finished?

- **Send copy to advocate** — toggle on to receive a notification email when the request is complete.
- **Advocate name / email** — defaults to the matter's primary assignment.

### Request language

Pick the language of the request email/SMS from your organization's [supported languages](/docs/admin-guide#languages). The default is the client's preferred written language from LegalServer (with sensible fallbacks for Chinese variants and others).

### LegalServer upload settings

- **Upload documents to LegalServer when received?** — when on, uploaded files are zipped and posted to the LegalServer matter's documents tab as soon as the client is done. Defaults to **on** for matters launched from LegalServer.

![Request Documents Initial Screen](/img/request_docs_step1.png)

## Step 3: Send and Wait

After you click **Next**, the system sends the request and shows a "Request sent" screen. The link is valid for **7 days (168 hours)**. If **Send copy to advocate** is on, the advocate address receives an email when the client is done.

If you need to send the link manually (for example, in a separate SMS thread), use the **Copy link** button on the waiting screen.

## What Happens When the Client Uploads

When the client opens the link and uploads files:

1. Each uploaded file is **renamed** to include the document title (for example, `Pay stub - filename.pdf`).
2. If enabled and applicable, **Upload to LegalServer** zips all files and posts them to the matter's documents tab.
3. If **Send copy to advocate** is on, the advocate receives a completion notification. Attachments are included when the total is **15 MB or less**; above 15 MB the notification contains a link instead of attachments.

The client sees a "Thank you!" confirmation screen and is done.

## SMS-Specific Behavior

When the request is sent by SMS (or by SMS in addition to email):

- The message is sent **without a subject** (subjects are not meaningful in SMS).
- The body is a short, plain-text line that includes the advocate's name (and the organization name, if configured), the count of documents requested, and the secure link.

## Email Template

The email message uses a styled HTML template that includes:

- The organization name (if configured) and the advocate's name.
- A clear list of each requested document title and description.
- A prominent "Upload Documents" call-to-action button.
- A footer noting that the link will expire in 7 days.

## Troubleshooting

- **"SMS delivery is not available"** — your organization has not enabled SMS/Twilio. Choose **Email only** for this request, or ask your administrator to enable SMS in the [client configuration](/docs/admin-guide#sms--twilio-configuration).
- **Files are missing from the LegalServer upload** — verify the **Upload documents to LegalServer when received?** toggle is on, and that the interview was launched from the LegalServer matter profile (so it has access to the case UUID).
- **The link has expired** — relaunch the workflow and send a new request.
