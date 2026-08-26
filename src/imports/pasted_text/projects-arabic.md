Update the existing Arabic RTL website by creating a complete **"مشاريعنا"** experience and connecting it to the existing "مشاريعنا" section on the Homepage.

Do not modify unrelated pages or sections.

# 1. Projects Page — "مشاريعنا"

Create a dedicated page titled:

**"مشاريعنا"**

Subtitle:

**"مشاريع نطوّرها بعناية، لتصنع قيمة تتجاوز لحظة البناء."**

Supporting text:

**"نستعرض مجموعة من مشاريع أسس التي تجمع بين الهوية المعمارية، جودة التنفيذ، ودقة التخطيط في مختلف مناطق المملكة."**

---

# 2. Featured Project

At the top of the Projects Page, below the Hero, create a large **Featured Project** section.

Title:

**"مشروع مميز"**

Use one project as the featured project.

Layout:

* Large project image on one side
* Project information on the other side
* Premium editorial layout
* Strong visual hierarchy

Display:

* Project name
* Location
* Property type
* Product type
* Project status
* Short description
* CTA: **"استكشف المشروع ←"**

The featured project should use the same reusable project data as the main projects grid.

Do not invent real project information. Use placeholder project data until actual project information is provided.

---

# 3. Projects Statistics

Add a clean statistics strip:

**20+**
مشروعًا

**12+**
مدينة

**4**
منتجات عقارية

**26**
فرعًا حول المملكة

Use actual company numbers when available. If real numbers are unavailable, use editable placeholder values.

---

# 4. Projects Map

Create a full-width section titled:

**"مشاريعنا حول المملكة"**

Subtitle:

**"تعرّف على مواقع مشاريع أسس في مختلف مناطق المملكة."**

Add an interactive **Google Map of Saudi Arabia**.

The map must display project markers for all available projects.

Each project marker should contain:

* Project name
* City
* Property type
* Product type
* Project status
* Thumbnail image
* "استكشف المشروع →"

When the user clicks a marker:

* Show a map popup/card
* Display project information
* Provide a link to the project detail page

Use reusable project data containing:

* Project ID
* Project name
* City
* Region
* Latitude
* Longitude
* Property type
* Product type
* Status
* Image
* Description
* Features
* Project detail URL

Do not invent real coordinates or addresses. Use editable placeholder data where actual project locations are unavailable.

---

# 5. Project Filters

Below the map, create a clean filtering system.

## Filter by Property Type

**الكل**
**فلل**
**شقق**
**عمائر**
**مشاريع أخرى**

## Filter by Product

**الكل**
**البناء الذاتي**
**البيع على الخارطة**
**وحدات جاهزة**

## Filter by Project Status

**الكل**
**متاح**
**قيد الإنشاء**
**مباع**

## Filter by Location

Add a dropdown:

**جميع المناطق**

with Saudi regions/cities based on the available project data.

All filters should work together.

For example:

`فلل + البناء الذاتي + متاح + الرياض`

should only display matching projects.

When filters are applied:

* Update the project grid
* Update visible map markers
* Update the project count
* Keep the map synchronized with the filtered results

Add a clear button:

**إعادة ضبط الفلاتر**

---

# 6. Projects Grid

Create a responsive project grid below the filters.

Desktop:
3 columns.

Tablet:
2 columns.

Mobile:
1 column.

Each project card should contain:

* Large project image
* Status badge
* Project name
* Location
* Property type
* Product type
* Short description
* CTA: **"استكشف المشروع ←"**

Status badges:

**متاح**

**قيد الإنشاء**

**مباع**

Use different subtle visual treatments for each status while staying within the existing brand identity.

Do not use overly bright colors.

---

# 7. Project Card Interaction

On hover:

* Slight image zoom
* Subtle elevation
* Smooth transition
* CTA becomes highlighted with the brand gold

On click:

Open the project's dedicated detail page.

---

# 8. Project Detail Page

Create a reusable project detail page template.

URL structure:

`/projects/[project-slug]`

Each project should use the same template and load its information dynamically from the project data.

---

## Project Detail Hero

Display:

* Large project image
* Project name
* Location
* Property type
* Product type
* Status badge

Example structure:

**فيلا الياسمين**

الرياض · فيلا · البناء الذاتي

**متاح**

CTA where appropriate:

**تواصل معنا حول المشروع ←**

---

# 9. About the Project

Add a section:

## عن المشروع

Include a detailed description of the project.

Use 2–3 paragraphs explaining:

* Project concept
* Location
* Architectural approach
* Target audience
* Overall value proposition

Do not invent factual claims.

---

# 10. Project Features

Add a dedicated section titled:

## مزايا المشروع

Display the project's main features in a clean grid of 3–6 feature items.

Each feature should contain:

* Minimal icon
* Feature title
* One short explanatory sentence

Example structure:

**تصميم معماري مميز**
تصميم يجمع بين الهوية المحلية والطابع العصري.

