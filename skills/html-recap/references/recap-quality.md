# HTML recap quality

Read this file before authoring every recap.

## Evidence hierarchy

Use the selected diff as the source of truth. Repository context may explain a changed symbol, but it must not silently expand the comparison. Conversation context may establish ownership and intent, but it must not replace changed-line evidence.

Classify claims as:

- **Extracted:** directly present in changed lines or file metadata
- **Derived:** mechanically computed from extracted evidence
- **Inferred:** interpretation of purpose, risk, or likely behavior
- **Verified:** observed by an executed check whose result is available

Write inferred claims cautiously and identify them when a reviewer could mistake them for code-proven behavior.

## Changed-file tree

Show every included file with:

- Exact path
- Added, modified, removed, or renamed status
- Concise role in the change
- Additions/deletions when available

Group by subsystem rather than arbitrary alphabetical buckets when that improves comprehension. Do not paste code snippets into the tree unless one uniquely explains a surprising file.

## Key changes

Select the 3–8 files or hunks that carry the change:

- Entry and wiring points
- Public contracts or state shape
- Core business behavior
- Persistence and migration
- User-visible behavior
- Authorization/security boundaries
- Tests that demonstrate the intended contract

Give every excerpt a one-line intent summary. Annotate only high-signal lines: new contract, branching behavior, security check, state transition, persistence boundary, or test assertion. Do not annotate every line.

Use split before/after for actual replacement. Use annotated one-sided code for new files and large additions. Keep excerpts focused; elide irrelevant regions explicitly rather than silently altering code.

## Contract views

For schemas, show entity and field change status and preserve old types/names where relevant. For APIs, show method, path, auth, inputs, outputs, and error shapes. Keep JSON examples individually parseable.

Mark:

- Breaking behavior
- Risky but compatible behavior
- Non-breaking additions
- Migration or rollout requirements
- Removed/deprecated contracts

Do not infer a contract from call-site naming alone when the defining change is not present.

## Outcome narrative

Use one-to-three short paragraphs to explain:

- What capability or behavior changed
- Why the diff appears to make that change
- The most important compatibility or operational risk

Do not repeat file counts, comparison provenance, or content already obvious from the file tree.

## Verification evidence

Separate:

- Tests added or changed
- Checks actually executed and their results
- Manual behavior observed
- Important paths not verified

Never convert “a test exists” into “the change passes.” If execution evidence is unavailable, say so concisely in the handoff or verification section.

## Reviewer attention

Call out a small number of grounded review targets only when they materially help: compatibility, data safety, auth boundaries, failure behavior, concurrency, rollback, or missing coverage. A recap is not a generic findings generator; do not invent speculative defects to make the artifact look rigorous.

## Security

Before embedding any source text, scan for tokens, API keys, cookies, passwords, connection strings, signing material, private webhook URLs, personal data, and `.env` values. Replace sensitive substrings with clear redactions while preserving enough structure to understand the change. Mention material redaction without revealing the value.
