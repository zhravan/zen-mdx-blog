import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import type { Metadata } from 'next';

type TwitterCard = 'summary' | 'summary_large_image' | 'app' | 'player';

type OGType = 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';

interface YamlSEOConfig {
  siteUrl: string;
  title: string;
  titleTemplate?: string;
  description: string;
  openGraph?: {
    type?: OGType;
    image?: string;
    locale?: string;
  };
  twitter?: {
    card?: TwitterCard;
    site?: string;
    creator?: string;
  };
}

const seoConfigPath = path.join(process.cwd(), 'config', 'seo.yaml');

let cached: YamlSEOConfig | null = null;

export function loadSeoConfig(): YamlSEOConfig {
  if (cached) return cached;

  if (!fs.existsSync(seoConfigPath)) {
    // Provide sensible defaults if file doesn't exist
    cached = {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
      title: 'Your Name',
      description: 'Engineer, writer, and creator.'
    };
    return cached;
  }

  const file = fs.readFileSync(seoConfigPath, 'utf8');
  const data = YAML.parse(file) as Partial<YamlSEOConfig> | null;

  const siteUrl = (data?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');

  cached = {
    siteUrl,
    title: data?.title || 'Your Name',
    titleTemplate: data?.titleTemplate,
    description: data?.description || 'Engineer, writer, and creator.',
    openGraph: {
      type: data?.openGraph?.type || 'website',
      image: data?.openGraph?.image,
      locale: data?.openGraph?.locale || 'en_US'
    },
    twitter: {
      card: data?.twitter?.card || 'summary_large_image',
      site: data?.twitter?.site,
      creator: data?.twitter?.creator
    }
  };

  return cached;
}

export function getDefaultMetadata(): Metadata {
  const cfg = loadSeoConfig();

  const title: Metadata['title'] = cfg.titleTemplate
    ? { default: cfg.title, template: cfg.titleTemplate }
    : { default: cfg.title, template: `%s | ${cfg.title}` };

  const ogImages = cfg.openGraph?.image
    ? [{ url: cfg.openGraph.image.startsWith('http') ? cfg.openGraph.image : `${cfg.siteUrl}${cfg.openGraph.image}` }]
    : undefined;

  return {
    metadataBase: new URL(cfg.siteUrl),
    title,
    description: cfg.description,
    alternates: { canonical: '/' },
    openGraph: {
      type: (cfg.openGraph?.type || 'website') as OGType,
      locale: cfg.openGraph?.locale,
      title: cfg.title,
      description: cfg.description,
      url: cfg.siteUrl,
      images: ogImages
    },
    twitter: {
      card: cfg.twitter?.card || 'summary_large_image',
      site: cfg.twitter?.site,
      creator: cfg.twitter?.creator,
      title: cfg.title,
      description: cfg.description,
      images: ogImages as any
    }
  } satisfies Metadata;
}

export function getPostMetadata({
  title,
  description,
  slug
}: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  const cfg = loadSeoConfig();
  const url = `${cfg.siteUrl}/blog/${slug}`;
  const pageTitle: Metadata['title'] = cfg.titleTemplate
    ? { default: cfg.title, template: cfg.titleTemplate.replace('%s', title) }
    : { default: cfg.title, template: `${title} | ${cfg.title}` };

  return {
    metadataBase: new URL(cfg.siteUrl),
    title: pageTitle,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url
    },
    twitter: {
      card: cfg.twitter?.card || 'summary_large_image',
      title,
      description
    }
  } satisfies Metadata;
}
