---
id: request-filter
title: "The `| request` Filter"
sidebar_label: "`| request` Filter"
---

# The `| request` Filter

The `| request` filter is the recommended way to mark a variable for the **multi-party signing flow**. It registers the variable with the TemplateRequest system, assigns it to a specific requestee, supports a custom question and datatype, and produces the correct placeholder/render behavior across all three passes (unsigned → preview → final).

For the full flow walkthrough, see [Multi-Party Signature & Variable Collection](/docs/multi-party-signature).

## Quick Comparison

|                                                                    | `\| ask`                            | `\| request`                                                                                           |
| ------------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Who answers?                                                       | The advocate running the interview. | An external requestee via signing link.                                                                |
| When?                                                              | Immediately, in the interview.      | When the requestee opens their personalized link.                                                      |
| Renders placeholder in unsigned?                                   | No — value is filled live.          | Yes — shows `[ leaf_attribute_name ]` or your custom `placeholder`; uploads use `[ document upload ]`. |
| Document preview?                                                  | n/a                                 | Yes — requestee sees the preview render before signing.                                                |
| Accepts `question`, `subquestion`, `label`, `datatype`, `options`? | Yes                                 | Yes                                                                                                    |
| `placeholder`, `expected_key`?                                     | No                                  | Yes                                                                                                    |
| Backward-compatible name?                                          | `\| catchall_question(...)`         | `\| if_final` (limited)                                                                                |

## Reference: Keyword Arguments

| Kwarg          | Purpose                                                                                                                                                               | Example                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `question`     | Question text shown to the requestee. String, or dict keyed by language code.                                                                                         | `question="What is your citizenship?"`                   |
| `subquestion`  | Additional explanation below the question.                                                                                                                            | `subquestion="Choose the country on your passport"`      |
| `label`        | Field label.                                                                                                                                                          | `label="Full name"`                                      |
| `datatype`     | Any [Docassemble field type](https://docassemble.org/docs/fields.html#datatype).                                                                                      | `datatype="area"`, `datatype="radio"`, `datatype="date"` |
| `options`      | Choices for radio / dropdown / checkboxes.                                                                                                                            | `options=["Phone", "Email", "Text"]`                     |
| `placeholder`  | Text shown in unsigned renders. If omitted, the usual placeholder is `[ leaf_attribute_name ]`; uploads use `[ document upload ]`.                                    | `placeholder="[PLEASE SIGN]"`                            |
| `expected_key` | Render key(s) for which the raw value is expected and returned. It is not a completion/answered-state flag; preview inclusion can bypass normal preview placeholders. | `expected_key=["final", "preview"]`                      |

## Examples by Datatype

### Signature

```jinja2
{{ clients[0].signature | request }}
{{ advocate.signature | request }}
```

### Text field

```jinja2
Citizenship: {{ clients[0].citizenship | request(question="What is your citizenship?") }}

Incident description:
{{ clients[0].incident_summary | request(question="Describe the incident", datatype="area") }}
```

### Date

```jinja2
Date of incident: {{ clients[0].incident_date | request(question="When did this happen?", datatype="date") }}
```

### Radio / dropdown

```jinja2
Preferred language:
{{ clients[0].preferred_language
   | request(question="Preferred language", datatype="radio", options=["English", "Spanish"]) }}
```

### Checkbox list

```jinja2
Services requested:
{{ clients[0].service_types
   | request(
       question="Which services do you need?",
       datatype="checkboxes",
       options=["Advice", "Limited Representation", "Full Representation"]
     ) }}
```

### File upload (one file)

```jinja2
Photo of damage:
{{ clients[0].submitted_document_uploads[0]
   | request(question="Upload a photo of the damaged property") }}
```

### File upload (a list of named files)

```jinja2
After signing, please upload:
{{ clients[0].requested_documents["Pay stub 1"] | request(datatype="files") }}
{{ clients[0].requested_documents["Pay stub 2"] | request(datatype="files") }}
```

### Boolean

```jinja2
Do you consent to electronic service?
{{ clients[0].esign_consent
   | request(question="I agree to receive documents by email", datatype="yesno") }}
```

See [Multi-Party Signing → Boolean `| request` Fields](/docs/multi-party-signature#boolean--request-fields-and-print-mode) for how to consume a boolean `| request` in conditionals.

## Multilingual Prompts

Pass a dict keyed by language code. The current interview language is used; the first value in the dict is the fallback.

```jinja2
{{ clients[0].service_requested
   | request(question={"en": "Do you want service?", "es": "Desea servicio?"}) }}
```

You can mix multilingual and plain-string kwargs:

```jinja2
{{ clients[0].incident_description
   | request(
       question={"en": "Describe the incident", "es": "Describa el incidente"},
       subquestion="Include date, time, location, and all relevant details",
       datatype="area"
     ) }}
```

## How Variables Get Grouped

`| request` doesn't require you to declare who answers. The system routes to the variable's **top-level root**, meaning everything before the first dot:

| Variable                                         | Goes to               |
| ------------------------------------------------ | --------------------- |
| `clients[0].signature`, `clients[0].citizenship` | The first client.     |
| `spouse.signature`                               | The spouse requestee. |
| `witnesses[0].signature`                         | The first witness.    |
| `advocate.signature`                             | The advocate.         |

You can use any [ALIndividual](/docs/full-variable-list#1-built-in-nouns-people) as a requestee — the convention is to assign fields to specific individuals, not to a generic bucket.

## Renders: Unsigned vs. Preview vs. Final

`| request` works correctly in all three render passes:

| Pass         | What the requestee sees                                                    | When it happens                                      |
| ------------ | -------------------------------------------------------------------------- | ---------------------------------------------------- |
| **unsigned** | `placeholder` value (e.g. `[SIGNATURE]`).                                  | Advocate-side preview before any request goes out.   |
| **preview**  | All currently defined requested values; undefined values are placeholders. | When the requestee opens their link.                 |
| **final**    | Every value is filled.                                                     | When the final, legally signed document is rendered. |

## Backward Compatibility

The legacy `| if_final` filter is still available — it only controls whether a value appears in the final render. It does **not** register variables for the signing flow, support document preview, or accept any kwargs.

`| ask` itself is the modern replacement for the older `| catchall_question`, `| catchall_subquestion`, `| catchall_datatype`, `| catchall_options`, and `| catchall_complete` filters. `| ask(question="...", datatype="...")` is equivalent to `| catchall_question("...") | catchall_datatype("...")`, just shorter.

Use `| request` and `| ask` for all new templates.

## Further Reading

- [Multi-Party Signature & Variable Collection](/docs/multi-party-signature) — end-to-end walkthrough.
- [Template Variables & Filters](/docs/template-variables) — built-in nouns and Jinja2 basics.
- [Docassemble Datatypes](https://docassemble.org/docs/fields.html#datatype) — every `datatype="…"` value.
