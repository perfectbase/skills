---
name: html-recap
description: Turn a completed work unit, PR, branch, commit, or git diff into a polished self-contained interactive HTML recap. Use when a user invokes html-recap or asks for an HTML visual recap, change walkthrough, before/after review, architecture recap, UI change recap, or high-level review artifact for work that already exists.
---

# HTML Recap

Create one standalone HTML document that explains a completed change at a higher altitude than line-by-line review. Show the shape of the work first—visible UI, contracts, data models, architecture, and file footprint—then let the reviewer drop into a focused set of load-bearing diffs.

The recap summarizes evidence; it does not replace code review. Do not modify the reviewed source while creating the recap unless the user separately asks for fixes.

## Recap discipline

- Use a recap for substantial, multi-file, architectural, contract, schema, or UI changes. Skip tiny or obvious diffs that review faster directly.
- Ground every structured fact in the actual changed lines. Paths, fields, methods, endpoints, code, states, and change classifications must be exact. Label model interpretation as inferred; omit facts that the diff cannot prove.
- Keep the body lean but substantial. Exclude generic provenance, disclaimers, file-count prose, and “review the diff too” boilerplate. Include enough implementation evidence that the artifact does not force an immediate return to the full raw diff.
- Redact credentials, tokens, private URLs, `.env` values, personal data, and credential-looking literals everywhere, including code excerpts.
- Distinguish behavior demonstrated by code from behavior verified by executed tests. Never imply a test was run when it merely exists in the diff.

## Scope the whole work unit

When invoked after work in the current task, recap the entire task-owned work unit by default: original implementation, follow-up fixes, tests, migrations, generated artifacts, configuration, and supporting instruction changes.

Use the current diff plus conversation context and repository history to separate task-owned changes from unrelated dirty work that predates the task. Exclude unrelated edits. If the boundary cannot be inferred safely, state the scope assumption or ask one concise question.

When updating an existing recap, retain the whole work unit and incorporate the new correction. Do not narrow the artifact to only the latest feedback unless the user asks.

## Workflow

1. **Resolve the comparison.** Determine the exact base and target: PR, branch, commit range, staged/unstaged worktree, or task-owned changes. Capture file status, rename detection, and per-file statistics. Completion criterion: every included file belongs to the stated comparison and unrelated dirty changes are excluded.

2. **Read the diff sequentially once.** For each file, record purpose, meaningful hunks, user-visible effects, contracts, schemas, architecture, security boundaries, tests, migrations, and risks. Work from these notes afterward; revisit only specific hunks when exact excerpts are needed. Completion criterion: every changed file is classified or intentionally omitted as generated, mechanical, tiny, or redundant.

3. **Inventory surfaces and states.** Before authoring, list changed routes, components, dialogs/popovers, roles and permissions, empty/loading/error states, APIs/actions, models, migrations, shared abstractions, and validation. Completion criterion: every meaningful item appears in the recap or has a recorded reason for omission.

4. **Read the quality references.**
   - Always read [references/recap-quality.md](references/recap-quality.md).
   - Read [references/visual-quality.md](references/visual-quality.md) before creating UI comparisons, storyboards, or diagrams.
   - Read [references/exemplar.md](references/exemplar.md) for the good/bad bar.

5. **Choose the visual headline.**
   - Put changed rendered UI first as realistic before/after frames, an after-only frame, or a state sequence.
   - Put schema and API changes into exact current/target contract views.
   - Put architecture or data-flow shifts into a two-dimensional current/target, layered, or swimlane diagram.
   - Use no decorative headline for a change whose clearest entry point is the technical narrative.

   Completion criterion: the first visual or structural section expresses the most important reviewer decision without duplicating later code evidence.

6. **Compose one self-contained HTML document.** Use semantic HTML, embedded CSS, inline SVG where useful, and small vanilla JavaScript for tabs, filters, diff views, or state transitions that improve review. Require no build step, server, CDN, remote font, framework, or network request.

7. **Add implementation evidence.** Include the changed-file tree and 3–8 focused key-change tabs for a substantial recap. Prefer excerpts below about 150 lines each. Use split before/after for meaningful replacements and annotated code for new files or additions with no useful “before.” Completion criterion: each key excerpt has intent, exact file identity, and a few high-signal annotations.

