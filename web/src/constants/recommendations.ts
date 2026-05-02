// 증상별 추천 영양제 데이터
export const SYMPTOM_DATA: Record<string, {
  label: string;
  emoji: string;
  description: string;
  supplements: string[];
  tips: string[];
  keywords: string[];
}> = {
  "fatigue": {
    label: "만성 피로",
    emoji: "😴",
    description: "쉬어도 피곤하고, 아침에 일어나기 힘드신가요? 만성 피로는 특정 영양소 결핍이 원인인 경우가 많습니다.",
    supplements: ["vit_b_complex", "coq10", "magnesium", "iron", "vit_d", "ginseng"],
    tips: [
      "비타민B군은 에너지 대사의 핵심. 아침 식후 섭취하세요.",
      "철분 결핍(빈혈)이 피로의 주원인일 수 있습니다. 공복에 비타민C와 함께 드세요.",
      "마그네슘은 신경 이완 및 수면 질 개선에 도움됩니다. 저녁 식후 드세요.",
      "코엔자임Q10은 세포 에너지 생성을 돕습니다. 아침 식후 드세요.",
    ],
    keywords: ["만성피로 영양제", "피로회복 영양제", "피곤할 때 영양제", "졸림 영양제"],
  },
  "joint-pain": {
    label: "관절 통증",
    emoji: "🦵",
    description: "무릎·손목·어깨가 아프고 뻑뻑한가요? 관절 연골을 보호하고 염증을 줄이는 영양소가 도움됩니다.",
    supplements: ["collagen", "msm", "omega3", "vit_c", "calcium", "vit_d", "chondroitin"],
    tips: [
      "콜라겐은 비타민C와 함께 섭취해야 흡수율이 높아집니다.",
      "MSM(식이유황)은 관절 염증 완화에 탁월합니다. 아침 식후 드세요.",
      "오메가3의 EPA 성분은 관절 염증을 줄입니다.",
      "칼슘+비타민D+마그네슘은 뼈 건강의 핵심 트리오입니다.",
    ],
    keywords: ["관절 영양제", "무릎 영양제", "관절통 영양제", "관절 좋은 영양제"],
  },
  "skin": {
    label: "피부 고민",
    emoji: "✨",
    description: "피부 탄력 저하, 칙칙한 피부톤, 건조함이 고민이신가요? 피부 속부터 채우는 영양소 조합입니다.",
    supplements: ["collagen", "vit_c", "glutathione", "biotin", "selenium", "vit_e"],
    tips: [
      "글루타치온은 피부 미백의 핵심 성분. 공복 또는 취침 전 드세요.",
      "비타민C는 콜라겐 합성을 돕고 항산화 작용을 합니다.",
      "비오틴은 피부·모발·손톱 건강에 필수입니다.",
      "셀레늄은 글루타치온의 효능을 극대화합니다.",
    ],
    keywords: ["피부 영양제", "미백 영양제", "피부 탄력 영양제", "여드름 영양제"],
  },
  "immunity": {
    label: "면역력 저하",
    emoji: "🛡️",
    description: "감기를 자주 달고 사시나요? 면역 체계를 강화하는 핵심 영양소들입니다.",
    supplements: ["vit_d", "zinc", "vit_c", "selenium", "propolis", "quercetin"],
    tips: [
      "비타민D 결핍은 면역력 저하의 대표 원인입니다. 아침 식후 드세요.",
      "아연은 면역세포 생성에 필수적입니다. 식사 후 드세요.",
      "퀘르세틴+브로멜라인 조합은 면역 시너지가 뛰어납니다.",
      "프로폴리스는 항균 작용으로 감기 예방에 도움됩니다.",
    ],
    keywords: ["면역력 높이는 영양제", "면역력 영양제", "감기 예방 영양제", "면역 강화 영양제"],
  },
  "hair-loss": {
    label: "탈모·모발 고민",
    emoji: "💇",
    description: "머리카락이 많이 빠지고 가늘어졌나요? 모발 성장과 두피 건강을 위한 영양소 조합입니다.",
    supplements: ["biotin", "zinc", "iron", "selenium", "vit_b_complex", "collagen"],
    tips: [
      "비오틴은 모발 성장에 필수적인 영양소입니다.",
      "철분 결핍은 탈모의 주요 원인 중 하나입니다. 비타민C와 함께 드세요.",
      "아연 결핍도 탈모를 유발할 수 있습니다.",
      "셀레늄은 두피 건강 유지에 중요합니다.",
    ],
    keywords: ["탈모 영양제", "모발 영양제", "머리카락 빠질 때 영양제", "두피 영양제"],
  },
  "stress": {
    label: "스트레스·불안",
    emoji: "😰",
    description: "항상 불안하고 긴장되시나요? 신경 안정과 스트레스 완화를 위한 영양소 조합입니다.",
    supplements: ["magnesium", "theanine", "vit_b_complex", "ginseng"],
    tips: [
      "테아닌은 카페인의 흥분 효과를 줄이고 심신 안정에 도움됩니다.",
      "마그네슘은 신경 이완과 수면 질 개선에 탁월합니다. 저녁에 드세요.",
      "비타민B군은 신경계 건강을 유지하고 스트레스 호르몬 조절에 도움됩니다.",
    ],
    keywords: ["스트레스 영양제", "불안 영양제", "신경 안정 영양제", "긴장 완화 영양제"],
  },
  "gut": {
    label: "소화·장 건강",
    emoji: "🌿",
    description: "속이 더부룩하고 변비·설사가 반복되나요? 장 건강을 회복하는 핵심 영양소입니다.",
    supplements: ["probiotics", "bromelain", "magnesium", "vit_c", "glutathione"],
    tips: [
      "유산균은 기상 직후 공복에 물 한 잔과 함께 드세요.",
      "브로멜라인(파인애플 효소)은 단백질 소화를 돕고 염증을 줄입니다.",
      "마그네슘은 장 운동을 촉진해 변비에 효과적입니다.",
    ],
    keywords: ["장 건강 영양제", "소화 영양제", "변비 영양제", "과민성 대장 영양제"],
  },
  "eye": {
    label: "눈 건강·피로",
    emoji: "👁️",
    description: "눈이 침침하고 건조한가요? 스마트폰 사용으로 지친 눈을 위한 영양소입니다.",
    supplements: ["lutein", "omega3", "vit_c", "vit_e", "zinc"],
    tips: [
      "루테인은 황반색소 밀도를 유지해 눈 건강에 도움됩니다. 식사 후 드세요.",
      "오메가3는 눈 건조증 개선에 효과적입니다.",
      "루테인+오메가3 조합은 눈 건강의 황금 콤비입니다.",
    ],
    keywords: ["눈 건강 영양제", "눈 피로 영양제", "루테인 추천", "건조한 눈 영양제"],
  },
};

