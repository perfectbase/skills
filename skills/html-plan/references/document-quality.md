# HTML plan document quality

Read this file before authoring every HTML plan.

## Required narrative

Write a serious technical plan, not a marketing page. The document must make these items easy to locate:

1. Objective and observable done criteria
2. Current behavior and repository evidence
3. Scope and explicit non-goals
4. Chosen approach, key decisions, and rationale
5. Affected files, symbols, contracts, and data shapes
6. Ordered implementation steps
7. Risks, mitigations, migration, and rollout when applicable
8. Verification, including a realistic end-to-end smoke
9. One final Open Questions section only when decisions remain

Open with the outcome rather than a hero banner. Avoid slogans, giant headings, feature marketing, decorative metrics, and cards that merely restate prose.

## Standalone rule

Write the document as the current proposal, not as a record of conversation. Avoid “as discussed,” “the previous plan,” “this revision,” and contrasts that depend on missing context. Label uncertain repository facts as assumptions.

When adapting an existing plan, preserve useful intent and verified codebase facts while rewriting the result as a coherent standalone proposal.

## HTML components

Use the native element that best carries the information:

- Prose and nested lists for the plan narrative.
- `<aside>` for a decision, risk, warning, assumption, or non-goal.
- `<table>` for exact field mappings or repeated comparisons.
- `<figure>` with inline SVG or semantic HTML for architecture and data flow.
- `<pre><code>` for small code or contract shapes.
- An annotated-code layout for a load-bearing file: real or plausible minimal code beside a few high-signal notes tied to line ranges.
- `<details>` for secondary context, not for essential steps.
- Tabs only when comparing states, directions, or files where parallel reading helps. A prose-only tab set usually hides under-specified content.
- Native form controls for unresolved choices.

Do not show an exhaustive file inventory. Highlight only load-bearing files and group the rest in a concise affected-files table.

## Decisions and questions

A settled decision belongs in prose or a visually distinct decision callout with its rationale. A genuine unresolved choice belongs only in the bottom Open Questions section.

For each question:

- Ask one design decision.
- Offer only real alternatives.
- Mark the recommended default and explain why.
- Include a freeform field when a custom constraint is plausible.
- Do not add an explicit “Other” option when a freeform field already exists.

An assumption or risk that cannot be answered as a choice belongs next to the relevant implementation section, not in Open Questions.

## Implementation steps

Each step must state:

- What existing code it reuses
- What changes
- The actual files and symbols involved
- The relevant contract or state transition
- How completion will be verified

Do not write “implement the feature,” “update the backend,” “handle errors,” or “make it work” without concrete mechanics.

## Verification

Name known commands and manual paths. Match verification to the feature:

- Unit/type/build checks for local correctness
- Integration checks for contracts and persistence
- Browser interaction for UI behavior
- Migration rehearsal and rollback for data changes
- Authorization checks for ownership/security boundaries
- At least one end-to-end smoke using a realistic fixture or user journey

## Pre-handoff check

Confirm the artifact is self-contained, has no external requests, renders in light and dark mode, remains readable when printed, and contains no broken anchors, clipped content, secret material, placeholder prose, or duplicated questions.
