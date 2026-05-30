# Instrucciones globales del proyecto

## Dominio
Proyecto de **gestión de flota y seguridad vial**. Todo cambio debe respetar las normativas de:
- Seguridad vial → `docs/contexto-seguridad-vial.md`
- SSA → `docs/contexto-ssa.md`
- Ambiente → `docs/contexto-ambiente.md`

Cargá el contexto de dominio que corresponda **antes** de proponer o ejecutar cambios.

## Skills disponibles y cuándo usarlas
Usá estas skills automáticamente según la situación. No esperes que te las invoque manualmente.

| Skill | Activala cuando… |
|---|---|
| `buscar-contexto` | Falte información del código, patrones, estructura o normativa para responder con precisión. |
| `interpretar-requisitos` | Llegue un pedido del cliente o una necesidad en lenguaje no técnico. |
| `planificar` | Ya existan requisitos interpretados y haya que ordenarlos en un plan de trabajo. |
| `ejecutar-planificacion` | Exista un plan aprobado y haya que aplicar los cambios en el código. |

## Flujo de trabajo (orquestación)
El flujo estándar es secuencial, pero cada skill puede llamar a otra si le falta su insumo:

```
necesidad del cliente
   → interpretar-requisitos   (si falta contexto, llama a buscar-contexto)
   → planificar               (si no hay requisitos interpretados, llama a interpretar-requisitos)
   → ejecutar-planificacion   (si no hay plan, llama a planificar)
```

`buscar-contexto` es transversal: cualquier skill puede invocarla cuando necesite más información del proyecto o del dominio.

## Reglas
1. **Una etapa por vez.** No avances a la siguiente skill sin completar y mostrar la salida de la actual.
2. **Pausa antes de ejecutar.** Nunca modifiques archivos sin que el plan haya sido aprobado explícitamente con "continuar".
3. **Trazabilidad.** Cada cambio debe referenciar el requisito que lo origina.
4. **Límite de contexto.** Si un pedido tiene más de 5 ítems, procesá los primeros 3 y avisá para continuar.
5. **Sin supuestos silenciosos.** Si hay ambigüedad, listala y pedí aclaración antes de seguir.