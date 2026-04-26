# Full Variable List

This page provides a comprehensive and exhaustive reference of all built-in variables available in Workflow Docs.

## 1. Built-in Nouns (People)

These variables represent individuals or groups. They are pre-defined as either `ALIndividual` (singular) or `ALPeopleList` (plural).

### Singular Roles (`ALIndividual`)
Use these as-is (e.g., `{{ spouse.name.first }}`).

| Variable | Description |
|---|---|
| `client` | The primary client on the case. |
| `spouse` | The client's spouse. |
| `advocate` | The person running the interview. |
| `notary_public` | A notary public. |
| `plaintiff` | The plaintiff in the case. |
| `defendant` | The defendant in the case. |
| `petitioner` | The petitioner. |
| `respondent` | The respondent. |
| `legalserver_primary_assignment` | The primary staff member assigned to the case. |
| `legalserver_first_pro_bono_assignment` | The first pro bono assignment record. |
| `legalserver_latest_pro_bono_assignment` | The most recent pro bono assignment record. |
| `legalserver_current_user` | The currently logged-in LegalServer user. |

### Plural Roles (`ALPeopleList`)
Access individual items using index notation (e.g., `{{ clients[0] }}`, `{{ witnesses[1] }}`).

| Variable | Description |
|---|---|
| `clients` | Primary client(s). |
| `other_parties` | Other parties on the case. |
| `plaintiffs` / `defendants` | Parties in litigation. |
| `petitioners` / `respondents` | Parties in family or probate matters. |
| `children` | Children involved in the matter. |
| `witnesses` | Case witnesses. |
| `trustees` / `successor_trustees` | Trust-related roles. |
| `settlors` / `beneficiaries` | Trust-related roles. |
| `guardians` / `executors` | Fiduciary roles. |
| `agents` / `attorneys` | Representative roles. |
| `representatives` | General representatives. |
| `pets` | Pets involved in the matter. |
| `charities` | Charitable organizations. |
| `healthcare_proxies` / `healthcare_agents` | Medical representatives. |
| `medical_proxies` | Medical representatives. |
| `funeral_directors` | Funeral arrangements. |
| `financial_advisors` / `insurance_agents` | Professional contacts. |
| `property_managers` / `real_estate_agents` | Property-related roles. |
| `digital_executors` | Digital asset management. |
| `business_partners` | Business-related roles. |
| `trustees_of_special_needs_trust` | Specialized trust roles. |
| `trustees_of_charitable_trust` | Specialized trust roles. |
| `notaries` | Notary publics (list). |
| `legal_counsels` / `attorneys` | Legal representation. |
| `accountants` / `mediators` / `arbitrators` | Professional neutrals. |
| `depositaries` / `fiduciaries` | Financial/trust roles. |
| `estate_planners` | Professional contacts. |
| `guardians_ad_litem` / `conservators` | Court-appointed roles. |
| `administrators` | Estate administrators. |
| `borrowers` / `lenders` | Lending roles. |
| `co_signers` / `guarantors` | Lending roles. |
| `service_providers` / `vendors` | Service roles. |
| `licensees` / `licensors` | Licensing roles. |
| `purchasers` / `sellers` / `buyers` | Real estate/transactional roles. |
| `escrow_agents` / `closing_agents` / `title_agents` | Transactional roles. |
| `mortgage_lenders` / `home_inspectors` | Transactional roles. |
| `property_surveyors` | Transactional roles. |
| `prosecutors` / `defense_attorneys` | Criminal law roles. |
| `judges` / `jurors` / `bailiffs` | Court roles. |
| `court_reporters` | Court roles. |
| `public_defenders` / `forensic_experts` | Specialized legal roles. |
| `victim_advocates` | Support roles. |
| `law_enforcement_officers` | Official roles. |
| `divorcing_parties` | Family law roles. |
| `child_custody_parties` | Family law roles. |
| `alimony_recipients` | Family law roles. |
| `family_attorneys` | Family law roles. |
| `parental_rights_parties` | Family law roles. |
| `domestic_relations_counsels` | Family law roles. |
| `child_support_obligors` / `child_support_recipients` | Family law roles. |

---

## 2. LegalServer Data Variables

These variables represent raw data or lists fetched directly from LegalServer.

