export const HEALTH_GOALS = [
  { 
    id: "energy", 
    label: "💪 피로 회복 & 활력", 
    supplements: ["vit_b_complex", "coq10", "magnesium", "iron"] 
  },
  { 
    id: "eye", 
    label: "👁️ 눈 건강", 
    supplements: ["lutein", "omega3", "vit_c"] 
  },
  { 
    id: "skin", 
    label: "✨ 피부 미용", 
    supplements: ["collagen", "vit_c", "glutathione", "biotin"] 
  },
  { 
    id: "antiaging", 
    label: "🐢 저속노화", 
    supplements: ["nmn", "resveratrol", "pqq", "urolithin_a", "omega3", "ergothioneine"] 
  },
  { 
    id: "sleep", 
    label: "😴 수면 개선", 
    supplements: ["magnesium", "theanine"] 
  },
  { 
    id: "immunity", 
    label: "🛡️ 면역 강화", 
    supplements: ["vit_d", "zinc", "propolis", "vit_c"] 
  },
  { 
    id: "joint", 
    label: "🦴 관절 & 뼈", 
    supplements: ["calcium", "vit_d", "magnesium", "collagen", "msm"] 
  },
  { 
    id: "gut", 
    label: "🌿 장 건강", 
    supplements: ["probiotics", "bromelain"] 
  },
];

export const ANTI_AGING_COMBO = [
  "nmn", 
  "resveratrol", 
  "pqq", 
  "omega3", 
  "urolithin_a", 
  "ergothioneine"
];

export const THREE_DEFENSE_LINES = {
  energy: ["nmn", "pqq"],
  gene: ["resveratrol"],
  lifespan: ["astragalus"],
};

export const TIMING_ORDER = [
  "아침 공복", 
  "아침 식후", 
  "점심 식후", 
  "저녁 식후", 
  "취침 전", 
  "식후"
];

export const TIMING_COLORS: Record<string, string> = {
  "아침 공복": "bg-amber-50 border-amber-200 text-amber-800",
  "아침 식후": "bg-orange-50 border-orange-200 text-orange-800",
  "점심 식후": "bg-green-50 border-green-200 text-green-800",
  "저녁 식후": "bg-blue-50 border-blue-200 text-blue-800",
  "취침 전": "bg-indigo-50 border-indigo-200 text-indigo-800",
  "식후": "bg-slate-50 border-slate-200 text-slate-700",
};

export const TIMING_ICONS: Record<string, string> = {
  "아침 공복": "🌅",
  "아침 식후": "☀️",
  "점심 식후": "🌤️",
  "저녁 식후": "🌙",
  "취침 전": "🌜",
  "식후": "🍽️",
};

export const LOCAL_STORAGE_KEY = "nutrimatch_saved_routine";

export const COUPANG_LINKS: Record<string, string> = {
  "omega3": "https://link.coupang.com/a/dyYztG",
  "multivitamin": "https://link.coupang.com/a/dyY0NM",
  "probiotics": "https://link.coupang.com/a/dyY4DH",
  "magnesium": "https://link.coupang.com/a/dyY5ZR",
  "calcium": "https://link.coupang.com/a/dyZdtI",
  "vit_c": "https://link.coupang.com/a/dyZeNr",
  "vit_d": "https://link.coupang.com/a/dyZfQg",
  "vit_b_complex": "https://link.coupang.com/a/dyZgQH",
  "iron": "https://link.coupang.com/a/dyZi33",
  "zinc": "https://link.coupang.com/a/dyZj5b",
  "lutein": "https://link.coupang.com/a/dyZloa",
  "milk_thistle": "https://link.coupang.com/a/dyZmmG",
  "propolis": "https://link.coupang.com/a/dyZnwh",
  "ginseng": "https://link.coupang.com/a/dyZoy2",
  "collagen": "https://link.coupang.com/a/dyZpw5",
  "coq10": "https://link.coupang.com/a/dyZqw5",
  "msm": "https://link.coupang.com/a/dyZrAy",
  "theanine": "https://link.coupang.com/a/dyZtUm",
  "arginine": "https://link.coupang.com/a/dyZu1E",
  "biotin": "https://link.coupang.com/a/dyZxos",
  "quercetin": "https://link.coupang.com/a/dyZygG",
  "bromelain": "https://link.coupang.com/a/dyZy3m",
  "glutathione": "https://link.coupang.com/a/dyZAaZ",
  "nmn": "https://link.coupang.com/a/dyZA3w",
  "resveratrol": "https://link.coupang.com/a/dyZCtB",
  "pqq": "https://link.coupang.com/a/dyZDWJ",
  "astragalus": "https://link.coupang.com/a/dyZE0i",
  "urolithin_a": "https://link.coupang.com/a/dy0bbp",
  "ergothioneine": "https://link.coupang.com/a/dy0bbp",
  "selenium": "https://link.coupang.com/a/dyZj5b",
  "tmg": "https://link.coupang.com/a/dyZA3w",
  "nac": "https://link.coupang.com/a/dyZAaZ",
  "spirulina": "https://link.coupang.com/a/dyZmmG",
  "alpha_lipoic": "https://link.coupang.com/a/dyZqw5",
};
