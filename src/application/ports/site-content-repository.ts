import type { SiteContent } from '../../domain/entities/site-content'

export interface SiteContentRepository {
  get(): SiteContent
}
