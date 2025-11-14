# LithoData Premium Pricing Calculator - Complete Specification

## Overview
An interactive pricing calculator that allows users to select multiple data types and geographic regions, then calculates the total annual cost with an automatic discount structure. The calculator uses a matrix pricing model where cost = data types × regions, with volume discounts applied to additional data types.

---

## 1. USER INTERFACE REQUIREMENTS

### 1.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER SECTION                                              │
│ - Title: "LithoData Premium Pricing Calculator"            │
│ - Subtitle: "Build your custom data package..."            │
│ - Toggle Button: "Calculate Your Price" with chevron icon  │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ COLLAPSIBLE CALCULATOR CONTENT (hidden by default)         │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │ DATA TYPES COLUMN    │  │ REGIONS COLUMN       │      │
│  │ - Title              │  │ - Title              │      │
│  │ - Help text          │  │ - Help text          │      │
│  │ - Checkboxes (6)     │  │ - Checkboxes (9)     │      │
│  └──────────────────────┘  └──────────────────────┘      │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ PRICING SUMMARY SECTION                                 ││
│  │ - Breakdown of costs per data type                      ││
│  │ - Total price display                                   ││
│  │ - Action buttons (Contact Sales, Explore Free)         ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Design Specifications

#### Header Section
- **Title**: Large, bold heading (24-32px)
- **Subtitle**: Secondary text (14-16px), gray color
- **Toggle Button**:
  - Full-width button with text and chevron icon
  - Icon rotates 180° when expanded
  - Smooth transition animation (0.3s ease)

#### Calculator Content (Collapsible)
- **Initial State**: Hidden (display: none or max-height: 0)
- **Expanded State**: Smoothly animates open
- **Background**: Light background color, rounded corners
- **Padding**: Generous spacing (2-3rem)

#### Data Types Column
- **Header**: "Data Types" (bold, 18-20px)
- **Help Text**: "Select the data types you need" (gray, 14px)
- **Checkboxes**: 6 options displayed as chip-style buttons
  - Geochemistry
  - Isotopes
  - Geochronology
  - Thermochronology
  - Vitrinite Reflectance
  - Mineral Deposits

#### Regions Column
- **Header**: "Regions" (bold, 18-20px)
- **Help Text**: "Select your geographic coverage" (gray, 14px)
- **Checkboxes**: 9 options displayed as chip-style buttons
  - Antarctica
  - Oceania
  - South America
  - Africa
  - Arabia
  - Asia
  - North America
  - Europe
  - Central Asia

#### Chip-Style Checkbox Design
```css
UNCHECKED STATE:
- Border: 2px solid light gray
- Background: white
- Text: dark gray
- Cursor: pointer
- Hover: slight shadow or border color change

CHECKED STATE:
- Border: 2px solid primary color (blue/green)
- Background: primary color (light shade)
- Text: primary color (dark shade)
- Checkmark or indicator visible
```

#### Pricing Summary Section
- **Breakdown Area**:
  - List of selected combinations
  - Format: "DataType × N region(s) (discount%)"
  - Show individual costs per line
  - Right-aligned prices

- **Total Price Display**:
  - Large, prominent typography (32-40px)
  - Label: "Estimated Annual Cost"
  - Value: "$XXX,XXX AUD/year"
  - Special case: "Talk to Sales" if > $200,000

