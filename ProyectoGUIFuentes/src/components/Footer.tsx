export function Footer() {
  return (
    <footer className="mt-6 text-sm text-slate-500">
      {" "}
      <p>
        {" "}
        Nota: Esta interfaz genera el archivo .dzn listo para ejecutarse con
        MiniZinc. Para ejecutar con MiniZinc desde el navegador es necesario
        tener instalado Minizinc para poder ejecutar el solver en el servidor.{" "}
      </p>{" "}
      <p className="mt-2">
        {" "}
        Archivo informe de referencia del proyecto subido como:{" "}
        <code>Informe_MPII.pdf</code>{" "}
      </p>{" "}
    </footer>
  );
}
