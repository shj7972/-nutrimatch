import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Pill, ArrowRight } from "lucide-react";
import { SYMPTOM_DATA } from "@/constants/recommendations";

export const metadata: Metadata = {
  title: "증상별 영양제 추천 — 피로·관절·피부·면역 등 증상에 맞는 영양소",
  description: "만성피로, 관절 통증, 피부 고민, 면역력 저하 등 증상별 최적 영양제 조합을 약사가 검증한 정보로 안내합니다.",
  alternates: { canonical: "https://nutrimatch.kr/symptom" },
};

export default function SymptomIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-blue-600 text-lg">
            💊 Nutri-Match
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> 궁합 분석기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex bg-rose-100 p-3 rounded-full text-rose-600 mb-4">
            <Pill className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">증상별 영양제 추천</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            지금 가장 불편한 증상을 선택하면<br />최적의 영양제 조합을 추천해 드려요
          </p>
        </div>

        {/* Symptom Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(SYMPTOM_DATA).map(([key, data]) => (
            <Link
              key={key}
              href={`/symptom/${key}`}
              className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-rose-200 hover:shadow-lg hover:-translate-y-1 transition-all text-center"
            >
              <div className="text-4xl mb-3">{data.emoji}</div>
              <h2 className="font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors">
                {data.label}
              </h2>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{data.description}</p>
              <div className="flex items-center justify-center text-rose-500 text-xs font-semibold gap-1 group-hover:gap-2 transition-all">
                추천 보기 <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">내 영양제 궁합 바로 확인하기</h2>
          <p className="text-blue-100 mb-6">지금 먹고 있는 영양제들의 조합이 올바른지 1초 만에 분석하세요</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors"
          >
            💊 무료 궁합 분석 시작
          </Link>
        </div>
      </main>
    </div>
  );
}
