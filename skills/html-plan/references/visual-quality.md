# HTML visual quality

Read this file before creating any screen, storyboard, prototype, or diagram.

## Surface choice

- Use a browser frame for a web page whose browser context matters.
- Use a desktop frame for a full application shell.
- Use a mobile frame only when mobile behavior is in scope.
- Use a compact popover frame for menus and dropdowns.
- Use a panel frame for sheets, inspectors, and sidebars.
- Do not manufacture desktop and mobile variants unless responsive behavior changes the decision under review.

For small sub-surfaces, show the full app context once, then zoom into a separate compact frame. Do not redraw the whole page around every popover or dialog.

## UI fidelity

Inspect the real application before drawing an existing screen. Match its shell, navigation density, toolbar placement, typography hierarchy, labels, counts, states, and control locations. Modify the delta instead of redesigning the page.

Use real product content rather than lorem ipsum or gray placeholder bars. Skeleton/loading states are the exception: use neutral, textless geometry.

Product screens remain pure. Do not put repository paths, architecture arrows, database names, or implementation notes inside the simulated application. Place those in captions, annotations, diagrams, or document sections.

## Layout

- Use Grid and Flexbox with `gap`, `min-width: 0`, and safe overflow.
- Avoid negative margins, absolute positioning for primary layout, and fragile fixed child widths.
- Give every frame meaningful inner padding and an explicit content rhythm.
- Keep intentional one-line labels from wrapping; ellipsize or scroll them.
- Fill the frame without large accidental empty bands.
- Make persistent top and bottom bars span the frame. Use flex spacers to keep trailing actions aligned; pin bottom bars with a flexing body.
- Keep comparable before/after frames at the same size, density, and unchanged content. Put state labels outside the simulated product UI.

## Storyboards and prototypes

Use one panel per user-visible state. Connect only adjacent transitions and keep labels in open space. For multi-step flows, add a working prototype rather than only static frames.

Implement prototypes as a small state machine:

- Give each screen a stable ID.
- Use buttons and links with explicit transition targets.
- Preserve the same labels and states used by the static reference.
- Include back, cancel, error, empty, loading, and success behavior when those states affect the decision.
- Make the initial screen and reset behavior obvious.
- Keep navigation functional with keyboard and pointer input.

## Architecture diagrams

Put a diagram next to the recommendation it supports. Prefer:

- Layered boundaries for ownership and dependency direction
- Swimlanes for cross-system behavior
- Matrices for responsibilities or modes
- Paired current/target panels for structural change
- State diagrams for lifecycle behavior

Use inline SVG only when lines or spatial relationships matter; use semantic HTML boxes and CSS Grid when they are sufficient. Add accessible captions and text alternatives. Keep labels short, leave whitespace around nodes, and prevent connectors from crossing labels.

## Styling system

Define a restrained token set with CSS custom properties for page, surface, text, muted text, border, accent, warning, success, radius, and shadow. Provide dark-scheme overrides. Use color to encode meaning, not decoration.

Do not turn the plan into a landing page. Favor document typography, quiet surfaces, compact navigation, subtle borders, and a limited accent. Use shadow only when it clarifies stacking or reproduces a real product surface.

## Accessibility and resilience

- Use landmarks, headings in order, labels, fieldsets, buttons, and links.
- Show visible focus states and do not rely on color alone.
- Respect `prefers-reduced-motion`.
- Keep essential content available without JavaScript.
- Avoid hover-only disclosure.
- Make SVGs accessible or mark purely decorative SVGs hidden.
- Test at narrow width, normal desktop width, 200% zoom, and print.

## Visual QA

Before handoff, inspect every state and fix:

- Overlap, clipping, accidental scrollbars, or excessive whitespace
- Low contrast in either color scheme
- Broken tabs, links, transitions, copy controls, or form behavior
- Misleading controls that look active but do nothing
- Unreadable diagrams or code
- Frames that do not resemble the product being changed
- Duplicate visuals that repeat rather than clarify
