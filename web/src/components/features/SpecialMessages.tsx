"use client";

import { Sparkles, Shield, Crown } from "lucide-react";

interface SpecialMessagesProps {
  isAntiAgingCombo: boolean;
  is3DefenseLines: boolean;
}

export function SpecialMessages({ isAntiAgingCombo, is3DefenseLines }: SpecialMessagesProps) {
  if (is3DefenseLines) {
    return (
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden animate-in zoom-in-95 duration-500 ring-2 ring-emerald-200">
        <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12">
          <Shield className="w-32 h-32" />
        </div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
            <Crown className="w-8 h-8 text-yellow-300 fill-yellow-300" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1 tracking-tight">
              당신은 노화의 3대 방어선을 모두 챙기고 계시네요! 🛡️
            </h3>
            <div className="mt-3 space-y-1 text-sm bg-black/10 p-3 rounded-lg border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-emerald-200 font-bold">⚡ 에너지:</span>
                미토콘드리아 부활 (NMN/PQQ)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-200 font-bold">🧬 유전자:</span>
                장수 유전자 ON (레스베라트롤)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-200 font-bold">⏳ 수명:</span>
                텔로미어 보호 (황기)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAntiAgingCombo) {
    return (
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24" />
        </div>
        <div className="flex items-start gap-3 relative z-10">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">
              당신의 세포 나이를 되돌리는 조합이네요!
            </h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              NMN, 레스베라트롤, PQQ의 시너지가 미토콘드리아를 깨웁니다. 
              제가 아는 최고의 저속노화 루틴입니다! 🐢
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
