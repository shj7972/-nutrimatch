import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { 
  siteConfig, 
  generateWebAppJsonLd, 
  generateOrganizationJsonLd 
} from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Viewport 설정
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// 메타데이터 생성
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} | 나만의 영양제 궁합 & 저속노화 분석기`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description.default,
    keywords: siteConfig.keywords,
    
    // 소유자 정보
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    
    // Canonical
    alternates: {
      canonical: siteConfig.url,
      languages: {
        "ko-KR": siteConfig.url,
        "en-US": `${siteConfig.url}/en`,
      },
    },
    
    // Open Graph
    openGraph: {
      ...siteConfig.openGraph,
      title: {
        default: `${siteConfig.name} | 나만의 영양제 궁합 & 저속노화 분석기`,
        template: `%s | ${siteConfig.name}`,
      },
      description: siteConfig.description.long,
    },
    
    // Twitter
    twitter: siteConfig.twitter,
    
    // Icons
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180" },
      ],
      shortcut: "/favicon.ico",
    },
    
    // Manifest
    manifest: siteConfig.manifest,
    
    // Apple
    appleWebApp: {
      capable: true,
      title: siteConfig.shortName,
      startupImage: {
        url: "/apple-touch-icon.png",
      },
    },
    
    // Verification
    verification: {
      google: siteConfig.verification.google,
      other: {
        "naver-site-verification": siteConfig.verification.naver.join(","),
      },
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    
    // Category
    category: "health",
    classification: "Health & Wellness",
    
    // Format
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false,
    },
    
    // Archive
    archives: [`${siteConfig.url}/sitemap.xml`],
    
    // Other metadata
    other: {
      "google-adsense-account": siteConfig.adsense.account,
      "application-name": siteConfig.name,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD 데이터
  const webAppJsonLd = generateWebAppJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html 
      lang={siteConfig.language}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {children}
        
        {/* Google AdSense */}
        <Script
          id="adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.account}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Google Analytics 4 */}
        <Script
          id="gtag"
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.ga4}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `}
        </Script>
      </body>
    </html>
  );
}
