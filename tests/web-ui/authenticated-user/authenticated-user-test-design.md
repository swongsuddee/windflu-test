# Authenticated User Test Design

Source: prepared from `tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`
and Playwright global setup.

Implementation: `tests/web-ui/authenticated-user/authenticated-user.spec.ts`

Scope: authenticated creator and brand route access after Playwright global setup
has generated role-specific storage states.

Confidence level: 82%

## Assumptions

- Creator tests use `creatorStorageStatePath` from `playwright/auth-storage.ts`.
- Brand tests use `brandStorageStatePath` from `playwright/auth-storage.ts`.
- `playwright/global-setup.ts` has already generated the required storage state
  by using `WINDFLU_CREATOR_EMAIL` / `WINDFLU_CREATOR_PASSWORD` or
  `WINDFLU_BRAND_EMAIL` / `WINDFLU_BRAND_PASSWORD`.
- Authenticated tests should not store credentials, cookies, OTPs, or generated
  storage state files in Git.
- This design is ready for access and redirect checks. Detailed dashboard,
  work, payout, profile, campaign management, and submission assertions should
  be refined after a successful authenticated exploration pass with real storage
  states.

## Clarification Needed Before Full Detail Coverage

[Flow / Navigation]

- What is the expected default landing page after creator login?
- What is the expected default landing page after brand login?
- Should campaign submit open a submission form, onboarding requirement, or
  campaign participation state for logged-in creators?

[Business rules]

- Can creators access brand routes, and can brands access creator routes?
- Does brand dashboard access require account approval after login?
- Does creator campaign submit require profile completion or connected social
  accounts?

[Integration / backend behavior]

- Is there seeded creator data for my-work, payouts, and profile?
- Is there seeded brand data for campaign management and review flows?

## Test Coverage Estimation

Total: 8 prepared test cases

Breakdown:

- Creator authenticated access: 5
- Brand authenticated access: 3

Affected: 0
New: 8
Obsolete: 0

Reasoning:

- This avoids testing unknown dashboard details before authenticated exploration
  confirms real content.
- It is not too few because it covers every currently identified protected
  creator and brand route.
- It is not too many because role-crossing, seeded data, and status lifecycle
  assertions are deferred until business rules are confirmed.

## Prepared Test Cases

| Test Case ID | Module                | Summary                                           | Objective                                                          | Preconditions                                                                     | Priority | Labels                                       | Test Type | Step # | Test Step                                                             | Expected Result                                                                                 | Remarked                                               |
| ------------ | --------------------- | ------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- | -------- | -------------------------------------------- | --------- | ------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| AUT-001      | Creator Authenticated | Verify creator dashboard opens from storage state | Ensure a logged-in creator can access dashboard without login gate | Creator storage state exists at `creatorStorageStatePath`                         | High     | auth, creator, smoke, automation-candidate   | Web UI    | 1      | Start test with `test.use({ storageState: creatorStorageStatePath })` | Browser context uses authenticated creator storage state                                        | Prepared for global setup reuse                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/dashboard`                                      | User remains outside `/login`; creator dashboard or authenticated shell is visible              | Refine page assertions after authenticated exploration |
| AUT-002      | Creator Authenticated | Verify creator my-work opens from storage state   | Ensure logged-in creator can access work management                | Creator storage state exists at `creatorStorageStatePath`                         | High     | auth, creator, work, automation-candidate    | Web UI    | 1      | Start test with creator storage state                                 | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/my-work`                                        | User remains outside `/login`; my-work page or authenticated shell is visible                   | Refine page assertions after seeded work data is known |
| AUT-003      | Creator Authenticated | Verify creator payouts opens from storage state   | Ensure logged-in creator can access finance page                   | Creator storage state exists at `creatorStorageStatePath`                         | Medium   | auth, creator, payouts, automation-candidate | Web UI    | 1      | Start test with creator storage state                                 | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/payouts`                                        | User remains outside `/login`; payouts page or authenticated shell is visible                   | Refine assertions after payout seed data is known      |
| AUT-004      | Creator Authenticated | Verify creator profile opens from storage state   | Ensure logged-in creator can access profile page                   | Creator storage state exists at `creatorStorageStatePath`                         | High     | auth, creator, profile, automation-candidate | Web UI    | 1      | Start test with creator storage state                                 | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/profile`                                        | User remains outside `/login`; profile page or authenticated shell is visible                   |                                                        |
| AUT-005      | Creator Authenticated | Verify creator campaign submit route access       | Ensure logged-in creator can open protected campaign submission    | Creator storage state exists and campaign `69e61d06a282a107c2d34ff0` is available | High     | auth, creator, campaign-submit               | Web UI    | 1      | Start test with creator storage state                                 | Browser context is authenticated as creator                                                     |                                                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/creator/campaigns/69e61d06a282a107c2d34ff0/submit`      | User remains outside `/login`; submission, eligibility, or authenticated campaign state appears | Refine after submit-flow exploration                   |
| AUT-006      | Brand Authenticated   | Verify brand dashboard opens from storage state   | Ensure logged-in brand can access dashboard without login gate     | Brand storage state exists at `brandStorageStatePath`                             | High     | auth, brand, smoke, automation-candidate     | Web UI    | 1      | Start test with `test.use({ storageState: brandStorageStatePath })`   | Browser context uses authenticated brand storage state                                          | Prepared for global setup reuse                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/brand/dashboard`                                        | User remains outside `/brand/login`; brand dashboard or authenticated shell is visible          | Refine page assertions after authenticated exploration |
| AUT-007      | Brand Authenticated   | Verify brand campaigns opens from storage state   | Ensure logged-in brand can access campaign management              | Brand storage state exists at `brandStorageStatePath`                             | High     | auth, brand, campaigns, automation-candidate | Web UI    | 1      | Start test with brand storage state                                   | Browser context is authenticated as brand                                                       |                                                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/brand/campaigns`                                        | User remains outside `/brand/login`; campaign management or authenticated shell is visible      | Refine after brand campaign seed data is known         |
| AUT-008      | Brand Authenticated   | Verify brand profile opens from storage state     | Ensure logged-in brand can access profile/settings                 | Brand storage state exists at `brandStorageStatePath`                             | Medium   | auth, brand, profile, automation-candidate   | Web UI    | 1      | Start test with brand storage state                                   | Browser context is authenticated as brand                                                       |                                                        |
|              |                       |                                                   |                                                                    |                                                                                   |          |                                              |           | 2      | Navigate to `/brand/profile`                                          | User remains outside `/brand/login`; brand profile or authenticated shell is visible            |                                                        |
