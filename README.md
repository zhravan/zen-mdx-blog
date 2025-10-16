<samp>

### Monolog - Just another minimalist mdx blog

#### Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

#### Stack

Next.js 15, React 19, MDX, Tailwind CSS

#### Structure

```text
app/              # Pages and routes
components/       # UI components
  navigation/     # Navigation components
  mdx/           # MDX content components
content/         # Blog posts (MDX)
lib/             # Utilities
```

#### Adding Posts

1. Create `content/blog/your-post.mdx`
2. Redeploy, voila done

## Feeds

The blog exposes three feed formats:

- RSS: `/feed.xml`
- Atom: `/atom.xml`
- JSON Feed: `/feed.json`

Feeds are rebuilt every hour and use the site URL configured in `lib/site.ts`.

#### Credits

- Design inspired by [leerob.com](https://leerob.com/)
- Built with boilerplate from [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)

#### License

MIT

</samp>
