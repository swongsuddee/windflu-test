# Hot Cache

Last updated: 2026-04-25

## Project Purpose

Playwright test project for Windflu web UI/API testing against `https://www.windflu.com`.

## Must Read

- Root instructions: `AGENTS.md`
- Orchestrator skill: `.agents/skills/agent-workflow-orchestrator/SKILL.md`
- Commit/push policy:
  `.agents/skills/agent-workflow-orchestrator/COMMIT_POLICY.md`
- Hot cache: `.agents/cache/hot-cache.md`
- Prompt activity log:
  `.agents/cache/prompt-activity-log.md` only when hot cache is missing and
  recent context must be reconstructed

## Current Structure

- Config: `playwright.config.ts`
- Reusable agent-config export:
  `exports/project-agent-config/` and `exports/project-agent-config.zip`
- Project-local vendored skills:
  `.agents/skills/website-exploration-flow/`,
  `.agents/skills/test-design-zephyr/`,
  `.agents/skills/playwright-skill/`, and
  `.agents/skills/skill-creator/`
- Agent provider selector:
  `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
- Git remote: `origin https://github.com/swongsuddee/windflu-test.git`
- Playwright auth setup test: `src/test/web-ui/login.setup.ts`
- Playwright auth storage constants: `playwright/auth-storage.ts`
- Creator login POM: `src/page/creator-login-page.ts`
- Web UI feature tests/designs: `src/test/web-ui/<feature>/*.spec.ts` and
  `src/test/web-ui/<feature>/*-test-design.md`
- Page objects: `src/page/*.ts`
- Test data: `src/test-data/*`
- Registered account registry: `src/test-data/registered-accounts.md`
- Mocked authenticated dashboard POM: `src/page/authenticated-dashboard-page.ts`
- Mocked dashboard data: `src/test-data/dashboard-mock-data.ts`
- Incident log for developer fix and QA retest:
  `.agents/review-notes/incident-log.md`
- Authenticated exploration note:
  `.agents/review-notes/authenticated-exploration-note.md`
- Authenticated user test design:
  `src/test/web-ui/authenticated-user/authenticated-user-test-design.md`
- Standalone exploration diagrams: `src/test-design/*.md`
- Latest unauthenticated exploration:
  `src/test-design/exploration-unauthenticated-user-actions.md`
- Register exploration splits:
  `src/test-design/exploration-brand-register-flow.md` and
  `src/test-design/exploration-creator-register-flow.md`
- Homepage lead-form exploration:
  `src/test-design/exploration-homepage-brand-lead-form.md`
- Campaign-detail exploration:
  `src/test-design/exploration-campaign-detail.md`
- Authenticated exploration:
  `src/test-design/exploration-authenticated-user-actions.md`

## Existing Global Skills Used By Project

- `website-exploration-flow`: website exploration and Mermaid flow/state diagrams before test design
- `test-design-zephyr`: Zephyr-compatible test design
- `playwright-skill`: Playwright implementation patterns
- `skill-creator`: skill creation/update workflow

These four skills are now also vendored into `.agents/skills/` so the project
does not depend only on the local Codex skill store.

## Current Test Coverage

Unauthenticated public web UI coverage is split by flow:

- Homepage and brand lead form
- Login and forgot-password
- Register
- Creator campaigns
- Campaign detail
- Legal policy pages

Authenticated dashboard coverage is implemented for:

- Creator dashboard (`AUT-001`)

## Recent Changes

- 2026-04-25: Re-explored creator registration and raised
  `src/test-design/exploration-creator-register-flow.md` from draft to
  high-confidence status. Confirmed the live 3-step flow
  `Account -> Social -> Personal`, the custom legal-acceptance button, social
  step validation requiring at least one connected account, and blank personal
  step validation for first name, last name, display name, and phone.
- 2026-04-25: Fixed the local Node 18 install warning by aligning the lint
  toolchain to Node 18-compatible versions: pinned `typescript-eslint` to
  `8.44.1` and downgraded `typescript` to `5.9.3`, then refreshed
  `package-lock.json`.
