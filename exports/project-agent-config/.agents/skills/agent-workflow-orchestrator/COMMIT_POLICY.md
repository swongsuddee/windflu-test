# Commit And Push Policy

Use this policy for all agent-created commits in this project.

## Workflow

1. Inspect repository state before staging.
2. Stage only intentional project files.
3. Run required validation for the changed surface.
4. Commit with the format defined below.
5. Push only when the user explicitly requests it or the task clearly requires
   repository integration.
6. Update `.agents/cache/hot-cache.md` and
   `.agents/cache/prompt-activity-log.md` in the same turn.

## Safety Rules

- Never commit secrets, auth tokens, cookies, OTPs, passwords, or private
  personal data.
- Never commit generated authenticated storage files under `playwright/.auth/`.
- Do not use force push unless the user explicitly requests it.
- Do not rewrite history unless the user explicitly requests it.
- Do not stage unrelated local artifacts just to make the tree clean.

## Commit Message Format

Use:

`<type>(<scope>): <imperative summary>`

Examples:

- `test(authenticated-user): add prepared coverage design`
- `chore(agent-workflow): add commit and push policy`
- `docs(readme): explain global setup auth states`

## Message Rules

- `type` must be one of:
  `feat`, `fix`, `test`, `docs`, `chore`, `refactor`, `ci`, `build`
- `scope` is recommended and should be lowercase kebab-case.
- `summary` must be imperative, concise, and without a trailing period.
- Keep the first line within 72 characters when practical.
- Add a body only when extra context is needed.

## Commit Body Template

When a body is useful, keep it short:

```text
Why:
- ...

Validation:
- ...
```

## Push Rule

Before pushing:

- Confirm the target remote and branch.
- Ensure the working tree is in the intended state.
- Ensure required validations already ran or clearly note what was not run.
