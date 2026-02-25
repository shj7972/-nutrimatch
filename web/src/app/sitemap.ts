import { MetadataRoute } from 'next';
import supplementsData from '@/data/supplements.json';
import guidePosts from '@/data/guide_posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nutrimatch.kr';

    // Static routes
    const routes = [
        { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'daily' as const },
        { url: `${baseUrl}/guide`, priority: 0.9, changeFrequency: 'weekly' as const },
    ].map((r) => ({ ...r, lastModified: new Date() }));

    // Dynamic routes (supplements)
    const supplementRoutes = supplementsData.map((supplement) => ({
        url: `${baseUrl}/nutrient/${supplement.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Guide routes
    const guideRoutes = guidePosts.map((post) => ({
        url: `${baseUrl}/guide/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...supplementRoutes, ...guideRoutes];
}
