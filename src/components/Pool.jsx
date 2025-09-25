import ItemCard from "./ItemCard";

export default function Pool({
  unplacedItems,
  checked,
  onDragStart,
  onCheck,
  onReset,
  canCheck,
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-bold text-white ${
            canCheck ? "bg-blue-600 hover:bg-blue-500 cursor-pointer" : "bg-blue-600/60 cursor-not-allowed"
          }`}
          disabled={!canCheck}
          onClick={onCheck}
        >
          Check Answers
        </button>
        <button
          className="px-4 py-2 rounded-lg font-semibold border border-slate-600 hover:bg-slate-800"
          onClick={onReset}
        >
          Reset
        </button>
      </div>

      <div
        aria-label="unplaced items"
        className="flex flex-wrap gap-2 p-2 border border-dashed border-slate-700 rounded-xl min-h-[120px] bg-slate-950/70"
      >
        {unplacedItems.map((it) => (
          <ItemCard
            key={it.id}
            item={it}
            checked={checked}
            draggable={!checked}
            onDragStart={onDragStart}
          />
        ))}
        {unplacedItems.length === 0 && (
          <div className="opacity-70 italic">All items placed.</div>
        )}
      </div>
    </section>
  );
}
