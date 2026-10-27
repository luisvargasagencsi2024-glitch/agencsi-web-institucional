import type { SiteContent } from '../domain/entities/site-content'
import { SiteShell } from './components/site-shell'

type AppProps = Readonly<{
  content: SiteContent
}>

export function App({ content }: AppProps) {
  return <SiteShell content={content} />
}
