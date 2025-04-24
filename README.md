# Abdalla Elkilany's Portfolio Website

This is the source code for Abdalla Elkilany's personal portfolio website, showcasing his skills, projects, and experience as a Full-Stack .NET & Angular Developer.

## Project Description

This project is a modern, single-page portfolio website built with Angular. It's designed to provide a clear and engaging presentation of my professional profile, allowing visitors to learn about my background, explore my work, and get in touch.

## Features

* **Single-Page Layout:** All sections are on a single, scrollable page for smooth navigation.
* **Sticky Header:** Navigation bar remains fixed at the top while scrolling.
* **Conditional Header Styling:** Header changes appearance (solid/transparent) based on the visible section.
* **Scroll Animations:** Sections animate into view as the user scrolls down the page.
* **Sections:** Includes dedicated sections for:
    * Home (Hero)
    * About Me
    * Skills (Grid layout with boxing)
    * Projects (Card layout)
    * Contact
    * Footer (with social links)
* **Responsive Design:** Layout adjusts for various screen sizes (desktop, tablet, mobile).
* **Theme Styling:** Utilizes a consistent color palette and modern design elements (e.g., geometric backgrounds, shadows, transitions).
* **Asset Management:** Configured to manage static assets (images, etc.).

## Technologies Used

* **Angular**
* **TypeScript**
* **SCSS (Sass)**
* **HTML5**
* **CSS3**
* **Angular Material** (if used for components like buttons, cards)
* **Intersection Observer API:** For scroll detection and animations.
* **Netlify:** Platform used for deployment.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js and npm (or yarn/pnpm) installed.
* Angular CLI installed globally (`npm install -g @angular/cli`).
* Git installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
    cd [your-repo-name]
    ```
    *(Replace `https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository` and `[your-repo-name]` with your project's details)*.

2.  **Install dependencies:**
    ```bash
    npm install # Or yarn install or pnpm install
    ```

### Running the Application Locally

* **Start the development server:**
    ```bash
    ng serve
    ```
* Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

To build the project for production, use the following command:

```bash
ng build --configuration production
This command builds the project to the dist/ directory (the specific folder name inside dist is configured in angular.json). The production build includes optimizations like minification and ahead-of-time compilation.

Deployment
This project is configured for deployment on Netlify.

Ensure your project is pushed to a supported Git repository (GitHub, GitLab, Bitbucket).
Connect your repository to Netlify via the Netlify app dashboard.
Configure the build settings:
Build Command: ng build --configuration production
Publish directory: The output path from angular.json (e.g., dist/my-portfolio).
For client-side routing to work correctly on direct page access (e.g., your-site.netlify.app/about), ensure you have the _redirects file in your assets source folder (src or public depending on angular.json) with the content /* /index.html 200.
Customization
Content: Update text content in each section's HTML file (*.component.html) with your own information (About bio, skills list, project details, contact info, etc.).
Images: Replace placeholder image files (e.g., home-hero-bg.jpg, abdalla.png) with your own images in your assets folder (public/images/ based on current angular.json config). Ensure paths in HTML/CSS match the new file names.
Links: Update social media links in the footer and any other links throughout the site.
Theme: Modify the CSS variables in src/styles.scss to change the color palette. Adjust styles in component SCSS files (*.component.scss) to refine the look and feel of individual sections.
Project Structure Overview
src/: Contains the application source code.
app/: Application components, services, etc.
components/: Individual section components (home, about, skills, projects, contact, header, footer).
shared/: Reusable items like directives (scroll-animation.directive.ts), services (scroll-state.service.ts).
app.component.ts/html/scss: Root application component.
app.config.ts: Application configuration (providers).
styles.scss: Global styles, theme variables, utility classes.
(src)/assets/: Default Angular asset folder (might not be used based on angular.json).
public/: Configured asset source folder. Place your static files here if your angular.json points to public.
public/images/: Your background images, photos, etc.
public/videos/: Your background video files (if using).
public/_redirects: File for Netlify routing rules.
angular.json: Angular workspace configuration.
package.json: Project dependencies and scripts.
Contact
Feel free to connect with me:

https://abdalla-elkilany.netlify.app/
https://www.linkedin.com/in/abdalla-elkilany-003559207
https://github.com/Kilany99
abdallah_elkilany@hotmail.com