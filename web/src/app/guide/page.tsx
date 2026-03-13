import { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/config/pageMetadata";
import guidePosts from "@/data/guide_posts.json";
import { BookOpen, ArrowRight, Tag } from "lucide-react";

// 중앙화된 메타데이터 사용
export const metadata: Metadata = pageMetadata.guide;

const CATEGORY_COLORS: Record<string, string> = {
    "섭취 타이밍": "bg-blue-100 text-blue-700",
    "흡수율 & 섭취법": "bg-orange-100 text-orange-700",
    "저속노화": "bg-violet-100 text-violet-700",
    "영양소 가이드": "bg-green-100 text-green-700",
    "대상별 추천": "bg-pink-100 text-pink-700",
};

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-blue-600 text-lg">
                        💊 Nutri-Match
                    </Link>
                    <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                        궁합 분석기 →
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Hero */}
                <div className="text-center mb-12">
                    <div className="inline-flex bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">영양제 완벽 가이드</h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">
                        올바른 섭취법부터 저속노화 루틴까지,<br />과학에 기반한 영양제 정보를 드립니다.
                    </p>
                </div>

                {/* Guide Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {(guidePosts as GuidePost[]).map((post) => (
                        <Link
                            key={post.slug}
                            href={`/guide/${post.slug}`}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${CATEGORY_COLORS[post.category] || "bg-slate-100 text-slate-600"}`}>
                                    <Tag className="w-3 h-3" />
                                    {post.category}
                                </span>
                                <span className="text-xs text-slate-400">{post.date}</span>
                            </div>
                            <h2 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-blue-700 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                                {post.description}
                            </p>
                            <div className="flex items-center text-blue-600 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                                자세히 보기 <ArrowRight className="w-4 h-4" />
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

interface GuidePost {
    slug: string;
    title: string;
    description: string;
    category: string;
    date: string;
    keyword: string;
    relatedSupplements: string[];
    sections: { heading: string; body: string }[];
}
