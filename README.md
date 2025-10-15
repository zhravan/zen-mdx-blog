# Minimalist MDX Blog

A clean, minimalist blog built with Next.js 15, React 19, and MDX. Inspired by modern design principles with a focus on readability and simplicity.

## Features

- ✨ Minimalist dark theme design
- 📝 Write in MDX (Markdown + React components)
- 🎨 Tailwind CSS for styling
- ⚡ Next.js 15 with Turbopack
- 🔍 Sitemap support
- 📱 Fully responsive
- 🎭 Smooth animations

## Stack

- **Framework:** Next.js 15 with App Router
- **UI:** React 19, Tailwind CSS
- **Content:** MDX
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles and design system
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   ├── [slug]/
│   │   │   └── page.tsx    # Dynamic blog post page
│   │   ├── welcome/
│   │   │   └── page.mdx    # Sample blog post
│   │   └── developer-experience/
│   │       └── page.mdx    # Sample blog post
│   ├── work/
│   │   └── page.tsx        # Projects showcase
│   └── sitemap.ts          # Sitemap generation
├── lib/
│   └── blog.ts             # Blog post metadata and utilities
├── mdx-components.tsx      # Custom MDX components
├── tailwind.config.ts      # Tailwind configuration
└── next.config.ts          # Next.js configuration
```

## Adding Blog Posts

1. Create a new folder in `app/blog/[slug]/`
2. Add a `page.mdx` file with your content
3. Update `lib/blog.ts` to include the post metadata:

```typescript
{
  slug: 'your-post-slug',
  title: 'Your Post Title',
  date: 'Month DD, YYYY',
  description: 'Brief description of your post'
}
```

## Customization

### Update Personal Information

- Edit `app/layout.tsx` to update the site title and metadata
- Modify `app/page.tsx` for the home page content
- Update `app/about/page.tsx` with your information
- Customize `app/work/page.tsx` with your projects

### Design System

The design system is defined in `app/globals.css` using CSS variables:

- Dark theme colors (HSL values)
- Typography styles
- Component-specific styles

You can adjust the color scheme by modifying the CSS variables in the `:root` selector.

## License

MIT
