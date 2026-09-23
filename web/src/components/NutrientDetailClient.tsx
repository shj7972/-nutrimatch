"use client";

import { useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import supplementsData from "@/data/supplements.json";
import { Supplement } from "@/types";
import { COUPANG_LINKS, COUPANG_FALLBACK_URL } from "@/constants/healthGoals";
import detailExpansion from "@/data/detail_expansion.json";
import {
    Clock,
    AlertTriangle,
    CheckCircle2,
    ArrowLeft,
    ThumbsUp,
    ThumbsDown,
    ShieldAlert,
    Pill,
    ShoppingBag,
    HelpCircle,
    BookOpen,
    CalendarClock,
    Users,
    Lightbulb,
} from "lucide-react";

interface DetailExpansion {
    intro: string;
    sections: { heading: string; body: string }[];
    faqs: { q: string; a: string }[];
    dosage_table: string;
}


export default function NutrientDetailClient({ id }: { id: string }) {
    const supplement = useMemo(() => {
        return (supplementsData as unknown as Supplement[]).find((s) => s.id === id);
    }, [id]);

    const expansion = (detailExpansion as Record<string, DetailExpansion | undefined>)[id];

    if (!supplement) {
        return notFound();
    }

    // Find related items for linking
    const bestCombos = (supplementsData as unknown as Supplement[]).filter(s => supplement.best_with.includes(s.id));
    const worstCombos = (supplementsData as unknown as Supplement[]).filter(s => supplement.worst_with.includes(s.id));

    const coupangLink = COUPANG_LINKS[id];
    const iherbQuery = encodeURIComponent(supplement.name);

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

                {/* Hero section */}
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                    <div className="inline-flex bg-blue-50 p-4 rounded-full text-blue-600 mb-4 ring-4 ring-blue-50/50">
                        <Pill className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{supplement.name}</h1>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-sm font-medium mb-6">
                        {supplement.category}
                    </span>
                    <p className="text-slate-600 leading-relaxed max-w-xl mx-auto text-lg">
                        {supplement.description}
                    </p>
                </section>

                {/* 상세 확장: 인트로 */}
                {expansion?.intro && (
                    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                        <div className="space-y-4">
                            {expansion.intro.split(/\n\n+/).filter(Boolean).map((p, i) => (
                                <p key={i} className="text-slate-700 leading-relaxed">{p}</p>
                            ))}
                        </div>
                    </section>
                )}

                {/* 상세 확장: 섹션 본문 */}
                {expansion?.sections?.map((sec, i) => (
                    <section key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-start gap-2 leading-snug">
                            {i === 0 && <CalendarClock className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />}
                            {i === 1 && <Users className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />}
                            {i === 2 && <Pill className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />}
                            {i === 3 && <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />}
                            <span>{sec.heading}</span>
                        </h2>
                        <div className="space-y-4">
                            {sec.body.split(/\n\n+/).filter(Boolean).map((p, j) => (
                                <p key={j} className="text-slate-700 leading-relaxed">{p}</p>
                            ))}
                        </div>
                    </section>
                ))}

                {/* Grid: Efficacy & Timing */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Efficacy */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-emerald-700">
                            <CheckCircle2 className="w-5 h-5" /> 주요 효능
                        </h2>
                        <ul className="space-y-3">
                            {supplement.efficacy?.map((effect, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-slate-700 leading-snug">
                                    <span className="bg-emerald-100 text-emerald-600 rounded-full p-0.5 mt-0.5 min-w-[16px] h-4 flex items-center justify-center text-[10px]">✓</span>
                                    {effect}
                                </li>
                            )) || <li className="text-slate-400">정보 없음</li>}
                        </ul>
                    </section>

                    {/* Timing */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-blue-700">
                            <Clock className="w-5 h-5" /> 섭취 골든타임
                        </h2>
                        <div className="flex-1 flex items-center justify-center bg-blue-50 rounded-xl p-6 text-center">
                            <p className="text-blue-800 font-medium text-lg breaking-keep">
                                {supplement.timing || "식후 섭취 권장"}
                            </p>
                        </div>
                    </section>
                </div>

                {/* Warnings / Side Effects */}
                <section className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-red-700">
                        <AlertTriangle className="w-5 h-5" /> 주의사항 및 부작용
                    </h2>
                    <div className="space-y-4">
                        {supplement.precautions && (
                            <div className="bg-white/60 p-4 rounded-xl">
                                <h3 className="text-sm font-bold text-red-600 mb-1 flex items-center gap-1">
                                    <ShieldAlert className="w-4 h-4" /> 섭취 시 주의
                                </h3>
                                <p className="text-slate-700 text-sm">{supplement.precautions}</p>
                            </div>
                        )}

                        {supplement.side_effects && (
                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-2">흔한 부작용</h3>
                                <div className="flex flex-wrap gap-2">
                                    {supplement.side_effects.map((side, idx) => (
                                        <span key={idx} className="px-2.5 py-1 bg-red-100 text-red-700 text-xs rounded-md font-medium">
                                            {side}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 구매 섹션 */}
                <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                        {supplement.name} 최저가로 구매하기
                    </h2>
                    <p className="text-sm text-slate-500 mb-4">신뢰할 수 있는 공식 채널에서 안전하게 구매하세요.</p>
                    <div className="grid grid-cols-2 gap-3">
                        {/* 쿠팡 파트너스 — 전용 링크 우선, 없으면 fallback (항상 파트너스 집계) */}
                        <a
                            href={coupangLink ?? COUPANG_FALLBACK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-0.5"
                        >
                            <div className="flex items-center gap-1.5">
                                <div className="bg-red-500 p-0.5 rounded-sm">
                                    <span className="text-[10px] font-black tracking-tighter text-white">R</span>
                                </div>
                                <span className="text-sm font-bold">쿠팡 로켓배송</span>
                            </div>
                            <span className="text-[10px] opacity-80">내일 새벽 도착 🚀</span>
                        </a>
                        {/* 아이허브 — rcode=CYX2175 리워드 집계 */}
                        <a
                            href={`https://kr.iherb.com/search?kw=${iherbQuery}&rcode=CYX2175`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#458500] hover:bg-[#3d7400] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-0.5"
                        >
                            <div className="flex items-center gap-1.5">
                                <ShoppingBag className="w-4 h-4" />
                                <span className="text-sm font-bold">아이허브</span>
                            </div>
                            <span className="text-[10px] opacity-80">글로벌 최저가 🌿</span>
                        </a>
                    </div>
                    <p className="text-[11px] text-center text-slate-400 mt-3 leading-relaxed">
                        ⚠️ 이 포스팅은 쿠팡 파트너스 및 아이허브 제휴 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
                    </p>
                </section>

                {/* Combinations Links */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Best Combos */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <ThumbsUp className="w-5 h-5 text-emerald-500" /> 같이 먹으면 좋은 짝꿍
                        </h3>
                        {bestCombos.length > 0 ? (
                            <div className="grid gap-2">
                                {bestCombos.map(s => (
                                    <Link key={s.id} href={`/nutrient/${s.id}`} className="block bg-white p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex justify-between items-center group">
                                        <span className="font-medium text-slate-700 group-hover:text-emerald-700">{s.name}</span>
                                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{s.category}</span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400">특별한 추천 조합이 없습니다.</p>
                        )}
                    </div>

                    {/* Worst Combos */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <ThumbsDown className="w-5 h-5 text-red-500" /> 같이 먹으면 안 좋은 조합
                        </h3>
                        {worstCombos.length > 0 ? (
                            <div className="grid gap-2">
                                {worstCombos.map(s => (
                                    <Link key={s.id} href={`/nutrient/${s.id}`} className="block bg-white p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-md transition-all flex justify-between items-center group">
                                        <span className="font-medium text-slate-700 group-hover:text-red-700">{s.name}</span>
                                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{s.category}</span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400">특별한 주의 조합이 없습니다.</p>
                        )}
                    </div>
                </div>

                {/* FAQ */}
                {expansion?.faqs && expansion.faqs.length > 0 && (
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                            <HelpCircle className="w-5 h-5 text-slate-500" /> 자주 묻는 질문
                        </h2>
                        {expansion.faqs.map((f, i) => (
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

                {/* 저자/업데이트 + 출처 (YMYL 신뢰 장치) */}
                <section className="bg-slate-100 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 작성: Nutri-Match 에디터팀</span>
                        <span className="flex items-center gap-1"><CalendarClock className="w-3.5 h-3.5" /> 최종 업데이트: 2026년 9월 23일</span>
                    </div>
                    <p>
                        참고 자료: 식품의약품안전처 건강기능식품 기능성 정보, 미국 국립보건원(NIH) 보충제 지침, 통합의학 정보. 본 내용은 2026년 9월 기준 최신 정보를 반영했으며, 새로운 연구 결과에 따라 정기적으로 업데이트됩니다.
                    </p>
                </section>

                {/* 궁합 분석기 CTA */}
                <div className="text-center">
                    <Link
                        href={`/?s=${id}`}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95"
                    >
                        <Pill className="w-4 h-4" />
                        {supplement.name}를 포함해서 궁합 분석하기
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
