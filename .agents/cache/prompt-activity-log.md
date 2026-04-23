# Prompt Activity Log

Purpose: durable project log of user prompts, agent actions, and results.

Rules:

- Append one entry for each user task that changes project files or project agent instructions.
- Do not store secrets, real passwords, tokens, cookies, OTPs, or private personal data.
- Do not store hidden chain-of-thought; use a concise reasoning summary / decision trace instead.
- Record token usage only when exposed by the runtime. If token totals are not available, write `Not available in this interface`.
- Summarize prompts and results; do not paste large raw outputs.
- Keep newest entries at the top.

Entry template:

```markdown
## YYYY-MM-DD - Short Title

Prompt summary:

- ...

Skills/tools used:

- ...

Actions:

- ...

Result:

- ...

Validation:

- ...

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- ...
```

## 2026-04-24 - Bootstrap Git And Add Commit Policy

Prompt summary:

- User requested integrating and pushing the project to
  `https://github.com/swongsuddee/windflu-test.git`, updating the agent
  workflow for commit and push, and writing the agent policy for commit code
  format.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file editing.
- Git CLI.
- Validation commands: `npm run format:check`, `npm run lint`.

Actions:

- Added `.agents/skills/agent-workflow-orchestrator/COMMIT_POLICY.md` with
  commit workflow, push rules, safety rules, and commit message format.
- Updated `AGENTS.md` to require the commit policy for Git-related tasks.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` with explicit
  Git workflow steps.
- Initialized the folder as a Git repository on branch `main`.
- Added Git remote `origin` pointing to
  `https://github.com/swongsuddee/windflu-test.git`.
- Updated `.agents/cache/hot-cache.md`.

Result:

- The project now has an internal commit/push policy, a bootstrapped Git
  repository, initial commit `beea295`, and `origin/main` tracking the GitHub
  remote.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.
- `git push -u origin main` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- Repository integration should be documented before the first commit so future
  agent runs use one consistent policy for staging, commit messages, validation,
  and push behavior.

## 2026-04-23 - Make AGENTS Provider-Aware

Prompt summary:

- User requested updating `AGENTS.md` to support agent switching.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file editing and validation commands.

Actions:

- Updated `AGENTS.md` to require reading
  `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
  before using the orchestrator skill.
- Added concise provider-switching notes for OpenAI, Gemini, and Claude.
- Updated `.agents/cache/hot-cache.md`.

Result:

- Repo-level agent instructions now explicitly support the provider selector and
  keep one shared orchestrator workflow across providers.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- `AGENTS.md` should stay minimal and repo-wide, but it needs to point every
  agent at the active provider selector so switching works consistently.

## 2026-04-23 - Add Provider Switching To Orchestrator

Prompt summary:

- User requested updating the agent skill to support agent switching and
  preparing a portal for other AIs such as Gemini or Claude while preserving the
  current workflow steps.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file editing and validation commands.

Actions:

- Added `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
  as the provider selector.
