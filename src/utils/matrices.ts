// Calculs matriciels 2x2 et 3x3 avec étapes détaillées

export type Matrix = number[][];

export interface MatrixOperationResult {
  result: Matrix;
  steps: string[];
}

export interface MatrixProperties {
  determinant: number;
  trace: number;
  transpose: Matrix;
  inverse?: Matrix;
  isInvertible: boolean;
  steps: string[];
}

// Addition : A + B
export function addMatrices(A: Matrix, B: Matrix): MatrixOperationResult {
  const rows = A.length;
  const cols = A[0].length;
  const res: Matrix = [];
  const steps: string[] = ['1. On additionne les coefficients terme à terme : (A + B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ'];

  for (let i = 0; i < rows; i++) {
    res[i] = [];
    for (let j = 0; j < cols; j++) {
      res[i][j] = A[i][j] + B[i][j];
      steps.push(`Ligne ${i + 1}, Colonne ${j + 1} : ${A[i][j]} + (${B[i][j]}) = ${res[i][j]}`);
    }
  }

  return { result: res, steps };
}

// Soustraction : A - B
export function subtractMatrices(A: Matrix, B: Matrix): MatrixOperationResult {
  const rows = A.length;
  const cols = A[0].length;
  const res: Matrix = [];
  const steps: string[] = ['1. On soustrait les coefficients terme à terme : (A - B)ᵢⱼ = Aᵢⱼ - Bᵢⱼ'];

  for (let i = 0; i < rows; i++) {
    res[i] = [];
    for (let j = 0; j < cols; j++) {
      res[i][j] = A[i][j] - B[i][j];
      steps.push(`Ligne ${i + 1}, Colonne ${j + 1} : ${A[i][j]} - (${B[i][j]}) = ${res[i][j]}`);
    }
  }

  return { result: res, steps };
}

// Multiplication : A * B
export function multiplyMatrices(A: Matrix, B: Matrix): MatrixOperationResult {
  const rA = A.length;
  const cA = A[0].length;
  const rB = B.length;
  const cB = B[0].length;

  if (cA !== rB) {
    throw new Error(`Multiplication impossible : le nombre de colonnes de A (${cA}) ne correspond pas au nombre de lignes de B (${rB}).`);
  }

  const res: Matrix = [];
  const steps: string[] = ['1. Règle du produit ligne par colonne : Cᵢⱼ = ∑ (Aᵢₖ × Bₖⱼ)'];

  for (let i = 0; i < rA; i++) {
    res[i] = [];
    for (let j = 0; j < cB; j++) {
      let sum = 0;
      const terms: string[] = [];
      for (let k = 0; k < cA; k++) {
        sum += A[i][k] * B[k][j];
        terms.push(`(${A[i][k]} × ${B[k][j]})`);
      }
      res[i][j] = sum;
      steps.push(`Position (${i + 1}, ${j + 1}) : ${terms.join(' + ')} = ${sum}`);
    }
  }

  return { result: res, steps };
}

// Multiplication par un scalaire k * A
export function scaleMatrix(A: Matrix, k: number): MatrixOperationResult {
  const rows = A.length;
  const cols = A[0].length;
  const res: Matrix = [];
  const steps: string[] = [`Multiplication de chaque élément par le scalaire k = ${k} :`];

  for (let i = 0; i < rows; i++) {
    res[i] = [];
    for (let j = 0; j < cols; j++) {
      res[i][j] = A[i][j] * k;
    }
  }

  return { result: res, steps };
}

// Transposée
export function transposeMatrix(A: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const res: Matrix = [];
  for (let j = 0; j < cols; j++) {
    res[j] = [];
    for (let i = 0; i < rows; i++) {
      res[j][i] = A[i][j];
    }
  }
  return res;
}

// Trace (somme des éléments diagonaux)
export function traceMatrix(A: Matrix): number {
  let tr = 0;
  const n = Math.min(A.length, A[0].length);
  for (let i = 0; i < n; i++) {
    tr += A[i][i];
  }
  return tr;
}

