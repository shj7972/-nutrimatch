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

