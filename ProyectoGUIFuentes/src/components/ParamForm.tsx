import type { InstanceData } from "../types/InstanceTypes";

interface Props {
  instance: InstanceData;
  setInstance: (data: InstanceData) => void;
}

export function ParamForm({ instance, setInstance }: Props) {
  return (
    <section className="col-span-5 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-3">Parametros de la Instancia</h2>

      <div className="space-y-3">
        {/** n */}
        <label className="block text-sm">n (total personas)</label>
        <input
          value={instance.n}
          onChange={(e) =>
            setInstance({ ...instance, n: Number(e.target.value) })
          }
          className="w-full border rounded px-3 py-2"
        />

        {/** m */}
        <label className="block text-sm">m (opiniones)</label>
        <input
          value={instance.m}
          onChange={(e) =>
            setInstance({ ...instance, m: Number(e.target.value) })
          }
          className="w-full border rounded px-3 py-2"
        />

        {/** pi */}
        <label className="block text-sm">p_i</label>
        <input
          value={instance.pi}
          onChange={(e) =>
            setInstance({ ...instance, pi: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />

        {/** v */}
        <label className="block text-sm">v_i</label>
        <input
          value={instance.v}
          onChange={(e) =>
            setInstance({ ...instance, v: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />

        {/** sRaw */}
        <label className="block text-sm">S (separada por ; )</label>
        <input
          value={instance.sRaw}
          onChange={(e) =>
            setInstance({ ...instance, sRaw: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        />

        {/** ct */}
        <label className="block text-sm">Costo máximo (ct)</label>
        <input
          value={instance.ct}
          onChange={(e) =>
            setInstance({ ...instance, ct: Number(e.target.value) })
          }
          className="w-full border rounded px-3 py-2"
        />

        {/** maxMovs */}
        <label className="block text-sm">maxMovs</label>
        <input
          value={instance.maxMovs}
          onChange={(e) =>
            setInstance({ ...instance, maxMovs: Number(e.target.value) })
          }
          className="w-full border rounded px-3 py-2"
        />
      </div>
    </section>
  );
}
