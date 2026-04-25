# Hot Cache

Last updated: 2026-04-26

## Project Purpose

Playwright test project for Windflu web UI and API coverage against
`https://www.windflu.com`.

## Important Paths

- Config: `playwright.config.ts`
- Page objects: `src/page/`
- Web UI specs and colocated test designs: `src/test/web-ui/`
- Standalone explorations: `src/test-design/`
- Shared test data: `src/test-data/`
- Agent workflow skill:
  `.agents/skills/agent-workflow-orchestrator/SKILL.md`
- Active provider selector:
  `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`
- Incident tracking: `.agents/review-notes/incident-log.md`
- Prompt activity log: `.agents/cache/prompt-activity-log.md`

## Recent Changes

- 2026-04-26: Re-explored the public legal policy pages, closed `INC-003`, and confirmed stable long-form privacy and terms content with visible tabs and update stamps dated `25 เมษายน 2569`.
- 2026-04-26: Implemented `REG-VAL-001` for the creator success path with `src/test/web-ui/creator-register-flow/register-success.spec.ts`, extended creator register helpers, improved success-account log insertion, and verified the live run with `1 passed`.
- 2026-04-26: Re-explored the creator registration success flow, raised `src/test-design/exploration-creator-register-flow.md` to 98% confidence, and confirmed the live success state on `/register` plus the post-success redirect CTA to `/login?next=%2Fcreator%2Fdashboard`.
- 2026-04-26: Re-explored the brand registration success flow, raised `src/test-design/exploration-brand-register-flow.md` to 98% confidence, and closed `INC-002` after retest confirmed the new inline policy-card success path on `/brand/register`.
- 2026-04-26: Implemented `PUB-032` to `PUB-038` for the creator register flow by adding `src/page/creator-register-page.ts`, creator register test-data builders, and a rewritten `src/test/web-ui/creator-register-flow/register-flow.spec.ts`; targeted Playwright validation passed with `7 passed`.
- 2026-04-25: Renamed the creator register design file from `src/test/web-ui/creator-register-flow/register-flow-test-design.md` to `src/test/web-ui/creator-register-flow/register-flow.design.md` so the design and spec share the same base name.
- 2026-04-25: Renamed `src/util-services/register-success-account-log-service.ts` to `src/util-services/register-success-account-log.service.ts`, updated the creator register spec import, and corrected the success-log output path to `src/test/web-ui/creator-register-flow/register-success-accounts.md`.
- 2026-04-25: Replaced the stale creator-register placeholder with a 6-case creator-specific test design in `src/test/web-ui/creator-register-flow/register-flow.design.md` based on the finalized exploration.
- 2026-04-25: Re-explored creator registration and finalized `src/test-design/exploration-creator-register-flow.md` at 97% confidence for the observed `Account -> Social -> Personal` flow.
- 2026-04-25: Aligned the lint toolchain to Node 18 by pinning `typescript-eslint` to `8.44.1`, downgrading `typescript` to `5.9.3`, and refreshing `package-lock.json`.
- 2026-04-25: Split homepage unauthenticated navigation coverage into focused cases and revalidated the homepage suite.

## Active Assumptions

- Public creator registration remains reachable at `/register` from the guest
  experience.
- Unauthenticated public coverage should continue following the current live
  guest contract, including redirects for creator-session-only routes.

## Validation Status

Validation status (2026-04-26):

- lint: pass
- format: pass
- tests: pass — creator register suites passed: `register-flow.spec.ts` with `7 passed` and `register-success.spec.ts` with `1 passed`

## Known Caveats

- Creator and brand success-path test-design files are still stale relative to
  the refreshed 2026-04-26 success-flow explorations, even though creator
  success implementation now exists.
- The legal-policy test design and spec still reflect the earlier conservative
  navigation-only scope even though `INC-003` is now closed.
- Do not store raw passwords, auth tokens, cookies, OTPs, or personal data in
  repository docs, hot cache, or prompt logs.

## Next Useful Action

Refresh the legal-policy design/spec and the success-path design files so they
match the refreshed 2026-04-26 explorations before the next implementation
pass.
