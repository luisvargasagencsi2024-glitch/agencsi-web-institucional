import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type ArticleActionsProps = Readonly<{ title: string, body: readonly string[] }>

function ListenIcon({ active }: { active: boolean }) { return <svg aria-hidden="true" className="size-[17px] fill-none stroke-current stroke-[1.7]" viewBox="0 0 24 24">{active ? <><path d="M6 9v6M10 6v12M14 8v8M18 5v14" /></> : <><path d="M4 10v4h3l4 3V7l-4 3H4Z" /><path d="M15 9.2a4 4 0 0 1 0 5.6M17.5 6.7a7.5 7.5 0 0 1 0 10.6" /></>}</svg> }
function ShareIcon() { return <svg aria-hidden="true" className="size-[17px] fill-none stroke-current stroke-[1.7]" viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.25" /><circle cx="6" cy="12" r="2.25" /><circle cx="18" cy="19" r="2.25" /><path d="m8 10.8 7.9-4.5M8 13.2l7.9 4.5" /></svg> }
function ContrastIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 4v16" /></svg> }
function InvertIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4a8 8 0 1 0 8 8c0-4.4-3.6-8-8-8Z" /><path d="M12 4v16" /></svg> }
function TextIcon({ increase }: { increase: boolean }) { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 18 3.7-12h2.6L15 18M6.4 14h7.2" />{increase ? <path d="M18 8v7M14.5 11.5h7" /> : <path d="M14.5 11.5h7" />}</svg> }
function FullscreenIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 4H5v4M15 4h4v4M19 16v4h-4M5 16v4h4" /></svg> }
function CloseIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17" /></svg> }

export function ArticleActions({ title, body }: ArticleActionsProps) {
  const [isListening, setIsListening] = useState(false)
  const [shareLabel, setShareLabel] = useState('Compartir')
  const [scale, setScale] = useState(1)
  const [readerOpen, setReaderOpen] = useState(false)
  const [readerInverted, setReaderInverted] = useState(false)
  const [readerContent, setReaderContent] = useState('')
  useEffect(() => () => window.speechSynthesis?.cancel(), [])
  useEffect(() => {
    if (!readerOpen) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setReaderOpen(false) }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape) }
  }, [readerOpen])
  const listen = () => {
    if (!('speechSynthesis' in window)) return
    if (isListening) { window.speechSynthesis.cancel(); setIsListening(false); return }
    const utterance = new SpeechSynthesisUtterance(`${title}. ${body.join(' ')}`)
    utterance.lang = 'es-PE'
    utterance.onend = () => setIsListening(false)
    utterance.onerror = () => setIsListening(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setIsListening(true)
  }
  const share = async () => {
    const payload = { title, text: title, url: window.location.href }
    try {
      if (navigator.share) { await navigator.share(payload); return }
      await navigator.clipboard?.writeText(window.location.href)
      setShareLabel('Enlace copiado')
      window.setTimeout(() => setShareLabel('Compartir'), 1800)
    } catch { setShareLabel('Compartir') }
  }
  const updateScale = (next: number) => { const value = Math.min(1.2, Math.max(.9, next)); setScale(value); document.documentElement.style.setProperty('--article-scale', String(value)) }
  const toggleClass = (name: string) => document.documentElement.classList.toggle(name)
  const openReader = () => { setReaderContent(document.querySelector<HTMLElement>('.article__content')?.innerHTML ?? ''); setReaderInverted(false); setReaderOpen(true) }
  const reader = readerOpen ? createPortal(<div className={`article-reader${readerInverted ? ' article-reader--inverted' : ''}`} role="dialog" aria-modal="true" aria-label="Lector de artículo"><header><p>Modo lectura</p><div className="article-reader__tools"><button type="button" onClick={() => updateScale(scale - .05)} aria-label="Reducir texto"><TextIcon increase={false} /></button><button type="button" onClick={() => updateScale(scale + .05)} aria-label="Aumentar texto"><TextIcon increase /></button><button type="button" onClick={() => setReaderInverted(!readerInverted)} aria-label="Invertir colores"><InvertIcon /></button><button type="button" onClick={() => setReaderOpen(false)} aria-label="Cerrar lector" title="Cerrar (Esc)"><CloseIcon /></button></div></header><main className="article__content"><h1>{title}</h1><div dangerouslySetInnerHTML={{ __html: readerContent }} /></main></div>, document.body) : null
  return <><div className="article-actions"><button type="button" onClick={listen} aria-pressed={isListening}><ListenIcon active={isListening} />{isListening ? 'Detener audio' : 'Escuchar'}</button><button type="button" onClick={() => void share()}><ShareIcon />{shareLabel}</button></div><div className="article-accessibility" aria-label="Herramientas de accesibilidad"><button type="button" onClick={() => updateScale(scale - .05)} aria-label="Reducir tamaño de texto" title="Reducir texto"><TextIcon increase={false} /></button><button type="button" onClick={() => updateScale(scale + .05)} aria-label="Aumentar tamaño de texto" title="Aumentar texto"><TextIcon increase /></button><button type="button" onClick={() => toggleClass('article-invert')} aria-label="Invertir colores" title="Invertir colores"><InvertIcon /></button><button type="button" onClick={openReader} aria-label="Abrir lector a pantalla completa" title="Abrir lector"><FullscreenIcon /></button></div>{reader}</>
}
