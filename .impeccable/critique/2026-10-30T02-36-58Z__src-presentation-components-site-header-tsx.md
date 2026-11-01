---
target: header con navegación y CTA
total_score: 27
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-10-30T02-36-58Z
slug: src-presentation-components-site-header-tsx
---
## Dirección visual

El encabezado responde a la identidad de Agencsi: navegación compacta, paleta sobria, luna minimalista y una CTA magenta clara. La composición se acerca a la referencia, pero necesita mayor precisión en altura, estados de navegación y experiencia móvil.

## Fortalezas

- La combinación de IBM Plex Sans en navegación y Libre Baskerville para marca/titulares se siente institucional y propia.
- La jerarquía de marca, navegación y CTA funciona bien en escritorio.
- Blanco, tinta profunda y magenta forman una paleta disciplinada; el icono de tema no compite con la acción principal.

## Prioridades

### P1 — Ajustar la altura a la referencia

`site-header.tsx` usa `min-h-[76px]`, mientras que la referencia se percibe cercana a 68px. Reducir solo la altura y conservar el tamaño tipográfico actual.

### P1 — Completar el patrón accesible del submenú

El disparador de Líneas de negocio no declara `aria-controls`/`aria-haspopup`, ni cierra con Escape o al perder foco. Convertirlo en un disclosure coherente y devolver foco al disparador al cerrar.

### P1 — Mantener Conversemos disponible en móvil

En móvil la CTA desaparece por completo. Debe permanecer accesible, por ejemplo dentro del menú como último elemento visualmente destacado o como una CTA compacta junto al menú.

### P2 — Mostrar el estado de sección actual

Los enlaces principales no indican la sección activa al hacer scroll. Añadir un estado sutil de color o subrayado para orientar la lectura de una landing extensa.

### P2 — Corregir el cierre y el contexto móvil

Al cerrar el menú móvil, el estado interno de Líneas de negocio puede persistir. Además, el panel se superpone de manera abrupta al hero. Cerrar ambos estados juntos y usar una transición corta o una superficie separada.

### P3 — Simplificar las reglas de tema

Las excepciones con `!important` del tema claro funcionan pero vuelven frágiles los estados de hover y foco. Conviene aplicar variantes de Tailwind directamente a los elementos del header.

## Personas

- **Jordan, primera visita:** comprende de inmediato la propuesta, pero en móvil puede no descubrir cómo llegar a contacto.
- **Riley, decisor comparativo:** percibe una marca sólida, pero pierde orientación al no ver la sección activa.
- **Casey, móvil con poco tiempo:** el menú es legible, aunque la ausencia de CTA y la superposición abrupta del panel añaden fricción.

## Evidencia técnica

El detector Impeccable no encontró reglas: 0 hallazgos en `site-header.tsx`. La compilación de producción pasó. La inspección de navegador no consiguió confirmar una captura fiable, por lo que las observaciones visuales se sustentan en la fuente y la referencia aportada.
