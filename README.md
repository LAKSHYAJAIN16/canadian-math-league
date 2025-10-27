# Canadian Math League Website

A modern, responsive website for the Canadian Math League built with Next.js, TailwindCSS, and Framer Motion.

## Features

- 🎨 Modern and responsive design
- ⚡ Built with Next.js 14 and TypeScript
- 🎭 Smooth animations with Framer Motion
- 🎯 TailwindCSS for styling
- 📱 Mobile-first responsive design
- 🧮 Mathematics-themed UI elements
- 📄 Multiple pages: Home, About, Competitions, Resources, Contact

## Pages

- **Home**: Hero section with animated math symbols, statistics, and key features
- **About**: Mission, values, and history of the Canadian Math League
- **Competitions**: Upcoming competitions with detailed information
- **Resources**: Study materials, practice problems, and learning resources
- **Contact**: Contact form and information with FAQ section

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd canadian-math-league
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
canadian-math-league/
├── app/                    # Next.js 14 app directory
│   ├── about/             # About page
│   ├── competitions/      # Competitions page
│   ├── contact/          # Contact page
│   ├── resources/        # Resources page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation component
│   └── Footer.tsx        # Footer component
├── public/               # Static assets
└── ...config files
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## Customization

### Colors

The website uses a custom color palette defined in `tailwind.config.js`:
- Primary: Red tones (#ef4444, #dc2626, #b91c1c)
- Secondary: Blue tones (#0ea5e9, #0284c7, #0369a1)

### Fonts

The website uses Inter font from Google Fonts, imported in `globals.css`.

### Animations

Framer Motion animations are used throughout the site for:
- Page transitions
- Hover effects
- Scroll-triggered animations
- Interactive elements

## Deployment

The website can be deployed to any platform that supports Next.js:

### Vercel (Recommended)
```bash
npm run build
```

### Netlify
```bash
npm run build
npm run export
```

### Other platforms
Build the project and serve the `.next` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions about this website, please contact the Canadian Math League at info@canadianmathleague.ca.
