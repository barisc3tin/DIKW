import { SECTIONS } from "../constants";
import { randInt, pick, shuffle } from "../utils/random";

/** Build 20 NEW random items (5 per DIKW tier) on each call */
export function buildRandomItems() {
  const dataPhrases = [
    () => `${randInt(1, 99)}, ${randInt(1, 99)}, ${randInt(1, 99)}`,
    () => `Sensor ${randInt(1000, 9999)}: ${randInt(15, 32)}°C`,
    () => `Clicks: ${randInt(100, 5000)}`,
    () => `ID=${randInt(10000, 99999)}`,
    () => `Timestamp: ${Date.now() % 100000}`,
  ];
  const infoPhrases = [
    () => `Avg temp today is ${randInt(18, 28)}°C`,
    () => `Page A got ${randInt(800, 5000)} clicks`,
    () => `Sales rose ${randInt(1, 12)}% this week`,
    () => `Attendance was ${randInt(85, 99)}%`,
    () => `Peak traffic at ${pick(["08:00", "12:00", "18:00"])}`,
  ];
  const knowledgePhrases = [
    () => `Clicks spike after ${pick(["emails", "push alerts", "posts"])}`,
    () => `${pick(["Colder rooms", "Noise"])} reduce focus`,
    () => `Practice improves scores`,
    () => `${pick(["Rain", "Heat"])} lowers foot traffic`,
    () => `Morning study > late night`,
  ];
  const wisdomPhrases = [
    () => `Prioritize student well-being`,
    () => `Design for accessibility first`,
    () => `Invest in teacher training`,
    () => `Choose sustainable options`,
    () => `Data informs, people decide`,
  ];

  const makers = [
    dataPhrases.map((fn) => ({ fn, answer: "Data" })),
    infoPhrases.map((fn) => ({ fn, answer: "Information" })),
    knowledgePhrases.map((fn) => ({ fn, answer: "Knowledge" })),
    wisdomPhrases.map((fn) => ({ fn, answer: "Wisdom" })),
  ];

  const items = [];
  let id = 1;
  for (const bucket of makers) {
    for (let i = 0; i < 5; i++) {
      const p = pick(bucket);
      items.push({ id: `i${id++}`, label: p.fn(), answer: p.answer });
    }
  }
  return shuffle(items);
}
