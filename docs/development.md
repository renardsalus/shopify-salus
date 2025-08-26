## Development Workflow

### Prerequisites
- Shopify CLI installed
- Store access with theme editing permissions
- Node.js (for Shopify CLI) and a modern browser

### Quick Start
1. Log in: `shopify login --store <your-store.myshopify.com>`
2. Serve theme locally with hot reload: `shopify theme dev`
3. Push changes to a new unpublished theme: `shopify theme push --unpublished`
4. Pull live theme (be careful): `shopify theme pull --theme <id>`

### File Editing
- Liquid: edit in `sections/`, `snippets/`, `layout/`.
- CSS/JS: edit under `assets/` and include via `theme.liquid` if not already.

### Best Practices
- Work in a development theme, not the live theme.
- Use Git branches for features; open PRs for review.
- Keep section settings backwards-compatible to avoid breaking saved content.

### Environment Tips
- For large CSS: prefer component CSS files over a single monolith.
- For JS features: initialize on `DOMContentLoaded` and handle section re-render events from the theme editor.

