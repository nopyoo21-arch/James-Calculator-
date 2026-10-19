import React, { useState } from 'react';
import { Binary, Cpu, RotateCcw } from 'lucide-react';

type BaseMode = 'HEX' | 'DEC' | 'OCT' | 'BIN';
type WordSize = 'QWORD' | 'DWORD' | 'WORD' | 'BYTE';

export const ProgrammerView: React.FC = () => {
  const [val, setVal] = useState<bigint>(BigInt(42));
  const [activeBase, setActiveBase] = useState<BaseMode>('DEC');
  const [wordSize, setWordSize] = useState<WordSize>('DWORD');
  const [op, setOp] = useState<'AND' | 'OR' | 'XOR' | 'LSH' | 'RSH' | null>(null);
  const [prevVal, setPrevVal] = useState<bigint | null>(null);

  // Mask based on word size
  const mask = (() => {
    switch (wordSize) {
      case 'BYTE':
        return BigInt(0xff);
      case 'WORD':
        return BigInt(0xffff);
      case 'DWORD':
        return BigInt(0xffffffff);
      case 'QWORD':
        return BigInt('0xffffffffffffffff');
    }
  })();

  const bitCount = wordSize === 'BYTE' ? 8 : wordSize === 'WORD' ? 16 : wordSize === 'DWORD' ? 32 : 64;

  const currentVal = val & mask;

  // Base string representations
  const hexStr = currentVal.toString(16).toUpperCase();
  const decStr = currentVal.toString(10);
  const octStr = currentVal.toString(8);
  const binStr = currentVal.toString(2).padStart(bitCount, '0');

  // Input char handler
  const handleCharInput = (c: string) => {
    try {
      const baseNum = activeBase === 'HEX' ? 16 : activeBase === 'DEC' ? 10 : activeBase === 'OCT' ? 8 : 2;
      const currentStr = currentVal.toString(baseNum);
      const newStr = currentStr === '0' ? c : currentStr + c;
      const parsed = BigInt(
        activeBase === 'HEX' ? `0x${newStr}` : activeBase === 'OCT' ? `0o${newStr}` : activeBase === 'BIN' ? `0b${newStr}` : newStr
      );
      setVal(parsed & mask);
    } catch {}
  };

  const handleBackspace = () => {
    const baseNum = activeBase === 'HEX' ? 16 : activeBase === 'DEC' ? 10 : activeBase === 'OCT' ? 8 : 2;
    const currentStr = currentVal.toString(baseNum);
    if (currentStr.length <= 1) {
      setVal(BigInt(0));
    } else {
      const newStr = currentStr.slice(0, -1);
      const parsed = BigInt(
        activeBase === 'HEX' ? `0x${newStr}` : activeBase === 'OCT' ? `0o${newStr}` : activeBase === 'BIN' ? `0b${newStr}` : newStr
      );
      setVal(parsed & mask);
    }
  };

  const handleClear = () => {
    setVal(BigInt(0));
    setPrevVal(null);
    setOp(null);
  };

  // Toggle specific bit
  const handleToggleBit = (bitIndex: number) => {
    const bitMask = BigInt(1) << BigInt(bitIndex);
    setVal((val ^ bitMask) & mask);
  };

  // Bitwise operator clicked
  const handleOpClick = (operator: 'AND' | 'OR' | 'XOR' | 'LSH' | 'RSH') => {
    setPrevVal(currentVal);
    setOp(operator);
    setVal(BigInt(0));
  };

  const handleNot = () => {
    setVal((~currentVal) & mask);
  };

  const handleEquals = () => {
    if (prevVal === null || op === null) return;
    let res = BigInt(0);
    switch (op) {
      case 'AND':
        res = prevVal & currentVal;
        break;
      case 'OR':
        res = prevVal | currentVal;
        break;
      case 'XOR':
        res = prevVal ^ currentVal;
        break;
      case 'LSH':
        res = prevVal << BigInt(Number(currentVal));
        break;
      case 'RSH':
        res = prevVal >> BigInt(Number(currentVal));
        break;
    }
    setVal(res & mask);
    setPrevVal(null);
    setOp(null);
  };

  // Available keypad buttons depending on base
  const isDigitValid = (d: string) => {
    if (activeBase === 'BIN') return ['0', '1'].includes(d);
    if (activeBase === 'OCT') return ['0', '1', '2', '3', '4', '5', '6', '7'].includes(d);
    if (activeBase === 'DEC') return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(d);
    return true; // HEX has all
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header and Word Size Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-400" />
              <span>Calculatrice Programmeur & Logique Binaire</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Conversions HEX, DEC, OCT, BIN, opérations bitwise et manipulation de bits individuels
            </p>
          </div>

          <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-semibold">
            {(['QWORD', 'DWORD', 'WORD', 'BYTE'] as WordSize[]).map((w) => (
              <button
                key={w}
                onClick={() => setWordSize(w)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  wordSize === w ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Bases Display Matrix */}
        <div className="space-y-1.5 font-mono text-xs">
          {[
            { id: 'HEX', label: 'HEX', value: hexStr },
            { id: 'DEC', label: 'DEC', value: decStr },
            { id: 'OCT', label: 'OCT', value: octStr },
            { id: 'BIN', label: 'BIN', value: binStr.match(/.{1,4}/g)?.join(' ') || binStr },
          ].map((b) => (
            <div
              key={b.id}
              onClick={() => setActiveBase(b.id as BaseMode)}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                activeBase === b.id
                  ? 'bg-sky-950/60 border-sky-500 text-white'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <span className={`w-12 font-bold ${activeBase === b.id ? 'text-sky-400' : 'text-slate-500'}`}>
                {b.label}
              </span>
              <span className="font-bold text-sm tracking-wide break-all text-right select-all">
                {b.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Bitboard Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Binary className="w-4 h-4 text-sky-400" />
            <span>Matrice de bits cliquables ({bitCount} bits)</span>
          </span>
          <span className="text-[11px] text-slate-400">Cliquez sur un bit pour inverser son état (0 ⟷ 1)</span>
        </div>

        {/* 4-bit nibble groupings */}
        <div className="flex flex-wrap gap-2 justify-center py-2">
          {Array.from({ length: bitCount / 4 }, (_, groupIdx) => {
            const startBit = bitCount - 1 - groupIdx * 4;
            return (
              <div key={groupIdx} className="flex gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {[0, 1, 2, 3].map((subIdx) => {
                  const bIdx = startBit - subIdx;
                  const isSet = ((currentVal >> BigInt(bIdx)) & BigInt(1)) === BigInt(1);
                  return (
                    <button
                      key={bIdx}
                      onClick={() => handleToggleBit(bIdx)}
                      className={`w-7 h-8 rounded font-mono text-xs font-bold flex flex-col items-center justify-center transition-colors cursor-pointer ${
                        isSet
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-900 text-slate-500 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                      title={`Bit ${bIdx}`}
                    >
                      <span>{isSet ? '1' : '0'}</span>
                      <span className="text-[8px] opacity-60">{bIdx}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Programmer Keypad */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        {/* Bitwise Operations row */}
        <div className="grid grid-cols-6 gap-2 text-xs font-mono font-bold">
          <button
            onClick={() => handleOpClick('AND')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              op === 'AND' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            AND
          </button>
          <button
            onClick={() => handleOpClick('OR')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              op === 'OR' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            OR
          </button>
          <button
            onClick={() => handleOpClick('XOR')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              op === 'XOR' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            XOR
          </button>
          <button
            onClick={handleNot}
            className="py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            NOT
          </button>
          <button
            onClick={() => handleOpClick('LSH')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              op === 'LSH' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Décalage à gauche (<<)"
          >
            LSH &lt;&lt;
          </button>
          <button
            onClick={() => handleOpClick('RSH')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              op === 'RSH' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Décalage à droite (>>)"
          >
            RSH &gt;&gt;
          </button>
        </div>

        {/* Hex and Digit keypad */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 font-mono">
          {/* Hex digits A-F */}
          {['A', 'B', 'C', 'D', 'E', 'F'].map((hd) => (
            <button
              key={hd}
              disabled={!isDigitValid(hd)}
              onClick={() => handleCharInput(hd)}
              className="py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-bold text-sky-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {hd}
            </button>
          ))}

          {/* Digits 7,8,9, C */}
          {['7', '8', '9'].map((d) => (
            <button
              key={d}
              disabled={!isDigitValid(d)}
              onClick={() => handleCharInput(d)}
              className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-bold text-white text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {d}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="py-2.5 rounded-xl bg-rose-950/40 border border-rose-800/60 font-bold text-rose-300 hover:bg-rose-900/60 transition-colors cursor-pointer"
          >
            CLR
          </button>

          {/* Digits 4,5,6, DEL */}
          {['4', '5', '6'].map((d) => (
            <button
              key={d}
              disabled={!isDigitValid(d)}
              onClick={() => handleCharInput(d)}
              className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-bold text-white text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {d}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="py-2.5 rounded-xl bg-slate-800 font-bold text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            DEL
          </button>

          {/* Digits 1,2,3, = */}
          {['1', '2', '3'].map((d) => (
            <button
              key={d}
              disabled={!isDigitValid(d)}
              onClick={() => handleCharInput(d)}
              className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-bold text-white text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {d}
            </button>
          ))}
          <button
            onClick={handleEquals}
            className="py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 font-bold text-white text-lg shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            =
          </button>

          {/* Digit 0 spanning */}
          <button
            disabled={!isDigitValid('0')}
            onClick={() => handleCharInput('0')}
            className="col-span-2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-bold text-white text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer"
          >
            0
          </button>
        </div>
      </div>
    </div>
  );
};
