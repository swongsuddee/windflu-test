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

| Incident ID | Date Found | Area                 | Source                                   | Severity | Environment                       | Steps To Reproduce                 | Actual Result                                                | Expected Result                                                                                                       | Developer Fix Owner | Fix Status | Retest Status | Notes                                                                                                                                                                            |
| ----------- | ---------- | -------------------- | ---------------------------------------- | -------- | --------------------------------- | ---------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INC-001     | 2026-04-23 | Contact / Error Page | Footer contact link / public exploration | Medium   | `https://www.windflu.com`, public | From footer, open `ติดต่อเรา` link | `/contact` shows a 404 page with a `กลับสู่หน้าหลัก` action. | Contact page or supported contact route should be available after the in-progress contact implementation is complete. | TBD                 | Open       | Not retested  | User clarified on 2026-04-25 that `/contact` is still under implementation. Keep out of active coverage until the page is ready, then retest and remove after recording closure. |

## Resolution Log

| Incident ID | Fixed Date | Retest Date | Retest Result | Removed From Active By | Notes                                                                                                                                                                                                                                                                                              |
| ----------- | ---------- | ----------- | ------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INC-002     | 2026-04-26 | 2026-04-26  | Pass          | Codex                  | Retest observed the updated inline policy-card flow on `/brand/register`; after valid account/company data plus the three visible policy acceptances, the page reached `สมัครสำเร็จแล้ว!` on the same route and the old backend validation blocker no longer reproduced.                           |
| INC-003     | 2026-04-26 | 2026-04-26  | Pass          | Codex                  | Retest confirmed both `/policy?tab=privacy_policy` and `/policy?tab=terms_and_conditions` now expose concrete long-form content with stable headings, visible tabs, support contact details, and update stamps dated `25 เมษายน 2569`; the previous implementation-only blocker no longer applies. |
