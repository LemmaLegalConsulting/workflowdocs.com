# Template Variables & Filters

Workflow Docs uses a combination of **Built-in Variables** (nouns that are ready to use) and **Reserved Keywords** (names that must be avoided).

## Two Filters, Two Audiences

Most questions in Workflow Docs are handled by one of two filters:

| Filter       | Who answers?                                       | When?                                       |
| ------------ | -------------------------------------------------- | ------------------------------------------- |
| `\| ask`     | The advocate running the interview.                | Immediately, in the interview.              |
| `\| request` | An external requestee (client, witness, attorney). | When they open their personal signing link. |

For the full reference on `| request` (kwargs, datatypes, multi-party signing), see the dedicated [`| request` Filter](/docs/request-filter) page. For the end-to-end flow, see [Multi-Party Signing](/docs/multi-party-signature).

## 1. Reserved Keywords (Do Not Use)

These names are reserved by Python or Docassemble. Using them as your own variable names will cause errors or unexpected behavior:

|            |           |           |           |
| ---------- | --------- | --------- | --------- |
| `if`       | `else`    | `elif`    | `for`     |
| `while`    | `in`      | `is`      | `not`     |
| `and`      | `or`      | `def`     | `class`   |
| `import`   | `from`    | `as`      | `return`  |
| `try`      | `except`  | `finally` | `raise`   |
| `None`     | `True`    | `False`   | `self`    |
| `dict`     | `list`    | `set`     | `str`     |
| `int`      | `float`   | `bool`    | `type`    |
| `metadata` | `modules` | `objects` | `buttons` |

