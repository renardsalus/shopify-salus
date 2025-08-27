# Metafields Guru Documentation

## Overview

Metafields Guru is used throughout the storefront to display dynamic product information, specifications, and comparison data. The theme includes a comprehensive metafield rendering system that supports various data types and formats.

## Core Metafield Rendering System

### 1. Render Metafield Snippet (`snippets/render-metafield.liquid`)
This is the central metafield rendering engine that handles all metafield types:

**Supported Metafield Types:**
- **URL**: Renders as clickable links with target="_blank"
- **Boolean**: Displays "True" or "False" with localization support
- **File Reference**: 
  - Images: Renders as `<img>` tags with proper dimensions
  - Videos: Creates download links with preview thumbnails
  - Other files: Download links with file icons
- **Date/Time**: Formatted using Shopify's date filter
- **Color**: Renders as colored div elements
- **References** (Page, Product, Variant, Collection): Clickable links to referenced content
- **Metaobject References**: Uses Shopify's metafield_tag filter
- **Lists**: Handles list types with proper comma separation
- **Rich Text**: Renders with proper HTML formatting

### 2. Metafield Configuration Format
Metafields are configured using a simple `label:namespace.key` format:

```liquid
{% comment %} Example metafield configuration {% endcomment %}
{% assign metafield_array = block.settings.spec_metafields | newline_to_br | strip_newlines | split: '<br />' %}
{% for key_value in metafield_array %}
  {% liquid
    assign parts = key_value | split: ':'
    assign label = parts.first | strip | replace: '"', ''
    assign metafield_key = parts.last | strip
    assign metafield_key_parts = metafield_key | split: "."
    assign metafield_namespace_index = metafield_key_parts | size | minus: 2
    assign metafield_key = metafield_key_parts | last
    assign metafield_namespace = metafield_key_parts[metafield_namespace_index]
    assign metafield = product.metafields[metafield_namespace][metafield_key]
  %}
{% endfor %}
```

## Implementation Locations

### 1. Product Details Section (`sections/product-details.liquid`)
- **Purpose**: Displays product specifications and custom tabs
- **Configuration**: Uses `spec_metafields` setting for specification display
- **Features**:
  - Right-aligned values option
  - Empty field handling
  - Custom empty field text
  - Collapsible/accordion display

**Example Configuration:**
```
Material:custom.material
Dimensions:custom.dimensions
Weight:custom.weight
Color Options:custom.color_options
```

### 2. Product Comparison Grid (`sections/product-comparison-grid.liquid`)
- **Purpose**: Side-by-side product comparison
- **Configuration**: Individual metafield blocks for each comparison column
- **Features**:
  - Dynamic column generation
  - Empty field handling
  - Responsive design

### 3. Product Compare Section (`sections/product-compare.liquid`)
- **Purpose**: Detailed product comparison with multiple products
- **Configuration**: Bulk metafield configuration via textarea
- **Features**:
  - Line separators between metafields
  - Error handling for invalid metafields
  - Empty field detection

## Advanced Metafield Features

### 1. List Type Handling
```liquid
{% if metafield.type contains "list." %}
  {% for item in metafield.value %}
    {% assign metafield_type = metafield.type | replace: "list.", "" %}
    {% render 'render-metafield', metafield: metafield, metafield_type: metafield_type, metafield_value: item, comma: comma %}
  {% endfor %}
{% endif %}
```

### 2. File Reference Processing
```liquid
{% if metafield_value.media_type == "image" %}
  <img src="{{ metafield_value | image_url }}" 
       height="{{ metafield_value.height }}"
       width="{{ metafield_value.width }}" 
       loading="lazy" 
       alt="{{ metafield_value.alt | json }}"/>
{% else %}
  <a href="{{ download_url }}" download class="inline-flex items-center link">
    <img src="{{ metafield_value.preview_image | image_url: width: 80 }}" class="mr-2"/>
    {{ 'products.compare.metafields.file_download' | t }}
  </a>
{% endif %}
```

### 3. Metaobject Reference Support
```liquid
{% if metafield.type contains "metaobject_reference" %}
  {{ metafield | metafield_tag: field: 'label' }}
{% endif %}
```

## Calculator Integration

### Cost Calculator (`sections/calculator-section.liquid`)
Uses metafields for product calculations:

```liquid
{% capture 'allMetaFields' %}
  {
    {% for collection in collections %}
      {% paginate collection.products by 250 %}
        {% for product in collection.products %}
          "{{ product.handle }}" : {
            product_ampere: "{{product.metafields.custom.amps}}",
            product_voltage: "{{product.metafields.custom.voltage}}",
          },
        {% endfor %}
      {% endpaginate %}
    {% endfor %}
  }
{% endcapture %}
```

**Required Metafields:**
- `product.metafields.custom.amps` - Product amperage rating
- `product.metafields.custom.voltage` - Product voltage rating

## Metafield Management

### Adding New Metafields
1. **Create in Shopify Admin**: Settings → Custom data → Products
2. **Configure in Theme**: Add to appropriate section settings
3. **Test Display**: Verify rendering in theme editor

### Best Practices
- **Naming Convention**: Use descriptive names (e.g., `custom.material_type`)
- **Data Types**: Choose appropriate types for content
- **Validation**: Test with various product types
- **Performance**: Limit metafield usage in loops

### Troubleshooting
- **"Liquid error"**: Check metafield namespace/key syntax
- **Empty values**: Verify metafield data is populated
- **Rendering issues**: Check metafield type compatibility
- **Performance**: Monitor metafield query impact

## Integration with Globo Product Options

### Shared Metafields
Some metafields are used by both systems:
- `variant.metafields.global.description` - Globo tooltips + general display
- `variant.metafields.custom.real_price` - Globo price comparison + specifications

### Combined Usage
```liquid
{% comment %} Example of combined metafield usage {% endcomment %}
{% if variant.metafields.global.description != blank %}
  {% comment %} Used by Globo for tooltips {% endcomment %}
  <div class="globo-tooltip-content">{{ variant.metafields.global.description }}</div>
{% endif %}

{% comment %} Used by Metafields Guru for specifications {% endcomment %}
{% if product.metafields.custom.specifications != blank %}
  <div class="product-specs">{{ product.metafields.custom.specifications }}</div>
{% endif %}
```

## Support and Resources

### Documentation References
- [Metafields Guru Documentation](https://help.metafieldsguru.com/)
- [Shopify Metafields Guide](https://help.shopify.com/en/manual/metafields)
- [Theme Development Best Practices](https://shopify.dev/themes/best-practices)

### Contact Information
- **Metafields Guru Support**: Available through the app's support system
- **Theme Development**: Contact your development team for custom modifications
- **Shopify Support**: For platform-related issues

---

*This documentation should be updated whenever Metafields Guru integration is modified or enhanced.*
