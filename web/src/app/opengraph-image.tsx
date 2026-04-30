import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
                    padding: "60px",
                }}
            >
                <div style={{ fontSize: 36, color: "rgba(255,255,255,0.75)", fontWeight: 700, marginBottom: 20, letterSpacing: 2 }}>
                    💊 Nutri-Match
                </div>
                <div
                    style={{
                        fontSize: 68,
                        fontWeight: 900,
                        color: "white",
                        textAlign: "center",
                        lineHeight: 1.2,
                        marginBottom: 24,
                    }}
                >
                    나만의 영양제 궁합 분석기
                </div>
                <div
                    style={{
                        fontSize: 28,
                        color: "rgba(255,255,255,0.8)",
                        textAlign: "center",
                        maxWidth: 820,
                        lineHeight: 1.5,
                    }}
                >
                    영양제 조합의 시너지와 부작용을 1초 만에 확인하세요
                </div>
                <div
                    style={{
                        marginTop: 48,
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 20,
                        padding: "12px 36px",
                        fontSize: 22,
                        color: "white",
                        fontWeight: 600,
                        border: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    nutrimatch.kr
                </div>
            </div>
        ),
        { ...size }
    );
}