// Propriétés et inverse pour 2x2 et 3x3
export function analyzeSquareMatrix(A: Matrix): MatrixProperties {
  const n = A.length;
  if (n !== A[0].length) {
    throw new Error('La matrice doit être carrée pour calculer le déterminant et l’inverse.');
  }

  const transpose = transposeMatrix(A);
  const trace = traceMatrix(A);
  const steps: string[] = [];

  if (n === 2) {
    // det(A) = a11*a22 - a12*a21
    const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
    steps.push(`1. Calcul du déterminant 2×2 :`);
    steps.push(`det(A) = (${A[0][0]} × ${A[1][1]}) - (${A[0][1]} × ${A[1][0]}) = ${A[0][0] * A[1][1]} - ${A[0][1] * A[1][0]} = ${det}`);

    const isInvertible = Math.abs(det) > 1e-12;
    let inverse: Matrix | undefined = undefined;

    if (isInvertible) {
      // A^-1 = (1/det) * [[a22, -a12], [-a21, a11]]
      inverse = [
        [A[1][1] / det, -A[0][1] / det],
        [-A[1][0] / det, A[0][0] / det],
      ];
      steps.push(`2. Matrice inversible (det ≠ 0). Formule de l'inverse :`);
      steps.push(`A⁻¹ = (1 / ${det}) × [[${A[1][1]}, ${-A[0][1]}], [${-A[1][0]}, ${A[0][0]}]]`);
    } else {
      steps.push(`2. Le déterminant est nul (det = 0) : la matrice n'est pas inversible.`);
    }

    return { determinant: det, trace, transpose, inverse, isInvertible, steps };
  } else if (n === 3) {
    // Règle de Sarrus pour 3x3
    const a = A[0][0], b = A[0][1], c = A[0][2];
    const d = A[1][0], e = A[1][1], f = A[1][2];
    const g = A[2][0], h = A[2][1], i = A[2][2];

    const pos = a * e * i + b * f * g + c * d * h;
    const neg = c * e * g + a * f * h + b * d * i;
    const det = pos - neg;

    steps.push(`1. Calcul du déterminant 3×3 par la règle de Sarrus :`);
    steps.push(`Termes positifs : (${a}×${e}×${i}) + (${b}×${f}×${g}) + (${c}×${d}×${h}) = ${pos}`);
    steps.push(`Termes négatifs : (${c}×${e}×${g}) + (${a}×${f}×${h}) + (${b}×${d}×${i}) = ${neg}`);
    steps.push(`det(A) = ${pos} - (${neg}) = ${det}`);

    const isInvertible = Math.abs(det) > 1e-12;
    let inverse: Matrix | undefined = undefined;

    if (isInvertible) {
      // Comatrice transposée
      const c11 = (e * i - f * h);
      const c12 = -(d * i - f * g);
      const c13 = (d * h - e * g);

      const c21 = -(b * i - c * h);
      const c22 = (a * i - c * g);
      const c23 = -(a * h - b * g);

      const c31 = (b * f - c * e);
      const c32 = -(a * f - c * d);
      const c33 = (a * e - b * d);

      // Transpose of cofactor matrix (adjugate)
      inverse = [
        [c11 / det, c21 / det, c31 / det],
        [c12 / det, c22 / det, c32 / det],
        [c13 / det, c23 / det, c33 / det],
      ];
      steps.push(`2. Matrice inversible (det = ${det} ≠ 0). Calcul de la comatrice et de la transposée adjointe.`);
    } else {
      steps.push(`2. Le déterminant est nul (det = 0) : la matrice n'est pas inversible.`);
    }

    return { determinant: det, trace, transpose, inverse, isInvertible, steps };
  } else {
    throw new Error('Seules les dimensions 2×2 et 3×3 sont prises en charge actuellement.');
  }
}
