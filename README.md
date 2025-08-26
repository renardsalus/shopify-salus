## Shopify Theme: Enterprise (Customized)

This repository contains a customized Shopify theme based on the Enterprise theme by Clean Canvas.

### Highlights
- Tech: Liquid templates, JSON templates, HTML, CSS, JavaScript
- Structure: `layout/`, `sections/`, `snippets/`, `assets/`, `config/`, `locales/`, `templates/`

### Directory Structure
- `layout/`: Top-level layout files like `theme.liquid`, `password.liquid`.
- `sections/`: Page-level and reusable sections (e.g., `main-product.liquid`, `header.liquid`, `slideshow.liquid`).
- `snippets/`: Reusable partials (e.g., `product-card.liquid`, `price.liquid`, `icon.liquid`).
- `assets/`: Stylesheets, scripts, and media (e.g., `main.css`, `main.js`, `variant-picker.js`).
- `templates/`: Template JSON or Liquid for route-level views.
- `config/`: Theme configuration (`settings_schema.json`, `settings_data.json`, `markets.json`).
- `locales/`: Translations.

### Development
1. Install Shopify CLI: see docs in `docs/development.md`.
2. Log in to your Shopify store and run theme server to preview.
3. Make edits in `sections/`, `snippets/`, and `assets/`.

### Documentation
- Architecture: `docs/architecture.md`
- Development workflow: `docs/development.md`
- Sections & snippets overview: `docs/sections.md`
- Storefront management guide: `docs/storefront-management.md`

