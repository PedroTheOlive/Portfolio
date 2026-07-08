# Pedro Arruda Portfolio

A static portfolio website presenting UX/UI design, product design, front-end development, game UX, data visualization, and rapid prototyping work.

The site is built with plain HTML, CSS, and JavaScript. It has no package manager, framework, database, or build step, which keeps local development and GitHub Pages deployment straightforward.

## Site Structure

- `index.html` - homepage, positioning, featured projects, toolkit preview, about section, and contact actions.
- `projects.html` - complete project collection, case-study templates, project materials, reports, and video controls.
- `skills.html` - evidence-backed capabilities linked to the projects that demonstrate them.
- `public/css/style.css` - shared visual system and responsive behavior.
- `scripts/nav.js` - shared navigation and mobile-menu behavior.
- `scripts/footer.js` - shared footer and contact information.
- `scripts/caseStudyModal.js` - accessible case-study modal behavior.
- `scripts/videoModel.js` - local and YouTube-compatible video modal behavior.
- `public/images/` - profile, project, and link-preview images.
- `public/videos/` - locally hosted project walkthroughs and demos.
- `public/files/` - resume, project reports, and poster downloads.

## Local Preview

The pages can be opened directly in a browser, but a local static server provides behavior closer to production.

From the repository root:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

VS Code Live Server or another static-file server works as well.

## Editing Content

### Homepage

Edit `index.html` to update:

- Name, positioning, and role priorities.
- Featured project selection.
- Toolkit summary.
- About and availability copy.
- Resume, LinkedIn, and GitHub links.

Featured-project links use anchors such as `projects.html#p1`. Keep these synchronized with the corresponding project-card IDs.

### Projects

Each project in `projects.html` has two related parts:

1. A visible `.project-card` with its summary, outcomes, tags, and actions.
2. A `<template>` such as `case-p1` containing the full modal case study.

The card's `data-case-study` value must match the template ID:

```html
<article data-case-study="case-p1">
```

```html
<template id="case-p1">
```

Project cards are keyboard focusable. Enter or Space opens the design path, while nested links and media buttons retain their own behavior.

### Skills

Skills are grouped by capability rather than proficiency ratings. Each group explains how the capability is applied and links to project evidence. Add new tools only where the surrounding description or linked project supports the claim.

## Modals and Navigation

The navigation and footer are injected on `DOMContentLoaded`, keeping them consistent across pages.

Case-study and video modals support:

- Escape-to-close.
- Outside-click closing.
- Keyboard focus trapping.
- Focus restoration after closing.
- Scroll reset between case studies.
- Video playback cleanup when the player closes.

When changing modal markup, preserve the IDs expected by the scripts.

## Assets

Project images live in `public/images/projects/`. Images below the first viewport use native lazy loading and asynchronous decoding.

The Open Graph and X/Twitter sharing image is:

```text
public/images/social-preview.png
```

It is designed at 1200 by 630 pixels for link previews.

Large videos and reports should be compressed before committing when practical. External project-material folders can be used when a case study references many supporting assets.

## Metadata

Every HTML page includes:

- A page title and description.
- Open Graph metadata.
- X/Twitter card metadata.
- A canonical URL.
- A favicon.

The current canonical site address is:

```text
https://pedrotheolive.github.io/Portfolio/
```

If the deployed address changes, update the canonical, `og:url`, and absolute social-image URLs in all HTML files.

## Accessibility

The site includes:

- Semantic headings and landmarks.
- Descriptive image alternative text.
- Visible keyboard focus states.
- Keyboard-accessible project cards.
- Accessible modal labels and focus management.
- Responsive navigation with `aria-expanded`.
- Minimum 44-pixel interactive control heights.

When adding content, keep link text descriptive and preserve heading order.

## Deployment

To publish with GitHub Pages:

1. Commit and push the portfolio files to GitHub.
2. Open the repository's **Settings** page.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Save and wait for the deployment to complete.

After deployment, verify the live site on desktop and mobile, test all downloads and external links, and confirm that Google Drive materials are publicly viewable without signing in.

## Browser Support

The site targets current versions of Chrome, Edge, Firefox, and Safari. It relies on standard HTML, CSS Grid/Flexbox, native lazy loading, and modern JavaScript DOM APIs.
