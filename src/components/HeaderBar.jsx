import { LOGO_SRC } from "../constants";

export default function HeaderBar({ placedCount, total, checked, score }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur">
      <div className="flex items-center text-lg">
        {LOGO_SRC ? (
          <div className="w-6 h-6 grid place-items-center overflow-hidden">
            <img src={LOGO_SRC} alt="Logo" className="max-w-full max-h-full object-contain" />
          </div>
        ) : (
          <span className="text-xl">💡</span>
        )}
        <strong className="ml-2">DIKW Sorter</strong>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-[width] duration-200"
            style={{ width: `${Math.round((placedCount / total) * 100)}%` }}
          />
        </div>
        <span className="tabular-nums">{placedCount}/{total}</span>
        {checked && <span className="font-bold">Score: {score}</span>}
      </div>
    </header>
  );
}
