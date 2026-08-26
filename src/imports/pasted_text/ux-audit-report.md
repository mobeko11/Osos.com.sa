Perform a complete **UX, User Journey, Information Architecture, Navigation, and Usability Audit** for the entire website.

Do not focus only on visual design.

The main objective is to make the website easier to understand, navigate, explore, and use.

Review the entire website from the perspective of a real potential customer looking for a suitable real estate product or project.

The final experience should answer these questions clearly:

* Where am I?
* What does this company offer?
* What can I do here?
* Which product is suitable for me?
* How can I find a suitable project?
* How can I explore project details?
* What should I do next?
* How can I contact the company or express interest?

The website structure should be based on **user goals and mental models**, not only on the company's internal structure.

---

# 1. Identify the Main User Goals

Review the website based on the main actions a visitor may want to perform.

The primary user goals include:

### Goal 1 — Understand the company

User journey:

**Homepage → About Us → Company Values / Approach → Trust and Understanding**

The user should quickly understand:

* Who is the company?
* What does the company do?
* Why should the user trust it?

---

### Goal 2 — Discover the available real estate products

User journey:

**Homepage → Products → Product Details**

The user should be able to:

* Understand the available products.
* Compare them easily.
* Discover which product may be relevant to their needs.
* Access detailed information about each product.

Recommended hierarchy:

```text
منتجاتنا
    ↓
البناء الذاتي
    ↓
تفاصيل المنتج
    ↓
المشاريع المرتبطة
```

The same logic should apply to:

* البيع على الخارطة
* الوحدات الجاهزة

---

### Goal 3 — Discover a project

User journey:

**Homepage / Products / Projects → Project Listing → Filters → Project Details**

Users should be able to discover projects through multiple clear entry points:

* Featured Projects on the Homepage
* Projects page
* Product detail pages
* Interactive Projects Map
* Search or filters where appropriate

Do not force users to follow only one path.

Different users may start their journey differently.

---

### Goal 4 — Explore a specific project

User journey:

```text
Project Card
      ↓
Project Details
      ↓
عن المشروع
      ↓
مزايا المشروع
      ↓
الوحدات المتاحة
      ↓
تفاصيل الوحدة
      ↓
طلب الاهتمام
```

The Project Details page should clearly communicate:

* What is this project?
* Where is it located?
* What type of project is it?
* What product is it related to?
* What is available?
* What can the user do next?

Do not hide important information behind unnecessary clicks.

Use progressive disclosure only when it helps reduce cognitive load.

---

# 2. Improve the Information Architecture

Review the entire sitemap and page hierarchy.

The website should have a clear structure similar to:

```text
الرئيسية
│
├── من نحن
│
├── منتجاتنا
│   ├── البناء الذاتي
│   ├── البيع على الخارطة
│   └── الوحدات الجاهزة
│
├── مشاريعنا
│   └── تفاصيل المشروع
│       └── الوحدات المتاحة
│           └── تفاصيل الوحدة
│
├── المركز الإعلامي
│   └── تفاصيل الخبر
│
├── تواصل معنا
│
└── روابط أخرى
    ├── الوظائف
    ├── الأسئلة الشائعة
    ├── سياسة الخصوصية
    └── الشروط والأحكام
```

Review whether every page belongs in the correct location.

Remove unnecessary hierarchy levels.

Avoid making users navigate through too many pages before reaching important content.

Use clear parent-child relationships between related pages.

---

# 3. Navigation Audit

Review the Navbar, Footer, Breadcrumbs, Contextual Links, and internal navigation.

The primary navigation should contain only the most important destinations.

Recommended primary navigation:

* الرئيسية
* من نحن
* منتجاتنا
* مشاريعنا
* المركز الإعلامي
* تواصل معنا

Do not overload the main navigation with secondary or low-priority pages.

Move secondary pages to:

* Footer
* Related sections
* Contextual navigation

Use clear labels that users immediately understand.

Avoid internal company terminology or unclear labels.

The navigation should remain consistent across all pages.

---

# 4. Contextual Navigation

Do not rely only on the main Navbar.

Add contextual links between related content.

Examples:

### Product Page

```text
البناء الذاتي
        ↓
كيف يعمل؟
        ↓
مميزات المنتج
        ↓
مشاريع البناء الذاتي
        ↓
عرض المشروع
```

### Project Page

```text
نوع المنتج
     ↓
عرض المزيد عن المنتج
```

### Project Details

Show related paths where useful:

* العودة إلى المشاريع
* مشاريع مشابهة
* المزيد من مشاريع نفس المنتج

The user should not reach a dead end after viewing content.

Every important page should suggest a logical next step.

---

# 5. Homepage User Journey

Review the Homepage as the main entry point.

The Homepage should guide the user through a logical story:

```text
1. Featured Projects
        ↓
2. Understand the Company
        ↓
3. Discover Products
        ↓
4. Explore Projects
        ↓
5. Explore Projects on the Map
        ↓
6. Trust Signals / Client Feedback
        ↓
7. Contact / التمويل والاستفسار
```

Do not include sections only because they look visually attractive.

Every section should answer one of these:

* What is the purpose of this section?
* What does the user learn here?
* What action can the user take next?

If a section has no clear purpose, consider removing it, merging it, or simplifying it.

---

# 6. Clear CTA Strategy

Audit all CTAs across the website.

Avoid using generic CTAs everywhere such as:

* اعرف المزيد
* اضغط هنا
* اكتشف المزيد

Use specific action-based labels.

Examples:

### Product

**استكشف البناء الذاتي**

### Product Details

**عرض مشاريع البناء الذاتي**

