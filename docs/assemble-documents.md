---
id: assemble-documents
title: Assemble Documents Workflow
sidebar_label: Assemble Documents
---

# Assemble Documents Workflow

This walkthrough details the steps to generate, upload, and request signatures for DOCX documents using the Docassemble integration within LegalServer. PDFs can also be selected, filled, or printed where supported, but electronic request routing is supported for DOCX templates.

:::info
This workflow assumes you have already navigated to the LegalServer matter profile and clicked the **Assemble Documents** link under the Docassemble Interviews block.

![LegalServer Profile](/img/legalserver_profile.png)
:::

## Step 1: Choosing the Document Source

When the interview launches, you'll see quick links to **Manage templates** and **Template builder**, a full variable reference, and the source picker.

![Assemble Step 1 Choices](/img/assemble_step1_choices.png)

You can mix and match three sources in one batch:

1. **Upload a template from my computer** — one or more `.docx` or `.pdf` files. Useful for one-off documents that aren't in your library yet.
2. **Use a predefined template** — pick from the standard library in your S3 storage.
3. **Create an AI draft letter** — let the system generate a draft from the case context. (May be disabled by your administrator.)

![Assemble Step 2 Predefined Selected](/img/assemble_step2_predefined_selected.png)

### Uploading an Existing Document

If you select **Upload a template from my computer**:

- You will be prompted to browse your local file system.
- You can upload **DOCX or PDF** files. PDFs are processed using their fillable fields; signature fields are filtered out of unsigned renders and re-introduced in the final pass.
- Once selected, the system will process the document(s) and attach them to the LegalServer matter.

### AI Draft Letter

If you select **Create an AI draft letter**:
![AI Draft Selected](/img/assemble_ai_draft_selected.png)

- The system processes the case context (and any fields you choose) and generates a draft using the configured AI provider. Workflow Docs typically uses Azure OpenAI Service; server administrators may configure OpenAI directly.
- You can ask the AI to revise the draft before finalizing.
- This option is hidden if your organization has disabled it (see [Administrator Guide → Client Configuration](/docs/admin-guide#client-level-configuration)).

---

## Step 2: Choosing the Completion Mode

After selecting your sources, you choose **how the documents will be completed**:

| Mode                     | What happens                                                                                                                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Electronic** (default) | Each `                                                                                                                                                                                                     | request` field in a DOCX template is routed to a requestee via the [multi-party signing flow](/docs/multi-party-signature). When everyone is done, eligible participants receive secure download links. |
| **Print**                | Signatures and requestee fields are blanked so the document can be printed for paper completion. It is uploaded to LegalServer only when usable matter data is available and the upload option is enabled. |

:::tip
Choose **Print** when the document will be signed by hand, mailed, or signed in person without using the signing links. Choose **Electronic** when you want each signer to receive a personal link.
:::

---

## Step 3: Choosing a Predefined Template (With & Without Signatures)

If you select **Use a predefined template**, you'll see a list of available templates. Your library can contain any mix of DOCX and PDF.

![Assemble Templates List](/img/assemble_step3_template_list.png)

### Standard Letters (No Signature Required)

- Select a template like `Client_Letter` or `Letter_to_Client_re_Telephonic`.
- These templates will bypass the signature routing logic and proceed directly to gathering dynamic variables.

### Signature Requests

- Select a DOCX template that contains `| request` fields. PDF templates do not provide electronic request routing or signature support in this flow.
- The downstream flow will prompt you to choose each requestee's delivery method (email, SMS, both, show URL, or sign in person) and the signing order (advocate-first or advocate-last).
- See the [Multi-Party Signing](/docs/multi-party-signature) guide for the full walkthrough.

### Template Companion Actions

- If a predefined S3 DOCX template has an optional `.yml` companion file in the same S3 folder, and usable LegalServer launch data is available, the corresponding [template actions](/docs/template-actions) run after the electronic document is finalized — for example, stamping compliance flags on the LegalServer matter. They do not run for uploaded-from-computer or print templates.

---

## Step 4: Entering Dynamic Case Information

Once a predefined template is selected, the workflow prompts you for the specific information needed to populate the document.

:::tip
Because you launched this workflow directly from the LegalServer matter profile, many fields are automatically pre-filled using case data!
:::

You will verify or enter:

- **Client Information**: First name, last name.
- **Advocate/Attorney Information**: First name, last name of the assigned staff member.
- **Opposing Party / Defendant**: Type of defendant (Person vs. Organization) and their name.
- **Any custom variables** defined by the template — for example, `| ask(question="What is your favorite baseball team?")` will surface as a question in the interview.

---

## Step 5: Final Generation

After all variables are confirmed, click **Next**.

- **For Electronic mode**: Automatic signing-link delivery depends on each requestee's selected email/SMS method; **Show URL** links are shared manually and **Sign in person** requests stay in the advocate's session. After all requests are complete, participants other than the last completer may receive an email containing a secure download link when they have an email address. The last completer continues to the final download screen.
- **For Print mode**: The printable documents are generated immediately. Print them and collect any required signatures on paper.

### Uploading to LegalServer

For both modes, when the LegalServer upload toggle is on and usable LegalServer launch data is available, the generated documents and relevant requested uploads are bundled into a ZIP and uploaded to the LegalServer case file as a documents-tab entry. The LegalServer upload PDF setting controls the format of generated documents inside that ZIP; requestee uploads retain their original format.

:::note
Your administrator can choose whether generated documents inside the ZIP are **PDF** or **DOCX** with the `legalserver upload pdf` setting. Uploaded supporting files retain their original formats. This setting does not change the download options shown in Workflow Docs. See [Administrator Guide → Client Configuration](/docs/admin-guide#client-level-configuration).
:::

### Working with Many Templates

If you select more than two templates, you'll see a "please wait" screen while the system prepares the downloads in the background. Smaller batches complete inline without the waiting screen.
