"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import supplementsData from "@/data/supplements.json";
import seoContent from "@/data/seo_content.json";
import { Supplement } from "@/types";
import type { FAQItem, FAQCategory } from "@/types";
import { 
  Header, 
  SupplementGrid, 
  HealthGoalModal, 
  AnalysisResult,
  Timetable,
  AdBanner,
  BannerExchange,
  OnboardingModal,
  shouldShowOnboarding,
  PopularCombos,
  trackComboUsage,
} from "@/components";
import { FAQSection } from "@/components/sections/FAQSection";
import { 
  HEALTH_GOALS, 
  ANTI_AGING_COMBO, 
  TIMING_ORDER, 
  LOCAL_STORAGE_KEY
} from "@/constants/healthGoals";
import { generateFAQJsonLd } from "@/config/site";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import guidePosts from "@/data/guide_posts.json";

// 섭취 시간대별 분류
function getTiming(timing: string | undefined): string {
  if (!timing) return "식후";
  const t = timing.toLowerCase();
  if (t.includes("아침 공복") || t.includes("기상")) return "아침 공복";
  if (t.includes("아침") || (t.includes("점심") && t.includes("아침"))) return "아침 식후";
  if (t.includes("점심")) return "점심 식후";
  if (t.includes("저녁")) return "저녁 식후";
  if (t.includes("취침")) return "취침 전";
  if (t.includes("공복")) return "아침 공복";
  return "식후";
}

