import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, generateOrganizationJsonLd } from "@/config/site";
import supplementsData from "@/data/supplements.json";
import { Supplement } from "@/types";
import NutrientDetailClient from "@/components/NutrientDetailClient";

const supplements = supplementsData as unknown as Supplement[];

// Generate static params for all supplements
export async function generateStaticParams() {
    return supplements.map((s) => ({
        id: s.id,
    }));
}

// Generate dynamic metadata for each supplement page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const supplement = supplements.find((s) => s.id === id);

    if (!supplement) {
        return {
            title: "영양제를 찾을 수 없습니다",
            robots: { index: false, follow: false },
        };
    }

    const fullTitle = `${supplement.name} - 효능, 부작용, 궁합 | ${siteConfig.name}`;
    const description = `${supplement.name}의 효능, 부작용, 추천 섭취량 및 다른 영양제와의 궁합을 확인하세요. ${supplement.description.slice(0, 60)}...`;
    const url = `${siteConfig.url}/nutrient/${id}`;

    return {
        title: fullTitle,
        description,
        keywords: [
            supplement.name, 
            `${supplement.name} 효능`, 
            `${supplement.name} 부작용`, 
            `${supplement.name} 복용법`, 
            supplement.category, 
            "영양제 궁합",
            "영양제 상세"
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "article",
            images: [{
                url: `${siteConfig.url}/api/og?title=${encodeURIComponent(supplement.name)}`,
                width: 1200,
                height: 630,
                alt: `${supplement.name} 상세 정보`,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
        },
    };
}

export default async function NutrientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supplement = supplements.find((s) => s.id === id);

    if (!supplement) {
        return notFound();
    }

    // JSON-LD Article structured data
    const organizationJsonLd = generateOrganizationJsonLd();
    
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${supplement.name} 효능, 부작용, 복용법`,
        description: supplement.description,
        url: `${siteConfig.url}/nutrient/${id}`,
        publisher: organizationJsonLd,
        author: organizationJsonLd,
        about: {
            "@type": "Drug",
            name: supplement.name,
            description: supplement.description,
        },
        inLanguage: siteConfig.language,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/nutrient/${id}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <NutrientDetailClient id={id} />
        </>
    );
}
