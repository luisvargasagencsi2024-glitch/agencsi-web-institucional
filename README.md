# Agencsi Web Institucional

Sitio web único construido con React y Vite. El estado inicial es deliberadamente mínimo para evitar contenido o promesas inventadas.

## Inicio

```bash
npm install
npm run dev
```

Para crear la versión de producción:

```bash
npm run build
```

## Arquitectura

```text
src/
├── domain/          # Entidades y reglas puras, sin React ni APIs externas
├── application/     # Casos de uso y puertos
├── infrastructure/  # Adaptadores concretos (datos, HTTP, almacenamiento, etc.)
├── presentation/    # Componentes React, estilos y vistas
├── composition-root.ts # Único lugar que conecta las dependencias
└── main.tsx         # Arranque de React
```

El flujo de dependencias es: `presentation → application → domain`. La infraestructura implementa puertos definidos por aplicación; solo `composition-root.ts` conoce las implementaciones concretas.

Para añadir una funcionalidad:

1. Define la entidad o regla en `domain/`.
2. Crea el caso de uso y su puerto en `application/`.
3. Implementa el puerto en `infrastructure/`.
4. Conecta la implementación en `composition-root.ts`.
5. Pasa al componente únicamente los datos o callbacks que necesita, sin lógica de negocio en la vista.
