import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// 영양제 ID → 표시 이름 + 이모지 매핑
const SUPPLEMENT_MAP: Record<string, { name: string; emoji: string }> = {
  omega3:       { name: "오메가3",            emoji: "🐟" },
  multivitamin: { name: "종합비타민",          emoji: "💊" },
  probiotics:   { name: "유산균",             emoji: "🦠" },
  magnesium:    { name: "마그네슘",            emoji: "⚡" },
  calcium:      { name: "칼슘",              emoji: "🦴" },
  vit_c:        { name: "비타민C",            emoji: "🍋" },
  vit_d:        { name: "비타민D",            emoji: "☀️" },
  iron:         { name: "철분",              emoji: "🔴" },
  zinc:         { name: "아연",              emoji: "🔵" },
  lutein:       { name: "루테인",             emoji: "👁️" },
  milk_thistle: { name: "밀크씨슬",           emoji: "🌿" },
  vit_b_complex:{ name: "비타민B군",          emoji: "🔋" },
  propolis:     { name: "프로폴리스",          emoji: "🍯" },
  ginseng:      { name: "홍삼",              emoji: "🌱" },
  collagen:     { name: "콜라겐",             emoji: "✨" },
  coq10:        { name: "코엔자임Q10",        emoji: "❤️" },
  msm:          { name: "MSM",              emoji: "🦵" },
  theanine:     { name: "테아닌",             emoji: "🍵" },
  arginine:     { name: "아르기닌",           emoji: "💪" },
  biotin:       { name: "비오틴",             emoji: "💇" },
  quercetin:    { name: "퀘르세틴",           emoji: "🧅" },
  bromelain:    { name: "브로멜라인",          emoji: "🍍" },
  glutathione:  { name: "글루타치온",          emoji: "🌸" },
  nmn:          { name: "NMN",              emoji: "⏳" },
  resveratrol:  { name: "레스베라트롤",        emoji: "🍇" },
  pqq:          { name: "PQQ",              emoji: "🧠" },
  astragalus:   { name: "황기 추출물",         emoji: "🧬" },
  urolithin_a:  { name: "유로리틴A",          emoji: "🏋️" },
  ergothioneine:{ name: "에르고치오네인",       emoji: "🍄" },
  selenium:     { name: "셀레늄",             emoji: "🛡️" },
  tmg:          { name: "TMG",              emoji: "🔄" },
  nac:          { name: "NAC",              emoji: "🫁" },
  spirulina:    { name: "스피루리나",          emoji: "🌊" },
  alpha_lipoic: { name: "알파리포산",          emoji: "♻️" },
  albumin:      { name: "알부민",             emoji: "🩸" },
  chondroitin:  { name: "콘드로이친",          emoji: "🦿" },
  vit_e:        { name: "비타민E",            emoji: "🌻" },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sParam = searchParams.get("s");
  const title = searchParams.get("title") || "Nutri-Match";
  const subtitle = searchParams.get("subtitle") || "영양제 궁합 분석기";

  // s 파라미터가 있으면 → 영양제 조합 카드 OG
  if (sParam) {
    const ids = sParam.split(",").filter(Boolean).slice(0, 8); // 최대 8개
    const supplements = ids
      .map((id) => SUPPLEMENT_MAP[id])
      .filter(Boolean);

    const displayCount = supplements.length;
    const extraCount = ids.length - displayCount;

    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "48px 56px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Brand header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "6px 18px",
                fontSize: 20,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              💊 Nutri-Match
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 32,
            }}
          >
            내 영양제 {ids.length}개 조합 분석 완료!
          </div>

          {/* Supplement pills grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              flex: 1,
            }}
          >
            {supplements.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 16,
                  padding: "10px 20px",
                  fontSize: 22,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: 26 }}>{s.emoji}</span>
                {s.name}
              </div>
            ))}
            {extraCount > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: "10px 20px",
                  fontSize: 20,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                }}
              >
                +{extraCount}개 더
              </div>
            )}
          </div>

          {/* CTA footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 28,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              궁합 분석 · 타임테이블 · 저속노화 루틴
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: 10,
                padding: "8px 20px",
                fontSize: 18,
                color: "white",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              nutrimatch.kr
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // s 파라미터 없으면 → 기존 title/subtitle 범용 OG
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
