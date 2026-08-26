The "Our Projects" section on the homepage has been modified to a sleek and professional Horizontal Projects Carousel, while maintaining the site's existing visual identity.

### Section Title

**Our Projects**

Current text below:

"Projects we carefully develop to create value that extends beyond the moment of construction."

### Carousel

Convert the current project display from a fixed grid to a Horizontal Carousel/Slider.

Requirements:

* Display project cards horizontally.

* On desktop, display approximately 3 complete projects, with a small portion of the next card shown to give the user a sense of more.

* On tablet, display approximately 2 cards.

* On mobile, display one card with a small portion of the next.

* The spacing between cards should be consistent and elegant.

* Avoid making the cards too small or cluttered.

* Maintain the current card layout as much as possible.

### Navigation Arrows

Add two clean and clear arrows to control the carousel:

* Previous Arrow
* Next Arrow

* These should be located at the top of the projects area, next to the section title, or in a visually balanced position.

* Minimal and Premium design.

* Use the site's existing identity colors.

* The arrows should be inside simple circles or buttons with thin borders.

* A subtle visual effect should appear when hovering.

* The arrows actually move the carousel.

* In RTL (Read-Only Language), the movement and direction of the arrows should align with the Arabic language direction.

### Autoplay

Make the carousel move automatically horizontally.

Required settings:

* Automatic transition every 4–5 seconds.

* Smooth and gradual movement, not fast.

* Autoplay should pause when hovering on the desktop.

* If the user clicks the arrows or swipees, don't make the experience jarring; the movement can be paused and then resumed.

* Use Loop to ensure smooth project display.

### Swipe

This section should support:

* Mouse drag
* Touch swipe
* Trackpad horizontal gesture
* Navigation arrows

This allows users to easily move projects independently.

### Project Data Source

**Important: Do not create separate projects for this section.**

The cards on the homepage must be linked to the same project data found on the **"Our Projects"** page.

Any project added, edited, or its status changed on the "Our Projects" page should be automatically reflected in the homepage's Carousel.

Use the same Project Data/CMS/Database used on the Projects page.

### Project Card Content

Each card contains:

1. Project Image

2. Project Status Badge:

* Available

* Under Construction

* Sold

3. Project Name

4. Location:

* City

* District/Neighborhood

5. Brief Project Description

6. Type of Construction:

* Villa

* Apartments

* Building

* Residential Complex

* Etc.

7. Product Type:

* Self-Build

* Off-Plan Sales

* Ready Unit

* Etc.

8. Link:

**Explore Project ←**

Clicking this link takes the user to the project details page for that project.

### Project Ordering

Make the project order dynamic based on the data on the projects page.

It is recommended that available projects appear first, followed by under construction, then sold projects, with the option to control the order from the data source.

### Homepage Link

At the end of the section, add a simple and elegant link:

**View All Projects ←**

This link will connect to the **"Our Projects"** page.

### Design

I want the design to be similar to the current look shown in the attached image, but cleaner and more premium:

* White/off-white background
* Elegant Arabic typography
* Ample white space
* Clean cards
* Large, clear images
* Simple border radius
* Very light shadows
* Clear badges
* Avoid excessive effects
* Maintain the company's current visual identity
* The design should look like it belongs on a professional Real Estate Developer website, not a pre-made slider template.

### Responsive

The section must be fully responsive:

Desktop:

Approximately 3 cards + part of the next card

Tablet:

Approximately 2 cards + part of the next card

Mobile:

1 card + part of the next card

Maintain the swipe and navigation arrows.


### UX Details

* Do not let arrows obscure the content of the cards.

* Do not let the carousel extend beyond the page boundaries.

* There should be a clear sense of additional projects.

* Use pagination dots only when necessary.

* Do not display ineffective arrows when there are not enough projects.

* Use an appropriate loading state when loading project data.

* Use a fallback image if there is no project image.

* Maintain good image loading speed.

### Important

This section should be a **Dynamic Component** linked to the "Our Projects" page, not just a static visual design.

Any changes to project data on the "Our Projects" page should automatically appear here.

Use RTL correctly because the site is in Arabic, and ensure the carousel, movement, and arrow direction are RTL-compliant.