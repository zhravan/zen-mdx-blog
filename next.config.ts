import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

// Allow overriding basePath/assetPrefix in CI for GitHub Pages deploys
const basePath = process.env.NEXT_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true
  },
  // Static export for GitHub Pages
  output: 'export',
  // Generate folder-based URLs (about/index.html) that work on Pages
  trailingSlash: true,
  // Use basePath/assetPrefix when deploying to project pages
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`
      }
    : {})
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
