// Use string concat with BASE_URL (it's a path), not new URL()
const base = import.meta.env.BASE_URL || '/';
export const LOGO_SRC = base.endsWith('/')
  ? `${base}logo.png`
  : `${base}/logo.png`;

export const SECTIONS = ["Data", "Information", "Knowledge", "Wisdom"];
