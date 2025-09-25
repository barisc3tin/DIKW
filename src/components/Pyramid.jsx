import { SECTIONS } from "../constants";
import ItemCard from "./ItemCard";

const widthClasses = ["w-11/12", "w-9/12", "w-7/12", "w-5/12"]; // bottom -> top

const sectionBg = (s) =>
  s === "Data"
    ? "bg-blue-100"
    : s === "Information"
    ? "bg-green-100"
    : s === "Knowledge"
    ? "bg-yellow-100"
    : "bg-amber-200"; // Wisdom

export default function Pyramid({
  items,
  placements,     // { [itemId]: section }
  checked,
  results,        // { [itemId]: "correct" | "wrong" }
  onDropToSection,
  onDragStart,
}) {
  const onAllowDrop = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <section className="flex items-center justify-center">
      <div className="relative w-full h-[520px] grid place-items-center">
        <div className="pyramid-triangle absolute w-4/5 h-[90%]" aria-hidden />
        <div className="relative w-full flex flex-col-reverse items-center gap-3">
          {SECTIONS.map((s, idx) => (
            <div
              key={s}
              onDragOver={onAllowDrop}
              onDrop={(e) => onDropToSection(e, s)}
              className={`border-2 border-dashed border-slate-700 rounded-xl shadow-xl p-2 flex flex-col items-stretch ${widthClasses[idx]} ${sectionBg(s)}`}
            >
              <div className="text-center font-bold text-slate-900 drop-shadow-sm">
                {s}
              </div>
              <div className="flex flex-wrap justify-center gap-2 min-h-16">
                {items
                  .filter((it) => placements[it.id] === s)
                  .map((it) => (
                    <ItemCard
                      key={it.id}
                      item={it}
                      checked={checked}
                      result={results[it.id]}
                      draggable={!checked}
                      onDragStart={onDragStart}
                      showBubbleWhenWrong
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
