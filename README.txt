Proyecto II – Análisis y Diseño de Algoritmos
Minimización de la Polarización en una Población

Este archivo describe todos los elementos entregados en 
el proyecto y proporciona las instrucciones necesarias para 
ejecutar la aplicación completa.

1. Descripción general

Este proyecto implementa una solución al problema de minimización 
de la polarización en una población, considerando múltiples opiniones, 
distintos niveles de resistencia al cambio, un costo máximo permitido y 
una cantidad máxima de movimientos.

La entrega incluye el modelo de optimización en MiniZinc, 
un conjunto de instancias de prueba, una interfaz gráfica para 
la generación y ejecución de instancias, y la documentación 
requerida según el enunciado del proyecto.

%-----------------------------------------------------------%

2. Archivos entregados
2.1 Archivo Informe_MPII.pdf
Documento que presenta el desarrollo del proyecto conforme a la Sección 3.3 del enunciado.
Incluye:

- Formulación del problema
- Descripción del modelo
- Análisis de resultados

Dentro del informe se incluye el enlace al video de sustentación del proyecto.

2.2 Archivo Proyecto.mzn 
Archivo que contiene la implementación completa del modelo de optimización en MiniZinc.
Define:

- Parámetros de entrada
- Variables de decisión
- Restricciones del problema
- Función objetivo de minimización de la polarización
- Formato de salida exigido por el enunciado

2.3 Directorio DatosProyecto
Directorio que contiene los archivos .dzn utilizados para probar el modelo.
Estos archivos representan distintas instancias del problema y permiten reproducir los experimentos realizados durante el desarrollo del proyecto.

Cada archivo .dzn define valores para los parámetros del modelo, como número de personas, opiniones, resistencias, costos y límites de movimiento.

2.4 Directorio ProyectoGUIFuentes

Directorio que contiene los archivos fuente de la implementación de la interfaz gráfica del proyecto.

La interfaz permite:

- Crear instancias del problema de manera visual
- Generar archivos .dzn automáticamente
- Descargar instancias
- Ejecutar el modelo MiniZinc a través de un backend
- Visualizar los resultados obtenidos

Incluye su propio README.md con instrucciones técnicas específicas.

2.5 Directorio MisInstancias
Directorio que contiene (5) instancias del problema generadas por el equipo de trabajo.

Estas instancias están diseñadas para retar a otros proyectos que resuelvan el mismo problema y se entregan como archivos de entrada independientes.

%-----------------------------------------------------------%

3. Requisitos del sistema
Para ejecutar la aplicación se requiere:

- Node.js versión 18 o superior
- npm versión 9 o superior
- MiniZinc versión 2.7 o superior

%-----------------------------------------------------------%

4. Instrucciones de ejecución

Repositorio https://github.com/JhonierM14/FADA_II_SUBJECT_PROJECT_II

4.1 Ejecución del backend

- Ubicarse en el directorio del backend.
- Instalar las dependencias ejecutando:

npm install

- Iniciar el servidor con:

npm run dev

El backend quedará disponible en http://localhost:3000

4.2 Ejecución del frontend

- Ubicarse en el directorio ProyectoGUIFuentes.
- Instalar dependencias ejecutando:

npm install

- Ejecutar la aplicación en modo desarrollo con:

npm run dev

- Acceder desde el navegador a:

http://localhost:5173

%-----------------------------------------------------------%

5. Notas finales

- El archivo Proyecto.mzn utiliza el formato de salida exigido por el enunciado del proyecto.
- Los archivos .dzn pueden ejecutarse directamente con MiniZinc o a través de la interfaz gráfica.
- La salida generada por el modelo puede almacenarse en archivos .txt para cumplir con la rúbrica.

%-----------------------------------------------------------%
                        FIN DEL ARCHIVO
%-----------------------------------------------------------%