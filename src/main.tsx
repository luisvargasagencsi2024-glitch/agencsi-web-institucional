import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createInitialSiteContent } from './composition-root'
import { App } from './presentation/app'
import './presentation/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App content={createInitialSiteContent()} />
  </StrictMode>,
)
