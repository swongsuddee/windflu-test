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

| Created At          | Flow        | Display Name / Contact Name | Email                                 | Role    | Status  | Password Reference                                           | Notes                                                                                                |
| ------------------- | ----------- | --------------------------- | ------------------------------------- | ------- | ------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 2026-04-25 17:27:52 | REG-VAL-001 | `jojoedisplay172747`        | `jojoetest20260425172747@example.com` | Creator | Created | `src/test-data/register-test-data.ts` default valid password | Recorded from REG-VAL-001 valid creator registration reaches success state and exposes dashboard CTA |
| 2026-04-25 17:30:09 | REG-VAL-001 | `jojoedisplay173003` | `jojoetest20260425173003@example.com` | Creator | Created | `src/test-data/register-test-data.ts` default valid password | Recorded from REG-VAL-001 valid creator registration reaches success state and exposes dashboard CTA |
