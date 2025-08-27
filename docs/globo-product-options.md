# Globo Product Options Documentation

## Overview

Globo Product Options is a Shopify app that allows you to add custom product options, add-ons, and bundles to your products. This documentation covers how Globo is implemented and customized in your storefront.

## App Integration

### App Installation
- **App ID**: `globo-product-option`
- **Block Type**: `shopify://apps/globo-product-option/blocks/app-embed-block/fdc9fad5-1a0f-4bd4-9c8a-1af6a6eef6b8`
- **Location**: `config/settings_data.json` - Embedded as a theme app block

### Product Tagging
Products with Globo options are tagged with `globo-product-options` to:
- Exclude them from product recommendations
- Hide them from predictive search results
- Identify them for special handling

## Implementation Details

### Core Integration Files

#### 1. Main Product Section (`sections/main-product.liquid`)
- **Lines 1077-1202**: Contains Globo-specific JavaScript for:
  - Quick banner add-to-cart button integration
  - Klaviyo tracking integration
  - Option item styling and checkbox functionality
  - Copy link functionality

#### 2. Globo Tooltip Modifications (`snippets/modify-globo-tooltip.liquid`)
This is the main customization file that enhances Globo's default functionality:

**Key Features:**
- **Variant Metafields Integration**: Pulls data from `variant.metafields.global.description`
- **Real Price Display**: Uses `variant.metafields.custom.real_price` for price comparison
- **Mobile Popup System**: Creates custom mobile popups for option details
- **Tooltip Styling**: Customizes tooltip appearance and behavior

### Metafields Integration

#### Required Metafields
1. **`variant.metafields.global.description`** (Global namespace)
   - **Purpose**: Provides detailed descriptions for Globo option tooltips
   - **Usage**: Displayed in enhanced tooltips when hovering over options

2. **`variant.metafields.custom.real_price`** (Custom namespace)
   - **Purpose**: Stores the original/real price for price comparison
   - **Usage**: Shows "SAVE $X" calculations in tooltips
   - **Format**: Numeric value (e.g., "299.99")

#### Metafield Setup
```liquid
{% comment %} Example of how metafields are processed {% endcomment %}
{% for product in collections['uncategorized'].products %}
  {% for variant in product.variants %}
    {% if variant.metafields.global.description != blank %}
      {% assign variant_metafields_string = variant_metafields_string | append: variant.id | append: '<delimiter_first>' | append: variant.metafields.global.description | append: '<delimiter_second>' %}
    {% endif %}
  {% endfor %}
{% endfor %}
```

## Custom Features

### 1. Enhanced Tooltips
- **Width**: Expanded to 500px for better readability
- **Typography**: Custom font sizes and spacing
- **Content**: Displays variant descriptions from metafields
- **Price Comparison**: Shows original price vs. current price with savings

### 2. Mobile Popup System
- **Trigger**: Click on option inputs on mobile devices (≤768px width)
- **Content**: Cloned tooltip content in a modal overlay
- **Styling**: Dark theme with custom close button
- **Accessibility**: Proper focus management and keyboard navigation

### 3. Price Comparison Display
```javascript
// Example of price comparison logic
if (addOn) {
  const value = addOn.textContent.trim();
  const valNum = value.match(/[\d,]+/)[0].replace(/,/g, "");
  
  // Current price
  priceCurr.textContent = "$" + parseInt(valNum).toLocaleString("en-US") + " USD";
  
  // Original price (if available)
  if (vrpMap.has(val)) {
    priceWas.textContent = `$${parseInt(vrpMap.get(val)).toLocaleString("en-US")} USD`;
    savePrice.textContent = `SAVE $${(parseInt(vrpMap.get(val)) - parseInt(valNum)).toLocaleString("en-US")}`;
  }
}
```

### 4. Option Item Enhancements
- **Checkbox Marks**: Visual indicators for selected options
- **Styling**: Custom background colors and border styling
- **Event Handling**: Prevents default click behavior for better UX

## Product Filtering

### Exclusion from Recommendations
```liquid
{% unless product.tags contains 'globo-product-options' %}
  {% comment %} Only show non-Globo products in recommendations {% endcomment %}
{% endunless %}
```

### Exclusion from Search
```liquid
{% unless item.tags contains 'globo-product-options' or item.handle == "responder-discount" %}
  {% comment %} Hide Globo products from predictive search {% endcomment %}
{% endunless %}
```

## Styling and CSS

### Mobile Popup Styling
```css
.globo-popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  color: white;
}

.globoPopUp-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #212C36;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 92%;
  max-height: 450px;
  padding: 15px;
}
```

### Tooltip Enhancements
- **Width**: 500px for better content display
- **Typography**: 16px title, 14px description
- **Spacing**: Custom margins and padding
- **Scroll**: Max height with overflow for long descriptions

## JavaScript Functionality

### Key Functions

#### 1. `onArrayChange(newArray)`
- Monitors variant selection changes
- Updates tooltip content dynamically
- Injects metafield descriptions into tooltips

#### 2. `priceCompareAndBuildModal()`
- Processes price comparisons
- Creates mobile popups
- Sets up event listeners for mobile interaction

#### 3. `createPopup(index)`
- Generates mobile popup HTML structure
- Includes close button functionality
- Applies responsive styling

### Event Listeners
- **DOM Ready**: Initializes all Globo functionality
- **Mutation Observer**: Watches for dynamic content changes
- **Click Events**: Handles mobile popup triggers
- **Window Resize**: Responsive behavior management

## Management and Maintenance

### Adding New Globo Products
1. **Install Globo app** on the product
2. **Configure options** in Globo admin
3. **Add metafields**:
   - `variant.metafields.global.description` for tooltip content
   - `variant.metafields.custom.real_price` for price comparison
4. **Tag product** with `globo-product-options`

### Updating Metafields
- Use Shopify Admin → Settings → Custom data
- Update both global and custom namespace metafields
- Test tooltip display and price calculations

### Troubleshooting
- **Tooltips not showing**: Check metafield values and variant IDs
- **Price comparison issues**: Verify `real_price` metafield format
- **Mobile popups not working**: Check JavaScript console for errors
- **Styling issues**: Verify CSS classes and responsive breakpoints

## Integration with Metafields Guru

### Shared Metafields
Some metafields are used by both Globo Product Options and Metafields Guru:
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

**Note**: For detailed Metafields Guru documentation, see [`docs/metafields-guru.md`](metafields-guru.md).

## Support and Resources

### Documentation References
- [Globo Product Options App Documentation](https://help.globosoftware.net/)
- [Shopify Metafields Guide](https://help.shopify.com/en/manual/metafields)
- [Theme Development Best Practices](https://shopify.dev/themes/best-practices)

### Contact Information
- **Globo Support**: Available through the app's support system
- **Theme Development**: Contact your development team for custom modifications
- **Shopify Support**: For platform-related issues

---

*This documentation should be updated whenever Globo functionality is modified or enhanced.*
