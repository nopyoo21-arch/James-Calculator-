import { formatNumber } from './mathEngine';

export interface ResolutionStep {
  title: string;
  expression: string;
  explanation: string;
}

export interface LinearEquationResult {
  hasSolution: boolean;
  isIdentity: boolean;
  solution?: number;
  steps: ResolutionStep[];
}

export interface QuadraticEquationResult {
  a: number;
  b: number;
  c: number;
  delta: number;
  deltaSign: 'positive' | 'zero' | 'negative';
  roots: {
    x1: string;
    x2?: string;
  };
  vertex: { x: number; y: number };
  steps: ResolutionStep[];
}

export interface LinearSystemResult {
  hasUniqueSolution: boolean;
  isDependent: boolean; // Infinité de solutions
  isInconsistent: boolean; // Pas de solution
  x?: number;
  y?: number;
  detD: number;
  detDx: number;
  detDy: number;
  steps: ResolutionStep[];
}

// 1. Équation du 1er degré : a*x + b = c*x + d
export function solveLinearEquation(a: number, b: number, c: number = 0, d: number = 0): LinearEquationResult {
  const steps: ResolutionStep[] = [];
  const initialEq = `${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${c !== 0 ? c + 'x ' : ''}${d >= 0 && c !== 0 ? '+ ' + d : d}`;
  steps.push({
    title: '1. Équation de départ',
    expression: initialEq,
    explanation: 'Identification des termes en x et des constantes numériques.',
  });

  const effA = a - c;
  const effB = d - b;

  if (c !== 0 || b !== 0) {
    steps.push({
      title: '2. Regroupement des termes',
      expression: `(${a} - ${c})x = ${d} - (${b})  ⟹  ${effA}x = ${effB}`,
      explanation: 'On soustrait les termes en x à droite et les constantes à gauche pour isoler x.',
    });
  }

  if (Math.abs(effA) < 1e-12) {
    if (Math.abs(effB) < 1e-12) {
      steps.push({
        title: '3. Conclusion',
        expression: '0x = 0',
        explanation: 'Tout nombre réel x est solution (infinité de solutions, identité).',
      });
      return { hasSolution: true, isIdentity: true, steps };
    } else {
      steps.push({
        title: '3. Conclusion',
        expression: `0x = ${effB}`,
        explanation: 'Équation impossible : aucune valeur de x ne satisfait l’égalité.',
      });
      return { hasSolution: false, isIdentity: false, steps };
    }
  }

  const solution = effB / effA;
  steps.push({
    title: '3. Isolement de x',
    expression: `x = ${effB} / ${effA} = ${formatNumber(solution)}`,
    explanation: `On divise les deux membres par ${effA} pour obtenir la valeur finale.`,
  });

  return {
    hasSolution: true,
    isIdentity: false,
    solution,
    steps,
  };
}

