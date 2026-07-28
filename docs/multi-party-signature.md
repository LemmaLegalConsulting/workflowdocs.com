---
id: multi-party-signature
title: Multi-Party Signature & Variable Collection
sidebar_label: Multi-Party Signing
---

# Multi-Party Signature & Variable Collection

The **TemplateRequest** flow lets one advocate send a batch of documents to multiple requestees (clients, witnesses, attorneys, etc.). Each requestee gets a personal, secure link to review the documents, fill in the variables assigned to them, and sign. Workflow Docs tracks progress, sends notifications, and assembles the final documents automatically.

This is the same pattern used by DocuSign or PandaDoc, but it lives **inside** your template — no separate signature service required.

## How It Works

When an advocate finishes a template that contains one or more `| request` fields, the system:

1. **Detects each requestee** by inspecting the variables. Routing is determined by the top-level root before the first dot: fields such as `clients[0].*` are grouped into that root's requestee queue.
2. **Sends each requestee a link** by their preferred delivery method (email, SMS, both, copy-able URL, or "sign in person").
3. **Renders the document in three passes**:
   - **unsigned** — every `| request` value is a placeholder (so the advocate can preview the structure).
   - **preview** — all currently defined requested values are filled in; undefined values remain placeholders. The requestee sees this before signing.
   - **final** — every variable is filled. This is the legally signed version.
4. **Notifies the advocate** when every requestee is done and bundles the final documents.

> **Requestee privacy:** A requestee can preview or download only templates containing at least one currently applicable requested field for them. They see only their own uploaded files, not other requestees' uploads. Filtering is at the template level, not the field level: in a shared template they can see the whole rendered template and already-defined values from other participants, while unanswered fields remain placeholders. Final downloads include only templates in which they participated, but shared templates include other participants' completed portions. The initiating logged-in user receives the full document set and all relevant uploads.

## A Complete Example

```jinja2
RETAINER AGREEMENT

Case Number: {{ legalserver_case.id }}
Date: {{ today() }}

I, {{ clients[0] }}, hereby retain {{ organization_name }} to represent me
in the matter of {{ matter_description | ask(question="Brief description of the matter", datatype="area") }}.

CLIENT SIGNATURE:
{{ clients[0].signature | request(question="Please sign the retainer") }}

SPOUSE SIGNATURE (if applicable):
{{ spouse.name_full() }}

SPOUSE:
{{ spouse.signature | request(question="Co-sign the retainer") }}

WITNESS:
{{ witnesses[0].signature | request(question="Witness signature") }}
```

With this template, the advocate would see one "Configure signing" step, and the system would automatically:

- Send separate links to `clients[0]` and `spouse` for their signatures.
- Send a separate link to `witnesses[0]`.
- Track each one and assemble the final document when all are complete.

## Requestee Setup (Advocate Side)

For each requestee, the advocate picks:

### Delivery method

| Choice             | When to use                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Email only**     | Send a single secure link to the requestee's email.                                                           |
| **SMS only**       | Send a single secure link to the requestee's mobile number. Requires SMS to be enabled for your organization. |
| **Email and SMS**  | Send to both channels.                                                                                        |
| **Show URL**       | Reveal a copy-able link in the advocate's waiting screen (no automatic send). Useful for in-person walk-ups.  |
| **Sign in person** | Skip sending a link entirely. The advocate collects the signature on a device in the room.                    |

The SMS-related choices are hidden automatically if your organization has not enabled SMS (see [Administrator Guide → SMS / Twilio Configuration](/docs/admin-guide#sms--twilio-configuration)).

### Language

Each requestee can be sent a link in any of the [client-configured languages](/docs/admin-guide#languages). The default is the requestee's preferred written language from LegalServer (with graceful fallbacks for Chinese and others).

### Contact info

The advocate supplies an email address and/or mobile number. The default is the value already on the LegalServer matter.

## Signing Order

Use the **"When does the advocate want to sign?"** step to control when the advocate's signature is sent out:

- **Now (I am the advocate)** — the advocate signs personally, in the room, before any requestee is contacted. The advocate's request is never sent by email.
- **Later/Last** — the advocate's request is held back. Only after every other requestee has signed will the system email the advocate a link to sign remotely.

## In-Line Supporting Document Requests

Sometimes a requestee needs to **upload** files as part of the workflow (e.g. a pay stub or photo). You can attach a checklist of uploads to a specific requestee:

```jinja2
{{ clients[0].signature | request }}

After signing, please upload your last two pay stubs:
{{ clients[0].requested_documents["Pay stub 1"] | request(datatype="files") }}
{{ clients[0].requested_documents["Pay stub 2"] | request(datatype="files") }}
```

These hard-coded titles work independently of setup. The "Configure signing" step also offers an optional prompt that lets the advocate add a separate supporting-document checklist for any requestee.

## Submitted Document Uploads

For ad-hoc uploads — outside of a fixed list — use the `submitted_document_uploads` pattern:

```jinja2
Photo of damaged property:
{{ clients[0].submitted_document_uploads[0] | request(question="Upload a photo of the damaged property") }}
```

Each upload captures both a **title** and a **file**, so the requestee can name what they're sending. The titles become part of the filename when delivered to LegalServer.

## The Waiting Screen

While the advocate is waiting for signatures, the system shows a "Please wait" screen that lists every still-pending requestee along with their chosen delivery method. If the advocate used "Show URL", the URL appears here with a copy button so the advocate can share it manually.

When every requestee is done, eligible participants other than the last completer receive a "documents are ready" email with a download link when they have an email address. The last completer continues to the final download screen.

## Boolean `| request` Fields and Print Mode

When a `| request` field is a boolean, avoid using bare truthiness checks like:

```jinja2
{% if clients[0].wfd_citizenship | request %}      {# unsafe #}
{% if not clients[0].wfd_citizenship | request %}  {# unsafe #}
```

In print mode, unanswered `| request` values are blanked so the document can be printed for paper completion. A blank value is falsy, so `not x` will accidentally select the `False` branch and mark the wrong option.

Instead, use explicit `== true` / `== false` comparison, wrapping the `| request` expression in parentheses so the filter applies before the comparison:

```jinja2
{% if (clients[0].wfd_citizenship | request) == true %}
X
{% endif %}

{% if (clients[0].wfd_citizenship | request) == false %}
Y
{% endif %}
```

This works correctly across all three render passes:

- **true** — the requestee answered "yes"
- **false** — the requestee answered "no"
- **unanswered/blank** — neither branch is selected

## Legacy: The `| if_final` Filter

The older `| if_final` filter is still supported for backward compatibility, but it only controls whether a value appears in the final render. It does **not** register variables for the multi-party signing flow, does not support document preview, and does not accept any kwargs.

**Use `| request` for all new templates.** For the full reference of `| request` kwargs, see [The `| request` Filter](/docs/request-filter).

## Further Reading

- [The `| request` Filter](/docs/request-filter) — full reference for kwargs, datatypes, and examples.
- [Template Variables & Filters](/docs/template-variables) — variables, syntax, and the `| ask` filter.
- [Administrator Guide](/docs/admin-guide) — SMS and language configuration.
