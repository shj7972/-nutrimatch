import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pill, CheckCircle2, Lightbulb, ArrowRight } from "lucide-react";
import { SYMPTOM_DATA, SYMPTOM_KEYS } from "@/constants/recommendations";
import supplementsData from "@/data/supplements.json";
import { Supplement } from "@/types";
import AdBanner from "@/components/AdBanner";

export async function generateStaticParams() {
  return SYMPTOM_KEYS.map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const data = SYMPTOM_DATA[name];
  if (!data) return { title: "페이지를 찾을 수 없습니다" };

  const title = `${data.label}에 좋은 영양제 추천 TOP ${data.supplements.length}`;
  const description = `${data.label} 증상 완화를 위한 영양제 추천 조합. ${data.keywords.slice(0, 2).join(", ")} 등 과학적으로 검증된 영양소를 약사가 정리했습니다.`;

  return {
    title,
    description,
    keywords: data.keywords,
    alternates: { canonical: `https://nutrimatch.kr/symptom/${name}` },
    openGraph: {
      title,
      description,
      url: `https://nutrimatch.kr/symptom/${name}`,
      siteName: "Nutri-Match",
      locale: "ko_KR",
      type: "article",
      images: [{
        url: `https://nutrimatch.kr/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SymptomPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = SYMPTOM_DATA[name];
  if (!data) return notFound();

  const supplements = (supplementsData as unknown as Supplement[]).filter(
    (s) => data.supplements.includes(s.id)
  );

  const analyzeUrl = `/?s=${data.supplements.join(",")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.label}에 좋은 영양제 추천`,
    description: data.description,
    url: `https://nutrimatch.kr/symptom/${name}`,
    publisher: { "@type": "Organization", name: "Nutri-Match", url: "https://nutrimatch.kr" },
    inLanguage: "ko",
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">홈으로</span>
          </Link>
          <Link href="/" className="text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
            <Pill className="w-4 h-4" /> 궁합 분석기
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <div className="text-4xl mb-3">{data.emoji}</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">
            {data.label}에 좋은 영양제 추천
          </h1>
          <p className="text-slate-500 leading-relaxed border-l-4 border-blue-300 pl-4 bg-blue-50 py-3 pr-4 rounded-r-xl">
            {data.description}
          </p>
        </div>

        {/* CTA — 바로 분석 */}
        <Link
          href={analyzeUrl}
          className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 mb-8 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg group"
        >
          <div>
            <p className="text-sm text-blue-100 mb-0.5">추천 조합 전체 분석하기</p>
            <p className="font-bold text-lg">{data.label} 루틴 궁합 분석 →</p>
          </div>
          <ArrowRight className="w-6 h-6 opacity-80 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* 영양제 목록 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            추천 영양제 {supplements.length}가지
          </h2>
          <div className="space-y-3">
            {supplements.map((s, idx) => (
              <Link
                key={s.id}
                href={`/nutrient/${s.id}`}
                className="flex items-start gap-4 bg-white rounded-xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {s.name}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                      {s.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">{s.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </section>

        {/* 섭취 팁 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            올바른 섭취 팁
          </h2>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-3">
            {data.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense 자리 (승인 후 활성화) */}
        <div className="mb-8">
          <AdBanner slot="3456789012" format="rectangle" className="rounded-xl min-h-[100px] bg-slate-100" />
        </div>

        {/* 다른 증상 보기 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">다른 증상도 확인해보세요</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(SYMPTOM_DATA)
              .filter(([key]) => key !== name)
              .slice(0, 4)
              .map(([key, d]) => (
                <Link
                  key={key}
                  href={`/symptom/${key}`}
                  className="flex flex-col items-center bg-white rounded-xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all text-center"
                >
                  <span className="text-2xl mb-2">{d.emoji}</span>
                  <span className="text-sm font-semibold text-slate-700">{d.label}</span>
                </Link>
              ))}
          </div>
        </section>

        {/* 궁합 분석 CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
          <Pill className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <h2 className="font-bold text-lg mb-1">내 영양제 궁합도 확인해보세요</h2>
          <p className="text-blue-100 text-sm mb-4">선택한 영양제들이 서로 잘 맞는지 1초 만에 분석해 드려요</p>
          <Link
            href={analyzeUrl}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-2.5 px-6 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            <Pill className="w-4 h-4" />
            {data.label} 루틴 분석하기
          </Link>
        </div>
      </main>
    </div>
  );
}
