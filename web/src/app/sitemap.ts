import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import supplementsData from '@/data/supplements.json';
import guidePosts from '@/data/guide_posts.json';
import pairContent from '@/data/pair_content.json';
import { SYMPTOM_KEYS, AGE_KEYS } from '@/constants/recommendations';

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
      url: `${baseUrl}/faq`, 
      priority: 0.8, 
      changeFrequency: 'monthly',
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/symptom`, 
      priority: 0.85, 
      changeFrequency: 'weekly',
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/routine`, 
      priority: 0.85, 
      changeFrequency: 'weekly',
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/sitemap.xml`, 
      priority: 0.1, 
      changeFrequency: 'daily',
      lastModified: new Date(),
    },
    { 
      url: `${baseUrl}/privacy`, 
      priority: 0.3, 
      changeFrequency: 'yearly',
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
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 증상별 추천 페이지
  const symptomRoutes: MetadataRoute.Sitemap = SYMPTOM_KEYS.map((name) => ({
    url: `${baseUrl}/symptom/${name}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 연령별 추천 페이지
  const routineRoutes: MetadataRoute.Sitemap = AGE_KEYS.map((age) => ({
    url: `${baseUrl}/routine/${age}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 궁합 조합 페이지
  const pairRoutes: MetadataRoute.Sitemap = [{
    url: `${baseUrl}/pair`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }, ...(pairContent as { slug: string }[]).map((pair) => ({
    url: `${baseUrl}/pair/${pair.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))];

  return [
    ...routes,
    ...supplementRoutes,
    ...guideRoutes,
    ...symptomRoutes,
    ...routineRoutes,
    ...pairRoutes,
  ];
}

