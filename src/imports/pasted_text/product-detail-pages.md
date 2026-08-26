Create dedicated product detail pages for each real estate financing product.

The existing **"منتجاتنا"** page should become an overview page that introduces the available products. Each product should have its own dedicated page with more detailed information and a dynamically connected list of projects related to that product.

The product pages should follow the existing website design system and feel:

Modern · Premium · Simple · Clear · Real Estate Focused

## Product Page Structure

Create a reusable dynamic product page template that works for:

* البناء الذاتي
* البيع على الخارطة
* الوحدات الجاهزة

Each product should use the same page structure while displaying its own content and related projects.

---

## 1. Product Hero

At the top of each page, create a dedicated hero section.

Include:

* Product name
* Short headline
* Brief product description
* Relevant premium real estate image or visual
* Primary CTA: **استكشف المشاريع**
* Secondary CTA: **تواصل معنا**

The "استكشف المشاريع" button should smoothly scroll to the related projects section on the same page.

---

## 2. About the Product

Add a detailed section explaining the product.

Include:

### ما هو [اسم المنتج]؟

Display a clear and easy-to-understand description explaining:

* What the product is
* Who it may be suitable for
* The general purpose of the product
* The type of real estate opportunities associated with it

Use a clean two-column layout with text and a supporting image or visual element.

---

## 3. Product Features

Add a section titled:

### لماذا [اسم المنتج]؟

Display the main features and benefits in a clean responsive grid.

Each feature should have:

* Minimal icon
* Feature title
* Short description

Use 3–4 feature cards depending on the product.

Do not overload the page with too much text.

---

## 4. How It Works

Add a simple section explaining the general journey or process.

Display 3–5 steps depending on the product.

Example structure:

**01 — اختر**
استكشف الخيارات والمشاريع المتاحة.

**02 — تعرّف**
اطّلع على تفاصيل المشروع أو الوحدة المناسبة.

**03 — تواصل**
تواصل معنا للحصول على المزيد من المعلومات.

**04 — ابدأ رحلتك**
تابع الخطوات المناسبة للوصول إلى خيارك العقاري.

For the self-construction product, the process can visually include the project's construction stages where relevant.

Use a clean horizontal step layout on desktop and a vertical layout on mobile.

---

## 5. Related Projects

This should be one of the main sections of the page.

Title:

### مشاريع [اسم المنتج]

Subheading:

**استكشف المشاريع المرتبطة بهذا المنتج واختر المشروع المناسب لك.**

Display project cards using the same data and card design already used on the main **Projects page**.

Do not duplicate project data.

Filter projects dynamically based on:

`productType = currentProduct`

For example:

### البناء الذاتي

Show only projects where:

`productType = البناء الذاتي`

### البيع على الخارطة

Show only projects where:

`productType = البيع على الخارطة`

### الوحدات الجاهزة

Show only projects where:

`productType = الوحدات الجاهزة`

Each project card should include the existing relevant project information, such as:

* Main image
* Project name
* Location
* Project status
* Construction type
* Product type

Add:

**عرض المشروع**

Clicking the button should open the existing Project Details page for that specific project.

If there are many projects, initially show a selected number of projects and add:

**عرض جميع المشاريع**

This button should navigate to the Projects page with the appropriate product filter automatically applied.

Example:

`/projects?product=self-construction`

---

## 6. Product CTA

At the bottom of each product page, add a full-width premium CTA banner.

Example:

### جاهز تبدأ رحلتك العقارية؟

**تواصل معنا لمعرفة المزيد عن المنتج والمشاريع والخيارات المتاحة.**

Buttons:

**تواصل معنا**

**استكشف المشاريع**

The contact button should navigate to the existing Contact Us page.

---

# Update the Main Products Page

Keep the existing **"منتجاتنا"** page as the main overview page.

For each product card or product section, add a clear button:

**اعرف المزيد**

or:

**استكشف المنتج**

Each button should navigate to the corresponding dedicated product page.

Example routes:

* `/products/self-construction`
* `/products/off-plan`
* `/products/ready-units`

Do not use static duplicated content where dynamic product data can be used.

Create a reusable product structure so that future products can be added easily.

For example:

```text
Products
├── البناء الذاتي
│   └── Product Details + Related Projects
│
├── البيع على الخارطة
│   └── Product Details + Related Projects
│
└── الوحدات الجاهزة
    └── Product Details + Related Projects
```

## Important Data Relationships

Maintain the following relationship:

**Product → Projects → Project Details → Units**

Example:

```text
البناء الذاتي
     ↓
مشاريع البناء الذاتي
     ↓
تفاصيل المشروع
     ↓
الوحدات / المنشآت المتاحة
```

The product page should automatically display projects connected to that product.

If a new project is added later with the same `productType`, it should automatically appear on the correct product page.

Do not manually duplicate projects between the Products page and Projects page.

The final experience should allow users to easily move between:

**Products Overview → Product Details → Related Projects → Project Details → Available Units**

Maintain full responsiveness across Desktop, Tablet, and Mobile, while preserving the existing website's spacing system, visual hierarchy, and design language.
