import React, { useState, useMemo, useRef } from 'react';
import { evaluateExpression } from '../utils/mathEngine';
import { LineChart, ZoomIn, ZoomOut, RotateCcw, Crosshair } from 'lucide-react';

export const GraphView: React.FC = () => {
  const [expr, setExpr] = useState<string>('x^2 - 4');
  const [xMin, setXMin] = useState<number>(-5);
  const [xMax, setXMax] = useState<number>(5);
  const [yMin, setYMin] = useState<number>(-6);
  const [yMax, setYMax] = useState<number>(6);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);

  const presets = [
    { label: 'x² − 4', fn: 'x^2 - 4' },
    { label: 'sin(x)', fn: 'sin(x)' },
    { label: 'cos(x)', fn: 'cos(x)' },
    { label: 'x³ − 3x', fn: 'x^3 - 3*x' },
    { label: '1 / x', fn: '1/x' },
    { label: 'exp(x)', fn: 'exp(x)' },
    { label: '√x', fn: 'sqrt(x)' },
  ];

  // Canvas geometry
  const width = 640;
  const height = 380;
  const padding = 35;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toSvgY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const fromSvgX = (svgX: number) => xMin + ((svgX - padding) / (width - 2 * padding)) * (xMax - xMin);
  const fromSvgY = (svgY: number) => yMin + ((height - padding - svgY) / (height - 2 * padding)) * (yMax - yMin);

  // Compute curve points
  const { pathD, tableValues, roots } = useMemo(() => {
    const steps = 180;
    const stepSize = (xMax - xMin) / steps;
    const pts: { x: number; y: number }[] = [];
    const rootsFound: number[] = [];
    let prevY: number | null = null;
    let prevX = xMin;

    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * stepSize;
      const replaced = expr
        .replace(/([0-9])x/g, '$1*x')
        .replace(/x/g, `(${x})`);

      const res = evaluateExpression(replaced, 'RAD');
      if (res.success && res.result !== undefined && Number.isFinite(res.result)) {
        const y = res.result;
        pts.push({ x, y });

        // Sign change detection for approximate roots
        if (prevY !== null && Math.sign(prevY) !== Math.sign(y) && Math.abs(prevY - y) < (yMax - yMin) * 0.8) {
          const rootX = (prevX + x) / 2;
          rootsFound.push(Number(rootX.toFixed(2)));
        }
        prevY = y;
        prevX = x;
      } else {
        prevY = null;
      }
    }

    // Build SVG path
    let d = '';
    let drawing = false;

    for (const p of pts) {
      if (p.y >= yMin - 10 && p.y <= yMax + 10) {
        const sx = toSvgX(p.x);
        const sy = toSvgY(p.y);
        if (!drawing) {
          d += `M ${sx.toFixed(1)} ${sy.toFixed(1)} `;
          drawing = true;
        } else {
          d += `L ${sx.toFixed(1)} ${sy.toFixed(1)} `;
        }
      } else {
        drawing = false;
      }
    }

    // Discrete sample table values (-3, -2, -1, 0, 1, 2, 3)
    const tableVals: { x: number; y: string }[] = [];
    for (let k = Math.ceil(xMin); k <= Math.floor(xMax); k++) {
      const rep = expr.replace(/([0-9])x/g, '$1*x').replace(/x/g, `(${k})`);
      const r = evaluateExpression(rep, 'RAD');
      tableVals.push({
        x: k,
        y: r.success && r.result !== undefined && Number.isFinite(r.result) ? r.result.toFixed(3) : 'Non défini',
      });
    }

    return { pathD: d, tableValues: tableVals.slice(0, 11), roots: rootsFound };
  }, [expr, xMin, xMax, yMin, yMax]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const svgY = ((e.clientY - rect.top) / rect.height) * height;

    if (svgX >= padding && svgX <= width - padding && svgY >= padding && svgY <= height - padding) {
      const x = fromSvgX(svgX);
      const replaced = expr.replace(/([0-9])x/g, '$1*x').replace(/x/g, `(${x})`);
      const res = evaluateExpression(replaced, 'RAD');
      if (res.success && res.result !== undefined) {
        setHoverCoord({ x: Number(x.toFixed(2)), y: Number(res.result.toFixed(2)) });
      }
    } else {
      setHoverCoord(null);
    }
  };

  const handleZoom = (factor: number) => {
    setXMin((prev) => prev * factor);
    setXMax((prev) => prev * factor);
    setYMin((prev) => prev * factor);
    setYMax((prev) => prev * factor);
  };

  const handleResetZoom = () => {
    setXMin(-5);
    setXMax(5);
    setYMin(-6);
    setYMax(6);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Function input bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <LineChart className="w-5 h-5 text-sky-400" />
              <span>Traceur de Graphe de Fonctions 2D</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Visualisez n'importe quelle fonction f(x) sur le plan cartésien</p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleZoom(0.75)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Zoom avant (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(1.33)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Zoom arrière (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Réinitialiser l'échelle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sky-400 text-base">f(x) =</span>
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
            placeholder="Ex : x^2 - 4, sin(x), 2*x + 1..."
          />
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400">Exemples rapides :</span>
          {presets.map((p) => (
            <button
              key={p.fn}
              onClick={() => setExpr(p.fn)}
              className={`px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                expr === p.fn ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
        <div className="w-full relative overflow-hidden flex justify-center">
          <svg
            className="w-full max-w-2xl bg-slate-950 rounded-xl border border-slate-800 cursor-crosshair"
            viewBox={`0 0 ${width} ${height}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverCoord(null)}
          >
            {/* Grid Lines */}
            {[-4, -2, 0, 2, 4].map((gridX) => {
              if (gridX <= xMin || gridX >= xMax) return null;
              const sx = toSvgX(gridX);
              return (
                <line
                  key={`gx-${gridX}`}
                  x1={sx}
                  y1={padding}
                  x2={sx}
                  y2={height - padding}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              );
            })}
            {[-4, -2, 0, 2, 4].map((gridY) => {
              if (gridY <= yMin || gridY >= yMax) return null;
              const sy = toSvgY(gridY);
              return (
                <line
                  key={`gy-${gridY}`}
                  x1={padding}
                  y1={sy}
                  x2={width - padding}
                  y2={sy}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              );
            })}

            {/* X Axis */}
            {yMin <= 0 && yMax >= 0 && (
              <line
                x1={padding}
                y1={toSvgY(0)}
                x2={width - padding}
                y2={toSvgY(0)}
                stroke="#64748b"
                strokeWidth="2"
              />
            )}

            {/* Y Axis */}
            {xMin <= 0 && xMax >= 0 && (
              <line
                x1={toSvgX(0)}
                y1={padding}
                x2={toSvgX(0)}
                y2={height - padding}
                stroke="#64748b"
                strokeWidth="2"
              />
            )}

            {/* Axis Labels */}
            <text x={width - padding + 5} y={toSvgY(0) + 4} fill="#94a3b8" fontSize="11" fontFamily="monospace">
              X
            </text>
            <text x={toSvgX(0) - 4} y={padding - 10} textAnchor="end" fill="#94a3b8" fontSize="11" fontFamily="monospace">
              Y
            </text>

            {/* Function Curve */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Hover Crosshair Point */}
            {hoverCoord && (
              <>
                <circle
                  cx={toSvgX(hoverCoord.x)}
                  cy={toSvgY(hoverCoord.y)}
                  r="5"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>
        </div>

        {/* Live Coordinate Inspector */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 pt-3">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-sky-400" />
            <span>
              {hoverCoord ? (
                <strong className="text-white">x = {hoverCoord.x} , y = {hoverCoord.y}</strong>
              ) : (
                'Survolez le graphe pour inspecter les coordonnées'
              )}
            </span>
          </div>
          <div>
            Étendue : [{xMin.toFixed(1)} à {xMax.toFixed(1)}]
          </div>
        </div>
      </div>

      {/* Discrete Table of Values */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Tableau de valeurs de la fonction
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th className="py-2 px-3">x</th>
                {tableValues.map((v) => (
                  <th key={v.x} className="py-2 px-2 text-sky-400">
                    {v.x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-slate-900/60 text-slate-200 divide-x divide-slate-800">
              <tr>
                <td className="py-2 px-3 font-bold text-slate-400">f(x)</td>
                {tableValues.map((v) => (
                  <td key={v.x} className="py-2 px-2">
                    {v.y}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
