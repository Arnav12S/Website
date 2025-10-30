# Personal Website with Nuxt Studio, UI Pro, and Nuxt Hub

A modern, optimized website built with:
- [Nuxt 3](https://nuxt.com)
- [Nuxt Content](https://content.nuxt.com) with [Nuxt Studio](https://nuxt.studio) integration
- [Nuxt UI Pro](https://ui.nuxt.com/pro)
- [Nuxt Hub](https://hub.nuxt.com) for hosting

## Features

- 🔥 Live preview with Nuxt Studio
- 🎨 Beautiful UI components with Nuxt UI Pro
- 📝 Content management with Nuxt Content
- 🚀 One-click deployment with Nuxt Hub

## Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Deploy to Nuxt Hub
pnpm deploy
```

## Nuxt Studio

This project is configured to work with Nuxt Studio, allowing you to edit content in a visual editor.

1. Make sure your content is pushed to a GitHub repository
2. Visit [Nuxt Studio](https://nuxt.studio) and connect your repository
3. Edit content in the Nuxt Studio interface
4. Preview changes in real-time

## Nuxt Hub Deployment

The project is configured to deploy to Nuxt Hub:

1. Make sure you have the proper environment variables set:
   - `NUXT_HUB_PROJECT_KEY`
   - `NUXT_HUB_ENV`

2. Run the deploy command:
   ```bash
   pnpm deploy
   ```

## Content Structure

Content is organized in the `content/` directory:
- Blog posts in `content/3.blog/`
- Projects in `content/projects/`
- Other pages as YAML files in the root of the content directory

## Environment Variables

Copy `.env.example` to `.env` and fill in the following variables:

```
NUXT_HUB_PROJECT_KEY=your-project-key
NUXT_HUB_ENV=production
NUXT_UI_PRO_LICENSE=your-license-key
```

## License

All rights reserved.
