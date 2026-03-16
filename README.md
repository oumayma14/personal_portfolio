# ⟨ Oumayma Fazzeni — Portfolio /⟩

A personal developer portfolio built with **React + Vite**, styled with **Tailwind CSS**, featuring a dark cyberpunk aesthetic with full light/dark mode support.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Fonts | Orbitron · Share Tech Mono · Rajdhani |
| Icons | Lucide React |
| Email | EmailJS |
| Routing | React Router DOM |

---

## ✨ Features

- **Dark / Light mode** — persisted in `localStorage`, toggled from the navbar
- **Animated star background** — canvas-based twinkling stars + shooting meteors
- **Typewriter hero** — cycles through roles with a blinking cursor
- **Scroll spy navbar** — active link updates as you scroll, with a sliding underline indicator and a page progress bar
- **Scroll reveal animations** — sections and cards animate in via `IntersectionObserver`
- **Animated terminal** — the About section types out a JSON profile line by line
- **Skill bars** — animate from 0% with a live number counter on scroll
- **3D magnetic project cards** — tilt follows the cursor with a directional shadow
- **EmailJS contact form** — sends messages directly without a backend
- **Fully responsive** — mobile menu is a fullscreen overlay with staggered link animations

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Scroll spy + progress bar + theme toggle
│   ├── HeroSection.jsx     # Typewriter + particles + stat pills
│   ├── AboutMe.jsx         # Animated terminal + scroll reveal cards
│   ├── SkillsSection.jsx   # Filterable skills + animated bars + counters
│   ├── ProjectsSection.jsx # 3D tilt cards + scroll reveal
│   ├── ContactSection.jsx  # EmailJS form + contact info
│   ├── Footer.jsx          # Nav links + socials + back to top
│   └── StarBackground.jsx  # Canvas stars + meteors
├── pages/
│   ├── Home.jsx
│   └── NotFound.jsx
├── lib/
│   └── utils.js            # cn() helper
├── images/
│   └── quizpop.png
├── index.css               # Tailwind + full cyber design system
└── App.jsx
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/oumayma14/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📧 EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails without a backend.

The credentials are already configured in `ContactSection.jsx`:

```js
emailjs.sendForm(
  "service_z2jfyhr",   // Service ID
  "template_9v4g8cq",  // Template ID
  form,
  "QNx3iZHS3x9vr5Nav"  // Public Key
)
```

To use your own account, replace these values with your EmailJS credentials.

---

## 🎨 Design System

All design tokens live as CSS variables in `index.css`:

```css
--cyber-primary:    #00d4ff   /* cyan (dark) / indigo (light) */
--cyber-accent:     #7b2fff   /* purple */
--cyber-accent2:    #ff2d78   /* pink / glitch color */
--cyber-bg:         #050a14   /* page background */
--cyber-surface:    #0d1a2e   /* card background */
--font-head:        'Orbitron', monospace
--font-mono:        'Share Tech Mono', monospace
--font-body:        'Rajdhani', sans-serif
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built by <strong>Oumayma Fazzeni</strong> · <a href="https://www.linkedin.com/in/oumayma-fazzeni-jnfj1221/">LinkedIn</a> · <a href="https://github.com/oumayma14">GitHub</a>
</div>
