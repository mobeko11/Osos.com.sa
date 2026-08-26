Replace the existing website page named **"الخدمات"** with a new page named **"منتجاتنا"**.

Do not create a separate new page. Completely replace the existing "الخدمات" page and navigation item with "منتجاتنا".

## Navigation

Replace:

"الخدمات"

with:

"منتجاتنا"

The navigation item must link to the new Products page.

---

# Products Page

## Hero Section

Title:

"منتجاتنا"

Subtitle:

"حلول عقارية مصممة لتقريبك من قرار التملك."

Supporting text:

"تعرّف على منتجاتنا العقارية واختر المسار الأقرب لاحتياجك، ثم تواصل معنا لمعرفة التفاصيل والأهلية."

Keep the Hero minimal and premium, matching the existing "أسس" brand identity.

---

# Products Grid

Create a **2 × 2 responsive grid** containing four product cards.

Desktop:
2 columns × 2 rows.

Tablet:
2 columns.

Mobile:
1 column.

Each product card should contain:

* Large visual/image area or subtle product illustration
* Product title
* A two-line description
* Three key points
* Link-style CTA at the bottom

Use the following four products exactly:

## 01 — البناء الذاتي

Description:

"تمويل مراحل بناء العقار على أرض يمتلكها المستفيد، بما يساعده على إنشاء منزله وفق احتياجه وتصوره.
تتم مراحل التمويل وفق نسب الإنجاز والشروط المعتمدة للمنتج."

Key points:

* تمويل مراحل البناء وفق الإنجاز.
* إمكانية تصميم وبناء المنزل حسب الاحتياج.
* متابعة مراحل المشروع والإجراءات المرتبطة بالتمويل.

CTA:

"تعرّف على المنتج ←"

The CTA must link to:

"/contact?product=self-build"

---

## 02 — البيع على الخارطة

Description:

"خيار لتملك وحدة عقارية قيد الإنشاء ضمن مشروع محدد، قبل اكتمال أعمال البناء.
يتيح للمستفيد اختيار وحدة مناسبة ضمن المشاريع والخيارات المتاحة."

Key points:

* تملك وحدة ضمن مشروع قيد الإنشاء.
* خيارات متعددة من الوحدات والمشاريع.
* معرفة مراحل المشروع وتفاصيل الوحدة قبل التملك.

CTA:

"تعرّف على المنتج ←"

Link to:

"/contact?product=off-plan"

---

## 03 — وحدات جاهزة

Description:

"حل مناسب لمن يبحث عن شقة أو فيلا قائمة وجاهزة للسكن، دون الحاجة إلى الانتظار حتى اكتمال البناء.
نوفر خيارات عقارية متنوعة بحسب المشاريع والوحدات المتاحة."

Key points:

* وحدات جاهزة للسكن.
* خيارات متنوعة من الفلل والشقق.
* حلول تمويلية مرتبطة بالأهلية وشروط المنتج.

CTA:

"تعرّف على المنتج ←"

Link to:

"/contact?product=ready-unit"

---

## 04 — منتجات أخرى قادمة

Description:

"نعمل باستمرار على تطوير وإضافة منتجات عقارية جديدة لتلبية احتياجات السوق والعملاء.
تابعنا للتعرف على المنتجات والخيارات التي سيتم إطلاقها مستقبلًا."

Key points:

* منتجات عقارية جديدة.
* حلول مصممة وفق احتياجات السوق.
* تحديثات مستمرة حول المنتجات القادمة.

CTA:

"ابقَ على اطلاع ←"

Link to:

"/contact?product=other"

For this card, use a slightly different visual treatment to communicate "coming soon", while maintaining the same overall design system.

Do not present unavailable products as currently active products.

---

# Product Card Design
Cards should have:

* Clean photography or architectural visual
* Subtle navy gradient overlay where text is placed over the image
* Premium typography
* Consistent card proportions
* Subtle shadow or border
* Medium rounded corners matching the existing website
* Generous internal spacing

Inside each card, organize the content hierarchy clearly:

1. Product title
2. Two-line description
3. Three key-point bullets
4. CTA link

Keep the descriptions and bullet points easy to scan.

Use a small elegant icon or bullet marker for each key point.

Hover interaction:

* Image zoom approximately 1.02–1.04
* CTA changes to gold
* Subtle card elevation
* Smooth transition

Avoid excessive effects.

---

# Homepage Products Section

Add a new Products section to the existing Homepage.

Title:

"منتجاتنا"

Subtitle:

"اختر المنتج الذي يناسب احتياجك، ونحن نساعدك في معرفة الخيارات المتاحة."

Display only the first **3 active products**:

1. البناء الذاتي
2. البيع على الخارطة
3. وحدات جاهزة

Do NOT display "منتجات أخرى قادمة" on the Homepage.

Use a horizontal 3-card layout on desktop.

Tablet:
2 cards per row.

Mobile:
1 card per row or horizontal swipe carousel depending on the existing Homepage design system.

Each Homepage product card should contain:

* Image
* Product name
* Two-line short description
* Three concise key points
* Link:
  "تعرّف على المنتج ←"

All product links should navigate to the Contact Page using the corresponding product query parameter.

At the bottom of the Homepage Products section add:

"عرض جميع المنتجات ←"

This should navigate to the full Products page.

---

# Product Data

Create a reusable product data structure so the same product content is used across:

* Products page
* Homepage Products section
* Contact Page product selection

Example structure:

{
id: 1,
title: "البناء الذاتي",
description: "تمويل مراحل بناء العقار على أرض يمتلكها المستفيد، بما يساعده على إنشاء منزله وفق احتياجه وتصوره. تتم مراحل التمويل وفق نسب الإنجاز والشروط المعتمدة للمنتج.",
features: [
"تمويل مراحل البناء وفق الإنجاز.",
"إمكانية تصميم وبناء المنزل حسب الاحتياج.",
"متابعة مراحل المشروع والإجراءات المرتبطة بالتمويل."
],
image: "/products/self-build.jpg",
cta: "تعرّف على المنتج",
href: "/contact?product=self-build",
status: "active"
}

Use:

status:
"active"

for the first three products.

Use:

status:
"coming-soon"

for "منتجات أخرى قادمة".

Do not duplicate product content manually in different components.

---

# Contact Integration

Every product CTA must navigate directly to the existing:

"تواصل معنا"

page.

When a product parameter exists in the URL, automatically preselect the relevant product or inquiry type in the Contact Form.

Examples:

"/contact?product=self-build"

"/contact?product=off-plan"

"/contact?product=ready-unit"

"/contact?product=other"

The Contact Page should clearly show the selected product in the inquiry field when the user arrives from a product CTA.

---
---

# Responsive Design

Desktop:
Products page = 2 × 2 grid.

Tablet:
2 × 2 grid with smaller gaps.

Mobile:
1 × 4 vertical stack.

Homepage:
3 cards on desktop.
2 cards on tablet.
1 card on mobile.

All layouts must support RTL.

Ensure the three key points remain readable and do not make the cards excessively tall on mobile.

---

# Important

Do not modify unrelated pages or sections.

Do not remove the existing "تواصل معنا" page.

Do not create fake product claims, guarantees, financing amounts, or eligibility statements.

Do not present "منتجات أخرى قادمة" as an available product.

Do not generate a static image.

Build this as a real functional responsive website page and homepage section.

Replace the existing "الخدمات" page and navigation item with "منتجاتنا".