| Variable | Description |
|---|---|
| `legalserver_data` | The raw JSON dictionary of case details. See the [LegalServer Data Reference](/docs/legalserver-data-reference) for a detailed field map. |
| `legalserver_case` | A helper object for accessing core case fields. |
| `legalserver_assignments` | List of staff assignments. |
| `legalserver_services` | List of services provided. |
| `legalserver_litigations` | List of litigation records. |
| `legalserver_charges` | List of charges (criminal cases). |
| `legalserver_contacts` | List of case contacts. |
| `legalserver_incomes` | List of income records. |
| `legalserver_notes` | List of case notes. |
| `legalserver_events` | List of calendar events. |
| `legalserver_tasks` | List of matter tasks. |
| `legalserver_adverse_parties` | List of adverse parties. |
| `legalserver_non_adverse_parties` | List of non-adverse parties. |
| `legalserver_pro_bono_assignments` | List of pro bono assignments. |
| `legalserver_site` | Information about the LegalServer site. |

---

## 3. Addresses

Addresses can be accessed for any individual or list item using these attributes:

| Variable / Attribute | Description |
|---|---|
| `trial_court_address` | Address of the trial court. |
| `appeals_court_address` | Address of the appeals court. |
| `users[i].address` | Primary address. |
| `users[i].mailing_address` | Mailing address. |
| `users[i].service_address` | Address for service of process. |
| `users[i].previous_addresses` | List of previous addresses. |
| `users[i].other_addresses` | List of other addresses. |

---

## 4. Case and Docket Numbers

| Variable | Description |
|---|---|
| `docket_numbers` | A list or string of docket numbers. |
| `case_numbers` | A list of case numbers. |
| `court_case_number` | The primary court case number. |
| `legalserver_matter_uuid` | Internal LegalServer UUID. |
| `legalserver_site_abbreviation` | Site name (e.g., `abc`). |
| `legalserver_site_type` | Usually `live` or `demo`. |

---

## 5. Personal Information

Available for any `ALIndividual` or item in an `ALPeopleList` (replace `users[i]` with your variable name).

| Attribute | Description |
|---|---|
| `users[i].name` | The full name object. |
| `users[i].ssn` | Social Security Number. |
| `users[i].ssn_last_4` | Last 4 digits of SSN. |
| `users[i].birthdate` | Date of birth. |
| `users[i].gender` | Gender. |
| `users[i].marital_status` | Marital status. |
| `users[i].email` | Email address. |
| `users[i].phone_number` | Primary phone. |
| `users[i].mobile_number` | Mobile phone. |
| `users[i].fax_number` | Fax number. |
| `users[i].preferred_language` | Preferred language. |
| `users[i].pronouns` | Preferred pronouns. |
| `users[i].aliases` | List of aliases. |
| `users[i].previous_names` | List of previous names. |
| `users[i].signature` | Signature object. |
| `users[i].program` | Associated LegalServer program. |
| `signature_date` | The date the document is generated/signed. |

---

## 6. Signatures and Affirmations

| Variable / Attribute | Description |
|---|---|
| `users[i].signature` | The signature field/image. |
| `users[i].states_above_true` | Boolean for affirmation of truth. |
| `signature_choice` | Method used to sign. |
| `signature_wait_screen` | Screen shown while waiting for others. |
| `signature_phone_followup` | Follow-up status for phone signatures. |
| `should_cc_user` | Boolean for whether to CC the advocate. |
| `cc_email` | The email address to CC. |

---

## 7. Document Handling & Miscellaneous

| Variable | Description |
|---|---|
| `comments_to_clerk` | Instructions or comments for a court clerk. |
| `adverse_parties[i].name.text` | Full name of an adverse party. |
| `adverse_parties.there_is_another` | Boolean for whether there are more parties. |
| `organization_holding_records` | Name of organization with records. |
| `payment_first_date` | Date of first payment. |
| `payment_second_date` | Date of second payment. |
| `payment_third_date` | Date of third payment. |
| `appointment_date` | Date of appointment. |
| `time_set` | Boolean for whether time is set. |
| `appointment_time` | Time of appointment. |
| `attempted_contact` | Boolean for whether contact was attempted. |
| `final_contact_date` | Date of last contact. |
| `documents_for_interview` | List of documents relevant to the session. |
