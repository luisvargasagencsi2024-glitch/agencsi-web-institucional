import type { SiteContent } from '../../domain/entities/site-content'
import { HomeSections } from '../components/site-shell'
import { SiteLayout } from '../layouts/site-layout'

export function HomePage({ content }: { content: SiteContent }) {
  return <SiteLayout content={content}><HomeSections content={content} /></SiteLayout>
}
