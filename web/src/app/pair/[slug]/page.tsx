import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import supplementsData from "@/data/supplements.json";
import pairContent from "@/data/pair_content.json";
import PairDetailClient from "@/components/PairDetailClient";
import { Supplement } from "@/types";

const supplements = supplementsData as unknown as Supplement[];

interface PairPost {
    slug: string;
    a: string;
    b: string;
    verdict: "good" | "bad";
    title: string;
    summary: string;
    synergy?: string;
    risk?: string;
    timing: string;
    tips: string[];
    faq: { q: string; a: string }[];
}

const pairs = pairContent as unknown as PairPost[];

export function getPairBySlug(slug: string): PairPost | undefined {
    return pairs.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
    return pairs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const pair = pairs.find((p) => p.slug === slug);
    if (!pair) return { title: "궁합 정보를 찾을 수 없습니다" };

    const nameA = supplements.find((s) => s.id === pair.a)?.name ?? pair.a;
    const nameB = supplements.find((s) => s.id === pair.b)?.name ?? pair.b;
    const url = `${siteConfig.url}/pair/${slug}`;

    return {
        title: `${pair.title} | ${siteConfig.name}`,
        description: pair.summary,
        keywords: [
            `${nameA} ${nameB} 궁합`,
            `${nameA} ${nameB} 같이 먹기`,
            `${nameA} ${nameB} 함께`,
            "영양제 궁합",
            "영양제 조합",
            `${nameA} 효능`,
            `${nameB} 효능`,
        ],
        alternates: { canonical: url },
        openGraph: {
            title: pair.title,
            description: pair.summary,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "article",
            images: [{
                url: `${siteConfig.url}/api/og?title=${encodeURIComponent(pair.title)}&subtitle=${encodeURIComponent(pair.summary.slice(0, 60))}`,
                width: 1200,
                height: 630,
                alt: pair.title,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: pair.title,
            description: pair.summary,
        },
    };
}

export default async function PairPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const pair = pairs.find((p) => p.slug === slug);
    if (!pair) return notFound();

    const nameA = supplements.find((s) => s.id === pair.a)?.name ?? pair.a;
    const nameB = supplements.find((s) => s.id === pair.b)?.name ?? pair.b;

    // 같은 영양제가 포함된 다른 조합 (내부 링크)
    const related = pairs
        .filter((p) => p.slug !== slug && (p.a === pair.a || p.b === pair.a || p.a === pair.b || p.b === pair.b))
        .slice(0, 6);

    // JSON-LD FAQ 스키마
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pair.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <PairDetailClient
                slug={slug}
                nameA={nameA}
                nameB={nameB}
                idA={pair.a}
                idB={pair.b}
                verdict={pair.verdict}
                title={pair.title}
                summary={pair.summary}
                body={pair.verdict === "good" ? (pair.synergy ?? "") : (pair.risk ?? "")}
                timing={pair.timing}
                tips={pair.tips}
                faq={pair.faq}
                related={related.map((r) => ({
                    slug: r.slug,
                    label: `${supplements.find((s) => s.id === r.a)?.name ?? r.a} × ${supplements.find((s) => s.id === r.b)?.name ?? r.b}`,
                    verdict: r.verdict,
                }))}
            />
        </>
    );
}