// Wrapper component for useSearchParams
function NutriPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [savedRoutine, setSavedRoutine] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"select" | "timetable">("select");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const timetableRef = useRef<HTMLDivElement>(null);

  // URL 파라미터에서 초기 선택값 로드
  useEffect(() => {
    const sParam = searchParams.get("s");
    if (sParam) {
      const ids = sParam.split(",").filter(Boolean);
      setSelectedIds(ids);
    }
  }, [searchParams]);

  // 로컬스토리지에서 저장된 루틴 로드 + 온보딩 표시 여부 확인
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) setSavedRoutine(JSON.parse(saved));
    } catch { /* ignore */ }
    // 온보딩: 첫 방문자만 표시
    setShowOnboarding(shouldShowOnboarding());
  }, []);

  const toggleSupplement = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const resetSelection = () => {
    setSelectedIds([]);
    setCopied(false);
    router.replace("/");
  };

  const shareResults = async () => {
    const sParam = selectedIds.length > 0 ? selectedIds.join(",") : "";
    const shareUrl = sParam
      ? `https://nutrimatch.kr/?s=${sParam}`
      : "https://nutrimatch.kr/";
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Nutri-Match — 내 영양제 ${selectedIds.length}개 조합 분석 완료!`,
          text: `오메가3+비타민D 조합이 맞는지 확인해봤어요. 내 영양제도 궁합 체크해보세요 💊`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const saveRoutine = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedIds));
      setSavedRoutine([...selectedIds]);
      // 인기 조합 집계에 기록
      if (selectedIds.length >= 2) trackComboUsage(selectedIds);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const loadSavedRoutine = () => {
    if (savedRoutine.length > 0) setSelectedIds([...savedRoutine]);
  };

  const setAntiAgingCombo = () => {
    setSelectedIds((prev) => Array.from(new Set([...prev, ...ANTI_AGING_COMBO])));
  };

  const applyGoal = (goalId: string) => {
    const goal = HEALTH_GOALS.find(g => g.id === goalId);
    if (goal) {
      setSelectedIds(prev => Array.from(new Set([...prev, ...goal.supplements])));
      setShowGoalModal(false);
    }
  };

  const selectedSupplements = useMemo(() => {
    return (supplementsData as unknown as Supplement[]).filter((s) => selectedIds.includes(s.id));
  }, [selectedIds]);

  const analysis = useMemo(() => {
    const good: { s1: Supplement; s2: Supplement }[] = [];
    const bad: { s1: Supplement; s2: Supplement; msg: string | null }[] = [];

    for (let i = 0; i < selectedSupplements.length; i++) {
      for (let j = i + 1; j < selectedSupplements.length; j++) {
        const s1 = selectedSupplements[i];
        const s2 = selectedSupplements[j];
        if (s1.best_with?.includes(s2.id) || s2.best_with?.includes(s1.id)) {
          good.push({ s1, s2 });
        }
        if (s1.worst_with?.includes(s2.id) || s2.worst_with?.includes(s1.id)) {
          const msg = s1.worst_with?.includes(s2.id) ? s1.caution_msg : s2.caution_msg;
          bad.push({ s1, s2, msg });
        }
      }
    }
    return { good, bad };
  }, [selectedSupplements]);

  const healthTags = useMemo(() => {
    const categories = new Set(selectedSupplements.map((s) => s.category));
    return Array.from(categories);
  }, [selectedSupplements]);

  const timetable = useMemo(() => {
    const table: Record<string, Supplement[]> = {};
    TIMING_ORDER.forEach(t => { table[t] = []; });
    selectedSupplements.forEach(s => {
      const slot = getTiming(s.timing);
      if (!table[slot]) table[slot] = [];
      table[slot].push(s);
    });
    return table;
  }, [selectedSupplements]);

  const isAntiAgingCombo = useMemo(() => {
    return ANTI_AGING_COMBO.every(id => selectedIds.includes(id));
  }, [selectedIds]);

  const is3DefenseLines = useMemo(() => {
    const hasEnergy = selectedIds.includes("nmn") || selectedIds.includes("pqq");
    const hasGene = selectedIds.includes("resveratrol");
    const hasLifespan = selectedIds.includes("astragalus");
    return hasEnergy && hasGene && hasLifespan;
  }, [selectedIds]);

  const saveAsImage = async () => {
    if (!timetableRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(timetableRef.current, {
        backgroundColor: "#f8fafc",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `nutrimatch_routine_${new Date().toLocaleDateString("ko-KR").replace(/\./g, "").replace(/ /g, "")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("이미지 저장 실패:", e);
    }
  };

  // FAQ JSON-LD - Use the new faq.questions structure
  const faqJsonLd = generateFAQJsonLd(seoContent.faq.questions.map((q: { question: string; answer: string }) => ({ q: q.question, a: q.answer })));

  return (
    <>
      {/* FAQ JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Header
          selectedCount={selectedIds.length}
          savedRoutineCount={savedRoutine.length}
          onReset={resetSelection}
          onLoadSaved={loadSavedRoutine}
        />

        <main>
          <section id="hero" className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-200px)]">
            <section className="lg:col-span-7 space-y-6">
              <SupplementGrid
                supplements={supplementsData as unknown as Supplement[]}
                selectedIds={selectedIds}
                onToggle={toggleSupplement}
                onSetAntiAgingCombo={setAntiAgingCombo}
                onShowGoalModal={() => setShowGoalModal(true)}
              />
            </section>

            <section className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-4 border-b pb-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveTab("select")}
                      className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        activeTab === "select" ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      궁합 분석
                    </button>
                    <button
                      onClick={() => setActiveTab("timetable")}
                      className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                        activeTab === "timetable" ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      타임테이블
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{selectedIds.length}개</span>
                  </div>
                </div>

                {activeTab === "select" ? (
                  <AnalysisResult
                    selectedSupplements={selectedSupplements}
                    selectedIds={selectedIds}
                    analysis={analysis}
                    healthTags={healthTags}
                    isAntiAgingCombo={isAntiAgingCombo}
                    is3DefenseLines={is3DefenseLines}
                    copied={copied}
                    onShare={shareResults}
                    onSave={saveRoutine}
                  />
                ) : (
                  <div ref={timetableRef}>
                    <Timetable
                      timetable={timetable}
                      selectedIds={selectedIds}
                      copied={copied}
                      onShare={shareResults}
                      onSave={saveRoutine}
                      onSaveImage={saveAsImage}
                    />
                  </div>
                )}
              </div>
            </section>
          </section>

          {/* AdSense 광고 */}
          <div className="max-w-4xl mx-auto px-6 py-4">
            <AdBanner slot="1234567890" format="horizontal" className="rounded-xl min-h-[90px] bg-slate-100" />
          </div>

          {/* SEO 섹션들 */}
          <SEOSections />
        </main>

        <HealthGoalModal
          isOpen={showGoalModal}
          onClose={() => setShowGoalModal(false)}
          onApply={applyGoal}
        />

        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      </div>
    </>
  );
}

// FAQ 데이터 (seo_content.json에서 로드)
const faqQuestions = seoContent.faq.questions as FAQItem[];
const faqCategories = seoContent.faq.categories as FAQCategory[];

