import { useState } from "react";
import type { InstanceData } from "../types/InstanceTypes";

export function useInstanceState() {
  const [instance, setInstance] = useState<InstanceData>({
    n: 10,
    m: 3,
    pi: "8,0,2",
    v: "0.297,0.673,0.809",
    sRaw: "3,3,2;0,2,0;0,0,0",
    ct: 25,
    maxMovs: 5,
  });

  return { instance, setInstance };
}
