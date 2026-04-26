# Responsive Language in Templates

Make your templates adapt to the data by using dynamic phrasing and conditional logic. This ensures your documents always use the correct grammar and only include relevant sections.

## 1. Conditional Blocks (`if`)

Use `{% if %}` blocks to show or hide entire sections of text based on whether a variable exists or a condition is met.

```jinja2
{% if children %}
CLIENT'S CHILDREN:
{{ children.comma_and_list() }}
{% endif %}
```

## 2. Inline Conditionals

For small variations within a sentence (like "is" vs "are"), use an inline `if` statement.

```jinja2
The client {{ "is" if clients.length == 1 else "are" }} currently residing in...
```

## 3. Handling Pluralization (Standard Methods)

Workflow Docs follows the standard [Docassemble](https://docassemble.org/docs/objects.html#DAList) and [AssemblyLine](https://assemblyline.suffolklitlab.org/docs/authoring/dynamic_phrasing_based_on_values) methods for handling singular and plural forms. These are **methods** called on an object or list.

### For Lists (e.g., `clients`, `children`)
- **`.quantity_noun("word")`**: Returns the count and the correctly pluralized word.
  - `{{ children.quantity_noun("child") }}` → "one child" or "three children"
- **`.as_noun("word")`**: Returns only the word, correctly pluralized based on the list count.
  - `{{ children.as_noun("child") }}` → "child" or "children"
- **`.does_verb("verb")`**: Conjugates a present-tense verb to match the list count.
  - `{{ clients.does_verb("reside") }}` → "resides" (if 1) or "reside" (if >1)
- **`.did_verb("verb")`**: Conjugates a past-tense verb (e.g., "was" vs "were").
  - `{{ clients.did_verb("be") }}` → "was" (if 1) or "were" (if >1)
- **`.possessive("word")`**: Adds the correct apostrophe for the list (handles both singular and plural possessives).
  - `{{ clients.possessive("address") }}` → "client's address" or "clients' address"

### For Individuals (e.g., `clients[0]`, `spouse`)
- **`.possessive()`**: Adds an apostrophe-s to an individual's name.
  - `{{ clients[0].possessive() }}` → "John's"

## 4. Formatting Filters

You can adjust the casing of any variable using these standard Jinja2 filters:

- `{{ variable | upper }}`: ALL CAPS
- `{{ variable | lower }}`: all lower case
- `{{ variable | capitalize }}`: Capitalize the first letter

## 5. Further Reading

- [**Docassemble DAList Documentation**](https://docassemble.org/docs/objects.html#DAList): Core methods for list-based pluralization.
- [**AssemblyLine: Dynamic Phrasing**](https://assemblyline.suffolklitlab.org/docs/authoring/dynamic_phrasing_based_on_values): A guide on creating grammar-aware templates.
- [**Authoring DOCX Files**](https://assemblyline.suffolklitlab.org/docs/authoring/docx): Details on using Jinja2 syntax and filters specifically within Word documents.
