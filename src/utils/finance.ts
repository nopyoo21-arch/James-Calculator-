// Outils financiers éducatifs avec hypothèses, formules et étapes détaillées

export interface SimpleInterestResult {
  principal: number;
  rateAnnual: number;
  timeYears: number;
  interest: number;
  totalAmount: number;
  formula: string;
}

export interface CompoundInterestResult {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency: number; // 1 = annuel, 4 = trimestriel, 12 = mensuel
  futureValue: number;
  totalInterest: number;
  yearlyBreakdown: { year: number; balance: number; interestEarned: number }[];
  formula: string;
}

export interface AmortizationRow {
  period: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface LoanResult {
  loanAmount: number;
  annualRate: number;
  termMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  amortizationSchedule: AmortizationRow[];
  formula: string;
}

export interface MarginResult {
  costPrice: number;
  sellingPrice: number;
  grossMargin: number;
  marginRate: number; // Marge / Coût d'achat (%)
  markupRate: number; // Marge / Prix de vente (%) (Taux de marque)
  vatAmount?: number;
  priceWithTax?: number;
}

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rateToEUR: number;
}

export const DEFAULT_CURRENCIES: CurrencyRate[] = [
  { code: 'EUR', name: 'Euro', symbol: '€', rateToEUR: 1.0 },
  { code: 'USD', name: 'Dollar américain', symbol: '$', rateToEUR: 1.08 },
  { code: 'CAD', name: 'Dollar canadien', symbol: 'CA$', rateToEUR: 1.48 },
  { code: 'GBP', name: 'Livre sterling', symbol: '£', rateToEUR: 0.85 },
  { code: 'CHF', name: 'Franc suisse', symbol: 'CHF', rateToEUR: 0.97 },
  { code: 'JPY', name: 'Yen japonais', symbol: '¥', rateToEUR: 165.2 },
  { code: 'XOF', name: 'Franc CFA (UEMOA)', symbol: 'FCFA', rateToEUR: 655.957 },
  { code: 'XAF', name: 'Franc CFA (CEMAC)', symbol: 'FCFA', rateToEUR: 655.957 },
  { code: 'MAD', name: 'Dirham marocain', symbol: 'DH', rateToEUR: 10.85 },
  { code: 'DZD', name: 'Dinar algérien', symbol: 'DA', rateToEUR: 145.2 },
  { code: 'TND', name: 'Dinar tunisien', symbol: 'DT', rateToEUR: 3.35 },
];

// Intérêts simples : I = C * r * t
export function calculateSimpleInterest(capital: number, annualRatePct: number, durationYears: number): SimpleInterestResult {
  const r = annualRatePct / 100;
  const interest = capital * r * durationYears;
  const totalAmount = capital + interest;
  return {
    principal: capital,
    rateAnnual: annualRatePct,
    timeYears: durationYears,
    interest,
    totalAmount,
    formula: `I = C × r × t = ${capital.toLocaleString('fr-FR')} × (${annualRatePct} / 100) × ${durationYears} = ${interest.toFixed(2)} €`,
  };
}

// Intérêts composés : A = P(1 + r/n)^(nt)
export function calculateCompoundInterest(
  capital: number,
  annualRatePct: number,
  years: number,
  frequency: number = 1 // 1: Annuel, 4: Trimestriel, 12: Mensuel
): CompoundInterestResult {
  const r = annualRatePct / 100;
  const n = frequency;
  const totalPeriods = years * n;
  const ratePerPeriod = r / n;

  const yearlyBreakdown: { year: number; balance: number; interestEarned: number }[] = [];
  let currentBalance = capital;

  for (let y = 1; y <= years; y++) {
    const startYearBalance = currentBalance;
    currentBalance = capital * Math.pow(1 + ratePerPeriod, y * n);
    yearlyBreakdown.push({
      year: y,
      balance: currentBalance,
      interestEarned: currentBalance - startYearBalance,
    });
  }

  const futureValue = capital * Math.pow(1 + ratePerPeriod, totalPeriods);
  const totalInterest = futureValue - capital;

  return {
    principal: capital,
    annualRate: annualRatePct,
    years,
    compoundingFrequency: frequency,
    futureValue,
    totalInterest,
    yearlyBreakdown,
    formula: `A = P × (1 + r/n)^(n×t) = ${capital.toLocaleString('fr-FR')} × (1 + ${r}/${n})^(${n}×${years}) = ${futureValue.toFixed(2)} €`,
  };
}

// Simulateur de prêt bancaire avec mensualités et tableau d'amortissement
export function calculateLoan(
  loanAmount: number,
  annualRatePct: number,
  termMonths: number
): LoanResult {
  if (termMonths <= 0) throw new Error('La durée du prêt doit être supérieure à 0');
  const monthlyRate = annualRatePct / 100 / 12;

  let monthlyPayment = 0;
  if (Math.abs(monthlyRate) < 1e-9) {
    monthlyPayment = loanAmount / termMonths;
  } else {
    // Formule d'annuité standard : M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + monthlyRate, termMonths);
    monthlyPayment = loanAmount * ((monthlyRate * factor) / (factor - 1));
  }

  const amortizationSchedule: AmortizationRow[] = [];
  let remaining = loanAmount;
  let totalInterest = 0;

  for (let month = 1; month <= termMonths; month++) {
    const interestPart = remaining * monthlyRate;
    const principalPart = monthlyPayment - interestPart;
    remaining -= principalPart;
    if (month === termMonths || remaining < 0) remaining = 0;
    totalInterest += interestPart;

    amortizationSchedule.push({
      period: month,
      payment: monthlyPayment,
      principalPaid: principalPart,
      interestPaid: interestPart,
      remainingBalance: remaining,
    });
  }

  return {
    loanAmount,
    annualRate: annualRatePct,
    termMonths,
    monthlyPayment,
    totalInterest,
    totalPayment: loanAmount + totalInterest,
    amortizationSchedule,
    formula: `M = P × [r(1+r)^n] / [(1+r)^n - 1]`,
  };
}

