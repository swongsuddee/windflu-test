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

- 2026-04-26: Split the old `login-flow` area into `brand-login-flow` and `creator-login-flow`, added a brand login setup project plus shared auth setup service, and validated both login suites and both setup projects against the live site.
- 2026-04-26: Applied the remaining naming-policy cleanup by renaming legacy `-service.ts` files to `.service.ts` and legacy `-test-design.md` files to `.design.md`, then updated the active code references.
- 2026-04-26: Switched registration success logging to per-run random passwords, made `src/test-data/register-success-accounts.md` a gitignored local registry, and taught the log service to bootstrap that file automatically.
- 2026-04-26: Revalidated creator and brand registration success specs after the password-logging change; both targeted Playwright runs passed against the live site.
- 2026-04-26: Moved the shared registration success registry to `src/test-data/register-success-accounts.md`, updated the log service path, and removed the remaining brand design reference to the old creator-local file path.
- 2026-04-26: Implemented `REG-VAL-001` for the brand success path with `src/test/web-ui/brand-register/register-success.spec.ts`, updated `src/page/brand-register-page.ts` to the current inline policy-card flow, and verified the live run with `1 passed`.
- 2026-04-26: Rewrote `src/test/web-ui/brand-register/register-success.design.md` to match the 98% confidence brand success-flow exploration, replacing the old modal/blocker assumptions with the current inline policy-card success path.
- 2026-04-26: Fixed the editor `process` type error in `playwright.config.ts` by adding an explicit Node types reference at the top of the file; file-scoped Prettier validation passed.
- 2026-04-26: Re-explored the public legal policy pages, closed `INC-003`, and confirmed stable long-form privacy and terms content with visible tabs and update stamps dated `25 เมษายน 2569`.
- 2026-04-26: Implemented `REG-VAL-001` for the creator success path with `src/test/web-ui/creator-register-flow/register-success.spec.ts`, extended creator register helpers, improved success-account log insertion, and verified the live run with `1 passed`.

## Active Assumptions

- Public creator registration remains reachable at `/register` from the guest
  experience.
- Unauthenticated public coverage should continue following the current live
  guest contract, including redirects for creator-session-only routes.

## Validation Status

Validation status (2026-04-26):

- lint: pass
- format: pass
- tests: pass — creator register suites passed (`7 passed`, `1 passed`), brand register success passed (`1 passed`), brand/creator login suites passed (`4 passed` each), and both login setup projects passed (`1 passed` each)

## Known Caveats

- The remaining stale success-path design file is the creator success design;
  brand success design and implementation now match the 2026-04-26
  exploration.
- The legal-policy test design and spec still reflect the earlier conservative
  navigation-only scope even though `INC-003` is now closed.
- The shared success-account registry now lives in `src/test-data/`; keep new
  references pointed there instead of feature folders.
- `src/test-data/register-success-accounts.md` is intentionally gitignored and
  now stores actual generated passwords only in the local workspace.
- Do not store raw passwords, auth tokens, cookies, OTPs, or personal data in
  repository docs, hot cache, or prompt logs.

## Next Useful Action

Refresh the legal-policy design/spec and the remaining stale creator
success-path design file so they match the current explorations and
implementations, then add authenticated brand coverage now that reusable brand
storage setup exists.
