---
id: pdf-templates
title: PDF Templates and Sidecar YAML
sidebar_label: PDF Templates
---

# PDF Templates and Sidecar YAML

Workflow Docs can use an existing fillable PDF as a document template. The PDF keeps its original design while Workflow Docs fills its form fields from LegalServer and Docassemble, asks the advocate for missing information, or sends selected fields to clients and other requestees.

PDF templates use two files:

1. A fillable **AcroForm PDF** containing named form fields.
2. A companion **YAML sidecar** that maps each PDF field to its value and controls how missing information is gathered.

Unlike a DOCX template, a PDF does not contain Jinja expressions. All variable mapping, conditions, formatting, and request behavior live in the sidecar.

## Quick start

Suppose the template is named:

```text
Housing_Authorization.pdf
```

Store this sidecar next to it with the same name and a `.yml` extension:

```text
Housing_Authorization.yml
```

A predefined PDF template must have a sidecar with a non-empty top-level `fields` mapping. Workflow Docs does not infer mappings from PDF field names.

```yaml
fields:
  ClientName:
    variable: clients[0].name
    output: ${ clients[0].name.full() }

  ClientSignature:
    variable: clients[0].signature
    request: true

  AuthorizationDate:
    variable: clients[0].signature_date
    request: true
    output: ${ format_date(clients[0].signature_date, format="MM/dd/yyyy") }
```

Each key under `fields` must exactly match a form-field name in the PDF.

## Complete sidecar example

This example demonstrates ordinary fields, advocate questions, requestee questions, conditions, multiple PDF fields driven by one answer, Mako output, and final LegalServer actions.

```yaml
fields:
  ClientName:
    variable: clients[0].name
    output: ${ clients[0].name.full() }

  ClientAddress:
    variable: clients[0].address
    output: ${ clients[0].address.block() }

  ContactMethod:
    variable: preferred_contact_method
    ask:
      question: How should the client be contacted?
      datatype: radio
      options:
        email: Email
        phone: Phone
        text: Text message

  ContactEmail:
    variable: clients[0].email
    when: preferred_contact_method == "email"

  ClientAuthorization:
    variable: clients[0].authorization
    request:
      question: Do you authorize the release described in this form?
      subquestion: Review the form before answering.
      label: Authorization
      datatype: yesnoradio

  ClientSignature:
    variable: clients[0].signature
    request:
      question: Please sign the authorization.
      datatype: signature

  SignatureDate:
    variable: clients[0].signature_date
    request: true
    output: ${ format_date(clients[0].signature_date, format="MM/dd/yyyy") }

  "Authorization Yes":
    variable: clients[0].authorization
    output: ${ clients[0].authorization is True }

  "Authorization No":
    variable: clients[0].authorization
    output: ${ clients[0].authorization is False }

  OfficeUseOnly:
    output: Leave blank

actions:
  final:
    - matter:
        patch:
          authorization_on_file: true
          authorization_timestamp: "@now(US/Eastern)"
    - matter:
        notes:
          create:
            subject: Authorization completed
            body: The client completed the authorization in Workflow Docs.
            note_type: API Notes
```

## Sidecar file structure

The sidecar has two supported top-level sections:

| Key | Required? | Purpose |
| --- | --- | --- |
| `fields` | Required for PDF templates | Maps PDF form-field names to values and gathering behavior. It must be a non-empty mapping. |
| `actions` | Optional | Runs supported LegalServer actions after final document generation. |

The same companion-file convention is also available to DOCX templates for `actions`, but only PDF templates use `fields`.

## The `fields` mapping

Each key under `fields` is a PDF form-field name. Its value can be a variable-path string or a mapping with one or more recognized keys.

### Variable-path shorthand

The shortest form maps a PDF field directly to a Docassemble variable:

```yaml
fields:
  ClientFirstName: clients[0].name.first
  ClientLastName: clients[0].name.last
```

This is equivalent to:

```yaml
fields:
  ClientFirstName:
    variable: clients[0].name.first
```

