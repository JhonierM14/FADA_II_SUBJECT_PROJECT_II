import type { InstanceData } from "../types/InstanceTypes";
import { buildDzn } from "./dznBuilder";

const API_URL = "http://localhost:3000/run";

export async function runMinizinc(data: InstanceData): Promise<string> {
  const dzn = buildDzn(data);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dzn }),
  });

  return await response.text();
}
