"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, ChevronRight, Flame } from "lucide-react";

// 인기 조합 집계 스토리지 키
export const POPULAR_COMBOS_KEY = "nutrimatch_popular_combos";

// 영양제 ID → 이름 매핑
const SUPPLEMENT_NAMES: Record<string, string> = {
  omega3: "오메가3", multivitamin: "종합비타민", probiotics: "유산균",
  magnesium: "마그네슘", calcium: "칼슘", vit_c: "비타민C", vit_d: "비타민D",
  iron: "철분", zinc: "아연", lutein: "루테인", milk_thistle: "밀크씨슬",
  vit_b_complex: "비타민B군", propolis: "프로폴리스", ginseng: "홍삼",
  collagen: "콜라겐", coq10: "코엔자임Q10", msm: "MSM", theanine: "테아닌",
  arginine: "아르기닌", biotin: "비오틴", quercetin: "퀘르세틴",
  bromelain: "브로멜라인", glutathione: "글루타치온", nmn: "NMN",
  resveratrol: "레스베라트롤", pqq: "PQQ", astragalus: "황기 추출물",
  urolithin_a: "유로리틴A", ergothioneine: "에르고치오네인", selenium: "셀레늄",
  tmg: "TMG", nac: "NAC", spirulina: "스피루리나", alpha_lipoic: "알파리포산",
  albumin: "알부민", chondroitin: "콘드로이친", vit_e: "비타민E",
};

// 기본 추천 조합 (데이터 없을 때 표시)
const DEFAULT_COMBOS = [
  {
    label: "저속노화 핵심 조합",
    ids: ["nmn", "resveratrol", "coq10", "omega3"],
    emoji: "🐢",
    color: "from-violet-500 to-indigo-500",
  },
  {
    label: "면역 강화 루틴",
    ids: ["vit_c", "vit_d", "zinc", "selenium"],
    emoji: "🛡️",
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "뼈·관절 건강 세트",
    ids: ["calcium", "vit_d", "magnesium", "collagen"],
    emoji: "🦴",
    color: "from-amber-500 to-orange-500",
  },
];

interface ComboEntry {
  ids: string[];
  count: number;
  lastUsed: number;
}

// 인기 조합 저장 유틸 (외부에서 호출)
export function trackComboUsage(ids: string[]) {
  if (ids.length < 2) return;
  try {
    const raw = localStorage.getItem(POPULAR_COMBOS_KEY);
    const data: ComboEntry[] = raw ? JSON.parse(raw) : [];
    const key = [...ids].sort().join(",");

    const existing = data.find((d) => [...d.ids].sort().join(",") === key);
    if (existing) {
      existing.count += 1;
      existing.lastUsed = Date.now();
    } else {
      data.push({ ids, count: 1, lastUsed: Date.now() });
    }

    // 최대 50개 유지 (오래된 것 제거)
    const trimmed = data
      .sort((a, b) => b.count - a.count || b.lastUsed - a.lastUsed)
      .slice(0, 50);
    localStorage.setItem(POPULAR_COMBOS_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

export function PopularCombos() {
  const [userCombos, setUserCombos] = useState<ComboEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(POPULAR_COMBOS_KEY);
      if (raw) {
        const data: ComboEntry[] = JSON.parse(raw);
        setUserCombos(
          data.sort((a, b) => b.count - a.count).slice(0, 5)
        );
      }
    } catch { /* ignore */ }
  }, []);

  // SSR 불일치 방지
  if (!mounted) return null;

  const hasUserData = userCombos.length > 0;

  return (
    <section id="popular-combos" className="py-16 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-rose-500" />
              {hasUserData ? "내가 자주 쓰는 조합 Top 5" : "추천 영양제 조합"}
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              {hasUserData
                ? "분석 기록을 기반으로 집계된 나만의 인기 조합이에요"
                : "영양사·약사가 검증한 시너지 높은 루틴이에요"}
            </p>
          </div>
          {hasUserData && (
            <span className="hidden sm:flex items-center gap-1 text-xs bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full font-semibold border border-rose-100">
              <Flame className="w-3.5 h-3.5" /> 나의 분석 기록
            </span>
          )}
        </div>

        {/* Combo Cards */}
        {hasUserData ? (
          // 사용자 실제 집계 데이터
          <div className="space-y-3">
            {userCombos.map((combo, idx) => {
              const url = `/?s=${combo.ids.join(",")}`;
              const names = combo.ids
                .map((id) => SUPPLEMENT_NAMES[id] || id)
                .slice(0, 4);
              const extra = combo.ids.length - names.length;

              return (
                <Link
                  key={idx}
                  href={url}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  {/* Rank */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                      idx === 0
                        ? "bg-amber-100 text-amber-600"
                        : idx === 1
                        ? "bg-slate-100 text-slate-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                    {names.map((name, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium border border-blue-100"
                      >
                        {name}
                      </span>
                    ))}
                    {extra > 0 && (
                      <span className="text-xs bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full font-medium border border-slate-100">
                        +{extra}개
                      </span>
                    )}
                  </div>

                  {/* Count + Arrow */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-slate-400 hidden sm:block">{combo.count}회 분석</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          // 기본 추천 조합 카드
          <div className="grid md:grid-cols-3 gap-4">
            {DEFAULT_COMBOS.map((combo, idx) => {
              const url = `/?s=${combo.ids.join(",")}`;
              return (
                <Link
                  key={idx}
                  href={url}
                  className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  {/* Top gradient bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${combo.color}`} />
                  <div className="p-5">
                    <div className="text-2xl mb-2">{combo.emoji}</div>
                    <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                      {combo.label}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {combo.ids.map((id) => (
                        <span
                          key={id}
                          className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100"
                        >
                          {SUPPLEMENT_NAMES[id] || id}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                      바로 분석하기 <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
