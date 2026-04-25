# Registered Test Accounts

Purpose: record test accounts created during QA runs so they can be reused, audited, or cleaned up later.

Do not record passwords, OTPs, session cookies, auth tokens, recovery links, or private personal data in this file.

## Recording Rules

- Add newest accounts at the top of the table.
- Use only test accounts.
- Use `jojoetest` prefix for generated names when possible.
- Store password reference only, such as `register-test-data default`, not the actual password.
- Mark account status as `created`, `pending verification`, `blocked`, `disabled`, or `cleanup requested`.
- Add cleanup notes when an account should be removed from the environment.

## Account Registry

| Created At          | Flow             | Environment        | Display Name / Contact Name | Email                                 | Phone        | Role    | Status               | Password Reference              | Notes                                                         |
| ------------------- | ---------------- | ------------------ | --------------------------- | ------------------------------------- | ------------ | ------- | -------------------- | ------------------------------- | ------------------------------------------------------------- |
| 2026-04-23 21:28:48 | Creator register | Windflu dev public | `jojoetest20260423212848`   | `jojoetest20260423212848@example.com` | Not recorded | Creator | created              | `.env WINDFLU_CREATOR_PASSWORD` | Reuse candidate for authenticated creator coverage.           |
| _Example only_      | Creator register | Windflu dev public | `jojoetestYYYYMMDDHHMMSS`   | `jojoetestYYYYMMDDHHMMSS@example.com` | `0812345678` | Creator | pending verification | `register-test-data default`    | Replace this example row when a real test account is created. |

## Cleanup Log

| Date | Account | Action | Result | Notes |
| ---- | ------- | ------ | ------ | ----- |
