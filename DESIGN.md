# Design system — AGENCSI

## Implementation policy

- Tailwind CSS is the required styling system for every new or redesigned interface.
- New UI must be composed from React components and Tailwind utility classes. Do not add page-specific stylesheet files, `@scope`, CSS modules, inline style objects, `!important`, or growing override layers.
- Existing legacy CSS may be maintained only while it is being migrated. A redesign is a migration opportunity, not permission to extend legacy styles.
- Reusable pieces belong in `src/presentation/components/`; page composition belongs in `src/presentation/pages/`.

## Brand tokens

- Ink: `#253840`
- Deep: `#14252d`
- Paper: `#ffffff`
- Mist: `#f4f5f5`
- Line: `#dce1e3`
- Text: `#2d3840`
- Soft: `#66757c`
- Magenta: `#d6154b`
- Headings: Baskervville / Libre Baskerville.
- Body and controls: IBM Plex Sans / NeueHaas when supplied.

## Validation rule

A build or linter result is never a UX/UI approval. Before reporting a visual change as ready, inspect actual desktop and mobile renders for hierarchy, spacing, contrast, responsiveness, brand consistency and the complete user journey. Report open defects plainly.
