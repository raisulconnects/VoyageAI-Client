// Destination categories (matches the server's enum). Colour is always paired with the word.
export const CATEGORIES = [
  { name: "Cultural", glyph: "spiral", color: "#b8232f", question: "Temples, museums and old quarters" },
  { name: "Historical", glyph: "steps", color: "#d99a1e", ink: true, question: "Ruins and centuries of story" },
  { name: "Nature", glyph: "squares", color: "#1f6a4a", question: "Parks, trails and wildlife" },
  { name: "Adventure", glyph: "bars", color: "#161412", question: "Treks and big landscapes" },
  { name: "Urban", glyph: "ring", color: "#7a4a2a", question: "Cities that never sit still" },
  { name: "Romantic", glyph: "spiral", color: "#961b25", question: "Coastlines and long dinners" },
  { name: "Tropical", glyph: "squares", color: "#e0b54a", ink: true, question: "Warm water and slow days" },
];

export function categoryMeta(name) {
  return CATEGORIES.find((c) => c.name === name) || { name, glyph: "squares", color: "#5f5649" };
}
