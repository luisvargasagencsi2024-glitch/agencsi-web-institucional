import type { SiteContentRepository } from '../ports/site-content-repository'
import type { SiteContent } from '../../domain/entities/site-content'

export class GetSiteContent {
  constructor(private readonly repository: SiteContentRepository) {}

  execute(): SiteContent {
    return this.repository.get()
  }
}
