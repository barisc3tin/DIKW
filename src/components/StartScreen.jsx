import { LOGO_SRC } from "../constants";

/**
 * Start screen styled like the bitebulbs example:
 * - Large centered logo (no stretching, object-contain) with a soft glow
 * - Minimal dark background
 * - Green outline Start button (rounded)
 * - Optional credit line under the button
 *
 * Tweak TEXT_TITLE / TEXT_CREDIT below to your liking.
 */
const TEXT_TITLE = ""; // e.g. "DIKW Sorter" (leave empty if your logo already contains text)
const TEXT_CREDIT = "DIKW Sorter™ by Barış Çetin © "; // change or empty "" to hide

export default function StartScreen({ onStart, onShuffle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 font-sans">
      <div className="flex flex-col items-center px-6 py-10">
        {/* Logo + glow */}
        <div className="relative mb-6">
          {/* subtle emerald glow */}
          <div className="absolute -inset-6 rounded-2xl bg-emerald-400/10 blur-3xl" />
          <div className="relative w-56 h-56 md:w-64 md:h-64 grid place-items-center rounded-2xl overflow-hidden bg-slate-800/40 border border-slate-700/60 shadow-2xl">
            {LOGO_SRC ? (
              <img
                src={LOGO_SRC}
                alt="Logo"
                className="max-w-[90%] max-h-[90%] object-contain"
              />
            ) : (
              <div className="text-7xl leading-none">💡</div>
            )}
          </div>
        </div>

        {/* Optional title text (many logos already include text) */}
        {TEXT_TITLE ? (
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            {TEXT_TITLE}
          </h1>
        ) : null}

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="px-8 py-3 rounded-full text-lg font-semibold text-emerald-300 border-2 border-emerald-500 hover:bg-emerald-500/10 transition-colors"
          >
            Start
          </button>


        </div>

        {/* Credit (optional) */}
        {TEXT_CREDIT ? (
          <p className="mt-6 text-sm text-slate-300">{TEXT_CREDIT}</p>
        ) : null}
      </div>
    </div>
  );
}
