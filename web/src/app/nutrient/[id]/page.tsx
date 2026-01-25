"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link"; // For Nextjs 13+ (or 'next/link')
import { notFound } from "next/navigation";
import supplementsData from "@/data/supplements.json";
import { Supplement } from "@/types";
import {
    Clock,
    AlertTriangle,
    CheckCircle2,
    ArrowLeft,
    ThumbsUp,
    ThumbsDown,
    ShieldAlert,
    Pill
} from "lucide-react";
import clsx from "clsx";

export default function NutrientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15+ allows params to be awaited or used with `use` hook depending on exact version/config.
    // Assuming standard Next 14/15 behavior where params is a Promise in server components but here we are "use client";
    // Actually, in "use client", params is passed as a prop but if it's async (Next 15), we need to unwrap it.
    // Let's assume standard behavior for now. If build fails, we adjust.
    // Since 'params' typings in Next 15 are async in Layouts/Pages.
    const { id } = use(params);

    const supplement = useMemo(() => {
        return (supplementsData as unknown as Supplement[]).find((s) => s.id === id);
    }, [id]);

    if (!supplement) {
        return notFound();
    }

    // Find related items for linking
    const bestCombos = (supplementsData as unknown as Supplement[]).filter(s => supplement.best_with.includes(s.id));
    const worstCombos = (supplementsData as unknown as Supplement[]).filter(s => supplement.worst_with.includes(s.id));

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
                        {/* Placeholder Icon Logic or just generic */}
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

            </main>
        </div>
    );
}
