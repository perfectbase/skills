---
name: delegate-thermo-review
description: Delegate a thermo-nuclear review to a subagent, then evaluate the findings without applying changes.
disable-model-invocation: true
---

# Delegate Thermo Review

Use this skill to get an independent thermo-nuclear review with a short subagent prompt. The thermo skill carries the review rubric.

## Workflow

1. Resolve the review target.
   - Keep only enough context to avoid ambiguity.
   - Do not expand resolved metadata into the subagent prompt.

2. Spawn one subagent with the `thermo-nuclear-code-quality-review` skill attached as a skill input item.
   - Start a fresh subagent with no inherited conversation history. Use `fork_turns: "none"` when supported.
   - Use the session skill entry when present; otherwise use `${CODEX_HOME:-$HOME/.codex}/skills/thermo-nuclear-code-quality-review/SKILL.md`.
   - Prompt with one sentence using the user's target phrase.

Use this prompt shape:

```text
Use the provided thermo-nuclear-code-quality-review skill to review <target>.
```

3. Summarize all findings. Then work through them one at a time: explain each finding, ask any relevant questions, and suggest possible actions. Wait for my decision before moving to the next finding.

4. After decisions have been made for every finding, ask whether there is anything else to discuss before implementing the agreed changes.
