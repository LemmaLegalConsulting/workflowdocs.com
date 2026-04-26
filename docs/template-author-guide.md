# Template Author Guide

Create smart, dynamic templates that pull data directly from LegalServer and automate client interactions.

**Key Benefit: No Mapping Required**
Unlike standard LegalServer templates, you do not need to manually map each field in your template to a corresponding LegalServer field. Workflow Docs automatically handles the data binding, saving you tedious setup time.

## 1. Example Template

Below is a copyable example of what a standard `.docx` template looks like when using core Workflow Docs functionality.

```jinja2
RETAINER AGREEMENT

Case Number: {{ legalserver_case.id }}
Date: {{ today() }}

I, {{ clients[0] }}, hereby retain {{ organization_name | ask(question="Organization name?", default="Lemma Legal") }} to represent me in the matter of {{ matter_description | ask(question="Brief description of the matter", datatype="area") }}.

COMMUNICATION PREFERENCE:
{{ preferred_contact | ask(question="How should we contact you?", options=["Phone", "Email", "SMS"]) }}

CLIENT SIGNATURE:
{{ clients[0].signature | request(question="Please sign the retainer agreement") }}

ADVOCATE SIGNATURE:
{{ advocate.signature | request }}

---

## 2. In-line Document Requests

You can prompt a client to upload a document directly from your template. This is a powerful supplement to the standard "Request Documents" workflow, as it allows you to link specific files to the text of your document.

### Syntax
Use the `submitted_document_uploads` attribute combined with the `| request` filter:

```jinja2
Please see the attached identification: 
{{ clients[0].submitted_document_uploads[0] | request(question="Please upload a photo of your ID") }}
```

- **In the Interview**: The client will see a file upload field with your custom question.
- **In the Template**: Once uploaded, the document's title (or a link to the file) will be inserted exactly where you placed the variable.

## 3. Managing Your Templates

You can create and manage templates using our web-based tools:

- [**Template Manager**](https://app.workflowdocs.com/wfd/manager): Upload, delete, and organize your templates.
- [**Template Editor (Docx Labeler)**](https://app.workflowdocs.com/wfd/docx-labeler): A visual tool to help you find and insert variables into your Word documents.

*Note: If your organization has a dedicated Workflow Docs server, replace `app.workflowdocs.com` with your specific server URL.*

## 3. Permissions & Access

To manage templates, your account must have **Template Author** or **Administrator** permissions.

### How to request permissions:
If you cannot access the Template Manager, please send an email to [**info@lemmalegal.com**](mailto:info@lemmalegal.com) with the following details:
1. The **email address** you use to log in to LegalServer.
2. The **server name** or URL that runs your Workflow Docs instance (e.g., `app.workflowdocs.com` or `yourorg.workflowdocs.com`).
3. Your organization name.
