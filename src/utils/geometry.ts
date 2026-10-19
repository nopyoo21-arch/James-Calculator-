// Calculateur de géométrie 2D & 3D avec formules et étapes

export interface Geometry2DResult {
  shape: string;
  area: number;
  perimeter: number;
  formulaArea: string;
  formulaPerimeter: string;
  details?: Record<string, number | string>;
}

export interface Geometry3DResult {
  solid: string;
  volume: number;
  surfaceArea: number;
  lateralArea?: number;
  formulaVolume: string;
  formulaSurface: string;
}

export interface PythagorasResult {
  hypotenuse: number;
  legA: number;
  legB: number;
  missingSide: 'hypotenuse' | 'leg';
  steps: string[];
}

// 2D Shapes
export function calculateSquare(side: number): Geometry2DResult {
  return {
    shape: 'Carré',
    area: side * side,
    perimeter: 4 * side,
    formulaArea: `Aire = c² = ${side}² = ${side * side}`,
    formulaPerimeter: `Périmètre = 4 × c = 4 × ${side} = ${4 * side}`,
    details: { Diagonale: (side * Math.SQRT2).toFixed(4) },
  };
}

export function calculateRectangle(length: number, width: number): Geometry2DResult {
  return {
    shape: 'Rectangle',
    area: length * width,
    perimeter: 2 * (length + width),
    formulaArea: `Aire = L × l = ${length} × ${width} = ${length * width}`,
    formulaPerimeter: `Périmètre = 2 × (L + l) = 2 × (${length} + ${width}) = ${2 * (length + width)}`,
    details: { Diagonale: Math.hypot(length, width).toFixed(4) },
  };
}

export function calculateTriangle(base: number, height: number, a?: number, c?: number): Geometry2DResult {
  const area = (base * height) / 2;
  const sideA = a ?? base;
  const sideC = c ?? Math.hypot(base / 2, height);
  const perimeter = base + sideA + sideC;
  return {
    shape: 'Triangle',
    area,
    perimeter,
    formulaArea: `Aire = (base × hauteur) / 2 = (${base} × ${height}) / 2 = ${area}`,
    formulaPerimeter: `Périmètre = a + b + c = ${sideA} + ${base} + ${sideC} = ${perimeter}`,
  };
}

export function calculateCircle(radius: number): Geometry2DResult {
  return {
    shape: 'Cercle',
    area: Math.PI * radius * radius,
    perimeter: 2 * Math.PI * radius,
    formulaArea: `Aire = π × r² = π × ${radius}² ≈ ${(Math.PI * radius * radius).toFixed(4)}`,
    formulaPerimeter: `Circonférence = 2 × π × r = 2 × π × ${radius} ≈ ${(2 * Math.PI * radius).toFixed(4)}`,
    details: { Diamètre: (2 * radius).toFixed(4) },
  };
}

export function calculateTrapezoid(baseLarge: number, baseSmall: number, height: number, sideLeft?: number, sideRight?: number): Geometry2DResult {
  const area = ((baseLarge + baseSmall) * height) / 2;
  const left = sideLeft ?? height;
  const right = sideRight ?? height;
  return {
    shape: 'Trapèze',
    area,
    perimeter: baseLarge + baseSmall + left + right,
    formulaArea: `Aire = ((B + b) × h) / 2 = ((${baseLarge} + ${baseSmall}) × ${height}) / 2 = ${area}`,
    formulaPerimeter: `Périmètre = B + b + c + d = ${baseLarge} + ${baseSmall} + ${left} + ${right} = ${baseLarge + baseSmall + left + right}`,
  };
}

// 3D Solids
export function calculateCube(edge: number): Geometry3DResult {
  return {
    solid: 'Cube',
    volume: Math.pow(edge, 3),
    surfaceArea: 6 * edge * edge,
    formulaVolume: `Volume = a³ = ${edge}³ = ${Math.pow(edge, 3)}`,
    formulaSurface: `Surface = 6 × a² = 6 × ${edge}² = ${6 * edge * edge}`,
  };
}

export function calculateCylinder(radius: number, height: number): Geometry3DResult {
  const volume = Math.PI * radius * radius * height;
  const lateralArea = 2 * Math.PI * radius * height;
  const surfaceArea = 2 * Math.PI * radius * radius + lateralArea;
  return {
    solid: 'Cylindre',
    volume,
    surfaceArea,
    lateralArea,
    formulaVolume: `Volume = π × r² × h = π × ${radius}² × ${height} ≈ ${volume.toFixed(4)}`,
    formulaSurface: `Surface = 2πr(r + h) = 2π × ${radius} × (${radius} + ${height}) ≈ ${surfaceArea.toFixed(4)}`,
  };
}

export function calculateSphere(radius: number): Geometry3DResult {
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  const surfaceArea = 4 * Math.PI * radius * radius;
  return {
    solid: 'Sphère',
    volume,
    surfaceArea,
    formulaVolume: `Volume = (4/3) × π × r³ = (4/3) × π × ${radius}³ ≈ ${volume.toFixed(4)}`,
    formulaSurface: `Surface = 4 × π × r² = 4 × π × ${radius}² ≈ ${surfaceArea.toFixed(4)}`,
  };
}

