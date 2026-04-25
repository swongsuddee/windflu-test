# Register Success Accounts

Purpose: feature-local record of successfully created registration accounts from
the valid registration flow.

Do not record raw passwords, OTPs, cookies, auth tokens, or recovery links in
this file.

## Recording Rules

- Add newest successful accounts at the top.
- Record only accounts that completed the intended registration success flow.
- Use password reference only, such as `.env WINDFLU_CREATOR_PASSWORD` or a
  named test-data source.
- If an account becomes reusable across authenticated tests, it may also be
  summarized in `src/test-data/registered-accounts.md`.

## Success Registry

| Created At       | Flow                      | Display Name / Contact Name | Email                                 | Role  | Status | Password Reference | Notes                                      |
| ---------------- | ------------------------- | --------------------------- | ------------------------------------- | ----- | ------ | ------------------ | ------------------------------------------ |
| _No entries yet_ | Brand register valid flow | `jojoetestYYYYMMDDHHMMSS`   | `jojoetestYYYYMMDDHHMMSS@example.com` | Brand | _TBD_  | `_reference only_` | Add real rows only after a successful run. |