Plain variables are resolved during document preparation. Use `ask` when the advocate should answer a missing value, and use `request` when an external requestee should answer it.

### Mapping reference

```yaml
fields:
  PDFFieldName:
    variable: clients[0].some_attribute
    ask: true
    request: false
    when: some_condition
    output: ${ clients[0].some_attribute }
```

| Key | Type | Purpose |
| --- | --- | --- |
| `variable` | String | A restricted Docassemble variable path. Required when `ask` or `request` is active. |
| `ask` | Boolean or mapping | Gather the variable from the advocate running the interview. |
| `request` | Boolean or mapping | Gather the variable from an external requestee through TemplateRequest. |
| `when` | Boolean or restricted expression | Fill or gather the field only when the condition is true. A false or inapplicable field is filled with blank text. |
| `output` | Scalar or Mako string | Control the final value written into the PDF field. |

`ask` and `request` are mutually exclusive. A variable also cannot be asked in one PDF field and requested in another field in the same sidecar.

Setting `ask: false` or `request: false` leaves the field in ordinary variable-resolution mode.

### Allowed variable paths

`variable` accepts static paths made from:

- Names: `docket_number`
- Attributes: `clients[0].name.first`
- Numeric list indexes: `clients[0]`
- Literal dictionary keys: `answers['housing_status']`

The following are rejected:

- Function calls: `clients[0].name.full()`
- Dynamic indexes: `clients[i]`
- Slices: `clients[0:2]`
- Private or dunder attributes
- Arithmetic or other executable expressions

Use `output` when you need formatting or function calls.

## Asking the advocate with `ask`

Use `ask` for information supplied by the person assembling the document.

### Use an existing interview question

```yaml
fields:
  HearingDate:
    variable: hearing_date
    ask: true
```

If `hearing_date` is undefined, Docassemble looks for its existing question block.

### Generate a question from sidecar metadata

```yaml
fields:
  HearingDate:
    variable: hearing_date
    ask:
      question: When is the hearing?
      subquestion: Use the date shown on the notice.
      label: Hearing date
      datatype: date
```

An asked field is gathered immediately when applicable. Put an asked field before later fields whose `when` expressions depend on its answer.

## Requesting information from another person

Use `request` for a client, witness, advocate, or other external requestee who receives a personalized TemplateRequest link.

### Use an existing question

```yaml
fields:
  ClientSignature:
    variable: clients[0].signature
    request: true
```

During fulfillment, Workflow Docs uses the existing question for `clients[0].signature`.

### Generate a request question

```yaml
fields:
  ClientConsent:
    variable: clients[0].consent
    request:
      question: Do you consent to electronic service?
      subquestion: You may revoke consent later.
      label: Consent
      datatype: yesnoradio
```

Request routing comes from the variable's root object. For example, fields under `clients[0]` go to the first client, while fields under `witnesses[0]` go to the first witness.

If a PDF has requested fields for a requestee, that PDF is included in that requestee's preview. It is not shown to unrelated requestees.

## Question metadata

When `ask` or `request` is a mapping, these keys are recognized:

| Key | Purpose | Example |
| --- | --- | --- |
| `question` | Main question text | `question: What happened?` |
| `subquestion` | Supporting explanation | `subquestion: Include dates and locations.` |
| `label` | Input-field label | `label: Incident description` |
| `datatype` | Docassemble field datatype | `datatype: area` |
| `options` | Choices for radio, dropdown, or checkboxes | `options: {email: Email, sms: Text message}` |
| `placeholder` | Text shown in unsigned and preview renders | `placeholder: "[CLIENT ANSWER]"` |
| `expected_key` | Render key or keys that should return the raw value | `expected_key: [final, preview]` |

`question`, `subquestion`, and `label` may be plain strings or multilingual mappings.

Options may be a list when the stored and displayed values are the same:

```yaml
options:
  - Email
  - Phone
  - Text message
```

Use a mapping when stored values should differ from labels:

```yaml
options:
  email: Email
  phone: Phone
  sms: Text message
```

