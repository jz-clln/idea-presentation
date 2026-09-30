export const cn = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(" ");

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);

export const pad2 = (n: number): string => String(n).padStart(2, "0");

/** Strip shared indentation from template-literal speaker notes. */
export function dedent(input?: string): string {
  if (!input) return "";
  const lines = input.replace(/\t/g, "  ").split("\n");
  while (lines.length && !lines[0]?.trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1]?.trim()) lines.pop();
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)?.[0].length ?? 0);
  const indent = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(indent).trimEnd()).join("\n");
}

export function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
}
