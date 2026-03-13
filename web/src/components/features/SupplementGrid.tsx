"use client";

import { Check, Target, Zap } from "lucide-react";
import { Supplement } from "@/types";
import { SupplementCard } from "./SupplementCard";

interface SupplementGridProps {
  supplements: Supplement[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSetAntiAgingCombo: () => void;
  onShowGoalModal: () => void;
}

export function SupplementGrid({
  supplements,
  selectedIds,
  onToggle,
  onSetAntiAgingCombo,
  onShowGoalModal,
}: SupplementGridProps) {
  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
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

      {/* Header */}
      <h2 className="text-xl font-bold flex items-center gap-2 text-blue-900 mb-4">
        <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
          <Check className="w-5 h-5" />
        </div>
        섭취 중인 영양제를 선택하세요
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {supplements.map((item) => (
          <SupplementCard
            key={item.id}
            supplement={item}
            isSelected={selectedIds.includes(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
