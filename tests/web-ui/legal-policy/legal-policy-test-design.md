# Legal Policy Test Design

Source: split from `tests/web-ui/public-unauthenticated-test-design.md`

Implementation: `tests/web-ui/legal-policy/legal-policy.spec.ts`

Scope: public policy tabs for unauthenticated users.

| Test Case ID | Module       | Summary            | Objective                                       | Preconditions           | Priority | Labels            | Test Type | Step # | Test Step                                                         | Expected Result                         | Remarked |
| ------------ | ------------ | ------------------ | ----------------------------------------------- | ----------------------- | -------- | ----------------- | --------- | ------ | ----------------------------------------------------------------- | --------------------------------------- | -------- |
| PUB-028      | Policy Pages | Verify policy tabs | Ensure legal policy tabs render correct content | User is unauthenticated | Medium   | legal, regression | Web UI    | 1      | Navigate to `/policy?tab=privacy_policy`                          | Privacy policy content is visible       |          |
|              |              |                    |                                                 |                         |          |                   |           | 2      | Click terms tab or navigate to `/policy?tab=terms_and_conditions` | Terms and conditions content is visible |          |
