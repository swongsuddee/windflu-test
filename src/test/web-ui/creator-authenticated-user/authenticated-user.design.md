# Authenticated User Test Design

Source:

- `src/test-design/exploration-authenticated-creator-actions.md`
- current creator authenticated storage setup project

Implementation: `src/test/web-ui/creator-authenticated-user/authenticated-user.spec.ts`

Scope: authenticated creator coverage for dashboard, my-work, payouts,
profile, and logout after the Playwright setup project has generated creator
storage state.

Confidence level: 98%

## Assumptions

- Creator tests use `creatorStorageStatePath` from `playwright/auth-storage.ts`.
- `src/test/web-ui/creator-login.setup.ts` has already generated the required
  storage state by using `WINDFLU_CREATOR_EMAIL` / `WINDFLU_CREATOR_PASSWORD`.
- Authenticated tests should not store credentials, cookies, OTPs, or storage
  state files in Git.
- PROF data is live and can drift, so implementation may mock selected data
  APIs while keeping the real authenticated shell, route protection, and
  logout flow live.

## Test Coverage Estimation

Confidence level: 98%

Total: 5 test cases

Breakdown:

- Creator dashboard: 1
- Creator my-work: 1
- Creator payouts: 1
- Creator profile: 1
- Creator logout: 1

Affected: 5
New: 0
Obsolete: 0

Reasoning:

- This is not too many because it covers the five requested creator features
  only, using the stable current seeded state rather than branching into KYC,
  submit-flow, or non-empty history permutations.
- This is not too few because each creator feature has a distinct authenticated
  route and user outcome that should be protected separately.
- PROF-specific data volatility is handled by recommending API mocking only for
  unstable content payloads, not for auth/session routing.

## Prepared Test Cases

| Test Case ID | Module                | Summary                                                  | Objective                                                          | Preconditions                                                                  | Priority | Labels                                                   | Test Type | Step # | Test Step                                                             | Expected Result                                                                      | Remarked                                                                                     |
| ------------ | --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------- | -------------------------------------------------------- | --------- | ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| AUT-001      | Creator Authenticated | Verify creator dashboard opens with authenticated shell  | Ensure a logged-in creator can access dashboard without login gate | Creator storage state exists at `creatorStorageStatePath`                      | High     | auth, creator, dashboard, smoke, automation-candidate    | Web UI    | 1      | Start test with creator storage state                                 | Browser context uses authenticated creator storage state                             | Keep real auth/session live                                                                  |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 2      | Navigate to `/creator/dashboard`                                      | User remains outside `/login` and stays on `/creator/dashboard`                      |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 3      | Inspect the authenticated shell and dashboard summary area            | Shared creator navigation and dashboard marker `สรุปคุณภาพผลงาน` are visible         | In PROF, mock summary-data API only if metric payload drift breaks stable zero-state UI      |
| AUT-002      | Creator Authenticated | Verify creator my-work empty-state baseline              | Ensure a logged-in creator can access my-work and see safe status  | Creator storage state exists at `creatorStorageStatePath`                      | High     | auth, creator, my-work, regression, automation-candidate | Web UI    | 1      | Start test with creator storage state                                 | Browser context is authenticated as creator                                          |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 2      | Navigate to `/creator/my-work`                                        | User remains outside `/login` and stays on `/creator/my-work`                        |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 3      | Inspect the current work summary and empty-state area                 | Current seeded empty-state marker `ยังไม่มีผลงาน` and CTA `ค้นหาแคมเปญ` are visible  | Use API mocking for work-summary/history payloads if PROF data stops returning empty state   |
| AUT-003      | Creator Authenticated | Verify creator payouts empty-balance baseline            | Ensure a logged-in creator can access payouts and safe finance UI  | Creator storage state exists at `creatorStorageStatePath`                      | High     | auth, creator, payouts, regression, automation-candidate | Web UI    | 1      | Start test with creator storage state                                 | Browser context is authenticated as creator                                          |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 2      | Navigate to `/creator/payouts`                                        | User remains outside `/login` and stays on `/creator/payouts`                        |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 3      | Inspect payout summary and primary withdrawal action                  | Heading `ประวัติการถอนเงิน`, zero-balance state, and `ถอนเงิน` action are visible    | Prefer mocking payout-summary/history APIs in PROF rather than asserting live finance totals |
| AUT-004      | Creator Authenticated | Verify creator profile baseline and unverified KYC state | Ensure a logged-in creator can access profile and current state    | Creator storage state exists at `creatorStorageStatePath`                      | High     | auth, creator, profile, regression, automation-candidate | Web UI    | 1      | Start test with creator storage state                                 | Browser context is authenticated as creator                                          |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 2      | Navigate to `/creator/profile`                                        | User remains outside `/login` and stays on `/creator/profile`                        |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 3      | Inspect profile identity, sections, and KYC status                    | Display name, profile sections, and current KYC state `ยังไม่ยืนยัน` are visible     | Mock profile-detail API only if seeded display data becomes unstable in PROF                 |
| AUT-005      | Creator Authenticated | Verify creator logout returns user to public homepage    | Ensure creator can leave authenticated shell safely                | Creator storage state exists at `creatorStorageStatePath`; creator shell loads | Medium   | auth, creator, logout, navigation                        | Web UI    | 1      | Start test with creator storage state and open an authenticated route | Creator shell is visible with logout control                                         |                                                                                              |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 2      | Trigger `ออกจากระบบ`                                                  | Creator session exits authenticated area                                             | Current exploration observed pointer-click interception risk during probing                  |
|              |                       |                                                          |                                                                    |                                                                                |          |                                                          |           | 3      | Observe post-logout destination                                       | User is routed to homepage `/` and no longer remains in creator authenticated routes | Keep logout action live; do not mock auth/session exit                                       |
