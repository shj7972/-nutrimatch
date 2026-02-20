import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nutri-Match | 나만의 영양제 궁합 & 저속노화 분석기",
    template: "%s | Nutri-Match",
  },
  description: "영양제 궁합 계산기, 저속노화(NMN, 레스베라트롤, 유로리틴A) 조합, 영양제 부작용 및 섭취 시간 완벽 가이드.",
  keywords: ["영양제 궁합", "영양제 조합", "저속노화", "NMN", "레스베라트롤", "유로리틴A", "영양제 부작용", "영양제 섭취 시간", "오메가3", "비타민D", "유산균", "마그네슘", "영양제 추천"],
  metadataBase: new URL("https://nutrimatch.kr"),
  alternates: {
    canonical: "https://nutrimatch.kr",
  },
  openGraph: {
    title: "Nutri-Match | 나만의 영양제 궁합 & 저속노화 분석기",
    description: "내가 먹는 영양제, 같이 먹어도 될까? 1초 만에 궁합과 부작용을 확인하세요.",
    url: "https://nutrimatch.kr",
    siteName: "Nutri-Match",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutri-Match | 나만의 영양제 궁합 & 저속노화 분석기",
    description: "내가 먹는 영양제, 같이 먹어도 될까? 1초 만에 궁합과 부작용을 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "naver-site-verification": [
      "291b9dbe622f35d01031c809e42264fefc9040fe",
      "ddc3f85be72e592f1ac7cd102717668866bc8e57"
    ],
    "google-site-verification": "verification_code_here", // 구글 서치 콘솔 코드 필요
    "google-adsense-account": "ca-pub-2947913248390883",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Nutri-Match",
  "url": "https://nutrimatch.kr",
  "description": "나만의 영양제 궁합 분석기. 영양제 조합의 시너지와 부작용을 1초 만에 확인하세요.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "inLanguage": "ko"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2947913248390883"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WHHQ1PBQRE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WHHQ1PBQRE');
          `}
        </Script>
      </body>
    </html>
  );
}
