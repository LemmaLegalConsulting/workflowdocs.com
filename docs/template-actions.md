---
id: template-actions
title: Template Companion Actions
sidebar_label: Template Actions
---

# Template Companion Actions

A predefined S3 DOCX template can have an **optional companion `.yml` file** stored next to the template. In the electronic completion branch, when usable LegalServer launch data is available, Workflow Docs runs supported actions defined in the companion file against the LegalServer matter.

This is the simplest way to update matter fields, mark compliance flags, or create a case note — all triggered automatically when a document is finalized.

## File Convention

For a template at S3 key:

```
templates/bankruptcy/Notice_of_Filing.docx
```

…the companion file is:

```
templates/bankruptcy/Notice_of_Filing.yml
```

The system automatically fetches the companion file (same path, `.yml` extension) when it downloads the template. If no companion exists, the action step is skipped silently — most templates don't need one.

## Top-Level Schema

```yaml
actions:
  final:
    - matter:
        patch:
          field_name: value
          another_field: value
    - matter:
        notes:
          create:
            subject: "Note title"
            body: "Note body"
            note_type: "API Notes"
```

- The top-level `actions` key contains named **phases**. Today only `final` is supported — it runs after the final document is rendered.
- Each phase is a **list** of action objects. Execution failures are logged and do not block document generation; do not rely on later actions running after a failure.

## Supported Action Types

### `matter.patch`

Updates one or more fields on the LegalServer matter. Translates to `PATCH /api/v2/matters/{uuid}`.

```yaml
actions:
  final:
    - matter:
        patch:
          retainer_on_file: true
          retainer_on_file_compliance: true
          user_marked_retainer_complience: "@legalserver_data.intake_user"
```

### `matter.notes.create`

Creates a case note on the matter. Translates to `POST /api/v2/matters/{uuid}/notes`.

```yaml
actions:
  final:
    - matter:
        notes:
          create:
            subject: "Documents assembled"
            body: "Documents were assembled via WorkflowDocs"
            note_type: "API Notes"
```

`note_type` must be the name of a note type configured in your LegalServer site. The API Notes value above is only an example; the companion action does not supply a default.

## Special Values: The `@` Prefix

Most action values are sent through to LegalServer literally. Values that begin with `@` are resolved at runtime:

| Value              | Resolves to                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `@now`             | Current UTC timestamp in ISO 8601 format.                                                                                           |
| `@now(US/Eastern)` | Current timestamp in the named timezone (uses Python's `zoneinfo`).                                                                 |
| `@variable.name`   | Resolves the root with Docassemble's `value()`, then follows simple dot-only attributes. It does not index lists or call functions. |

The `@` matcher is `fullmatch`-based, so an email address like `user@example.com` is never mistaken for a variable reference. Only strings that are _entirely_ `@something` are resolved.

## Worked Examples

### Retainer Compliance

Automatically mark three fields on the matter when a retainer is finalized:

```yaml
actions:
  final:
    - matter:
        patch:
          retainer_on_file: true
          retainer_on_file_compliance: true
          user_marked_retainer_complience: "@legalserver_data.intake_user"
```

### Citizenship Attestation

Stamp an attestation on file with a localized timestamp and the user who submitted it:

```yaml
actions:
  final:
    - matter:
        patch:
          attestation_on_file: true
          attestation_compliance: true
          attestation_complience_submission_timestamp: "@now(US/Eastern)"
          user_marked_attestation_complience: "@legalserver_data.intake_user"
```

### "Documents Assembled" Case Note

Leave a breadcrumb in the case file every time Workflow Docs finalizes a document:

```yaml
actions:
  final:
    - matter:
        notes:
          create:
            subject: "Documents assembled"
            body: "Documents were assembled via WorkflowDocs"
            note_type: "API Notes"
```

### Multiple Actions in One File

Actions are listed in order, but execution failures are logged and should not be assumed to permit every later action to run:

```yaml
actions:
  final:
    - matter:
        patch:
          intake_complete: true
    - matter:
        notes:
          create:
            subject: "Intake completed"
            body: "All intake documents have been assembled."
            note_type: "API Notes"
```

## Behavior on Errors

- Execution failures are **logged** (and visible in the Docassemble interview log) and do not block document generation.
- Malformed YAML or unsupported action shapes may be treated as no actions, ignored, or logged.
- The rest of the document assembly flow is unaffected — the final document is still produced and delivered.

## Required Permissions

Companion actions run using the LegalServer API token configured for your site. The same LegalServer user that fetches case data performs the updates, so the action is subject to the same API permissions and field-level access rules as any other API write.

## Further Reading

- [Assemble Documents Workflow](/docs/assemble-documents) — when actions run in the flow.
- [Administrator Guide → LegalServer Integration](/docs/admin-guide#legalserver-integration) — setting up the API token.
