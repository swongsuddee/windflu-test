# Legal Policy Test Design

Source: split from the legacy public unauthenticated master reference

Implementation: `src/test/web-ui/legal-policy/legal-policy.spec.ts`

Scope: public policy tabs for unauthenticated users.

| Test Case ID | Module       | Summary            | Objective                                                     | Preconditions           | Priority | Labels            | Test Type | Step # | Test Step                                                         | Expected Result                                        | Remarked                                                  |
| ------------ | ------------ | ------------------ | ------------------------------------------------------------- | ----------------------- | -------- | ----------------- | --------- | ------ | ----------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| PUB-028      | Policy Pages | Verify policy tabs | Ensure legal policy tabs route safely without locking content | User is unauthenticated | Medium   | legal, regression | Web UI    | 1      | Navigate to `/policy?tab=privacy_policy`                          | Privacy policy route loads and policy tabs are visible | Terms/privacy content remains under implementation        |
|              |              |                    |                                                               |                         |          |                   |           | 2      | Click terms tab or navigate to `/policy?tab=terms_and_conditions` | Terms route loads and policy tabs remain visible       | Keep assertions conservative until implementation settles |
