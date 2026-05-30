---
description: Úsame cuando llegue un pedido del cliente, una necesidad de
             negocio o una descripción de feature en lenguaje no técnico
             que haya que traducir a especificación técnica.
---

# interpretar-requisitos

Recibís un listado de tareas o pedidos del cliente en lenguaje natural.

## Precondición
Si no tenés contexto suficiente del proyecto o del dominio, invocá primero `buscar-contexto` y usá su salida.

## Pasos
1. Separá cada requisito de forma individual.
2. Traducí cada uno a lenguaje técnico claro y verificable.
3. Indicá los archivos del proyecto que probablemente se afectan.
4. Detectá ambigüedades o puntos que necesiten aclaración.
5. Asigná complejidad estimada: baja / media / alta.

## Formato de salida
```
## Requisito 1: [nombre corto]
- Descripción técnica: …
- Archivos afectados: …
- Normativa aplicable: …
- Ambigüedades: …
- Complejidad: …
```

## Reglas
- Si hay más de 5 requisitos, interpretá los primeros 3 y avisá para continuar.
- Si hay ambigüedades, listalas y pedí aclaración antes de cerrar la salida.

## Encadenamiento
- Al terminar, ofrecé continuar con `planificar` usando estos requisitos como insumo.