"use client";

import { useState } from "react";
import { X, CheckCircle2, ChevronRight } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    icon: "💊",
    title: "복용 중인 영양제 선택",
    description:
      "왼쪽 그리드에서 현재 먹고 있는 영양제를 모두 선택하세요. 카테고리 탭과 검색으로 빠르게 찾을 수 있어요.",
    tip: "3개 이상 선택하면 더 정확한 분석이 가능해요!",
  },
  {
    icon: "🔬",
    title: "궁합 분석 확인",
    description:
      "선택 즉시 오른쪽에서 ✅ 좋은 조합과 ⚠️ 피해야 할 조합을 분석해 드려요. 저속노화 조합·건강 목표 버튼도 활용해 보세요!",
    tip: "조합이 많을수록 더 자세한 분석 결과를 볼 수 있어요.",
  },
  {
    icon: "📅",
    title: "타임테이블로 섭취 일정 완성",
    description:
      "상단 '타임테이블' 탭으로 이동하면 아침·점심·저녁별 최적 섭취 시간표가 자동으로 완성돼요. 이미지로 저장도 가능해요!",
    tip: "루틴 저장 버튼으로 다음 방문 때 바로 불러올 수 있어요.",
  },
];

const STORAGE_KEY = "nutrimatch_onboarding_shown";

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [dontShow, setDontShow] = useState(false);

  if (!isOpen) return null;

  const isLastStep = step === STEPS.length - 1;
  const current = STEPS[step];

  const handleClose = () => {
    if (dontShow) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    onClose();
  };

  const handleNext = () => {
    if (isLastStep) {
      handleClose();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in-up">
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Nutri-Match 사용법
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 px-6 pb-4">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-blue-500" : i < step ? "w-3 bg-blue-300" : "w-3 bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
              {current.icon}
            </div>
          </div>

          {/* Step number + title */}
          <div className="text-center mb-3">
            <p className="text-xs font-bold text-blue-500 mb-1">
              STEP {step + 1} / {STEPS.length}
            </p>
            <h2 className="text-xl font-extrabold text-slate-800">{current.title}</h2>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed text-center mb-4">
            {current.description}
          </p>

          {/* Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2 mb-6">
            <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 font-medium leading-relaxed">{current.tip}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              {isLastStep ? "시작하기 🚀" : (
                <>다음 <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* Don't show again */}
          <label className="flex items-center justify-center gap-2 mt-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors select-none">
              다시 보지 않기
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

// 초기 표시 여부 판단 유틸
export function shouldShowOnboarding(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "true";
  } catch {
    return false;
  }
}
