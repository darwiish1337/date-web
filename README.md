# 💝 Will You? — Interactive Valentine Experience

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Love%20%E2%9D%A4-ff69b4?style=for-the-badge&logo=heart&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Running%20Away-red?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Answer-Yes%20Only-ff1493?style=for-the-badge&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/No%20Dependencies-Pure%20Vanilla-green?style=for-the-badge&logo=javascript&logoColor=white" />
</p>

> A playful, interactive web experience that asks the most important question — with a twist. The **"No"** button simply refuses to be clicked.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💘 **Dodging "No" Button** | Intelligently escapes the cursor while staying within card boundaries |
| 🎨 **Modern UI Design** | Clean card-based layout with smooth CSS animations |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile devices |
| 🎉 **Dynamic Overlays** | Fun visual feedback for "Yes" interactions and hover effects |
| 🧹 **Clean Architecture** | OOP-based JavaScript with SOLID principles |

---

## 🗂️ Project Structure

```
will-you-valentine/
│
├── assets/              # GIF assets, images, and button graphics
│   ├── yes-btn.png      # "Yes" button image
│   ├── no-btn.png       # "No" button image
│   └── heart.gif        # Celebration animation
│
├── css/
│   └── style.css        # All styles — custom properties, Flexbox, animations
│
├── js/
│   └── app.js           # ValentineApp class — OOP logic & dodge mechanics
│
├── index.html           # Main entry point
└── README.md            # You are here 📍
```

---

## ⚙️ Tech Stack

- **HTML5** — Semantic, accessible structure
- **CSS3** — Custom properties, Flexbox, keyframe animations
- **JavaScript ES6+** — OOP with the `ValentineApp` class

---

## 🧠 Implementation Details

### `ValentineApp` Class
All application logic is encapsulated in a single class for clean separation of concerns:

```js
class ValentineApp {
  constructor()   // Initializes DOM references and binds events
  init()          // Starts the experience
  moveNoBtn()     // Calculates a safe dodge position away from cursor
  getRandomPos()  // Returns a random position within card boundaries
  handleYes()     // Triggers the celebration overlay
}
```

### Dodge Logic
The `"No"` button listens for `mousemove` and `touchstart` events and calculates the **opposite direction** of the cursor relative to the button's center, then smoothly transitions to a new position — all while clamped inside the card's boundaries.

### Design Principles Applied
- **Single Responsibility** — Each method does exactly one thing
- **DOM Caching** — Elements are selected once in the constructor
- **Event Delegation** — Minimal listeners, maximum efficiency
- **No Dependencies** — Pure Vanilla JS, zero libraries

---

## 🚀 How to Run

No build step. No dependencies. Just open and enjoy:

```bash
# Clone the repo
git clone https://github.com/your-username/will-you-valentine.git

# Open in your browser
open index.html
```

Or simply **double-click** `index.html` — it works in any modern browser.

---

## 📄 License

Made with 💕 for someone special. Free to use, share, and remix.

---

*Created for a playful interactive Valentine experience.*