### Project

**عرض المشروع**

### Unit

**عرض تفاصيل الوحدة**

### Lead Generation

**طلب الاهتمام**

### Contact

**تواصل معنا**

Each CTA should clearly communicate what will happen after clicking it.

Do not place multiple primary CTAs competing with each other in the same area.

Each section should usually have:

* One primary action
* Optional secondary action

---

# 7. Improve Project Discovery

Make it easy for users to find projects through multiple paths.

Users should be able to discover projects by:

* Product type
* Project status
* Location
* Project type
* Interactive map

Maintain consistent project filters.

For example:

```text
All Projects

[ المنتج ]
[ الموقع ]
[ الحالة ]
[ نوع المنشأ ]

↓
Filtered Project Results
```

If the user arrives from a Product page, automatically apply the relevant product filter.

Example:

```text
البناء الذاتي
        ↓
عرض المشاريع
        ↓
Projects Page
product = self-construction
```

The user should always understand why the displayed projects are being shown.

---

# 8. Improve Project Details UX

The Project Details page should have a clear information hierarchy.

Recommended order:

```text
Project Hero
      ↓
Quick Project Information
      ↓
عن المشروع
      ↓
مزايا المشروع
      ↓
الوحدات المتاحة
      ↓
الموقع
      ↓
صور المشروع
      ↓
Related Product / Related Projects
      ↓
CTA
```

Use the existing tab container where appropriate:

* عن المشروع
* مزايا المشروع
* الوحدات المتاحة
* موقع المشروع

Do not force the user to scroll through unnecessary content before accessing important information.

Important information should be easy to scan.

---

# 9. Unit Discovery and Conversion Flow

The unit journey should be:

```text
Project
   ↓
Available Units
   ↓
Visual Unit Card
   ↓
View Details
   ↓
Large Unit Details Modal
   ↓
Understand Unit + Price
   ↓
Request Interest
```

The **Request Interest** form should automatically know:

* Project
* Unit
* Product

The user should not need to select this information again.

Reduce unnecessary form fields.

Only ask for information that is necessary at this stage.

---

# 10. Reduce Cognitive Load

Review all pages for unnecessary complexity.

Remove or simplify:

* Duplicate information
* Repeated CTAs
* Too many badges
* Too many card variations
* Unnecessary icons
* Long paragraphs
* Excessive navigation options
* Too many simultaneous choices

Prioritize the most important information first.

Use:

* Clear headings
* Short descriptions
* Progressive disclosure
* Logical grouping
* Consistent labels

Avoid overwhelming users with too many choices at once.

---

# 11. Mobile User Journey

Audit the entire user journey on mobile separately.

Do not simply shrink the desktop experience.

Review:

* Mobile navigation
* Menu hierarchy
* Project filters
* Map interactions
* Project cards
* Unit cards
* Large modals
* Forms
* CTA placement

Important actions should remain easy to reach with one hand.

Avoid:

* Deep nested mobile menus
* Long horizontal UI elements
* Hidden important CTAs
* Hover-dependent interactions
* Excessive scrolling caused by poor content structure

The underlying IA should remain clear even when the interface changes for smaller screens.

---

# 12. Orientation and Wayfinding

Users should always understand:

* Where they are
* What page they are viewing
* How they arrived there
* Where they can go next

Use Breadcrumbs on deeper pages where useful.

Examples:

```text
الرئيسية ← مشاريعنا ← اسم المشروع
```

```text
الرئيسية ← منتجاتنا ← البناء الذاتي
```

Maintain clear active states in navigation.

The user should never feel lost inside the website.

---

# 13. Search, Filters, and Findability

Review whether users can easily find:

* A project
* A location
* A product
* An available unit

Use search only where it provides real value.

Use filters for large collections.

Do not add search or filters unnecessarily to small content collections.

The goal is findability, not adding more UI.

---

# 14. Review Every Page Based on User Intent

For every page, answer:

### Why would the user visit this page?

### What information are they looking for?

### What is the primary action?

### What is the logical next step?

Do not allow pages to become informational dead ends.

Every important page should provide a clear next action.

---

# 15. UX Audit Deliverables

Before making major structural changes, analyze the website and identify:

### A. Current User Journey

Map the existing paths.

### B. Problems

Identify:

* Confusing navigation
* Duplicate content
* Dead-end pages
* Unclear CTAs
* Unnecessary steps
* Excessive hierarchy
* Missing connections between related pages

### C. Recommended User Journey

Create optimized flows for:

```text
User discovers a product
```

```text
User discovers a project
```

```text
User explores a unit
```

```text
User wants to contact the company
```

```text
User wants to understand the company
```

### D. Information Architecture

Create a clear sitemap and relationship between:

```text
Products
     ↓
Projects
     ↓
Project Details
     ↓
Units
```

### E. Prioritized Improvements

Classify recommendations as:

* High Priority — affects usability or conversion
* Medium Priority — improves clarity and navigation
* Low Priority — polish and optimization

---

# Final Principle

The website should guide the customer naturally through the journey:

```text
Discover
   ↓
Understand
   ↓
Explore
   ↓
Compare
   ↓
Choose
   ↓
Request Interest / Contact
```

Do not add features simply because they look impressive.

Every page, navigation item, filter, CTA, card, modal, and section should have a clear purpose in helping the user move toward their goal.

Prioritize:

**Clarity over complexity**

**User goals over internal company structure**

**Findability over excessive navigation**

**Clear next steps over generic CTAs**

**Logical relationships over isolated pages**

The final website should feel intuitive enough that users can move between products, projects, units, and contact actions without needing to stop and think about where they should go next.
