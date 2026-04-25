---
name: agent-workflow-orchestrator
description: Project-scoped orchestration skill for coordinating existing skills and repository workflows. Use when Codex needs to decide which agent skill to apply, chain website exploration into flow/state diagrams, convert diagrams into Zephyr-style test design, implement Playwright tests with POM, maintain project hot-cache memory, or keep project artifacts ready for Git.
---

# Agent Workflow Orchestrator

Act as the project workflow coordinator. Choose and sequence the right skills before implementation. Keep the project hot cache and prompt activity log current.

## Required First Step

Before any project task:

1. Read `.agents/cache/hot-cache.md`.
2. Use the hot cache to understand current architecture, files, decisions,
   validation state, and recent user intent.
3. Continue with the requested task.

If the hot cache is missing, create it before making other changes.
If the hot cache is missing, read `.agents/cache/prompt-activity-log.md` only
as fallback context to reconstruct recent history.
If the prompt activity log is missing, create it before making other changes.

## Available Skill Chain

Use these skills when the task matches their purpose:

- `website-exploration-flow`: Explore websites/web apps, map transitions, produce Mermaid flow/state diagrams, and identify QA risks.
- `test-design-zephyr`: Convert requirements, exploration outputs, diagrams, or updates into Zephyr-compatible Markdown test design.
- `playwright-skill`: Implement, refactor, debug, and validate Playwright tests.
- `skill-creator`: Create or update Codex skills.

Use the project-local skill first for orchestration, then call the relevant specialized skill behavior.

## Provider Switching

The orchestrator supports provider switching through
`.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`.

Available provider templates:

- `.agents/skills/agent-workflow-orchestrator/agents/openai.yaml`
- `.agents/skills/agent-workflow-orchestrator/agents/gemini.yaml`
- `.agents/skills/agent-workflow-orchestrator/agents/claude.yaml`

Switching rule:

1. Read `active-provider.yaml`.
2. Use the provider file referenced by `active_provider`.
3. Keep the same workflow and project rules regardless of provider.
4. Do not store provider secrets in repository files.

Provider responsibilities are the same for all configured AIs:

- Read hot cache first.
- Use prompt activity log mainly for append-only logging, not mandatory startup reading.
- Choose the correct skill chain.
- Follow website exploration -> diagrams -> test design -> Playwright implementation.
- Update project memory after work.

## Git Workflow

When the task involves repository integration, commit, or push:

1. Read `.agents/skills/agent-workflow-orchestrator/COMMIT_POLICY.md`.
2. Inspect repository state before staging.
3. Stage only intentional project files.
4. Run relevant validation before commit.
5. Commit using the required format.
6. Push only when explicitly requested or clearly required by the task.
7. Update the hot cache and prompt activity log with repository status and
   validation results.

Treat `.agents/` artifacts as commitable project assets unless they contain
secrets, generated credentials, or temporary local-only data.

## Website QA Workflow

For website test work, always follow this order:

1. Explore website or current app behavior.
2. Produce or update Mermaid flow/state diagram.
3. Create or update test design.
4. Wait for confirmation when the test-design skill requires it.
5. Implement or update Playwright tests.
6. Run validation.
7. Update hot cache and prompt activity log.

Do not jump directly from exploration to implementation when test design is requested.

## Mermaid Diagram Rules

When creating Mermaid flowcharts or state diagrams for this project:

1. Prefer plain labels that avoid Mermaid-reserved syntax characters when they
   appear inside route examples or state labels.
2. Do not use route placeholders like `:id` inside Mermaid state-diagram edge
   labels or node labels. Replace them with safe placeholders such as `{id}` or
   `[id]`.
3. Be careful with characters that Mermaid treats as syntax in labels,
   especially `:`, `[]`, `{}`, and `|`, and simplify labels when needed.
4. If a real route contains syntax-heavy placeholders, keep the exact route in
   nearby prose or a table and use a Mermaid-safe display form in the diagram.
5. Before finishing, visually inspect new Mermaid blocks for parser-risky text,
   especially state-diagram transition labels.

## Implementation Standards

For this project:

- Keep Playwright tests under `src/test/web-ui` and `src/test/api`.
- Keep page objects under `src/page`.
- Keep reusable test data under `src/test-data`.
- Keep feature specs and their matching test-design Markdown files together in
  feature folders under `src/test/web-ui/<feature>/`.
- Keep standalone exploration diagrams under `src/test-design/`.
- Track product errors/incidents that need developer fix and QA retest in
  `.agents/review-notes/incident-log.md`; keep incidents out of active product
  tests until fixed, retest after fixes, then remove active incidents after
  recording closure.
- Keep the aggregate public test design only as a master reference.
- Prefer POM methods and locators over duplicated selectors in specs.
- Run `npm run lint`, `npm run format:check`, and targeted Playwright tests after relevant changes.

## Hot Cache And Prompt Log Update Rule

After every file change, update `.agents/cache/hot-cache.md` in the same turn.
Read `.agents/skills/agent-workflow-orchestrator/HOT-CACHE-POLICY.md` for the
full trimming, formatting, and skip rules before writing to the cache.

After every user task, append a concise entry to `.agents/cache/prompt-activity-log.md`.
Do not read `.agents/cache/prompt-activity-log.md` during normal startup.
Read it only when `.agents/cache/hot-cache.md` is missing and recent activity
must be reconstructed.

The prompt activity log should include:

- Date
- Prompt summary
- Skills/tools used
- Actions taken
- Result
- Validation status
- Token usage when available from the runtime; if unavailable, write `Not available in this interface`
- Reasoning summary / decision trace, using concise public reasoning only

Do not store secrets, auth tokens, real passwords, cookies, OTPs, private personal data, or hidden chain-of-thought in either file. For analytics, record a brief reasoning summary rather than private thinking steps.

## Git Readiness

Artifacts in `.agents/` are project-scoped and intended to be committed. Do not store secrets in the hot cache, prompt activity log, or skills.
