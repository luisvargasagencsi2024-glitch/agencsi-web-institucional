const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export const routes = {
  home: '/',
  about: '/nosotros',
  businessLines: '/lineas-de-negocio',
  consulting: '/consultoria',
  solutions: '/soluciones',
  training: '/formacion',
  publicSector: '/sector-publico',
  methodology: '/metodologia',
  experience: '/experiencia',
  perspectives: '/perspectivas',
  contact: '/contacto',
  terms: '/terminos',
  privacy: '/privacidad',
  cookies: '/cookies',
} as const

export type RoutePath = (typeof routes)[keyof typeof routes]

export function toHref(path: string) {
  return `${basePath}${path === '/' ? '/' : path}`
}

export function currentPath(): string {
  const requestedPath = new URLSearchParams(window.location.search).get('path')
  const path = requestedPath || window.location.pathname
  const normalized = basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path
  return normalized.endsWith('/') && normalized !== '/' ? normalized.slice(0, -1) : normalized || '/'
}
