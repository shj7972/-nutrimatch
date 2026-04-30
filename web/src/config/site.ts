// SEO 및 사이트 설정 중앙 관리
export const siteConfig = {
  name: "Nutri-Match",
  shortName: "NutriMatch",
  url: "https://nutrimatch.kr",
  ogImage: "https://nutrimatch.kr/opengraph-image",
  description: {
    default: "나만의 영양제 궁합 분석기. 영양제 조합의 시너지와 부작용을 1초 만에 확인하세요.",
    long: "내가 먹는 영양제, 같이 먹어도 될까? Nutri-Match에서 1초 만에 궁합과 부작용을 확인하세요. 저속노화(NMN, 레스베라트롤, 유로리틴A) 조합, 영양제 섭취 시간까지 완벽 가이드.",
  },
  keywords: [
    "영양제 궁합",
    "영양제 조합",
    "저속노화",
    "NMN",
    "레스베라트롤",
    "유로리틴A",
    "영양제 부작용",
    "영양제 섭취 시간",
    "오메가3",
    "비타민D",
    "유산균",
    "마그네슘",
    "영양제 추천",
    "영양제 상성",
    "필수 영양제",
    "건강기능식품",
    "노화방지",
    "미토콘드리아",
    "텔로미어",
  ],
  authors: [
    { name: "Nutri-Match Team", url: "https://nutrimatch.kr" }
  ],
  creator: "Nutri-Match Team",
  publisher: "Nutri-Match",
  language: "ko-KR",
  locale: "ko_KR",
  
  // 검색 엔진 연동
  verification: {
    naver: [
      "291b9dbe622f35d01031c809e42264fefc9040fe",
      "ddc3f85be72e592f1ac7cd102717668866bc8e57",
    ],
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // 교체 필요
    bing: "YOUR_BING_VERIFICATION_CODE", // 교체 필요
  },
  
  // 광고/분석
  adsense: {
    account: "ca-pub-2947913248390883",
  },
  analytics: {
    ga4: "G-WHHQ1PBQRE",
  },
  
  // 소셜 미디어
  social: {
    twitter: "@nutrimatch",
    facebook: "https://facebook.com/nutrimatch",
    instagram: "https://instagram.com/nutrimatch",
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://nutrimatch.kr",
    siteName: "Nutri-Match",
    images: [
      {
        url: "https://nutrimatch.kr/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nutri-Match - 나만의 영양제 궁합 분석기",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@nutrimatch",
    creator: "@nutrimatch",
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  
  // PWA
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  backgroundColor: "#ffffff",
};

// 페이지별 메타데이터 생성 헬퍼
export function generateMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}) {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.name;
    
  const fullDescription = description || siteConfig.description.default;
  const fullUrl = `${siteConfig.url}${path}`;
  const fullKeywords = [...siteConfig.keywords, ...keywords];
  
  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    
    // Canonical
    alternates: {
      canonical: fullUrl,
    },
    
    // Open Graph
    openGraph: {
      ...siteConfig.openGraph,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      images: ogImage ? [ogImage] : siteConfig.openGraph.images,
    },
    
    // Twitter
    twitter: {
      ...siteConfig.twitter,
      title: fullTitle,
      description: fullDescription,
      images: ogImage ? [ogImage] : siteConfig.openGraph.images,
    },
    
    // Robots
    robots: noIndex ? { index: false, follow: false } : siteConfig.robots,
    
    // 기타
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
  };
}

// JSON-LD 생성 헬퍼
export function generateWebAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description.default,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    inLanguage: siteConfig.language,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      `https://twitter.com/${siteConfig.social.twitter.slice(1)}`,
    ],
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQJsonLd(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replace(/\*\*(.*?)\*\*/g, "$1"),
      },
    })),
  };
}
