---
description: Úsame cuando ya existan requisitos interpretados y haya que
             ordenarlos en un plan de trabajo con dependencias, archivos
             a modificar y estimaciones.
---

# planificar

Convertís requisitos técnicos ya interpretados en un plan de ejecución ordenado.

## Precondición
Si no tenés requisitos interpretados disponibles, invocá primero `interpretar-requisitos`.
Si te falta detalle del código para estimar, invocá `buscar-contexto`.

## Pasos
1. Definí el orden de ejecución según dependencias entre tareas.
2. Para cada tarea, listá los archivos a modificar y los cambios concretos.
3. Indicá los tests o validaciones necesarios.
4. Estimá complejidad y riesgo por tarea.
5. Marcá los puntos críticos que requieren revisión humana antes de tocar código.

## Formato de salida
```
## Plan de trabajo

### Tarea 1: [nombre] — complejidad / riesgo
- Requisito origen: …
- Archivos a modificar: …
- Cambios: …
- Tests / validación: …
- Dependencias: …
```

## Encadenamiento
- Al terminar, mostrá el plan completo y **esperá aprobación explícita** ("continuar") antes de pasar a `ejecutar-planificacion`.
- No invoques `ejecutar-planificacion` por tu cuenta sin esa confirmación.