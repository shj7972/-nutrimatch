"use client";

import Link from "next/link";
import {
    ArrowLeft,
    ThumbsUp,
    ThumbsDown,
    Clock,
    Lightbulb,
    HelpCircle,
    Pill,
    CheckCircle2,
    XCircle,
} from "lucide-react";

interface PairDetailClientProps {
    slug: string;
    nameA: string;
    nameB: string;
    idA: string;
    idB: string;
    verdict: "good" | "bad";
    title: string;
    summary: string;
    body: string;
    timing: string;
    tips: string[];
    faq: { q: string; a: string }[];
    related: { slug: string; label: string; verdict: "good" | "bad" }[];
}

export default function PairDetailClient({
    nameA,
    nameB,
    idA,
    idB,
    verdict,
    title,
    summary,
    body,
    timing,
    tips,
    faq,
    related,
}: PairDetailClientProps) {
    const isGood = verdict === "good";

    // 본문을 문단 단위로 분리
    const paragraphs = body.split(/\n\n+/).filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header / Nav */}
            <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
                    <Link href="/" className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">돌아가기</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
                {/* Hero */}
                <section className={`rounded-3xl p-8 shadow-sm border text-center relative overflow-hidden ${
                    isGood
                        ? "bg-gradient-to-b from-emerald-50 to-white border-emerald-100"
                        : "bg-gradient-to-b from-amber-50 to-white border-amber-200"
                }`}>
                    <div className={`absolute top-0 inset-x-0 h-2 ${isGood ? "bg-gradient-to-r from-emerald-400 to-teal-500" : "bg-gradient-to-r from-amber-400 to-orange-500"}`} />
                    <div className={`inline-flex p-4 rounded-full mb-4 ring-4 ${isGood ? "bg-emerald-100 text-emerald-600 ring-emerald-50" : "bg-amber-100 text-amber-600 ring-amber-50"}`}>
                        {isGood ? <ThumbsUp className="w-10 h-10" /> : <ThumbsDown className="w-10 h-10" />}
                    </div>
                    <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${isGood ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {isGood ? "✅ 함께 먹으면 좋은 조합" : "⚠️ 분리해서 먹어야 하는 조합"}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 leading-snug">
                        {nameA} × {nameB}
                    </h1>
                    <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
                        {summary}
                    </p>
                </section>

                {/* 상세 설명 */}
                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                    <h2 className={`text-xl font-bold flex items-center gap-2 mb-5 ${isGood ? "text-emerald-700" : "text-amber-700"}`}>
                        {isGood ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                        {isGood ? "왜 함께 먹으면 좋을까요?" : "왜 조심해야 할까요?"}
                    </h2>
                    <div className="space-y-4">
                        {paragraphs.map((p, i) => (
                            <p key={i} className="text-slate-700 leading-relaxed">{p}</p>
                        ))}
                    </div>
                </section>

                {/* 복용 시간 가이드 */}
                <section className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h2 className="text-lg font-bold flex items-center gap-2 mb-3 text-blue-700">
                        <Clock className="w-5 h-5" /> 복용 시간 가이드
                    </h2>
                    <p className="text-slate-700 leading-relaxed">{timing}</p>
                </section>

                {/* 실전 팁 */}
                {tips.length > 0 && (
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-indigo-700">
                            <Lightbulb className="w-5 h-5" /> 실전 팁
                        </h2>
                        <ul className="space-y-3">
                            {tips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
                                    <span className="bg-indigo-100 text-indigo-600 rounded-full p-0.5 mt-1 min-w-[16px] h-4 flex items-center justify-center text-[10px] shrink-0">{i + 1}</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* FAQ */}
                {faq.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                            <HelpCircle className="w-5 h-5 text-slate-500" /> 자주 묻는 질문
                        </h2>
                        {faq.map((f, i) => (
                            <details key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden group">
                                <summary className="cursor-pointer px-5 py-4 font-medium text-slate-800 flex items-center justify-between gap-3">
                                    <span>Q. {f.q}</span>
                                    <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0">▾</span>
                                </summary>
                                <div className="px-5 pb-4 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                                    {f.a}
                                </div>
                            </details>
                        ))}
                    </section>
                )}

                {/* 관련 조합 (내부 링크) */}
                {related.length > 0 && (
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">함께 확인하면 좋은 궁합</h2>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {related.map((r) => (
                                <Link
                                    key={r.slug}
                                    href={`/pair/${r.slug}`}
                                    className="block p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-sm"
                                >
                                    <span className="flex items-center gap-2">
                                        {r.verdict === "good"
                                            ? <ThumbsUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                            : <ThumbsDown className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                                        <span className="text-slate-700">{r.label}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 개별 성분 페이지 링크 */}
                <div className="grid grid-cols-2 gap-3">
                    <Link href={`/nutrient/${idA}`} className="bg-white hover:bg-slate-100 border border-slate-200 rounded-xl p-4 text-center transition-all">
                        <Pill className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                        <span className="text-sm font-medium text-slate-700">{nameA} 상세 보기</span>
                    </Link>
                    <Link href={`/nutrient/${idB}`} className="bg-white hover:bg-slate-100 border border-slate-200 rounded-xl p-4 text-center transition-all">
                        <Pill className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                        <span className="text-sm font-medium text-slate-700">{nameB} 상세 보기</span>
                    </Link>
                </div>

                {/* 궁합 분석기 CTA */}
                <div className="text-center">
                    <Link
                        href={`/?s=${idA}`}
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
                    내용은 최신 정보를 반영해 정기적으로 업데이트됩니다.
                </p>
            </main>
        </div>
    );
}