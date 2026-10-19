import { AppLanguage, CalculatorMode } from '../types/calculator';

export const TRANSLATIONS: Record<AppLanguage, {
  name: string;
  flag: string;
  modes: Record<CalculatorMode, string>;
  common: {
    appName: string;
    tagline: string;
    author: string;
    offlineBadge: string;
    onlineBadge: string;
    settings: string;
    history: string;
    clear: string;
    delete: string;
    calculate: string;
    result: string;
    copy: string;
    copied: string;
    paste: string;
    share: string;
    steps: string;
    formula: string;
    reset: string;
    save: string;
    error: string;
    degrees: string;
    radians: string;
    theme: string;
    language: string;
    quickStats: string;
  };
  tools: {
    graph: string;
    programmer: string;
    matrices: string;
    algebra: string;
    fractions: string;
    percentages: string;
    finance: string;
    geometry: string;
    statistics: string;
    probabilities: string;
    scienceTools: string;
    converter: string;
    dateTime: string;
    learning: string;
  };
}> = {
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    modes: {
      standard: 'Standard',
      scientific: 'Scientifique',
      graph: 'Graphique 2D',
      programmer: 'Programmeur',
      matrices: 'Matrices',
      algebra: 'Algèbre',
      fractions: 'Fractions',
      percentages: 'Pourcentages',
      finance: 'Finance & Budget',
      geometry: 'Géométrie',
      statistics: 'Statistiques',
      probabilities: 'Probabilités',
      science_tools: 'Physique & Chimie',
      converter: 'Convertisseur & Devises',
      date_time: 'Date & Heure',
      learning: 'Mode Étudiant',
    },
    common: {
      appName: 'JAMES CALCULATOR PRO',
      tagline: 'Le calcul devient simple, rapide et intelligent.',
      author: 'Créé par James',
      offlineBadge: '100% Hors ligne',
      onlineBadge: 'En ligne',
      settings: 'Paramètres',
      history: 'Historique',
      clear: 'Effacer',
      delete: 'Supprimer',
      calculate: 'Calculer',
      result: 'Résultat',
      copy: 'Copier',
      copied: 'Copié !',
      paste: 'Coller',
      share: 'Partager',
      steps: 'Étapes détaillées',
      formula: 'Formule',
      reset: 'Réinitialiser',
      save: 'Enregistrer',
      error: 'Erreur',
      degrees: 'Degrés (DEG)',
      radians: 'Radians (RAD)',
      theme: 'Thème',
      language: 'Langue',
      quickStats: 'Aperçu',
    },
    tools: {
      graph: 'Tracé de fonctions mathématiques',
      programmer: 'Binaire, Octal, Hexadécimal & Logique binaire',
      matrices: 'Calculs matriciels & déterminants',
      algebra: 'Résolution d\'équations et polynômes',
      fractions: 'Opérations et simplification de fractions',
      percentages: 'Variations, remises et taxes',
      finance: 'Prêts, amortissements et budget',
      geometry: 'Aires, volumes et trigonométrie',
      statistics: 'Moyenne, écart-type et régression',
      probabilities: 'Combinatoire et simulations aléatoires',
      scienceTools: 'Constantes physiques, chimie & tableau périodique',
      converter: 'Unités physiques et devises mondiales',
      dateTime: 'Différence de dates, durées et âge',
      learning: 'Formulaire de l\'étudiant et exercices interactifs',
    },
  },
  ht: {
    name: 'Kreyòl Ayisyen',
    flag: '🇭🇹',
    modes: {
      standard: 'Estanda',
      scientific: 'Syantifik',
      graph: 'Grafik 2D',
      programmer: 'Pwogramè',
      matrices: 'Matris',
      algebra: 'Aljèb',
      fractions: 'Fraksyon',
      percentages: 'Pousantaj',
      finance: 'Finans & Bidjè',
      geometry: 'Jewometri',
      statistics: 'Estatistik',
      probabilities: 'Pobabilite',
      science_tools: 'Fizik & Chimi',
      converter: 'Konvètè & Lajan',
      date_time: 'Dat & Lè',
      learning: 'Mòd Etidyan',
    },
    common: {
      appName: 'JAMES CALCULATOR PRO',
      tagline: 'Kalkil la vin senp, rapid epi entèlijan.',
      author: 'Kreye pa James',
      offlineBadge: '100% San Entènèt',
      onlineBadge: 'Konekte',
      settings: 'Paramèt',
      history: 'Istorik',
      clear: 'Efase tout',
      delete: 'Efase',
      calculate: 'Kalkile',
      result: 'Rezilta',
      copy: 'Kopye',
      copied: 'Kopye nan klipbòd!',
      paste: 'Kole',
      share: 'Pataje',
      steps: 'Etap detay yo',
      formula: 'Fòmil',
      reset: 'Reyinisyalize',
      save: 'Anrejistre',
      error: 'Erè',
      degrees: 'Degre (DEG)',
      radians: 'Radyan (RAD)',
      theme: 'Tèm',
      language: 'Lang',
      quickStats: 'Apèsi',
    },
    tools: {
      graph: 'Desine fonksyon matematik',
      programmer: 'Binè, Oktal, Egzadesimal & Lojik bit',
      matrices: 'Kalkil matris ak detèminan',
      algebra: 'Rezolisyon ekwasyon ak polinom',
      fractions: 'Operasyon ak senplifikasyon fraksyon',
      percentages: 'Varyasyon, rabè ak taks',
      finance: 'Kredi, amortisman ak plan bidjè',
      geometry: 'Sipèfisi, volim ak trigonometri',
      statistics: 'Mwayèn, devyasyon estanda ak regresyon',
      probabilities: 'Konbinezon ak eksperyans aza',
      scienceTools: 'Konstan fizik, chimi & tablo peryodik',
      converter: 'Inite fizik ak lajan mondyal (Goud, Dola)',
      dateTime: 'Diferans ant dat, dire ak laj',
      learning: 'Fòmilè etidyan ak egzèsis entèraktif',
    },
  },
  en: {
    name: 'English',
    flag: '🇺🇸',
    modes: {
      standard: 'Standard',
      scientific: 'Scientific',
      graph: '2D Graphing',
      programmer: 'Programmer',
      matrices: 'Matrices',
      algebra: 'Algebra',
      fractions: 'Fractions',
      percentages: 'Percentages',
      finance: 'Finance & Budget',
      geometry: 'Geometry',
      statistics: 'Statistics',
      probabilities: 'Probability',
      science_tools: 'Physics & Chemistry',
      converter: 'Converter & Currencies',
      date_time: 'Date & Time',
      learning: 'Student Mode',
    },
    common: {
      appName: 'JAMES CALCULATOR PRO',
      tagline: 'Calculation made simple, fast, and intelligent.',
      author: 'Created by James',
      offlineBadge: '100% Offline',
      onlineBadge: 'Online',
      settings: 'Settings',
      history: 'History',
      clear: 'Clear',
      delete: 'Delete',
      calculate: 'Calculate',
      result: 'Result',
      copy: 'Copy',
      copied: 'Copied!',
      paste: 'Paste',
      share: 'Share',
      steps: 'Step-by-step',
      formula: 'Formula',
      reset: 'Reset',
      save: 'Save',
      error: 'Error',
      degrees: 'Degrees (DEG)',
      radians: 'Radians (RAD)',
      theme: 'Theme',
      language: 'Language',
      quickStats: 'Overview',
    },
    tools: {
      graph: 'Graph 2D mathematical functions',
      programmer: 'Binary, Octal, Hex & Bitwise logic',
      matrices: 'Matrix algebra & determinants',
      algebra: 'Equation solving & polynomials',
      fractions: 'Fraction arithmetic & simplification',
      percentages: 'Changes, discounts, and taxes',
      finance: 'Loans, amortization, and budget',
      geometry: 'Area, volume, and trigonometry',
      statistics: 'Mean, std deviation, and regression',
      probabilities: 'Combinatorics and random experiments',
      scienceTools: 'Physical constants, chemistry & periodic table',
      converter: 'Physical units and world currencies',
      dateTime: 'Date intervals, duration, and age',
      learning: 'Student formula handbook and interactive quizzes',
    },
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    modes: {
      standard: 'Estándar',
      scientific: 'Científica',
      graph: 'Gráfico 2D',
      programmer: 'Programador',
      matrices: 'Matrices',
      algebra: 'Álgebra',
      fractions: 'Fracciones',
      percentages: 'Porcentajes',
      finance: 'Finanzas y Presupuesto',
      geometry: 'Geometría',
      statistics: 'Estadística',
      probabilities: 'Probabilidad',
      science_tools: 'Física y Química',
      converter: 'Conversor y Monedas',
      date_time: 'Fecha y Hora',
      learning: 'Modo Estudiante',
    },
    common: {
      appName: 'JAMES CALCULATOR PRO',
      tagline: 'El cálculo hecho simple, rápido e inteligente.',
      author: 'Creado por James',
      offlineBadge: '100% Sin conexión',
      onlineBadge: 'En línea',
      settings: 'Configuración',
      history: 'Historial',
      clear: 'Borrar',
      delete: 'Eliminar',
      calculate: 'Calcular',
      result: 'Resultado',
      copy: 'Copiar',
      copied: '¡Copiado!',
      paste: 'Pegar',
      share: 'Compartir',
      steps: 'Pasos detallados',
      formula: 'Fórmula',
      reset: 'Restablecer',
      save: 'Guardar',
      error: 'Error',
      degrees: 'Grados (DEG)',
      radians: 'Radianes (RAD)',
      theme: 'Tema',
      language: 'Idioma',
      quickStats: 'Resumen',
    },
    tools: {
      graph: 'Gráficas de funciones matemáticas',
      programmer: 'Binario, Octal, Hex y Lógica de bits',
      matrices: 'Cálculos de matrices y determinantes',
      algebra: 'Resolución de ecuaciones y polinomios',
      fractions: 'Operaciones y simplificación de fracciones',
      percentages: 'Variaciones, descuentos e impuestos',
      finance: 'Préstamos, amortización y presupuesto',
      geometry: 'Áreas, volúmenes y trigonometría',
      statistics: 'Media, desviación estándar y regresión',
      probabilities: 'Combinatoria y experimentos aleatorios',
      scienceTools: 'Constantes físicas, química y tabla periódica',
      converter: 'Unidades físicas y divisas mundiales',
      dateTime: 'Diferencia de fechas, duraciones y edad',
      learning: 'Formulario para estudiantes y ejercicios interactivos',
    },
  },
};

export function getTranslation(lang: AppLanguage = 'fr') {
  return TRANSLATIONS[lang] || TRANSLATIONS.fr;
}
