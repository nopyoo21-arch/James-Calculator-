import { AngleMode, MathEvalResult } from '../types/calculator';

// Factorial calculation with memoization & overflow guard
export function factorial(n: number): number {
  if (!Number.isFinite(n) || n < 0 || Math.floor(n) !== n) {
    throw new Error('La factorielle est définie uniquement pour les entiers positifs ou nuls');
  }
  if (n > 170) {
    throw new Error('Dépassement de capacité pour la factorielle (n > 170)');
  }
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

// Permutations nPr = n! / (n - r)!
export function permutations(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n || Math.floor(n) !== n || Math.floor(r) !== r) {
    throw new Error('Permutations nPr : n et r doivent être des entiers avec 0 ≤ r ≤ n');
  }
  return factorial(n) / factorial(n - r);
}

// Combinations nCr = n! / (r! * (n - r)!)
export function combinations(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n || Math.floor(n) !== n || Math.floor(r) !== r) {
    throw new Error('Combinaisons nCr : n et r doivent être des entiers avec 0 ≤ r ≤ n');
  }
  // Optimize by choosing min(r, n - r)
  const k = Math.min(r, n - r);
  let num = 1;
  let den = 1;
  for (let i = 1; i <= k; i++) {
    num *= (n - i + 1);
    den *= i;
  }
  return num / den;
}

// Precision float formatter
export function formatNumber(
  val: number,
  decimals: number = -1,
  roundingMode: 'round' | 'floor' | 'ceil' = 'round'
): string {
  if (!Number.isFinite(val)) {
    if (Number.isNaN(val)) return 'Non défini';
    return val > 0 ? '+Infini' : '-Infini';
  }

  // Handle tiny floating point errors like 0.1 + 0.2 = 0.30000000000000004
  const epsilon = 1e-12;
  const roundedInt = Math.round(val);
  if (Math.abs(val - roundedInt) < epsilon) {
    val = roundedInt;
  }

  if (decimals >= 0) {
    const factor = Math.pow(10, decimals);
    let rounded: number;
    if (roundingMode === 'floor') {
      rounded = Math.floor(val * factor) / factor;
    } else if (roundingMode === 'ceil') {
      rounded = Math.ceil(val * factor) / factor;
    } else {
      rounded = Math.round(val * factor) / factor;
    }
    return rounded.toLocaleString('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  // Automatic clean representation
  const abs = Math.abs(val);
  if (abs !== 0 && (abs >= 1e14 || abs < 1e-7)) {
    return val.toExponential(8).replace('e', ' × 10^').replace('.', ',');
  }

  // Normal format with maximum 10 decimal digits, trimming trailing zeros
  const roundedStr = Number(val.toPrecision(12)).toString();
  const num = parseFloat(roundedStr);
  return num.toLocaleString('fr-FR', { maximumFractionDigits: 10 });
}

// Safe token types
type TokenType =
  | 'NUMBER'
  | 'IDENT'
  | 'PLUS'
  | 'MINUS'
  | 'MUL'
  | 'DIV'
  | 'POW'
  | 'PERCENT'
  | 'FACTORIAL'
  | 'LPAREN'
  | 'RPAREN'
  | 'COMMA';

interface Token {
  type: TokenType;
  value: string | number;
}

// Tokenizer
function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  
  // Convert French decimal commas between digits (e.g. 3,14 -> 3.14) without breaking argument commas like (10, 3) or (10; 3)
  // 1. Replace explicit argument semicolons with a special delimiter
  let clean = input
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/∛/g, 'cbrt');

  // Replace comma with dot only when it is part of a decimal number (digit,digit without spaces)
  clean = clean.replace(/(\d+),(\d+)/g, '$1.$2');
  // Semicolon or comma with space or remaining commas are argument separators
  clean = clean.replace(/;/g, ',');
  clean = clean.replace(/\s+/g, '');

  while (i < clean.length) {
    const char = clean[i];

    // Numbers (including scientific notation like 1.5e3)
    if (/\d/.test(char) || (char === '.' && i + 1 < clean.length && /\d/.test(clean[i + 1]))) {
      let numStr = '';
      while (i < clean.length && (/[\d.]/.test(clean[i]) || (/[eE]/.test(clean[i]) && i + 1 < clean.length && /[\d+-]/.test(clean[i + 1])))) {
        if (/[eE]/.test(clean[i])) {
          numStr += clean[i++];
          if (clean[i] === '+' || clean[i] === '-') {
            numStr += clean[i++];
          }
        } else {
          numStr += clean[i++];
        }
      }
      tokens.push({ type: 'NUMBER', value: parseFloat(numStr) });
      continue;
    }

    // Identifiers (functions and constants like sin, cos, pi, etc.)
    if (/[a-zA-Z_]/.test(char)) {
      let ident = '';
      while (i < clean.length && /[a-zA-Z0-9_]/.test(clean[i])) {
        ident += clean[i++];
      }
      tokens.push({ type: 'IDENT', value: ident.toLowerCase() });
      continue;
    }

    switch (char) {
      case '+':
        tokens.push({ type: 'PLUS', value: '+' });
        break;
      case '-':
        tokens.push({ type: 'MINUS', value: '-' });
        break;
      case '*':
        tokens.push({ type: 'MUL', value: '*' });
        break;
      case '/':
        tokens.push({ type: 'DIV', value: '/' });
        break;
      case '^':
        tokens.push({ type: 'POW', value: '^' });
        break;
      case '%':
        tokens.push({ type: 'PERCENT', value: '%' });
        break;
      case '!':
        tokens.push({ type: 'FACTORIAL', value: '!' });
        break;
      case '(':
        tokens.push({ type: 'LPAREN', value: '(' });
        break;
      case ')':
        tokens.push({ type: 'RPAREN', value: ')' });
        break;
      case ',':
      case ';':
        tokens.push({ type: 'COMMA', value: ',' });
        break;
      default:
        throw new Error(`Caractère non reconnu : "${char}"`);
    }
    i++;
  }

  return tokens;
}

