---
description: Úsame cuando exista un plan de trabajo ya aprobado y haya que
             aplicar los cambios en el código siguiendo ese plan.
---

# ejecutar-planificacion

Aplicás en el código las tareas de un plan aprobado, una por una.

## Precondición
- Debe existir un plan aprobado explícitamente. Si no existe, invocá `planificar`.
- Si te falta detalle del código para aplicar un cambio, invocá `buscar-contexto`.
- No ejecutes sin la confirmación "continuar".

## Pasos
1. Tomá la primera tarea pendiente del plan.
2. Aplicá los cambios en los archivos indicados respetando convenciones y normativa del dominio.
3. Mostrá el `git diff` de lo modificado.
4. Ejecutá los tests / validaciones definidos para esa tarea.
5. Reportá el resultado y referenciá el requisito de origen.
6. Pausá antes de pasar a la siguiente tarea para revisión humana.

## Formato de salida por tarea
```
### Tarea ejecutada: [nombre]
- Requisito origen: …
- Archivos modificados: …
- Resumen del diff: …
- Resultado de tests: …
- Estado: completada / requiere revisión
```

## Reglas
- Una tarea por vez. No encadenes cambios sin mostrar resultados intermedios.
- Si un test falla o aparece un riesgo no previsto, detené la ejecución y reportá.

## Encadenamiento
- Al completar todas las tareas, generá un resumen final con la lista de cambios aplicados y las vistas / archivos a revisar.