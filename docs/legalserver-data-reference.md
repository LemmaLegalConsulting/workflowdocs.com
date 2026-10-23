# LegalServer Data Reference

The `legalserver_data` variable is a raw Python dictionary containing all case details fetched from the LegalServer API.

**Important:** Because this is a standard dictionary, you must use **bracket notation** (e.g., `legalserver_data['case_number']`) to access its keys. The standard "dot notation" (e.g., `legalserver_data.case_number`) will not work.

## Common Object Structures

Many fields in `legalserver_data` return nested dictionaries. Use the following keys to access their attributes:

### 1. Lookup Values

Fields representing a selection from a LegalServer lookup table (dropdown) return a dictionary with these keys:

| Key                     | Description                                |
| ----------------------- | ------------------------------------------ |
| `['lookup_value_name']` | The human-readable label (e.g., "Active"). |
| `['lookup_value_id']`   | The internal LegalServer ID.               |
| `['lookup_value_uuid']` | The unique UUID.                           |
| `['lookup_type_name']`  | The name of the lookup table.              |

**Example:** `{{ legalserver_data['case_status']['lookup_value_name'] }}`

### 2. User/Staff Objects

Fields representing a staff member or user return a dictionary with these keys:

| Key             | Description                  |
| --------------- | ---------------------------- |
| `['user_name']` | The full name of the user.   |
| `['user_id']`   | The internal LegalServer ID. |
| `['user_uuid']` | The unique UUID.             |

**Example:** `{{ legalserver_data['intake_user']['user_name'] }}`

---

## Usage Examples (Jinja2)

Use these snippets as a guide for accessing deep attributes and looping through lists in your templates.

### Looping through Assignments

Display a list of all staff members and their assignment types:

```jinja2
{%p for assignment in legalserver_data['assignments'] %}
- {{ assignment['user']['user_name'] }} ({{ assignment['type']['lookup_value_name'] }})
{%p endfor %}
```

### Formatted Income Table (Word/DOCX)

When automating a table in a Word template, use the `tr` (table row) control tags. Place the `for` and `endfor` tags in their own standalone rows:

| Type                                                | Amount                   | Period                   |
| :-------------------------------------------------- | :----------------------- | :----------------------- |
| `{%tr for income in legalserver_data['incomes'] %}` |                          |                          |
| `{{ income['type']['lookup_value_name'] }}`         | `{{ income['amount'] }}` | `{{ income['period'] }}` |
| `{%tr endfor %}`                                    |                          |                          |

:::tip
In Word templates, the `{%tr %}` tag ensures that the entire row is repeated or removed based on the data, maintaining the table's structure.
:::

### Accessing Nested Client Data

Access specific parts of a nested object, like the home city:

```jinja2
{{ legalserver_data['client_address_home']['city'] }}
```

---

## Key Case Objects

### Core Case Details

| Field              | Type    | Description                                   |
| ------------------ | ------- | --------------------------------------------- |
| `case_id`          | Integer | Internal ID.                                  |
| `case_number`      | String  | The primary case number (e.g., "21-0207916"). |
| `case_status`      | Lookup  | The current status (e.g., "Active").          |
| `case_disposition` | Lookup  | The case disposition.                         |
| `date_opened`      | String  | ISO date of intake.                           |
| `matter_uuid`      | String  | Unique UUID for the case.                     |
| `case_email_address` | String | Read-only case email address, not the client's personal email. |

### Client Information

| Field                     | Type   | Description                                               |
| ------------------------- | ------ | --------------------------------------------------------- |
| `client_full_name`        | String | The client's full name.                                   |
| `first`, `middle`, `last` | String | Individual name components.                               |
| `client_email_address`    | String or null | Client email; maps to `clients[i].email`.          |
| `home_phone`              | String | Home number; maps to `clients[i].phone_number`.             |
| `mobile_phone`            | String | Mobile number; maps to `clients[i].mobile_number`.          |
| `work_phone`              | String | Work number; maps to `clients[i].work_phone`.               |
| `other_phone`             | String | Other number; maps to `clients[i].other_phone`.             |
| `fax_phone`               | String | Fax number; maps to `clients[i].fax_phone`.                 |
| `preferred_phone_number`  | Lookup | Preferred-phone selection, not the actual number.          |
| `client_address_home`     | Object | Nested address object (`street`, `city`, `state`, `zip`). |
| `client_gender`           | Lookup | Client gender.                                            |
| `citizenship`             | Lookup | Citizenship status.                                       |

### Email Addresses

The core matter response exposes one client email field:

| Raw field | Type | Workflow Docs mapping |
| --------- | ---- | --------------------- |
| `client_email_address` | String or null | `clients[0].email` (also `client.email` in the standard import). |
| `case_email_address` | String, read-only | `legalserver_case.email`, **not** a client email attribute. |

Use the raw value or the imported person attribute in a template:

```jinja2
{{ legalserver_data.get('client_email_address') or '' }}
{{ clients[0].email }}
```

