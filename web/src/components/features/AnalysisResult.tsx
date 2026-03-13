"use client";

import { Clock, AlertTriangle, ThumbsUp, Share2, Star, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { Supplement } from "@/types";
import { SpecialMessages } from "./SpecialMessages";

interface Analysis {
  good: { s1: Supplement; s2: Supplement }[];
  bad: { s1: Supplement; s2: Supplement; msg: string | null }[];
}

interface AnalysisResultProps {
  selectedSupplements: Supplement[];
  selectedIds: string[];
  analysis: Analysis;
  healthTags: string[];
  isAntiAgingCombo: boolean;
  is3DefenseLines: boolean;
  copied: boolean;
  onShare: () => void;
  onSave: () => void;
  coupangLinks: Record<string, string>;
}

export function AnalysisResult({
  selectedSupplements,
  selectedIds,
  analysis,
  healthTags,
  isAntiAgingCombo,
  is3DefenseLines,
  copied,
  onShare,
  onSave,
  coupangLinks,
}: AnalysisResultProps) {
  const handleCoupangClick = () => {
    if (selectedIds.length > 0) {
      const randomId = selectedIds[Math.floor(Math.random() * selectedIds.length)];
      const targetLink = coupangLinks[randomId];
      window.open(targetLink || "https://link.coupang.com/a/dy0bbp", '_blank');
    } else {
      window.open("https://link.coupang.com/a/dy0bbp", '_blank');
    }
  };

  const handleIherbClick = () => {
    const query = selectedSupplements.map(s => s.name).join(" ");
    window.open(`https://kr.iherb.com/search?kw=${encodeURIComponent(query)}&rcode=CYX2175`, '_blank');
  };

  if (selectedIds.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">💊</span>
        </div>
        <p className="text-lg">영양제를 선택하면<br />궁합을 분석해 드려요!</p>
        <p className="text-sm mt-3 text-emerald-500 font-medium">💡 건강 목표 버튼으로 한 번에 선택 가능해요</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Special Messages */}
      <SpecialMessages 
        isAntiAgingCombo={isAntiAgingCombo}
        is3DefenseLines={is3DefenseLines}
      />

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

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
        <h4 className="text-center text-sm font-bold text-slate-500 mb-3">선택한 영양제 최저가 확인하기</h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCoupangClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
          >
            <div className="flex items-center gap-1.5 z-10">
              <div className="bg-red-500 p-0.5 rounded-sm">
                <span className="text-[10px] font-black tracking-tighter text-white">R</span>
              </div>
              <span className="text-base">쿠팡 로켓배송</span>
            </div>
            <span className="text-[10px] font-normal opacity-80 z-10">내일 새벽 도착 보장! 🚀</span>
          </button>

          <button
            onClick={handleIherbClick}
            className="bg-[#458500] hover:bg-[#3d7400] text-white font-bold py-3 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 flex flex-col items-center justify-center gap-1"
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-base">아이허브</span>
            </div>
            <span className="text-[10px] font-normal opacity-80">글로벌 최저가 확인 🌿</span>
          </button>
        </div>

        {/* Action Row */}
        <div className="flex gap-2 pt-3">
          <button
            onClick={onShare}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {copied ? "복사됨!" : "공유하기"}
          </button>
          <button
            onClick={onSave}
            className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4" />
            루틴 저장
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-500 mt-3 leading-relaxed bg-slate-100 p-2 rounded-lg">
          ⚠️ <strong>공정위 문구 알림</strong><br />
          "이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br />
          이에 따른 일정액의 수수료를 제공받습니다."
        </p>
      </div>
    </div>
  );
}
