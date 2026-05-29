# Mohamed & Mariam — Digital Wedding Invitation

An elegant, high-end interactive digital wedding invitation designed and built for Mohamed & Mariam's special day. 

Designed with modern web standards, this digital experience features a realistic opening envelope, smooth animations, safe audio autoplay upon interaction, real-time countdown, and details about the historic wedding venue with navigation directions.

---

## Key Features

- **Interactive Wax-Seal Envelope**: A polished, physics-inspired physical envelope opening animation using advanced spring physics.
- **Premium Typography**: An elegant combination of classical serif display headings (*Cormorant Garamond*) and a delicate script font (*Great Vibes*) paired with a clean geometric typeface (*Inter*).
- **Interactive Map & Directions**: High-performance, integrated map widget showcasing the venue with a direct navigation link.
- **Dynamic Countdown Timer**: Real-time ticker counting down to the wedding hour, complete with localized time handling.
- **Ambient Soundtrack Player**: Integrated background music controller designed to comply with browser autoplay constraints (fades in gracefully as soon as the invite envelope is opened by the guest).
- **Responsive Fluid Layout**: Engineered to look exquisite on ultra-wide desktop monitors down to modern high-density mobile displays.

---

## Technologies Used

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Physics & Motion**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

Follow these steps to run the invitation applet locally:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Installation

1. Clone or extract this repository to your local directory.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd wedding-invitation
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To launch the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000` (or the port specified in your terminal).

### Production Build

To compile a highly optimized production build of the static application:

```bash
npm run build
```

The fully bundled, production-ready assets will be located in the `/dist` directory, ready to be hosted on any standard static web provider (Netlify, Cloudflare Pages, Vercel, AWS S3, etc.).

---

## Directory Structure

```text
/
├── src/
│   ├── assets/       # Visual media & high-quality background illustration assets
│   ├── components/   # Modular UI components (Envelope, Countdown, VenueMap, MusicPlayer)
│   ├── App.tsx       # Root React application container and state management
│   ├── index.css     # Tailwind imports and premium custom keyframe animations
│   └── main.tsx      # Main application entry point
├── index.html        # Main HTML layout index
├── package.json      # Dependencies and execution script configuration
└── tsconfig.json     # TypeScript project and compiler guidelines
```
