# HTML recap visual quality

Read this file before creating UI comparisons, state sequences, or diagrams.

## UI comparison

Inspect the changed components and surrounding application shell. Use real labels, controls, counts, states, and placement from the diff and repository. Do not invent a redesign around a small change.

Choose the smallest useful representation:

- Before/after for a moved, removed, replaced, reordered, or visibly changed control
- After-only for a purely additive surface where absence adds no insight
- State sequence for flows, permissions, responsive behavior, or interaction
- Focused popover/panel/dialog frame for a compact surface

For UI-heavy work, cover the entry point, opened interaction, and resulting state. Add role, visibility, empty, loading, error, destructive, and unavailable states when they are part of the change.

Keep comparable frames at the same size, scale, shell, padding, and density. Place “Before” and “After” outside the simulated product UI. Mark inferred visual details in a caption.

## Screen construction

- Use semantic HTML with Grid/Flexbox, `gap`, and `min-width: 0`.
- Match browser, desktop, mobile, popover, or panel geometry to the real surface.
- Do not manufacture mobile coverage when responsive behavior did not change.
- Keep product screens free of file paths, architecture labels, and review callouts; place those outside the frame.
- Use real content. Reserve textless neutral geometry for loading skeletons.
- Make persistent bars span the frame and pin bottom bars with flex layout.
- Avoid fragile absolute positioning, negative margins, and fixed child widths.
- Preserve intentional single-line controls with ellipsis or scrolling.

## Diff surfaces

Give split diffs enough width for parallel reading. On narrow screens, stack before and after without losing labels. Preserve whitespace and line numbers. Use both symbols/labels and color to distinguish additions and removals.

Put multiple key files into functional horizontal tabs. Keep tab labels short but unambiguous and ensure keyboard navigation follows ARIA tab behavior.

Annotations must visibly connect to exact lines without covering code. Use a gutter or expandable notes rather than floating overlays.

## Diagrams

Use current/target panels, layers, swimlanes, responsibility matrices, or state diagrams. Use a linear arrow chain only for a true sequence. Put diagrams beside the claim they explain and include a caption/text alternative.

Prefer semantic HTML boxes and CSS Grid; use inline SVG when connectors or spatial relationships require it. Keep labels short, leave whitespace, and prevent connectors from crossing labels.

## Styling

Use a restrained document system: readable typography, compact navigation, quiet surfaces, subtle borders, and one accent family. Define CSS custom properties for light and dark schemes. Avoid landing-page heroes, gradients, decorative metrics, gratuitous cards, and hard-coded light-only palettes.

## Visual QA

Inspect normal desktop, narrow width, 200% zoom, dark mode, keyboard operation, and print. Fix overlap, clipping, unreadable diffs, accidental page overflow, broken tabs, low contrast, misleading inactive controls, excessive whitespace, and frames that do not resemble the changed product.
