import { GetSiteContent } from './application/use-cases/get-site-content'
import type { SiteContent } from './domain/entities/site-content'
import { StaticSiteContentRepository } from './infrastructure/content/static-site-content-repository'

export function createInitialSiteContent(): SiteContent {
  const repository = new StaticSiteContentRepository()
  return new GetSiteContent(repository).execute()
}
