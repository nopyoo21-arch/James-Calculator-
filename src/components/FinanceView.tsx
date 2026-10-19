import React, { useState } from 'react';
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateLoan,
  calculateCommercialMargin,
  calculateVat,
  calculateDiscount,
  calculateCommission,
  calculateSavingsPlan,
  DEFAULT_CURRENCIES,
  CurrencyRate,
} from '../utils/finance';
import { Landmark, PiggyBank, Calculator, Receipt, DollarSign, TrendingUp, Tag, Coins, Percent } from 'lucide-react';

export const FinanceView: React.FC = () => {
  const [subTab, setSubTab] = useState<'loan' | 'compound' | 'simple' | 'savings' | 'margin' | 'vat' | 'discount' | 'commission' | 'currency' | 'budget'>('loan');

  // Budget & Financial Planning State
  const [budgetIncome, setBudgetIncome] = useState<number>(2800);
  const [budgetNeeds, setBudgetNeeds] = useState<number>(1350);
  const [budgetWants, setBudgetWants] = useState<number>(750);
  const [breakEvenFixed, setBreakEvenFixed] = useState<number>(4500);
  const [breakEvenPrice, setBreakEvenPrice] = useState<number>(65);
  const [breakEvenCost, setBreakEvenCost] = useState<number>(25);

  // Loan State
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [loanRate, setLoanRate] = useState<number>(3.5);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Compound Interest State
  const [compCapital, setCompCapital] = useState<number>(10000);
  const [compRate, setCompRate] = useState<number>(5);
  const [compYears, setCompYears] = useState<number>(10);
  const [compFreq, setCompFreq] = useState<number>(12); // monthly

  // Simple Interest State
  const [simpCapital, setSimpCapital] = useState<number>(5000);
  const [simpRate, setSimpRate] = useState<number>(4);
  const [simpYears, setSimpYears] = useState<number>(3);

  // Savings Plan State
  const [savInit, setSavInit] = useState<number>(5000);
  const [savMonthly, setSavMonthly] = useState<number>(250);
  const [savRate, setSavRate] = useState<number>(6.0);
  const [savYears, setSavYears] = useState<number>(10);

  // Discount State
  const [discPrice, setDiscPrice] = useState<number>(120);
  const [discPct1, setDiscPct1] = useState<number>(20);
  const [discPct2, setDiscPct2] = useState<number>(10);

  // Commission State
  const [commRev, setCommRev] = useState<number>(25000);
  const [commRate, setCommRate] = useState<number>(5.0);
  const [commBase, setCommBase] = useState<number>(1500);

  // Margin State
  const [costPrice, setCostPrice] = useState<number>(50);
  const [sellingPrice, setSellingPrice] = useState<number>(85);
  const [marginVat, setMarginVat] = useState<number>(20);

  // VAT State
  const [vatAmount, setVatAmount] = useState<number>(100);
  const [vatRate, setVatRate] = useState<number>(20);
  const [vatMode, setVatMode] = useState<'from_ht' | 'from_ttc'>('from_ht');

  // Currency State
  const [currAmount, setCurrAmount] = useState<number>(100);
  const [currFrom, setCurrFrom] = useState<string>('EUR');
  const [currTo, setCurrTo] = useState<string>('USD');
  const [currencies, setCurrencies] = useState<CurrencyRate[]>(DEFAULT_CURRENCIES);

  // Computations
  const loanResult = calculateLoan(loanAmount, loanRate, loanYears * 12);
  const compResult = calculateCompoundInterest(compCapital, compRate, compYears, compFreq);
  const simpResult = calculateSimpleInterest(simpCapital, simpRate, simpYears);
  const savingsResult = calculateSavingsPlan(savInit, savMonthly, savRate, savYears);
  const discountResult = calculateDiscount(discPrice, discPct1, discPct2);
  const commissionResult = calculateCommission(commRev, commRate, commBase);
  const marginResult = calculateCommercialMargin(costPrice, sellingPrice, marginVat);
  const vatResult = calculateVat(vatAmount, vatRate, vatMode);

  // Currency conversion
  const fromRate = currencies.find((c) => c.code === currFrom)?.rateToEUR || 1;
  const toRate = currencies.find((c) => c.code === currTo)?.rateToEUR || 1;
  const convertedCurr = (currAmount / fromRate) * toRate;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub tabs */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubTab('loan')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'loan' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Simulateur de Prêt
        </button>
        <button
          onClick={() => setSubTab('compound')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'compound' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Intérêts Composés
        </button>
        <button
          onClick={() => setSubTab('savings')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'savings' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Épargne & Investissement
        </button>
        <button
          onClick={() => setSubTab('simple')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'simple' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Intérêts Simples
        </button>
        <button
          onClick={() => setSubTab('margin')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'margin' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Marges & Bénéfices
        </button>
        <button
          onClick={() => setSubTab('discount')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'discount' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Remises Commerciales
        </button>
        <button
          onClick={() => setSubTab('commission')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'commission' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Commissions
        </button>
        <button
          onClick={() => setSubTab('vat')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'vat' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          TVA (HT / TTC)
        </button>
        <button
          onClick={() => setSubTab('currency')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'currency' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Devises
        </button>
        <button
          onClick={() => setSubTab('budget')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'budget' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Budget & Trésorerie
        </button>
      </div>

      {/* 1. Loan Simulator */}
      {subTab === 'loan' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-sky-400" />
                <span>Simulateur de Prêt & Crédit</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calcul des mensualités, coût total et tableau d'amortissement</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Montant emprunté (€)</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Taux d'intérêt annuel (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={loanRate}
                  onChange={(e) => setLoanRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Durée du prêt (Années)</label>
                <input
                  type="number"
                  value={loanYears}
                  onChange={(e) => setLoanYears(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Mensualité constante</div>
              <div className="text-2xl font-mono font-bold text-sky-400 mt-1 tabular-nums">
                {loanResult.monthlyPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-[11px] text-slate-500 mt-1">par mois pendant {loanYears * 12} mois</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Coût total des intérêts</div>
              <div className="text-2xl font-mono font-bold text-amber-400 mt-1 tabular-nums">
                {loanResult.totalInterest.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Soit {((loanResult.totalInterest / loanAmount) * 100).toFixed(1)}% du capital</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Coût global du crédit</div>
              <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">
                {loanResult.totalPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Capital + Intérêts</div>
            </div>
          </div>

          {/* Amortization Table Toggle */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Tableau d'amortissement détaillé
                </h3>
                <p className="text-xs text-slate-400">Échéancier mois par mois</p>
              </div>
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 transition-colors cursor-pointer"
              >
                {showAmortization ? 'Masquer le tableau' : 'Afficher les mensualités'}
              </button>
            </div>

            {showAmortization && (
              <div className="max-h-80 overflow-y-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="sticky top-0 bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Mois</th>
                      <th className="py-2.5 px-3">Mensualité</th>
                      <th className="py-2.5 px-3">Part Capital</th>
                      <th className="py-2.5 px-3">Part Intérêts</th>
                      <th className="py-2.5 px-3 text-right">Capital restant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-slate-300">
                    {loanResult.amortizationSchedule.map((row) => (
                      <tr key={row.period} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-semibold text-slate-200">{row.period}</td>
                        <td className="py-2 px-3">{row.payment.toFixed(2)} €</td>
                        <td className="py-2 px-3 text-emerald-400">{row.principalPaid.toFixed(2)} €</td>
                        <td className="py-2 px-3 text-amber-400">{row.interestPaid.toFixed(2)} €</td>
                        <td className="py-2 px-3 text-right font-bold text-white">{row.remainingBalance.toFixed(2)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Compound Interest */}
      {subTab === 'compound' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-sky-400" />
                <span>Simulateur d'Intérêts Composés & Épargne</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calcul de capitalisation selon la fréquence</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Capital initial (€)</label>
                <input
                  type="number"
                  value={compCapital}
                  onChange={(e) => setCompCapital(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Taux annuel (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={compRate}
                  onChange={(e) => setCompRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Durée (Années)</label>
                <input
                  type="number"
                  value={compYears}
                  onChange={(e) => setCompYears(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Capitalisation</label>
                <select
                  value={compFreq}
                  onChange={(e) => setCompFreq(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                >
                  <option value={1}>Annuelle (1 fois/an)</option>
                  <option value={4}>Trimestrielle (4 fois/an)</option>
                  <option value={12}>Mensuelle (12 fois/an)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Valeur acquise finale</div>
              <div className="text-3xl font-mono font-bold text-sky-400 mt-1 tabular-nums">
                {compResult.futureValue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Intérêts cumulés générés</div>
              <div className="text-3xl font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                +{compResult.totalInterest.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Simple Interest */}
      {subTab === 'simple' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-sky-400" />
                <span>Intérêts Simples (I = C × r × t)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calcul des placements à court terme et crédits simples</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Capital initial (€)</label>
                <input
                  type="number"
                  value={simpCapital}
                  onChange={(e) => setSimpCapital(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Taux annuel (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={simpRate}
                  onChange={(e) => setSimpRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Durée (Années)</label>
                <input
                  type="number"
                  value={simpYears}
                  onChange={(e) => setSimpYears(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 space-y-2">
            <div>{simpResult.formula}</div>
            <div className="text-lg font-bold text-white">
              Montant total final : {simpResult.totalAmount.toFixed(2)} € (dont {simpResult.interest.toFixed(2)} € d'intérêts)
            </div>
          </div>
        </div>
      )}

      {/* 4. Commercial Margin */}
      {subTab === 'margin' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sky-400" />
                <span>Marges Commerciales & Taux de Marque</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calcul de rentabilité pour commerçants et gestionnaires</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Prix d'Achat HT (€)</label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Prix de Vente HT (€)</label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Taux de TVA (%)</label>
                <input
                  type="number"
                  value={marginVat}
                  onChange={(e) => setMarginVat(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Marge brute HT</div>
              <div className="text-xl font-mono font-bold text-white mt-1 tabular-nums">
                {marginResult.grossMargin.toFixed(2)} €
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Taux de marge</div>
              <div className="text-xl font-mono font-bold text-sky-400 mt-1 tabular-nums">
                {marginResult.marginRate.toFixed(1)} %
              </div>
              <div className="text-[10px] text-slate-500">(Marge / Coût d'achat)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Taux de marque</div>
              <div className="text-xl font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                {marginResult.markupRate.toFixed(1)} %
              </div>
              <div className="text-[10px] text-slate-500">(Marge / Prix de vente)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Prix TTC final</div>
              <div className="text-xl font-mono font-bold text-amber-400 mt-1 tabular-nums">
                {marginResult.priceWithTax?.toFixed(2)} €
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. VAT (TVA) */}
      {subTab === 'vat' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-sky-400" />
                  <span>Calcul de TVA & Prix HT ⟷ TTC</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Conversion immédiate hors taxes et toutes taxes comprises</p>
              </div>

              <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setVatMode('from_ht')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    vatMode === 'from_ht' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Départ HT ➔ TTC
                </button>
                <button
                  onClick={() => setVatMode('from_ttc')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    vatMode === 'from_ttc' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Départ TTC ➔ HT
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Montant de base ({vatMode === 'from_ht' ? 'Prix HT' : 'Prix TTC'}) (€)
                </label>
                <input
                  type="number"
                  value={vatAmount}
                  onChange={(e) => setVatAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Taux de TVA standard</label>
                <div className="flex items-center gap-1.5">
                  {[5.5, 10, 20].map((t) => (
                    <button
                      key={t}
                      onClick={() => setVatRate(t)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                        vatRate === t ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {t}%
                    </button>
                  ))}
                  <input
                    type="number"
                    step="0.1"
                    value={vatRate}
                    onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs text-center"
                    placeholder="Autre %"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Montant Hors Taxes (HT)</div>
              <div className="text-xl font-mono font-bold text-white mt-1 tabular-nums">
                {vatResult.ht.toFixed(2)} €
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Montant de la TVA ({vatRate}%)</div>
              <div className="text-xl font-mono font-bold text-amber-400 mt-1 tabular-nums">
                {vatResult.vat.toFixed(2)} €
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Montant TTC final</div>
              <div className="text-xl font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                {vatResult.ttc.toFixed(2)} €
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Currencies */}
      {subTab === 'currency' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-sky-400" />
                <span>Convertisseur de Devises Éducatif</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Taux de référence configurables avec devises internationales et régionales</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Montant à convertir</label>
                <input
                  type="number"
                  value={currAmount}
                  onChange={(e) => setCurrAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">De (Devise source)</label>
                <select
                  value={currFrom}
                  onChange={(e) => setCurrFrom(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vers (Devise cible)</label>
                <select
                  value={currTo}
                  onChange={(e) => setCurrTo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-slate-400">Résultat de la conversion</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                {currAmount.toLocaleString('fr-FR')} {currFrom} ={' '}
                <span className="text-sky-400">
                  {convertedCurr.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currTo}
                </span>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
              1 EUR ≈ {toRate} {currTo}
            </div>
          </div>
        </div>
      )}

      {/* 7. Épargne & Investissement programmé */}
      {subTab === 'savings' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-sky-400" />
                <span>Simulateur d'Épargne & Investissement Programmé</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Capital initial + versements mensuels réguliers avec intérêts composés capitalisés.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dépôt initial (€)</label>
                <input
                  type="number"
                  value={savInit}
                  onChange={(e) => setSavInit(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Versement mensuel (€)</label>
                <input
                  type="number"
                  value={savMonthly}
                  onChange={(e) => setSavMonthly(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rendement annuel (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={savRate}
                  onChange={(e) => setSavRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Durée (années)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={savYears}
                  onChange={(e) => setSavYears(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Capital final accumulé :</div>
              <div className="text-3xl font-mono font-bold text-sky-400">
                {savingsResult.finalBalance.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €
              </div>
              <div className="text-[11px] text-slate-500 font-mono">Valeur future totale (FV)</div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Total de vos versements :</div>
              <div className="text-3xl font-mono font-bold text-white">
                {savingsResult.totalInvested.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {savInit.toLocaleString('fr-FR')} € + ({savMonthly} € × {savYears * 12} mois)
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Plus-value & Intérêts gagnés :</div>
              <div className="text-3xl font-mono font-bold text-emerald-400">
                +{savingsResult.totalInterest.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Gain net ({((savingsResult.totalInterest / Math.max(1, savingsResult.totalInvested)) * 100).toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Remises commerciales simples ou cumulées */}
      {subTab === 'discount' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-sky-400" />
                <span>Calculateur de Remises Commerciales & Rabais</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calcul immédiat avec prise en charge d'une deuxième démarque (remises successives / soldes).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Prix initial (€)</label>
                <input
                  type="number"
                  value={discPrice}
                  onChange={(e) => setDiscPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Remise 1 (%)</label>
                <input
                  type="number"
                  value={discPct1}
                  onChange={(e) => setDiscPct1(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deuxième remise éventuelle (%)</label>
                <input
                  type="number"
                  value={discPct2}
                  onChange={(e) => setDiscPct2(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  placeholder="0 si aucune"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Prix final à payer :</div>
              <div className="text-3xl font-mono font-bold text-sky-400">
                {discountResult.finalPrice.toFixed(2)} €
              </div>
              <div className="text-xs font-mono text-slate-500">
                Économie totale : <strong>{discountResult.totalDiscountAmount.toFixed(2)} €</strong>
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Taux effectif de rabais :</div>
              <div className="text-3xl font-mono font-bold text-emerald-400">
                -{discountResult.effectiveDiscountRate.toFixed(2)} %
              </div>
              <div className="text-xs font-mono text-slate-500">
                {discPct2 > 0 ? `Non additionnable (${discPct1}% + ${discPct2}% ≠ ${discPct1 + discPct2}%)` : 'Remise unique'}
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Détail des étapes :</div>
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <div>Remise 1 ({discPct1}%) : -{discountResult.discountAmount1.toFixed(2)} €</div>
                {discPct2 > 0 && <div>Remise 2 ({discPct2}%) : -{discountResult.discountAmount2.toFixed(2)} €</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Commissions commerciales */}
      {subTab === 'commission' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-sky-400" />
                <span>Calculateur de Commissions sur Ventes</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calcul des commissions perçues par les commerciaux, courtiers ou affiliés.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Chiffre d'affaires / Ventes (€)</label>
                <input
                  type="number"
                  value={commRev}
                  onChange={(e) => setCommRev(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Taux de commission (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={commRate}
                  onChange={(e) => setCommRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Salaire fixe de base (€)</label>
                <input
                  type="number"
                  value={commBase}
                  onChange={(e) => setCommBase(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Montant de la commission :</div>
              <div className="text-3xl font-mono font-bold text-sky-400">
                {commissionResult.commissionAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-xs font-mono text-slate-500">
                {commRev.toLocaleString('fr-FR')} € × {commRate}%
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Rémunération totale brute :</div>
              <div className="text-3xl font-mono font-bold text-emerald-400">
                {commissionResult.totalEarnings.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-xs font-mono text-slate-500">
                Fixe ({commBase.toLocaleString('fr-FR')} €) + Commission
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Part variable :</div>
              <div className="text-3xl font-mono font-bold text-white">
                {commissionResult.totalEarnings > 0 ? ((commissionResult.commissionAmount / commissionResult.totalEarnings) * 100).toFixed(1) : 0} %
              </div>
              <div className="text-xs font-mono text-slate-500">Poids de la commission dans le total</div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Budget & Trésorerie */}
      {subTab === 'budget' && (
        <div className="space-y-6">
          {/* Règle 50/30/20 & Planification Mensuelle */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-400" />
                <span>Gestion de Budget & Règle 50 / 30 / 20</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Équilibrez vos finances : 50% Besoins essentiels, 30% Envies & loisirs, 20% Épargne & investissement
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Revenus nets mensuels (€)</label>
                <input
                  type="number"
                  value={budgetIncome}
                  onChange={(e) => setBudgetIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Besoins essentiels (€) (50%)</label>
                <input
                  type="number"
                  value={budgetNeeds}
                  onChange={(e) => setBudgetNeeds(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-500">Loyer, courses, factures, santé</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Envies & Loisirs (€) (30%)</label>
                <input
                  type="number"
                  value={budgetWants}
                  onChange={(e) => setBudgetWants(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-500">Sorties, shopping, vacances</span>
              </div>
            </div>

            {/* Visual Budget Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">Répartition réelle des revenus :</span>
                <span className="text-white font-bold">
                  Dépenses totales : {(budgetNeeds + budgetWants).toLocaleString('fr-FR')} € ({budgetIncome > 0 ? (((budgetNeeds + budgetWants) / budgetIncome) * 100).toFixed(1) : 0}%)
                </span>
              </div>
              <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                <div
                  style={{ width: `${Math.min(100, budgetIncome > 0 ? (budgetNeeds / budgetIncome) * 100 : 0)}%` }}
                  className="bg-sky-500 transition-all duration-300"
                  title="Besoins essentiels"
                />
                <div
                  style={{ width: `${Math.min(100 - (budgetIncome > 0 ? (budgetNeeds / budgetIncome) * 100 : 0), budgetIncome > 0 ? (budgetWants / budgetIncome) * 100 : 0)}%` }}
                  className="bg-amber-500 transition-all duration-300"
                  title="Envies & Loisirs"
                />
                <div
                  style={{ width: `${Math.max(0, 100 - (budgetIncome > 0 ? ((budgetNeeds + budgetWants) / budgetIncome) * 100 : 0))}%` }}
                  className="bg-emerald-500 transition-all duration-300"
                  title="Épargne disponible"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span> Besoins : {budgetIncome > 0 ? ((budgetNeeds / budgetIncome) * 100).toFixed(1) : 0}%</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Loisirs : {budgetIncome > 0 ? ((budgetWants / budgetIncome) * 100).toFixed(1) : 0}%</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Épargne : {budgetIncome > 0 ? Math.max(0, (100 - ((budgetNeeds + budgetWants) / budgetIncome) * 100)).toFixed(1) : 0}%</span>
              </div>
            </div>
          </div>

          {/* Budget Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Épargne mensuelle nette :</div>
              <div className={`text-3xl font-mono font-bold ${budgetIncome - (budgetNeeds + budgetWants) >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                {(budgetIncome - (budgetNeeds + budgetWants)).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-xs font-mono text-slate-500">
                {budgetIncome - (budgetNeeds + budgetWants) >= 0 ? 'Solde positif à épargner ou investir' : 'Attention : budget déficitaire'}
              </div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Objectif Idéal Épargne (20%) :</div>
              <div className="text-3xl font-mono font-bold text-sky-400">
                {(budgetIncome * 0.2).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-xs font-mono text-slate-500">Recommandé pour votre sécurité financière</div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Épargne annuelle projetée :</div>
              <div className="text-3xl font-mono font-bold text-purple-400">
                {(Math.max(0, budgetIncome - (budgetNeeds + budgetWants)) * 12).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
              <div className="text-xs font-mono text-slate-500">Sans compter les intérêts d'investissement</div>
            </div>
          </div>

          {/* Seuil de rentabilité (Point Mort) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <span>Simulateur de Point Mort & Seuil de Rentabilité</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculez le nombre d'unités et le chiffre d'affaires minimum pour couvrir l'ensemble des frais fixes
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Charges fixes totales (€)</label>
                <input
                  type="number"
                  value={breakEvenFixed}
                  onChange={(e) => setBreakEvenFixed(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Prix de vente unitaire (€)</label>
                <input
                  type="number"
                  value={breakEvenPrice}
                  onChange={(e) => setBreakEvenPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Coût variable unitaire (€)</label>
                <input
                  type="number"
                  value={breakEvenCost}
                  onChange={(e) => setBreakEvenCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {breakEvenPrice > breakEvenCost ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-xs text-slate-400">Nombre d'unités à vendre (Volume critique) :</span>
                  <div className="text-2xl font-mono font-bold text-amber-400">
                    {Math.ceil(breakEvenFixed / (breakEvenPrice - breakEvenCost)).toLocaleString('fr-FR')} unités
                  </div>
                  <span className="text-[11px] text-slate-500">Marge unitaire : {(breakEvenPrice - breakEvenCost).toFixed(2)} € / unité</span>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-xs text-slate-400">Chiffre d'affaires au seuil de rentabilité :</span>
                  <div className="text-2xl font-mono font-bold text-emerald-400">
                    {(Math.ceil(breakEvenFixed / (breakEvenPrice - breakEvenCost)) * breakEvenPrice).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </div>
                  <span className="text-[11px] text-slate-500">À partir de ce CA, chaque vente génère du bénéfice pur</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                Le prix de vente unitaire doit être strictement supérieur au coût variable unitaire pour dégager une marge.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
