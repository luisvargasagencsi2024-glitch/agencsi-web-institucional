export type Service = Readonly<{
  name: string
  summary: string
  href: string
}>

export type SiteContent = Readonly<{
  name: string
  tagline: string
  heroTitle: string
  heroDescription: string
  services: readonly Service[]
  methodology: readonly string[]
}>
