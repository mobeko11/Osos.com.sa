Update the existing Arabic RTL website by redesigning the "تواصل معنا" page and adding the same contact form to the Homepage.

Do not modify the overall brand identity or unrelated sections.

1. Contact Page — "تواصل معنا"

Create a premium two-column contact section at the top of the page.

Right Side — Contact Form

Create a clean contact form with the following fields:

الاسم
Required text field.

رقم الجوال
Required phone number field.

البريد الإلكتروني
Optional email field.

نوع الاستفسار
Required select/dropdown.

Suggested options:

استفسار عام
استفسار عن المنتجات
طلب حسبة تمويلية
استفسار عن مشروع
استفسار عن فرع
أخرى

الرسالة
Required multiline textarea.

Add a primary submit button:

إرسال الطلب

Add a short privacy/helper text below the button:

"سيتم التعامل مع بياناتك بسرية والتواصل معك في أقرب وقت ممكن."

Form requirements:

RTL
Clear labels
Accessible inputs
Proper validation
Required-field indicators
Phone number validation
Email validation only when email is provided
Clear error messages in Arabic
Loading state while submitting
Success state after successful submission
Prevent duplicate submissions
Left Side — Contact Information

Create a premium contact-information panel containing:

أوقات العمل

"الأحد – الخميس"
"9:00 صباحًا – 5:00 مساءً"

الموقع الرئيسي

"المقر الرئيسي"

Display:

Full address
City
District
Street

Add a button:

"عرض الموقع على الخريطة"

البريد الإلكتروني

"info@example.com"

Make the email clickable.

الرقم الموحد

"9200XXXX"

Make the phone number clickable.

واتساب

"تواصل معنا عبر واتساب"

Add a WhatsApp button.

تابعنا

Title:
"تابعنا على مواقع التواصل"

Add social media icons for:

Snapchat
TikTok
Instagram
X / Twitter

Each icon should be clickable and open the corresponding official social media profile in a new tab.

Use clean monochrome or brand-colored icons consistent with the website.

Do not invent social media URLs. Use placeholders until the real URLs are provided.

2. Branches Section — Below Contact Information

Create a separate full-width section below the contact form/information section.

Title:

فروعنا في جميع أنحاء المملكة

Subtitle:

"نخدمك من خلال شبكة فروعنا المنتشرة في مختلف مناطق المملكة."

Google Map

Embed an interactive Google Map.

The map should display:

Main headquarters
All available branches across Saudi Arabia

Use reusable branch data.

Each branch should contain:

Branch ID
Branch name
City
District
Street
Latitude
Longitude
Phone number
Working hours
Google Maps URL

Do not invent real branch addresses or coordinates. Use clearly structured placeholder data where actual branch information is unavailable.

3. Branch Accordion

Place an accordion below the Google Map.

The accordion should contain:

المقر الرئيسي

Then the available branches.

Example:

المقر الرئيسي
فرع الرياض
فرع جدة
فرع الدمام
فرع مكة
etc.

The accordion should be vertically stacked and easy to scan.

Only one branch can be expanded at a time.

When the user selects a branch:

Expand that branch.
Update the Google Map.
Center the map on the selected branch.
Display the selected branch marker.
Highlight the selected marker.
Smoothly animate the map movement.
4. Branch Details

When a branch accordion item is opened, display:

الموقع

"حي ______، طريق ______"

رقم الفرع

"________"

أوقات العمل

"الأحد – الخميس"
"9:00 صباحًا – 5:00 مساءً"

Add:

[ الاتجاهات ]

The directions button should open the correct Google Maps location in a new tab.

5. Homepage Contact Form

Add the same contact form to the Homepage.

Create a dedicated section near the bottom of the Homepage before the footer.

Title:

تواصل معنا

Subtitle:

"اترك بياناتك وسيتواصل معك فريقنا لمساعدتك."

Use the same fields:

الاسم
رقم الجوال
البريد الإلكتروني — اختياري
نوع الاستفسار
الرسالة

Button:

إرسال الطلب

The Homepage form and Contact Page form must use the same validation and submission logic.

Do not create two separate implementations.

Create one reusable ContactForm component and reuse it on both pages.
7. Responsive Design

Desktop:

Contact section:

Two columns
Contact information on the LEFT
Form on the RIGHT

Map:

Full width
Large height

Branch accordion:

Full width below the map

Tablet:

Two-column layout with reduced spacing.

Mobile:

Stack the sections:

Contact form
Contact information
Social media
Branches title
Google Map
Branch accordion

Make all fields full width.

Ensure the Google Map remains responsive and does not cause horizontal overflow.

8. UX Requirements

The page should clearly distinguish between:

التواصل معنا
for sending inquiries

and

فروعنا في جميع أنحاء المملكة
for finding physical branch locations.

The contact form should be easy to complete and visually prominent.

The branch locator should be easy to search, browse, and navigate.

Use subtle hover and transition animations only.

Do not over-animate.

9. Important Technical Requirements

Build this as a real functional website, not a static design.

Create reusable components:

ContactForm
ContactInformation
SocialLinks
BranchMap
BranchAccordion
BranchCard

Create a reusable branches data structure.

All branch information should be editable from one central data source.

Use the same branch data for:

Google Map markers
Accordion
Branch details
Directions links

Use the same ContactForm component on:

Homepage
Contact Page

Do not modify unrelated pages or sections.

Keep the existing header and footer.

Replace the existing Contact Page content with this new structure.