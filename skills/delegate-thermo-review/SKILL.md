---
name: delegate-thermo-review
description: Delegate a thermo-nuclear review to a subagent, then evaluate the findings without applying changes.
disable-model-invocation: true
compatibility: Requires a client that can start a fresh subagent and provide a bundled reference file as context.
---

# Delegate Thermo Review

Use this skill to get an independent thermo-nuclear review. The bundled [review rubric](references/review-rubric.md) carries the complete review criteria.

## Workflow

1. Resolve the review target.
   - Keep only enough context to avoid ambiguity.
   - Do not expand resolved metadata into the subagent prompt.

2. Read [references/review-rubric.md](references/review-rubric.md), then spawn one subagent with that rubric provided as context.
   - Start a fresh subagent with no inherited conversation history.
   - Prompt with one sentence using the user's target phrase.

Use this prompt shape:

```text
Use the provided thermo-nuclear code-quality rubric to review <target>.
```

3. Summarize all findings. Then work through them one at a time: explain each finding, ask any relevant questions, and suggest possible actions. Wait for my decision before moving to the next finding.

4. After decisions have been made for every finding, ask whether there is anything else to discuss before implementing the agreed changes.
