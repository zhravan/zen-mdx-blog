import { z } from 'zod';

export const shareButtonsConfigSchema = z.object({
  enabled: z.boolean().default(true),
  previewOnly: z.boolean().default(false),
  position: z.enum(['top', 'bottom', 'both']).default('bottom'),
  showLabels: z.boolean().default(false),
  buttons: z.object({
    twitter: z.boolean().default(true),
    linkedin: z.boolean().default(true),
    reddit: z.boolean().default(true),
    copy: z.boolean().default(true),
    native: z.boolean().default(true),
  }).default({}),
  style: z.object({
    size: z.enum(['sm', 'md', 'lg']).default('md'),
    variant: z.enum(['minimal', 'outline', 'solid']).default('outline'),
  }).default({}),
});

export type ShareButtonsConfig = z.infer<typeof shareButtonsConfigSchema>;

export const defaultConfig: ShareButtonsConfig = {
  enabled: true,
  previewOnly: false,
  position: 'bottom',
  showLabels: false,
  buttons: {
    twitter: true,
    linkedin: true,
    reddit: true,
    copy: true,
    native: true,
  },
  style: {
    size: 'md',
    variant: 'outline',
  },
};
