import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, Play, Sparkles } from 'lucide-react';

interface LearningLesson {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  rules: string[];
  example: {
    problem: string;
    steps: string[];
    answer: string;
  };
  exercise: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const LESSONS: LearningLesson[] = [
  {
    id: 'pemdas',
    title: '1. Règles de Priorité des Opérations (PEMDAS)',
    category: 'Arithmétique',
    summary: 'Ordre conventionnel universel pour évaluer une expression sans ambiguïté.',
    content: [
      'En mathématiques, les calculs ne s\'effectuent pas simplement de gauche à droite. Il existe une hiérarchie stricte d\'évaluation appelée règle PEMDAS (ou BODMAS).',
      'Si plusieurs opérations de même priorité se succèdent (ex: multiplication et division, ou addition et soustraction), on les évalue de gauche à droite.',
    ],
    rules: [
      'P : Parenthèses (du niveau le plus imbriqué vers l\'extérieur)',
      'E : Exposants et racines (puissances xʸ, √x)',
      'MD : Multiplications et Divisions (priorité identique, de gauche à droite)',
      'AS : Additions et Soustractions (priorité finale, de gauche à droite)',
    ],
    example: {
      problem: 'Calculer : 3 + 2 × (4 + 1)² − 10 ÷ 2',
      steps: [
        'Étape 1 : Parenthèse (4 + 1) = 5 ⟹ 3 + 2 × 5² − 10 ÷ 2',
        'Étape 2 : Exposant 5² = 25 ⟹ 3 + 2 × 25 − 10 ÷ 2',
        'Étape 3 : Multiplication 2 × 25 = 50 et division 10 ÷ 2 = 5 ⟹ 3 + 50 − 5',
        'Étape 4 : Additions et soustractions de gauche à droite ⟹ 53 − 5 = 48',
      ],
      answer: '48',
    },
    exercise: {
      question: 'Combien vaut l\'expression : 10 − 2 × 3 + 4 ?',
      options: ['28', '8', '24', '12'],
      correctIndex: 1,
      explanation: 'La multiplication est prioritaire : 2 × 3 = 6. Ensuite : 10 − 6 + 4 = 4 + 4 = 8.',
    },
  },
  {
    id: 'fractions',
    title: '2. Maîtriser le Calcul sur les Fractions',
    category: 'Fractions',
    summary: 'Règles d\'addition, de multiplication et simplification par le PGCD.',
    content: [
      'Une fraction a/b représente la division d\'un numérateur a par un dénominateur b (non nul).',
      'Pour additionner ou soustraire deux fractions, elles doivent impérativement avoir le même dénominateur.',
      'Pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux.',
      'Diviser par une fraction revient à multiplier par son inverse : (a/b) ÷ (c/d) = (a/b) × (d/c).',
    ],
    rules: [
      'Addition : a/b + c/d = (a·d + b·c) / (b·d)',
      'Multiplication : (a/b) × (c/d) = (a·c) / (b·d)',
      'Division : (a/b) ÷ (c/d) = (a/b) × (d/c)',
      'Simplification : diviser numérateur et dénominateur par leur PGCD',
    ],
    example: {
      problem: 'Calculer : (2/3) + (1/4)',
      steps: [
        'Étape 1 : Dénominateur commun (PPCM de 3 et 4) = 12',
        'Étape 2 : Mise au même dénominateur : (2 × 4)/12 + (1 × 3)/12 = 8/12 + 3/12',
        'Étape 3 : Addition des numérateurs : (8 + 3)/12 = 11/12',
      ],
      answer: '11/12',
    },
    exercise: {
      question: 'Quelle est la valeur de (3/5) × (10/9) simplifiée ?',
      options: ['30/45', '2/3', '1/3', '3/2'],
      correctIndex: 1,
      explanation: '(3 × 10) / (5 × 9) = 30 / 45. En simplifiant par le PGCD (15), on obtient 2/3.',
    },
  },
  {
    id: 'quadratic',
    title: '3. Équations du Second Degré & Discriminant Δ',
    category: 'Algèbre',
    summary: 'Résolution méthodique de ax² + bx + c = 0 et interprétation graphique.',
    content: [
      'Toute équation de la forme ax² + bx + c = 0 (avec a ≠ 0) représente une parabole dans le plan.',
      'Le nombre et la nature des solutions dépendent exclusivement du signe du discriminant Δ = b² − 4ac.',
    ],
    rules: [
      'Si Δ > 0 : Deux racines réelles distinctes x₁, x₂ = (−b ∓ √Δ) / (2a)',
      'Si Δ = 0 : Une racine réelle double x₀ = −b / (2a)',
      'Si Δ < 0 : Aucune racine réelle (deux racines complexes conjuguées dans ℂ)',
      'Sommet de la parabole : S(−b / 2a ; f(−b / 2a))',
    ],
    example: {
      problem: 'Résoudre : x² − 5x + 6 = 0',
      steps: [
        'Coefficients : a = 1, b = −5, c = 6',
        'Calcul de Δ : (−5)² − 4 × 1 × 6 = 25 − 24 = 1',
        'Δ > 0 ⟹ Deux solutions réelles :',
        'x₁ = (5 − √1) / 2 = 4 / 2 = 2',
        'x₂ = (5 + √1) / 2 = 6 / 2 = 3',
      ],
      answer: 'S = {2 ; 3}',
    },
    exercise: {
      question: 'Combien de racines réelles possède l\'équation x² + 2x + 5 = 0 ?',
      options: ['2 racines réelles', '1 racine double', '0 racine réelle', 'Infinité'],
      correctIndex: 2,
      explanation: 'Δ = 2² − 4(1)(5) = 4 − 20 = −16 < 0. Donc aucune racine réelle.',
    },
  },
  {
    id: 'trigonometry',
    title: '4. Trigonométrie & Triangle Rectangle',
    category: 'Géométrie',
    summary: 'Relations métriques fondamentales SOH CAH TOA et cercle trigonométrique.',
    content: [
      'Dans un triangle rectangle, les rapports de longueurs des côtés dépendent uniquement des angles aigus.',
      'L\'astuce mnémotechnique universelle est : SOH - CAH - TOA.',
    ],
    rules: [
      'SOH : Sinus = Côté Opposé / Hypoténuse',
      'CAH : Cosinus = Côté Adjacent / Hypoténuse',
      'TOA : Tangente = Côté Opposé / Côté Adjacent',
      'Identité fondamentale : cos²(x) + sin²(x) = 1 pour tout angle x',
    ],
    example: {
      problem: 'Un triangle a un côté opposé de 3 et une hypoténuse de 5. Quel est le sinus ?',
      steps: [
        'Formule : sin(α) = Opposé / Hypoténuse',
        'Calcul : sin(α) = 3 / 5 = 0.6',
        'Angle correspondant : α = arcsin(0.6) ≈ 36.87°',
      ],
      answer: 'sin(α) = 0.6 (soit environ 36.87°)',
    },
    exercise: {
      question: 'Si le côté adjacent vaut 4 et l\'hypoténuse vaut 5, que vaut cos(α) ?',
      options: ['0.6', '0.8', '1.25', '0.75'],
      correctIndex: 1,
      explanation: 'cos(α) = Adjacent / Hypoténuse = 4 / 5 = 0.8.',
    },
  },
];

export const LearningView: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>('pemdas');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<Record<string, boolean>>({});