_For a full list of Docassemble-specific reserved names, see the [AssemblyLine documentation](https://assemblyline.suffolklitlab.org/docs/components/AssemblyLine/reserved_keywords)._

## 2. Built-in Variables (Nouns)

Workflow Docs pre-defines many common legal nouns. These are not just names; they come with "smart" questions and logic.

- **People Lists (`ALPeopleList`)**: `clients`, `other_parties`, `children`, `witnesses`, `defendants`, `plaintiffs`.
- **Individuals (`ALIndividual`)**: `advocate`, `spouse`, `notary_public`, `legalserver_primary_assignment`, `legalserver_current_user`.

**Jinja2 Syntax:** Always wrap variables in double curly braces `{{ }}` to add them to your template. Access specific attributes using dot notation, and access items in a list using index notation:

```jinja2
{{ clients[0].name.first }}
{{ advocate.name.last }}
```

For the complete map of every available variable, see the [Full Variable List](/docs/full-variable-list).

## 3. The `ask` and `request` Filters

These filters are the primary way to interact with users and external parties.

- **`ask` Filter**: Use this when the **initiator** (the person running the interview, like an advocate) needs to provide the answer right now.
- **`request` Filter**: Use this to route the variable to an **external requestee** (like a client or third party). They will receive an email or SMS asking them to complete that specific field (e.g., signing a document).

**Jinja2 Syntax:** Filters are applied by using the pipe character `|` after a variable name. For `| request`, routing is determined by the top-level root before the first dot, so use person-owned paths such as `clients[0].incident_summary`, not nested spouse paths.

### Filter Options

Both `ask` and `request` accept several options to customize the field. `| request` accepts `question`, `subquestion`, `label`, `datatype`, and `options`, plus `placeholder` and `expected_key`; it does not accept `default` or `hint`.

| Option        | Description                                                                             | Example                                               |
| ------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `question`    | The main question text.                                                                 | `{{ var_name \| ask(question="Name?") }}`             |
| `subquestion` | Extra help text or instructions.                                                        | `{{ var_name \| ask(subquestion="First and last") }}` |
| `label`       | A short label for the input field.                                                      | `{{ var_name \| ask(label="Middle Initial") }}`       |
| `datatype`    | The [Docassemble datatype](https://docassemble.org/docs/fields.html#fields%20datatype). | `{{ var_name \| ask(datatype="date") }}`              |
| `options`     | A list of choices (for radio/dropdown).                                                 | `{{ var_name \| ask(options=["Yes", "No"]) }}`        |
| `default`     | The default value for the field.                                                        | `{{ var_name \| ask(default="English") }}`            |
| `hint`        | Placeholder text inside the input.                                                      | `{{ var_name \| ask(hint="MM/DD/YYYY") }}`            |

The `request` filter additionally accepts `placeholder` (the text shown in unsigned renders) and `expected_key` (the render key or keys for which the raw value is returned). `expected_key` does not mark a request complete. See the [`| request` Filter](/docs/request-filter) page for the full reference.

### Multilingual Prompts

Both filters accept a dict keyed by language code. The current interview language is used; the first value in the dict is the fallback.

```jinja2
{{ service_requested
   | ask(question={"en": "Do you want service?", "es": "¿Desea servicio?"}) }}
```

You can mix multilingual and plain-string kwargs:

```jinja2
{{ incident_description
   | ask(
       question={"en": "Describe the incident", "es": "Describa el incidente"},
       subquestion="Include date, time, location, and all relevant details",
       datatype="area"
     ) }}
```

### Complete Examples

**Asking the initiator for a date:**

```jinja2
{{ custom_date | ask(question="When did the incident occur?", datatype="date") }}
```

**Requesting a signature from a client:**

```jinja2
{{ clients[0].signature | request(question="Please sign the agreement", datatype="signature") }}
```

### Allowed Datatypes

Workflow Docs supports all standard [Docassemble datatypes](https://docassemble.org/docs/fields.html#datatype), including:

- `text` (default), `area` (large text)
- `date`, `datetime`, `time`
- `number`, `integer`, `currency`
- `email`, `url`, `file`
- `yesno`, `yesnomaybe`
- `radio`, `dropdown`, `checkboxes`
- `signature`

---

## 4. LegalServer Data Integration

Supported `legalserver_` variables are populated from the case when the interview has usable LegalServer launch data.

- `legalserver_case`: A helper object for accessing core case fields.
- `legalserver_data`: The raw JSON dictionary from the LegalServer API. See the [LegalServer Data Reference](/docs/legalserver-data-reference) for a detailed field map.
- `legalserver_matter_uuid`: The unique ID of the case.
- `legalserver_site_abbreviation`: Your site name (e.g., `legalaid`).

**Jinja2 Syntax:**

```jinja2
{{ legalserver_matter_uuid }}
{{ legalserver_data.county_of_residence }}
```

[**View the Full Variable List**](/docs/full-variable-list) for a complete map of every LegalServer field and its alias.

## 5. Salutations and Letter Greetings

For letter-style templates, Workflow Docs ships with two helper functions for generating the right salutation line:

- **`greet(person)`** — returns the full greeting line, e.g. `"Dear Ms. Smith"` or `"Estimada Sra. Smith"`. Uses `person.preferred_greeting` if set; otherwise picks `"Dear"`/`"Estimada"`/`"Estimado"` based on the person's language and gender.
- **`salute(person)`** — returns just the salutation form of the name, e.g. `"Ms. Smith"`. Uses `person.preferred_salutation` if set; otherwise picks a gendered honorific (`Mr.`/`Ms.`/`Mx.` for English, `Sr.`/`Sra.`/`Mx.` for Spanish) or falls back to the person's plain name.

```jinja2
{{ greet(clients[0]) }},

We are writing to confirm...
```

See the [Full Variable List → Functions](/docs/full-variable-list#8-functions) for the full reference.

## 6. Working with Languages

To select a client's preferred written language or normalize Chinese variants, use:

- **`wfd_default_client_language(person)`** — returns one of the supported client-language codes (`en`, `es`, `zh-CN`, `zh-TW`, `pt`, `ht`, `vi`, `km`) for the given person. Looks at `preferred_written_language`, then `language`, then `language_name` from LegalServer.
- **`wfd_client_language_codes(client_key)`** — returns the language codes enabled for that organization. With no argument, it returns all supported fallback codes.
- **`wfd_normalize_language_code(code)`** — maps Chinese variants like `zh_CN`, `zh_TW`, `zh-Hans`, `zh-Hant` to the canonical `zh-CN`/`zh-TW` form.