- Added provider templates:
  `.agents/skills/agent-workflow-orchestrator/agents/openai.yaml`,
  `.agents/skills/agent-workflow-orchestrator/agents/gemini.yaml`, and
  `.agents/skills/agent-workflow-orchestrator/agents/claude.yaml`.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` with provider
  switching rules and shared workflow responsibilities.
- Updated `.agents/cache/hot-cache.md`.

Result:

- The orchestrator now has a file-based provider-switching portal and provider
  templates for OpenAI, Gemini, and Claude.
- All providers are documented to follow the same project workflow.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- The cleanest way to support multiple providers here is a provider registry and
  active selector that preserves one orchestration workflow instead of
  duplicating skill logic per AI.

## 2026-04-23 - Full Cleanup Pass

Prompt summary:

- User requested the full cleanup pass across existing test designs, specs, and
  agent metadata.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file inspection/edit commands.
- Playwright test runner.

Actions:

- Cleaned remaining implemented-behavior remarks in feature test designs.
- Added `tests/web-ui/authenticated-user/authenticated-user-test-design.md`
  prepared for global-setup authenticated coverage.
- Updated `tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`
  so guest redirect evidence is clearly separated from authenticated-state
  expectations.
- Updated `.agents/cache/hot-cache.md` with the current artifact layout and
  validation state.

Result:

- Active unauthenticated designs now align with implemented specs.
- Authenticated coverage now has a prepared test design that assumes storage
  state generated by global setup, while still documenting the current blocker.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.
- `npm run test:web` passed with 28 tests.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- The cleanup pass focused on current truth: implemented public behavior should
  be reflected directly in feature designs, and authenticated work should be
  framed around the existing global-setup storage-state flow rather than guest
  redirects.

## 2026-04-23 - Rename Legal Policy Feature

Prompt summary:

- User requested renaming `legal-error-test-design.md` to better relate to the
  current test scope.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file move/edit commands.
- Playwright test runner.

Actions:

- Renamed `tests/web-ui/legal-error/legal-error.spec.ts` to
  `tests/web-ui/legal-policy/legal-policy.spec.ts`.
- Renamed `tests/web-ui/legal-error/legal-error-test-design.md` to
  `tests/web-ui/legal-policy/legal-policy-test-design.md`.
- Removed the empty `tests/web-ui/legal-error/` folder.
- Updated the test-design implementation path.
- Updated `.agents/cache/hot-cache.md`.

Result:

- The legal policy feature folder, spec, and test-design names now match the
  current policy-only test scope.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- The old `legal-error` name implied active error-page coverage, but the
  incident was removed from active tests. The feature is now accurately named
  `legal-policy`.

## 2026-04-23 - Authenticated Exploration Blocked Without Storage State

Prompt summary:

- User requested re-running authenticated exploration without using guest state.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local filesystem inspection and file edits.

Actions:

- Checked `playwright/.auth/` and confirmed only `windflu-dev-storage.json`
  exists; role storage states are missing.
- Added `.agents/review-notes/authenticated-exploration-note.md` documenting the
  blocker and the required env vars for global setup to generate storage states.
- Updated `tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`
  with a clear "Real Authenticated Exploration Status" section.
- Updated `.agents/cache/hot-cache.md`.

Result:

- Authenticated exploration is explicitly blocked until
  `windflu-creator-storage.json` and/or `windflu-brand-storage.json` exist.

Validation:

- Pending final validation in this entry's task turn.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- A real logged-in exploration requires a valid authenticated storage state; in
  this workspace only the guest state exists, so the correct next step is to
  generate role states via global setup rather than re-running guest exploration.

## 2026-04-23 - Move Review Notes To Agents Folder

Prompt summary:

- User requested removing the observed behavior review file and moving review
  notes to the `.agents` folder.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file move/delete/edit commands.

Actions:

- Created `.agents/review-notes/`.
- Moved `incident-log.md` from `tests/web-ui/review-notes/` to
  `.agents/review-notes/incident-log.md`.
- Deleted `tests/web-ui/review-notes/observed-behavior-review.md`.
- Removed the empty `tests/web-ui/review-notes/` folder.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` and
  `.agents/cache/hot-cache.md` with the new incident log path and rule.

Result:

- Agent-facing incident review notes now live under `.agents/review-notes/`.
- The obsolete observed behavior review file is removed.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- Incident tracking is agent workflow metadata rather than feature test content,
  so keeping it under `.agents` makes the ownership clearer and avoids mixing
  active test artifacts with fix/retest queues.

## 2026-04-23 - Remove Incident Assertions From Active Tests

Prompt summary:

- User requested updating cases like `/contact` 404 so active test designs/specs
  do not verify known incidents; the legal policy test should focus only on
  policy verification.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file editing and validation commands.
- Playwright test runner.

Actions:

- Updated `tests/web-ui/legal-error/legal-error-test-design.md` so `PUB-028`
  verifies only privacy and terms policy tabs.
- Updated `tests/web-ui/legal-error/legal-error.spec.ts` to remove `/contact`
  navigation and 404 assertions.
- Updated `tests/web-ui/homepage-unauthenticated/homepage-unauthenticated-test-design.md`
  so `PUB-005` verifies only footer legal links.
- Updated `tests/web-ui/homepage-unauthenticated/homepage-unauthenticated.spec.ts`
  to remove footer contact 404 assertions.
- Removed now-unused contact/404 helpers from `HomePage` and `PolicyPage`.
- Updated `tests/web-ui/review-notes/incident-log.md` notes for `INC-001`.
- Updated `eslint.config.js` to recognize policy page assertion helpers.
- Updated `.agents/cache/hot-cache.md`.

Result:

- `/contact` 404 is no longer part of active automated test coverage or feature
  test-design steps.
- The issue remains tracked only as active incident `INC-001` for developer fix
  and QA retest.

Validation:

- `npx prettier --write` completed for the changed files.
- `npm run format:check` passed.
- `npm run lint` passed.
- `npx playwright test tests/web-ui/legal-error tests/web-ui/homepage-unauthenticated`
  passed with 12 tests.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- Known product incidents should not be asserted as expected behavior in active
  tests. The active tests now cover intended policy behavior, while `INC-001`
  preserves the defect lifecycle until fixed and retested.

## 2026-04-23 - Add Incident Log For Fix And Retest

Prompt summary:

- User requested separating error/incident items into a new file for review and
  developer fix, with incidents retested and removed after they are fixed.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file editing and validation commands.

Actions:

- Added `tests/web-ui/review-notes/incident-log.md`.
- Moved the `/contact` 404 issue into active incident `INC-001`.
- Updated `tests/web-ui/legal-error/legal-error-test-design.md` to reference
  `INC-001`.