Unknown metadata keys are rejected. Use `options`, not `choices`. A legacy `key` entry is ignored because the current render pass is controlled by Workflow Docs.

### Submitted-document uploads

The canonical upload path is:

```yaml
fields:
  SupportingDocument:
    variable: clients[0].submitted_document_uploads[0]
    request:
      question: Upload your supporting document.
      subquestion: PDF, Word, text, and image files are accepted.
      label: Upload a file
      datatype: file
```

For `submitted_document_uploads[N]`, `question`, `subquestion`, and `label` customize the built-in upload screen. The redundant `datatype: file` is accepted and ignored because the upload question already owns a file field. Any incompatible datatype and `options` are rejected.

This exception applies only to the `submitted_document_uploads` collection, not to arbitrary indexed variables.

## Conditional fields with `when`

Use `when` to make a field applicable only under specific conditions:

```yaml
fields:
  IncludeInterpreter:
    variable: needs_interpreter
    ask:
      question: Does the client need an interpreter?
      datatype: yesnoradio

  InterpreterLanguage:
    variable: interpreter_language
    ask:
      question: What language is needed?
    when: needs_interpreter
```

Conditions support:

- Static variable paths and scalar constants
- `and`, `or`, and `not`
- `==`, `!=`, `<`, `<=`, `>`, and `>=`
- `in` and `not in`
- Literal lists, tuples, sets, and dictionaries

```yaml
when: clients[0].language in ["es", "pt"] and not interpreter_waived
```

Conditions do not support function calls, arithmetic, comprehensions, dynamic indexes, slices, private names, or Mako.

If a condition is false, the PDF field is filled with blank text and no question is asked. If a condition depends on another sidecar field, declare the producer first. Workflow Docs detects unavailable dependencies and dependency cycles. A final render fails when a condition still depends on an unresolved external variable.

## Formatting values with `output`

`output` controls the value written to the PDF. It can be used by itself or together with `variable`, `ask`, or `request`.

### Literal output

```yaml
fields:
  OfficeUseOnly:
    output: Leave blank
```

### Mako output

Strings containing `${...}` or Mako control lines are rendered against the live Docassemble interview namespace:

```yaml
fields:
  FormattedDate:
    variable: hearing_date
    output: ${ format_date(hearing_date, format="MM/dd/yyyy") }

  AttendanceSummary:
    output: |
      % if attending:
      Attending on ${ format_date(hearing_date, format="MM/dd/yyyy") }
      % else:
      Not attending
      % endif
```

Output normalization follows native Docassemble PDF behavior:

- Trailing whitespace is removed.
- Rendered `True` becomes `Yes`.
- Rendered `False` becomes `No`.
- Rendered `None` becomes blank text.

Non-string YAML scalars remain native values. This is useful for PDF checkboxes.

### Drive several PDF fields from one answer

```yaml
fields:
  RequestingParty:
    variable: requesting_party
    ask:
      question: Who is the requesting party?
      datatype: radio
      options:
        plaintiff: Plaintiff
        plaintiffs_attorney: Plaintiff's attorney
        defendant: Defendant

  "Plaintiff Checkbox":
    variable: requesting_party
    output: ${ requesting_party == "plaintiff" }

  "Plaintiff Attorney Checkbox":
    variable: requesting_party
    output: ${ requesting_party == "plaintiffs_attorney" }

  "Defendant Checkbox":
    variable: requesting_party
    output: ${ requesting_party == "defendant" }
```

:::warning Trusted authors only

Mako under `output` has access to the complete live interview namespace and can execute code with the same capabilities as an uploaded DOCX/Jinja template. Only accept sidecars from trusted template authors.

`when` deliberately uses a restricted expression language and is not Mako.

:::

## Render passes and placeholders

Workflow Docs renders templates in several modes while preparing, previewing, printing, and finalizing documents.

