import React, { useState } from 'react';
import {
  calculateSquare,
  calculateRectangle,
  calculateTriangle,
  calculateCircle,
  calculateTrapezoid,
  calculateCube,
  calculateCuboid,
  calculateCylinder,
  calculateSphere,
  calculateCone,
  calculateAngles,
  solvePythagoras,
  calculateDistance2D,
} from '../utils/geometry';
import { Shapes, Box, Triangle, Compass } from 'lucide-react';

export const GeometryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'2d' | '3d' | 'pythagoras' | 'distance' | 'angles'>('2d');

  // 2D Shape Selection & State
  const [shape2D, setShape2D] = useState<'square' | 'rect' | 'triangle' | 'circle' | 'trapezoid'>('circle');
  const [sideSquare, setSideSquare] = useState<number>(6);
  const [rectL, setRectL] = useState<number>(8);
  const [rectW, setRectW] = useState<number>(5);
  const [triBase, setTriBase] = useState<number>(10);
  const [triHeight, setTriHeight] = useState<number>(6);
  const [circleRadius, setCircleRadius] = useState<number>(5);
  const [trapB, setTrapB] = useState<number>(12);
  const [trapb, setTrapb] = useState<number>(6);
  const [trapH, setTrapH] = useState<number>(4);

  // 3D Solid Selection & State
  const [solid3D, setSolid3D] = useState<'cube' | 'cuboid' | 'cylinder' | 'sphere' | 'cone'>('cylinder');
  const [cubeEdge, setCubeEdge] = useState<number>(4);
  const [cuboidL, setCuboidL] = useState<number>(6);
  const [cuboidW, setCuboidW] = useState<number>(4);
  const [cuboidH, setCuboidH] = useState<number>(5);
  const [cylRadius, setCylRadius] = useState<number>(3);
  const [cylHeight, setCylHeight] = useState<number>(8);
  const [sphRadius, setSphRadius] = useState<number>(5);
  const [coneRadius, setConeRadius] = useState<number>(4);
  const [coneHeight, setConeHeight] = useState<number>(9);

  // Angles State
  const [angleDeg, setAngleDeg] = useState<number>(45);

  // Pythagoras State
  const [pythMode, setPythMode] = useState<'find_c' | 'find_b'>('find_c');
  const [pythA, setPythA] = useState<number>(3);
  const [pythB, setPythB] = useState<number>(4);
  const [pythC, setPythC] = useState<number>(5);

  // Distance State
  const [distX1, setDistX1] = useState<number>(1);
  const [distY1, setDistY1] = useState<number>(2);
  const [distX2, setDistX2] = useState<number>(4);
  const [distY2, setDistY2] = useState<number>(6);

  // Computations
  let res2D = null;
  if (shape2D === 'square') res2D = calculateSquare(sideSquare);
  else if (shape2D === 'rect') res2D = calculateRectangle(rectL, rectW);
  else if (shape2D === 'triangle') res2D = calculateTriangle(triBase, triHeight);
  else if (shape2D === 'circle') res2D = calculateCircle(circleRadius);
  else if (shape2D === 'trapezoid') res2D = calculateTrapezoid(trapB, trapb, trapH);

  let res3D = null;
  if (solid3D === 'cube') res3D = calculateCube(cubeEdge);
  else if (solid3D === 'cuboid') res3D = calculateCuboid(cuboidL, cuboidW, cuboidH);
  else if (solid3D === 'cylinder') res3D = calculateCylinder(cylRadius, cylHeight);
  else if (solid3D === 'sphere') res3D = calculateSphere(sphRadius);
  else if (solid3D === 'cone') res3D = calculateCone(coneRadius, coneHeight);

  const angleResult = calculateAngles(angleDeg);

  let pythResult = null;
  let pythError = '';
  try {
    if (pythMode === 'find_c') {
      pythResult = solvePythagoras(pythA, pythB, undefined);
    } else {
      pythResult = solvePythagoras(pythA, undefined, pythC);
    }
  } catch (err: unknown) {
    pythError = err instanceof Error ? err.message : 'Erreur';
  }

  const distResult = calculateDistance2D(distX1, distY1, distX2, distY2);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub tabs */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('2d')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === '2d' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Figures Planes 2D
        </button>
        <button
          onClick={() => setActiveTab('3d')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === '3d' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Solides 3D
        </button>
        <button
          onClick={() => setActiveTab('pythagoras')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'pythagoras' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Théorème de Pythagore
        </button>
        <button
          onClick={() => setActiveTab('distance')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'distance' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Distance entre 2 points
        </button>
        <button
          onClick={() => setActiveTab('angles')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'angles' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Angles & Trigonométrie
        </button>
      </div>

      {/* 1. Figures 2D */}
      {activeTab === '2d' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Shapes className="w-5 h-5 text-sky-400" />
                  <span>Calcul d'Aires et Périmètres 2D</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Formules exactes et schémas géométriques vectoriels</p>
              </div>

              {/* Shape choices */}
              <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-semibold">
                {[
                  { id: 'square', label: 'Carré' },
                  { id: 'rect', label: 'Rectangle' },
                  { id: 'triangle', label: 'Triangle' },
                  { id: 'circle', label: 'Cercle' },
                  { id: 'trapezoid', label: 'Trapèze' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape2D(s.id as typeof shape2D)}
                    className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                      shape2D === s.id ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs based on shape */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shape2D === 'square' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Côté (c)</label>
                  <input
                    type="number"
                    value={sideSquare}
                    onChange={(e) => setSideSquare(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                </div>
              )}

              {shape2D === 'rect' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Longueur (L)</label>
                    <input
                      type="number"
                      value={rectL}
                      onChange={(e) => setRectL(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Largeur (l)</label>
                    <input
                      type="number"
                      value={rectW}
                      onChange={(e) => setRectW(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {shape2D === 'triangle' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Base (b)</label>
                    <input
                      type="number"
                      value={triBase}
                      onChange={(e) => setTriBase(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hauteur (h)</label>
                    <input
                      type="number"
                      value={triHeight}
                      onChange={(e) => setTriHeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {shape2D === 'circle' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rayon (r)</label>
                  <input
                    type="number"
                    value={circleRadius}
                    onChange={(e) => setCircleRadius(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                </div>
              )}

              {shape2D === 'trapezoid' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Grande Base (B)</label>
                    <input
                      type="number"
                      value={trapB}
                      onChange={(e) => setTrapB(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Petite Base (b)</label>
                    <input
                      type="number"
                      value={trapb}
                      onChange={(e) => setTrapb(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hauteur (h)</label>
                    <input
                      type="number"
                      value={trapH}
                      onChange={(e) => setTrapH(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results & SVG Diagram */}
          {res2D && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Résultats & Formules
                </h3>
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs text-slate-400">Aire de la figure :</div>
                  <div className="text-2xl font-bold font-mono text-sky-400">
                    {res2D.area.toLocaleString('fr-FR', { maximumFractionDigits: 4 })}
                  </div>
                  <div className="text-xs font-mono text-slate-500">{res2D.formulaArea}</div>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs text-slate-400">Périmètre / Circonférence :</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {res2D.perimeter.toLocaleString('fr-FR', { maximumFractionDigits: 4 })}
                  </div>
                  <div className="text-xs font-mono text-slate-500">{res2D.formulaPerimeter}</div>
                </div>
              </div>

              {/* Vector SVG Diagram */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[220px]">
                <svg className="w-48 h-48" viewBox="0 0 200 200">
                  {shape2D === 'square' && (
                    <rect x="40" y="40" width="120" height="120" rx="8" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />
                  )}
                  {shape2D === 'rect' && (
                    <rect x="25" y="55" width="150" height="90" rx="8" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />
                  )}
                  {shape2D === 'triangle' && (
                    <polygon points="100,30 170,165 30,165" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />
                  )}
                  {shape2D === 'circle' && (
                    <circle cx="100" cy="100" r="70" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />
                  )}
                  {shape2D === 'trapezoid' && (
                    <polygon points="60,50 140,50 180,150 20,150" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="3" />
                  )}
                  <text x="100" y="105" textAnchor="middle" fill="#bae6fd" fontSize="13" fontFamily="monospace" fontWeight="bold">
                    {res2D.shape}
                  </text>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Solides 3D */}
      {activeTab === '3d' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Box className="w-5 h-5 text-sky-400" />
                  <span>Volumes et Surfaces de Solides 3D</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Cube, pavé droit, cylindre, sphère et cône</p>
              </div>

              <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-semibold overflow-x-auto">
                {[
                  { id: 'cylinder', label: 'Cylindre' },
                  { id: 'cuboid', label: 'Pavé Droit' },
                  { id: 'sphere', label: 'Sphère' },
                  { id: 'cone', label: 'Cône' },
                  { id: 'cube', label: 'Cube' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSolid3D(s.id as typeof solid3D)}
                    className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      solid3D === s.id ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {solid3D === 'cuboid' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Longueur (L)</label>
                    <input
                      type="number"
                      value={cuboidL}
                      onChange={(e) => setCuboidL(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Largeur (l)</label>
                    <input
                      type="number"
                      value={cuboidW}
                      onChange={(e) => setCuboidW(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hauteur (h)</label>
                    <input
                      type="number"
                      value={cuboidH}
                      onChange={(e) => setCuboidH(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {solid3D === 'cube' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Arête (a)</label>
                  <input
                    type="number"
                    value={cubeEdge}
                    onChange={(e) => setCubeEdge(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                </div>
              )}

              {solid3D === 'cylinder' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Rayon (r)</label>
                    <input
                      type="number"
                      value={cylRadius}
                      onChange={(e) => setCylRadius(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hauteur (h)</label>
                    <input
                      type="number"
                      value={cylHeight}
                      onChange={(e) => setCylHeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                </>
              )}

              {solid3D === 'sphere' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rayon (r)</label>
                  <input
                    type="number"
                    value={sphRadius}
                    onChange={(e) => setSphRadius(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                </div>
              )}

              {solid3D === 'cone' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Rayon (r)</label>
                    <input
                      type="number"
                      value={coneRadius}
                      onChange={(e) => setConeRadius(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hauteur (h)</label>
                    <input
                      type="number"
                      value={coneHeight}
                      onChange={(e) => setConeHeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {res3D && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <div className="text-xs text-slate-400">Volume du solide :</div>
                <div className="text-3xl font-mono font-bold text-sky-400">
                  {res3D.volume.toLocaleString('fr-FR', { maximumFractionDigits: 4 })}
                </div>
                <div className="text-xs font-mono text-slate-500">{res3D.formulaVolume}</div>
              </div>

              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <div className="text-xs text-slate-400">Surface totale :</div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  {res3D.surfaceArea.toLocaleString('fr-FR', { maximumFractionDigits: 4 })}
                </div>
                <div className="text-xs font-mono text-slate-500">{res3D.formulaSurface}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Théorème de Pythagore */}
      {activeTab === 'pythagoras' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Triangle className="w-5 h-5 text-sky-400" />
                  <span>Théorème de Pythagore dans le triangle rectangle</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">a² + b² = c² (avec c l'hypoténuse)</p>
              </div>

              <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setPythMode('find_c')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    pythMode === 'find_c' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Calculer l'hypoténuse (c)
                </button>
                <button
                  onClick={() => setPythMode('find_b')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    pythMode === 'find_b' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Calculer un côté (b)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Côté adjacent a</label>
                <input
                  type="number"
                  value={pythA}
                  onChange={(e) => setPythA(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              {pythMode === 'find_c' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Côté adjacent b</label>
                  <input
                    type="number"
                    value={pythB}
                    onChange={(e) => setPythB(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hypoténuse c</label>
                  <input
                    type="number"
                    value={pythC}
                    onChange={(e) => setPythC(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {pythError ? (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-sm">
              {pythError}
            </div>
          ) : pythResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs text-slate-400">Longueur recherchée :</span>
                <span className="text-2xl font-mono font-bold text-sky-400">
                  {pythMode === 'find_c' ? `c = ${pythResult.hypotenuse.toFixed(4)}` : `b = ${pythResult.legB.toFixed(4)}`}
                </span>
              </div>
              <div className="space-y-1.5">
                {pythResult.steps.map((st, i) => (
                  <div key={i} className="text-xs font-mono text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                    {st}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Distance */}
      {activeTab === 'distance' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <span>Distance entre deux points cartésiens A(x₁, y₁) et B(x₂, y₂)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Application euclidienne d = √((x₂ - x₁)² + (y₂ - y₁)²)</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Point A : x₁</label>
                <input
                  type="number"
                  value={distX1}
                  onChange={(e) => setDistX1(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Point A : y₁</label>
                <input
                  type="number"
                  value={distY1}
                  onChange={(e) => setDistY1(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Point B : x₂</label>
                <input
                  type="number"
                  value={distX2}
                  onChange={(e) => setDistX2(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Point B : y₂</label>
                <input
                  type="number"
                  value={distY2}
                  onChange={(e) => setDistY2(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs text-slate-400">Distance euclidienne AB :</span>
              <span className="text-3xl font-mono font-bold text-sky-400">
                {distResult.distance.toFixed(4)}
              </span>
            </div>
            <div className="space-y-1.5">
              {distResult.steps.map((st, i) => (
                <div key={i} className="text-xs font-mono text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Calculs sur les angles & Trigonométrie */}
      {activeTab === 'angles' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <span>Calculs sur les Angles & Trigonométrie</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Conversion instantanée en radians et grades, angles complémentaires/supplémentaires et rapports trigonométriques.
              </p>
            </div>

            <div className="max-w-xs">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Angle en degrés (°)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="any"
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base font-bold"
                />
                <span className="text-slate-400 font-mono text-lg font-bold">°</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-400 mr-1">Angles remarquables :</span>
              {[0, 30, 45, 60, 90, 120, 180, 270, 360].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setAngleDeg(deg)}
                  className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                    angleDeg === deg
                      ? 'bg-sky-600 text-white border-sky-500'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Mesure en Radians (rad)</div>
              <div className="text-2xl font-mono font-bold text-sky-400">
                {angleResult.radians.toFixed(5)} <span className="text-sm font-normal text-slate-400">rad</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">θ × π / 180</div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Mesure en Grades (grad)</div>
              <div className="text-2xl font-mono font-bold text-indigo-400">
                {angleResult.grades.toFixed(4)} <span className="text-sm font-normal text-slate-400">grad</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">θ × 200 / 180</div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Complémentaire & Supplémentaire</div>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <div>
                  Complémentaire (90° - θ) :{' '}
                  <strong className="text-amber-400">
                    {angleResult.complementary !== undefined ? `${angleResult.complementary}°` : 'Non défini'}
                  </strong>
                </div>
                <div>
                  Supplémentaire (180° - θ) :{' '}
                  <strong className="text-emerald-400">
                    {angleResult.supplementary !== undefined ? `${angleResult.supplementary}°` : 'Non défini'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Lignes Trigonométriques pour {angleDeg}°
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Sinus sin({angleDeg}°) :</span>
                <div className="text-xl font-mono font-bold text-sky-400 mt-1">
                  {Math.abs(angleResult.sin) < 1e-12 ? '0' : angleResult.sin.toFixed(6)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Cosinus cos({angleDeg}°) :</span>
                <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                  {Math.abs(angleResult.cos) < 1e-12 ? '0' : angleResult.cos.toFixed(6)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Tangente tan({angleDeg}°) :</span>
                <div className="text-xl font-mono font-bold text-amber-400 mt-1">
                  {angleResult.tan === null ? 'Indéfinie (cos = 0)' : Math.abs(angleResult.tan) < 1e-12 ? '0' : angleResult.tan.toFixed(6)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