- Updated `tests/web-ui/review-notes/observed-behavior-review.md` so it points
  fix/retest issues to the incident log.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` and
  `.agents/cache/hot-cache.md` with incident lifecycle rules.

Result:

- Product errors now have a dedicated incident log with fix owner, fix status,
  retest status, and resolution log fields.
- `INC-001` is the active incident for `/contact` returning 404.

Validation:

- `npx prettier --write tests/web-ui/review-notes/incident-log.md tests/web-ui/review-notes/observed-behavior-review.md tests/web-ui/legal-error/legal-error-test-design.md .agents/skills/agent-workflow-orchestrator/SKILL.md`
  completed.
- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- Incidents need a stronger lifecycle than generic review notes, so fix/retest
  items are tracked separately and can be removed from active incidents only
  after closure is recorded.

## 2026-04-23 - Add Observed Behavior Review Queue

Prompt summary:

- User requested a separate review file for cases where observed behavior seems
  like it may not be intended, using the `/contact` 404 test-design row as the
  example.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file editing and validation commands.

Actions:

- Added `tests/web-ui/review-notes/observed-behavior-review.md`.
- Created review item `QA-OBS-001` for `/contact` returning 404 from the footer
  contact link.
- Updated `tests/web-ui/legal-error/legal-error-test-design.md` to reference
  `QA-OBS-001`.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` and
  `.agents/cache/hot-cache.md` with the observed-behavior review rule.

Result:

- Questionable observed behavior now has a dedicated review queue for the user
  and future agents before it is accepted as intended behavior.

Validation:

- `npx prettier --write tests/web-ui/review-notes/observed-behavior-review.md tests/web-ui/legal-error/legal-error-test-design.md .agents/skills/agent-workflow-orchestrator/SKILL.md`
  completed.
- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- Test designs can record observed behavior, but suspicious behavior should be
  explicitly queued for review so tests do not accidentally freeze a potential
  defect as expected product behavior.

## 2026-04-23 - Colocate Specs And Test Designs

Prompt summary:

- User requested subfolders under tests where each test spec and matching test
  design live in the same place, for example a login-flow folder containing both
  `login-flow.spec.ts` and `login-flow-test-design.md`.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file move/edit commands.
- Playwright test runner.

Actions:

- Moved six web UI spec/design pairs into feature folders:
  `homepage-unauthenticated`, `login-flow`, `register-flow`,
  `creator-campaigns`, `campaign-detail`, and `legal-error`.
- Updated spec imports from `./pages` and `./test-data` to shared `../pages`
  and `../test-data` paths.
