# HTML plan exemplar

Use these examples as a quality check, not as a fixed template.

## Good: UI-first

The document opens with a compact title, outcome, and status summary, followed by realistic application frames showing the current and proposed state. The frames reuse the existing shell and real labels. A multi-step change includes a working prototype with aligned screen IDs and a reset control.

Below the visuals, the document explains the implementation delta: concrete files and symbols, existing components to reuse, state transitions, API or data contracts, risks, ordered steps, and realistic verification. The prose does not repeat the screens. Genuine unresolved choices appear once at the bottom with a recommended default and a copy-feedback control.

## Good: architecture-first

There is no decorative top canvas. The plan opens with the recommendation and done criteria. Each major claim is followed by repository evidence and a nearby two-dimensional diagram—layers, ownership regions, current/target boundaries, or a responsibility matrix. Ordered steps name actual files, contracts, migrations, and tests. The final verification includes failure and rollback behavior where relevant.

## Good: broad product architecture

One concrete product state near the top makes the proposal legible, followed by a separate mechanics diagram. The narrative distinguishes reusable core, application/provider adapters, launch scope, and deferred examples. It covers contracts, sync or ownership boundaries, rollout, non-goals, and verification without collapsing the architecture into the first use case.

## Bad

- A marketing landing page with a hero, slogans, gradients, and feature cards instead of an implementation plan.
- Generic diagrams unsupported by repository evidence.
- A UI mockup that redesigns the whole product for a small requested change.
- File paths, database labels, or implementation arrows embedded in a product screen.
- A multi-step flow represented only by static cards when interaction is the decision.
- Hard-coded light colors that fail in dark mode.
- Absolute-positioned layouts that overlap at narrow widths.
- Placeholder bars, lorem ipsum, fake buttons, broken tabs, or controls that do nothing.
- Repeating the same wireframe, decision, or open question in multiple places.
- Referring to prior chat or calling the artifact a revision instead of making it a standalone proposal.
