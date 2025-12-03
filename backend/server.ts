import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

const commonPaths = [
  "C:\\\\Program Files\\\\MiniZinc\\\\minizinc.exe",
  "C:\\\\Program Files\\\\MiniZinc IDE (bundled)\\\\bin\\\\minizinc.exe",
  "C:\\\\Program Files (x86)\\\\MiniZinc\\\\minizinc.exe"
];

let MINIZINC = null;

for (const path of commonPaths) {
  if (fs.existsSync(path)) {
    MINIZINC = `"${path}"`;
    console.log("MiniZinc encontrado en:", path);
    break;
  }
}

if (!MINIZINC) {
  MINIZINC = "minizinc";
  console.log("MiniZinc no encontrado en rutas típicas. Se usará PATH del sistema.");
}

app.post("/run", (req, res) => {
  try {
    const { dzn } = req.body;

    if (!dzn || dzn.trim() === "") {
      return res.status(400).send("Error: No se recibió contenido .dzn");
    }

    const dznPath = "DatosProyecto.dzn";
    fs.writeFileSync(dznPath, dzn);

    const modelPath = "Proyecto.mzn";

    if (!fs.existsSync(modelPath)) {
      return res.status(500).send("Error: No se encuentra Proyecto.mzn en el backend.");
    }

    const command = `${MINIZINC} "${modelPath}" "${dznPath}" --solver gecode`;

    console.log("Ejecutando:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error ejecutando MiniZinc:", error);
        return res.status(500).send(
          "Error ejecutando MiniZinc. " +
          "Asegúrate de que esté instalado.\n\n" +
          "stderr:\n" + stderr
        );
      }

      res.send(stdout);
    });
  } catch (e) {
    console.error("Excepción en /run:", e);
    res.status(500).send("Error interno del servidor.");
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend MiniZinc corriendo en http://localhost:${PORT}`)
);
