# Template Library

Real-world Workflow Docs templates — fully anonymized and ready to use as a starting point. Download any template, customize the text and variable names for your organization, and upload it to your Workflow Docs configuration.

Each template demonstrates different Workflow Docs features. All identifying information (organization names, addresses, phone numbers, logos) has been replaced with generic placeholders.

---

## Retainers & Agreements

### General Retainer Agreement

<img src="/img/templates/retainer-general.png" alt="General Retainer Agreement preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A standard retainer agreement that collects client acknowledgment and signatures. Demonstrates multi-client handling, signature collection, a checkbox list of services covered, and a date field.

**Features demonstrated:** `clients[0]`, `advocate`, `today()`, `| ask(options=[...])`, `| request(question=...)`

[⬇ Download retainer-general.docx](/templates/retainer-general.docx)

---

### Divorce Retainer (No Children)

<img src="/img/templates/retainer-divorce.png" alt="Divorce Retainer preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A matter-specific retainer for divorce cases without minor children. Shows how to scope a retainer to a specific practice area and add matter-type-specific scope language.

**Features demonstrated:** `clients[0]`, `today()`, `| ask(datatype="area")`, `| request`

[⬇ Download retainer-divorce.docx](/templates/retainer-divorce.docx)

---

### Case Acceptance Letter

<img src="/img/templates/case-acceptance-letter.png" alt="Case Acceptance Letter preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A formal letter confirming that a client's case has been accepted for representation, outlining the scope of services. Useful as a complement to a retainer agreement.

**Features demonstrated:** `clients[0]`, `advocate`, `legalserver_case.id`, `today()`, `| ask(datatype="area")`

[⬇ Download case-acceptance-letter.docx](/templates/case-acceptance-letter.docx)

---

### Three-Party Agreement

<img src="/img/templates/three-party-agreement.png" alt="Three-Party Agreement preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

An agreement involving the client, the legal aid organization, and a third party (such as a referring pro bono attorney). Illustrates how to collect signatures and acknowledgments from multiple parties in a single document.

**Features demonstrated:** `clients[0]`, `advocate`, `| ask(question=...)`, multi-party signature blocks

[⬇ Download three-party-agreement.docx](/templates/three-party-agreement.docx)

---

### Acknowledgment of Understanding (MOU)

<img src="/img/templates/acknowledgment-of-understanding.png" alt="Acknowledgment of Understanding preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A memorandum of understanding / acknowledgment form for clients entering a program with specific conditions. Shows how to collect a brief narrative description of agreed terms alongside a client signature.

**Features demonstrated:** `clients[0]`, `today()`, `| ask(datatype="area")`, `| request`

[⬇ Download acknowledgment-of-understanding.docx](/templates/acknowledgment-of-understanding.docx)

---

## Intake Forms

### Citizenship Attestation

<img src="/img/templates/citizenship-attestation.png" alt="Citizenship Attestation preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A one-page attestation form used during intake to document a client's immigration or citizenship status. Shows how to use a radio-button-style options list and collect a dated signature.

**Features demonstrated:** `clients[0]`, `today()`, `| ask(options=[...])`, `| request`

[⬇ Download citizenship-attestation.docx](/templates/citizenship-attestation.docx)

---

### General Release of Information

<img src="/img/templates/release-of-information.png" alt="Release of Information preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A HIPAA-style release authorizing disclosure of client information to specified third parties. Illustrates freeform recipient fields, expiration date, and purpose checkboxes.

**Features demonstrated:** `clients[0]`, `today()`, `| ask(question=...)`, `| request`, `scope_of_service | ask(options=[...])`

[⬇ Download release-of-information.docx](/templates/release-of-information.docx)

---

## Client Communications

### Advice Letter

<img src="/img/templates/advice-letter.png" alt="Advice Letter preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A general legal advice letter for cases where the organization is providing advice-only (non-representation) services. Shows how to pull in case description data from LegalServer and include a free-text advice narrative.

**Features demonstrated:** `clients[0]`, `advocate`, `legalserver_case`, `today()`, `| ask(datatype="area")`

[⬇ Download advice-letter.docx](/templates/advice-letter.docx)

---

### Referral Letter (Bilingual)

<img src="/img/templates/referral-letter.png" alt="Referral Letter preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A bilingual (English/Spanish) referral letter that directs a client to another organization for services. Demonstrates the `document_language` variable pattern for generating language-specific content within a single template, and hyperlinks to referral resources.

**Features demonstrated:** `clients[0]`, `advocate`, `document_language | ask(options=["English","Spanish"])`, bilingual content blocks, hyperlinks

[⬇ Download referral-letter.docx](/templates/referral-letter.docx)

---

### Limited Assistance Representation (LAR) Notice

<img src="/img/templates/limited-assistance-notice.png" alt="LAR Notice preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A notice sent to clients being served under a limited assistance representation arrangement, describing the scope of services the attorney will and will not provide. Shows how to capture a free-text scope description and collect a signature acknowledging the limitations.

**Features demonstrated:** `clients[0]`, `advocate`, `lar_scope | ask(datatype="area")`, `today()`, `| request`

[⬇ Download limited-assistance-notice.docx](/templates/limited-assistance-notice.docx)

---

## Rejection Letters

### Rejection — Conflict of Interest

<img src="/img/templates/rejection-conflict.png" alt="Rejection (Conflict) preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A closing letter sent when a case is declined due to a conflict of interest. Provides a neutral, professional explanation and directs the client to other resources.

**Features demonstrated:** `clients[0]`, `advocate`, `today()`, `legalserver_case.id`

[⬇ Download rejection-conflict.docx](/templates/rejection-conflict.docx)

---

### Rejection — Over Income

<img src="/img/templates/rejection-over-income.png" alt="Rejection (Over Income) preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A closing letter sent when a prospective client's income exceeds the program's eligibility threshold. Includes referrals to private bar and other resources.

**Features demonstrated:** `clients[0]`, `advocate`, `today()`, `| ask(options=[...])`

[⬇ Download rejection-over-income.docx](/templates/rejection-over-income.docx)

---

### Rejection — Lack of Resources

<img src="/img/templates/rejection-lack-resources.png" alt="Rejection (Lack of Resources) preview" style={{maxWidth: '420px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}} />

A closing letter sent when a case is declined because the organization lacks the capacity or resources to take it on at this time. Sympathetic in tone with referrals to other assistance.

**Features demonstrated:** `clients[0]`, `advocate`, `today()`, `scope_of_service | ask(options=[...])`

[⬇ Download rejection-lack-resources.docx](/templates/rejection-lack-resources.docx)
