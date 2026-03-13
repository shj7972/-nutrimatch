"use client";

import { Pill, RotateCcw, BookmarkCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface HeaderProps {
  selectedCount: number;
  savedRoutineCount: number;
  onReset: () => void;
  onLoadSaved: () => void;
}

export function Header({ selectedCount, savedRoutineCount, onReset, onLoadSaved }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4 md:p-6 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full text-blue-600">
            <Pill className="w-6 h-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Nutri-Match</h1>
        </div>
        <div className="flex items-center gap-2">
          {savedRoutineCount > 0 && (
            <button
              onClick={onLoadSaved}
              className="text-sm bg-blue-500 hover:bg-blue-400 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              title="저장된 루틴 불러오기"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden sm:inline">내 루틴</span>
            </button>
          )}
          <Link
            href="/guide"
            className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-medium"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">가이드</span>
          </Link>
          <button
            onClick={onReset}
            className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            title="초기화"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">초기화</span>
          </button>
        </div>
      </div>
    </header>
  );
}
