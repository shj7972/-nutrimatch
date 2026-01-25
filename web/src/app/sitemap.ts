import { MetadataRoute } from 'next';
import supplementsData from '@/data/supplements.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nutrimatch.kr';

    // Static routes
    const routes = [
        '',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    // Dynamic routes (supplements)
    const supplementRoutes = supplementsData.map((supplement) => ({
        url: `${baseUrl}/nutrient/${supplement.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...supplementRoutes];
}
