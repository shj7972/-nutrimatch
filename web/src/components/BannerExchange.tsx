"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Banner {
    href: string;
    src: string;
    alt: string;
    title?: string;
}

const ALL_BANNERS: Banner[] = [
    {
        href: "https://stock-insight.app",
        src: "https://stock-insight.app/static/banner_link_234x60.png",
        alt: "내 주식, 살까 팔까? Stock Insight AI 분석 결과 보기"
    },
    {
        href: "https://unsedam.kr",
        src: "https://unsedam.kr/static/images/banner_link_234x60.png",
        alt: "운세담 - 2026 무료 토정비결 & AI 사주"
    },
    {
        href: "https://vibecheck.page",
        src: "https://vibecheck.page/images/vibecheck_banner_234x60.png",
        alt: "VibeCheck 배너",
        title: "VibeCheck - 나를 찾는 트렌디한 심리테스트"
    },
    {
        href: "https://promptgenie.kr",
        src: "https://promptgenie.kr/images/banner_link_new_234x60.png",
        alt: "PromptGenie - AI Prompt Library"
    },
    {
        href: "https://irumlab.com",
        src: "https://irumlab.com/banner_link_234x60.png",
        alt: "이룸랩 배너",
        title: "이룸랩 - 무료 셀프 작명, 영어 닉네임, 브랜드 네이밍"
    }
];

export default function BannerExchange() {
    const [randomBanners, setRandomBanners] = useState<Banner[]>([]);

    useEffect(() => {
        // Shuffle and pick 3
        const shuffled = [...ALL_BANNERS].sort(() => 0.5 - Math.random());
        setRandomBanners(shuffled.slice(0, 3));
    }, []);

    if (randomBanners.length === 0) {
        return null; // Don't render empty hydration mismatch
    }

    return (
        <section className="bg-slate-50 py-8 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">Partner Sites</h3>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {randomBanners.map((banner, idx) => (
                        <a
                            key={idx}
                            href={banner.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={banner.title}
                            className="transition-opacity hover:opacity-80"
                        >
                            <img
                                src={banner.src}
                                alt={banner.alt}
                                width={234}
                                height={60}
                                className="w-[234px] h-[60px] object-cover border border-slate-200 rounded-md"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
