# Authenticated User Test Design

Source: prepared from `src/test-design/exploration-authenticated-user-actions.md`
and the Playwright setup project.

Implementation: `src/test/web-ui/authenticated-user/authenticated-user.spec.ts`

Scope: authenticated creator route access after the Playwright setup project
has generated creator storage state.

Confidence level: 84%

## Assumptions

- Creator tests use `creatorStorageStatePath` from `playwright/auth-storage.ts`.
- `src/test/web-ui/creator-login.setup.ts` has already generated the required storage
  state by using `WINDFLU_CREATOR_EMAIL` / `WINDFLU_CREATOR_PASSWORD`.
- Authenticated tests should not store credentials, cookies, OTPs, or generated
  storage state files in Git.
- Brand authenticated coverage is deferred until brand registration and
  reusable brand credentials exist.

## Clarification Needed Before Full Detail Coverage

[Flow / Navigation]

- What is the expected default landing page after creator login?
- Should campaign submit open a submission form, onboarding requirement, or
  campaign participation state for logged-in creators?

[Business rules]

- Does creator campaign submit require profile completion or connected social
  accounts?

[Integration / backend behavior]

- Is there seeded creator data for my-work, payouts, and profile?

## Test Coverage Estimation

Total: 5 prepared test cases

Breakdown:

- Creator authenticated access: 5

Affected: 0
New: 5
Obsolete: 0

Reasoning:

- This avoids testing unknown dashboard details before authenticated exploration
  confirms real content.
- It is not too few because it covers every currently implementable protected
  creator route.
- It is not too many because brand authenticated coverage is deferred until
  brand registration and reusable brand credentials exist.

## Prepared Test Cases

| Test Case ID | Module                | Summary                                           | Objective                                                       | Preconditions                                                                     | Priority | Labels                                       | Test Type | Step # | Test Step                                                        | Expected Result                                                                                 | Remarked                                               |
| ------------ | --------------------- | ------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------- | -------------------------------------------- | --------- | ------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| AUT-001      | Creator Authenticated | Verify creator dashboard opens from storage state | Ensure a logged-in creator can access dashboard without login   | Creator storage state exists at `creatorStorageStatePath`                         | High     | auth, creator, smoke, automation-candidate   | Web UI    | 1      | Start test with creator storage state                            | Browser context uses authenticated creator storage state                                        | Initial implementation checks real route access only   |
|              |                       |                                                   |                                                                 |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/dashboard`                                 | User remains outside `/login`; creator dashboard or authenticated shell is visible              | Refine page assertions after authenticated exploration |
| AUT-002      | Creator Authenticated | Verify creator my-work opens from storage state   | Ensure logged-in creator can access work management             | Creator storage state exists at `creatorStorageStatePath`                         | High     | auth, creator, work, automation-candidate    | Web UI    | 1      | Start test with creator storage state                            | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                 |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/my-work`                                   | User remains outside `/login`; my-work page or authenticated shell is visible                   | Refine page assertions after seeded work data is known |
| AUT-003      | Creator Authenticated | Verify creator payouts opens from storage state   | Ensure logged-in creator can access finance page                | Creator storage state exists at `creatorStorageStatePath`                         | Medium   | auth, creator, payouts, automation-candidate | Web UI    | 1      | Start test with creator storage state                            | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                 |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/payouts`                                   | User remains outside `/login`; payouts page or authenticated shell is visible                   | Refine assertions after payout seed data is known      |
| AUT-004      | Creator Authenticated | Verify creator profile opens from storage state   | Ensure logged-in creator can access profile page                | Creator storage state exists at `creatorStorageStatePath`                         | High     | auth, creator, profile, automation-candidate | Web UI    | 1      | Start test with creator storage state                            | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                 |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/profile`                                   | User remains outside `/login`; profile page or authenticated shell is visible                   |                                                        |
| AUT-005      | Creator Authenticated | Verify creator campaign submit route access       | Ensure logged-in creator can open protected campaign submission | Creator storage state exists and campaign `69e61d06a282a107c2d34ff0` is available | High     | auth, creator, campaign-submit               | Web UI    | 1      | Start test with creator storage state                            | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                 |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/campaigns/69e61d06a282a107c2d34ff0/submit` | User remains outside `/login`; submission, eligibility, or authenticated campaign state appears | Refine after submit-flow exploration                   |
