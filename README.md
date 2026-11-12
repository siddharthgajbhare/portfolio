# Siddharth Gajbhare | Web Developer Portfolio

A modern, responsive personal portfolio website built with plain **HTML, CSS and JavaScript**. No frameworks or build tools are needed.

## Features

- Responsive layout for mobile, tablet and desktop
- Dark / light mode, with your choice saved in the browser
- Mobile navigation menu (closes on link click or `Esc`)
- Typing animation in the hero section
- Scroll reveal animations
- Active navigation link that follows the current section
- Filterable project cards (All / Frontend / JavaScript / React)
- Contact form with validation and inline error messages
- Copy-to-clipboard email button
- Back-to-top button

### Extra features (`extras.css` + `extras.js`)

- Scroll progress bar at the top of the page
- Toast notifications (email copied, theme switched, opening email app)
- Animated stat counters
- 3D tilt effect on project cards
- Cursor glow effect (desktop only)
- Keyboard shortcuts: press `1`-`5` to jump between sections
- Contact form opens the visitor's email app with the message pre-filled
- Journey timeline section for education and milestones

All animations respect the visitor's reduced-motion setting.

## Project Structure

```
portfolio/
├── index.html      # Page structure and content
├── style.css       # Main styles, theme variables, responsive rules
├── script.js       # Core interactivity
├── extras.css      # Styles for the extra features
├── extras.js       # Extra features
└── resume.pdf      # Your resume (add this yourself)
```

## Getting Started

1. Download or clone the project.
2. Keep all files in the same folder.
3. Open `index.html` in your browser.

You can also use the **Live Server** extension in VS Code for automatic reloading.

## Customization

**Personal details:** edit the name, email, location and social links in `index.html`. Search for `siddharth@example.com` and replace it with your real email in all places, including the `data-email` attribute of the copy button.

**Colors:** change the variables at the top of `style.css`:

```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
}
```

**Typing roles:** edit the `roles` array in `script.js`.

**Projects:** copy a `<article class="project-card">` block in `index.html`. Set `data-category` to `frontend`, `javascript` or `react` so the filter works, and update the `#` links to your live and GitHub URLs.

**Skills:** change the `width` value in each skill bar, for example `style="width: 90%"`.

**Timeline:** edit or duplicate the `.timeline-item` blocks in the Journey section.

**Resume:** place your PDF in the project folder and name it `resume.pdf`.

## Contact Form

The form validates the name, email, subject and message. After a valid submit, the visitor's email app opens with the message filled in. It does not send email from a server. To send messages directly, connect a service such as Formspree or EmailJS.

## Built With

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) (Poppins)

## Deployment

The site is static, so it can be hosted for free on:

- GitHub Pages
- Netlify
- Vercel

## Author

**Siddharth Gajbhare**
GitHub: [@siddharthgajbhare](https://github.com/siddharthgajbhare)

## License

This project is free to use for personal portfolios. Please replace the name, content and links with your own.
