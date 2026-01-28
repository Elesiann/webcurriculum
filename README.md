# Web CV

Personal CV built as a static web application with multi-language support, dark mode, and PDF export.

**Intentionally simple.** No frameworks, no build step, no dependencies beyond vanilla HTML/CSS/JS. Serve with any static server. The goal is maintainability and zero overhead for a project that gets updated once every few months.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, responsive design
- **JavaScript** - Vanilla JS for interactivity and i18n
- **html2pdf.js** - Client-side PDF generation

## Features

- **Multi-language** - PT-BR and EN with vanilla i18n (single HTML file)
- **Dark/Light mode** - Theme toggle with localStorage persistence
- **PDF Export** - One-click CV download with optimized compression
- **Responsive** - Mobile-first design
- **Print-ready** - Scaled layout for A4 output

## Project Structure

```
├── index.html              # Single page application
├── locales/
│   ├── pt-br.json          # Portuguese translations (source of truth)
│   └── en.json             # English translations
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles + scale-cv for PDF
│   ├── js/
│   │   ├── main.js         # Theme toggle, PDF generation
│   │   ├── i18n.js         # Vanilla i18n implementation
│   │   └── html2pdf.bundle.min.js
│   └── img/
│       └── pp.jpg          # Profile picture
```

## i18n

The internationalization is handled by a simple hand-made vanilla JS script (`i18n.js`) that:
- Loads translations from JSON files in `/locales`
- Applies text to elements with `data-i18n` attributes
- Persists language preference in localStorage
- Supports nested keys (e.g., `experience.job1.title`)

No external libraries needed.

## PDF Generation

The PDF export uses `html2pdf.js` with the following optimizations:

```javascript
{
  margin: 0,
  image: { type: "jpeg", quality: 0.85 },
  html2canvas: { scale: 2, useCORS: true },
  jsPDF: { format: "a4", orientation: "portrait", compress: true }
}
```

## Customization

- **Content**: Edit JSON files in `/locales`
- **Styles**: Modify `assets/css/styles.css`
- **PDF scaling**: Adjust `.scale-cv` classes in CSS
- **Theme colors**: Update CSS custom properties in `:root` and `.dark-theme`

## Deploy

Static files - deploy anywhere (Vercel, Netlify, GitHub Pages, etc).

## License

MIT
