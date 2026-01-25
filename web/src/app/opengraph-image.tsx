// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

// 이미지 크기 설정 (표준 규격)
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // 폰트 로딩 (한글 깨짐 방지 - 구글 폰트 사용)
    // *실제 배포 시에는 로컬 폰트 파일을 사용하는 것이 더 안정적일 수 있습니다.
    // 폰트 로딩 (Pretendard Bold 사용 - 안정적인 CDN)
    const fontData = await fetch(
        'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/public/static/alternates/Pretendard-Bold.otf'
    ).then((res) => {
        if (!res.ok) {
            throw new Error('Failed to fetch font');
        }
        return res.arrayBuffer();
    });

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Noto Sans KR"',
                }}
            >
                {/* 로고 영역 */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#2563EB',
                        borderRadius: '50px',
                        padding: '20px 40px',
                        marginBottom: '40px',
                        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)',
                    }}
                >
                    <span style={{ fontSize: 60, color: 'white', fontWeight: 900 }}>
                        💊 Nutri-Match
                    </span>
                </div>

                {/* 메인 카피 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 50, color: '#1e3a8a', fontWeight: 800, marginBottom: 20 }}>
                        영양제 궁합, 3초 만에 확인!
                    </div>
                    <div style={{ fontSize: 32, color: '#3b82f6', fontWeight: 600 }}>
                        오메가3 + 유산균? 같이 먹어도 될까?
                    </div>
                </div>

                {/* 하단 장식 */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        fontSize: 24,
                        color: '#60a5fa',
                    }}
                >
                    www.nutrimatch.kr
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Noto Sans KR',
                    data: fontData,
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    );
}