interface Props {
  result: string;
}

export function OutputPanel({ result }: Props) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Salida del modelo</h3>
      <div className="h-44 overflow-auto bg-black text-green-200 p-3 rounded">
        <pre className="text-xs">{result}</pre>
      </div>
    </div>
  );
}
