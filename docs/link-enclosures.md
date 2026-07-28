---
id: link-enclosures
title: Link Enclosures with QR Codes
sidebar_label: Link Enclosures
---

# Link Enclosures with QR Codes

Many legal-aid documents end with a list of **community resources** — eviction help, food assistance, court self-help centers, and so on. The `LinkEnclosureGroup` feature lets the advocate pick a tailored subset of links **per template** from a centrally maintained YAML file, then renders the chosen links (with QR codes) into the final document.

Each template that uses enclosures gets its own checkbox screen, and the rendered output is localized to the client's preferred language.

## When to Use

Use link enclosures when you want to:

- **Reuse a single source of truth** for community resource links across many templates.
- **Let the advocate pick the right subset** of resources for each matter (a housing letter doesn't need food pantry links).
- **Print QR codes** so the client can scan a resource link straight from the paper document.

If you just need a single static link in a template, use the standard Markdown link syntax. Link enclosures shine when the list is large, shared, and partly optional.

## The YAML Source File

By default, the enclosure list comes from a file named `enclosures.yml` in your S3 bucket root (or wherever your storage is configured). You can change the path per group with the `path=` argument.

The file has a top-level `heading` map (for translated section titles) and a `sections` map of category definitions:

```yaml
heading:
  en: Enclosures
  es: Adjuntos
sections:
  general:
    label: General information
    items:
      - en:
          title: Housing help
          url: https://example.com/en/help
        es:
          title: Ayuda de vivienda
          url: https://example.com/es/help
  housing:
    label: Housing resources
    items:
      - en:
          title: Intake packet
          url: https://example.com/en/intake
        vi:
          title: Goi tai lieu
          url: https://example.com/vi/intake
```

### Schema rules

- `heading` is a `{language_code: text}` map. The renderer falls back to the group's `default_language` (default `en`), then `"Enclosures"`.
- A nonempty YAML file requires `sections`. Each section has a short id (the key) used by templates, and a `label` (used for display when a label is needed). An empty file is accepted as an empty enclosure set.
- Each `items` entry is a `{language_code: {title, url}}` map. The English variant is shown in the advocate-facing selection UI even if a different language is active.
- A section may omit `label`; the short id is used for display.
- If a template requests a category that is **not** present in `sections`, `LinkEnclosureGroup` raises a `ValueError` instead of silently skipping the typo.

## Using Enclosures in a Template

Call `enclosures(...)` from inside the template's Jinja. The output is Markdown that Docassemble converts to Word/PDF for you.

```jinja2
{{p link_enclosures.enclosures(
  categories=["general", "housing"],
  path="enclosures.yml",
  language_variable="clients[0].language",
  qr_width="200px"
) | markdown | soft_return }}
```

| Argument            | Purpose                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `categories`        | Section ids to include. Omitted, empty, or blank selects all sections; otherwise ids must match `sections` keys exactly. |
| `path`              | Path to the YAML file within the storage backend (default: `enclosures.yml`).                                            |
| `language_variable` | Dotted path to a variable whose value is the language code.                                                              |
| `language_code`     | Explicit active language code.                                                                                           |
| `qr_width`          | Width of the rendered QR code (default `100px`).                                                                         |
| `default_language`  | Fallback language code (default `en`).                                                                                   |
| `qr_alt_text`       | Alternative text used for generated QR images.                                                                           |
| `template_key`      | Optional explicit key for storing this template's selections.                                                            |

Always end with `| markdown | soft_return` in DOCX templates — the `soft_return` filter ensures the title, URL, and QR code render on separate Word lines instead of leaving `[SOFTRETURN]` markers behind.

## The Advocate Selection Screen

`LinkEnclosureGroup` ships with a built-in checkbox UI. To use it, include `support_link_enclosures.yml` after the standard backend support, then call `accordion_fields(i)` from your template's question block:

```yaml
generic object: DADict
question: |
  Choose link enclosures for the template: ${ italic(i) }
fields:
  - code: |
      link_enclosures.accordion_fields(i)
continue button field: link_enclosures.template_selections[i].complete
```

`accordion_fields(i)` builds one Bootstrap accordion section per YAML category, with one checkbox per item. The selections are written into `template_selections[i].selected_enclosures_by_category[category_id]`.

The accordion intentionally uses **English-first** link titles when an `en` variant exists, so the advocate's UI is stable. The Markdown returned by `enclosures(...)` resolves each link in the **active document language**, so the printed/PDF output is localized for the client.

## One YAML Group, Many Templates

`LinkEnclosureGroup.using(...)` sets the default YAML path, categories, language settings, and QR options for the group:

```yaml
objects:
  - link_enclosures: LinkEnclosureGroup.using(backend=s3_backend)
```

Each template that calls `enclosures(...)` then resolves a template key from `current_context().attachment.name` (falling back to `current_context().attachment.filename`) and stores that template's effective settings under `template_selections[template_key]`.

`enclosures(...)` resolves the current template key and seeks `link_enclosures.template_selections[template_key].complete`, so each template that uses enclosures gets its own question screen and its own saved checkbox state.

## Rendered Output

For the example above, the rendered DOCX Markdown looks roughly like:

```markdown
#### Enclosures

Housing help

> https://example.com/en/help
>
> [QR https://example.com/en/help, 200px]
```

A `print`-key render is identical except signatures are not included (when the same template also uses `| request` for signing).

## Validation

- **Bad section id**: `LinkEnclosureGroup` raises `ValueError("Unknown enclosure section: ...")`.
- **Missing file**: surfaces as a normal template variable error.
- **Omitted, empty, or blank `categories`**: all sections are selected and rendered; the enclosure question is not skipped.

## Further Reading

- [Assemble Documents Workflow](/docs/assemble-documents) — when enclosures are shown in the flow.
- [Template Variables & Filters](/docs/template-variables) — Jinja2 basics.
- [Administrator Guide → Storage Backends](/docs/admin-guide#storage-backends) — configuring S3.
