# Public Assets

Static assets served from the root URL.

## Structure

```
public/
├── images/
│   ├── blog/      # Blog post images
│   └── og/        # Open Graph / social media preview images
└── assets/        # Other files (PDFs, downloads, etc.)
```

## Usage in MDX

```mdx
# In your blog posts
![Image description](/images/blog/my-image.png)

# With HTML img tag
<img src="/images/blog/diagram.svg" alt="Diagram" width="600" />
```

## Notes

- Files in `public/` are served from the root URL
- `/public/images/photo.png` → accessible at `/images/photo.png`
- Optimize images before adding (use WebP, compress PNGs)
- Keep filenames lowercase with hyphens (e.g., `my-blog-image.png`)