// Marges commerciales : Taux de marge et Taux de marque
export function calculateCommercialMargin(costPrice: number, sellingPrice: number, vatPct: number = 20): MarginResult {
  const grossMargin = sellingPrice - costPrice;
  const marginRate = costPrice > 0 ? (grossMargin / costPrice) * 100 : 0; // Marge / Coût
  const markupRate = sellingPrice > 0 ? (grossMargin / sellingPrice) * 100 : 0; // Marge / PV (Taux de marque)
  const vatAmount = (sellingPrice * vatPct) / 100;
  const priceWithTax = sellingPrice + vatAmount;

  return {
    costPrice,
    sellingPrice,
    grossMargin,
    marginRate,
    markupRate,
    vatAmount,
    priceWithTax,
  };
}

// Calcul de TVA et conversion HT <-> TTC
export function calculateVat(amount: number, vatRatePct: number, mode: 'from_ht' | 'from_ttc'): {
  ht: number;
  vat: number;
  ttc: number;
  rate: number;
} {
  const rate = vatRatePct / 100;
  if (mode === 'from_ht') {
    const vat = amount * rate;
    const ttc = amount + vat;
    return { ht: amount, vat, ttc, rate: vatRatePct };
  } else {
    const ht = amount / (1 + rate);
    const vat = amount - ht;
    return { ht, vat, ttc: amount, rate: vatRatePct };
  }
}

// Calcul de remises commerciales (simples ou successives)
export interface DiscountResult {
  initialPrice: number;
  discount1Pct: number;
  discount2Pct?: number;
  discountAmount1: number;
  discountAmount2: number;
  totalDiscountAmount: number;
  effectiveDiscountRate: number;
  finalPrice: number;
  formula: string;
}

export function calculateDiscount(initialPrice: number, discount1Pct: number, discount2Pct: number = 0): DiscountResult {
  const d1Amount = (initialPrice * discount1Pct) / 100;
  const priceAfterD1 = initialPrice - d1Amount;
  const d2Amount = (priceAfterD1 * discount2Pct) / 100;
  const finalPrice = priceAfterD1 - d2Amount;
  const totalDiscountAmount = d1Amount + d2Amount;
  const effectiveDiscountRate = initialPrice > 0 ? (totalDiscountAmount / initialPrice) * 100 : 0;

  return {
    initialPrice,
    discount1Pct,
    discount2Pct,
    discountAmount1: d1Amount,
    discountAmount2: d2Amount,
    totalDiscountAmount,
    effectiveDiscountRate,
    finalPrice,
    formula: discount2Pct > 0
      ? `Remise 1 : ${discount1Pct}% (-${d1Amount.toFixed(2)} €) puis Remise 2 : ${discount2Pct}% (-${d2Amount.toFixed(2)} €)`
      : `Remise : ${discount1Pct}% (-${d1Amount.toFixed(2)} €)`,
  };
}

// Calcul de commissions commerciales
export interface CommissionResult {
  salesRevenue: number;
  commissionRatePct: number;
  baseSalary: number;
  commissionAmount: number;
  totalEarnings: number;
  formula: string;
}

export function calculateCommission(salesRevenue: number, commissionRatePct: number, baseSalary: number = 0): CommissionResult {
  const commissionAmount = (salesRevenue * commissionRatePct) / 100;
  const totalEarnings = baseSalary + commissionAmount;

  return {
    salesRevenue,
    commissionRatePct,
    baseSalary,
    commissionAmount,
    totalEarnings,
    formula: `Commission = ${salesRevenue.toLocaleString('fr-FR')} € × ${commissionRatePct}% = ${commissionAmount.toFixed(2)} €`,
  };
}

// Simulateur d'Épargne & Investissement programmé (Capital + Versements périodiques)
export interface SavingsPlanResult {
  initialDeposit: number;
  monthlyDeposit: number;
  annualRatePct: number;
  years: number;
  totalInvested: number;
  finalBalance: number;
  totalInterest: number;
  formula: string;
}

export function calculateSavingsPlan(
  initialDeposit: number,
  monthlyDeposit: number,
  annualRatePct: number,
  years: number
): SavingsPlanResult {
  const months = years * 12;
  const r = annualRatePct / 100 / 12;
  const totalInvested = initialDeposit + monthlyDeposit * months;

  let finalBalance = 0;
  if (Math.abs(r) < 1e-9) {
    finalBalance = totalInvested;
  } else {
    const fvInitial = initialDeposit * Math.pow(1 + r, months);
    const fvMonthly = monthlyDeposit * ((Math.pow(1 + r, months) - 1) / r);
    finalBalance = fvInitial + fvMonthly;
  }

  const totalInterest = Math.max(0, finalBalance - totalInvested);

  return {
    initialDeposit,
    monthlyDeposit,
    annualRatePct,
    years,
    totalInvested,
    finalBalance,
    totalInterest,
    formula: `A = P×(1+r)^n + PMT×[((1+r)^n - 1) / r]`,
  };
}