- 2026-04-25: Split homepage unauthenticated navigation coverage into
  single-purpose cases so each case validates one outcome only:
  `PUB-002` brand link, `PUB-030` campaigns link, and `PUB-031` logo-home
  link. Updated the matching homepage test-design file and revalidated the
  homepage suite.
- 2026-04-25: Regrouped unauthenticated Web UI implementation to match the
  latest exploration split and current live site behavior. Updated homepage,
  brand lead, creator campaigns, campaign detail, and legal policy coverage;
  refreshed related POM selectors; and synced the matching test-design and
  exploration docs.
- 2026-04-25: Added incident `INC-003` to track privacy/terms content as an
  in-progress implementation area until the user confirms it is ready.
- 2026-04-25: Applied clarified unauthenticated expectations, split homepage
  brand lead-form behavior into its own exploration file, and raised the
  unauthenticated exploration confidence to a final state.
- 2026-04-25: Split campaign-detail exploration out of the unauthenticated
  master document into `src/test-design/exploration-campaign-detail.md`.
- 2026-04-25: Tightened the website exploration policy so final exploration
  output must have confidence greater than 95%, and lower-confidence cases must
  ask the user for clarification before finalization.
- 2026-04-25: Renamed standalone exploration docs to the `exploration-...`
  convention, broadened the unauthenticated exploration scope, and split
  brand/creator registration details into dedicated exploration files.
- 2026-04-25: Created commit `aa9fc83`
  `chore(project): migrate tests to src and vendor agent skills`; one follow-up
  commit remains for `playwright.config.ts` before push.
- 2026-04-25: Reviewed the full repo diff, ran `npm run lint` and
  `npm run format:check`, and prepared the current project-wide restructure and
  agent-config changes for commit/push on `main`.
- Updated `AGENTS.md`,
  `.agents/skills/agent-workflow-orchestrator/SKILL.md`, and
  `.agents/cache/prompt-activity-log.md` so the prompt activity log is no
  longer mandatory startup reading and is used mainly for append-only logging,
  with fallback reading only when `hot-cache.md` is missing.
- Synced the same prompt-log behavior into
  `exports/project-agent-config/` and rebuilt
  `exports/project-agent-config.zip`.
