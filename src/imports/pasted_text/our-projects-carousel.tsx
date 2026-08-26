Create and implement a premium "Our Projects" section for the existing Arabic RTL Saudi real estate financing landing page.

IMPORTANT:
Do NOT generate an image.
Build this as a real functional website section/component.

The design should be inspired by the provided reference image: a clean horizontal real estate project carousel with large photography cards.

Section

Arabic heading:
"مشاريعنا"

Arabic subtitle:
"نستعرض نماذج من مشاريعنا العقارية التي نفخر بها في مختلف مناطق المملكة."

Keep the section visually premium, spacious, modern, and consistent with the existing company brand.

Brand colors:
Primary dark navy: #0B1B3A
Accent: elegant muted gold
Background: white / off-white

Carousel Layout

Create a horizontal project carousel.

Desktop:

Display 5 project cards simultaneously.
Cards should be arranged horizontally.
The carousel should extend close to the viewport edges.
Maintain consistent spacing between cards.
Use a large image area.
Keep the layout clean and premium.

Tablet:

Display approximately 3 cards.

Mobile:

Display approximately 1.2–1.3 cards.
The next card should be partially visible to clearly communicate that the user can swipe horizontally.
Support native touch swipe.
Automatic Movement

The carousel must automatically move horizontally.

Requirements:

Autoplay enabled.
Change slides approximately every 4–5 seconds.
Smooth transition.
Infinite loop.
The carousel must never stop permanently after reaching the last project.
After the user clicks an arrow or swipes manually, autoplay should continue automatically.
Pause autoplay while the mouse is hovering over the carousel.
Resume autoplay when the mouse leaves.
Respect prefers-reduced-motion where appropriate.

Use a proper carousel/slider implementation such as Swiper or an equivalent production-ready library.

Navigation Arrows

Add two elegant navigation arrows.

Desktop:
Place the arrows near the left and right sides of the carousel.

Use:

Minimal circular buttons
White background
Dark navy icon
Subtle border
Soft shadow
Smooth hover animation

The arrows should be clearly clickable.

Right arrow:
Move to the next group of projects.

Left arrow:
Move to the previous group of projects.

Because the website is RTL, make sure the visual direction and arrow behavior feel natural for Arabic users.

Do NOT use oversized arrows.

Project Card

Each project card should contain a large real project image.

Card structure:

IMAGE
↓
Small product badge
↓
Project name
↓
Location
↓
Property type
↓
Financing product

Example:

Project name:
"فيلا سكنية عصرية"

Location:
"الرياض"

Property type:
"فيلا"

Product:
"البناء الذاتي"

Image Treatment

Use high-quality real estate photography.

Image:

Aspect ratio approximately 4:3 or 3:4 depending on the existing design.
Object-fit: cover.
Rounded corners around 10–14px.
Slight image zoom on hover.
Smooth transition.

Add a subtle dark gradient overlay near the bottom of the image if text needs to appear over the image.

Do NOT make the image overly dark.

Product Badge

Add a small badge over the top corner of the image.

Examples:

"البناء الذاتي"

"شراء وحدة جاهزة"

"البيع على الخارطة"

Use:

White background
Dark navy text
Small elegant shadow
Medium border radius

Do not use excessive colors.

Project Information

Below the image:

Project name:
Large / semibold Arabic text.

Location:
Small muted text with a minimal location icon.

Then two compact metadata labels:

"نوع المنشأ"
"فيلا"

"نوع المنتج"
"البناء الذاتي"

Example:

فيلا سكنية عصرية
📍 الرياض

نوع المنشأ
فيلا

نوع المنتج
البناء الذاتي

Keep the information concise.

Example Project Data

Create the project data as a reusable array/object.

Example:

[
{
id: 1,
name: "فيلا سكنية عصرية",
city: "الرياض",
propertyType: "فيلا",
productType: "البناء الذاتي",
image: "/projects/project-01.jpg"
},
{
id: 2,
name: "مجمع سكني حديث",
city: "جدة",
propertyType: "شقق",
productType: "شراء وحدة جاهزة",
image: "/projects/project-02.jpg"
},
{
id: 3,
name: "فيلا عائلية",
city: "الدمام",
propertyType: "فيلا",
productType: "البناء الذاتي",
image: "/projects/project-03.jpg"
}
]

Create at least 8–12 placeholder projects so the carousel demonstrates the infinite behavior.

Do not invent real company projects or claims.
Clearly structure the data so real project information and images can be replaced later.

Interaction

Each project card can optionally be clickable.

On hover:

Slight image scale: approximately 1.02
Subtle card elevation
Smooth transition

Do not add excessive animation.

Optional Project Counter

Add a small counter near the navigation:

"01 / 12"

Update it according to the currently active project.

Keep it subtle.

Responsive Behavior

Desktop:
5 cards visible.

Tablet:
3 cards visible.

Mobile:
1.2–1.3 cards visible.

Mobile must support:

Touch swipe
Autoplay
Infinite loop
Arrow navigation where appropriate

Prevent the carousel from causing horizontal overflow on the entire page.

Only the carousel itself should be horizontally scrollable/swipeable.

Accessibility

Add:

Accessible labels for navigation arrows.
Keyboard navigation.
Proper button elements for arrows.
Meaningful alt text for project images.
Respect reduced-motion preferences.

Example labels:

"المشروع السابق"

"المشروع التالي"

Animation

Keep the animation premium and subtle.

Use:

Smooth slide transitions
Ease-out motion
Image hover zoom
Subtle card hover
No excessive bouncing
No flashy effects