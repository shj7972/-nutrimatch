import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Nutri-Match";
    const subtitle = searchParams.get("subtitle") || "영양제 궁합 분석기";

    const titleFontSize = title.length > 18 ? 52 : title.length > 12 ? 62 : 72;

    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #4f46e5 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    padding: "60px 80px",
                }}
            >
                <div style={{ fontSize: 26, color: "rgba(255,255,255,0.65)", fontWeight: 700, marginBottom: 24, letterSpacing: 2 }}>
                    💊 Nutri-Match
                </div>
                <div
                    style={{
                        fontSize: titleFontSize,
                        fontWeight: 900,
                        color: "white",
                        textAlign: "center",
                        lineHeight: 1.25,
                        marginBottom: 24,
                        maxWidth: 1000,
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        fontSize: 26,
                        color: "rgba(255,255,255,0.8)",
                        textAlign: "center",
                        maxWidth: 860,
                        lineHeight: 1.5,
                    }}
                >
                    {subtitle}
                </div>
                <div
                    style={{
                        marginTop: 48,
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 20,
                        padding: "10px 32px",
                        fontSize: 20,
                        color: "white",
                        fontWeight: 600,
                        border: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    nutrimatch.kr
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
