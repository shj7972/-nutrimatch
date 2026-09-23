import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import supplementsData from "@/data/supplements.json";
import pairContent from "@/data/pair_content.json";
import { Supplement } from "@/types";
import { ThumbsUp, ThumbsDown, Pill } from "lucide-react";

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

export const metadata: Metadata = {
    title: `영양제 궁합 조합 총정리 — 좋은 조합과 피해야 할 조합 | ${siteConfig.name}`,
    description:
        "인기 영양제 궁합 32가지를 한눈에. NMN+레스베라트롤 같은 시너지 조합부터 철분+칼슘처럼 피해야 할 조합까지, 복용 시간 가이드와 함께 확인하세요.",
    keywords: [
        "영양제 궁합",
        "영양제 조합",
        "영양제 같이 먹기",
        "영양제 상성",
        "함께 먹으면 안 되는 영양제",
        "영양제 복용 시간",
        "시너지 영양제",
    ],
    alternates: { canonical: `${siteConfig.url}/pair` },
};

export default function PairIndexPage() {
    const nameOf = (id: string) => supplements.find((s) => s.id === id)?.name ?? id;
    const goodPairs = pairs.filter((p) => p.verdict === "good");
    const badPairs = pairs.filter((p) => p.verdict === "bad");

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
                    <Link href="/" className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors">
                        <Pill className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-slate-800">Nutri-Match</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
                <section className="text-center space-y-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        영양제 궁합 조합 총정리
                    </h1>
                    <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
                        "이거랑 같이 먹어도 될까?" — 가장 많이 검색되는 영양제 조합 {pairs.length}가지를
                        복용 시간 가이드와 함께 정리했습니다.
                    </p>
                </section>

                {/* 좋은 조합 */}
                <section className="space-y-3">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-700">
                        <ThumbsUp className="w-5 h-5" /> 함께 먹으면 좋은 조합 {goodPairs.length}가지
                    </h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {goodPairs.map((p) => (
                            <Link
                                key={p.slug}
                                href={`/pair/${p.slug}`}
                                className="block bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all"
                            >
                                <span className="text-sm font-bold text-slate-800">
                                    {nameOf(p.a)} × {nameOf(p.b)}
                                </span>
                                <span className="block text-xs text-slate-500 mt-1 line-clamp-2">{p.summary}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 피해야 할 조합 */}
                <section className="space-y-3">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-amber-700">
                        <ThumbsDown className="w-5 h-5" /> 분리해서 먹어야 하는 조합 {badPairs.length}가지
                    </h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {badPairs.map((p) => (
                            <Link
                                key={p.slug}
                                href={`/pair/${p.slug}`}
                                className="block bg-white p-4 rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
                            >
                                <span className="text-sm font-bold text-slate-800">
                                    {nameOf(p.a)} × {nameOf(p.b)}
                                </span>
                                <span className="text-xs text-amber-600 bg-amber-50 rounded px-1.5 py-0.5 ml-1">주의</span>
                                <span className="text-sm text-slate-500 mt-1 line-clamp-2 block">{p.summary}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 궁합 분석기 CTA */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95"
                    >
                        <Pill className="w-4 h-4" />
                        내 영양제 궁합 1초 만에 확인하기
                    </Link>
                </div>

                {/* 면책 조항 (YMYL) */}
                <p className="text-[11px] text-slate-400 leading-relaxed text-center px-4">
                    본 콘텐츠는 일반적인 건강 정보를 제공하며, 의학적 조언을 대체하지 않습니다.
                    개인의 건강 상태에 따라 다를 수 있으므로 복용 전 약사 또는 의사와 상담하시기 바랍니다.
                </p>
            </main>
        </div>
    );
}