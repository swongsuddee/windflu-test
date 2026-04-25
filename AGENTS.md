# Project Agent Instructions

Before starting any task in this project:

1. Read `.agents/cache/hot-cache.md`.
2. Read `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml` to determine the active AI provider.
3. Use `.agents/skills/agent-workflow-orchestrator/SKILL.md` to decide which project/global skills apply and follow the same workflow regardless of provider.
4. If the task involves Git integration, commit, or push, read
   `.agents/skills/agent-workflow-orchestrator/COMMIT_POLICY.md` and follow it.
5. After changing files, update `.agents/cache/hot-cache.md` with:
   - changed files
   - key decisions
   - validation commands and results
   - next useful action
6. Append a concise entry to `.agents/cache/prompt-activity-log.md` with:
   - prompt summary
   - skills/tools used
   - actions taken
   - result
   - validation status
   - token usage when available from the runtime; otherwise write `Not available in this interface`
   - reasoning summary / decision trace, using concise public reasoning only
7. Do not read `.agents/cache/prompt-activity-log.md` during normal task startup.
   Read it only when `.agents/cache/hot-cache.md` is missing and recent task
   history is needed to rebuild context.
8. For website exploration work, final exploration output must have confidence
   greater than 95%. If there is doubt or unclear behavior that keeps
   confidence at 95% or below, ask the user for clarification before treating
   the exploration as final.

Provider switching notes:

- The active provider is selected in `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`.
- Provider templates currently exist for OpenAI, Gemini, and Claude under `.agents/skills/agent-workflow-orchestrator/agents/`.
- Do not duplicate workflow rules per provider; the orchestrator skill remains the single source of truth.

Git notes:

- Commit and push behavior is defined in
  `.agents/skills/agent-workflow-orchestrator/COMMIT_POLICY.md`.
- Use the repository commit message format from that policy.
- Do not commit secrets or generated authenticated storage states.

Keep the hot cache concise. It is a working memory for future agent turns, not a changelog.

Keep the prompt activity log as an append-only activity record. It is for
logging work, not for mandatory startup context.

Do not write secrets, auth tokens, passwords, cookies, OTPs, or private personal data to the hot cache or prompt activity log. Do not write hidden chain-of-thought; use a short reasoning summary instead.