// 연령별 추천 영양제 데이터
export const AGE_DATA: Record<string, {
  label: string;
  emoji: string;
  description: string;
  supplements: string[];
  priority: string[];
  tips: string[];
  keywords: string[];
}> = {
  "20s": {
    label: "20대",
    emoji: "🌱",
    description: "20대는 영양 기반을 탄탄히 쌓는 시기입니다. 기초 영양소를 충실히 채우고, 피부·에너지·면역에 집중하세요.",
    supplements: ["multivitamin", "vit_d", "omega3", "vit_c", "probiotics", "iron", "collagen"],
    priority: ["multivitamin", "vit_d", "omega3"],
    tips: [
      "종합비타민으로 기초 영양소 결핍을 예방하세요.",
      "비타민D는 한국인 대부분이 부족합니다. 꼭 챙기세요.",
      "여성이라면 철분 보충이 특히 중요합니다.",
      "콜라겐은 20대부터 시작하면 노화 예방에 효과적입니다.",
    ],
    keywords: ["20대 영양제 추천", "20대 필수 영양제", "젊은 여성 영양제", "20대 남성 영양제"],
  },
  "30s": {
    label: "30대",
    emoji: "⚡",
    description: "30대는 만성피로와 스트레스, 피부 노화가 시작되는 시기입니다. 에너지와 항산화에 집중하세요.",
    supplements: ["vit_b_complex", "coq10", "omega3", "vit_d", "magnesium", "collagen", "probiotics"],
    priority: ["vit_b_complex", "coq10", "magnesium"],
    tips: [
      "비타민B군+코엔자임Q10은 30대 만성피로 해결의 핵심 조합입니다.",
      "마그네슘은 스트레스 완화와 수면 질 개선에 탁월합니다.",
      "콜라겐+비타민C 조합으로 피부 탄력을 유지하세요.",
      "오메가3는 혈행 개선과 염증 완화에 꾸준히 드세요.",
    ],
    keywords: ["30대 영양제 추천", "30대 필수 영양제", "30대 여성 영양제", "30대 남성 영양제"],
  },
  "40s": {
    label: "40대",
    emoji: "🔋",
    description: "40대는 노화가 본격화되고 대사가 저하됩니다. 저속노화 루틴과 심혈관 건강에 주목하세요.",
    supplements: ["coq10", "omega3", "vit_d", "magnesium", "resveratrol", "nmn", "probiotics", "calcium"],
    priority: ["coq10", "omega3", "resveratrol"],
    tips: [
      "코엔자임Q10은 40대부터 급격히 감소합니다. 반드시 보충하세요.",
      "레스베라트롤은 장수 유전자(시르투인)를 활성화합니다.",
      "NMN은 세포 에너지 수준을 젊게 유지하는 핵심 성분입니다.",
      "칼슘+비타민D는 40대부터 골밀도 감소 예방을 위해 필수입니다.",
    ],
    keywords: ["40대 영양제 추천", "40대 필수 영양제", "40대 남성 영양제", "40대 여성 영양제"],
  },
  "50s": {
    label: "50대",
    emoji: "🌿",
    description: "50대는 갱년기, 관절 건강, 심혈관 위험이 높아지는 시기입니다. 골밀도와 혈관 건강에 집중하세요.",
    supplements: ["calcium", "vit_d", "omega3", "coq10", "magnesium", "collagen", "msm", "resveratrol"],
    priority: ["calcium", "vit_d", "coq10"],
    tips: [
      "칼슘+비타민D+마그네슘은 50대 골다공증 예방 필수 트리오입니다.",
      "오메가3는 심혈관 건강과 혈중 중성지질 관리에 핵심입니다.",
      "콜라겐+MSM 조합으로 관절 통증을 줄이세요.",
      "코엔자임Q10은 심장 건강과 에너지 대사를 지원합니다.",
    ],
    keywords: ["50대 영양제 추천", "50대 필수 영양제", "50대 여성 영양제", "갱년기 영양제"],
  },
  "60s-plus": {
    label: "60대 이상",
    emoji: "🌸",
    description: "60대 이후는 흡수율 저하, 근감소증, 인지 기능이 주요 과제입니다. 기본에 충실하되 흡수율을 높이는 조합으로 드세요.",
    supplements: ["vit_d", "calcium", "omega3", "vit_b_complex", "probiotics", "coq10", "pqq", "magnesium"],
    priority: ["vit_d", "omega3", "vit_b_complex"],
    tips: [
      "비타민D는 60대 이후 낙상 예방과 면역에 매우 중요합니다.",
      "PQQ는 두뇌와 기억력 보호에 도움됩니다.",
      "유산균은 장 기능이 저하되는 60대에 꼭 챙기세요.",
      "오메가3는 치매 예방 연구에서 주목받는 성분입니다.",
    ],
    keywords: ["60대 영양제 추천", "노인 영양제", "어르신 영양제", "치매 예방 영양제"],
  },
};

export const SYMPTOM_KEYS = Object.keys(SYMPTOM_DATA);
export const AGE_KEYS = Object.keys(AGE_DATA);