The person attribute is populated only when the raw value is not `null`; guard its use if the email might be unavailable. `case_email_address` is the case's address (for example, `14-0000005@yoursite.legalserver.org`), not an alternate personal address for the client.

The core schema does not define separate client home/work/secondary email fields or a client email-address list. The standard client mapping also does not populate email note or safety attributes. Site-specific custom email fields need explicit fetching and interview support; they are not automatically aliases of `clients[i].email`.

Related contacts and other parties may have their own `email` fields. Those belong to those records and are not additional client email addresses. For person aliases, multi-client templates, and request-interview email variables, see [Email Addresses](/docs/full-variable-list#email-addresses).

### Phone Numbers

The standard case response has separate `home_phone`, `mobile_phone`, `work_phone`, `other_phone`, and `fax_phone` fields, each of which can be `null`. There is no single top-level primary-phone field in this response.

Use bracket notation to access an actual number:

```jinja2
{{ legalserver_data['home_phone'] }}
{{ legalserver_data['mobile_phone'] }}
```

Despite its name, `preferred_phone_number` is a **lookup object**, not a phone-number string:

```jinja2
{{ legalserver_data['preferred_phone_number']['lookup_value_name'] }}
```

This displays the selection's label, not the corresponding phone number. The API also exposes per-number notes and safety indicators, such as `home_phone_note` and `home_phone_safe`. These values may be `null`; a safety indicator is not a primary-number flag.

The Workflow Docs client attributes use different names in some cases. In particular, `clients[i].phone_number` is populated from `home_phone`, not chosen using the preferred-phone selection. See the [client phone mappings](/docs/full-variable-list#phone-numbers) for the complete attribute, note, and safety-flag reference.

Sites using LegalServer's **Person Phone Numbers beta feature** can also have a `phone_numbers` list, described below. Do not assume that feature or list is available for every site.

### Financial & Eligibility

| Field                   | Type    | Description                                                |
| ----------------------- | ------- | ---------------------------------------------------------- |
| `income_eligible`       | Boolean | Whether the client is income eligible.                     |
| `asset_eligible`        | Boolean | Whether the client is asset eligible.                      |
| `percentage_of_poverty` | String  | Poverty percentage (e.g., "0%").                           |
| `total_liquid_assets`   | String  | Formatted currency string.                                 |
| `incomes`               | List    | List of income records. See the **Related Lists** section. |

### Legal Problem

| Field                    | Type   | Description                                  |
| ------------------------ | ------ | -------------------------------------------- |
| `legal_problem_code`     | Lookup | The primary problem code (e.g., "99 Other"). |
| `legal_problem_category` | Lookup | The group category for the problem code.     |

---

## Related Lists

These fields contain lists of related records. Use `for` loops to iterate through them.

### `assignments`

A list of staff members assigned to the case.

- `['user']`: User dictionary.
- `['type']`: Lookup dictionary (e.g., "Primary", "Co-counsel").
- `['start_date']`, `['end_date']`: Assignment dates.

### `notes`

The case notes/history.

- `['subject']`: The note title.
- `['body']`: The content (may contain HTML).
- `['created_by']`: User dictionary.
- `['date_posted']`: ISO date.
- `['note_type']`: Lookup dictionary.
- `['is_html']`: Boolean.

### `incomes`

List of income records.

- `['amount']`: Formatted string (e.g., "$0.01").
- `['period']`: String (e.g., "Weekly").
- `['type']`: Lookup dictionary.
- `['exclude']`: Boolean.

### `documents`

Files attached to the LegalServer record.

- `['name']`: The file name.
- `['title']`: The document title.
- `['download_url']`: Path to download the file.

### `phone_numbers`

Client phone-number records for sites using the **Person Phone Numbers beta feature**. The API schema includes this list on the case object and provides a separate `GET /api/v2/matters/{case_uuid}/phone_numbers` endpoint, which requires the `API Search Matter Phone Numbers` permission. Whether the list is present in `legalserver_data` depends on the data fetched by the integration.

- `['phone_number']`: The phone-number string (may be `null`).
- `['type']`: Lookup dictionary identifying the phone type.
- `['is_primary']`: Boolean identifying a primary number.
- `['is_preferred']`: Preferred-number flag (may be `null`).
- `['is_safe']`: Safe-to-contact flag (may be `null`).
- `['note']`: Phone note (may be `null`).

When this list is available, display numbers marked as primary:

```jinja2
{%p for phone in legalserver_data.get('phone_numbers', []) %}
{%p if phone.get('is_primary') and phone.get('phone_number') %}
{{ phone['phone_number'] }}
{%p endif %}
{%p endfor %}
```

This reads the raw list; it does not mean the integration selects that number for `clients[i].phone_number`.

### `contacts`

Litigation or case contacts.

- `['first']`, `['last']`: Contact name.
- `['phone_business']`: Work number.
- `['email']`: This contact's email address, not the client's email.
- `['case_contact_type']`: Lookup dictionary.

### `associated_cases`

Other cases linked to this client or matter.

- `['matter_identification_number']`: The case number.
- `['matter']`: The case title.
- `['matter_uuid']`: Unique ID.
