export interface FAQCategory {
  id: string;
  name: string;
  name_en: string;
  sort_order: number;
  icon: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  related_supplements: string[];
  search_keywords: string[];
  featured: boolean;
  sort_order: number;
}

export interface WorstCombo {
  title: string;
  reason: string;
  severity: "high" | "medium" | "low";
  tags: string[];
  alternatives: string;
}

export interface BestCombo {
  title: string;
  reason: string;
  synergy_level: "very_high" | "high" | "medium" | "low";
  tags: string[];
  recommended_dosing: string;
}

export interface TrendGuide {
  title: string;
  content: string;
  author: string;
  sources: string[];
}

export interface SearchIndex {
  enabled: boolean;
  language: string;
  keywords: string[];
}

export interface Metadata {
  version: string;
  created_at: string;
  updated_at: string;
  author: string;
  license: string;
}

export interface SEOContent {
  version: string;
  last_updated: string;
  search_index: SearchIndex;
  worst_combos: WorstCombo[];
  best_combos: BestCombo[];
  trend_guide: TrendGuide;
  faq: {
    categories: FAQCategory[];
    questions: FAQItem[];
  };
  metadata: Metadata;
}

// Helper functions for working with FAQ data

export function getFAQByCategory(questions: FAQItem[], categoryId: string): FAQItem[] {
  return questions
    .filter(q => q.category === categoryId)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getFeaturedFAQs(questions: FAQItem[]): FAQItem[] {
  return questions
    .filter(q => q.featured)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function searchFAQs(
  questions: FAQItem[],
  query: string
): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  return questions.filter(q =>
    q.question.toLowerCase().includes(lowerQuery) ||
    q.answer.toLowerCase().includes(lowerQuery) ||
    q.search_keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedFAQs(
  questions: FAQItem[],
  supplementId: string
): FAQItem[] {
  return questions.filter(q =>
    q.related_supplements.includes(supplementId)
  );
}

export function getComboBySeverity(
  combos: (WorstCombo | BestCombo)[],
  severity: string
): (WorstCombo | BestCombo)[] {
  return combos.filter(c => {
    if ('severity' in c) return c.severity === severity;
    if ('synergy_level' in c) return c.synergy_level === severity;
    return false;
  });
}

export function getCombosByTag(
  combos: (WorstCombo | BestCombo)[],
  tag: string
): (WorstCombo | BestCombo)[] {
  return combos.filter(c => c.tags.includes(tag));
}