- The active provider selector in
  `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
  is now set to `claude`.
- Verified that provider switching changes the selected provider template, but
  the orchestrator workflow and project-local skill behavior remain the same.
- Vendored the shared skills `website-exploration-flow`,
  `test-design-zephyr`, `playwright-skill`, and `skill-creator` into
  `.agents/skills/` for project-local reuse.
- Updated `exports/project-agent-config/` and
  `exports/project-agent-config.zip` so the reusable project-agent bundle now
  includes those four vendored skills.
- Added reusable export bundle at `exports/project-agent-config/` containing
  `AGENTS.md`, the `agent-workflow-orchestrator` skill, provider selector
  files, and starter `.agents/cache` templates for reuse in other projects.
- Created archive `exports/project-agent-config.zip` from the reusable export
  bundle and verified its contents with `unzip -l`.
- Implemented `REG-VAL-001` in
  `src/test/web-ui/register-flow/register-flow.spec.ts` for the real public
  brand registration success flow.
- Expanded `src/page/brand-register-page.ts` with step-2 brand profile and
  policy acceptance interactions.
- Added valid registration data builders to `src/test-data/register-test-data.ts`.
- Added feature-local account log writer
  `src/test/web-ui/services/register-success-account-log-service.ts` to append
  successful registrations to
  `src/test/web-ui/register-flow/register-success-accounts.md`.
- Updated `src/test/web-ui/register-flow/register-success-test-design.md` with
  the observed real step-2 controls and blocker evidence.
- Logged incident `INC-002` because the live public brand registration success
  flow still fails after the visible policy acceptance path.
- Added valid registration success-flow design
  `src/test/web-ui/register-flow/register-success-test-design.md`.
- Added or updated feature-local successful registration registry
  `src/test/web-ui/register-flow/register-success-accounts.md` for accounts
  created by the valid register flow without storing raw passwords.
- Removed brand authenticated credential and storage-state support because brand
  registration and reusable brand accounts are not available yet.
- Reduced authenticated coverage and design scope to creator-only.
- Updated local `.env` creator credentials to
  `jojoetest20260423212848@example.com` for authenticated reuse.
- Added the registered creator account entry to
  `src/test-data/registered-accounts.md` without storing the raw password.
- Updated `src/test/web-ui/login.setup.ts` to use page objects for creator and
  login steps instead of inline selectors.
- Added `src/page/creator-login-page.ts` for creator login interactions.
- Renamed authenticated storage output to:
  `playwright/.auth/creator-storage.json`.
- Updated `.gitignore` and `playwright/auth-storage.ts` to the new storage
  filename.
- Updated `src/test/web-ui/login.setup.ts` so auth setup now reports
  `created`, `reused`, or `missing_credentials` per role instead of silently
  doing nothing when credentials are absent.
- Updated `playwright.config.ts` so `web-ui-unauthenticated` no longer depends
  on `global-setup`.
- Added helper functions to
  `src/test/web-ui/services/auth-storage-state-service.ts` for future auth
  storage-state reuse.
- Added `src/test/web-ui/authenticated-user/authenticated-user.spec.ts` with
  mock-based dashboard coverage for creator and brand dashboard routes.
- Added `src/page/authenticated-dashboard-page.ts` to host the authenticated
  dashboard mock harness and assertions.
- Added `src/test-data/dashboard-mock-data.ts` for creator and brand dashboard
  response fixtures.
- Updated `src/test/web-ui/authenticated-user/authenticated-user-test-design.md`
  so the dashboard cases reflect the current mocked implementation.
- Moved feature test-design files back beside their matching specs under
  `src/test/web-ui/<feature>/`.
- Restructured the test workspace under `src/`:
  `src/test/api`, `src/test/web-ui`, `src/test-design`, `src/test-data`, and
  `src/page`.
- Kept standalone exploration diagrams in `src/test-design/`.
- Updated Playwright config, imports, docs, and project metadata to the current
  `src/` paths.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` with Mermaid
  diagram rules so route placeholders like `:id` are rewritten to Mermaid-safe
  forms such as `{id}` in diagrams.
- Rewrote `tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`
  so it is authenticated-only and no longer mixes guest redirect evidence into
  authenticated coverage design.
- Replaced the old `playwright/global-setup.ts` path with project-based setup in
  `tests/web-ui/login.setup.ts`.
- Split the Playwright web UI project into `web-ui-unauthenticated` and
  `web-ui-authenticated`.
- Updated `playwright.config.ts` so both web UI projects preserve
  `localStorage.isDev=true` via `playwright/.auth/windflu-dev-storage.json`.
- Added env-backed login credential helpers in
  `tests/web-ui/test-data/login-test-data.ts` for creator and brand auth setup.
- Updated `package.json` with `test:web:unauthenticated` and
  `test:web:authenticated` scripts.
- Updated `README.md` and authenticated design docs to point at
  `tests/web-ui/login.setup.ts`.
- Initialized this folder as a Git repository on branch `main`.
- Added Git remote `origin` pointing to
  `https://github.com/swongsuddee/windflu-test.git`.
- Added `.agents/skills/agent-workflow-orchestrator/COMMIT_POLICY.md` with
  workflow, safety rules, commit message format, and push rules.
- Updated `AGENTS.md` so Git-related tasks must read the orchestrator commit
  policy.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` with explicit
  Git workflow steps for inspect -> validate -> commit -> push -> memory update.
- Created and pushed initial commit `beea295`:
  `chore(repo): bootstrap windflu test workspace`.
- Updated `AGENTS.md` to support provider switching by requiring agents to read
  `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
  before using the orchestrator skill.
