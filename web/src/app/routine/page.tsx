import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Users, ArrowRight } from "lucide-react";
import { AGE_DATA } from "@/constants/recommendations";

export const metadata: Metadata = {
  title: "연령별 영양제 추천 루틴 — 20대·30대·40대·50대·60대 맞춤 영양소",
  description: "20대부터 60대 이상까지 연령별 꼭 먹어야 할 영양제 추천 루틴. 나이에 맞는 최적 영양 설계를 확인하세요.",
  alternates: { canonical: "https://nutrimatch.kr/routine" },
};

export default function RoutineIndexPage() {
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
          <div className="inline-flex bg-indigo-100 p-3 rounded-full text-indigo-600 mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">연령별 영양제 추천 루틴</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            나이마다 부족해지는 영양소가 다릅니다.<br />내 연령대에 맞는 루틴을 확인하세요
          </p>
        </div>

        {/* Age Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(AGE_DATA).map(([key, data]) => (
            <Link
              key={key}
              href={`/routine/${key}`}
              className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{data.emoji}</span>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {data.label}
                </h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {data.priority.slice(0, 3).map((id) => (
                  <span key={id} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100 font-medium">
                    {id === "multivitamin" ? "종합비타민" :
                     id === "omega3" ? "오메가3" :
                     id === "vit_d" ? "비타민D" :
                     id === "vit_b_complex" ? "비타민B군" :
                     id === "coq10" ? "코엔자임Q10" :
                     id === "magnesium" ? "마그네슘" :
                     id === "resveratrol" ? "레스베라트롤" :
                     id === "calcium" ? "칼슘" : id}
                  </span>
                ))}
                <span className="text-xs bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full border border-slate-100">
                  +{data.supplements.length - data.priority.length}개 더
                </span>
              </div>
              <div className="flex items-center text-indigo-600 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                루틴 보기 <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">내 영양제 궁합 바로 확인하기</h2>
          <p className="text-indigo-100 mb-6">지금 먹고 있는 영양제들의 조합이 올바른지 1초 만에 분석하세요</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            💊 무료 궁합 분석 시작
          </Link>
        </div>
      </main>
    </div>
  );
}