**موقع استراتيجي**
يقع المشروع في موقع قريب من الخدمات والمرافق الرئيسية.

**جودة التنفيذ**
اهتمام بالتفاصيل وجودة المواد ومراحل التنفيذ.

**مساحات مدروسة**
توزيع عملي للمساحات بما يلائم احتياجات المستخدم.

**خصوصية وراحة**
تصميم يراعي الخصوصية واحتياجات الحياة اليومية.

**قيمة عقارية**
تصميم المشروع مع مراعاة القيمة والاستخدام على المدى الطويل.

Important:
Only show features that are actually applicable to each project. Do not make unsupported claims.

Make the features editable from the project data.

---

# 11. Project Information

Create a structured information section:

**الموقع**
المدينة / المنطقة

**نوع المنشأ**
فيلا / شقة / عمارة / غير ذلك

**المنتج**
البناء الذاتي / البيع على الخارطة / وحدات جاهزة

**الحالة**
متاح / قيد الإنشاء / مباع

Additional project-specific information can be added when available.

---

# 12. Project Gallery

Create a premium image gallery.

Use:

* Large featured image
* Supporting thumbnails
* Lightbox on click
* Smooth transitions

The gallery should support multiple project images.

---

# 13. Project Location

Add:

## موقع المشروع

Interactive Google Map centered on the project's actual coordinates.

Display:

* Project marker
* Project name
* City

Add button:

**عرض الاتجاهات ←**

This should open the correct Google Maps location.

Do not invent addresses or coordinates.

---

# 14. Related Projects

At the bottom of each project detail page:

## مشاريع قد تهمك

Display 3 related projects based on:

* Same city
* Same property type
* Same product
* Similar status

Each card should link to its project detail page.

---

# 15. Project Contact CTA

End every project page with a strong CTA:

## مهتم بهذا المشروع؟

**تواصل مع فريق أسس لمعرفة المزيد عن المشروع والخيارات المتاحة.**

Button:

**تواصل معنا ←**

The button should link to:

`/contact?project=[project-slug]`

If the user comes from a project page, the Contact Form should automatically identify the selected project.

---

# 16. Homepage — Projects Section

Update the existing **"مشاريعنا"** section on the Homepage.

Title:

**"مشاريعنا"**

Subtitle:

**"مشاريع نطوّرها بعناية، لتصنع قيمة تتجاوز لحظة البناء."**

Display a curated selection of **3–4 projects** from the same reusable project data source.

Each card should contain:

* Project image
* Project name
* Location
* Property type
* Product type
* Status
* CTA: **"استكشف المشروع ←"**

Add a button below:

**عرض جميع المشاريع ←**

This button must navigate to:

`/projects`

---

# 17. Homepage → Project Connection

The Homepage Projects section and the Projects Page must use the **same project data source**.

Do not duplicate project information manually.

If a project is:

* Added
* Edited
* Removed
* Status changed

the change should automatically appear wherever that project is displayed.

Homepage cards must link directly to the corresponding:

`/projects/[project-slug]`

project detail page.

---

# 18. Project Data Structure

Create a reusable project data structure.

Each project should support:

```text
id
slug
name
city
region
latitude
longitude
propertyType
productType
status
featured
thumbnail
heroImage
gallery[]
shortDescription
description
features[]
projectDetails
googleMapsUrl
```

Status values:

```text
available
under-construction
sold
```

Property types:

```text
villa
apartment
building
other
```

Product types:

```text
self-build
off-plan
ready-unit
other
```

Use Arabic labels in the UI.

---

# 19. Visual Identity

Maintain the existing "أسس" brand identity.

Primary:
**#0B1B3A**

Accent:
**Elegant muted gold**

Background:
White / warm off-white

Style:

* Premium
* Minimal
* Architectural
* Editorial
* Sophisticated
* Saudi real estate aesthetic
* High-quality photography
* Generous whitespace
* Clean Arabic typography

Use RTL throughout.

Do not introduce a new visual identity.

---

# 20. Responsive Behavior

Desktop:

* Featured project: large editorial layout
* Map: full width
* Filters: horizontal
* Projects: 3-column grid

Tablet:

* Featured project: 2-column
* Projects: 2-column grid

Mobile:

* Featured project: stacked
* Filters: horizontally scrollable
* Map: responsive
* Projects: single-column
* Project details: stacked sections

Ensure there is no horizontal overflow.

---

# 21. Important Technical Requirements

Build this as a real functional website, not a static image.

Create reusable components:

* ProjectHero
* FeaturedProject
* ProjectFilters
* ProjectMap
* ProjectCard
* ProjectGrid
* ProjectFeatures
* ProjectGallery
* ProjectDetails
* RelatedProjects
* ProjectCTA

Use one central project data source for:

* Homepage
* Projects Page
* Map
* Filters
* Project Cards
* Project Detail Pages
* Related Projects

Do not invent real project information, addresses, coordinates, statistics, or claims.

Use editable placeholder data where actual information is unavailable.

Do not modify unrelated pages or sections.
