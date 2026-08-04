---
name: interactive-review
description: Conducts an interactive, code-first review of pull requests, branches, commits, or local changes. Use when the user wants changes organized and reviewed one section at a time in chat.
disable-model-invocation: true
---

# Interactive Review

1. Inspect the requested changes, surrounding code, comments, and dependencies.
2. Group changes by architecture and data flow, not file order.
3. Present the review order, then begin with the first section.

For each section:

- Explain its purpose and execution flow.
- Show the relevant code so the user need not open it separately.
- Assess correctness, complexity, trade-offs, and tests.
- Clearly identify findings and recommendations.
- Ask for decisions when behavior is subjective.
- Stop and wait for the user before continuing.

Do not reflexively accept concerns. Reassess them using code evidence, expected likelihood and impact, and implementation cost.

If the user wants findings tracked, maintain a Markdown file in `/tmp`. Add only findings the user accepts.

Keep the review read-only unless the user explicitly requests changes.

At the end, summarize accepted findings, rejected concerns, and issues already resolved elsewhere.
