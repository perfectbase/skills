---
name: slice-implement
description: Slice and implement a coding task as stacked pull requests. Use when the user wants an implementation divided into reviewable PRs or asks to build a stacked PR series.
---

# Slice and implement

Slice the implementation into reviewable chunks.
Choose a short shared prefix for the stack.

Use `gh stack` to implement the slices from bottom to top:

- Start with `gh stack init --base <base> <first-branch>`.
- Add each subsequent slice with `gh stack add <next-branch>`.
- Rebase changes to a lower slice with `gh stack rebase --upstack`.
- Publish or update the stack with `gh stack submit --auto`.
- Inspect the stack with `gh stack view --json`.
- Link existing PRs with `gh stack link --base <base> <pr>...`.

Create one PR per slice. Prefix every PR title with the shared prefix and its position, numbered bottom to top, for example:

`[CLI 01] feat: add CLI foundation`

`[CLI 02] feat: add project commands`

`gh stack submit --auto` creates new PRs as drafts. Use `--open` only when the user asks for ready-for-review PRs.

After publishing, babysit every PR until no checks are pending or failing. Use `gh pr checks <pr> --watch --interval 10` for each PR. When a check fails, inspect it, fix the failure in the appropriate slice, rebase and resubmit the stack, then continue monitoring.

Do not finish while checks are still running. Do not merge the stack unless the user asks.
