Svitlo Imanuel Robert Saragih's Portfolio

Overview
  A personal portfolio website built with HTML, CSS, and vanilla JavaScript. It introduces me, shows my projects and skills, and links to my socials. The design follows McLaren's papaya orange and blue livery, with a slideshow of McLaren photos in the header.

Purpose
  Demonstrate my HTML, CSS, and JavaScript skills.
  Showcase my skills and past projects (including my Python work) as an aspiring software developer.
  Apply what I learned in HCI lab class, such as sections, headings, classes, lists, and addresses (links).
  Reflect my hobbies: cars, coding, and McLaren.

Target Audience
  Lecturers and lab assistants reviewing my HCI coursework.
  Recruiters and internship providers looking at my work.
  Friends, classmates, and other developers who want to see my projects or get in touch.

Technologies Used
  HTML5 - semantic structure (header, nav, main, sections, articles, footer).
  CSS3 - Flexbox layout, em-based sizing, CSS animations, hover transitions, and clamp() for fluid headings.
  JavaScript (vanilla) - all interactive features, with no libraries or frameworks.
  Git and GitHub - version control and hosting of the source code.

JavaScript features
  Hero slideshow with arrows, dots, autoplay, and pause on hover.
  Project filters (All, Python, Raspberry Pi, HTML/CSS). Clicking a skill pill applies the same filter.
  Language switcher (English / Indonesian). The language is picked from the browser on the first visit and remembered afterwards.
  Active navigation link highlighting while scrolling.
  One-click email copy with a toast message.
  Back-to-top button that appears after scrolling down.
  Scroll-reveal animation for the About section, project cards, and skills.

Layout and Sections
  Header - navigation bar (logo, links, language switcher), welcome message, "My Works" button, and the McLaren slideshow.
  About Me - profile photo and a short introduction.
  Projects - cards for the Raspberry Pi project, the Python game, and the web development project, each with tags.
  Skills - Python, HTML/CSS, Raspberry Pi, and Git.
  Contact - links to Gmail, GitHub, and Instagram.
  Footer - copyright notice.
  Orange and blue stripes separate the header and footer from the content.

Responsiveness
  The layout adapts to different screen sizes without fixed widths:

  Flexbox with flex-wrap lets the navigation, About section, project cards, and skills wrap onto new lines on narrow screens.
  Sizes use em, percentages, and clamp(), so text and spacing scale smoothly.
  The slideshow keeps its proportions with aspect-ratio and images use object-fit: cover.
  The viewport meta tag is set so the page scales correctly on phones.
  How to Run Locally
  1. Clone or download the repository:
     bash
     git clone https://github.com/imanuelsgh-bit/<HCI-Lab-Project>.git
  2. Open the project folder. 
  3. Open index.html in any modern web browser   (or use the VS Code Live Server extension)
  No installation or build step is needed.

Folder Structure
  HCI Lab Project/
  ├── index.html      # page structure
  ├── styles.css      # layout, colours, animations
  ├── script.js       # interactive features and translations
  ├── README.md       # project documentation
  └── images/
      ├── mclaren-1.jpg
      ├── mclaren-2.jpg
      ├── mclaren-3.jpg
      ├── svitlo.jpeg
      ├── raspberry-pi-4b.jpg
      ├── python-logo.jpg
      └── html-css.jpg

Notes
I use Claude as the LLM to generate the codes and features given, with 2 ideas are given from me (1 hidden feature existed)
Script.js adds the CSS for its own elements (slideshow controls, filter buttons, toast, language switcher, back-to-top button), so styles.css does not need changes for them.
To add another language, copy the en block in the I18N object in script.js and translate the values. A new button appears automatically.
The "sir.s" logo in the navigation bar opens a YouTube video in a new tab.
The Python game is hosted on Google Drive and opens from the "Play the game" link.
Names such as Python, HTML, and Raspberry Pi stay in English in every language.

Screenshot
<img width="1915" height="1042" alt="image" src="https://github.com/user-attachments/assets/6a3733e1-dc1b-4e56-b975-7ba597f9c91f" />
