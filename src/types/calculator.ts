export type CalculatorMode =
  | 'standard'
  | 'scientific'
  | 'graph'
  | 'programmer'
  | 'matrices'
  | 'algebra'
  | 'fractions'
  | 'percentages'
  | 'finance'
  | 'geometry'
  | 'statistics'
  | 'probabilities'
  | 'science_tools'
  | 'converter'
  | 'date_time'
  | 'learning';

export type AngleMode = 'DEG' | 'RAD';

export type AppTheme = 'dark' | 'light' | 'amoled';

export type AppLanguage = 'fr' | 'ht' | 'en' | 'es';

export interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  mode: CalculatorMode;
  error?: boolean;
}

export interface AppSettings {
  theme: AppTheme;
  language: AppLanguage;
  angleMode: AngleMode;
  decimals: number; // -1 for auto, or 0, 2, 3, 4, 6, 8, 10
  roundingMode: 'round' | 'floor' | 'ceil';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  defaultMode: CalculatorMode;
  thousandsSeparator: boolean;
}

export interface MathEvalResult {
  success: boolean;
  result?: number;
  formatted?: string;
  error?: string;
}
