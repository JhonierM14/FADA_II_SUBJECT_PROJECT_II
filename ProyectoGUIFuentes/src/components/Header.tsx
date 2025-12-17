import { UploadCloud, Download, Play } from "lucide-react";

interface HeaderProps {
  onPickFile: () => void;
  onDownload: () => void;
  onRun: () => void;
}

export function Header({ onPickFile, onDownload, onRun }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold">
          MinPol — Minimización de Polarización
        </h1>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPickFile}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:shadow hover:bg-gray-200 transition-duration-300 cursor-pointer"
        >
          <UploadCloud size={16} /> Cargar archivo .txt
        </button>

        <button
          onClick={onDownload}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:shadow hover:bg-gray-200 transition-duration-300 cursor-pointer"
        >
          <Download size={16} /> Descargar .dzn
        </button>

        <button
          onClick={onRun}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-500 cursor-pointer"
        >
          <Play size={16} /> Ejecutar
        </button>
      </div>
    </header>
  );
}
