---
description: Úsame cuando falte información del código, la estructura, los
             patrones, las convenciones o la normativa del dominio para
             responder con precisión. Soy transversal y otras skills me invocan.
---

# buscar-contexto

Tu trabajo es reunir el contexto necesario antes de interpretar, planificar o ejecutar.

## Pasos
1. Analizá `#codebase` para identificar: framework, estructura de carpetas, convenciones de nombres y patrones de código relevantes al pedido.
2. Cargá la normativa de dominio que aplique:
   - `#file:docs/contexto-seguridad-vial.md`
   - `#file:docs/contexto-ssa.md`
   - `#file:docs/contexto-ambiente.md`
3. Identificá los archivos del proyecto que probablemente se vinculan al pedido.
4. Detectá restricciones técnicas o normativas que condicionen la solución.

## Formato de salida
- **Tecnologías / patrones relevantes:** …
- **Archivos vinculados:** …
- **Normativa aplicable:** …
- **Restricciones a respetar:** …

## Encadenamiento
- Devolvé el contexto a la skill que me invocó.
- Si me llamaron directamente y el pedido es una necesidad del cliente, sugerí continuar con `interpretar-requisitos`.