// SEO 섹션 컴포넌트
function SEOSections() {
  return (
    <>
      {/* 최악의 조합 */}
      <section id="worst-combinations" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
            🚨 절대 피해야 할 최악의 영양제 조합 TOP 3
          </h2>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            {seoContent.worst_combos.map((combo, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${
                  idx === 0 ? "bg-red-50 border-red-100" :
                  idx === 1 ? "bg-orange-50 border-orange-100" :
                  "bg-yellow-50 border-yellow-100"
                }`}
              >
                <h3 className={`font-bold text-lg mb-2 ${
                  idx === 0 ? "text-red-700" :
                  idx === 1 ? "text-orange-700" :
                  "text-yellow-700"
                }`}>
                  {idx + 1}. {combo.title}
                </h3>
                <p 
                  className="text-sm" 
                  dangerouslySetInnerHTML={{
                    __html: combo.reason.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 꿀조합 */}
      <section id="best-combinations" className="py-16 bg-green-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
            💊 약사들이 추천하는 꿀조합 TOP 3
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {seoContent.best_combos.map((combo, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 hover:-translate-y-1 transition-transform"
              >
                <div className="text-emerald-600 font-bold mb-3 text-lg">
                  {combo.title}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{combo.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 저속노화 가이드 */}
      <section id="anti-aging-guide" className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-slate-800">
            🐢 {seoContent.trend_guide.title}
          </h2>
          <p className="text-center text-slate-500 mb-10">
            내 몸의 시간을 되돌리는 과학적인 영양 설계
          </p>
          <div 
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 leading-8 text-slate-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: seoContent.trend_guide.content
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-600 bg-indigo-50 px-1 rounded">$1</strong>')
                .replace(/\n/g, '<br/>')
            }}
          />
        </div>
      </section>

      {/* 인기 조합 섹션 */}
      <PopularCombos />

      {/* 가이드 프리뷰 */}
      <section id="guide" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                영양제 완벽 가이드
              </h2>
              <p className="text-slate-500 mt-1">
                올바른 섭취법부터 저속노화 루틴까지, 과학적으로 검증된 정보
              </p>
            </div>
            <Link
              href="/guide"
              className="hidden sm:flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
            >
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {guidePosts.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={`/guide/${post.slug}`}
                className="group block bg-slate-50 rounded-xl p-5 hover:bg-blue-50 hover:border-blue-200 transition-colors border border-slate-100"
              >
                <span className="text-xs font-bold text-blue-600 mb-2 block">{post.category}</span>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <FAQSection questions={faqQuestions} categories={faqCategories} />

      {/* 증상별 · 연령별 추천 진입점 */}
      <section id="recommendations" className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-800">
            🎯 나에게 맞는 영양제 찾기
          </h2>
          <p className="text-center text-slate-500 mb-10 text-sm">
            증상 또는 나이에 맞게 최적화된 영양제 루틴을 확인하세요
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 증상별 */}
            <Link
              href="/symptom"
              className="group bg-white rounded-2xl border border-rose-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🩺</span>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-rose-600 transition-colors">
                    증상별 영양제 추천
                  </h3>
                  <p className="text-xs text-slate-500">피로 · 관절 · 피부 · 면역 · 탈모 등</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["😴 만성 피로", "🦵 관절 통증", "✨ 피부 고민", "🛡️ 면역력"].map((s) => (
                  <span key={s} className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full border border-rose-100">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-rose-500 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                증상별 추천 보기 →
              </div>
            </Link>
            {/* 연령별 */}
            <Link
              href="/routine"
              className="group bg-white rounded-2xl border border-indigo-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎂</span>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
                    연령별 영양제 추천 루틴
                  </h3>
                  <p className="text-xs text-slate-500">20대 · 30대 · 40대 · 50대 · 60대</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["🌱 20대", "⚡ 30대", "🔋 40대", "🌿 50대"].map((a) => (
                  <span key={a} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-indigo-500 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                연령별 루틴 보기 →
              </div>
            </Link>
          </div>
        </div>
      </section>

      <BannerExchange />
    </>
  );
}

// 메인 페이지
export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400">로딩 중...</div>
    </div>}>
      <NutriPageContent />
    </Suspense>
  );
}
