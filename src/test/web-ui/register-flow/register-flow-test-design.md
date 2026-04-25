# Register Flow Test Design

Source: split from the legacy public unauthenticated master reference

Implementation: `src/test/web-ui/register-flow/register-flow.spec.ts`

Scope: brand registration flow for unauthenticated users.

| Test Case ID | Module     | Summary                                     | Objective                                             | Preconditions                | Priority | Labels                                 | Test Type | Step # | Test Step                                         | Expected Result                                                             | Remarked |
| ------------ | ---------- | ------------------------------------------- | ----------------------------------------------------- | ---------------------------- | -------- | -------------------------------------- | --------- | ------ | ------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| PUB-015      | Brand Auth | Verify brand registration step 1 validation | Ensure brand registration requires valid account data | User is on `/brand/register` | High     | auth, validation, automation-candidate | Web UI    | 1      | Leave registration fields blank and click `ถัดไป` | User remains on step 1; validation is shown or invalid fields are indicated |          |
|              |            |                                             |                                                       |                              |          |                                        |           | 2      | Enter mismatched passwords                        | Password confirmation validation blocks progression                         |          |
