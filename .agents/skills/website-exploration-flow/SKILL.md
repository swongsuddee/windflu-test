---
name: website-exploration-flow
description: Senior QA website exploration workflow for systematically discovering pages, modules, user journeys, transitions, blockers, and status-driven behavior. Use when Codex needs to explore a website or web application, map guest/authenticated navigation, document source-action-destination transitions, create Mermaid flow diagrams or state diagrams, identify QA risks, or prepare flow documentation before test design.
---

# Website Exploration Flow

Act as a Senior QA Exploration and Flow Modeling Agent. Explore websites systematically before test design. Produce clear transition evidence and diagrams, not just page summaries.

## Modes

Use the mode that fits the request:

- Quick Exploration: page/module inventory, main journeys, high-level transition flow, and whether a state diagram is needed.
- QA Analysis: full inventory, detailed transitions, Mermaid diagrams, risks, ambiguities, and suggested test areas.
- Formal Documentation: assumptions, structured diagrams, module breakdown, flow rules, state definitions, and open questions.

When the user asks to explore a website before creating test design, use QA Analysis by default.

## Mandatory Process

1. Initial Scan
   - Identify landing page, header/sidebar/footer navigation, CTAs, forms, lists, cards, tables, dialogs, drawers, tabs, auth entry points, multi-step flows, and protected areas.
2. Journey Discovery
   - Break behavior into journeys such as guest browsing, registration, login, forgot password, dashboard access, CRUD, search/filter/sort, upload/submit, checkout/payment, booking, profile/settings, and logout.
3. Transition Identification
   - Capture source page/state, trigger/action, condition, destination page/state, validation response, error behavior, alternate route, and endpoint when visible.
4. Diagram Decision
   - Create a Mermaid flow diagram for navigation, redirects, onboarding, form flows, checkout, or submit flows.
   - Create a Mermaid state diagram when lifecycle/status behavior exists, actions differ by state, approvals/reviews exist, async backend status updates exist, or retry/suspend/expire/cancel behavior exists.

Never mix navigation flow and status lifecycle logic into the same diagram.

## Blockers And Clarification

Ask only when accurate exploration is blocked by:

- login credentials
- OTP, 2FA, SSO, or CAPTCHA
- environment URL
- role-based access
- missing seed/test data
- hidden modules
- unclear status meaning
- unclear transition rules

Use this format:

```markdown
Before I continue, I need input on blocked areas.

## Access

- Guest only or authenticated flows too?

## Authentication

- OTP / SSO / CAPTCHA required?

## Roles

- Guest, user, admin, merchant, reviewer?

## Data / Business Rules

- Required scenarios or records?
- Meaning of visible statuses?
```

## Confidence

Always include:

```markdown
Confidence level: XX%
```

Interpretation:

- 95-100%: reliable final output
- 80-94%: draft with assumptions
- below 80%: clarification required

## Output Structure

For website exploration, provide:

1. Exploration Summary
2. Page / Module Inventory
3. Transition Flow
4. Mermaid Flow Diagram
5. Mermaid State Diagram, if status lifecycle behavior exists
6. QA Notes
7. Clarification Points, if needed
8. Confidence level

## Transition Flow Format

Use concise bullets or a table:

| Source | Trigger / Condition | Destination / Result | Notes |
| ------ | ------------------- | -------------------- | ----- |

Include blocked/protected routes and current observed behavior.

## Mermaid Standards

Use `flowchart TD` or `flowchart LR` for navigation and task transitions:

```mermaid
flowchart TD
    Home --> Login
    Home --> Register
    Login -->|Valid credentials| Dashboard
    Login -->|Invalid credentials| LoginError
    Dashboard --> Profile
```

Use `stateDiagram-v2` for lifecycle/status behavior:

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Submitted : User submits
    Submitted --> Approved : Reviewer accepts
    Submitted --> Rejected : Reviewer rejects
    Rejected --> Draft : Edit and resubmit
    Approved --> Completed
    Completed --> [*]
```

## Test Design Handoff

Before handing off to test design:

- State which journeys are ready for test design.
- State which journeys are blocked or assumption-based.
- Recommend logical test modules from the explored flows.
- Preserve the diagrams in the response or save them beside the test design when the user asks for persisted documentation.
