# Hot Cache Policy

Use this policy when reading or updating `.agents/cache/hot-cache.md`.

## When To Update

Update the hot cache **only when files change**. Read-only tasks, exploration-only
runs, and tool calls that produce no file changes do not require a cache update.

## Sections To Maintain

The cache must always include these sections:

- **Project Purpose** — one sentence describing the repo goal and target URL.
- **Important Paths** — key directories and files an agent needs to navigate the project.
- **Recent Changes** — rolling list of the last 10 meaningful changes (see trimming rule below).
- **Active Assumptions** — decisions made without full information that could be wrong.
- **Validation Status** — last known lint, format, and test result with date.
- **Known Caveats** — hard constraints, security rules, environment dependencies.
- **Next Useful Action** — the single most useful thing to do next.

## Recent Changes Trimming Rule

- Keep a maximum of **10 entries** in the Recent Changes list.
- Each entry must be a single line: `YYYY-MM-DD: <what changed and why>`.
- When adding a new entry would push the count above 10, remove the oldest entry.
- Do not archive removed entries — they belong in the prompt activity log instead.

## What Not To Store

- Secrets, auth tokens, cookies, OTPs, passwords, or private personal data.
- Raw command output or test logs — summarise the result instead.
- Duplicate information already captured in the prompt activity log.
- More than one line per Recent Changes entry.

## Validation Status Format

```
Validation status (YYYY-MM-DD):
- lint: pass | fail | not run
- format: pass | fail | not run
- tests: pass | fail | partial | not run — <brief note>
```
