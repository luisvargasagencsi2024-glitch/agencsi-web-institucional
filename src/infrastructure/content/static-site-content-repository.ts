import type { SiteContentRepository } from '../../application/ports/site-content-repository'
import type { SiteContent } from '../../domain/entities/site-content'

export class StaticSiteContentRepository implements SiteContentRepository {
  get(): SiteContent {
    return {
      name: 'Agencsi',
      statusMessage: 'Sitio en construcción',
      hint: 'La estructura está lista para empezar.',
    }
  }
}
