export default function ItemCard({
  item,
  checked,
  result,                 // "correct" | "wrong" | undefined
  draggable,
  onDragStart,
  showBubbleWhenWrong = false,
  size = "md",            // NEW: "md" | "sm" | "xs" | "xxs"
}) {
  const borderClass = checked
    ? result === "correct"
      ? "border-green-600 border-2 cursor-default"
      : "border-red-600 border-2 cursor-default"
    : "border-slate-600 cursor-grab";

  // NEW: compact the card as the level gets denser
  const sizeClass =
    size === "md"  ? "text-sm px-2.5 py-1.5 max-w-[240px]" :
    size === "sm"  ? "text-[13px] px-2 py-1 max-w-[200px]" :
    size === "xs"  ? "text-xs px-1.5 py-1 max-w-[170px]" :
                     "text-[10px] px-1 py-0.5 max-w-[150px]"; // xxs

  return (
    <div className="relative">
      <div
        className={`bg-slate-800 border rounded-lg shadow-md select-none ${sizeClass} ${borderClass}`}
        draggable={draggable}
        onDragStart={(e) => onDragStart?.(e, item.id)}
        title={`Answer: ${item.answer}`}
      >
        {item.label}
      </div>

      {checked && result === "wrong" && showBubbleWhenWrong && (
        <div className="bubble" role="status" aria-live="polite">
          Correct: <strong>{item.answer}</strong>
        </div>
      )}
    </div>
  );
}
