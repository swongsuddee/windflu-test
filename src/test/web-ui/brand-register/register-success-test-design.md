# Register Success Test Design

Source: current public brand registration flow and existing registration test
coverage.

Implementation target: future success-path coverage beside
`src/test/web-ui/register-flow/register-flow.spec.ts`

Scope: valid unauthenticated brand registration flow for creating a new account.

Confidence level: 90%

## Assumptions

- The public registration entry remains `/brand/register`.
- A valid new account uses the generated `jojoetest<timestamp>` pattern.
- Successful registration creates a reusable account that should be recorded in
  a feature-local success registry and, when useful, summarized in the shared
  `src/test-data/registered-accounts.md`.
- Raw passwords must not be written into committed record files.
- Step 2 stays on `/brand/register`, shows `ข้อมูลแบรนด์`, and requires company
  name, industry selection, and policy acceptance interactions.
- Live public runs are currently blocked by incident `INC-002`, so the success
  implementation is marked as an expected failure until the registration flow is
  fixed or clarified.

## Current Flow Evidence

- Step 1: `ข้อมูลบัญชี`
- Step 2: `ข้อมูลแบรนด์`
- Step 2 fields observed:
  - `ชื่อบริษัท / แบรนด์`
  - `อุตสาหกรรม`
  - policy modal opened by `อ่านเพิ่มเติม →`
- Step 2 actions observed:
  - `ย้อนกลับ`
  - `สมัครสมาชิก`
- Live blocker observed after submit with valid visible inputs:
  - `accept_privacy_policy_version, accept_terms_and_conditions_version, and accept_clipper_agreement_version are required`
  - repeated retries later returned `too many requests`

## Test Coverage Estimation

Total: 1 prepared valid-flow test case

Breakdown:

- Brand registration valid flow: 1

Affected: 0
New: 1
Obsolete: 0

Reasoning:

- One success-path case is sufficient for the current implementation target.
- The live blocker is in product behavior, not in missing step discovery
  anymore.

## Prepared Test Case

| Test Case ID | Module         | Summary                                      | Objective                                                     | Preconditions                                          | Priority | Labels                                      | Test Type | Step # | Test Step                                                                                 | Expected Result                                       | Remarked                                                                         |
| ------------ | -------------- | -------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------ | -------- | ------------------------------------------- | --------- | ------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| REG-VAL-001  | Brand Register | Verify valid registration creates an account | Ensure a new public brand account can be created successfully | User is unauthenticated and generated test data is new | High     | register, positive, auth, automation-target | Web UI    | 1      | Generate unique account data with `jojoetest<timestamp>`                                  | Unique contact name and email are prepared            | Use timestamped data only                                                        |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 2      | Navigate to `/brand/register`                                                             | Registration step 1 `ข้อมูลบัญชี` is visible          | Existing coverage already confirms step-1 access                                 |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 3      | Fill valid account data and click `ถัดไป`                                                 | Step 2 `ข้อมูลแบรนด์` is visible                      | Implemented in `REG-VAL-001`                                                     |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 4      | Fill company name, choose an industry, open policy details, and accept the visible policy | `สมัครสมาชิก` becomes enabled                         | Implemented in `REG-VAL-001`; live flow still blocks after submit                |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 5      | Click `สมัครสมาชิก`                                                                       | Registration completes and leaves `/brand/register`   | Currently blocked by incident `INC-002`; implemented as expected failure in code |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 6      | Record the created account in `register-success-accounts.md`                              | New account details are recorded without raw password | Runs only after true success                                                     |

## Recording Rule

Successful registration should append a new row to
`src/test/web-ui/register-flow/register-success-accounts.md` with:

- timestamp
- contact/display name
- email
- role
- status
- password reference only
- notes
