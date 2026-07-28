# HTML recap exemplar

Use these examples as a quality bar, not as a fixed template.

## Good: multi-file auth change

The recap opens with realistic login before/after frames. Two short paragraphs explain the capability and compatibility risk. An exact session-model view marks added and modified fields; an endpoint view shows the refresh route, auth, and parseable request/response bodies. The changed-file tree covers the whole work unit. Five horizontal tabs show focused, split diffs or annotated new code for the route, session logic, persistence, UI, and tests. Each has one intent sentence and a few line-level notes. Executed checks are distinct from tests merely present in the diff.

## Good: UI-heavy change

The headline covers the entry control, opened popover, role-specific state, and resulting page. Before/after frames preserve unchanged chrome and place state labels outside the app. Visual details inferred from code are labeled. The body does not redraw the UI; it maps changed components, permissions, actions, and tests to focused evidence.

## Good: backend architecture shift

There is no decorative UI header. A current/target layered diagram shows the ownership boundary that moved. Exact contract and file sections follow, then key diffs for the adapter, core service, persistence, and tests. Operational risk and rollback behavior are grounded in changed code or clearly labeled as inference.

## Bad

- One huge raw diff with no structure, summaries, or annotations
- One screenshot and one sentence for a large work unit
- Generic architecture boxes not derived from changed files
- A schema or endpoint summary that rounds, renames, or invents fields
- Claiming checks passed because test files changed
- A before/after UI pair that changes unrelated layout or uses placeholder copy
- Showing only the first visible control when the change adds a full flow
- Copying credentials or private values from the diff
- Marketing-page styling, broken tabs, clipped code, or light-only colors
- Recapping only the latest fix while omitting the original task-owned changes
