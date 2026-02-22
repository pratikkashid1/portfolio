# 🚀 Pratik Kashid — Portfolio Website

A visually striking, fully responsive personal portfolio website built with pure **HTML**, **CSS**, and **JavaScript**. Features a dark cyberpunk aesthetic with animated particle backgrounds, glitch effects, 3D card tilts, and localStorage-powered feedback storage.

---

## 📁 Project Structure

```
my-portfolio/
├── index.html       # HTML structure & content
├── style.css        # All styling & animations
├── script.js        # All JavaScript & interactivity
└── resources/
    └── myIMG.png    # Your profile photo
```

---

## ✨ Features

- 🌌 **Animated particle network** — 130 floating particles with connecting lines
- ✍️ **Typewriter effect** — cycling hero tag text
- 💥 **Glitch text animation** — on the hero title
- 🃏 **3D card tilt** — project cards follow mouse movement
- 📊 **Animated skill bars** — fill on scroll into view
- 📜 **Scroll reveal** — sections animate in as you scroll
- 🔵 **Neon cursor glow** — decorative overlay on desktop
- 📱 **Fully responsive** — mobile hamburger menu included
- ✅ **Form validation** — name, email, and message checks
- 💾 **localStorage feedback** — submitted messages persist and display on page

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Page structure & semantic elements |
| CSS3 | Styling, animations, Flexbox & Grid layout |
| JavaScript (Vanilla) | Interactivity, DOM manipulation, Canvas API |
| Font Awesome 6 | Social media icons |
| Google Fonts | Syne + JetBrains Mono typefaces |

---

## 🚀 Getting Started

1. **Download or clone** the project files
2. Make sure all files are in the **same folder**
3. Place your photo at `resources/myIMG.png`
4. Open `index.html` in any browser — no build step needed

```bash
# Optional: serve locally with VS Code Live Server
# or any simple HTTP server
npx serve .
```

---

## 📄 Sections

| Section | Description |
|---|---|
| **Header** | Fixed nav with animated hover links & mobile hamburger |
| **Hero** | Full-screen intro with typewriter, glitch title & particle BG |
| **About** | Terminal-style bio card, profile photo, stats |
| **Skills** | 6 skill cards with animated progress bars & tags |
| **Projects** | 4 project cards with 3D tilt & scan line effects |
| **Contact** | Validated form with localStorage feedback storage |
| **Footer** | Social links with Font Awesome icons |

---

## 🎨 Customization

### Change your name
In `index.html`, search for `Pratik.Kashid` and `Pratik Kashid` and replace with your name.

### Change colors
In `style.css`, edit the CSS variables at the top:
```css
:root {
  --cyan: #00f5ff;   /* Primary accent */
  --mag:  #ff2d78;   /* Secondary accent */
  --grn:  #00ff88;   /* Tertiary accent */
  --yel:  #f5e642;   /* Highlight */
}
```

### Add your social links
In `index.html`, replace the `href="#"` in the footer `.soc` links with your real URLs:
```html
<a href="https://github.com/yourusername" title="GitHub">
  <i class="fab fa-github"></i>
</a>
```

### Update your photo
Replace `resources/myIMG.png` with your own image. Keep the filename the same, or update the `src` in `index.html`:
```html
<img src="resources/myIMG.png" alt="Your Name" class="av-img"/>
```

---

## 📦 Dependencies (CDN — no install needed)

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400;700&display=swap" rel="stylesheet"/>

<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
```

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile (iOS/Android) | ✅ Responsive |

---

## 📝 License

This project is open source and free to use for personal and commercial projects.

---

> Built with 💙 and too much coffee.
