"use client";

import { Clock, Share2, Star, Camera } from "lucide-react";
import clsx from "clsx";
import { Supplement } from "@/types";
import { TIMING_ORDER, TIMING_COLORS, TIMING_ICONS } from "@/constants/healthGoals";

interface TimetableProps {
  timetable: Record<string, Supplement[]>;
  selectedIds: string[];
  copied: boolean;
  onShare: () => void;
  onSave: () => void;
  onSaveImage: () => void;
}

export function Timetable({
  timetable,
  selectedIds,
  copied,
  onShare,
  onSave,
  onSaveImage,
}: TimetableProps) {
  if (selectedIds.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <Clock className="w-8 h-8 opacity-20" />
        </div>
        <p className="text-lg">영양제를 선택하면<br />섭취 타임테이블을 만들어 드려요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <p className="text-xs text-slate-400 mb-3">
        선택한 영양제의 최적 섭취 시간대별 분류입니다.
      </p>

      <div className="space-y-3 bg-slate-50 p-3 rounded-xl">
        <p className="text-xs font-bold text-slate-500 text-center pb-1">
          📅 내 영양제 루틴 — nutrimatch.kr
        </p>

        {TIMING_ORDER.map((slot) => {
          const items = timetable[slot];
          if (!items || items.length === 0) return null;

          return (
            <div
              key={slot}
              className={clsx("p-4 rounded-xl border", TIMING_COLORS[slot])}
            >
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                <span>{TIMING_ICONS[slot]}</span>
                <span>{slot}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s.id}
                    className="bg-white/70 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
        <button
          onClick={onShare}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          {copied ? "링크 복사됨!" : "타임테이블 공유"}
        </button>
        <button
          onClick={onSave}
          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Star className="w-4 h-4" />
          루틴 저장
        </button>
        <button
          onClick={onSaveImage}
          className="col-span-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white text-sm font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
        >
          <Camera className="w-4 h-4" />
          📸 이미지로 저장 (공유용)
        </button>
      </div>
    </div>
  );
}
