import { Metadata } from "next";
import Link from "next/link";
import { Pill, ArrowLeft } from "lucide-react";
import seoContent from "@/data/seo_content.json";
import { FAQSection } from "@/components/sections/FAQSection";
import { generateFAQJsonLd } from "@/config/site";
import type { FAQItem, FAQCategory } from "@/types";

export const metadata: Metadata = {
    title: "영양제 FAQ | 자주 묻는 질문 모음",
    description:
        "영양제 복용 시간, 궁합, 부작용, 안전성까지! 영양제에 관한 가장 많이 묻는 질문 20가지를 한 곳에서 확인하세요.",
    keywords: [
        "영양제 FAQ",
        "영양제 자주묻는질문",
        "영양제 복용법",
        "영양제 상성",
        "영양제 부작용",
        "저속노화",
        "NMN 효과",
    ],
    alternates: { canonical: "https://nutrimatch.kr/faq" },
    openGraph: {
        title: "영양제 FAQ | 자주 묻는 질문 모음 - Nutri-Match",
        description:
            "영양제 복용 시간, 궁합, 부작용, 안전성까지! 가장 많이 묻는 질문 20가지를 확인하세요.",
        url: "https://nutrimatch.kr/faq",
        siteName: "Nutri-Match",
        locale: "ko_KR",
        type: "website",
    },
};

const questions = seoContent.faq.questions as FAQItem[];
const categories = seoContent.faq.categories as FAQCategory[];

export default function FAQPage() {
    // FAQ JSON-LD (구글 리치 스니펫)
    const faqJsonLd = generateFAQJsonLd(
        questions.map((q) => ({ q: q.question, a: q.answer }))
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Header */}
            <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">홈으로</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                        <Pill className="w-4 h-4" />
                        궁합 분석기
                    </Link>
                </div>
            </header>

            <main>
                {/* FAQ 섹션 (검색 + 카테고리 탭 포함) */}
                <FAQSection questions={questions} categories={categories} />

                {/* CTA */}
                <div className="max-w-4xl mx-auto px-6 pb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-2">
                            내 영양제 궁합 바로 확인하기
                        </h2>
                        <p className="text-blue-100 mb-6">
                            지금 먹고 있는 영양제들의 조합이 올바른지 1초 만에 분석하세요
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            <Pill className="w-4 h-4" />
                            💊 무료 궁합 분석 시작
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
