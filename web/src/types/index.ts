export interface Supplement {
  id: string;
  name: string;
  category: string;
  best_with: string[];
  worst_with: string[];
  description: string;
  caution_msg: string | null;
  efficacy?: string[];
  side_effects?: string[];
  timing?: string;
  precautions?: string;
}
