# FADA_II_SUBJECT_PROJECT_II

#### Descripción

El backend se encarga de:

Recibir desde el frontend una instancia del problema en formato .dzn

Ejecutar el modelo Proyecto.mzn utilizando MiniZinc

Retornar la salida del solver al frontend

Guardar la solución generada en un archivo de texto (solucion.txt) para cumplir con la rúbrica del proyecto

El backend no genera la instancia, solo la ejecuta.
La generación del archivo .dzn se realiza en el frontend.


# Tecnologías utilizadas

- Node.js
- Express
- MiniZinc (solver Gecode)
- fs (sistema de archivos)
- child_process (ejecución del solver)

# 1. Requisitos
Asegurarse de tener instalado:

| Software | Versión recomendada  |
| -------- | -------------------- |
| Node.js  | ≥ 18.0               |
| npm      | ≥ 9.0                |
| MiniZinc | ≥ 2.7 (solo backend) |

MiniZinc debe estar instalado en el sistema para que el backend pueda ejecutar el modelo.

# Estructura

backend/
├── Proyecto.mzn          # Modelo MiniZinc
├── DatosProyecto.dzn     # Instancia actual (sobrescrita en cada ejecución)
├── salidas/
│   └── solucion.txt      # Archivo de salida generado
├── server.ts              # Servidor Express


# 2. Instalación
Si ya se clono el repositorio, ingresar al directorio backend
´´´
git clone https://github.com/JhonierM14/FADA_II_SUBJECT_PROJECT_II
cd backend
´´´

Instalar dependencias:
´´´
npm install
´´´

# 3. Ejecutar en modo desarrollo

´´´
npm run dev
´´´

# Funcionamiento del backend
El frontend envía una instancia .dzn mediante una petición POST a /run

El backend:

- Guarda el contenido recibido en DatosProyecto.dzn
- Ejecuta MiniZinc con el modelo Proyecto.mzn
- Captura la salida estándar del solver

La salida:

- Se envía al frontend para su visualización
- Se guarda en salidas/solucion.txt en el formato exigido por la rúbrica

El archivo DatosProyecto.dzn se sobrescribe en cada ejecución, ya que representa únicamente la instancia actual que se está resolviendo.
