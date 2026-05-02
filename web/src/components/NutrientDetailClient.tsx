"use client";

import { useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import supplementsData from "@/data/supplements.json";
import { Supplement } from "@/types";
import { COUPANG_LINKS, COUPANG_FALLBACK_URL } from "@/constants/healthGoals";
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
} from "lucide-react";


export default function NutrientDetailClient({ id }: { id: string }) {
    const supplement = useMemo(() => {
        return (supplementsData as unknown as Supplement[]).find((s) => s.id === id);
    }, [id]);

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
                        {/* 쿠팡 */}
                        {coupangLink && (
                            <a
                                href={coupangLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-0.5 group relative overflow-hidden"
                            >
                                <div className="flex items-center gap-1.5">
                                    <div className="bg-red-500 p-0.5 rounded-sm">
                                        <span className="text-[10px] font-black tracking-tighter text-white">R</span>
                                    </div>
                                    <span className="text-sm font-bold">쿠팡 로켓배송</span>
                                </div>
                                <span className="text-[10px] opacity-80">내일 새벽 도착 🚀</span>
                            </a>
                        )}
                        {/* 아이허브 */}
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
                        {/* 쿠팡 링크가 없으면 파트너스 fallback */}
                        {!coupangLink && (
                            <a
                                href={COUPANG_FALLBACK_URL}
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
                                <span className="text-[10px] opacity-80">최저가 확인 🚀</span>
                            </a>
                        )}
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

                {/* 궁합 분석기로 이동 */}
                <div className="text-center">
                    <Link
                        href={`/?s=${id}`}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95"
                    >
                        <Pill className="w-4 h-4" />
                        {supplement.name}를 포함해서 궁합 분석하기
                    </Link>
                </div>

            </main>
        </div>
    );
}
