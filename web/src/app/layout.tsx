import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "영양제 궁합 계산기, 저속노화(NMN, 레스베라트롤) 조합, 영양제 부작용 및 섭취 시간 완벽 가이드.",
  metadataBase: new URL("https://nutrimatch.kr"),
  openGraph: {
    title: "Nutri-Match | 나만의 영양제 궁합 & 저속노화 분석기",
    description: "내가 먹는 영양제, 같이 먹어도 될까? 1초 만에 궁합과 부작용을 확인하세요.",
    url: "https://nutrimatch.kr",
    siteName: "Nutri-Match",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "naver-site-verification": "verification_code_here", // 네이버 서치어드바이저 코드 필요
    "google-site-verification": "verification_code_here", // 구글 서치 콘솔 코드 필요
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
