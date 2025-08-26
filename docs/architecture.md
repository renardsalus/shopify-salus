## Architecture Overview

This theme follows Shopify Online Store 2.0 conventions and extends the Enterprise theme by Clean Canvas.

### Key Folders
- `layout/`: Global wrappers and HTML shell.
- `sections/`: Modular, customizable blocks that can be assigned to templates.
- `snippets/`: Reusable partials used by sections/templates.
- `assets/`: Static assets (CSS, JS, images, SVGs).
- `templates/`: Route-level templates (JSON/Liquid) composing sections.
- `config/`: Theme settings schema and store-specific settings data.
- `locales/`: Translation files for theme text.

### Entry Points
- `layout/theme.liquid`: Global layout, header/footer, script/style includes.
- `sections/header.liquid`: Complex navigation and header logic.
- `sections/main-product.liquid`: Product PDP composition and dynamic features.

### JavaScript
- `assets/main.js`: Core behavior and utilities.
- Feature scripts: `variant-picker.js`, `product-form.js`, `predictive-search.js`, `cart-items.js`, etc.

### Styles
- `assets/main.css`, `responsive.css`, component styles like `product.css`, `cart-items.css`.

### Configuration
- `config/settings_schema.json`: Defines theme settings and editor controls.
- `config/settings_data.json`: Store-specific values for settings.

### Conventions
- Prefer snippets for repeated UI.
- Keep section settings minimal and use presets where possible.
- Use data attributes to bind JS behavior.

