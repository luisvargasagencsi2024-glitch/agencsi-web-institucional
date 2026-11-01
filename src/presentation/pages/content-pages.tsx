import type { ReactNode } from 'react'
import type { SiteContent } from '../../domain/entities/site-content'
import { ArrowIcon } from '../components/icons'
import { SiteLayout } from '../layouts/site-layout'
import { routes, toHref } from '../routes'
import { experienceArticles, experiencePath } from './experience-data'

const photo = (id: string) => id.startsWith('http') ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=85`

type PageProps = Readonly<{ content: SiteContent }>
type EditorialProps = PageProps & Readonly<{ title: string, intro: string, image: string, imageAlt: string, children?: ReactNode }>

function EditorialPage({ content, title, intro, image, imageAlt, children }: EditorialProps) {
  return <SiteLayout content={content}><header className="page-title"><div className="page-frame"><nav className="page-breadcrumb" aria-label="Migas de pan"><a href={toHref(routes.home)}>Inicio</a><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav><h1>{title}</h1><p>{intro}</p></div></header>{children}</SiteLayout>
}

function CopySection({ title, children }: { title: string, children: ReactNode }) {
  return <section className="section"><div className="page-frame page-copy"><h2>{title}</h2><div>{children}</div></div></section>
}

export function AboutPage({ content }: PageProps) {
  return <EditorialPage content={content} title="Entendemos antes de transformar." intro="Escuchamos la realidad de cada organización para convertir retos complejos en decisiones claras y acciones posibles." image={photo('photo-1556761175-4b46a572b786')} imageAlt="Equipo en una sesión de trabajo colaborativa"><CopySection title="Trabajamos cerca de las personas."><p>Combinamos mirada estratégica, experiencia técnica y acompañamiento continuo para que cada iniciativa responda a una necesidad real.</p><p>El trabajo conjunto permite construir soluciones útiles, sostenibles y alineadas con los objetivos de cada organización.</p></CopySection></EditorialPage>
}

export function BusinessLinesPage({ content }: PageProps) {
  return <EditorialPage content={content} title="Cuatro líneas, un mismo propósito." intro="Integramos estrategia, tecnología y capacidades para acompañar cambios que generan valor." image={photo('photo-1524178232363-1fb2b075b655')} imageAlt="Profesionales colaborando en una mesa de trabajo"><section className="services section"><div className="page-frame"><div className="service-grid">{content.services.map((service) => <a key={service.name} className="service-link" href={toHref(service.href)}><span><b>{service.name}</b><small>{service.summary}</small></span><ArrowIcon /></a>)}</div></div></section></EditorialPage>
}

const serviceDetails = {
  consultoria: { title: 'Decisiones claras para avanzar con propósito.', intro: 'Acompañamos la definición de estrategias, procesos y prioridades para transformar desafíos en una hoja de ruta accionable.', image: 'photo-1551836022-d5d88e9218df', items: ['Diagnóstico y análisis', 'Estrategia organizacional', 'Procesos y gestión del cambio'] },
  soluciones: { title: 'Tecnología útil para una necesidad real.', intro: 'Diseñamos e implementamos soluciones digitales que se ajustan a la realidad de cada organización.', image: 'photo-1556761175-4b46a572b786', items: ['Tiendas virtuales', 'Páginas web', 'Software empresarial', 'Automatización e IA'] },
  formacion: { title: 'Capacidades que permanecen en los equipos.', intro: 'Diseñamos experiencias de aprendizaje para fortalecer competencias y habilitar una mejora continua.', image: 'photo-1523240795612-9a054b0db644', items: ['Programas a medida', 'Talleres prácticos', 'Acompañamiento a equipos'] },
  sectorPublico: { title: 'Instituciones más ágiles y cercanas.', intro: 'Acompañamos al sector público con soluciones que fortalecen la gestión y mejoran el servicio a la ciudadanía.', image: 'photo-1450101499163-c8848c66ca85', items: ['Modernización de servicios', 'Gobierno digital', 'Gestión pública orientada a resultados'] },
} as const

function ServicePage({ content, service }: PageProps & { service: keyof typeof serviceDetails }) {
  const detail = serviceDetails[service]
  return <EditorialPage content={content} title={detail.title} intro={detail.intro} image={photo(detail.image)} imageAlt={`Equipo trabajando en ${service}`}><CopySection title="Cómo aportamos valor."><ul className="page-list">{detail.items.map((item) => <li key={item}>{item}<ArrowIcon /></li>)}</ul></CopySection></EditorialPage>
}

export function ConsultingPage({ content }: PageProps) { return <ServicePage content={content} service="consultoria" /> }
export function SolutionsPage({ content }: PageProps) { return <ServicePage content={content} service="soluciones" /> }
export function TrainingPage({ content }: PageProps) { return <ServicePage content={content} service="formacion" /> }
export function PublicSectorPage({ content }: PageProps) { return <ServicePage content={content} service="sectorPublico" /> }

export function MethodologyPage({ content }: PageProps) {
  return <EditorialPage content={content} title="Una forma clara de avanzar." intro="Nuestro método transforma el análisis en acciones concretas y sostenibles." image={photo('photo-1552664730-d307ca884978')} imageAlt="Equipo revisando una estrategia"><section className="methodology"><div className="page-frame"><ol>{content.methodology.map((step, index) => <li key={step}><span className="step-icon">{index + 1}</span><div><b>{step}</b><p>Un paso concreto para avanzar con claridad y en colaboración.</p></div></li>)}</ol></div></section></EditorialPage>
}

export function ExperiencePage({ content }: PageProps) {
  return <EditorialPage content={content} title="Experiencias y aprendizajes." intro="Ideas, casos y reflexiones para comprender mejor los desafíos de transformación." image={photo('photo-1556761175-b413da4baf72')} imageAlt="Profesionales conversando en una oficina"><section className="blog section"><div className="page-frame"><div className="blog__heading"><h2>Ideas para avanzar con sentido.</h2><p>Una mirada práctica sobre estrategia, tecnología, aprendizaje y gestión.</p></div><div className="blog__grid">{experienceArticles.map((article) => <article className="blog-card" key={article.slug}><a href={toHref(experiencePath(article))}><img src={photo(article.image)} alt="" /><div><p>Perspectivas</p><h3>{article.title}</h3><span>{article.summary}</span><b>Leer artículo <ArrowIcon /></b></div></a></article>)}</div></div></section></EditorialPage>
}

export function PerspectivesPage({ content }: PageProps) {
  return <EditorialPage content={content} title="Ideas para impulsar el cambio." intro="Reflexiones y aprendizajes sobre estrategia, tecnología y gestión." image={photo('photo-1497366754035-f200968a6e72')} imageAlt="Espacio de trabajo contemporáneo"><CopySection title="Perspectivas."><ul className="page-list"><li>Estrategia en un entorno de mayor incertidumbre <ArrowIcon /></li><li>Transformación digital en el sector público <ArrowIcon /></li></ul></CopySection></EditorialPage>
}

export function ContactPage({ content }: PageProps) {
  return <EditorialPage content={content} title="El cambio comienza con una conversación." intro="Cuéntanos sobre tus retos. Conversemos sobre cómo podemos acompañar tus objetivos." image={photo('photo-1556761175-b413da4baf72')} imageAlt="Personas conversando en una reunión"><CopySection title="Hablemos."><p>Escríbenos y coordinemos una conversación inicial.</p><a className="text-link" href="mailto:contacto@agencsi.com">contacto@agencsi.com <ArrowIcon /></a></CopySection></EditorialPage>
}

type LegalKind = 'Términos y condiciones' | 'Política de privacidad' | 'Cookies'
export function LegalPage({ content, title }: PageProps & { title: LegalKind }) {
  return <EditorialPage content={content} title={title} intro="Información legal y de uso del sitio institucional de AGENCSI." image={photo('photo-1450101499163-c8848c66ca85')} imageAlt="Documentos sobre una mesa"><CopySection title={title}><p>Esta página reúne la información aplicable al uso de este sitio. Para cualquier consulta, contáctanos en contacto@agencsi.com.</p></CopySection></EditorialPage>
}

export function NotFoundPage({ content }: PageProps) {
  return <EditorialPage content={content} title="Esta página no está disponible." intro="Volvamos al inicio para encontrar la información que necesitas." image={photo('photo-1497366811353-6870744d04b2')} imageAlt="Espacio de trabajo"><CopySection title="Sigamos conversando."><a className="text-link" href={toHref(routes.home)}>Ir al inicio <ArrowIcon /></a></CopySection></EditorialPage>
}
