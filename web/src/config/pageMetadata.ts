import { generateMetadata } from "@/config/site";

// 페이지별 메타데이터 설정
export const pageMetadata = {
  // 메인 페이지
  home: generateMetadata({
    path: "/",
  }),
  
  // 가이드 메인 페이지
  guide: generateMetadata({
    title: "영양제 완벽 가이드",
    description: "영양제 선택, 섭취 시간, 부작용에 대한 완벽한 가이드. 과학적으로 검증된 정보로 최적의 영양제 루틴을 만들어보세요.",
    path: "/guide",
    keywords: ["영양제 가이드", "영양제 정보", "건강 가이드", "영양제 추천"],
  }),
  
  // 영양제 상세 페이지 (동적)
  nutrient: (name: string) => generateMetadata({
    title: `${name} - 효능, 부작용, 궁합`,
    description: `${name}의 효능, 부작용, 추천 섭취량 및 다른 영양제와의 궁합을 확인하세요.`,
    path: `/nutrient/${name}`,
    keywords: [name, `${name} 효능`, `${name} 부작용`, `${name} 복용법`],
  }),
  
  // 가이드 상세 페이지 (동적)
  guideDetail: (title: string, description: string) => generateMetadata({
    title: title,
    description: description || "영양제에 대한 자세한 가이드와 정보",
    path: `/guide/${title}`,
  }),
  
  // 404 페이지
  notFound: generateMetadata({
    title: "페이지를 찾을 수 없습니다",
    description: "요청하신 페이지를 찾을 수 없습니다. Nutri-Match에서 원하시는 정보를 찾아보세요.",
    path: "/404",
    noIndex: true,
  }),
  
  // 검색 결과 페이지 (만약 있다면)
  search: generateMetadata({
    title: "영양제 검색",
    description: "원하는 영양제를 검색하고 정보를 확인하세요.",
    path: "/search",
    keywords: ["영양제 검색", "영양제 찾기"],
  }),
};

export default pageMetadata;