- Added provider-switching support to the orchestrator skill.
- Added `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
  as the file-based provider selector.
- Added provider templates for OpenAI, Gemini, and Claude under
  `.agents/skills/agent-workflow-orchestrator/agents/`.
- Updated the orchestrator skill instructions so all providers follow the same
  hot-cache -> skill-chain -> validation -> memory-update workflow.
- Completed cleanup pass across feature test designs and agent metadata.
- Updated test-design wording so implemented behavior no longer says "confirm
  during implementation" where coverage already exists.
- Added `tests/web-ui/authenticated-user/authenticated-user-test-design.md`
  prepared for global-setup-based authenticated coverage.
- Updated `tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`
  to distinguish guest-state redirect evidence from authenticated-state
  expectations.
- Added `.agents/review-notes/authenticated-exploration-note.md` to track that
  real authenticated exploration is blocked until role storage states are
  generated by global setup.
- Renamed legal policy feature files from `tests/web-ui/legal-error/` to
  `tests/web-ui/legal-policy/` so the folder, spec, and test-design names match
  the focused policy test scope.
- Removed `tests/web-ui/review-notes/observed-behavior-review.md`.
- Moved incident/review note storage to `.agents/review-notes/incident-log.md`.
- Removed empty `tests/web-ui/review-notes` folder.
- Updated the orchestrator skill so incidents live under `.agents/review-notes`
  and stay out of active product tests until fixed.
- Removed `/contact` 404 incident assertions from active homepage and legal
  policy specs/test designs.
- Updated `tests/web-ui/legal-policy/legal-policy-test-design.md` so `PUB-028`
  focuses only on policy tabs.
- Updated `tests/web-ui/homepage-unauthenticated/homepage-unauthenticated-test-design.md`
  so `PUB-005` focuses only on footer legal links.
- Kept `/contact` 404 tracking only in incident `INC-001`.
- Updated `eslint.config.js` to recognize policy page assertion helper methods.
- Added incident log at `.agents/review-notes/incident-log.md` for
  product errors that need developer fix and QA retest.
- Moved `/contact` 404 issue from observed behavior review into incident
  `INC-001`.
- Updated `tests/web-ui/legal-policy/legal-policy-test-design.md` to reference
  incident `INC-001`.
- Updated observed behavior review file to reserve that file for unclear
  behavior and point fix/retest issues to the incident log.
- Reorganized web UI specs and matching test-design Markdown files into
  colocated feature folders under `tests/web-ui/<feature>/`.
- Updated spec imports after moving files one level deeper.
- Updated the project orchestrator skill to keep feature specs and matching
  test designs together, with `tests/web-ui/test-designs` reserved for
  standalone exploration diagrams.
- Added Playwright global setup to generate reusable authenticated creator and
  brand storage states from environment-provided credentials.
- Added ignored auth state outputs:
  `playwright/.auth/windflu-creator-storage.json` and
  `playwright/.auth/windflu-brand-storage.json`.
- Updated `README.md` with authenticated storage setup usage.
- Explored authenticated/protected route boundaries and saved
  `tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`.
- Confirmed current Playwright storage state is guest-only and protected creator
  routes redirect to `/login?next=...` while protected brand routes redirect to
  `/brand/login?next=...`.
- Added `tests/web-ui/test-data/registered-accounts.md` to record created test accounts without storing passwords or secrets.
- Re-explored Windflu public website and saved diagrams to `tests/web-ui/test-designs/website-exploration-flow-diagrams.md`.
- Added Mermaid navigation flow, creator registration state diagram, and campaign work lifecycle state diagram.
- Current exploration observed privacy policy `V1.0.6` dated `23 เมษายน 2569`, visible creator `/register`, and `/contact` still returning 404.
- Added analytics fields to `.agents/cache/prompt-activity-log.md`: skills/tools used, token usage, and reasoning summary / decision trace.

## Active Assumptions

- The user wants a portable starter bundle for project agent and skill
  configuration, not a full repository export.
- Reusable starter cache/log templates are more appropriate than copying the
  current project-specific hot cache and prompt history into another repo.
- Vendored project-local copies of the four shared skills should include only
  useful skill assets, excluding local-only metadata such as `.git` internals
  and `.DS_Store`.
- Claude should follow the same project workflow as OpenAI and Gemini because
  provider switching is template-based and the orchestrator skill defines the
  shared process.
- The hot cache remains the primary startup context source; the prompt activity
  log is now a write-first audit trail and fallback source only.
- Exploration outputs with confidence at or below 95% are now considered
  incomplete and must trigger clarification rather than being treated as final.
- Unauthenticated users should not be able to access creator-session-only areas
  such as dashboard, my-work, payouts, profile, or submit flows.
- Terms/privacy content and `/contact` remain in-progress implementation areas
  and should stay out of stable detailed assertions until the user confirms
  completion.
- Legal policy implementation readiness is tracked in incident `INC-003`.
- Baseline unauthenticated coverage should follow the current live public
  contract: homepage CTA text `สำหรับแบรนด์ที่อยากไวรัล`, campaign listing
  empty state, unavailable campaign detail, and `/creator/*` guest redirects to
  `/login?next=...`.

## Validation Status

- `npx prettier --write src/test-design/exploration-creator-register-flow.md`
  passed on 2026-04-25 after the live creator-registration exploration update.
- `npm run format:check` passed on 2026-04-25 after the
  creator-registration exploration update.
- `npm run lint` passed on 2026-04-25 after the creator-registration
  exploration update.
- `npm install` passed on 2026-04-25 after pinning Node 18-compatible
  TypeScript lint dependencies.
- `npm i --save-dev @types/node` passed on 2026-04-25 without the prior
  `EBADENGINE` warning.
- `npm run lint` passed on 2026-04-25 after the dependency alignment update.
- `npm run format:check` passed on 2026-04-25 after the dependency alignment
  update.
- `npx playwright test --project=web-ui-unauthenticated src/test/web-ui/homepage-unauthenticated/homepage-unauthenticated.spec.ts`
  passed on 2026-04-25 with `6 passed` after splitting homepage navigation into
  single-purpose cases.
- `npm run format:check` passed on 2026-04-25 after the unauthenticated test
  regrouping and live-site alignment update.
- `npm run lint` passed on 2026-04-25 after the unauthenticated test
  regrouping and live-site alignment update.
- `npx playwright test --project=web-ui-unauthenticated src/test/web-ui/homepage-unauthenticated/homepage-unauthenticated.spec.ts src/test/web-ui/homepage-brand-lead/homepage-brand-lead.spec.ts src/test/web-ui/creator-campaigns/creator-campaigns.spec.ts src/test/web-ui/campaign-detail/campaign-detail.spec.ts src/test/web-ui/legal-policy/legal-policy.spec.ts`
  passed on 2026-04-25 with `24 passed`.
- `npx prettier --write .agents/review-notes/incident-log.md` passed on
  2026-04-25 after adding `INC-003`.
- `npm run format:check` passed on 2026-04-25 after the `INC-003` incident-log
  update.
- `npm run lint` passed on 2026-04-25 after the `INC-003` incident-log update.
- `npx prettier --write src/test-design/exploration-unauthenticated-user-actions.md src/test-design/exploration-homepage-brand-lead-form.md src/test-design/exploration-campaign-detail.md`
  passed on 2026-04-25.
- `npx prettier --write .agents/review-notes/incident-log.md` passed on
  2026-04-25 after elevated file-permission access.
- `npm run format:check` passed on 2026-04-25 after the clarified
  unauthenticated-flow update.
- `npm run lint` passed on 2026-04-25 after the clarified unauthenticated-flow
  update.
- `npx prettier --write src/test-design/exploration-campaign-detail.md src/test-design/exploration-unauthenticated-user-actions.md`
  passed on 2026-04-25.
- `npm run format:check` passed on 2026-04-25 after the campaign-detail
  exploration split.
- `npm run lint` passed on 2026-04-25 after the campaign-detail exploration
  split.
- `npm run format:check` passed on 2026-04-25 after the exploration-confidence
  policy update.
- `npm run lint` passed on 2026-04-25 after the exploration-confidence policy
  update.
- `npx prettier --write src/test-design/exploration-authenticated-user-actions.md src/test-design/exploration-brand-register-flow.md src/test-design/exploration-creator-register-flow.md src/test-design/exploration-unauthenticated-user-actions.md`
  passed on 2026-04-25.
- `npm run lint` passed on 2026-04-25 after the exploration-doc rename/split
  update.
- `npm run lint` passed again on 2026-04-25 before the follow-up config commit.
- `npm run format:check` passed again on 2026-04-25 before the follow-up
  config commit.
- `npm run lint` passed on 2026-04-25.
- `npm run format` passed on 2026-04-25 after escalating file permissions for
  vendored `.agents/skills/*` files.
- `npm run format:check` passed on 2026-04-25.
- `cp AGENTS.md exports/project-agent-config/AGENTS.md` and matching syncs for
  orchestrator `SKILL.md` and prompt-log template completed successfully.
- `(cd exports && zip -r project-agent-config.zip project-agent-config)` passed
  after syncing the updated prompt-log behavior into the export bundle.
- `sed -n '1,220p' .agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
  confirmed `active_provider: claude`.
- Reviewed `.agents/skills/agent-workflow-orchestrator/SKILL.md` and the
  provider YAML files to confirm provider switching does not alter the shared
  project workflow.
- `find .agents/skills -maxdepth 3 -type f | sort` confirmed the four vendored
  skill trees under `.agents/skills/`.
- `zipinfo -1 exports/project-agent-config.zip | sort` confirmed the export
  bundle now includes the vendored skill directories and files.
- `(cd exports && zip -r project-agent-config.zip project-agent-config)` passed.
- `du -h exports/project-agent-config.zip` reported archive size `56K`.

## Known Caveats

- The exported `AGENTS.md` and orchestrator skill are workflow-ready, but the
  target project should still update the hot cache starter content and any
  project-specific wording after copying them in.
- `playwright-skill` was vendored without its local `.git` directory or
  `.DS_Store`, because those are not part of the reusable skill behavior.

## Next Useful Action

- Copy `exports/project-agent-config.zip` into the target repository and tailor
  the starter cache entries and any project-specific instructions there, or
  update project docs to explicitly point contributors at the vendored
  `.agents/skills/*` copies.
- Updated `AGENTS.md` and `.agents/skills/agent-workflow-orchestrator/SKILL.md` to require analytics fields in future activity log entries.
- Added project-scoped orchestrator skill under `.agents/skills/agent-workflow-orchestrator`.
- Added `AGENTS.md` with project agent instructions.
- Added this hot cache and made it the required first-read project memory file.
- Manually formatted `.agents/skills/agent-workflow-orchestrator/agents/openai.yaml` after Prettier hit an `EPERM` write error on that single file.
- Added `.agents/cache/prompt-activity-log.md` to record user prompt summaries, actions, results, and validation status.
- Updated `AGENTS.md` and `.agents/skills/agent-workflow-orchestrator/SKILL.md` to require prompt activity logging.

## Validation Status

- `npm run lint` passed
- `npm run format:check` passed
- `npx playwright test --project=global-setup` now covers creator setup only.
- `npx playwright test --project=web-ui-authenticated src/test/web-ui/authenticated-user/authenticated-user.spec.ts`
  passed with 3 tests after running outside the sandbox.
- Feature design re-colocation validated with formatting and lint checks.
- `src/` test-directory migration validated with formatting and lint checks.
- Mermaid-rule update validated with formatting and lint checks.
- Authenticated exploration design rewrite validated with formatting and lint
  checks.
- `npx playwright test --project=global-setup` passed after running outside the
  sandbox.
- `npx playwright test --project=web-ui-unauthenticated tests/web-ui/login-flow/login-flow.spec.ts`
  passed with 5 tests after running outside the sandbox.
- Git bootstrap and commit-policy update validated with formatting and lint
  checks.
- `AGENTS.md` provider-switching update validated with formatting and lint checks.
- `npm run test:web` passed with 28 tests after the full cleanup pass.
- `npx playwright test tests/web-ui/legal-policy tests/web-ui/homepage-unauthenticated`
  passed with 12 tests after removing `/contact` incident assertions from active
  coverage.
- Incident log creation validated with formatting and lint checks.
- `npm run test:web` passed with 28 tests after colocating specs and designs in
  feature folders.
- `npm run test:web` passed with 28 tests after adding Playwright global setup.
- Authenticated exploration diagram document validated with formatting and lint checks.
- Registered account registry creation validated with lint and formatting checks.
- Website exploration diagram document validated with formatting and lint checks.
- Activity analytics logging update validated with formatting and lint checks.
- Prompt activity log creation validated with formatting and lint checks.
- Latest known full web validation before orchestrator files: `npm run test:web` passed with 28 tests

## Caveats

- Do not store real credentials or secrets in `.agents/cache/hot-cache.md`.
- Do not store real credentials or secrets in `.agents/cache/prompt-activity-log.md`.
- Do not store real passwords, OTPs, cookies, auth tokens, recovery links, or private personal data in `src/test-data/registered-accounts.md`.
- Token usage can be logged only when exposed by the runtime; otherwise use `Not available in this interface`.
- Do not log hidden chain-of-thought; use concise reasoning summaries / decision traces.
- Public site uses `playwright/.auth/windflu-dev-storage.json` with `localStorage.isDev=true`; it is not an authenticated cookie state.
- Authenticated creator internals still require safe creator credentials in
  `WINDFLU_CREATOR_EMAIL` / `WINDFLU_CREATOR_PASSWORD` before
  `src/test/web-ui/login.setup.ts` can create creator storage state.
- Current authenticated dashboard assertions use a mock document/API harness,
  not live backend data, because backend state is not controllable in this
  environment.
- In the current workspace run, `login.setup.ts` is not broken; it reports
  `missing_credentials` because no `WINDFLU_CREATOR_*` or `WINDFLU_BRAND_*`
  environment variables were provided and no role storage files already exist.
- Authenticated storage files are intentionally ignored by Git and must not be
  committed.
- Push to GitHub still depends on the local environment having permission to
  authenticate to `https://github.com/swongsuddee/windflu-test.git`.
- When behavior appears to be an error requiring developer fix and QA retest,
  add it to `.agents/review-notes/incident-log.md`, reference the incident
  ID from relevant context, keep it out of active product tests until fixed,
  retest after the fix, then remove the active row after recording closure in
  the resolution log.

## Next Useful Action

Provide safe creator credentials through environment variables so
`src/test/web-ui/login.setup.ts` can create authenticated storage states, then
continue with real authenticated exploration and replace the mocked dashboard
harness with live authenticated assertions where data contracts are stable.
Review `INC-001` in
`.agents/review-notes/incident-log.md`, assign developer fix ownership, then
retest `/contact` and remove the active incident after recording closure. For
new web UI coverage, create a feature folder under `src/test/web-ui/<feature>/`
and keep `<feature>.spec.ts` beside `<feature>-test-design.md`. If tests create
accounts, append sanitized details to `src/test-data/registered-accounts.md`.
Run `npm run format:check` and `npm run lint` after editing project files. Run
targeted Playwright tests when test code changes. Append task results to
`.agents/cache/prompt-activity-log.md`.
