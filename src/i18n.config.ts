// src/i18n.config.ts
import path from 'path';

export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'ne'],
} as const;
export const localePath = path.resolve('./public/locales');
export const reloadOnPrerender = process.env.NODE_ENV === 'development';