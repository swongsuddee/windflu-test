# Project Agent Config Export

This bundle packages the reusable project agent workflow and skill-orchestration
configuration from this repository so it can be copied into another project.

Included:

- `AGENTS.md`
- `.agents/skills/agent-workflow-orchestrator/`
- `.agents/cache/hot-cache.md` starter template
- `.agents/cache/prompt-activity-log.md` starter template

Excluded on purpose:

- `.env` and any local secret files
- project-specific review notes
- project-specific cache/log history
- application source code and tests

Suggested use in another project:

1. Copy the bundle contents to the target repository root.
2. Review `AGENTS.md` and adjust any project-specific wording.
3. Update `.agents/cache/hot-cache.md` with the new project's purpose and paths.
4. Keep `.agents/cache/prompt-activity-log.md` as the durable activity log.
5. If needed, switch the active provider in
   `.agents/skills/agent-workflow-orchestrator/agents/active-provider.yaml`.
