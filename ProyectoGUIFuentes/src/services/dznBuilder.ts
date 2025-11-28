import type { InstanceData } from "../types/InstanceTypes";

export function buildDzn(data: InstanceData): string {
  const sRows = data.sRaw.split(";").map((r) => r.trim());

  return `n = ${data.n};
m = ${data.m};
pi = [${data.pi}];
v = [${data.v}];
s = array2d(1..${data.m},1..3, [
  ${sRows.join(",\n  ")}
]);
ct = ${data.ct};
maxMovs = ${data.maxMovs};
`;
}
