# Template Variables & Filters

Workflow Docs uses a combination of **Built-in Variables** (nouns that are ready to use) and **Reserved Keywords** (names that must be avoided).

## 1. Reserved Keywords (Do Not Use)

These names are reserved by Python or Docassemble. Using them as your own variable names will cause errors or unexpected behavior:

| | | | |
|---|---|---|---|
| `if` | `else` | `elif` | `for` |
| `while` | `in` | `is` | `not` |
| `and` | `or` | `def` | `class` |
| `import` | `from` | `as` | `return` |
| `try` | `except` | `finally` | `raise` |
| `None` | `True` | `False` | `self` |
| `dict` | `list` | `set` | `str` |
| `int` | `float` | `bool` | `type` |
| `metadata` | `modules` | `objects` | `buttons` |

*For a full list of Docassemble-specific reserved names, see the [AssemblyLine documentation](https://assemblyline.suffolklitlab.org/docs/components/AssemblyLine/reserved_keywords).*

## 2. Built-in Variables (Nouns)

Workflow Docs pre-defines many common legal nouns. These are not just names; they come with "smart" questions and logic.

- **People Lists (`ALPeopleList`)**: `clients`, `other_parties`, `children`, `witnesses`, `defendants`, `plaintiffs`.
- **Individuals (`ALIndividual`)**: `advocate`, `spouse`, `notary_public`, `legalserver_primary_assignment`, `legalserver_current_user`.

Access these using index notation for lists: `{{ clients[0].name.first }}`.

## 3. The `ask` and `request` Filters

These filters are the primary way to interact with users and external parties.

### Filter Options

Both `ask` and `request` accept several options to customize the field:

| Option | Description | Example |
|---|---|---|
| `question` | The main question text. | `| ask(question="Name?")` |
| `subquestion` | Extra help text or instructions. | `| ask(subquestion="First and last")` |
| `label` | A short label for the input field. | `| ask(label="Middle Initial")` |
| `datatype` | The [Docassemble datatype](https://docassemble.org/docs/fields.html#fields%20datatype). | `| ask(datatype="date")` |
| `options` | A list of choices (for radio/dropdown). | `| ask(options=["Yes", "No"])` |
| `default` | The default value for the field. | `| ask(default="English")` |
| `hint` | Placeholder text inside the input. | `| ask(hint="MM/DD/YYYY")` |

### Allowed Datatypes
Workflow Docs supports all standard [Docassemble datatypes](https://docassemble.org/docs/fields.html#fields%20datatype), including:
- `text` (default), `area` (large text)
- `date`, `datetime`, `time`
- `number`, `integer`, `currency`
- `email`, `url`, `file`
- `yesno`, `yesnomaybe`
- `radio`, `dropdown`, `checkboxes`

---

## 4. LegalServer Data Integration

Variables starting with `legalserver_` are automatically pulled from your case.

- `legalserver_case`: A helper object for accessing core case fields.
- `legalserver_data`: The raw JSON dictionary from the LegalServer API. See the [LegalServer Data Reference](/docs/legalserver-data-reference) for a detailed field map.
- `legalserver_matter_uuid`: The unique ID of the case.
- `legalserver_site_abbreviation`: Your site name (e.g., `legalaid`).

[**View the Full Variable List**](/docs/full-variable-list) for a complete map of every LegalServer field and its alias.
