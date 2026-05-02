import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pill, Star, CheckCircle2, ArrowRight, Users } from "lucide-react";
import { AGE_DATA, AGE_KEYS } from "@/constants/recommendations";
import supplementsData from "@/data/supplements.json";
import { Supplement } from "@/types";
import AdBanner from "@/components/AdBanner";

export async function generateStaticParams() {
  return AGE_KEYS.map((age) => ({ age }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ age: string }>;
}): Promise<Metadata> {
  const { age } = await params;
  const data = AGE_DATA[age];
  if (!data) return { title: "페이지를 찾을 수 없습니다" };

  const title = `${data.label} 영양제 추천 루틴 — 꼭 먹어야 할 TOP ${data.supplements.length}`;
  const description = `${data.label}에게 꼭 필요한 영양제 추천 조합. ${data.keywords.slice(0, 2).join(", ")} — 나이·성별에 맞는 과학적인 영양 루틴을 확인하세요.`;

  return {
    title,
    description,
    keywords: data.keywords,
    alternates: { canonical: `https://nutrimatch.kr/routine/${age}` },
    openGraph: {
      title,
      description,
      url: `https://nutrimatch.kr/routine/${age}`,
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

export default async function RoutineAgePage({
  params,
}: {
  params: Promise<{ age: string }>;
}) {
  const { age } = await params;
  const data = AGE_DATA[age];
  if (!data) return notFound();

  const allSupplements = (supplementsData as unknown as Supplement[]).filter(
    (s) => data.supplements.includes(s.id)
  );
  const prioritySupplements = allSupplements.filter((s) =>
    data.priority.includes(s.id)
  );
  const otherSupplements = allSupplements.filter((s) =>
    !data.priority.includes(s.id)
  );

  const analyzeUrl = `/?s=${data.supplements.join(",")}`;
  const priorityAnalyzeUrl = `/?s=${data.priority.join(",")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.label} 영양제 추천 루틴`,
    description: data.description,
    url: `https://nutrimatch.kr/routine/${age}`,
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
            {data.label} 영양제 추천 루틴
          </h1>
          <p className="text-slate-500 leading-relaxed border-l-4 border-indigo-300 pl-4 bg-indigo-50 py-3 pr-4 rounded-r-xl">
            {data.description}
          </p>
        </div>

        {/* ⭐ 이것만은 꼭! 우선순위 TOP 3 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-bold text-slate-800">
              {data.label} 이것만은 꼭! TOP {data.priority.length}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {prioritySupplements.map((s, idx) => (
              <Link
                key={s.id}
                href={`/nutrient/${s.id}`}
                className="group bg-white rounded-2xl border border-amber-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-extrabold text-xs">
                  {idx + 1}
                </div>
                <div className="h-1 w-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-3" />
                <p className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors mb-1">
                  {s.name}
                </p>
                <p className="text-xs text-slate-500 mb-2">{s.category}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{s.description}</p>
              </Link>
            ))}
          </div>
          <Link
            href={priorityAnalyzeUrl}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-xl transition-colors w-full text-sm"
          >
            <Star className="w-4 h-4 fill-white" />
            TOP {data.priority.length} 조합 궁합 분석하기
          </Link>
        </section>

        {/* 전체 추천 영양제 */}
        {otherSupplements.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-600" />
              추가로 챙기면 좋은 영양제
            </h2>
            <div className="space-y-3">
              {otherSupplements.map((s) => (
                <Link
                  key={s.id}
                  href={`/nutrient/${s.id}`}
                  className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {s.name}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {s.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-1">{s.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 섭취 팁 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {data.label} 영양제 섭취 꿀팁
          </h2>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-3">
            {data.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense 자리 (승인 후 활성화) */}
        <div className="mb-8">
          <AdBanner slot="7890123456" format="rectangle" className="rounded-xl min-h-[100px] bg-slate-100" />
        </div>

        {/* 다른 연령대 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-500" />
            다른 연령대도 확인해보세요
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(AGE_DATA)
              .filter(([key]) => key !== age)
              .map(([key, d]) => (
                <Link
                  key={key}
                  href={`/routine/${key}`}
                  className="flex flex-col items-center bg-white rounded-xl border border-slate-100 p-4 hover:border-indigo-200 hover:shadow-sm transition-all text-center"
                >
                  <span className="text-2xl mb-2">{d.emoji}</span>
                  <span className="text-sm font-semibold text-slate-700">{d.label}</span>
                </Link>
              ))}
          </div>
        </section>

        {/* 전체 분석 CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white text-center">
          <Pill className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <h2 className="font-bold text-lg mb-1">{data.label} 전체 루틴 궁합 분석</h2>
          <p className="text-indigo-100 text-sm mb-4">
            추천 영양제 {data.supplements.length}개를 한 번에 선택해 궁합을 확인하세요
          </p>
          <Link
            href={analyzeUrl}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-50 transition-colors text-sm"
          >
            <Pill className="w-4 h-4" />
            {data.label} 전체 루틴 분석하기
          </Link>
        </div>
      </main>
    </div>
  );
}
