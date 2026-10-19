// Utilitaires de calcul sur les fractions avec explications pas à pas en français

export interface Fraction {
  num: number;
  den: number;
}

export interface FractionStepResult {
  result: Fraction;
  simplified: Fraction;
  decimal: number;
  mixedNumber?: { whole: number; num: number; den: number };
  steps: string[];
}

// Plus Grand Commun Diviseur (PGCD) via l'algorithme d'Euclide
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
}

// Plus Petit Commun Multiple (PPCM)
export function lcm(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

// Simplifier une fraction
export function simplifyFraction(f: Fraction): Fraction {
  if (f.den === 0) {
    throw new Error('Le dénominateur ne peut pas être nul');
  }
  const sign = (f.num < 0 && f.den > 0) || (f.num > 0 && f.den < 0) ? -1 : 1;
  const numAbs = Math.abs(Math.round(f.num));
  const denAbs = Math.abs(Math.round(f.den));
  const d = gcd(numAbs, denAbs);
  return {
    num: sign * (numAbs / d),
    den: denAbs / d,
  };
}

// Conversion nombre mixte -> fraction impropre : a + b/c = (a*c + b)/c
export function mixedToImproper(whole: number, num: number, den: number): Fraction {
  if (den === 0) throw new Error('Le dénominateur ne peut pas être nul');
  const sign = whole < 0 ? -1 : 1;
  const absWhole = Math.abs(whole);
  const improperNum = absWhole * Math.abs(den) + Math.abs(num);
  return simplifyFraction({ num: sign * improperNum, den: Math.abs(den) });
}

// Conversion fraction impropre -> nombre mixte
export function improperToMixed(f: Fraction): { whole: number; num: number; den: number } | undefined {
  const simp = simplifyFraction(f);
  if (Math.abs(simp.num) >= simp.den) {
    const whole = Math.trunc(simp.num / simp.den);
    const rem = Math.abs(simp.num % simp.den);
    return { whole, num: rem, den: simp.den };
  }
  return undefined;
}

// Convertir un nombre décimal en fraction (ex: 0.75 -> 3/4, 0.3333333 -> 1/3)
export function decimalToFraction(val: number): Fraction {
  if (Math.abs(val - Math.round(val)) < 1e-10) {
    return { num: Math.round(val), den: 1 };
  }
  // Algorithme des fractions continues pour une approximation rationnelle exacte
  const maxDen = 100000;
  let p0 = 0, q0 = 1;
  let p1 = 1, q1 = 0;
  let n = val;
  const sign = n < 0 ? -1 : 1;
  n = Math.abs(n);

  while (true) {
    const a = Math.floor(n);
    const p2 = a * p1 + p0;
    const q2 = a * q1 + q0;

    if (q2 > maxDen) break;

    p0 = p1; q0 = q1;
    p1 = p2; q1 = q2;

    const frac = n - a;
    if (Math.abs(frac) < 1e-9) break;
    n = 1 / frac;
  }

  return simplifyFraction({ num: sign * p1, den: q1 });
}

// Addition : a/b + c/d
export function addFractions(f1: Fraction, f2: Fraction): FractionStepResult {
  if (f1.den === 0 || f2.den === 0) throw new Error('Dénominateur nul interdit');
  const s1 = simplifyFraction(f1);
  const s2 = simplifyFraction(f2);
  const commonDen = lcm(s1.den, s2.den);
  const m1 = commonDen / s1.den;
  const m2 = commonDen / s2.den;
  const newNum1 = s1.num * m1;
  const newNum2 = s2.num * m2;
  const sumNum = newNum1 + newNum2;

  const rawRes = { num: sumNum, den: commonDen };
  const simplified = simplifyFraction(rawRes);
  const steps = [
    `1. Fractions d'origine : (${s1.num}/${s1.den}) + (${s2.num}/${s2.den})`,
    `2. Dénominateur commun (PPCM de ${s1.den} et ${s2.den}) = ${commonDen}`,
    `3. Mise au même dénominateur : (${s1.num} × ${m1}) / ${commonDen} + (${s2.num} × ${m2}) / ${commonDen} = ${newNum1}/${commonDen} + ${newNum2}/${commonDen}`,
    `4. Addition des numérateurs : (${newNum1} + ${newNum2}) / ${commonDen} = ${sumNum}/${commonDen}`,
  ];

  if (rawRes.num !== simplified.num || rawRes.den !== simplified.den) {
    const d = gcd(rawRes.num, rawRes.den);
    steps.push(`5. Simplification par le PGCD (${d}) : ${simplified.num}/${simplified.den}`);
  }

  return {
    result: rawRes,
    simplified,
    decimal: simplified.num / simplified.den,
    mixedNumber: improperToMixed(simplified),
    steps,
  };
}

// Soustraction : a/b - c/d
export function subtractFractions(f1: Fraction, f2: Fraction): FractionStepResult {
  return addFractions(f1, { num: -f2.num, den: f2.den });
}

// Multiplication : a/b * c/d
export function multiplyFractions(f1: Fraction, f2: Fraction): FractionStepResult {
  if (f1.den === 0 || f2.den === 0) throw new Error('Dénominateur nul interdit');
  const s1 = simplifyFraction(f1);
  const s2 = simplifyFraction(f2);
  const rawNum = s1.num * s2.num;
  const rawDen = s1.den * s2.den;
  const rawRes = { num: rawNum, den: rawDen };
  const simplified = simplifyFraction(rawRes);

  const steps = [
    `1. Règle de multiplication : (a/b) × (c/d) = (a × c) / (b × d)`,
    `2. Produit des numérateurs : ${s1.num} × ${s2.num} = ${rawNum}`,
    `3. Produit des dénominateurs : ${s1.den} × ${s2.den} = ${rawDen}`,
    `4. Fraction obtenue : ${rawNum}/${rawDen}`,
  ];

  if (rawRes.num !== simplified.num || rawRes.den !== simplified.den) {
    const d = gcd(rawRes.num, rawRes.den);
    steps.push(`5. Simplification par le PGCD (${d}) : ${simplified.num}/${simplified.den}`);
  }

  return {
    result: rawRes,
    simplified,
    decimal: simplified.num / simplified.den,
    mixedNumber: improperToMixed(simplified),
    steps,
  };
}

// Division : a/b / (c/d) = a/b * d/c
export function divideFractions(f1: Fraction, f2: Fraction): FractionStepResult {
  if (f1.den === 0 || f2.den === 0) throw new Error('Dénominateur nul interdit');
  if (f2.num === 0) throw new Error('Division par une fraction nulle impossible');
  const invF2 = { num: f2.den, den: f2.num };
  const res = multiplyFractions(f1, invF2);
  res.steps.unshift(`1. Diviser par une fraction revient à multiplier par son inverse : (${f1.num}/${f1.den}) ÷ (${f2.num}/${f2.den}) = (${f1.num}/${f1.den}) × (${f2.den}/${f2.num})`);
  return res;
}

// Comparaison de deux fractions
export function compareFractions(f1: Fraction, f2: Fraction): {
  comparison: 'greater' | 'less' | 'equal';
  symbol: '>' | '<' | '=';
  explanation: string;
} {
  const s1 = simplifyFraction(f1);
  const s2 = simplifyFraction(f2);
  const cross1 = s1.num * s2.den;
  const cross2 = s2.num * s1.den;

  if (cross1 > cross2) {
    return {
      comparison: 'greater',
      symbol: '>',
      explanation: `${s1.num}/${s1.den} > ${s2.num}/${s2.den} car le produit en croix (${s1.num} × ${s2.den} = ${cross1}) est supérieur à (${s2.num} × ${s1.den} = ${cross2}).`,
    };
  } else if (cross1 < cross2) {
    return {
      comparison: 'less',
      symbol: '<',
      explanation: `${s1.num}/${s1.den} < ${s2.num}/${s2.den} car le produit en croix (${s1.num} × ${s2.den} = ${cross1}) est inférieur à (${s2.num} × ${s1.den} = ${cross2}).`,
    };
  } else {
    return {
      comparison: 'equal',
      symbol: '=',
      explanation: `${s1.num}/${s1.den} = ${s2.num}/${s2.den} (fractions équivalentes).`,
    };
  }
}
