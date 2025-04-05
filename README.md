# Software Engineer Portfolio

A modern, responsive portfolio website for software engineers built with Next.js 15, TailwindCSS, and shadcn/ui. Features a sleek dark/light mode, optimized performance, and a beautiful UI.

## Features

- ⚡️ **Next.js 15** - Latest Next.js with App Router and Turbopack
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🌓 **Dark Mode** - Elegant light and dark theme support
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🧩 **Shadcn/UI Components** - Beautiful, accessible components
- 🚀 **Performance Optimized** - Optimized bundle size and image loading
- ♿️ **Accessibility** - ARIA compliant and keyboard navigable
- 📊 **Bundle Analyzer** - Analyze your bundle size
- 📝 **TypeScript** - Type safety and better developer experience
- 🔍 **SEO Ready** - Meta tags and OpenGraph support

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
bun install

# Run the development server
bun run dev
```

### Building for Production

```bash
# Build the project
bun run build

# Start the production server
bun run start
```

### Analyzing Bundle Size

```bash
bun run analyze
```

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── app/             # App router pages
│   ├── components/      # UI components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── next.config.js       # Next.js configuration
├── tailwind.config.ts   # TailwindCSS configuration
└── package.json         # Dependencies & scripts
```

## Customization

### Changing Theme Colors

Edit `src/app/globals.css` to update the theme colors.

### Adding New Pages

Create new directories in `src/app/` with a `page.tsx` file.

### Adding Components

Add new components in `src/components/`.

## Performance Optimizations

This project includes:

- Image optimization with `next/image`
- Bundle analysis
- Code splitting
- Font optimization
- CSS minimization

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Bun](https://bun.sh/)
