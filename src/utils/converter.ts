// Convertisseur universel d'unités avec taux physiques officiels

export type UnitCategory =
  | 'length'
  | 'area'
  | 'mass'
  | 'temperature'
  | 'time'
  | 'volume'
  | 'speed'
  | 'digital'
  | 'pressure'
  | 'energy'
  | 'currency';

export interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

export interface CategoryDef {
  id: UnitCategory;
  name: string;
  baseUnit: string;
  units: UnitDef[];
}

export const UNIT_CATEGORIES: CategoryDef[] = [
  {
    id: 'length',
    name: 'Longueurs',
    baseUnit: 'm',
    units: [
      { id: 'mm', name: 'Millimètre', symbol: 'mm', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 'cm', name: 'Centimètre', symbol: 'cm', toBase: (v) => v * 0.01, fromBase: (v) => v / 0.01 },
      { id: 'dm', name: 'Décimètre', symbol: 'dm', toBase: (v) => v * 0.1, fromBase: (v) => v / 0.1 },
      { id: 'm', name: 'Mètre', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', name: 'Kilomètre', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'in', name: 'Pouce (Inch)', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: 'ft', name: 'Pied (Foot)', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'yd', name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'mi', name: 'Mille terrestre (Mile)', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: 'nmi', name: 'Mille marin (Nautique)', symbol: 'NM', toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    ],
  },
  {
    id: 'area',
    name: 'Aires & Superficies',
    baseUnit: 'm²',
    units: [
      { id: 'mm2', name: 'Millimètre carré', symbol: 'mm²', toBase: (v) => v * 1e-6, fromBase: (v) => v / 1e-6 },
      { id: 'cm2', name: 'Centimètre carré', symbol: 'cm²', toBase: (v) => v * 1e-4, fromBase: (v) => v / 1e-4 },
      { id: 'dm2', name: 'Décimètre carré', symbol: 'dm²', toBase: (v) => v * 0.01, fromBase: (v) => v / 0.01 },
      { id: 'm2', name: 'Mètre carré', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      { id: 'are', name: 'Are', symbol: 'a', toBase: (v) => v * 100, fromBase: (v) => v / 100 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      { id: 'km2', name: 'Kilomètre carré', symbol: 'km²', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: 'ft2', name: 'Pied carré (sq ft)', symbol: 'sq ft', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: 'yd2', name: 'Yard carré (sq yd)', symbol: 'sq yd', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      { id: 'acre', name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.856422, fromBase: (v) => v / 4046.856422 },
    ],
  },
  {
    id: 'mass',
    name: 'Masses',
    baseUnit: 'g',
    units: [
      { id: 'mg', name: 'Milligramme', symbol: 'mg', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 'g', name: 'Gramme', symbol: 'g', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kg', name: 'Kilogramme', symbol: 'kg', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 't', name: 'Tonne métrique', symbol: 't', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: 'lb', name: 'Livre (Pound)', symbol: 'lb', toBase: (v) => v * 453.59237, fromBase: (v) => v / 453.59237 },
      { id: 'oz', name: 'Once (Ounce)', symbol: 'oz', toBase: (v) => v * 28.349523, fromBase: (v) => v / 28.349523 },
      { id: 'ct', name: 'Carat', symbol: 'ct', toBase: (v) => v * 0.2, fromBase: (v) => v / 0.2 },
    ],
  },
  {
    id: 'temperature',
    name: 'Températures',
    baseUnit: 'C',
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { id: 'K', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    id: 'time',
    name: 'Temps',
    baseUnit: 's',
    units: [
      { id: 'ms', name: 'Milliseconde', symbol: 'ms', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 's', name: 'Seconde', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
      { id: 'min', name: 'Minute', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: 'h', name: 'Heure', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'd', name: 'Jour', symbol: 'j', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: 'wk', name: 'Semaine', symbol: 'sem', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: 'yr', name: 'Année (365.25 j)', symbol: 'an', toBase: (v) => v * 31557600, fromBase: (v) => v / 31557600 },
    ],
  },
  {
    id: 'volume',
    name: 'Volumes',
    baseUnit: 'L',
    units: [
      { id: 'mL', name: 'Millilitre (cm³)', symbol: 'mL', toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: 'cL', name: 'Centilitre', symbol: 'cL', toBase: (v) => v * 0.01, fromBase: (v) => v / 0.01 },
      { id: 'L', name: 'Litre (dm³)', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      { id: 'm3', name: 'Mètre cube', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'gal_us', name: 'Gallon américain (US)', symbol: 'gal US', toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      { id: 'gal_imp', name: 'Gallon impérial (UK)', symbol: 'gal Imp', toBase: (v) => v * 4.54609, fromBase: (v) => v / 4.54609 },
      { id: 'floz_us', name: 'Once liquide US', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    ],
  },
  {
    id: 'speed',
    name: 'Vitesses',
    baseUnit: 'mps',
    units: [
      { id: 'mps', name: 'Mètres par seconde', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kmh', name: 'Kilomètres par heure', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'mph', name: 'Miles par heure', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'knot', name: 'Nœud marin', symbol: 'kt', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
  {
    id: 'digital',
    name: 'Données numériques',
    baseUnit: 'B',
    units: [
      { id: 'B', name: 'Octet (Byte)', symbol: 'o (B)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'KB', name: 'Kilooctet (10³)', symbol: 'Ko', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'MB', name: 'Mégaoctet (10⁶)', symbol: 'Mo', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: 'GB', name: 'Gigaoctet (10⁹)', symbol: 'Go', toBase: (v) => v * 1e9, fromBase: (v) => v / 1e9 },
      { id: 'TB', name: 'Téraoctet (10¹²)', symbol: 'To', toBase: (v) => v * 1e12, fromBase: (v) => v / 1e12 },
      { id: 'KiB', name: 'Kibioctet (2¹⁰)', symbol: 'Kio', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: 'MiB', name: 'Mébioctet (2²⁰)', symbol: 'Mio', toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: 'GiB', name: 'Gibioctet (2³⁰)', symbol: 'Gio', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressions',
    baseUnit: 'Pa',
    units: [
      { id: 'Pa', name: 'Pascal', symbol: 'Pa', toBase: (v) => v, fromBase: (v) => v },
      { id: 'hPa', name: 'Hectopascal', symbol: 'hPa', toBase: (v) => v * 100, fromBase: (v) => v / 100 },
      { id: 'bar', name: 'Bar', symbol: 'bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      { id: 'atm', name: 'Atmosphère standard', symbol: 'atm', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      { id: 'psi', name: 'Livre par pouce carré', symbol: 'psi', toBase: (v) => v * 6894.757, fromBase: (v) => v / 6894.757 },
      { id: 'mmHg', name: 'Millimètre de mercure', symbol: 'mmHg', toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
    ],
  },
  {
    id: 'energy',
    name: 'Énergies',
    baseUnit: 'J',
    units: [
      { id: 'J', name: 'Joule', symbol: 'J', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kJ', name: 'Kilojoule', symbol: 'kJ', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cal', name: 'Calorie', symbol: 'cal', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      { id: 'kcal', name: 'Kilocalorie (Cal)', symbol: 'kcal', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      { id: 'kWh', name: 'Kilowatt-heure', symbol: 'kWh', toBase: (v) => v * 3.6e6, fromBase: (v) => v / 3.6e6 },
      { id: 'eV', name: 'Électron-volt', symbol: 'eV', toBase: (v) => v * 1.602176634e-19, fromBase: (v) => v / 1.602176634e-19 },
    ],
  },
  {
    id: 'currency',
    name: 'Devises (Monnaies)',
    baseUnit: 'USD',
    units: [
      { id: 'USD', name: 'Dollar américain', symbol: 'USD ($)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'EUR', name: 'Euro', symbol: 'EUR (€)', toBase: (v) => v * 1.08, fromBase: (v) => v / 1.08 },
      { id: 'HTG', name: 'Gourde haïtienne', symbol: 'HTG (G)', toBase: (v) => v / 132.5, fromBase: (v) => v * 132.5 },
      { id: 'CAD', name: 'Dollar canadien', symbol: 'CAD (C$)', toBase: (v) => v * 0.73, fromBase: (v) => v / 0.73 },
      { id: 'GBP', name: 'Livre sterling', symbol: 'GBP (£)', toBase: (v) => v * 1.29, fromBase: (v) => v / 1.29 },
      { id: 'CHF', name: 'Franc suisse', symbol: 'CHF', toBase: (v) => v * 1.12, fromBase: (v) => v / 1.12 },
      { id: 'DOP', name: 'Peso dominicain', symbol: 'DOP (RD$)', toBase: (v) => v / 60.0, fromBase: (v) => v * 60.0 },
      { id: 'BRL', name: 'Real brésilien', symbol: 'BRL (R$)', toBase: (v) => v / 5.6, fromBase: (v) => v * 5.6 },
      { id: 'JPY', name: 'Yen japonais', symbol: 'JPY (¥)', toBase: (v) => v / 152.0, fromBase: (v) => v * 152.0 },
      { id: 'CNY', name: 'Yuan renminbi', symbol: 'CNY (¥)', toBase: (v) => v / 7.2, fromBase: (v) => v * 7.2 },
    ],
  },
];

export function convertUnit(
  value: number,
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string
): number {
  const cat = UNIT_CATEGORIES.find((c) => c.id === category);
  if (!cat) throw new Error(`Catégorie "${category}" inconnue`);

  const from = cat.units.find((u) => u.id === fromUnitId);
  const to = cat.units.find((u) => u.id === toUnitId);

  if (!from || !to) throw new Error('Unité non reconnue');

  const baseVal = from.toBase(value);
  return to.fromBase(baseVal);
}