8. **Audit truth and security.** Reconcile every field, path, status, code line, state, and test claim against the selected comparison; scan copied content for secrets and sensitive data.

9. **Validate the artifact.** When browser tooling is available, open or render the HTML and check desktop and narrow widths, keyboard navigation, contrast, overflow, clipping, anchors, tabs, diff controls, diagrams, UI states, print output, and console errors. Otherwise validate the document structure, local links, and scripts statically and disclose the visual-validation limitation. Fix every defect found.

10. **Hand off.** Provide a clickable link to the HTML artifact and state the comparison it covers in one sentence. Mention any material inference, redaction, omitted generated content, or validation limitation.

## Canonical shape

Use this order unless the change clearly demands a different one:

1. UI-impact headline when rendered UI changed
2. One-to-three paragraphs: outcome, why, and material risk
3. Schema, API, state, or architecture sections when changed
4. Changed-file tree with added/modified/removed/renamed status
5. “Key changes” with 3–8 focused, annotated file tabs
6. Verification evidence and reviewer attention points

Keep the title under roughly 70 characters and the opening brief to one-to-three sentences. A tiny change does not need artificial sections; a large change must not collapse into one screenshot and one paragraph.

## Diff-to-HTML mapping

- **Schema or migration:** show resulting entities, fields, types, relations, and per-field added/modified/removed/renamed status. Include the old value for type or name changes. Show literal SQL only when its exact statement matters.
- **API, action, or route:** show method, path, parameters, request, responses, authorization, and compatibility status. Keep examples valid single JSON values with no comments or trailing commas.
- **Compatibility-sensitive behavior:** place a concise breaking/risky/ non-breaking note beside the affected contract and pair it with the exact hunk.
- **Meaningful replacement:** use a split diff by default, with a one-line intent summary and annotations anchored to exact before/after lines.
- **New file or one-sided addition:** use annotated code rather than an empty split comparison.
- **File operation:** show added, removed, modified, or renamed status and a short evidence-based note.
- **Rendered UI or interaction:** show the visible delta before code excerpts. Include role, permission, loading, empty, error, destination, and persistent states when the diff changes them.
- **Architecture or data flow:** use a two-dimensional HTML/CSS or inline-SVG diagram. Do not substitute an architecture box diagram for visible UI.
- **Narrative:** reserve free prose for objective, decisions visible in the change, compatibility, risk, and reviewer guidance.

## HTML contract

- Emit exactly one complete HTML document with `<!doctype html>`, `html`, `head`, and `body`.
- Embed all CSS and JavaScript. Use native browser APIs and keep essential content available without JavaScript.
- Use CSS custom properties with light and dark color schemes. Make the document responsive, printable, keyboard-accessible, and usable at 200% zoom.
- Use stable section IDs and a compact table of contents for substantial recaps.
- Escape repository content before inserting it into HTML. Treat copied diff content as text, never executable markup.
- Do not run or embed repository code. Do not add forms that submit data or scripts that access external services.
- Every visible button, tab, filter, and link must work. Otherwise render it as non-interactive text.
- Preserve exact whitespace in code and diff excerpts. Provide horizontal scrolling within code surfaces without causing page-level overflow.
- Make additions, removals, and annotations understandable without color alone.

## UI coverage

When rendered UI changed, prose and code are insufficient. Cover:

- The entry surface where the change appears
- The interaction surface that opens or changes
- The resulting destination or persistent state
- Access/role variants when permissions change
- Empty, loading, error, destructive, or unavailable states when implemented

Use before/after when direct placement comparison adds value; use after-only for pure additions; use a sequence when behavior depends on flow. Ground labels and states in the diff. Explicitly mark visual details inferred from code rather than captured from the running application.

## Revision behavior

When the user gives feedback, edit the existing HTML recap so it still covers the complete comparison. Re-read the current artifact and only the relevant diff hunks, preserve unaffected evidence and interactions, rerun truth/security and visual validation, and return the updated artifact.
