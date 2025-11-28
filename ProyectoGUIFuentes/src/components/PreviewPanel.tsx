interface Props {
  preview: string;
}

export function PreviewPanel({ preview }: Props) {
  return (
    <div className="flex-1 overflow-auto bg-slate-50 border rounded p-3">
      <pre className="text-sm">
        {preview || "Preview vacío — genere el .dzn"}
      </pre>
    </div>
  );
}