- **Action Buttons**:
  - Primary button: "Contact Sales" (links to #contact)
  - Secondary button: "Explore LithoData Free" (external link)

---

## 2. PRICING LOGIC & CALCULATION

### 2.1 Core Pricing Formula

```javascript
BASE_PRICE = 25000; // $25,000 AUD per data type per region

// Discount Structure (applied to each data type sequentially)
DATA_TYPE_DISCOUNTS = {
  1: 0.00,  // 1st data type: Full price (0% discount)
  2: 0.25,  // 2nd data type: 25% off
  3: 0.50,  // 3rd data type: 50% off
  4+: 0.75  // 4th+ data types: 75% off
};

// Calculation per data type:
pricePerRegion = BASE_PRICE × (1 - discount)
dataTypeCost = pricePerRegion × selectedRegionCount

// Total:
totalCost = sum(all dataTypeCosts)
```

### 2.2 Calculation Examples

#### Example 1: Simple Calculation
**Selections**: 1 data type, 2 regions

```
Data Type 1 (Geochemistry):
  Price per region: $25,000 × (1 - 0) = $25,000
  Total: $25,000 × 2 = $50,000

TOTAL: $50,000 AUD/year
```

#### Example 2: Multi-Data Type with Discounts
**Selections**: 3 data types, 4 regions

```
Data Type 1 (Geochemistry):
  Discount: 0% (full price)
  Price per region: $25,000
  Total: $25,000 × 4 = $100,000

Data Type 2 (Isotopes):
  Discount: 25%
  Price per region: $25,000 × 0.75 = $18,750
  Total: $18,750 × 4 = $75,000

Data Type 3 (Geochronology):
  Discount: 50%
  Price per region: $25,000 × 0.50 = $12,500
  Total: $12,500 × 4 = $50,000

TOTAL: $225,000 AUD/year → Display "Talk to Sales"
```

#### Example 3: Maximum Discount
**Selections**: 5 data types, 3 regions

```
Data Type 1: $25,000 × 3 = $75,000
Data Type 2: $18,750 × 3 = $56,250 (25% off)
Data Type 3: $12,500 × 3 = $37,500 (50% off)
Data Type 4: $6,250 × 3 = $18,750 (75% off)
Data Type 5: $6,250 × 3 = $18,750 (75% off)

TOTAL: $206,250 AUD/year → Display "Talk to Sales"
```

### 2.3 Special Display Rules

```javascript
if (selectedDataTypes.length === 0 || selectedRegions.length === 0) {
  display: "Select data types and regions to see pricing"
  totalPrice: "$0 AUD/year"
}

if (totalCost > 200000) {
  display: "Talk to Sales" (instead of exact price)
  // Indicates custom enterprise pricing needed
}
```

---

## 3. INTERACTIVE BEHAVIORS

### 3.1 Toggle Functionality

```
INITIAL STATE:
- Calculator content is hidden
- Toggle button shows "Calculate Your Price"
- Chevron icon points DOWN

ON CLICK:
- Toggle button adds "active" class
- Chevron icon rotates 180° (points UP)
- Calculator content smoothly expands (max-height transition)
- Smooth scroll to calculator (if needed)

ON SECOND CLICK:
- Reverse all animations
- Content collapses back to hidden state
```

### 3.2 Real-Time Calculation

```
TRIGGER: On any checkbox change (data type or region)

PROCESS:
1. Get all checked data type checkboxes → count them
2. Get all checked region checkboxes → count them
3. Clear previous pricing breakdown display
4. If either count is 0:
   - Show help message
   - Display $0 total
   - Exit
5. Loop through each selected data type (in order):
   - Calculate discount based on position (1st, 2nd, 3rd, 4th+)
   - Calculate cost: pricePerRegion × regionCount
   - Add to breakdown display
   - Add to running total
6. Update breakdown HTML
7. Update total price display
8. Apply special rules (Talk to Sales if > $200k)
```

### 3.3 Visual Feedback

```
CHECKBOX STATES:
- Hover: Border color change, slight shadow
- Click: Immediate visual toggle (checked/unchecked)
- Checked: Background color, border color, text color change

BREAKDOWN DISPLAY:
- Each line shows: "DataType × N regions (discount)"
- Discounts highlighted in smaller, colored text
- Prices right-aligned with currency formatting
- Smooth fade-in when appearing

TOTAL PRICE:
- Large, bold typography
- Currency formatting with commas (e.g., $125,000)
- Color emphasis on the number
- "Talk to Sales" styled differently (smaller font, different color)
```

---

## 4. DATA STRUCTURES

### 4.1 Data Type Options

```javascript
const dataTypes = [
  { value: 'geochemistry', label: 'Geochemistry' },
  { value: 'isotopes', label: 'Isotopes' },
  { value: 'geochronology', label: 'Geochronology' },
  { value: 'thermochronology', label: 'Thermochronology' },
  { value: 'vitrinite', label: 'Vitrinite Reflectance' },
  { value: 'minerals', label: 'Mineral Deposits' }
];
```

### 4.2 Region Options

```javascript
const regions = [
  { value: 'antarctica', label: 'Antarctica' },
  { value: 'oceania', label: 'Oceania' },
  { value: 'south-america', label: 'South America' },
  { value: 'africa', label: 'Africa' },
  { value: 'arabia', label: 'Arabia' },
  { value: 'asia', label: 'Asia' },
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'central-asia', label: 'Central Asia' }
];
```

### 4.3 Pricing Configuration

```javascript
const pricingConfig = {
  basePrice: 25000,           // Base price per data type per region
  currency: 'AUD',            // Currency code
  priceThreshold: 200000,     // Threshold for "Talk to Sales"
  discounts: {
    first: 0.00,              // No discount on first data type
    second: 0.25,             // 25% discount on second
    third: 0.50,              // 50% discount on third
    fourth_plus: 0.75         // 75% discount on 4th and beyond
  }
};
```

---

## 5. IMPLEMENTATION PSEUDOCODE

### 5.1 Main Calculation Function

```javascript
function calculatePrice() {
  // 1. Get selections
  const selectedDataTypes = getCheckedCheckboxes('dataType');
  const selectedRegions = getCheckedCheckboxes('region');

  const dataTypeCount = selectedDataTypes.length;
  const regionCount = selectedRegions.length;

  // 2. Handle empty state
  if (dataTypeCount === 0 || regionCount === 0) {
    displayEmptyState();
    return;
  }

  // 3. Calculate costs
  let totalCost = 0;
  let breakdownItems = [];

  selectedDataTypes.forEach((dataType, index) => {
    // Determine discount
    let discount = getDiscount(index);
    let discountLabel = getDiscountLabel(index);

    // Calculate cost for this data type
    const pricePerRegion = BASE_PRICE * (1 - discount);
    const dataTypeCost = pricePerRegion * regionCount;
    totalCost += dataTypeCost;

    // Build breakdown item
    breakdownItems.push({
      name: formatDataTypeName(dataType.value),
      regionCount: regionCount,
      discount: discountLabel,
      cost: dataTypeCost
    });
  });

  // 4. Display results
  displayBreakdown(breakdownItems);
  displayTotal(totalCost);
}

function getDiscount(index) {
  if (index === 0) return 0.00;      // 1st
  if (index === 1) return 0.25;      // 2nd
  if (index === 2) return 0.50;      // 3rd
  return 0.75;                        // 4th+
}

function getDiscountLabel(index) {
  if (index === 0) return '';
  if (index === 1) return '(25% off)';
  if (index === 2) return '(50% off)';
  return '(75% off)';
}

function displayTotal(totalCost) {
  if (totalCost > 200000) {
    display("Talk to Sales");
  } else {
    display(`$${formatCurrency(totalCost)} AUD/year`);
  }
}
```

### 5.2 Toggle Function

```javascript
function toggleCalculator() {
  const toggle = document.getElementById('calculatorToggle');
  const content = document.getElementById('calculatorContent');

  toggle.classList.toggle('active');
  content.classList.toggle('active');

  // If opening, scroll to it
  if (content.classList.contains('active')) {
    setTimeout(() => {
      content.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  }
}
```

### 5.3 Event Listener Setup

```javascript
function initializeCalculator() {
  // Toggle button
  const toggleButton = document.getElementById('calculatorToggle');
  toggleButton.addEventListener('click', toggleCalculator);

  // Data type checkboxes
  const dataTypeCheckboxes = document.querySelectorAll('input[name="dataType"]');
  dataTypeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculatePrice);
  });

  // Region checkboxes
  const regionCheckboxes = document.querySelectorAll('input[name="region"]');
  regionCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculatePrice);
  });

  // Initialize with empty state
  calculatePrice();
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeCalculator);
```

---

## 6. STYLING REQUIREMENTS

### 6.1 Color Palette

```css
/* Primary Colors */
--primary-color: #0066CC;        /* Buttons, active states */
--primary-light: #E6F2FF;        /* Chip backgrounds when checked */
--secondary-color: #00A67E;      /* Accent color */

/* Neutral Colors */
--text-primary: #1a1a1a;         /* Main text */
--text-secondary: #666666;       /* Help text, labels */
--border-color: #e0e0e0;         /* Default borders */
--background-light: #f8f9fa;     /* Section backgrounds */

/* State Colors */
--hover-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
--checked-border: var(--primary-color);
--checked-bg: var(--primary-light);
```

### 6.2 Typography

```css
/* Headers */
.calculator-header h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

/* Column headers */
.calculator-column h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Help text */
.column-help {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

/* Total price */
.price-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary-color);
}

/* Breakdown items */
.breakdown-item {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.breakdown-discount {
  font-size: 14px;
  color: var(--secondary-color);
  margin-left: 0.5rem;
}
```

### 6.3 Animations

```css
/* Toggle icon rotation */
.toggle-icon {
  transition: transform 0.3s ease;
}

.calculator-toggle.active .toggle-icon {
  transform: rotate(180deg);
}

/* Content expansion */
.calculator-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}

.calculator-content.active {
  max-height: 2000px;
}

/* Chip hover */
.chip-item {
  transition: all 0.2s ease;
}

.chip-item:hover {
  box-shadow: var(--hover-shadow);
  transform: translateY(-2px);
}

/* Fade-in breakdown */
.breakdown-item {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 7. RESPONSIVE DESIGN

### 7.1 Breakpoints

```css
/* Desktop: 2-column layout */
@media (min-width: 768px) {
  .calculator-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

/* Mobile: Stack columns */
@media (max-width: 767px) {
  .calculator-grid {
    display: block;
  }

  .calculator-column {
    margin-bottom: 2rem;
  }

  .chip-label {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }

  .price-value {
    font-size: 28px;
  }
}
```

### 7.2 Touch Optimization

```css
/* Larger touch targets on mobile */
@media (max-width: 767px) {
  .chip-item {
    min-height: 48px; /* iOS recommended minimum */
    padding: 0.75rem 1.25rem;
  }

  .calculator-toggle {
    min-height: 56px;
    padding: 1rem;
  }
}
```

---

## 8. ACCESSIBILITY

### 8.1 Semantic HTML

```html
<!-- Use proper form elements -->
<fieldset>
  <legend>Data Types</legend>
  <label class="chip-item">
    <input type="checkbox" name="dataType" value="geochemistry">
    <span class="chip-label">Geochemistry</span>
  </label>
</fieldset>
```

### 8.2 ARIA Attributes

```html
<!-- Toggle button -->
<button
  id="calculatorToggle"
  aria-expanded="false"
  aria-controls="calculatorContent"
>
  Calculate Your Price
</button>

<!-- Content area -->
<div
  id="calculatorContent"
  role="region"
  aria-labelledby="calculatorToggle"
>
  <!-- Calculator content -->
</div>
```

### 8.3 Keyboard Navigation

- All checkboxes must be keyboard accessible (Tab, Space)
- Toggle button activates on Enter/Space
- Focus states clearly visible on all interactive elements
- Logical tab order through form elements

### 8.4 Screen Reader Support

```html
<!-- Hidden labels for screen readers -->
<span class="sr-only">
  Select data types for your subscription package
</span>

<!-- Announce price updates -->
<div
  role="status"
  aria-live="polite"
  id="totalPrice"
>
  <!-- Price dynamically updates here -->
</div>
```

---

## 9. EDGE CASES & ERROR HANDLING

### 9.1 No Selections
```
State: No data types or regions selected
Display: "Select data types and regions to see pricing"
Price: $0 AUD/year
Buttons: Still visible but could be disabled
```

### 9.2 High-Value Quotes
```
State: Total cost > $200,000 AUD
Display: "Talk to Sales" instead of exact price
Reason: Enterprise-level pricing requires consultation
Action: Emphasize "Contact Sales" button
```

### 9.3 Single Selection
```
State: Only 1 data type OR 1 region selected
Behavior: Show help text prompting for more selections
Calculate: Still show price if both sides have selections
```

### 9.4 All Selected
```
State: All 6 data types + all 9 regions
Price: Very high (would exceed $200k threshold)
Display: "Talk to Sales"
Optional: Show warning message about enterprise pricing
```

---

## 10. TESTING CHECKLIST

### 10.1 Functional Tests
- [ ] Calculator toggles open/closed correctly
- [ ] Checkboxes can be selected/deselected
- [ ] Price updates in real-time on checkbox change
- [ ] Discounts apply correctly (0%, 25%, 50%, 75%)
- [ ] Price formatting shows commas (e.g., $125,000)
- [ ] "Talk to Sales" appears when > $200,000
- [ ] Empty state shows correct message
- [ ] Breakdown shows correct line items
- [ ] Links to Contact Sales and Explore Free work

### 10.2 Visual Tests
- [ ] Chip-style checkboxes look correct (unchecked/checked)
- [ ] Toggle icon rotates smoothly
- [ ] Calculator expands/collapses smoothly
- [ ] Breakdown items align properly
- [ ] Price display is prominent and readable
- [ ] Mobile layout stacks correctly
- [ ] Hover states work on all interactive elements

### 10.3 Calculation Verification

Test these scenarios:

| Data Types | Regions | Expected Price | Notes |
|------------|---------|----------------|-------|
| 1 | 1 | $25,000 | Base price |
| 1 | 2 | $50,000 | Simple multiplication |
| 2 | 1 | $43,750 | 2nd type gets 25% off |
| 2 | 2 | $87,500 | Both types × 2 regions |
| 3 | 3 | $168,750 | Progressive discounts |
| 4 | 4 | Talk to Sales | Exceeds $200k threshold |
| 6 | 9 | Talk to Sales | Maximum selections |

### 10.4 Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 10.5 Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Works with browser zoom (up to 200%)

---

## 11. IMPLEMENTATION NOTES

### 11.1 Framework Agnostic
This specification can be implemented in:
- **Vanilla JavaScript**: As shown in original code
- **React**: Use `useState` for selections, `useEffect` for calculations
- **Vue**: Use `ref`/`reactive` for data, `computed` for totals
- **Angular**: Use form controls and reactive forms
- **Svelte**: Use stores and reactive statements

### 11.2 State Management
```javascript
// Minimal state needed:
{
  selectedDataTypes: [],      // Array of selected data type values
  selectedRegions: [],         // Array of selected region values
  isCalculatorOpen: false,     // Toggle state
  totalCost: 0,                // Calculated total
  breakdownItems: []           // Array of breakdown line items
}
```

### 11.3 API Integration (Optional)
If pricing comes from backend:
```javascript
// Fetch pricing config
async function fetchPricingConfig() {
  const response = await fetch('/api/pricing-config');
  return await response.json();
}

// Structure:
{
  basePrice: 25000,
  discounts: [0, 0.25, 0.50, 0.75],
  priceThreshold: 200000,
  dataTypes: [...],
  regions: [...]
}
```

### 11.4 Analytics Tracking (Optional)
Track user interactions:
```javascript
// Track selections
trackEvent('calculator_data_type_selected', { type: 'geochemistry' });
trackEvent('calculator_region_selected', { region: 'oceania' });

// Track price calculations
trackEvent('calculator_price_calculated', {
  dataTypes: 3,
  regions: 4,
  total: 225000
});

// Track CTA clicks
trackEvent('calculator_contact_sales_clicked', {
  estimatedPrice: 225000
});
```

---

## 12. FUTURE ENHANCEMENTS

### 12.1 Potential Features
- **Save Configuration**: Allow users to save/share their selections
- **PDF Export**: Generate a quote PDF
- **Email Quote**: Send breakdown to email
- **Compare Plans**: Show side-by-side comparisons
- **Currency Conversion**: Switch between AUD/USD/EUR
- **Bulk Discounts**: Additional discounts for multi-year subscriptions
- **Regional Pricing**: Different base prices per region
- **Custom Data Types**: Allow users to request custom data types

### 12.2 A/B Testing Ideas
- Different discount structures
- Price presentation (annual vs. monthly)
- "Talk to Sales" threshold ($200k vs. $150k)
- CTA button copy variations
- Show/hide breakdown by default

---

## 13. QUICK REFERENCE

### Pricing Formula Summary
```
Price = Σ (BASE_PRICE × DISCOUNT_FACTOR × REGION_COUNT)

Where:
- BASE_PRICE = $25,000 AUD
- DISCOUNT_FACTOR = (1 - discount)
  - 1st data type: 1.00 (no discount)
  - 2nd data type: 0.75 (25% off)
  - 3rd data type: 0.50 (50% off)
  - 4th+ data types: 0.25 (75% off)
- REGION_COUNT = number of selected regions
```

### Key Component IDs
```
calculatorToggle       - Toggle button element
calculatorContent      - Collapsible content container
pricingBreakdown       - Breakdown list display area
totalPrice             - Total price display area
input[name="dataType"] - Data type checkboxes
input[name="region"]   - Region checkboxes
```

### Critical Constants
```
BASE_PRICE = 25000
PRICE_THRESHOLD = 200000
DISCOUNTS = [0, 0.25, 0.50, 0.75]
CURRENCY = "AUD"
```

---

## 14. REPLICATION CHECKLIST

To replicate this calculator in another app:

- [ ] Set up UI structure (header, columns, summary)
- [ ] Implement chip-style checkbox components
- [ ] Create toggle functionality for expand/collapse
- [ ] Implement pricing calculation logic
- [ ] Apply discount structure correctly
- [ ] Format currency with commas and symbol
- [ ] Handle "Talk to Sales" threshold
- [ ] Add real-time calculation on checkbox change
- [ ] Style all states (default, hover, checked, active)
- [ ] Make responsive (mobile + desktop)
- [ ] Add smooth animations/transitions
- [ ] Implement accessibility features
- [ ] Test all calculation scenarios
- [ ] Add analytics tracking (optional)
- [ ] Connect to backend API (if needed)

---

## CONTACT & SUPPORT

For questions about this specification:
- Email: sales@lithodat.com
- Reference implementation: /script.js lines 360-474

---

*End of Specification Document*
*Version: 1.0*
*Last Updated: 2025*