  const lesson = LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];

  const handleSelectOption = (lessonId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [lessonId]: optionIdx }));
    setShowAnswerFeedback((prev) => ({ ...prev, [lessonId]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
          <BookOpen className="w-5 h-5" />
          <span>Espace Pédagogique & Fiches Méthodes</span>
        </div>
        <p className="text-xs text-slate-400">
          Règles fondamentales, démarches de calcul expliquées pas à pas et mini-quiz d'auto-évaluation.
        </p>
      </div>

      {/* Lesson Selector Bar */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        {LESSONS.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelectedLessonId(l.id)}
            className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedLessonId === l.id ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            {l.title.split('. ')[1] || l.title}
          </button>
        ))}
      </div>

      {/* Main Lesson Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div>
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{lesson.category}</span>
          <h2 className="text-xl font-bold text-white mt-1">{lesson.title}</h2>
          <p className="text-xs text-slate-300 mt-1">{lesson.summary}</p>
        </div>

        {/* Explanatory Paragraphs */}
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          {lesson.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Rules Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Formules & Règles Clés</span>
          </h3>
          <ul className="space-y-1 text-xs font-mono text-slate-200">
            {lesson.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solved Example */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Exemple résolu pas à pas
          </h3>
          <div className="text-xs font-mono font-semibold text-white bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            {lesson.example.problem}
          </div>
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            {lesson.example.steps.map((st, i) => (
              <div key={i} className="pl-3 border-l-2 border-slate-700">
                {st}
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs font-mono font-bold text-sky-400">
            Résultat final : {lesson.example.answer}
          </div>
        </div>

        {/* Interactive Self-Assessment Quiz */}
        <div className="p-5 bg-gradient-to-tr from-sky-950/40 to-slate-950/80 border border-sky-800/40 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Testez vos connaissances
            </h3>
            <span className="text-[11px] text-sky-400 font-medium">Exercice d'application</span>
          </div>

          <p className="text-xs font-semibold text-white">{lesson.exercise.question}</p>

          <div className="grid grid-cols-2 gap-2">
            {lesson.exercise.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[lesson.id] === optIdx;
              const isCorrect = optIdx === lesson.exercise.correctIndex;
              const hasAnswered = showAnswerFeedback[lesson.id];

              let btnClass = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800';
              if (hasAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/80 border-emerald-600 text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-950/80 border-rose-600 text-rose-300';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(lesson.id, optIdx)}
                  className={`p-2.5 rounded-lg border text-xs font-mono transition-colors text-left cursor-pointer ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showAnswerFeedback[lesson.id] && (
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-sky-400">
                {selectedAnswers[lesson.id] === lesson.exercise.correctIndex ? 'Bravo ! Bonne réponse 🎉' : 'Ce n\'est pas tout à fait cela.'}
              </div>
              <p>{lesson.exercise.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
