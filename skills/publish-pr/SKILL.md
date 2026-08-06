---
name: publish-pr
description: Publish local git changes to GitHub by confirming scope, choosing a typed branch name, staging only intended files, committing with a typed prefix, pushing, and opening a draft pull request with a typed title. Use when the user asks to make, create, open, publish, or prepare a PR from the current checkout.
compatibility: Requires git, authenticated GitHub access, and either a GitHub integration or the GitHub CLI for pull-request creation.
---

> This file is based on OpenAI's `yeet` skill and has been modified for this collection. See `README.md` and `LICENSE.upstream` for source and license details.

# Publish PR

## Overview

Use this skill for the full local-to-GitHub PR flow: inspect changes, confirm scope, create or reuse a branch, commit, push, and open a draft pull request. Keep naming project-neutral and human-readable. Do not add `codex/` branch prefixes, Codex signatures, generated-by footers, co-author trailers, or `[codex]` prefixes.

## Naming

Use a type prefix consistently on the branch, commit, and PR title.

Common types:

- `feat`: user-facing feature
- `fix`: bug fix
- `test`: test-only change
- `docs`: documentation-only change
- `refactor`: restructuring without behavior change
- `chore`: maintenance, tooling, dependency, or repo hygiene
- `perf`: performance improvement
- `ci`: CI or release automation

Formats:

```text
branch: type/short-kebab-summary
commit: type: imperative summary
PR:     type: reviewer-facing summary
```

Examples:

```text
branch: test/api-error-smoke-contract
commit: test: add API error contract smoke tests
PR:     test: add smoke coverage for API error responses
```

Prefer the narrowest honest type. If the repo has a stricter local convention, follow the repo.

## Workflow

1. Confirm intended scope.
   Run `git status -sb` and inspect the diff before staging. If the worktree contains unrelated changes, ask which files belong in the PR. Never stage unrelated user changes silently.

2. Choose the type and summary.
   Derive a concise type and summary from the change. Ask the user if the type is ambiguous or the repository convention is unclear.

3. Determine branch strategy.
   If on `main`, `master`, or the default branch, create `type/short-kebab-summary`. Otherwise stay on the current branch unless the user asks for a new branch.

4. Stage only intended files.
   Prefer explicit file paths. Use `git add -A` only when the user has confirmed the whole worktree belongs in scope.

5. Commit.
   Use `type: imperative summary`. Keep it terse. Do not add signatures, generated-by footers, or co-author trailers unless the user explicitly asks.

6. Run relevant checks.
   Use the project’s existing scripts. If checks already ran after the final diff, reuse that result. If a check fails because dependencies or tools are missing, install what is needed only when appropriate for the repo and rerun once.

7. Push.
   Resolve the current branch, then push it with tracking: `git push -u origin <branch>`.

8. Open a draft PR by default.
   Prefer the GitHub app or connector for PR creation after pushing. Use `gh pr create` only as fallback. Use a typed title: `type: reviewer-facing summary`. Do not add `[codex]`. Do not mark ready for review unless the user explicitly asks.

9. Summarize.
   Include branch, commit, PR URL, target branch, checks run, and any caveats.

## PR Body

Write real Markdown prose with:

- what changed
- why it changed
- impact on users or developers
- root cause when the PR is a fix
- validation performed

Keep the body specific to the diff. Do not include Codex signatures, automation branding, or generated-by notes.

## Safety

- Never rewrite history unless explicitly requested.
- Never force-push unless explicitly requested.
- Never push without confirming scope when the worktree is mixed.
- Stop and explain the blocker if the repository lacks an accessible GitHub remote.
