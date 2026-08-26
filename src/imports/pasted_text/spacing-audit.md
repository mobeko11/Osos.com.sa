Perform a complete **Spacing, Alignment, and Layout Density Audit** across the entire website.

Do not redesign the website, change the visual identity, content, colors, typography, components, or functionality.

The main goal is to make the website feel:

**Compact · Balanced · Modern · Premium · Well-aligned · Easy on the eye**

The website currently has unnecessary whitespace inside sections and between elements, making some pages longer than necessary.

Reduce unnecessary empty space while maintaining enough breathing room for readability and visual hierarchy.

Do not make the website crowded.

---

# 1. Global Spacing System

Use a limited global spacing scale:

* 4px
* 8px
* 16px
* 24px
* 32px
* 40px

Use 48px only when a larger separation is genuinely needed.

Do not use arbitrary spacing values such as:

* 13px
* 18px
* 27px
* 36px
* 55px
* 72px
* 96px

Create reusable spacing tokens and normalize the entire website around this system.

Example:

* `space-1: 4px`
* `space-2: 8px`
* `space-3: 16px`
* `space-4: 24px`
* `space-5: 32px`
* `space-6: 40px`
* `space-7: 48px` only when necessary

Use the same spacing logic across all pages and components.

---

# 2. Remove Unnecessary Whitespace

Review every page and identify empty areas that do not serve a visual or functional purpose.

Reduce unnecessary:

* Section top padding
* Section bottom padding
* Empty areas between headings and content
* Large spaces inside cards
* Excessive gaps between paragraphs
* Oversized gaps between cards
* Large vertical spaces around buttons
* Unnecessary empty areas inside containers
* Excessive Hero spacing

Do not create whitespace simply to make the page look "premium".

Whitespace should have a purpose.

The website should feel comfortable and clean, but should not force the user to scroll through large empty areas.

Prioritize content density and visual rhythm.

---

# 3. Section Spacing

Do not give every section the same large vertical padding.

Use spacing based on the actual amount of content.

### Compact sections

Use approximately:

* Top: 32px
* Bottom: 32px

### Standard sections

Use approximately:

* Top: 40px
* Bottom: 40px

### Larger visual sections

Use:

* 48px maximum when genuinely needed.

Do not use large section padding such as 80px, 96px, or 128px unless there is a specific design reason.

The goal is to reduce unnecessary page length.

---

# 4. Content Grouping

Apply spacing based on the relationship between elements.

### Very closely related

Use:

**4–8px**

Examples:

* Label → Input
* Icon → Text
* Badge → Related information
* Small metadata items

### Closely related

Use:

**16px**

Examples:

* Heading → Description
* Card title → Card description
* Form fields inside a group
* Image → Related text

### Related content groups

Use:

**24px**

Examples:

* Description → CTA
* Separate groups inside a card
* Card sections
* Form groups

### Major groups

Use:

**32px**

Examples:

* Heading block → Main content
* Different groups inside a section
* Large card content groups

### Strong separation

Use:

**40px**

Only when separating clearly different content groups.

---

# 5. Heading and Content Alignment

Review all section headers across the website.

Create a consistent structure:

### Section Label / Tag

→ 8px

### Main Heading

→ 16px

### Description

→ 24px or 32px maximum

### Main Section Content

Do not leave large empty areas between the section heading and its content.

The heading block should feel visually connected to the content below it.

---

# 6. Card Spacing

Review every card on the website.

Remove excessive internal padding.

Use:

### Small Cards

Padding:

**16px**

### Standard Cards

Padding:

**24px**

### Large Feature Cards

Padding:

**32px maximum**

Internal spacing:

* Icon → Title: 8–16px
* Title → Description: 8px
* Description → CTA: 16–24px

Do not use large empty areas inside cards when the content is short.

Cards should feel balanced and intentional, not oversized.

---

# 7. Card Grids

Standardize gaps between cards.

Use:

* 16px for compact grids
* 24px for standard grids
* 32px only for large cards

Do not use unnecessarily large gaps between cards.

Cards that belong to the same group should feel visually connected.

---

# 8. Alignment Audit

Review the alignment of all elements across the entire website.

Ensure:

* Section headings align with their content.
* Cards align consistently within grids.
* Images align with text blocks.
* Buttons align correctly with related content.
* Form elements share consistent widths and alignment.
* Section containers follow the same horizontal grid.
* Header and footer content align with the main page container.

Fix any elements that appear visually misaligned even if their technical measurements are similar.

Use optical alignment when necessary to make layouts feel visually balanced. Consistent spacing systems should guide decisions, but visual balance can require small optical adjustments.

---

# 9. Forms

Reduce unnecessary vertical space inside forms.

Use:

* Label → Input: 8px
* Input → Next Field: 16px
* Form groups: 24px
* Last field → Submit Button: 24px

Keep forms compact and easy to scan.

Do not create excessive empty space around fields.

---

# 10. Hero Sections

Review all Hero sections.

Reduce unnecessary height and empty vertical space.

The Hero should contain enough space to feel premium, but should not occupy an entire screen if the content does not require it.

Ensure:

* Heading
* Description
* CTA
* Hero visual

are visually grouped together.

Avoid separating related Hero elements with large empty gaps.

---

# 11. Responsive Spacing

Apply the same spacing logic across all screen sizes.

### Desktop

Use the full scale when necessary:

4 → 8 → 16 → 24 → 32 → 40

### Tablet

Reduce large gaps where appropriate.

### Mobile

Make the layout more compact.

Recommended preference:

* 8px for small relationships
* 16px for standard component spacing
* 24px between groups
* 32px between major blocks
* 40px maximum for most section spacing

Do not simply scale desktop spacing down proportionally.

Review each layout to prevent:

* Excessive vertical scrolling
* Large empty spaces
* Oversized cards
* Huge gaps between sections

---

# 12. Important Rule: Use Proximity

Use spacing to communicate relationships.

Elements that belong together should be closer.

Elements from different groups should have more separation.

For example:

```text
Section Label
      ↓ 8px
Main Heading
      ↓ 16px
Description
      ↓ 24px
Main Content
```

Avoid using the same spacing everywhere.

For example, do not use 32px between every element, because that makes all content appear equally unrelated.

The spacing scale should create a clear visual rhythm and hierarchy rather than simply applying the same margin everywhere. Consistent patterns help users scan pages and understand which elements belong together.

---

# Final Goal

Audit every page and component, including:

* Homepage
* Products pages
* Product detail pages
* Projects page
* Project detail pages
* Available units
* Unit cards
* Modals
* About page
* Careers page
* Media Center
* Contact page
* FAQ
* Forms
* Navbar
* Footer

Remove unnecessary whitespace and normalize:

* Padding
* Margins
* Gaps
* Section spacing
* Card spacing
* Typography spacing
* Grid gaps
* Alignment

The website should not become longer simply because of excessive spacing.

Prioritize:

**Content Density + Clear Hierarchy + Comfortable Breathing Room**

The final experience should feel visually balanced and premium, but more compact and efficient.

Do not exploit distances or create unnecessary whitespace.

Every major space should have a clear visual purpose.

Use the spacing scale consistently, but apply it based on visual hierarchy and relationships rather than mechanically.
