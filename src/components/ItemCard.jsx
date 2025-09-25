export default function ItemCard({
  item,
  checked,
  result,            // "correct" | "wrong" | undefined
  draggable,
  onDragStart,
  showBubbleWhenWrong = false, // show "Correct: X" balloon
}) {
  const borderClass = checked
    ? result === "correct"
      ? "border-green-600 border-2 cursor-default"
      : "border-red-600 border-2 cursor-default"
    : "border-slate-600 cursor-grab";

  return (
    <div className="relative">
      <div
        className={`bg-slate-800 border rounded-lg px-2.5 py-1.5 shadow-md select-none max-w-[240px] ${borderClass}`}
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
