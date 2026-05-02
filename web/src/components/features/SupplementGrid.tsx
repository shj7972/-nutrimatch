"use client";

import { useState, useMemo } from "react";
import { Check, Target, Zap, Search, X } from "lucide-react";
import { Supplement } from "@/types";
import { SupplementCard } from "./SupplementCard";

interface SupplementGridProps {
  supplements: Supplement[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSetAntiAgingCombo: () => void;
  onShowGoalModal: () => void;
}

// 카테고리 그룹 정의
const CATEGORY_GROUPS: { label: string; keywords: string[] }[] = [
  { label: "전체", keywords: [] },
  { label: "기초·면역", keywords: ["기초 영양", "면역", "항산화/면역", "DNA보호/면역", "항산화/갑상선"] },
  { label: "저속노화", keywords: ["저속노화", "항산화/장수", "에너지/미토콘드리아", "항산화/저속노화", "저속노화/NAD+", "저속노화/미토콘드리아", "저속노화/메틸화"] },
  { label: "뼈·관절", keywords: ["뼈 건강", "뼈/면역", "관절 건강", "피부/관절", "관절/연골"] },
  { label: "혈행·심장", keywords: ["혈행 개선", "혈액 생성", "항산화/혈압"] },
  { label: "피부·미용", keywords: ["피부/미백", "모발/피부"] },
  { label: "장·간", keywords: ["장 건강", "간 건강", "소화/항염", "항산화/간 건강", "단백질/간 건강"] },
  { label: "에너지", keywords: ["활력/에너지", "활력/운동", "활력/면역", "신경/근육", "스트레스 완화", "항산화/단백질", "항산화/혈당"] },
];

const PROGRESS_THRESHOLDS = [
  { min: 0, max: 0, label: "영양제를 선택해 보세요", color: "bg-slate-200" },
  { min: 1, max: 2, label: "1~2개 선택됨 — 조금 더 선택하면 더 정확해요!", color: "bg-yellow-400" },
  { min: 3, max: 4, label: "3~4개 선택됨 — 분석 준비 완료 ✓", color: "bg-emerald-400" },
  { min: 5, max: Infinity, label: "다양한 조합을 분석 중이에요 🔬", color: "bg-blue-500" },
];

export function SupplementGrid({
  supplements,
  selectedIds,
  onToggle,
  onSetAntiAgingCombo,
  onShowGoalModal,
}: SupplementGridProps) {
  const [activeGroup, setActiveGroup] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  // 현재 그룹 필터 & 검색어 필터 적용
  const filteredSupplements = useMemo(() => {
    let result = supplements;

    // 카테고리 그룹 필터
    if (activeGroup !== "전체") {
      const group = CATEGORY_GROUPS.find((g) => g.label === activeGroup);
      if (group) {
        result = result.filter((s) =>
          group.keywords.some((kw) => s.category.includes(kw) || kw.includes(s.category))
        );
      }
    }

    // 검색어 필터
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [supplements, activeGroup, searchQuery]);

  // 프로그레스 계산
  const progressInfo = useMemo(() => {
    const count = selectedIds.length;
    return (
      PROGRESS_THRESHOLDS.find((t) => count >= t.min && count <= t.max) ??
      PROGRESS_THRESHOLDS[PROGRESS_THRESHOLDS.length - 1]
    );
  }, [selectedIds.length]);

  // 프로그레스 바 퍼센트 (최대 6개 기준 캡)
  const progressPercent = Math.min((selectedIds.length / 6) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        <button
          onClick={onSetAntiAgingCombo}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white p-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 group border border-violet-400"
        >
          <span className="text-lg">🐢</span>
          <span className="font-bold text-sm">저속노화 조합</span>
          <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300 animate-pulse" />
        </button>
        <button
          onClick={onShowGoalModal}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white p-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 group"
        >
          <Target className="w-4 h-4" />
          <span className="font-bold text-sm">건강 목표로 선택</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500 font-medium">{progressInfo.label}</span>
          <span className="text-xs font-bold text-slate-700">{selectedIds.length}개 선택</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${progressInfo.color}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <h2 className="text-xl font-bold flex items-center gap-2 text-blue-900">
        <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
          <Check className="w-5 h-5" />
        </div>
        섭취 중인 영양제를 선택하세요
      </h2>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="영양제 이름으로 검색..."
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
        {CATEGORY_GROUPS.map((group) => (
          <button
            key={group.label}
            onClick={() => setActiveGroup(group.label)}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              activeGroup === group.label
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredSupplements.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredSupplements.map((item) => (
            <SupplementCard
              key={item.id}
              supplement={item}
              isSelected={selectedIds.includes(item.id)}
              onToggle={() => onToggle(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Search className="w-10 h-10 mb-3 opacity-40" />
          <p className="text-sm font-medium">검색 결과가 없습니다</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveGroup("전체"); }}
            className="mt-3 text-xs text-blue-500 hover:underline"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
