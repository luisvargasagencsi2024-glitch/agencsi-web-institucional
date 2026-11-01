import type { ReactNode } from 'react'
import type { SiteContent } from '../../domain/entities/site-content'
import { SiteFooter } from '../components/site-footer'
import { SiteHeader } from '../components/site-header'

type SiteLayoutProps = Readonly<{ content: SiteContent, children: ReactNode }>

export function SiteLayout({ content, children }: SiteLayoutProps) {
  return <><SiteHeader content={content} /><main>{children}</main><SiteFooter content={content} /></>
}