// 2. Équation du 2nd degré : ax² + bx + c = 0
export function solveQuadraticEquation(a: number, b: number, c: number): QuadraticEquationResult {
  if (Math.abs(a) < 1e-12) {
    throw new Error('Le coefficient "a" ne peut pas être égal à 0 pour une équation du second degré.');
  }

  const steps: ResolutionStep[] = [];
  const eqStr = `${a}x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = 0`;

  steps.push({
    title: '1. Forme générale',
    expression: eqStr,
    explanation: `Coefficients identifiés : a = ${a}, b = ${b}, c = ${c}`,
  });

  // Discriminant Δ = b² - 4ac
  const delta = b * b - 4 * a * c;
  steps.push({
    title: '2. Calcul du discriminant (Δ)',
    expression: `Δ = b² - 4ac = (${b})² - 4 × (${a}) × (${c}) = ${b * b} - (${4 * a * c}) = ${delta}`,
    explanation: 'Le discriminant permet de déterminer la nature et le nombre de solutions.',
  });

  // Vertex
  const vx = -b / (2 * a);
  const vy = a * vx * vx + b * vx + c;

  let deltaSign: 'positive' | 'zero' | 'negative' = 'zero';
  let roots: { x1: string; x2?: string } = { x1: '' };

  if (delta > 1e-12) {
    deltaSign = 'positive';
    const sqrtDelta = Math.sqrt(delta);
    const x1Val = (-b - sqrtDelta) / (2 * a);
    const x2Val = (-b + sqrtDelta) / (2 * a);
    const x1Str = formatNumber(x1Val);
    const x2Str = formatNumber(x2Val);
    roots = { x1: x1Str, x2: x2Str };

    steps.push({
      title: '3. Deux racines réelles distinctes (Δ > 0)',
      expression: `x₁ = (-b - √Δ) / (2a) = (-(${b}) - √${delta}) / (2 × ${a}) = ${x1Str}\nx₂ = (-b + √Δ) / (2a) = (-(${b}) + √${delta}) / (2 × ${a}) = ${x2Str}`,
      explanation: 'Puisque le discriminant Δ est strictement positif, la parabole coupe l’axe des abscisses en deux points distincts.',
    });

    steps.push({
      title: '4. Forme factorisée',
      expression: `f(x) = ${a}(x - (${x1Str}))(x - (${x2Str}))`,
      explanation: 'La factorisation s’écrit a(x - x₁)(x - x₂).',
    });
  } else if (Math.abs(delta) <= 1e-12) {
    deltaSign = 'zero';
    const x0 = -b / (2 * a);
    const x0Str = formatNumber(x0);
    roots = { x1: x0Str };

    steps.push({
      title: '3. Racine double unique (Δ = 0)',
      expression: `x₀ = -b / (2a) = -(${b}) / (2 × ${a}) = ${x0Str}`,
      explanation: 'Le discriminant est nul : la parabole est tangente à l’axe des abscisses en un unique point.',
    });

    steps.push({
      title: '4. Forme factorisée',
      expression: `f(x) = ${a}(x - (${x0Str}))²`,
      explanation: 'La factorisation s’écrit a(x - x₀)².',
    });
  } else {
    deltaSign = 'negative';
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-delta) / (2 * Math.abs(a));
    const realStr = formatNumber(realPart);
    const imagStr = formatNumber(imagPart);
    roots = {
      x1: `${realStr} - ${imagStr} i`,
      x2: `${realStr} + ${imagStr} i`,
    };

    steps.push({
      title: '3. Deux racines complexes conjuguées (Δ < 0)',
      expression: `x₁ = (${-b} - i√${-delta}) / ${2 * a} = ${roots.x1}\nx₂ = (${-b} + i√${-delta}) / ${2 * a} = ${roots.x2}`,
      explanation: 'Le discriminant est strictement négatif : il n’y a aucune solution dans l’ensemble des réels ℝ, mais deux solutions conjuguées dans les complexes ℂ.',
    });
  }

  steps.push({
    title: 'Sommet de la parabole',
    expression: `S(${formatNumber(vx)} ; ${formatNumber(vy)})`,
    explanation: `Le sommet de la parabole est atteint en x = -b/(2a). La concavité est tournée vers ${a > 0 ? 'le haut (minimum)' : 'le bas (maximum)'}.`,
  });

  return {
    a,
    b,
    c,
    delta,
    deltaSign,
    roots,
    vertex: { x: vx, y: vy },
    steps,
  };
}

// 3. Résolution de systèmes linéaires 2x2 :
// a1*x + b1*y = c1
// a2*x + b2*y = c2
export function solveLinearSystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): LinearSystemResult {
  const steps: ResolutionStep[] = [];

  steps.push({
    title: '1. Système d’équations',
    expression: `(E1) : ${a1}x + ${b1}y = ${c1}\n(E2) : ${a2}x + ${b2}y = ${c2}`,
    explanation: 'Résolution par la méthode de Cramer (déterminants).',
  });

  // Déterminant principal D
  const detD = a1 * b2 - a2 * b1;
  steps.push({
    title: '2. Déterminant principal (D)',
    expression: `D = |${a1}  ${b1}|\n    |${a2}  ${b2}| = (${a1} × ${b2}) - (${a2} × ${b1}) = ${detD}`,
    explanation: 'Le déterminant D permet de vérifier si le système admet une solution unique.',
  });

  // Déterminants Dx et Dy
  const detDx = c1 * b2 - c2 * b1;
  const detDy = a1 * c2 - a2 * c1;

  steps.push({
    title: '3. Déterminants auxiliaires (Dx et Dy)',
    expression: `Dx = |${c1}  ${b1}| = (${c1} × ${b2}) - (${c2} × ${b1}) = ${detDx}\n     |${c2}  ${b2}|\n\nDy = |${a1}  ${c1}| = (${a1} × ${c2}) - (${a2} × ${c1}) = ${detDy}\n     |${a2}  ${c2}|`,
    explanation: 'On remplace respectivement la colonne des x puis celle des y par les constantes.',
  });

  if (Math.abs(detD) < 1e-12) {
    if (Math.abs(detDx) < 1e-12 && Math.abs(detDy) < 1e-12) {
      steps.push({
        title: '4. Conclusion',
        expression: 'D = 0 et Dx = Dy = 0',
        explanation: 'Les deux droites sont confondues : le système admet une infinité de solutions.',
      });
      return {
        hasUniqueSolution: false,
        isDependent: true,
        isInconsistent: false,
        detD,
        detDx,
        detDy,
        steps,
      };
    } else {
      steps.push({
        title: '4. Conclusion',
        expression: `D = 0 mais Dx ≠ 0 ou Dy ≠ 0`,
        explanation: 'Les deux droites sont strictement parallèles : le système n’a aucune solution (incompatible).',
      });
      return {
        hasUniqueSolution: false,
        isDependent: false,
        isInconsistent: true,
        detD,
        detDx,
        detDy,
        steps,
      };
    }
  }

  const x = detDx / detD;
  const y = detDy / detD;

  steps.push({
    title: '4. Calcul des solutions (Règle de Cramer)',
    expression: `x = Dx / D = ${detDx} / ${detD} = ${formatNumber(x)}\ny = Dy / D = ${detDy} / ${detD} = ${formatNumber(y)}`,
    explanation: 'Les deux droites se coupent en un point unique de coordonnées (x, y).',
  });

  return {
    hasUniqueSolution: true,
    isDependent: false,
    isInconsistent: false,
    x,
    y,
    detD,
    detDx,
    detDy,
    steps,
  };
}

