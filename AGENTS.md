<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Icons and SVG (follow every time)

Do not leave reusable SVG inline in components. Put icons in `src/assets/`, wire them in `src/assets/index.js`, and import from `@/assets`. See `docs/PROJECT_RULES.md` and `.cursor/rules/svg-assets.mdc`.
