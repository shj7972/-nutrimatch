"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import type { FAQItem, FAQCategory } from "@/types/seo";
import { searchFAQs, getFAQByCategory, getFeaturedFAQs } from "@/types/seo";

interface FAQSectionProps {
  questions: FAQItem[];
  categories: FAQCategory[];
}

export function FAQSection({ questions, categories }: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");

  const filteredQuestions = useMemo(() => {
    if (searchQuery.trim()) {
      return searchFAQs(questions, searchQuery);
    }
    if (selectedCategory === "all") {
      return getFeaturedFAQs(questions);
    }
    return getFAQByCategory(questions, selectedCategory);
  }, [questions, searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            자주 묻는 질문
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            궁금한 점을 찾아보세요
          </h2>
          <p className="text-slate-500 mt-2">
            영양제에 대해 가장 많이 물어보시는 질문들
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="질문을 검색해보세요... (예: 유산균 복용 시간)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            📌 주요 질문
          </button>
          {categories
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>검색 결과가 없습니다.<br />다른 키워드로 검색해보세요.</p>
            </div>
          ) : (
            filteredQuestions.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all hover:border-blue-200"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-lg">Q.</span>
                    <span className="font-medium text-slate-800">{faq.question}</span>
                  </div>
                  {expandedId === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedId === faq.id && (
                  <div className="px-4 pb-4">
                    <div className="pl-7 border-l-2 border-blue-100">
                      <div
                        className="text-slate-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: faq.answer.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-blue-600">$1</strong>'
                          ),
                        }}
                      />
                      {/* Related Supplements */}
                      {faq.related_supplements.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="text-xs text-slate-400">관련 영양제:</span>
                          {faq.related_supplements.map((id) => (
                            <a
                              key={id}
                              href={`/nutrient/${id}`}
                              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                            >
                              #{id}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            모든 FAQ 보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
