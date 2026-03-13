"use client";

import { Check, Info } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Supplement } from "@/types";

interface SupplementCardProps {
  supplement: Supplement;
  isSelected: boolean;
  onToggle: () => void;
}

export function SupplementCard({ supplement, isSelected, onToggle }: SupplementCardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-xl border-2 text-left transition-all duration-200 flex flex-col justify-between h-32 overflow-hidden group select-none",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-inner ring-1 ring-blue-500"
          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
      )}
    >
      <button
        onClick={onToggle}
        className="absolute inset-0 w-full h-full z-0 cursor-pointer"
        aria-label={supplement.name + " 선택"}
      />

      <div className="p-4 relative pointer-events-none h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span
            className={clsx(
              "font-bold text-lg leading-tight break-keep z-10",
              isSelected ? "text-blue-700" : "text-slate-700 group-hover:text-blue-600"
            )}
          >
            {supplement.name}
          </span>
          {isSelected && (
            <div className="text-blue-500 animate-in fade-in zoom-in duration-200">
              <Check className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="flex justify-between items-end">
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {supplement.category}
          </span>
          <Link
            href={`/nutrient/${supplement.id}`}
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
}
