import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import supplementsData from '@/data/supplements.json';
import guidePosts from '@/data/guide_posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static routes with priorities
  const routes: MetadataRoute.Sitemap = [
    { 
      url: baseUrl, 
      priority: 1.0, 
      changeFrequency: 'daily',
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/guide`, 
      priority: 0.9, 
      changeFrequency: 'weekly',
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/sitemap.xml`, 
      priority: 0.1, 
      changeFrequency: 'daily',
      lastModified: new Date(),
    },
  ];

  // Dynamic routes (supplements) - 영양제 상세 페이지
  const supplementRoutes: MetadataRoute.Sitemap = supplementsData.map((supplement) => ({
    url: `${baseUrl}/nutrient/${supplement.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Guide routes - 가이드 페이지
  const guideRoutes: MetadataRoute.Sitemap = guidePosts.map((post) => ({
    url: `${baseUrl}/guide/${post.slug}`,
    lastModified: new Date(post.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Image sitemap reference (optional, for SEO)
  const imageSitemap = {
    url: `${baseUrl}/image-sitemap.xml`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  };

  return [...routes, ...supplementRoutes, ...guideRoutes, imageSitemap];
}
