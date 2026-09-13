---
id: request-documents
title: Request Client Documents
sidebar_label: Request Documents
---

# Request Client Documents

The document-request portal gives each LegalServer matter a reusable checklist
and secure client upload link. Advocates can add requests over time, send the
current list by email or SMS, review uploads, and ask the client for changes.

:::info
From the LegalServer matter, open **Request client documents** in the
Docassemble Interviews block. Workflow Docs opens the saved portal for that
matter or creates it the first time you visit.
:::

## For advocates

### 1. Add the documents you need

Select **Add a document request** and complete:

- **Title** — the document name the client sees, such as “Pay stubs from the
  last 60 days.”
- **Description** — optional instructions about dates, where to find the
  document, or whether a phone photo is acceptable.
- **Number of files required** — use more than one when the request will arrive
  in separate files.

Create separate requests for separate documents. For example, request a lease
and a notice to quit as two items so that you can review each independently.

### 2. Send the request

Open **Send request to client**, then choose **Email**, **SMS**, or both. The
email-address field appears only when Email is selected, and the mobile-number
field appears only when SMS is selected. Choose the request language and select
**Send now**.

The button shows progress while Workflow Docs sends the message and cannot be
clicked repeatedly during delivery. Workflow Docs also prevents rapid duplicate
sends from another tab. A delivery result confirms whether email, SMS, or both
were sent.

You can also:

- select **Save without sending** to keep the contact and language settings;
- copy the client upload link into your own message;
- resend the current outstanding list after adding another request; or
- rotate the upload link if it was shared with the wrong person.

:::warning Keep the upload link private
Anyone with the link can view the request list and upload files. Treat it like a
password. Rotate the link if it is exposed, or close the upload portal when it
is no longer needed.
:::

### 3. Review what the client sends

New files appear under **Files the client has uploaded**. From there, you can:

- read any note the client attached to the upload;
- download or delete an upload;
- accept a complete request;
- request changes and leave a note the client can see;
- cancel a request that is no longer needed; and
- retry a failed advocate notification or LegalServer delivery.

When LegalServer delivery is configured, Workflow Docs sends each protected
upload to the matter’s documents area. Closing a portal stops new uploads but
keeps its requests and files.

## For clients

Clients do not need a Workflow Docs account. They open the secure link from the
email or text message and see the name of the legal aid program that requested
the documents, the advocate or case information when available, and contact
information for questions.

If no requests are currently available, the page asks the client to check back
later or contact their advocate instead of showing empty upload panels.

### Upload a file or phone photo

For each requested document:

1. Select **Choose a file or take a photo**.
2. Choose an existing file, or use the phone’s camera to photograph the page.
3. Optionally add a note about that document—for example, identify a missing
   page, explain an unclear photo, or tell the advocate what the file contains.
4. Select **Upload document**.
5. Wait for the button to finish showing **Uploading…** before leaving the page.

The choices offered for taking a photo or selecting a file are provided by the
phone and browser, so their wording may vary.

### Upload a multi-page document with a phone

A client can photograph a multi-page document one page at a time without using
a separate scanning app:

1. Select **Choose a file or take a photo** and photograph the first page.
2. At **Do you have another page to upload?**, use the same control to take the
   next page.
3. Repeat until every page is shown in the review area.
4. Rotate any sideways page, remove an incorrect photo, and move pages into the
   correct order.
5. Optionally add one note about the combined document.
6. Select **Combine and upload**.
7. Keep the page open while the button shows **Combining and uploading…**.

Workflow Docs combines JPG, PNG, HEIC, or HEIF pages into one PDF. When
OCRmyPDF is available, it also tries to add a searchable, readable text layer.
OCR is best effort: if text recognition is unavailable or fails, the combined
image PDF is still uploaded.

:::tip Taking clear page photos
Place the paper on a contrasting surface, include all four corners, avoid glare
and shadows, and check that small text is readable before uploading.
:::

### Correct a submitted document

The client can return to the same link while the portal remains open. If the
advocate selects **Needs changes**, the request returns to the outstanding list
with the advocate’s note so the client knows what to replace or add.

## Language and contact information

The advocate’s selected language controls both the request message and the
client upload page. The current portal interface supports English and Spanish.
Changing the portal language changes what the client sees at the same secure
link.

The client page emphasizes the legal aid program—not Workflow Docs branding.
It uses the organization’s configured phone number and email address when
available, with the advocate’s information as a fallback.

## Troubleshooting

- **The email or phone field is missing** — select its Email or SMS checkbox.
- **The Send button still says Sending…** — leave the page open while the mail
  or SMS provider responds. The controls become available again after success
  or an error.
- **The camera option does not appear** — camera choices are controlled by the
  device and browser. Check camera permission, or take photos in the camera app
  first and select them as existing files.
- **A page is sideways or out of order** — rotate or move it in the review area
  before selecting **Combine and upload**.
- **The combined upload takes longer** — image conversion and OCR take more
  time than uploading one existing PDF. Watch the progress text on the button.
- **No documents are listed** — check back later or contact the advocate shown
  on the page.
- **LegalServer delivery failed** — the upload remains available in Workflow
  Docs. An advocate can retry delivery from the portal.