// Safe Parser & Evaluator (Shunting-Yard & Stack Evaluation)
export function evaluateExpression(expr: string, angleMode: AngleMode = 'DEG'): MathEvalResult {
  if (!expr || !expr.trim()) {
    return { success: true, result: 0, formatted: '0' };
  }

  try {
    const rawTokens = tokenize(expr);
    if (rawTokens.length === 0) {
      return { success: true, result: 0, formatted: '0' };
    }

    // Resolve unary plus/minus & implicit multiplication (e.g. 2pi -> 2 * pi, 5(3+2) -> 5 * (3+2))
    const tokens: Token[] = [];
    for (let i = 0; i < rawTokens.length; i++) {
      const cur = rawTokens[i];
      const prev = i > 0 ? rawTokens[i - 1] : null;

      // Implicit multiplication detection:
      // (NUMBER | RPAREN | IDENT | FACTORIAL | PERCENT) followed by (NUMBER | IDENT | LPAREN)
      if (prev) {
        const prevCanPrecedeMul =
          prev.type === 'NUMBER' ||
          prev.type === 'RPAREN' ||
          prev.type === 'FACTORIAL' ||
          prev.type === 'PERCENT' ||
          (prev.type === 'IDENT' && (prev.value === 'pi' || prev.value === 'e'));
        const curCanFollowMul =
          cur.type === 'LPAREN' ||
          (cur.type === 'IDENT' && (cur.value === 'pi' || cur.value === 'e')) ||
          (cur.type === 'NUMBER' && prev.type !== 'IDENT'); // 5 pi or (3)(4)
        if (prevCanPrecedeMul && curCanFollowMul) {
          tokens.push({ type: 'MUL', value: '*' });
        }
      }

      // Unary minus/plus
      if (cur.type === 'MINUS' || cur.type === 'PLUS') {
        const isUnary =
          !prev ||
          prev.type === 'LPAREN' ||
          prev.type === 'PLUS' ||
          prev.type === 'MINUS' ||
          prev.type === 'MUL' ||
          prev.type === 'DIV' ||
          prev.type === 'POW' ||
          prev.type === 'COMMA';
        if (isUnary) {
          if (cur.type === 'MINUS') {
            // Push 0 - ... or treat as unary
            tokens.push({ type: 'NUMBER', value: 0 });
            tokens.push({ type: 'MINUS', value: '-' });
            continue;
          } else {
            // Unary plus is a no-op
            continue;
          }
        }
      }

      tokens.push(cur);
    }

    // Shunting-Yard Algorithm
    const outputQueue: Token[] = [];
    const opStack: Token[] = [];

    const precedence: Record<string, number> = {
      '+': 2,
      '-': 2,
      '*': 3,
      '/': 3,
      '^': 4,
    };

    const isRightAssociative = (op: string) => op === '^';

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];

      if (t.type === 'NUMBER') {
        outputQueue.push(t);
      } else if (t.type === 'IDENT') {
        // Constants or Functions
        if (t.value === 'pi') {
          outputQueue.push({ type: 'NUMBER', value: Math.PI });
        } else if (t.value === 'e') {
          outputQueue.push({ type: 'NUMBER', value: Math.E });
        } else {
          opStack.push(t);
        }
      } else if (t.type === 'FACTORIAL' || t.type === 'PERCENT') {
        // Postfix operators: push directly
        outputQueue.push(t);
      } else if (t.type === 'COMMA') {
        while (opStack.length > 0 && opStack[opStack.length - 1].type !== 'LPAREN') {
          outputQueue.push(opStack.pop()!);
        }
        if (opStack.length === 0) {
          throw new Error('Virgule mal placée ou parenthèses manquantes');
        }
      } else if (t.type === 'PLUS' || t.type === 'MINUS' || t.type === 'MUL' || t.type === 'DIV' || t.type === 'POW') {
        const op1 = t.value as string;
        while (opStack.length > 0) {
          const top = opStack[opStack.length - 1];
          if (top.type === 'LPAREN') break;
          if (top.type === 'IDENT') {
            outputQueue.push(opStack.pop()!);
            continue;
          }
          const op2 = top.value as string;
          const p1 = precedence[op1];
          const p2 = precedence[op2];
          if (p2 > p1 || (p2 === p1 && !isRightAssociative(op1))) {
            outputQueue.push(opStack.pop()!);
          } else {
            break;
          }
        }
        opStack.push(t);
      } else if (t.type === 'LPAREN') {
        opStack.push(t);
      } else if (t.type === 'RPAREN') {
        let foundLparen = false;
        while (opStack.length > 0) {
          const top = opStack.pop()!;
          if (top.type === 'LPAREN') {
            foundLparen = true;
            break;
          }
          outputQueue.push(top);
        }
        if (!foundLparen) {
          throw new Error('Parenthèse fermante sans parenthèse ouvrante correspondante');
        }
        // If top of stack is a function, pop it to output
        if (opStack.length > 0 && opStack[opStack.length - 1].type === 'IDENT') {
          outputQueue.push(opStack.pop()!);
        }
      }
    }

    while (opStack.length > 0) {
      const top = opStack.pop()!;
      if (top.type === 'LPAREN') {
        throw new Error('Parenthèse ouvrante non refermée');
      }
      outputQueue.push(top);
    }

    // Evaluation of RPN (Reverse Polish Notation)
    const valStack: number[] = [];

    const toRad = (angle: number) => (angleMode === 'DEG' ? (angle * Math.PI) / 180 : angle);
    const fromRad = (rad: number) => (angleMode === 'DEG' ? (rad * 180) / Math.PI : rad);

    for (const t of outputQueue) {
      if (t.type === 'NUMBER') {
        valStack.push(t.value as number);
      } else if (t.type === 'PERCENT') {
        if (valStack.length < 1) throw new Error('Opérande manquant pour %');
        const a = valStack.pop()!;
        valStack.push(a / 100);
      } else if (t.type === 'FACTORIAL') {
        if (valStack.length < 1) throw new Error('Opérande manquant pour factorielle');
        const a = valStack.pop()!;
        valStack.push(factorial(a));
      } else if (t.type === 'PLUS' || t.type === 'MINUS' || t.type === 'MUL' || t.type === 'DIV' || t.type === 'POW') {
        if (valStack.length < 2) throw new Error(`Opérande manquant pour l'opérateur "${t.value}"`);
        const b = valStack.pop()!;
        const a = valStack.pop()!;

        switch (t.value) {
          case '+':
            valStack.push(a + b);
            break;
          case '-':
            valStack.push(a - b);
            break;
          case '*':
            valStack.push(a * b);
            break;
          case '/':
            if (Math.abs(b) < 1e-15) {
              throw new Error('Division par zéro impossible');
            }
            valStack.push(a / b);
            break;
          case '^':
            if (a === 0 && b < 0) {
              throw new Error('Division par zéro (0 à une puissance négative)');
            }
            if (a < 0 && Math.floor(b) !== b) {
              throw new Error('Puissance non entière d’un nombre négatif non définie dans ℝ');
            }
            valStack.push(Math.pow(a, b));
            break;
        }
      } else if (t.type === 'IDENT') {
        const fn = (t.value as string).toLowerCase();

        // 2-argument functions
        if (fn === 'ncr' || fn === 'comb') {
          if (valStack.length < 2) throw new Error('nCr nécessite 2 arguments : nCr(n, r)');
          const r = valStack.pop()!;
          const n = valStack.pop()!;
          valStack.push(combinations(n, r));
          continue;
        }
        if (fn === 'npr' || fn === 'perm') {
          if (valStack.length < 2) throw new Error('nPr nécessite 2 arguments : nPr(n, r)');
          const r = valStack.pop()!;
          const n = valStack.pop()!;
          valStack.push(permutations(n, r));
          continue;
        }
        if (fn === 'root' || fn === 'nroot') {
          if (valStack.length < 2) throw new Error('Racine n-ième : nroot(x, n)');
          const n = valStack.pop()!;
          const x = valStack.pop()!;
          if (x < 0 && n % 2 === 0) {
            throw new Error('Racine paire d’un nombre négatif impossible dans ℝ');
          }
          if (n === 0) throw new Error('Indice de racine ne peut pas être zéro');
          valStack.push(x < 0 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n));
          continue;
        }

        // 1-argument functions
        if (valStack.length < 1) throw new Error(`Argument manquant pour la fonction ${fn}`);
        const arg = valStack.pop()!;

        switch (fn) {
          case 'sin':
            valStack.push(Math.sin(toRad(arg)));
            break;
          case 'cos':
            valStack.push(Math.cos(toRad(arg)));
            break;
          case 'tan': {
            const rad = toRad(arg);
            const cosVal = Math.cos(rad);
            if (Math.abs(cosVal) < 1e-12) {
              throw new Error('Tangente non définie pour cet angle');
            }
            valStack.push(Math.tan(rad));
            break;
          }
          case 'asin':
          case 'arcsin':
            if (arg < -1 || arg > 1) {
              throw new Error('Domaine invalide : arcsin défini uniquement sur [-1, 1]');
            }
            valStack.push(fromRad(Math.asin(arg)));
            break;
          case 'acos':
          case 'arccos':
            if (arg < -1 || arg > 1) {
              throw new Error('Domaine invalide : arccos défini uniquement sur [-1, 1]');
            }
            valStack.push(fromRad(Math.acos(arg)));
            break;
          case 'atan':
          case 'arctan':
            valStack.push(fromRad(Math.atan(arg)));
            break;
          case 'sinh':
            valStack.push(Math.sinh(arg));
            break;
          case 'cosh':
            valStack.push(Math.cosh(arg));
            break;
          case 'tanh':
            valStack.push(Math.tanh(arg));
            break;
          case 'asinh':
            valStack.push(Math.asinh(arg));
            break;
          case 'acosh':
            if (arg < 1) {
              throw new Error('Domaine invalide : acosh défini uniquement pour x ≥ 1');
            }
            valStack.push(Math.acosh(arg));
            break;
          case 'atanh':
            if (arg <= -1 || arg >= 1) {
              throw new Error('Domaine invalide : atanh défini uniquement sur ]-1, 1[');
            }
            valStack.push(Math.atanh(arg));
            break;
          case 'sqrt':
            if (arg < 0) {
              throw new Error('Racine carrée d’un nombre négatif non définie dans ℝ');
            }
            valStack.push(Math.sqrt(arg));
            break;
          case 'cbrt':
            valStack.push(Math.cbrt(arg));
            break;
          case 'log':
          case 'log10':
            if (arg <= 0) {
              throw new Error('Logarithme décimal défini uniquement pour x > 0');
            }
            valStack.push(Math.log10(arg));
            break;
          case 'ln':
            if (arg <= 0) {
              throw new Error('Logarithme népérien défini uniquement pour x > 0');
            }
            valStack.push(Math.log(arg));
            break;
          case 'exp':
            valStack.push(Math.exp(arg));
            break;
          case 'abs':
            valStack.push(Math.abs(arg));
            break;
          case 'sqr':
            valStack.push(arg * arg);
            break;
          case 'cube':
            valStack.push(arg * arg * arg);
            break;
          case 'inv':
            if (Math.abs(arg) < 1e-15) {
              throw new Error('Division par zéro (inverse de 0)');
            }
            valStack.push(1 / arg);
            break;
          case 'round':
            valStack.push(Math.round(arg));
            break;
          case 'floor':
            valStack.push(Math.floor(arg));
            break;
          case 'ceil':
            valStack.push(Math.ceil(arg));
            break;
          default:
            throw new Error(`Fonction inconnue : "${fn}"`);
        }
      }
    }

    if (valStack.length !== 1) {
      throw new Error('Expression incomplète ou incohérente');
    }

    const finalVal = valStack[0];
    if (!Number.isFinite(finalVal)) {
      throw new Error('Le résultat dépasse les limites numériques admissibles');
    }

    return {
      success: true,
      result: finalVal,
      formatted: formatNumber(finalVal),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur de calcul';
    return {
      success: false,
      error: message,
    };
  }
}
