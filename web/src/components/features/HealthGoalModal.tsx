"use client";

import { Target, X } from "lucide-react";
import { HEALTH_GOALS } from "@/constants/healthGoals";

interface HealthGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (goalId: string) => void;
}

export function HealthGoalModal({ isOpen, onClose, onApply }: HealthGoalModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            건강 목표 선택
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-4">목표에 맞는 영양제를 자동으로 추가합니다</p>
        
        <div className="grid grid-cols-2 gap-2">
          {HEALTH_GOALS.map(goal => (
            <button
              key={goal.id}
              onClick={() => onApply(goal.id)}
              className="text-left p-3 rounded-xl border-2 border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-sm font-medium text-slate-700 hover:text-emerald-800 active:scale-95"
            >
              {goal.label}
            </button>
          ))}
        </div>
        
        <button 
          onClick={onClose} 
          className="mt-4 w-full text-sm text-slate-400 hover:text-slate-600 py-2 rounded-lg hover:bg-slate-50"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
