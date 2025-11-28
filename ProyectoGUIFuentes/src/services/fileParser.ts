import type { InstanceData } from "../types/InstanceTypes";

export function parseInstanceTxt(text: string): InstanceData {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 5) {
    throw new Error("El archivo es demasiado corto o está mal formateado.");
  }

  const n = Number(lines[0]);
  const m = Number(lines[1]);
  const pi = lines[2];
  const v = lines[3];

  const sLines = lines.slice(4, 4 + m);
  const sRaw = sLines.join(";");

  const ct = Number(lines[4 + m]);
  const maxMovs = Number(lines[5 + m]);

  return { n, m, pi, v, sRaw, ct, maxMovs };
}
