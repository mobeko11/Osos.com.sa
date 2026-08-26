Update the **"الوحدات المتاحة" / Available Units** section and the unit details experience only. Keep the existing filters, search, project data, and overall functionality unless needed to support the new design.

## 1. New Unit Card Design

Replace the current text-heavy unit cards with a more visual **image-first real estate card design**.

Each unit card should use a high-quality image of the unit as its full background.

The card should have:

* Full-size unit image as the background
* Consistent aspect ratio across all cards
* Rounded corners matching the website design system
* Subtle dark gradient overlay for readability
* Minimal information visible by default

In the default state, show only essential information over the image, such as:

* اسم الوحدة أو رقم الوحدة
* نوع الوحدة
* الحالة، مثل: متاح / محجوز

Keep the card clean and premium. Do not overload it with all unit details.

### Hover Interaction — Desktop

When the user hovers over a unit card:

* Add a smooth dark overlay.
* Slightly zoom the background image.
* Reveal a clear CTA button:
  **عرض التفاصيل**
* Use a smooth, subtle animation.
* Do not use aggressive movement, rotation, or excessive effects.

The entire card and the button should clearly indicate that the unit can be opened.

### Mobile Interaction

Since hover does not exist on touch devices:

* Keep the **"عرض التفاصيل"** button visible or reveal it through a clear tap interaction.
* The user must always have an obvious way to access the unit details.
* Do not rely on hover for critical functionality.

---

# 2. Unit Details Modal

When the user clicks **"عرض التفاصيل"**, open a large premium **Unit Details Modal**.

The modal should be large and use most of the viewport while maintaining comfortable margins.

Desktop:

* Large centered modal.
* Responsive max-width and max-height.
* Internal scrolling if needed.
* Prevent the page behind the modal from scrolling.
* Clear close button in the top corner.

The modal structure should be:

## Top Section — Unit Image Gallery

At the top of the modal, create a large image gallery for the selected unit.

Include:

* Large main image
* Multiple images of the unit
* Thumbnail navigation below or beside the main image
* Previous / Next navigation arrows
* Smooth image transitions
* Optional image counter

The gallery should use the actual images associated with the selected unit.

Example:

Main large image

[ Thumbnail 1 ] [ Thumbnail 2 ] [ Thumbnail 3 ] [ Thumbnail 4 ]

Images should be the primary visual entry point before the detailed information. High-resolution imagery and clear key facts are important for property detail experiences.

---

# 3. Modal Content Layout

Below the image gallery, divide the content into two sections.

### Right Side — Main Unit Details

The right/main content area should take approximately **65–70%** of the available width.

Display information in a clear hierarchy.

### Unit Information

Show:

* اسم الوحدة
* رقم الوحدة
* نوع الوحدة
* الدور
* عدد الغرف

Use clean information rows, key-value pairs, or small metric cards.

### Project Information

Create a separate information group titled:

**معلومات المشروع**

Include:

* اسم المشروع
* نوع المنشأ
* نوع المنتج
* حالة المشروع
* الموقع

### Area Details

Create another section titled:

**تفاصيل المساحة**

Include:

* مساحة الوحدة
* المساحة الإضافية
* المساحة الإجمالية

Present these values clearly, preferably as small structured metrics rather than long paragraphs.

### Unit Plan

At the bottom of the unit details section, add a clear secondary button:

**عرض مخطط الوحدة**

When clicked:

* Open the unit floor plan in a suitable viewer, modal, or document preview.
* If the unit has multiple plans, allow switching between them.

---

# 4. Left Side — Price and Interest Form

The left sidebar should take approximately **30–35%** of the content width.

Make this section visually distinct but consistent with the brand.

At the top, display:

### السعر

Show the unit price clearly and prominently.

If the price is not available, use the existing appropriate status such as:

**السعر عند الطلب**

Below the price, add a divider.

Then add:

## طلب الاهتمام

Create a simple lead form.

Fields:

* الاسم الكامل
* رقم الجوال
* البريد الإلكتروني — optional
* ملاحظات — optional

Automatically associate the submitted request with:

* اسم المشروع
* رقم الوحدة
* اسم الوحدة
* نوع الوحدة

These values should be captured automatically from the currently opened unit and should not require the user to select them manually.

Add a clear primary button:

**إرسال طلب الاهتمام**

Include the existing agreement to the privacy policy or terms if already used in the website.

The form should remain easily accessible while the user reviews the unit information.

---

# 5. Special Case — Single Unit / Single Villa Projects

This behavior must work for all project types.

If a project contains multiple units:

* Show each available unit as its own image-based card.
* Clicking a card opens that specific unit's details.

If the project contains only **one villa, one house, one apartment, or one standalone unit**:

* Do not remove the Available Units section.
* Still display one unit card.
* Use the same visual card design.
* Clicking **"عرض التفاصيل"** opens the exact same Unit Details Modal.

This creates a consistent experience regardless of whether the project contains:

* Multiple villas
* Multiple apartments
* Floors
* Buildings
* Individual units
* One standalone villa
* One standalone property

The data structure and UI should support any **نوع منشأ** and any number of units.

---

# 6. Responsive Modal

### Desktop

Below the gallery:

* Main details on the right: approximately 65–70%
* Price and interest form on the left: approximately 30–35%

### Tablet

* Reduce spacing and column widths as needed.
* Keep the two-column layout only if both sections remain comfortable.

### Mobile

Transform the modal into a single-column experience:

1. Image gallery
2. Unit details
3. Project information
4. Area details
5. Unit plan button
6. Price
7. Interest form

Requirements:

* Modal uses almost the full viewport.
* Internal scrolling.
* No horizontal overflow.
* All form fields full width.
* CTA button full width.
* Images remain responsive.
* Close button remains accessible.
* Background page must not scroll while the modal is open.

---

# 7. Data and Interaction Requirements

The modal must dynamically display data for the selected unit.

Do not use static placeholder data.

Each unit should load its own:

* Images
* Name
* Unit number
* Type
* Floor
* Bedrooms
* Areas
* Price
* Floor plan
* Related project information

The selected unit should remain associated with the **"طلب الاهتمام"** form.

Maintain a consistent image-first card layout across all unit listings; property cards should prioritize a strong visual preview and only surface the most important information before the user opens deeper details.

## Important

Do not redesign the rest of the Project Details page.

Only update:

* Available Units cards
* Unit hover/tap behavior
* Unit Details Modal
* Image gallery
* Unit information layout
* Project information
* Area details
* Price section
* Interest form
* Single-unit project behavior

The final result should feel:

**Modern · Premium · Visual · Clean · Interactive · Real Estate Focused**

The unit card should act as a visual preview, while the large modal should provide a complete unit exploration and lead-generation experience.
