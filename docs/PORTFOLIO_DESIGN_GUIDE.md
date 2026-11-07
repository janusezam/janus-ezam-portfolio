# Portfolio Design Guide — Janus Ezam Tagud

Use this document as the design contract for every future portfolio change. Keep the site recognizable, cohesive, and polished as it grows. Treat the existing project and its design tokens as the source of truth; do not redesign unrelated parts of the site when making a focused update.

## Reusable instruction for an AI

> Update my portfolio while following `PORTFOLIO_DESIGN_GUIDE.md`. First inspect the existing page, shared styles, and components that the request affects. Reuse the established design system and existing patterns. Make only the changes requested, keep light and dark themes equally polished, and make sure the result works on mobile and desktop. Do not invent personal details, links, project outcomes, or credentials. Before finishing, check the changed experience in the running site and report what changed and anything that still needs real information.

## Design intent

- Present a thoughtful, capable software engineer: confident, precise, and clear rather than flashy or self-promotional.
- Keep the experience minimalist, editorial, and content-first. Every visual choice should help visitors scan the work, understand the person, or take a useful next step.
- Make every section and control feel like part of one portfolio, not a collection of unrelated templates.
- Prefer meaningful project details and specific, truthful writing over decorative filler.

## Visual language

- **Palette:** Use a restrained ink-and-paper foundation, with a quiet light surface, a deep dark surface, readable foregrounds, subtle muted text, and hairline borders. Use one blue accent sparingly for emphasis and interaction. Keep colors in the shared semantic theme tokens; do not add one-off hardcoded colors to page elements.
- **Themes:** Support both light and dark modes throughout the whole experience. Maintain readable contrast, clear borders, and visible focus states in each. Preserve the existing theme toggle and its remembered preference.
- **Typography:** Use Space Grotesk for primary text and headings, and JetBrains Mono for small labels, section indexes, metadata, and technical details. Establish a clear, consistent type hierarchy; keep small labels legible and avoid decorative type treatments.
- **Layout:** Use generous, consistent spacing, aligned content edges, restrained widths for reading, and simple responsive grids where helpful. Prefer open sections and thin dividers over nested or excessive cards. Keep related content visually grouped.
- **Shape and depth:** Keep corners modest and consistent. Use borders rather than shadows to define separation. Avoid gradients, glass effects, glow, ornamental blobs, marquee text, and unnecessary animation.
- **Imagery:** Use imagery only when it adds real information about Janus or a project. Prefer authentic, supplied images over generic stock decoration. Ensure images crop cleanly and have useful alternative text.

## Page and component consistency

- Keep navigation, section headings, project entries, skill lists, buttons, links, metadata, and footers consistent in spacing, typography, borders, and interaction states.
- Continue the existing numbered-section convention and restrained mono labels where appropriate; do not force numbering onto small interface details.
- Reuse existing shared components and semantic theme styles before creating new visual patterns.
- Use a small, consistent set of button styles: clear primary actions and quiet secondary actions. Icon-only controls need an accessible name and a tooltip when the icon may be unfamiliar.
- Make hover, focus, active, disabled, and selected states clear without changing the underlying visual language.
- Keep controls easy to tap, keyboard accessible, and visually stable when their content changes.

## Content rules

- Keep first-person writing natural, direct, and specific. Avoid inflated claims, generic slogans, buzzword stuffing, and vague descriptions.
- Preserve supplied facts, names, dates, technologies, and project details. Never fabricate employment, metrics, results, awards, contact information, social links, or credentials.
- If a required fact or destination is missing, leave a clear placeholder only when necessary and tell Janus what real information is needed; do not silently publish a fake value.
- Describe projects by their purpose, Janus's contribution, relevant implementation details, and verified outcomes when those details are known.
- Keep copy concise and scannable. Use headings and lists when they make real content easier to understand.

## Responsive behavior and accessibility

- Make the same content and important actions available on desktop and mobile. Prevent clipping, overlap, awkward wrapping, and horizontal scrolling.
- Use semantic headings, landmarks, links, and buttons. Keep keyboard navigation logical and focus indicators visible.
- Provide sufficient contrast in both themes and descriptive alternative text for meaningful images. Do not rely on color alone to convey status.
- Respect reduced-motion preferences. Motion should be subtle, optional, and never required to understand or use the page.

## When making an update

1. Identify the exact requested change and inspect the affected page and existing design patterns.
2. Keep the scope focused; do not change personal facts, site structure, or unrelated sections without a reason in the request.
3. Prefer the established theme tokens, typography, shared components, and section rhythm. If a genuinely new pattern is needed, make it minimal and reusable.
4. Check the final result in both themes and at narrow and wide screen sizes. Confirm that text, links, controls, and project content remain usable and unclipped.
5. Summarize the visible change briefly. Call out any missing real details instead of inventing them.

## Final quality check

- Does the portfolio still feel like one calm, precise, senior-engineer-style experience?
- Are the existing colors, type, spacing, borders, and controls used consistently?
- Do light and dark themes both look intentional and readable?
- Does the update work on mobile and desktop without overlap or clipping?
- Are all personal and project details accurate, with no made-up claims or destinations?
- Were unrelated parts of the site left alone?