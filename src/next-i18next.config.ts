// src/next-i18next.config.ts
import { i18n } from './i18n.config';

export const withNextI18Next = (nextConfig: any) => {
    return { ...nextConfig, i18n };
};