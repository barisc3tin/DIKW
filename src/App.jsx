import { useMemo, useState } from "react";
import { buildRandomItems } from "./game/items";

import StartScreen from "./components/StartScreen";
import HeaderBar from "./components/HeaderBar";
import Pyramid from "./components/Pyramid";
import Pool from "./components/Pool";
import CelebrationOverlay from "./components/CelebrationOverlay";

export default function App() {
  const [started, setStarted] = useState(false);
  const [items, setItems] = useState(() => buildRandomItems());
  const [placements, setPlacements] = useState({}); // itemId -> section
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({}); // itemId -> "correct" | "wrong"
  const [celebrate, setCelebrate] = useState(false);
  const [lastScore, setLastScore] = useState(0);

  const total = items.length;
  const placedCount = useMemo(
    () => Object.values(placements).filter(Boolean).length,
    [placements]
  );

  const unplaced = useMemo(
    () => items.filter((it) => !placements[it.id]),
    [items, placements]
  );

  const score = useMemo(() => {
    const correct = Object.values(results).filter((r) => r === "correct").length;
    return Math.round((correct / total) * 100) || 0;
  }, [results, total]);

  const hardReset = () => {
    setItems(buildRandomItems());
    setPlacements({});
    setChecked(false);
    setResults({});
    setStarted(false);
    setCelebrate(false);
    setLastScore(0);
  };

  const softReset = () => {
    setItems(buildRandomItems());
    setPlacements({});
    setChecked(false);
    setResults({});
    setCelebrate(false);
    setLastScore(0);
  };

  const onDragStart = (e, id) => {
    if (checked) return;
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDropToSection = (e, section) => {
    if (checked) return;
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    setPlacements((prev) => ({ ...prev, [id]: section }));
  };

  const onCheck = () => {
    const next = {};
    let correct = 0;
    for (const it of items) {
      const placed = placements[it.id];
      if (!placed) continue;
      const ok = placed === it.answer;
      next[it.id] = ok ? "correct" : "wrong";
      if (ok) correct++;
    }
    const newScore = Math.round((correct / total) * 100) || 0;
    setResults(next);
    setChecked(true);
    setLastScore(newScore);
    if (newScore > 60) setCelebrate(true);
  };

  // --- Option B: Start screen wrapped with the same app shell
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-200 font-sans">
        <StartScreen onStart={() => setStarted(true)} onShuffle={hardReset} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-200 font-sans">
      <HeaderBar placedCount={placedCount} total={total} checked={checked} score={score} />

      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-1">
        <Pyramid
          items={items}
          placements={placements}
          checked={checked}
          results={results}
          onDropToSection={onDropToSection}
          onDragStart={onDragStart}
        />

        <Pool
          unplacedItems={unplaced}
          checked={checked}
          onDragStart={onDragStart}
          onCheck={onCheck}
          onReset={softReset}
          canCheck={placedCount === total && !checked}
        />
      </main>

      <footer className="px-4 py-3 border-t border-slate-800 bg-slate-950/80 text-center">
        <small>
          Place all items, then press <strong>Check Answers</strong>. Correct = green, Incorrect = red. Score is out of 100.
        </small>
      </footer>

      {celebrate && (
        <CelebrationOverlay score={lastScore} onClose={() => setCelebrate(false)} />
      )}
    </div>
  );
}
