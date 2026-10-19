// Outils de calcul sur les dates, heures et durées

export interface DateDiffResult {
  days: number;
  weeks: number;
  remainingDays: number;
  months: number;
  years: number;
  totalDays: number;
  isLeapYearBetween: boolean;
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  daysUntilNextBirthday: number;
  dayOfWeekBorn: string;
}

// Vérifier si une année est bissextile
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Différence précise entre deux dates
export function calculateDateDifference(startDate: Date, endDate: Date): DateDiffResult {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
  }

  // Différence brute en jours
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.round((end.getTime() - start.getTime()) / msPerDay);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    // Jours dans le mois précédent de la date de fin
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let hasLeap = false;
  for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
    if (isLeapYear(y)) {
      hasLeap = true;
      break;
    }
  }

  return {
    years,
    months,
    days,
    totalDays,
    weeks: Math.floor(totalDays / 7),
    remainingDays: totalDays % 7,
    isLeapYearBetween: hasLeap,
  };
}

// Calcul précis de l'âge
export function calculateAge(birthDate: Date, referenceDate: Date = new Date()): AgeResult {
  const diff = calculateDateDifference(birthDate, referenceDate);

  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const dayOfWeekBorn = daysOfWeek[birthDate.getDay()];

  // Prochain anniversaire
  const currentYear = referenceDate.getFullYear();
  let nextBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  if (nextBday < referenceDate) {
    nextBday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilNextBirthday = Math.ceil((nextBday.getTime() - referenceDate.getTime()) / msPerDay);

  return {
    years: diff.years,
    months: diff.months,
    days: diff.days,
    totalDays: diff.totalDays,
    totalHours: diff.totalDays * 24,
    daysUntilNextBirthday,
    dayOfWeekBorn,
  };
}

// Opérations sur les durées (heures, minutes, secondes)
export function addDurations(
  d1: { hours: number; minutes: number; seconds: number },
  d2: { hours: number; minutes: number; seconds: number },
  operation: 'add' | 'subtract' = 'add'
): { hours: number; minutes: number; seconds: number; totalSeconds: number } {
  const sec1 = d1.hours * 3600 + d1.minutes * 60 + d1.seconds;
  const sec2 = d2.hours * 3600 + d2.minutes * 60 + d2.seconds;
  const totalSeconds = operation === 'add' ? sec1 + sec2 : Math.max(0, sec1 - sec2);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds, totalSeconds };
}