- Kept standalone exploration diagrams in `tests/web-ui/test-designs`.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` and
  `.agents/cache/hot-cache.md` with the new colocated convention.

Result:

- Each implemented flow now has its spec and test-design Markdown side by side
  in `tests/web-ui/<feature>/`.
- Playwright still discovers the full web UI suite recursively.

Validation:

- `npx prettier --write tests/web-ui .agents/skills/agent-workflow-orchestrator/SKILL.md`
  completed.
- `npm run format:check` passed.
- `npm run lint` passed.
- `npm run test:web` passed with 28 tests.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- Shared page objects and test data stayed centralized, while feature-specific
  specs and their test designs were moved together to make implementation and
  design review easier.

## 2026-04-23 - Add Authenticated Storage Global Setup

Prompt summary:

- User requested a global setup for login, saving storage state for authenticated
  accounts, and reusing the saved state to unblock authenticated modules.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Global `playwright-skill`.
- Local file editing and validation commands.
- Playwright test runner.

Actions:

- Added `playwright/auth-storage.ts` with reusable storage state path constants.
- Added `playwright/global-setup.ts` to log in creator and brand accounts from
  environment variables and save authenticated storage states.
- Updated `playwright.config.ts` to use the global setup while keeping existing
  guest storage stable.
- Updated `.gitignore` so generated authenticated storage files are not
  committed.
- Updated `README.md` with environment variable usage and reuse example.
- Updated `.agents/cache/hot-cache.md`.

Result:

- Authenticated storage can now be generated at test startup when credentials are
  supplied via environment variables.
- Existing unauthenticated tests continue using `windflu-dev-storage.json`.

Validation:

- `npx prettier --write playwright.config.ts playwright/auth-storage.ts playwright/global-setup.ts README.md`
  completed.
- `npm run format:check` passed.
- `npm run lint` passed.
- `npm run test:web` passed with 28 tests.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- Credentials and generated auth state must stay outside Git, so the setup reads
  only environment variables and writes ignored storage files that authenticated
  tests can opt into.

## 2026-04-23 - Explore Authenticated Route Boundaries

Prompt summary:

- User requested exploration of the authenticated part of the Windflu website.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Global `website-exploration-flow`.
- Global `test-design-zephyr` for exploration-before-design sequencing.
- Playwright Chromium via Node script.
- Local file editing and validation commands.

Actions:

- Probed creator and brand protected routes with the current Playwright storage
  state.
- Confirmed the storage state is guest-only with `localStorage.isDev=true` and no
  auth cookies.
- Created
  `tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`.
- Documented protected-route redirects, auth-gate transition table, Mermaid auth
  gate flow diagram, and Mermaid authentication state diagram.
- Updated `.agents/cache/hot-cache.md`.

Result:

- Auth-gate behavior is documented and ready for test-design handoff.
- Creator and brand post-login internals remain blocked until safe test accounts
  or authenticated storage states are available.

Validation:

- `npx prettier --write tests/web-ui/test-designs/authenticated-exploration-flow-diagrams.md`
  completed.
- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- The current storage state cannot access authenticated modules, so the reliable
  output is an auth-boundary exploration with explicit blockers rather than
  inferred dashboard behavior.

## 2026-04-23 - Add Registered Account Registry

Prompt summary:

- User requested a file to record registered accounts and account details.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Local file editing and validation commands.

Actions:

- Added `tests/web-ui/test-data/registered-accounts.md`.
- Added registry rules that forbid storing passwords, OTPs, cookies, auth tokens, recovery links, or private personal data.
- Updated `.agents/cache/hot-cache.md` with the new account registry path and caveat.

Result:

- The project now has a safe, commit-ready file for tracking created QA test accounts and cleanup status.

Validation:

- `npm run lint` passed.
- `npm run format:check` passed after formatting `tests/web-ui/test-data/registered-accounts.md`.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- A Markdown registry is safer than embedding account records in executable test data because it can track lifecycle and cleanup notes while avoiding committed secrets.

## 2026-04-23 - Re-Explore Website And Create Diagrams

Prompt summary:

- User requested a fresh website exploration and diagrams.

Skills/tools used:

- Project `agent-workflow-orchestrator`.
- Global `website-exploration-flow`.
- Playwright Chromium via Node script.
- Local file editing and validation commands.

Actions:

- Re-explored public Windflu routes with `playwright/.auth/windflu-dev-storage.json`.
- Covered homepage, brand login/register/forgot-password, creator login/register, campaign listing/detail, policy tabs, and contact 404.
- Created `tests/web-ui/test-designs/website-exploration-flow-diagrams.md`.
- Added Mermaid navigation flow diagram.
- Added Mermaid creator registration state diagram.
- Added Mermaid campaign work lifecycle state diagram.

Result:

- Website exploration and diagrams are saved for test design handoff.
- Noted that privacy policy changed to `V1.0.6` dated `23 เมษายน 2569`.
- Noted that `/register` creator registration is visible and should be considered for future test design coverage.
- Noted that `/contact` still renders a 404 page.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- The site was re-explored before diagram creation so the diagrams reflect current visible behavior. State diagrams were added for creator registration and the campaign work lifecycle because both expose multi-step/status-driven behavior.

## 2026-04-23 - Add Activity Analytics Fields

Prompt summary:

- User requested more detailed activity logging for analytics, including token total usage for each prompt activity and a breakdown for thinking steps.

Skills/tools used:

- Project `agent-workflow-orchestrator` instructions.
- Local file editing and validation commands.

Actions:

- Updated `AGENTS.md` to require skills/tools used, token usage, and reasoning summary fields in prompt activity entries.
- Updated `.agents/skills/agent-workflow-orchestrator/SKILL.md` with the same logging requirements.
- Updated `.agents/cache/prompt-activity-log.md` with a reusable entry template.
- Updated `.agents/cache/hot-cache.md` with the new analytics logging rule.

Result:

- Prompt activity entries now include analytics fields.
- Token usage is recorded when available; otherwise entries explicitly state `Not available in this interface`.
- Hidden chain-of-thought is not logged; entries use concise reasoning summaries instead.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- The requested token usage can only be logged if the runtime exposes it. The requested thinking-step breakdown is represented as a safe reasoning summary to avoid recording hidden chain-of-thought.

## 2026-04-23 - Add Prompt Activity Log

Prompt summary:

- User requested a log change file that records all prompt activity and result.

Actions:

- Added `.agents/cache/prompt-activity-log.md`.
- Updated project instructions and orchestrator skill to require prompt/result logging.
- Updated hot cache with the new log path and rule.

Result:

- Prompt activity logging is now part of the project agent workflow.

Validation:

- `npm run format:check` passed.
- `npm run lint` passed.

Token usage:

- Total: Not available in this interface
- Input: Not available in this interface
- Output: Not available in this interface

Reasoning summary:

- A durable project log was needed alongside the hot cache because the cache is concise working memory, while the activity log records prompt/result history for analysis.
