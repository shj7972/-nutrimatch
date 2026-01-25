"use client";

import { useState, useMemo } from "react";
import supplementsData from "@/data/supplements.json";
import seoContent from "@/data/seo_content.json";
import { Supplement } from "@/types";
import { Check, AlertTriangle, ThumbsUp, ShoppingBag, Pill, Sparkles, Zap, Shield, Crown, RotateCcw, Share2, Copy, Info } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function NutriPage() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const toggleSupplement = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const resetSelection = () => {
        setSelectedIds([]);
        setCopied(false);
    };

    const shareResults = () => {
        const params = new URLSearchParams();
        if (selectedIds.length > 0) {
            params.set("s", selectedIds.join(","));
        }
        // Simulate copying text summary for now, as URL sharing requires backend or URL state implementation
        // Let's copy a nice text summary
        const summary = `💊 Nutri-Match 분석 결과\n선택한 영양제: ${selectedIds.length}개\n\n${analysis.good.length > 0 ? `✅ 꿀조합: ${analysis.good.length}개 발견!` : ""}\n${analysis.bad.length > 0 ? `⚠️ 주의: ${analysis.bad.length}가지 상성 발견!` : ""}\n\n나만의 영양제 궁합을 확인해보세요!`;
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const setLowSpeedAgingCombo = () => {
        // Default Low-Speed Aging package: NMN, Resveratrol, PQQ, Omega3
        const combo = ["nmn", "resveratrol", "pqq", "omega3"];
        setSelectedIds((prev) => Array.from(new Set([...prev, ...combo])));
    };

    const selectedSupplements = useMemo(() => {
        return (supplementsData as unknown as Supplement[]).filter((s) => selectedIds.includes(s.id));
    }, [selectedIds]);

    const analysis = useMemo(() => {
        const good: { s1: Supplement; s2: Supplement }[] = [];
        const bad: { s1: Supplement; s2: Supplement; msg: string | null }[] = [];

        // Check interactions within selected items
        for (let i = 0; i < selectedSupplements.length; i++) {
            for (let j = i + 1; j < selectedSupplements.length; j++) {
                const s1 = selectedSupplements[i];
                const s2 = selectedSupplements[j];

                // Good
                if (s1.best_with.includes(s2.id) || s2.best_with.includes(s1.id)) {
                    good.push({ s1, s2 });
                }

                // Bad
                if (s1.worst_with.includes(s2.id) || s2.worst_with.includes(s1.id)) {
                    // Find caution msg
                    const msg = s1.worst_with.includes(s2.id) ? s1.caution_msg : s2.caution_msg;
                    bad.push({ s1, s2, msg });
                }
            }
        }
        return { good, bad };
    }, [selectedSupplements]);

    const healthTags = useMemo(() => {
        const categories = new Set(selectedSupplements.map((s) => s.category));
        return Array.from(categories);
    }, [selectedSupplements]);

    // Rule 1: "Low Speed Aging Package" Trigger (Strict subset or match?) - Usually "Is Active" if all components present
    const isAntiAgingCombo = useMemo(() => {
        const target = ["nmn", "resveratrol", "pqq", "omega3"];
        return target.every(id => selectedIds.includes(id));
    }, [selectedIds]);

    // Rule 2: "3 Defense Lines" Trigger
    // Energy: NMN or PQQ (User said "NMN, PQQ (Mitochondria)", usually implies both or at least one of the strong mitochondrials)
    // Gene: Resveratrol
    // Lifespan: Astragalus
    const is3DefenseLines = useMemo(() => {
        // Let's be generous: Needs (NMN OR PQQ) AND Resveratrol AND Astragalus
        // OR strictly: NMN AND Resveratrol AND Astragalus? 
        // Prompt: "Energy: NMN, PQQ" -> "Gene: Resveratrol" -> "Lifespan: Astragalus"
        // "You are taking care of all 3 defense lines!" -> implies coverage of all 3 categories.
        // Let's require coverage of each category.

        const hasEnergy = selectedIds.includes("nmn") || selectedIds.includes("pqq");
        const hasGene = selectedIds.includes("resveratrol");
        const hasLifespan = selectedIds.includes("astragalus");

        return hasEnergy && hasGene && hasLifespan;
    }, [selectedIds]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 md:p-6 shadow-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1 rounded-full text-blue-600">
                            <Pill className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Nutri-Match</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={resetSelection}
                            className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                            title="초기화"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span className="hidden sm:inline">초기화</span>
                        </button>
                        <span className="text-sm opacity-90 hidden sm:block ml-2">나만의 영양제 궁합 분석기</span>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section: Tool */}
                <section id="hero" className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-200px)]">

                    {/* Selection Area */}
                    <section className="lg:col-span-7 space-y-6">
                        {/* Special Combo Button */}
                        <button
                            onClick={setLowSpeedAgingCombo}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 group border border-violet-400"
                        >
                            <span className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
                                🐢
                            </span>
                            <span className="font-bold text-lg">저속노화(Slow Aging) 조합 한 번에 선택</span>
                            <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300 animate-pulse" />
                        </button>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-900">
                                <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
                                    <Check className="w-5 h-5" />
                                </div>
                                섭취 중인 영양제를 선택하세요
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {(supplementsData as unknown as Supplement[]).map((item) => {
                                    const isSelected = selectedIds.includes(item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            className={clsx(
                                                "relative rounded-xl border-2 text-left transition-all duration-200 flex flex-col justify-between h-32 overflow-hidden group select-none",
                                                isSelected
                                                    ? "border-blue-500 bg-blue-50 shadow-inner ring-1 ring-blue-500"
                                                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
                                            )}
                                        >
                                            <button
                                                onClick={() => toggleSupplement(item.id)}
                                                className="absolute inset-0 w-full h-full z-0 cursor-pointer"
                                                aria-label={item.name + " 선택"}
                                            />

                                            <div className="p-4 relative pointer-events-none h-full flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <span className={clsx("font-bold text-lg leading-tight break-keep z-10", isSelected ? "text-blue-700" : "text-slate-700 group-hover:text-blue-600")}>
                                                        {item.name}
                                                    </span>
                                                    {isSelected && (
                                                        <div className="text-blue-500 animate-in fade-in zoom-in duration-200">
                                                            <Check className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                                        {item.category}
                                                    </span>
                                                    <Link
                                                        href={`/nutrient/${item.id}`}
                                                        className="pointer-events-auto text-slate-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors z-20"
                                                        onClick={(e) => e.stopPropagation()}
                                                        title="상세 정보 보기"
                                                    >
                                                        <Info className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Analysis Result */}
                    <section className="lg:col-span-5 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 lg:sticky lg:top-24">
                            <div className="flex items-center justify-between mb-4 border-b pb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                                    분석 결과
                                    <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                        {selectedIds.length}개
                                    </span>
                                </h2>
                                {selectedIds.length > 0 && (
                                    <button
                                        onClick={shareResults}
                                        className="text-slate-500 hover:text-blue-600 flex items-center gap-1.5 text-sm font-medium transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                                        {copied ? "복사됨!" : "공유하기"}
                                    </button>
                                )}
                            </div>

                            {selectedIds.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <Pill className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p className="text-lg">영양제를 선택하면<br />궁합을 분석해 드려요!</p>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">

                                    {/* Special Marketing Messages - Stackable */}
                                    {is3DefenseLines && (
                                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden animate-in zoom-in-95 duration-500 ring-2 ring-emerald-200">
                                            <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12">
                                                <Shield className="w-32 h-32" />
                                            </div>
                                            <div className="flex items-start gap-4 relative z-10">
                                                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                                                    <Crown className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1 tracking-tight">당신은 노화의 3대 방어선을 모두 챙기고 계시네요! 🛡️</h3>
                                                    <div className="mt-3 space-y-1 text-sm bg-black/10 p-3 rounded-lg border border-white/10">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-emerald-200 font-bold">⚡ 에너지:</span> 미토콘드리아 부활 (NMN/PQQ)
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-emerald-200 font-bold">🧬 유전자:</span> 장수 유전자 ON (레스베라트롤)
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-emerald-200 font-bold">⏳ 수명:</span> 텔로미어 보호 (황기)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isAntiAgingCombo && !is3DefenseLines && (
                                        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden animate-in zoom-in-95 duration-500">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Sparkles className="w-24 h-24" />
                                            </div>
                                            <div className="flex items-start gap-3 relative z-10">
                                                <div className="bg-white/20 p-2 rounded-full">
                                                    <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1">당신의 세포 나이를 되돌리는 조합이네요!</h3>
                                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                                        NMN, 레스베라트롤, PQQ의 시너지가 미토콘드리아를 깨웁니다.
                                                        제가 아는 최고의 저속노화 루틴입니다! 🐢
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Health Tags */}
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">My Health Tags</p>
                                        <div className="flex flex-wrap gap-2">
                                            {healthTags.map((tag) => (
                                                <span key={tag} className="px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-100 text-teal-700 rounded-lg text-sm font-semibold shadow-sm border border-emerald-100">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interactions */}
                                    <div className="space-y-4">
                                        {/* Good */}
                                        {analysis.good.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="font-bold text-green-700 flex items-center gap-2">
                                                    <ThumbsUp className="w-4 h-4 fill-green-700" /> 꿀조합 발견!
                                                </h3>
                                                {analysis.good.map((combo, idx) => (
                                                    <div key={idx} className="bg-green-50 p-4 rounded-xl border border-green-200 text-sm shadow-sm transition-transform hover:scale-[1.01]">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-bold text-green-800">{combo.s1.name}</span>
                                                            <span className="text-green-300 mx-1">●</span>
                                                            <span className="font-bold text-green-800">{combo.s2.name}</span>
                                                        </div>
                                                        <p className="text-green-700 text-xs">서로의 효능을 높여주거나 흡수를 돕습니다.</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Bad */}
                                        {analysis.bad.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="font-bold text-red-600 flex items-center gap-2">
                                                    <AlertTriangle className="w-4 h-4 fill-red-600" /> 주의가 필요해요
                                                </h3>
                                                {analysis.bad.map((combo, idx) => (
                                                    <div key={idx} className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm shadow-sm relative overflow-hidden transition-transform hover:scale-[1.01]">
                                                        <div className="flex items-center gap-2 mb-1 z-10 relative">
                                                            <span className="font-bold text-red-800">{combo.s1.name}</span>
                                                            <span className="text-red-300 mx-1">●</span>
                                                            <span className="font-bold text-red-800">{combo.s2.name}</span>
                                                        </div>
                                                        <p className="text-red-700 text-xs font-medium z-10 relative">{combo.msg || "상성이 좋지 않습니다."}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {analysis.good.length === 0 && analysis.bad.length === 0 && (
                                            <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-100">
                                                <p className="text-slate-500 text-sm">
                                                    발견된 특이 상성이 없습니다.<br />안심하고 함께 드셔도 좋습니다.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Monetization Strategy: Two-Buttons */}
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <h4 className="text-center text-sm font-bold text-slate-500 mb-3">
                                            선택한 영양제 최저가 확인하기
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Coupang */}
                                            <button
                                                onClick={() => {
                                                    const COUPANG_LINKS: Record<string, string> = {
                                                        "omega3": "https://link.coupang.com/a/dyYztG",
                                                        "multivitamin": "https://link.coupang.com/a/dyY0NM",
                                                        "probiotics": "https://link.coupang.com/a/dyY4DH",
                                                        "magnesium": "https://link.coupang.com/a/dyY5ZR",
                                                        "calcium": "https://link.coupang.com/a/dyZdtI",
                                                        "vit_c": "https://link.coupang.com/a/dyZeNr",
                                                        "vit_d": "https://link.coupang.com/a/dyZfQg",
                                                        "vit_b_complex": "https://link.coupang.com/a/dyZgQH",
                                                        "iron": "https://link.coupang.com/a/dyZi33",
                                                        "zinc": "https://link.coupang.com/a/dyZj5b",
                                                        "lutein": "https://link.coupang.com/a/dyZloa",
                                                        "milk_thistle": "https://link.coupang.com/a/dyZmmG",
                                                        "propolis": "https://link.coupang.com/a/dyZnwh",
                                                        "ginseng": "https://link.coupang.com/a/dyZoy2",
                                                        "collagen": "https://link.coupang.com/a/dyZpw5",
                                                        "coq10": "https://link.coupang.com/a/dyZqw5",
                                                        "msm": "https://link.coupang.com/a/dyZrAy",
                                                        "theanine": "https://link.coupang.com/a/dyZtUm",
                                                        "arginine": "https://link.coupang.com/a/dyZu1E",
                                                        "biotin": "https://link.coupang.com/a/dyZxos",
                                                        "quercetin": "https://link.coupang.com/a/dyZygG",
                                                        "bromelain": "https://link.coupang.com/a/dyZy3m",
                                                        "glutathione": "https://link.coupang.com/a/dyZAaZ",
                                                        "nmn": "https://link.coupang.com/a/dyZA3w",
                                                        "resveratrol": "https://link.coupang.com/a/dyZCtB",
                                                        "pqq": "https://link.coupang.com/a/dyZDWJ",
                                                        "astragalus": "https://link.coupang.com/a/dyZE0i"
                                                    };

                                                    // Strategy: Randomly pick ONE item from selection to ensure tracking
                                                    // This guarantees the user enters via a Partner Link, setting the session cookie.
                                                    if (selectedIds.length > 0) {
                                                        const randomId = selectedIds[Math.floor(Math.random() * selectedIds.length)];
                                                        const targetLink = COUPANG_LINKS[randomId];

                                                        if (targetLink) {
                                                            window.open(targetLink, '_blank');
                                                        } else {
                                                            // Fallback: Coupang Home Partner Link (User Request)
                                                            window.open("https://link.coupang.com/a/dy0bbp", '_blank');
                                                        }
                                                    } else {
                                                        // Fallback: Coupang Home Partner Link
                                                        window.open("https://link.coupang.com/a/dy0bbp", '_blank');
                                                    }
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
                                            >
                                                <div className="flex items-center gap-1.5 z-10">
                                                    <div className="bg-red-500 p-0.5 rounded-sm">
                                                        <span className="text-[10px] font-black tracking-tighter text-white">R</span>
                                                    </div>
                                                    <span className="text-base">쿠팡 로켓배송</span>
                                                </div>
                                                <span className="text-[10px] font-normal opacity-80 z-10">내일 새벽 도착 보장! 🚀</span>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>

                                            {/* iHerb */}
                                            <button
                                                onClick={() => {
                                                    const query = selectedSupplements.map(s => s.name).join(" ");
                                                    window.open(`https://kr.iherb.com/search?kw=${encodeURIComponent(query)}&rcode=CYX2175`, '_blank');
                                                }}
                                                className="bg-[#458500] hover:bg-[#3d7400] text-white font-bold py-3 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
                                            >
                                                <div className="flex items-center gap-1.5 z-10">
                                                    <ShoppingBag className="w-4 h-4" />
                                                    <span className="text-base">아이허브</span>
                                                </div>
                                                <span className="text-[10px] font-normal opacity-80 z-10">글로벌 최저가 확인 🌿</span>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-[#366800] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-center text-slate-500 mt-3 leading-relaxed bg-slate-100 p-2 rounded-lg">
                                            ⚠️ <strong>공정위 문구 알림</strong><br />
                                            "이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br />이에 따른 일정액의 수수료를 제공받습니다."<br />
                                            <span className="text-[10px] text-slate-400 font-normal mt-1 block">
                                                (아이허브 링크 또한 제휴 활동이 포함될 수 있습니다.)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </section>


                {/* Info Section 1: Worst Combinations */}
                <section id="worst-combinations" className="py-16 bg-white border-t border-slate-100">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">🚨 절대 피해야 할 최악의 영양제 조합 TOP 3</h2>
                        <div className="space-y-6 text-slate-700 leading-relaxed">
                            {seoContent.worst_combos.map((combo, idx) => (
                                <div key={idx} className={clsx("p-6 rounded-2xl border",
                                    idx === 0 ? "bg-red-50 border-red-100" :
                                        idx === 1 ? "bg-orange-50 border-orange-100" :
                                            "bg-yellow-50 border-yellow-100"
                                )}>
                                    <h3 className={clsx("font-bold text-lg mb-2",
                                        idx === 0 ? "text-red-700" :
                                            idx === 1 ? "text-orange-700" :
                                                "text-yellow-700"
                                    )}>{idx + 1}. {combo.title}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: combo.reason.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Info Section 1.5: Best Combinations (New) */}
                <section id="best-combinations" className="py-16 bg-green-50/50">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">💊 약사들이 추천하는 꿀조합 TOP 3</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {seoContent.best_combos.map((combo, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:-translate-y-1 transition-transform">
                                    <div className="text-emerald-600 font-bold mb-3 text-lg flex items-center gap-2">
                                        <ThumbsUp className="w-5 h-5" /> {combo.title}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {combo.reason}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Info Section 2: Low-Speed Aging Guide */}
                <section id="anti-aging-guide" className="py-16 bg-slate-50">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-800">🐢 {seoContent.trend_guide.title}</h2>
                        <p className="text-center text-slate-500 mb-10">내 몸의 시간을 되돌리는 과학적인 영양 설계</p>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 leading-8 text-slate-700 whitespace-pre-line">
                            <p dangerouslySetInnerHTML={{ __html: seoContent.trend_guide.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-600 bg-indigo-50 px-1 rounded">$1</strong>').replace(/\n/g, '<br/>') }} />
                        </div>
                    </div>
                </section>

                {/* Info Section 3: FAQ */}
                <section id="faq" className="py-16 bg-white">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-800">❓ 자주 묻는 질문 (FAQ)</h2>
                        <div className="space-y-4">
                            {seoContent.faq.map((item, idx) => (
                                <details key={idx} className="group bg-slate-50 p-4 rounded-xl cursor-pointer open:bg-blue-50 transition-colors">
                                    <summary className="font-bold text-lg text-slate-700 flex justify-between items-center list-none group-open:text-blue-800 select-none">
                                        Q. {item.q}
                                        <span className="transition group-open:rotate-180 text-slate-400 group-open:text-blue-500">▼</span>
                                    </summary>
                                    <p className="text-slate-600 mt-3 leading-relaxed pl-1 border-t border-slate-200 pt-3"
                                        dangerouslySetInnerHTML={{ __html: item.a.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>') }}
                                    />
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-100 py-8 mt-12 border-t border-slate-200">
                <div className="max-w-6xl mx-auto px-6 text-center text-slate-400 text-xs leading-relaxed">
                    <p className="mb-2">Nutri-Match | 나만의 영양제 궁합 분석기</p>
                    <p>
                        본 서비스는 의학적 상담을 대신할 수 없으며, 질병의 진단 및 치료는 전문의와 상담하시기 바랍니다.<br />
                        제공되는 정보는 일반적인 영양 지식에 기반하며, 개인의 체질에 따라 다를 수 있습니다.
                    </p>
                    <p className="mt-4 font-medium text-slate-500">
                        "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."
                    </p>
                </div>
            </footer>
        </div>
    );
}
