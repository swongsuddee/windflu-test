# Brand Register Success Test Design

Source:

- `src/test-design/exploration-brand-register-flow.md`
- current public brand registration success-flow exploration

Implementation target: `src/test/web-ui/brand-register/register-success.spec.ts`

Scope: valid unauthenticated brand registration flow for creating a new public
brand account at `/brand/register`.

Confidence level: 98%

## Coverage Summary

- The previous blocker tracked in `INC-002` no longer reproduces and is closed.
- Current live behavior shows the registration success state on the same
  `/brand/register` route after valid step-1 and step-2 data plus the three
  visible inline policy acceptances.
- One success-path case is sufficient for the current implementation target
  because the supporting validation and step progression are already covered by
  the related registration-flow exploration and tests.

| Test Case ID | Module         | Summary                                      | Objective                                                     | Preconditions                                          | Priority | Labels                                      | Test Type | Step # | Test Step                                                         | Expected Result                                               | Remarked                                                          |
| ------------ | -------------- | -------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------ | -------- | ------------------------------------------- | --------- | ------ | ----------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| REG-VAL-001  | Brand Register | Verify valid registration creates an account | Ensure a new public brand account can be created successfully | User is unauthenticated and generated test data is new | High     | register, positive, auth, automation-target | Web UI    | 1      | Generate unique account data with `jojoetest<timestamp>`          | Unique contact name and email are prepared                    | Use timestamped data only                                         |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 2      | Navigate to `/brand/register`                                     | Step 1 `ข้อมูลบัญชี` is visible                               | Live route confirmed in 2026-04-26 exploration                    |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 3      | Fill valid account data and click `ถัดไป`                         | Step 2 `ข้อมูลแบรนด์` is visible                              | Supporting step progression is already covered elsewhere          |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 4      | Fill company name and choose an industry                          | Step 2 remains active and visible policy cards stay available | `สมัครสมาชิก` is not yet complete while policy acceptances remain |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 5      | Accept `Privacy Brand`, `Term & Con Brand`, and `Agreement Brand` | Registration reaches the success state on `/brand/register`   | Current live flow uses inline policy cards, not the old modal     |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 6      | Observe the success state                                         | `สมัครสำเร็จแล้ว!` and the welcome message are visible        | Success remains on the same route                                 |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 7      | Click `เข้าสู่ระบบ`                                               | User is routed to the brand login entry                       | Route target should be asserted during implementation             |
|              |                |                                              |                                                               |                                                        |          |                                             |           | 8      | Record the created account in the feature-local success registry  | New account details are recorded without raw password         | Runs only after true success                                      |

## Recording Rule

Successful registration should add a new row to the shared success registry at
`src/test-data/register-success-accounts.md`.

This shared registry is gitignored and stores the generated password for each
successful run so the created account can be reused when needed.