export function calculateCone(radius: number, height: number): Geometry3DResult {
  const slantHeight = Math.hypot(radius, height);
  const volume = (1 / 3) * Math.PI * radius * radius * height;
  const lateralArea = Math.PI * radius * slantHeight;
  const surfaceArea = Math.PI * radius * (radius + slantHeight);
  return {
    solid: 'Cône',
    volume,
    surfaceArea,
    lateralArea,
    formulaVolume: `Volume = (1/3) × π × r² × h ≈ ${volume.toFixed(4)}`,
    formulaSurface: `Surface = π × r × (r + s) (avec apothème s = ${slantHeight.toFixed(4)}) ≈ ${surfaceArea.toFixed(4)}`,
  };
}

// Théorème de Pythagore
export function solvePythagoras(a?: number, b?: number, c?: number): PythagorasResult {
  if (c !== undefined && a !== undefined) {
    if (c <= a) throw new Error("L'hypoténuse c doit être strictement supérieure au côté a.");
    const calculatedB = Math.sqrt(c * c - a * a);
    return {
      hypotenuse: c,
      legA: a,
      legB: calculatedB,
      missingSide: 'leg',
      steps: [
        `1. D'après le théorème de Pythagore dans un triangle rectangle : a² + b² = c²`,
        `2. On isole le côté manquant : b² = c² - a²`,
        `3. Remplacement numérique : b² = (${c})² - (${a})² = ${c * c} - ${a * a} = ${c * c - a * a}`,
        `4. Extraction de la racine : b = √${c * c - a * a} = ${calculatedB.toFixed(4)}`,
      ],
    };
  } else if (a !== undefined && b !== undefined) {
    const calculatedC = Math.hypot(a, b);
    return {
      hypotenuse: calculatedC,
      legA: a,
      legB: b,
      missingSide: 'hypotenuse',
      steps: [
        `1. D'après le théorème de Pythagore dans un triangle rectangle : c² = a² + b²`,
        `2. Remplacement numérique : c² = (${a})² + (${b})² = ${a * a} + ${b * b} = ${a * a + b * b}`,
        `3. Extraction de la racine : c = √${a * a + b * b} = ${calculatedC.toFixed(4)}`,
      ],
    };
  } else {
    throw new Error('Veuillez fournir au moins deux côtés pour appliquer le théorème de Pythagore.');
  }
}

// Distance entre 2 points cartésiens
export function calculateDistance2D(x1: number, y1: number, x2: number, y2: number): {
  distance: number;
  dx: number;
  dy: number;
  steps: string[];
} {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  return {
    distance: dist,
    dx,
    dy,
    steps: [
      `Formule : d = √((x₂ - x₁)² + (y₂ - y₁)²)`,
      `Δx = ${x2} - (${x1}) = ${dx} ⟹ (Δx)² = ${dx * dx}`,
      `Δy = ${y2} - (${y1}) = ${dy} ⟹ (Δy)² = ${dy * dy}`,
      `d = √(${dx * dx} + ${dy * dy}) = √${dx * dx + dy * dy} ≈ ${dist.toFixed(4)}`,
    ],
  };
}

// Pavé droit (Parallélépipède rectangle)
export function calculateCuboid(length: number, width: number, height: number): Geometry3DResult {
  const volume = length * width * height;
  const surfaceArea = 2 * (length * width + length * height + width * height);
  const lateralArea = 2 * height * (length + width);
  const diagonal = Math.hypot(length, width, height);

  return {
    solid: 'Pavé Droit (Parallélépipède)',
    volume,
    surfaceArea,
    lateralArea,
    formulaVolume: `Volume = L × l × h = ${length} × ${width} × ${height} = ${volume}`,
    formulaSurface: `Surface = 2(Ll + Lh + lh) = 2(${length * width} + ${length * height} + ${width * height}) = ${surfaceArea}`,
  };
}

// Calculs sur les angles
export interface AngleCalculations {
  degrees: number;
  radians: number;
  grades: number;
  complementary?: number; // 90 - deg si 0 <= deg <= 90
  supplementary?: number; // 180 - deg si 0 <= deg <= 180
  sin: number;
  cos: number;
  tan: number | null;
}

export function calculateAngles(deg: number): AngleCalculations {
  const rad = (deg * Math.PI) / 180;
  const grad = (deg * 200) / 180;
  const complementary = deg >= 0 && deg <= 90 ? 90 - deg : undefined;
  const supplementary = deg >= 0 && deg <= 180 ? 180 - deg : undefined;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.abs(cos) < 1e-12 ? null : Math.tan(rad);

  return {
    degrees: deg,
    radians: rad,
    grades: grad,
    complementary,
    supplementary,
    sin,
    cos,
    tan,
  };
}
