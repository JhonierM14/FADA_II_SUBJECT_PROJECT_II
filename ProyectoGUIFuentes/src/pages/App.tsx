import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { parseInstanceTxt } from "../services/fileParser";
import { buildDzn } from "../services/dznBuilder";
import { runMinizinc } from "../services/minizincService";
import { useInstanceState } from "../hooks/useInstanceState";

import { Header } from "../components/Header";
import { ParamForm } from "../components/ParamForm";
import { OutputPanel } from "../components/OutPutPanel";
import { PreviewPanel } from "../components/PreviewPanel";
import { Footer } from "../components/Footer";

export default function App() {
  const { instance, setInstance } = useInstanceState();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<string>("Esperando ejecución...");

  function handleFileRead(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        const parsed = parseInstanceTxt(text);
        setInstance(parsed);
      }
    };
    reader.readAsText(file);
  }

  function triggerPick() {
    fileInputRef.current?.click();
  }

  function downloadDzn() {
    const dzn = buildDzn(instance);
    setPreview(dzn);

    const blob = new Blob([dzn], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "DatosProyecto.dzn";
    a.click();
  }

  async function run() {
    const output = await runMinizinc(instance);
    setResult(output);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <motion.div className="max-w-6xl mx-auto">
        <Header onPickFile={triggerPick} onDownload={downloadDzn} onRun={run} />

        <input
          type="file"
          accept=".txt"
          ref={fileInputRef}
          onChange={handleFileRead}
          className="hidden"
        />

        <main className="grid grid-cols-12 gap-6">
          <ParamForm instance={instance} setInstance={setInstance} />

          <section className="col-span-7 bg-white p-4 rounded-lg shadow flex flex-col">
            <h2 className="text-lg font-medium mb-3">
              Preview .dzn & Resultado
            </h2>

            <div className="flex gap-3 mb-3">
              <button
                onClick={() => setPreview(buildDzn(instance))}
                className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 transition-duration-300 cursor-pointer"
              >
                Generar preview
              </button>

              <button
                onClick={downloadDzn}
                className="px-3 py-2 bg-white border rounded hover:bg-gray-200 transition-duration-300 cursor-pointer"
              >
                Descargar .dzn
              </button>
            </div>

            <PreviewPanel preview={preview} />
            <OutputPanel result={result} />
          </section>
        </main>

        <Footer/>
      </motion.div>
    </div>
  );
}
