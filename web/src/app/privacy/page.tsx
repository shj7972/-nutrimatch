import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "개인정보 처리방침 및 면책 조항",
    description:
        "Nutri-Match(nutrimatch.kr)의 개인정보 처리방침, 쿠키 사용 안내, 콘텐츠 면책 조항 및 문의 채널을 안내합니다.",
    alternates: { canonical: "https://nutrimatch.kr/privacy" },
    robots: { index: true, follow: true },
};

export default function PrivacyPage() {
    const updated = "2026년 9월 29일";

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-16">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                        aria-label="홈으로 돌아가기"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">돌아가기</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
                <div className="text-center">
                    <div className="inline-flex bg-blue-50 p-4 rounded-full text-blue-600 mb-4">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">개인정보 처리방침</h1>
                    <p className="text-slate-500">시행일: {updated} · Nutri-Match (nutrimatch.kr)</p>
                </div>

                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">1. 개인정보의 수집 및 이용</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Nutri-Match(nutrimatch.kr, 이하 &quot;서비스&quot;)는 영양제 궁합 분석, 섭취 가이드 등 일반 건강 정보를
                        제공하는 웹 서비스입니다. 서비스는 회원 가입 절차 없이 무료로 이용할 수 있으며, 이용 과정에서
                        이용자의 이름, 이메일, 전화번호 등 개인 식별 정보를 별도로 수집·저장하지 않습니다.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        다만 서비스 품질 개선과 광고 제공을 위해 아래와 같은 자동 수집 정보가 생성될 수 있습니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700 leading-relaxed">
                        <li>
                            <strong>저장된 루틴(로컬 데이터)</strong>: 방문자가 선택한 영양제 조합은 브라우저의
                            localStorage에만 저장되며, 서버로 전송되지 않습니다.
                        </li>
                        <li>
                            <strong>이용 통계</strong>: Google Analytics(GA4)를 통해 페이지뷰, 방문 경로 등 익명 통계가
                            수집됩니다.
                        </li>
                    </ul>
                </section>

                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">2. 쿠키(Cookie) 사용에 관하여</h2>
                    <p className="text-slate-700 leading-relaxed">
                        본 서비스는 원활한 서비스 제공과 트래픽 분석을 위해 쿠키를 사용할 수 있습니다. 쿠키는 이용자의
                        웹 브라우저에 저장되는 소량의 데이터로, 방문자의 개인을 식별하는 데 사용되지 않습니다.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        이용자는 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있으며, 이 경우에도 서비스 이용에
                        제한이 없습니다.
                    </p>
                </section>

                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">3. 제3자 광고 서비스에 관하여</h2>
                    <p className="text-slate-700 leading-relaxed">
                        본 서비스는 Google AdSense 등 제3자 광고 서비스를 이용하여 광고를 게재하고 있습니다. 이러한
                        광고 제공사는 이용자의 관심사에 맞는 맞춤 광고를 위해 쿠키 등을 사용할 수 있습니다.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Google 광고의 맞춤 설정 및 쿠키 관리 방법은{" "}
                        <a
                            href="https://policies.google.com/technologies/ads?hl=ko"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            Google 광고 정책 페이지
                        </a>
                        에서 확인할 수 있습니다.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        또한 일부 콘텐츠는 아이허브 제휴 링크를 포함하고 있으며, 이에 따라 일정액의
                        수수료를 제공받을 수 있습니다. 제휴 링크를 통한 구매 여부와 무관하게 콘텐츠의 평가 기준은
                        동일하게 적용됩니다.
                    </p>
                </section>

                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">4. 콘텐츠 면책 조항 및 이용 약관</h2>
                    <p className="text-slate-700 leading-relaxed font-medium">
                        본 콘텐츠는 일반적인 건강 정보를 제공하며, 의학적 진단·치료·조언을 대체하지 않습니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700 leading-relaxed">
                        <li>
                            상세 페이지의 효능 정보는 식품의약품안전처 건강기능식품 기능성 정보와 미국 국립보건원(NIH)
                            보충제 지침을 참고해 작성했으며, 개인의 건강 상태에 따라 적합성이 다를 수 있습니다.
                        </li>
                        <li>
                            영양제 복용 여부와 용량은 반드시 의사 또는 약사와 상담 후 결정하시기 바랍니다. 특히 임산부,
                            수유부, 만성질환자, 처방약 복용자는 전문의 상담이 필요합니다.
                        </li>
                        <li>
                            궁합 분석 결과는 일반적인 성분 간 상호작용 정보를 기반으로 한 참고 자료이며, 개인별 질환·
                            복용 중인 의약품 상황까지 반영하지는 않습니다.
                        </li>
                        <li>
                            서비스 이용으로 인해 발생한 문제에 대해 Nutri-Match는 법적 책임을 지지 않습니다.
                        </li>
                        <li>
                            본 콘텐츠의 텍스트·이미지는 Nutri-Match에 귀속되며, 출처 표기 없이 영리 목적 무단 전재를
                            금지합니다.
                        </li>
                    </ul>
                </section>

                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">5. 문의</h2>
                    <p className="text-slate-700 leading-relaxed">
                        개인정보, 콘텐츠 오류, 제휴 및 기타 문의사항은 아래 이메일로 연락 주시면 확인 후 답변드립니다.
                    </p>
                    <div className="flex items-center gap-2 text-slate-700">
                        <span className="text-slate-500">이메일:</span>
                        <a
                            href="mailto:nutrimatch.kr@gmail.com"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            nutrimatch.kr@gmail.com
                        </a>
                    </div>
                    <p className="text-xs text-slate-400">본 방침은 {updated}에 개정되었습니다.</p>
                </section>

                {/* 하단 이동 */}
                <div className="text-center pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all"
                    >
                        영양제 궁합 분석 시작하기
                    </Link>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed text-center px-4">
                    © {updated.slice(-5).replace('년', '')} Nutri-Match. 본 사이트는 일반적인 건강 정보를 제공하며,
                    의학적 조언을 대체하지 않습니다.
                </p>
            </main>
        </div>
    );
}