// 4. Développements remarquables
export function expandExpression(type: 'sum_sq' | 'diff_sq' | 'diff_prod' | 'distrib', a: number, b: number): {
  formula: string;
  expanded: string;
  steps: string[];
} {
  if (type === 'sum_sq') {
    // (ax + b)² = a²x² + 2abx + b²
    const a2 = a * a;
    const ab2 = 2 * a * b;
    const b2 = b * b;
    return {
      formula: `(${a === 1 ? '' : a}x + ${b})²`,
      expanded: `${a2 === 1 ? '' : a2}x² ${ab2 >= 0 ? '+ ' + ab2 : '- ' + Math.abs(ab2)}x + ${b2}`,
      steps: [
        `Identité remarquable : (u + v)² = u² + 2uv + v²`,
        `Ici u = ${a}x et v = ${b}`,
        `u² = (${a}x)² = ${a2}x²`,
        `2uv = 2 × (${a}x) × (${b}) = ${ab2}x`,
        `v² = (${b})² = ${b2}`,
      ],
    };
  } else if (type === 'diff_sq') {
    // (ax - b)² = a²x² - 2abx + b²
    const a2 = a * a;
    const ab2 = 2 * a * b;
    const b2 = b * b;
    return {
      formula: `(${a === 1 ? '' : a}x - ${b})²`,
      expanded: `${a2 === 1 ? '' : a2}x² - ${ab2}x + ${b2}`,
      steps: [
        `Identité remarquable : (u - v)² = u² - 2uv + v²`,
        `Ici u = ${a}x et v = ${b}`,
        `u² = (${a}x)² = ${a2}x²`,
        `-2uv = -2 × (${a}x) × (${b}) = -${ab2}x`,
        `v² = (${b})² = ${b2}`,
      ],
    };
  } else if (type === 'diff_prod') {
    // (ax + b)(ax - b) = a²x² - b²
    const a2 = a * a;
    const b2 = b * b;
    return {
      formula: `(${a === 1 ? '' : a}x + ${b})(${a === 1 ? '' : a}x - ${b})`,
      expanded: `${a2 === 1 ? '' : a2}x² - ${b2}`,
      steps: [
        `Identité remarquable : (u + v)(u - v) = u² - v²`,
        `Ici u = ${a}x et v = ${b}`,
        `u² = (${a}x)² = ${a2}x²`,
        `v² = (${b})² = ${b2}`,
      ],
    };
  } else {
    // k(ax + b)
    const ka = a * b; // treating a as k, b as term
    return {
      formula: `${a}(x + ${b})`,
      expanded: `${a}x + ${a * b}`,
      steps: [
        `Distributivité simple : k(u + v) = ku + kv`,
        `Ici k = ${a}, u = x et v = ${b}`,
        `Résultat : ${a} × x + ${a} × ${b} = ${a}x + ${a * b}`,
      ],
    };
  }
}