| Pass | Requested fields | Asked fields | Ordinary and literal fields |
| --- | --- | --- | --- |
| `unsigned` | Registers separately and renders a placeholder without resolving the variable or evaluating `output`. | Gathers immediately if undefined, then evaluates `output`. | Resolves normally and evaluates `output` when present. |
| `preview` | Shows the defined value or a placeholder. Evaluates `output` only after the answer exists. | Same as unsigned. | Same as unsigned. |
| `final` | Resolves the requested answer and evaluates `output`. | Same as unsigned. | Same as unsigned. |
| `print` | Shows the defined value or blank text; never forces an undefined request. | Same as unsigned. | Same as unsigned. |

PDF requests are registered declaratively before the unsigned PDF is rendered. Registration does not gather the answer. This separation prevents requestee fields from being asked of the advocate during document preparation.

If one PDF field requests a variable and another PDF field derives output from the same variable, non-final passes will not independently gather the derived field.

## LegalServer actions

The same sidecar can run actions after final documents are generated:

```yaml
actions:
  final:
    - matter:
        patch:
          document_on_file: true
          completed_at: "@now"
    - matter:
        notes:
          create:
            subject: Document completed
            body: The document was completed through Workflow Docs.
            note_type: API Notes
```

Supported actions are `matter.patch` and `matter.notes.create`. Dynamic action values include `@now`, `@now(Time/Zone)`, and dot-only references such as `@legalserver_data.intake_user`.

See [Template Companion Actions](/docs/template-actions) for the full action reference and permissions behavior.

## How PDF assembly works

1. Workflow Docs downloads the selected predefined PDF and its same-stem `.yml` sidecar.
2. It verifies that the sidecar contains a non-empty `fields` mapping.
3. It validates paths, question metadata, gathering modes, conditions, and Mako syntax.
4. It registers every `request: true` or `request: {...}` declaration with TemplateRequest without resolving the variable.
5. It renders the unsigned PDF. Requested fields become placeholders; advocate and ordinary fields are gathered as needed.
6. Each external requestee receives only the documents and fields assigned to that person's variable root.
7. After all required answers are complete, Workflow Docs renders the final PDF and runs `actions.final` when configured.

## Validation and common errors

### Missing sidecar or `fields`

```text
PDF template "Form.pdf" requires a non-empty companion fields mapping
```

Confirm that `Form.yml` is next to `Form.pdf`, that the names match exactly, and that `fields` is a non-empty YAML mapping.

### PDF field stays blank

- Confirm the YAML key exactly matches the PDF form-field name.
- Confirm `variable` is defined or has an appropriate `ask` or `request` declaration.
- Check whether `when` evaluated to false or became unavailable.
- If a requested field is blank in print mode, that is expected until the requestee answers it.

### Invalid variable path

Move function calls and formatting into `output`. Keep `variable` limited to names, attributes, and literal indexes or keys.

### `ask` and `request` conflict

A field cannot use both modes, and the same variable cannot be asked in one field and requested in another. Choose the person responsible for the answer and use that mode consistently.

### Condition remains pending

Declare the field that produces the dependency before the field that uses it. If the dependency is not produced by the sidecar, ensure the interview defines it before final rendering.

### Unsupported metadata

Use `options`, not `choices`, and remove unknown keys. For `submitted_document_uploads[N]`, use only `question`, `subquestion`, `label`, and the optional redundant `datatype: file`.

## Authoring checklist

- Create an AcroForm PDF with stable, uniquely named form fields.
- Copy the field names exactly into the sidecar's `fields` mapping.
- Give the sidecar the same path and filename stem as the PDF.
- Use plain `variable` mappings for existing interview data.
- Use `ask` for the advocate and `request` for an external person.
- Put function calls and formatting under `output`, not `variable`.
- Put producer fields before conditions that depend on them.
- Test unsigned, requestee preview, print, and final document behavior.
- Treat Mako-enabled sidecars as executable template code and limit authoring access.

## Further reading

- [`| request` Filter](/docs/request-filter)
- [Multi-Party Signature and Variable Collection](/docs/multi-party-signature)
- [Template Companion Actions](/docs/template-actions)
- [Template Variables and Filters](/docs/template-variables)
- [Template Manager](/docs/template-author-guide#4-managing-your-templates)
