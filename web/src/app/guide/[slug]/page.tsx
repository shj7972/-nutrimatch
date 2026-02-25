import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import guidePosts from "@/data/guide_posts.json";
import supplementsData from "@/data/supplements.json";
import { Supplement } from "@/types";
import { ArrowLeft, BookOpen, Tag, ArrowRight, Pill } from "lucide-react";
import AdBanner from "@/components/AdBanner";

interface Section {
    heading: string;
    body: string;
}

interface GuidePost {
    slug: string;
    title: string;
    description: string;
    category: string;
    keyword: string;
    date: string;
    relatedSupplements: string[];
    sections: Section[];
}

const posts = guidePosts as GuidePost[];

export async function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) return { title: "가이드를 찾을 수 없습니다" };

    return {
        title: `${post.title} | Nutri-Match 가이드`,
        description: post.description,
        keywords: [post.keyword, post.category, "영양제", "Nutri-Match"],
        alternates: { canonical: `https://nutrimatch.kr/guide/${slug}` },
        openGraph: {
            title: post.title,
            description: post.description,
            url: `https://nutrimatch.kr/guide/${slug}`,
            siteName: "Nutri-Match",
            locale: "ko_KR",
            type: "article",
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

function renderBody(text: string) {
    // Convert **bold** to <strong>, and \n to <br>
    const html = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n\n/g, "</p><p class='mt-3'>")
        .replace(/\n/g, "<br />");
    return `<p class='mt-3'>${html}</p>`;
}

export default async function GuideDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) return notFound();

    const relatedSupps = (supplementsData as unknown as Supplement[]).filter((s) =>
        post.relatedSupplements.includes(s.id)
    );

    // JSON-LD Article
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        url: `https://nutrimatch.kr/guide/${slug}`,
        datePublished: post.date,
        publisher: {
            "@type": "Organization",
            name: "Nutri-Match",
            url: "https://nutrimatch.kr",
        },
        inLanguage: "ko",
    };

    const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header */}
            <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
                    <Link
                        href="/guide"
                        className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">가이드 목록</span>
                    </Link>
                    <Link href="/" className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center gap-1">
                        <Pill className="w-4 h-4" /> 궁합 분석기
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Article Hero */}
                <article>
                    <header className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                                <Tag className="w-3 h-3" />
                                {post.category}
                            </span>
                            <span className="text-xs text-slate-400">{post.date}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-4">
                            {post.title}
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed border-l-4 border-blue-300 pl-4 bg-blue-50 py-3 pr-4 rounded-r-xl">
                            {post.description}
                        </p>
                    </header>

                    {/* Sections */}
                    <div className="space-y-8">
                        {post.sections.map((section, idx) => (
                            <section key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                        {idx + 1}
                                    </span>
                                    {section.heading}
                                </h2>
                                <div
                                    className="text-slate-600 leading-relaxed prose prose-slate max-w-none [&_strong]:text-slate-800 [&_strong]:font-bold"
                                    dangerouslySetInnerHTML={{ __html: renderBody(section.body) }}
                                />
                            </section>
                        ))}
                    </div>
                </article>

                {/* AdSense */}
                <div className="mt-8">
                    <AdBanner slot="5678901234" format="rectangle" className="rounded-xl min-h-[100px] bg-slate-100" />
                </div>

                {/* 관련 영양제 */}
                {relatedSupps.length > 0 && (
                    <section className="mt-8">
                        <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                            <Pill className="w-5 h-5 text-blue-600" />
                            이 글과 관련된 영양제
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {relatedSupps.map((s) => (
                                <Link
                                    key={s.id}
                                    href={`/nutrient/${s.id}`}
                                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                                >
                                    <p className="font-bold text-slate-700 group-hover:text-blue-700 text-sm">{s.name}</p>
                                    <p className="text-xs text-slate-400 mt-1">{s.category}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 궁합 분석기 CTA */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <h2 className="font-bold text-lg mb-1">내 영양제 궁합도 확인해보세요</h2>
                    <p className="text-blue-100 text-sm mb-4">섭취 중인 영양제를 선택하면 1초 만에 궁합을 분석해 드려요</p>
                    <Link
                        href={`/?s=${post.relatedSupplements.join(",")}`}
                        className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-2.5 px-5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
                    >
                        <Pill className="w-4 h-4" />
                        관련 영양제로 바로 분석하기
                    </Link>
                </div>

                {/* 다른 가이드 */}
                {otherPosts.length > 0 && (
                    <section className="mt-10">
                        <h2 className="font-bold text-slate-800 text-lg mb-4">다른 가이드도 읽어보세요</h2>
                        <div className="space-y-3">
                            {otherPosts.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/guide/${p.slug}`}
                                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group"
                                >
                                    <div>
                                        <p className="font-semibold text-slate-700 group-hover:text-blue-700 text-sm leading-tight">{p.title}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{p.category}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 flex-shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
