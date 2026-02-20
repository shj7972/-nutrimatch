import { Metadata } from "next";
import { notFound } from "next/navigation";
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
        };
    }

    const title = `${supplement.name} 효능, 부작용, 복용법`;
    const description = `${supplement.name} - ${supplement.description} 섭취 시간: ${supplement.timing || "식후 권장"}. ${supplement.efficacy?.slice(0, 2).join(", ") || ""}`;

    return {
        title,
        description,
        keywords: [supplement.name, `${supplement.name} 효능`, `${supplement.name} 부작용`, `${supplement.name} 복용법`, supplement.category, "영양제 궁합"],
        alternates: {
            canonical: `https://nutrimatch.kr/nutrient/${id}`,
        },
        openGraph: {
            title: `${title} | Nutri-Match`,
            description,
            url: `https://nutrimatch.kr/nutrient/${id}`,
            siteName: "Nutri-Match",
            locale: "ko_KR",
            type: "article",
        },
        twitter: {
            card: "summary",
            title: `${title} | Nutri-Match`,
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
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${supplement.name} 효능, 부작용, 복용법`,
        "description": supplement.description,
        "url": `https://nutrimatch.kr/nutrient/${id}`,
        "publisher": {
            "@type": "Organization",
            "name": "Nutri-Match"
        },
        "about": {
            "@type": "Drug",
            "name": supplement.name,
            "description": supplement.description,
        },
        "inLanguage": "ko"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <NutrientDetailClient id={id} />
        </>
    );
}
