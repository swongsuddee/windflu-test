# Incident Log

Purpose: track observed product errors or incidents for review, developer fix,
and QA retest.

Use this file when current behavior appears wrong, broken, misleading, or not
aligned with expected user behavior. Incidents stay here while open, in
development, or awaiting retest. After an incident is fixed and retested, remove
the active row and record the closure in the resolution log.

Do not store secrets, credentials, cookies, OTPs, auth tokens, recovery links, or
private personal data.

## Active Incidents

| Incident ID | Date Found | Area                 | Source                                   | Severity | Environment                       | Steps To Reproduce                 | Actual Result                                                | Expected Result                                              | Developer Fix Owner | Fix Status | Retest Status | Notes                                                                                                              |
| ----------- | ---------- | -------------------- | ---------------------------------------- | -------- | --------------------------------- | ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------- | ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| INC-001     | 2026-04-23 | Contact / Error Page | Footer contact link / public exploration | Medium   | `https://www.windflu.com`, public | From footer, open `ติดต่อเรา` link | `/contact` shows a 404 page with a `กลับสู่หน้าหลัก` action. | Contact page or supported contact route should be available. | TBD                 | Open       | Not retested  | Removed from active policy/homepage tests. Track here until fixed, then retest and remove after recording closure. |

## Resolution Log

| Incident ID | Fixed Date | Retest Date | Retest Result | Removed From Active By | Notes |
| ----------- | ---------- | ----------- | ------------- | ---------------------- | ----- |
