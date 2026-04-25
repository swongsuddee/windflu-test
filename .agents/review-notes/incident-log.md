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

| Incident ID | Date Found | Area                 | Source                                   | Severity | Environment                       | Steps To Reproduce                                                     | Actual Result                                                                                                                                | Expected Result                                                                                                       | Developer Fix Owner | Fix Status | Retest Status | Notes                                                                                                                                                                            |
| ----------- | ---------- | -------------------- | ---------------------------------------- | -------- | --------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INC-001     | 2026-04-23 | Contact / Error Page | Footer contact link / public exploration | Medium   | `https://www.windflu.com`, public | From footer, open `ติดต่อเรา` link                                     | `/contact` shows a 404 page with a `กลับสู่หน้าหลัก` action.                                                                                 | Contact page or supported contact route should be available after the in-progress contact implementation is complete. | TBD                 | Open       | Not retested  | User clarified on 2026-04-25 that `/contact` is still under implementation. Keep out of active coverage until the page is ready, then retest and remove after recording closure. |
| INC-003     | 2026-04-25 | Legal Policy Content | Public policy exploration                | Medium   | `https://www.windflu.com`, public | Open privacy policy and terms pages from public footer or policy route | Terms and privacy content are still under implementation and should not yet be treated as stable final behavior or locked assertion targets. | Public privacy and terms content should be complete and stable before detailed assertion coverage is enabled.         | TBD                 | Open       | Not retested  | User clarified on 2026-04-25 that terms and privacy are still under implementation and they will confirm later when ready.                                                       |

## Resolution Log

| Incident ID | Fixed Date | Retest Date | Retest Result | Removed From Active By | Notes                                                                                                                                                                                                                                                                    |
| ----------- | ---------- | ----------- | ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| INC-002     | 2026-04-26 | 2026-04-26  | Pass          | Codex                  | Retest observed the updated inline policy-card flow on `/brand/register`; after valid account/company data plus the three visible policy acceptances, the page reached `สมัครสำเร็จแล้ว!` on the same route and the old backend validation blocker no longer reproduced. |
