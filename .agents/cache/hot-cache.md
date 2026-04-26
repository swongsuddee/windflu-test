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

- 2026-04-26: Added `.env.example` with creator and brand credential placeholders and updated `README.md` to point local setup at that file.
- 2026-04-26: Added a repo-managed branch policy in `.githooks/pre-commit`, documented it in `README.md`, and activated this clone with `git config core.hooksPath .githooks` to block direct commits to `main` and enforce `feature/*`, `fix/*`, `test/*`, or `chore/*` branch names.
- 2026-04-26: Updated `README.md` with new `To Do` and `Unfinish Test Feature Implementation` sections.
- 2026-04-26: Added a root `LICENSE` file using the MIT license text.
- 2026-04-26: Replaced brittle phase-2 brand create-campaign locators with structure-based selectors around `ระยะเวลาแคมเปญ`, which let `BRC-005` pass on the live route; the suite now validates at `5 passed`, `3 skipped`.
- 2026-04-26: Added `INC-004` for the brand create-campaign range-picker rerender issue, tried a wait-based and DOM-click date-selection helper, and confirmed the suite must still keep `BRC-005` to `BRC-008` blocked while stable coverage remains `4 passed`, `4 skipped`.
- 2026-04-26: Realigned `src/test/web-ui/brand-create-campaign/brand-create-campaign.spec.ts` to the phased flow, implemented stable coverage through phase-2 blocking (`4 passed`), and added `src/util-services/created-campaign-log.service.ts` for future success-path campaign logging.
- 2026-04-26: Redesigned `src/test/web-ui/brand-create-campaign/brand-create-campaign.design.md` into phased coverage for form/preview, date validation, QR-only payment selection, and success handoff, and added the gitignored local registry `src/test-data/created-campaigns.md`.
- 2026-04-26: Implemented `src/test/web-ui/brand-create-campaign/brand-create-campaign.spec.ts` plus `src/page/brand-create-campaign-page.ts` and validated the new suite with `6 passed` against the live authenticated brand route.
- 2026-04-26: Updated `src/test-data/campaign.ts` so brand campaign titles are generated with the `ครั้งที่ <increment>-` prefix instead of staying static.
- 2026-04-26: Added `src/test-data/campaign.ts` and created `src/test/web-ui/brand-create-campaign/brand-create-campaign.design.md` with six PROF-safe cases for authenticated route access, step-1 surface, title/detail/image state, upload acceptance, stepper visibility, and conservative progression behavior.

## Active Assumptions

- Public creator registration remains reachable at `/register` from the guest
  experience.
- Unauthenticated public coverage should continue following the current live
  guest contract, including redirects for creator-session-only routes.

## Validation Status

Validation status (2026-04-26):

- lint: pass
- format: pass
- tests: partial — creator register suites passed (`7 passed`, `1 passed`), brand register success passed (`1 passed`), brand/creator login suites passed (`4 passed` each), login setup projects passed (`1 passed` each), old brand create-campaign suite passed (`6 passed`), and phased brand create-campaign currently validates with `5 passed`, `3 skipped`

## Known Caveats

- The remaining stale success-path design file is the creator success design;
  brand success design and implementation now match the 2026-04-26
  exploration.
- `src/test-data/created-campaigns.md` is intentionally gitignored and should
  hold only safe local campaign metadata after true create-campaign success.
- The current PROF create-campaign range picker still needs cautious
  automation handling, but the structure-based phase-2 locators now support
  the valid date-range progression case; downstream budget/payment/success
  coverage remains blocked and is tracked under `INC-004`.
- The legal-policy test design and spec still reflect the earlier conservative
  navigation-only scope even though `INC-003` is now closed.
- The shared success-account registry now lives in `src/test-data/`; keep new
  references pointed there instead of feature folders.
- `src/test-data/register-success-accounts.md` is intentionally gitignored and
  now stores actual generated passwords only in the local workspace.
- Do not store raw passwords, auth tokens, cookies, OTPs, or personal data in
  repository docs, hot cache, or prompt logs.

## Next Useful Action

Implement `BRC-006` to `BRC-008` from the budget/payment/success phases now
that `BRC-005` can reach the next phase with the generalized step-2 locators,
then add created-campaign logging on true success.
