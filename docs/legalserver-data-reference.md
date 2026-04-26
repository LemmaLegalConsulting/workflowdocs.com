# LegalServer Data Reference

The `legalserver_data` variable is a raw Python dictionary containing all case details fetched from the LegalServer API. 

**Important:** Because this is a standard dictionary, you must use **bracket notation** (e.g., `legalserver_data['case_number']`) to access its keys. The standard "dot notation" (e.g., `legalserver_data.case_number`) will not work.

## Common Object Structures

Many fields in `legalserver_data` return nested dictionaries. Use the following keys to access their attributes:

### 1. Lookup Values
Fields representing a selection from a LegalServer lookup table (dropdown) return a dictionary with these keys:

| Key | Description |
|---|---|
| `['lookup_value_name']` | The human-readable label (e.g., "Active"). |
| `['lookup_value_id']` | The internal LegalServer ID. |
| `['lookup_value_uuid']` | The unique UUID. |
| `['lookup_type_name']` | The name of the lookup table. |

**Example:** `{{ legalserver_data['case_status']['lookup_value_name'] }}`

### 2. User/Staff Objects
Fields representing a staff member or user return a dictionary with these keys:

| Key | Description |
|---|---|
| `['user_name']` | The full name of the user. |
| `['user_id']` | The internal LegalServer ID. |
| `['user_uuid']` | The unique UUID. |

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

| Type | Amount | Period |
| :--- | :--- | :--- |
| `{%tr for income in legalserver_data['incomes'] %}` | | |
| `{{ income['type']['lookup_value_name'] }}` | `{{ income['amount'] }}` | `{{ income['period'] }}` |
| `{%tr endfor %}` | | |

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
| Field | Type | Description |
|---|---|---|
| `case_id` | Integer | Internal ID. |
| `case_number` | String | The primary case number (e.g., "21-0207916"). |
| `case_status` | Lookup | The current status (e.g., "Active"). |
| `case_disposition` | Lookup | The case disposition. |
| `date_opened` | String | ISO date of intake. |
| `matter_uuid` | String | Unique UUID for the case. |

### Client Information
| Field | Type | Description |
|---|---|---|
| `client_full_name` | String | The client's full name. |
| `first`, `middle`, `last` | String | Individual name components. |
| `client_email_address` | String | Primary email. |
| `mobile_phone` | String | Mobile number. |
| `client_address_home` | Object | Nested address object (`street`, `city`, `state`, `zip`). |
| `client_gender` | Lookup | Client gender. |
| `citizenship` | Lookup | Citizenship status. |

### Financial & Eligibility
| Field | Type | Description |
|---|---|---|
| `income_eligible` | Boolean | Whether the client is income eligible. |
| `asset_eligible` | Boolean | Whether the client is asset eligible. |
| `percentage_of_poverty` | String | Poverty percentage (e.g., "0%"). |
| `total_liquid_assets` | String | Formatted currency string. |
| `incomes` | List | List of income records. See the **Related Lists** section. |

### Legal Problem
| Field | Type | Description |
|---|---|---|
| `legal_problem_code` | Lookup | The primary problem code (e.g., "99 Other"). |
| `legal_problem_category` | Lookup | The group category for the problem code. |

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

### `contacts`
Litigation or case contacts.
- `['first']`, `['last']`: Contact name.
- `['phone_business']`: Work number.
- `['case_contact_type']`: Lookup dictionary.

### `associated_cases`
Other cases linked to this client or matter.
- `['matter_identification_number']`: The case number.
- `['matter']`: The case title.
- `['matter_uuid']`: Unique ID.
