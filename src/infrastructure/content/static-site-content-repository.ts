import type { SiteContentRepository } from '../../application/ports/site-content-repository'
import type { SiteContent } from '../../domain/entities/site-content'

export class StaticSiteContentRepository implements SiteContentRepository {
  get(): SiteContent {
    return {
      name: 'AGENCSI',
      tagline: 'with you before and after',
      heroTitle: 'Transformamos desafíos en estrategias, soluciones y capacidades.',
      heroDescription:
        'Acompañamos a empresas e instituciones públicas a comprender sus retos, tomar mejores decisiones, implementar tecnología útil y fortalecer las competencias de sus equipos.',
      services: [
        { name: 'Consultoría', summary: 'Estrategia, procesos y gestión para mejores decisiones.', href: '/consultoria' },
        { name: 'Soluciones', summary: 'Tecnología que resuelve necesidades reales.', href: '/soluciones' },
        { name: 'Formación', summary: 'Capacidades para personas y equipos.', href: '/formacion' },
        { name: 'Sector Público', summary: 'Acompañamiento especializado para instituciones del Estado.', href: '/sector-publico' },
      ],
      methodology: ['Diagnosticar', 'Diseñar', 'Planificar', 'Implementar y acompañar', 'Evaluar y transferir'],
    }
  }
}
