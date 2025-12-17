% ================================================================
%  Proyecto.mzn
%  Modelo para “Minimizar la Polarización presente en una Población”
%
%  Este modelo describe cómo personas con diferentes opiniones
%  y distintos niveles de resistencia podrían moverse entre opiniones.
%  El objetivo es encontrar la redistribución que produzca la menor
%  polarización posible, siempre respetando un costo máximo permitido
%  y una cantidad máxima de movimientos.
% ================================================================


% ---------------------------------------------------------
% Parámetros de entrada
% ---------------------------------------------------------

int: m;                       % Cantidad de opiniones distintas.
int: n;                       % Total de personas en la población.

array[1..m] of int: pi;       % Personas que comienzan en cada opinión (suma = n).
array[1..m] of float: v;      % Valor numérico asociado a cada opinión
                              % (sirve para medir distancia ideológica).

% s[i,k] indica cuántas personas hay en la opinión i
% con resistencia k (k = 1 baja, 2 media, 3 alta).
array[1..m,1..3] of int: s;

float: ct;                    % Costo total máximo permitido para mover personas.
int: maxMovs;                 % Máxima cantidad de movimientos permitidos.
                              % Cada movimiento se cuenta como distancia entre opiniones.


% Costo según nivel de resistencia:
% personas con más resistencia cuestan más de mover.
array[1..3] of float: cost_k = [1.0, 1.5, 2.0];


% ---------------------------------------------------------
% Variables de decisión
% ---------------------------------------------------------

% x[k,i,j] indica cuántas personas con resistencia k
% se mueven desde la opinión i hacia la opinión j.
% Si j = i, significa que se quedan donde están.
% El solver decide estos valores para encontrar la distribución óptima.
array[1..3, 1..m, 1..m] of var 0..n: x;


% ---------------------------------------------------------
% Restricciones básicas del modelo
% ---------------------------------------------------------

% Todas las personas deben ser asignadas a algún destino.
% Para cada opinión i y cada resistencia k,
% el total de personas saliendo de i debe coincidir exactamente con s[i,k].
constraint
  forall(i in 1..m, k in 1..3)(
    sum(j in 1..m)( x[k,i,j] ) = s[i,k]
  );


% ---------------------------------------------------------
% Cálculo de la distribución final
% ---------------------------------------------------------

% final_count[j] representa cuántas personas terminan
% en la opinión j después de todos los movimientos.
array[1..m] of var 0..n: final_count;

constraint
  forall(j in 1..m)(
    final_count[j] = sum(i in 1..m, k in 1..3)( x[k,i,j] )
  );

% Para seguridad: la suma total de personas debe seguir siendo n.
constraint sum(j in 1..m)( final_count[j] ) = n;


% ---------------------------------------------------------
% Restricción de costo total permitido
% ---------------------------------------------------------

% El costo de mover personas depende:
% - de cuántas se mueven,
% - de qué tanta resistencia tienen,
% - de la distancia entre las opiniones origen i y destino j.
%
% Esta suma total no puede superar el costo máximo ct permitido.
constraint
  sum(k in 1..3, i in 1..m, j in 1..m)(
    x[k,i,j] * abs(i - j) * cost_k[k]
  ) <= ct + 1e-9;


% ---------------------------------------------------------
% Restricción de movimientos máximos
% ---------------------------------------------------------

% Aquí solo se cuenta la cantidad de movimientos como:
% distancia * número de personas.
% No considera la resistencia.
constraint
  sum(k in 1..3, i in 1..m, j in 1..m)(
    x[k,i,j] * abs(i - j)
  ) <= maxMovs;


% ---------------------------------------------------------
% Cálculo de la mediana en la distribución final
% ---------------------------------------------------------

% Primero construimos la suma acumulada cum[j].
%
% cum[j] indica cuántas personas tenemos acumuladas
% desde la opinión 1 hasta la opinión j.
%
% Esto sirve para localizar en qué opinión cae la persona número p.
% Esa posición es necesaria para encontrar la mediana.
array[1..m] of var 0..n: cum;

constraint cum[1] = final_count[1];

constraint
  forall(j in 2..m)(
    cum[j] = cum[j-1] + final_count[j]
  );


% ---------------------------------------------------------
% Posiciones p1 y p2 que representan la mediana
% ---------------------------------------------------------

% Si n es impar, p1 = p2 y hay una única mediana.
% Si n es par, p1 y p2 representan las dos posiciones centrales
% en la población ordenada.
%
% Ejemplo: para n=10, p1=5 y p2=6.
int: p1 = if n mod 2 = 1 then (n+1) div 2 else n div 2 endif;
int: p2 = if n mod 2 = 1 then (n+1) div 2 else n div 2 + 1 endif;


% idx_p1 y idx_p2 indican en qué opinión cae la persona
% que ocupa la posición p1 y p2 en la distribución final.
var 1..m: idx_p1;
var 1..m: idx_p2;


% Para encontrar idx_p1,
% revisamos cuál es el primer j en el que la suma acumulada cum[j]
% alcanza o supera la posición p1.
constraint
  forall(j in 1..m)(
    idx_p1 = j ->
      ( cum[j] >= p1 /\ (j == 1 \/ cum[j-1] < p1) )
  );

% Lo mismo para idx_p2.
constraint
  forall(j in 1..m)(
    idx_p2 = j ->
      ( cum[j] >= p2 /\ (j == 1 \/ cum[j-1] < p2) )
  );


% Ahora definimos el valor de la mediana:
% - si p1 = p2, solo tomamos la opinión idx_p1,
% - si son distintas (caso par), tomamos el promedio de ambas opiniones.
var float: median;

constraint
  if p1 = p2 then
    median = v[idx_p1]
  else
    median = ( v[idx_p1] + v[idx_p2] ) / 2.0
  endif;


% ---------------------------------------------------------
% Función objetivo: Polarización
% ---------------------------------------------------------

% La polarización se define como la suma de cuántas personas
% quedaron en cada opinión, multiplicado por la distancia
% entre el valor de esa opinión v[j] y la mediana encontrada.
%
% Mientras más alejadas estén las opiniones del centro (mediana),
% mayor será la polarización.
var float: Pol;

constraint
  Pol = sum(j in 1..m)(
          final_count[j] * abs( v[j] - median )
        );

solve minimize Pol;


output [
  % 1) Polarización 
  show(Pol), "\n",

  % 2) Nivel de resistencia baja
  "1\n",
  concat([
    concat([
      show(x[1,i,j]) ++ if j < m then "," else "" endif
      | j in 1..m
    ]) ++ "\n"
    | i in 1..m
  ]),

  % 3) Nivel de resistencia media
  "2\n",
  concat([
    concat([
      show(x[2,i,j]) ++ if j < m then "," else "" endif
      | j in 1..m
    ]) ++ "\n"
    | i in 1..m
  ]),

  % 4) Nivel de resistencia alta
  "3\n",
  concat([
    concat([
      show(x[3,i,j]) ++ if j < m then "," else "" endif
      | j in 1..m
    ]) ++ "\n"
    | i in 1..m
  ])
];

