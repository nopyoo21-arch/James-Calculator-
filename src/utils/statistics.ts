import { combinations, factorial } from './mathEngine';

export interface DescriptiveStats {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
  variancePopulation: number;
  varianceSample: number;
  stdDevPopulation: number;
  stdDevSample: number;
  q1: number;
  q3: number;
  iqr: number;
  frequencyTable: { value: number; count: number; percentage: number; cumulativePct: number }[];
}

export interface LinearRegressionResult {
  n: number;
  slope: number; // a
  intercept: number; // b
  correlationR: number; // r
  rSquared: number; // r²
  equation: string;
  covariance: number;
}

// Parse text string into numbers (supports space, comma, semicolon, newline)
export function parseDataSet(input: string): number[] {
  return input
    .replace(/;/g, ' ')
    .replace(/,/g, ' ')
    .trim()
    .split(/\s+/)
    .map(Number)
    .filter((n) => !isNaN(n) && Number.isFinite(n));
}

// Compute comprehensive descriptive statistics
export function calculateDescriptiveStats(data: number[]): DescriptiveStats {
  if (data.length === 0) {
    throw new Error('Veuillez saisir au moins une valeur numérique.');
  }

  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  // Min, Max, Range
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  // Median
  let median = 0;
  const mid = Math.floor(n / 2);
  if (n % 2 !== 0) {
    median = sorted[mid];
  } else {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Quartiles (Tukey method)
  const getMedianOfSub = (arr: number[]) => {
    if (arr.length === 0) return 0;
    const m = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? arr[m] : (arr[m - 1] + arr[m]) / 2;
  };
  const lowerHalf = n % 2 === 0 ? sorted.slice(0, mid) : sorted.slice(0, mid);
  const upperHalf = n % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
  const q1 = getMedianOfSub(lowerHalf);
  const q3 = getMedianOfSub(upperHalf);
  const iqr = q3 - q1;

  // Frequencies and Modes
  const freqMap = new Map<number, number>();
  for (const v of sorted) {
    freqMap.set(v, (freqMap.get(v) || 0) + 1);
  }
  let maxFreq = 0;
  for (const count of freqMap.values()) {
    if (count > maxFreq) maxFreq = count;
  }
  const modes: number[] = [];
  if (maxFreq > 1) {
    for (const [val, count] of freqMap.entries()) {
      if (count === maxFreq) modes.push(val);
    }
  }

  // Frequency table
  const frequencyTable: DescriptiveStats['frequencyTable'] = [];
  let cumCount = 0;
  for (const [val, count] of freqMap.entries()) {
    cumCount += count;
    frequencyTable.push({
      value: val,
      count,
      percentage: (count / n) * 100,
      cumulativePct: (cumCount / n) * 100,
    });
  }

  // Variances & Std Deviations
  const sumSqDiff = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  const variancePopulation = sumSqDiff / n;
  const varianceSample = n > 1 ? sumSqDiff / (n - 1) : 0;
  const stdDevPopulation = Math.sqrt(variancePopulation);
  const stdDevSample = Math.sqrt(varianceSample);

  return {
    count: n,
    sum,
    mean,
    median,
    modes,
    min,
    max,
    range,
    variancePopulation,
    varianceSample,
    stdDevPopulation,
    stdDevSample,
    q1,
    q3,
    iqr,
    frequencyTable,
  };
}

// Régression linéaire simple (Moindres carrés ordinaires)
export function calculateLinearRegression(points: { x: number; y: number }[]): LinearRegressionResult {
  const n = points.length;
  if (n < 2) throw new Error('Au moins deux points sont requis pour une régression linéaire.');

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumX2 += p.x * p.x;
    sumY2 += p.y * p.y;
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  const numerator = sumXY - n * meanX * meanY;
  const denomX = sumX2 - n * meanX * meanX;
  const denomY = sumY2 - n * meanY * meanY;

  if (Math.abs(denomX) < 1e-12) {
    throw new Error('Les points forment une droite verticale : la pente est infinie.');
  }

  const slope = numerator / denomX;
  const intercept = meanY - slope * meanX;

  const denomR = Math.sqrt(denomX * denomY);
  const correlationR = denomR > 1e-12 ? numerator / denomR : 0;
  const rSquared = correlationR * correlationR;
  const covariance = numerator / (n - 1);

  const sign = intercept >= 0 ? '+' : '-';
  const equation = `y = ${slope.toFixed(4)}x ${sign} ${Math.abs(intercept).toFixed(4)}`;

  return {
    n,
    slope,
    intercept,
    correlationR,
    rSquared,
    equation,
    covariance,
  };
}

// Loi binomiale B(n, p)
export function binomialProbability(n: number, p: number, k: number): {
  probExact: number;
  probAtMost: number;
  probAtLeast: number;
  expectedValue: number;
  variance: number;
} {
  if (p < 0 || p > 1) throw new Error('La probabilité p doit être comprise entre 0 et 1.');
  if (k < 0 || k > n || Math.floor(k) !== k || Math.floor(n) !== n) {
    throw new Error('k et n doivent être des entiers avec 0 ≤ k ≤ n.');
  }

  // P(X = k) = C(n, k) * p^k * (1-p)^(n-k)
  const calcP = (x: number) => combinations(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
  const probExact = calcP(k);

  let probAtMost = 0;
  for (let i = 0; i <= k; i++) {
    probAtMost += calcP(i);
  }

  const probAtLeast = 1 - probAtMost + probExact;
  const expectedValue = n * p;
  const variance = n * p * (1 - p);

  return {
    probExact,
    probAtMost,
    probAtLeast,
    expectedValue,
    variance,
  };
}
