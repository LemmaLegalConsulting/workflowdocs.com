---
id: assemble-documents
title: Assemble Documents Workflow
sidebar_label: Assemble Documents
---

# Assemble Documents Workflow

This walkthrough details the steps to generate, upload, and request signatures for documents using the Docassemble integration within LegalServer. 

:::info
This workflow assumes you have already navigated to the LegalServer matter profile and clicked the **Assemble Documents** link under the Docassemble Interviews block.

![LegalServer Profile](/img/legalserver_profile.png)
:::

## Step 1: Choosing the Document Source
When the interview launches, you will be presented with the primary decision point for how you want to assemble the document.

![Assemble Step 1 Choices](/img/assemble_step1_choices.png)

You have three options:
1. **Upload a template from my computer**: Choose this if you have a custom `.docx` file prepared locally that you want to attach to the case.
2. **Use a predefined template**: Choose this to select from the organization's standard library of automated templates.
3. **Create an AI draft letter**: Use AI to automatically generate the draft based on the case context.

![Assemble Step 2 Predefined Selected](/img/assemble_step2_predefined_selected.png)

### Uploading an Existing Document
If you select **Upload a template from my computer**:
- You will be prompted to browse your local file system.
- Once selected, the system will process the document and attach it directly to the LegalServer matter.

### AI Draft Letter
If you select **Create an AI draft letter**:
![AI Draft Selected](/img/assemble_ai_draft_selected.png)
- The system will process the context and dynamically generate a draft response using AI.
- You can review the draft generation output before finalizing.

---

## Step 2: Using Predefined Templates (With & Without Signatures)

If you select **Use a predefined template**, you will be taken to a secondary screen to choose the specific letter or form.

![Assemble Templates List](/img/assemble_step3_template_list.png)

### Standard Letters (No Signature Required)
- Select a template like `Client_Letter` or `Letter_to_Client_re_Telephonic`.
- **Nuance**: These templates will bypass the signature routing logic and proceed directly to gathering the necessary dynamic variables (client names, addresses, etc.).

### Signature Requests
- Select a template like `test_signature_table` or `Plain_Language_Retainer`.
- **Nuance**: Selecting a template that requires a signature will alter the downstream flow. Docassemble will recognize the signature blocks and automatically prompt you later to specify the routing order (e.g., whether the client signs first or the advocate signs first) and confirm the email addresses for the DocuSign/e-signature envelope.

---

## Step 3: Entering Dynamic Case Information

Once a predefined template is selected, the workflow will prompt you for the specific information needed to populate the document.

:::tip
Because you launched this workflow directly from the LegalServer matter profile, many of these fields will be automatically pre-filled using the case data!
:::

You will verify or enter:
- **Client Information**: First name, Last name.
- **Advocate/Attorney Information**: First name, Last name of the assigned staff member.
- **Opposing Party / Defendant**: Type of defendant (Person vs. Organization) and their name.

### Custom Template Variables
Depending on the specific template selected, you may encounter custom variables. For example, some templates include logic tests such as:
- *What is your favorite baseball team?*
- *What is your favorite fruit?* (e.g., Apple, Banana).

These fields demonstrate Docassemble's ability to inject custom logic and variables dynamically into the generated Word document or PDF.

---

## Step 4: Final Generation
After all variables are confirmed, click **Next**.
- If no signature was requested, the finalized document is generated and saved to the LegalServer matter's documents list.
- If a signature was requested, the e-signature envelopes are generated and sent to the respective parties.
