import { useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  MonitorPlay,
  Play,
  Share2,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react'
import { programmerIaCourse, type CourseTemplateData } from './course-catalog'
import { routes, toHref } from '../../routes'

interface CourseLandingTemplateProps {
  course?: CourseTemplateData
}

function CoursePreviewModal({
  course,
  open,
  onClose,
  onEnrollClick,
}: {
  course: CourseTemplateData
  open: boolean
  onClose: () => void
  onEnrollClick: () => void
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Presentación del programa"
    >
      <div className="relative w-full max-w-xl border border-[#2c3b43] bg-[#141e24] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/12 px-5 py-3.5">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              Vista previa del programa
            </span>
            <strong className="mt-0.5 block text-sm font-semibold text-white">
              {course.title} {course.titleAccent}
            </strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 cursor-pointer place-items-center border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-[13px] leading-relaxed text-white/80">
            {course.valuePromise}
          </p>

          <div className="mt-5 border-t border-white/12 pt-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Estructura de sesiones
            </span>
            <ol className="mt-3 divide-y divide-white/10 border border-white/12">
              {course.modules.map((mod) => (
                <li
                  key={mod.number}
                  className="flex items-center justify-between gap-4 px-3.5 py-2.5 text-xs"
                >
                  <div>
                    <span className="font-mono text-[11px] text-white/50">
                      Módulo {mod.number} —{' '}
                    </span>
                    <strong className="font-semibold text-white">{mod.title}</strong>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-white/60">
                    {mod.duration}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/12 pt-4">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.12em] text-white/55">
                Derechos de inscripción
              </span>
              <strong className="text-lg font-bold text-white">
                {course.pricing.currency} {course.pricing.price}
              </strong>
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer border border-white/20 px-3.5 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onEnrollClick()
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#b0103d]"
              >
                Solicitar inscripción <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseSidebarCard({
  course,
  onOpenPreview,
}: {
  course: CourseTemplateData
  onOpenPreview: () => void
}) {
  const [fullName, setFullName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const featureIcons = [MonitorPlay, FileText, Globe2, UserCheck, Award]

  const whatsappHref = `https://wa.me/${course.pricing.whatsappPhone}?text=${encodeURIComponent(
    fullName
      ? `Estimados AGENCSI, mi nombre es ${fullName} (${whatsapp})${email ? ` - ${email}` : ''}. Solicito información para matricularme en el programa "${course.title} ${course.titleAccent}".`
      : course.pricing.whatsappDefaultMessage
  )}`

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
    window.open(whatsappHref, '_blank', 'noopener,noreferrer')
  }

  const handleShare = async () => {
    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${course.title} ${course.titleAccent} | AGENCSI`,
          url: shareUrl,
        })
        return
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <aside
      id="informes"
      aria-label="Inscripción al programa"
      className="border border-[#d1d7dc] bg-white text-[#1c1d1f] shadow-[0_8px_24px_rgba(20,37,45,0.12)]"
    >
      {/* Top Media Preview Frame (Udemy-style 16:9 Course Preview Header) */}
      <button
        type="button"
        onClick={onOpenPreview}
        className="group relative block aspect-[16/9] w-full cursor-pointer overflow-hidden border-b border-[#d1d7dc] bg-[#141e24] text-left"
      >
        <img
          src={`${import.meta.env.BASE_URL}${course.instructor.image}`}
          alt={`Vista previa del curso con ${course.instructor.name}`}
          className="h-full w-full object-contain object-bottom pt-2 opacity-90 transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f171c]/90 via-[#0f171c]/25 to-transparent" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-13 place-items-center rounded-full bg-white/95 text-[#141e24] shadow-md transition group-hover:bg-accent group-hover:text-white">
            <Play className="ml-0.5 size-5 fill-current" />
          </span>
        </span>
        <span className="absolute inset-x-0 bottom-0 px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-white">
          Vista previa de este curso
        </span>
      </button>

      <div className="p-5">
        {/* Price Header */}
        <div className="border-b border-[#e4e8eb] pb-4">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a6970]">
            Inversión del programa
          </span>
          <div className="mt-1.5 flex items-baseline gap-3">
            <strong className="font-display text-[36px] leading-none font-extrabold tracking-[-0.03em] text-accent">
              {course.pricing.currency} {course.pricing.price}
            </strong>
            {course.pricing.regularPrice && course.pricing.regularPrice > course.pricing.price && <span className="font-display text-sm font-medium text-[#7a8489] line-through">{course.pricing.currency} {course.pricing.regularPrice}</span>}
          </div>
          <span className="mt-1.5 block text-xs text-[#4a555b]">
            Pago único por participante · Incluye certificación
          </span>
        </div>

        {/* Key Institutional Facts Table */}
        <dl className="grid grid-cols-2 gap-y-2.5 border-b border-[#e4e8eb] py-3.5 text-xs">
          {course.quickStats.map((stat) => <div key={stat.label}><dt className="text-[11px] text-[#6a6f73]">{stat.label}</dt><dd className="font-semibold text-[#141e24]">{stat.value}</dd></div>)}
        </dl>

        {/* Primary Enrollment CTA (Form fields kept hidden for future activation) */}
        <div className="pt-4">
          <form className="hidden" aria-hidden="true" onSubmit={handleSubmit}>
            <p className="text-xs leading-relaxed text-[#4a555b]">
              Completa tus datos para recibir el cronograma detallado y reservar tu vacante.
            </p>

            <div className="mt-3.5 space-y-2.5">
              <label className="block">
                <span className="text-[11px] font-semibold text-[#141e24]">
                  Nombre completo *
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nombres y apellidos"
                  className="mt-1 h-9 w-full border border-[#b8c2c7] bg-white px-3 text-xs text-[#141e24] outline-none transition placeholder:text-[#8c969b] focus:border-[#141e24]"
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-semibold text-[#141e24]">
                  Teléfono / WhatsApp *
                </span>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+51 999 999 999"
                  className="mt-1 h-9 w-full border border-[#b8c2c7] bg-white px-3 text-xs text-[#141e24] outline-none transition placeholder:text-[#8c969b] focus:border-[#141e24]"
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-semibold text-[#141e24]">
                  Correo electrónico
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@institucion.com"
                  className="mt-1 h-9 w-full border border-[#b8c2c7] bg-white px-3 text-xs text-[#141e24] outline-none transition placeholder:text-[#8c969b] focus:border-[#141e24]"
                />
              </label>
            </div>
          </form>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap bg-accent px-4 text-[15px] font-semibold text-white transition hover:bg-[#b0103d]"
          >
            <span className="text-white">Inscribirme al curso</span>
            <ArrowRight className="size-4 shrink-0 text-white" />
          </a>

          <p className="mt-2.5 text-center text-[11px] font-medium text-[#5a6970]">
            {course.enrollmentNote}
          </p>
        </div>

        {/* Udemy-style "Este curso incluye" compact list */}
        <div className="mt-3.5 border-t border-[#e4e8eb] pt-3.5">
          <strong className="block text-xs font-bold text-[#141e24]">
            Este programa incluye:
          </strong>
          <ul className="mt-2 space-y-1.5 text-xs text-[#3b464c]">
            {course.includedFeatures.slice(0, 5).map((feature, index) => {
              const Icon = featureIcons[index] ?? Check
              return <li key={feature} className="flex items-center gap-2"><Icon className="size-3.5 shrink-0 text-[#141e24]" /><span className="truncate">{feature}</span></li>
            })}
          </ul>
        </div>
      </div>

      {/* Share Footer */}
      <div className="flex items-center justify-between border-t border-[#e4e8eb] bg-[#f7f9fa] px-5 py-3 text-xs text-[#4a555b]">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-[#141e24] hover:underline"
        >
          <Share2 className="size-3.5" />
          <span>{copied ? 'Enlace copiado' : 'Compartir este curso'}</span>
        </button>
        <span className="text-[11px] text-[#6a6f73]">Código: {course.code}</span>
      </div>
    </aside>
  )
}

export default function CourseLandingTemplate({
  course = programmerIaCourse,
}: CourseLandingTemplateProps) {
  const [openModules, setOpenModules] = useState<number[]>([0, 1, 2, 3])
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const statIcons = { calendar: CalendarDays, clock: Clock3, globe: Globe2, rocket: Award }

  const toggleModule = (index: number) => {
    setOpenModules((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    )
  }

  const toggleAllModules = () => {
    if (openModules.length === course.modules.length) {
      setOpenModules([])
    } else {
      setOpenModules(course.modules.map((_, idx) => idx))
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById('informes')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const firstInput = el.querySelector('input')
      if (firstInput) setTimeout(() => firstInput.focus(), 400)
    }
  }

  return (
    <div className="course-sales-page bg-white font-display text-[#1c1d1f] antialiased">
      {/* DARK INSTITUTIONAL HEADER BAND (Udemy Detail + Executive University Style) */}
      <section className="border-b border-[#26343c] bg-[#141e24] text-white">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-8 lg:py-10">
          <div className="lg:max-w-[720px] lg:pr-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Migas de pan"
              className="flex flex-wrap items-center gap-2 text-xs text-white/65"
            >
              <a href={toHref(routes.training)} className="hover:text-white hover:underline">
                Formación
              </a>
              <span className="text-white/40">/</span>
              <span>{course.category}</span>
              <span className="text-white/40">/</span>
              <span className="text-white/90">{course.title}</span>
            </nav>

            {/* Institutional Program Label */}
            <div className="mt-4 flex items-center gap-2.5">
              <span className="inline-block bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                {course.courseTypeLabel}
              </span>
              <span className="text-xs text-white/70">
                 Educación Ejecutiva y Aplicada · AGENCSI
              </span>
            </div>

            {/* Sober Academic/Corporate Title */}
            <h1 className="mt-3 font-display text-[clamp(2rem,3.4vw,2.85rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
              {course.title} {course.titleAccent}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-white/85">
              {course.subtitle}
            </p>

            {/* Metadata Bar (Udemy + University Faculty Line) */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/12 pt-4 text-xs text-white/80">
              <span>
                Docente:{' '}
                <a
                  href="#docente"
                  className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  {course.instructor.name}
                </a>
              </span>
              {course.quickStats.map((stat) => {
                const Icon = statIcons[stat.icon]
                return <span key={stat.label} className="flex items-center gap-1.5"><Icon className="size-3.5 text-white/60" />{stat.value}</span>
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT (Udemy Detail Proportions: 720px Content + 360px Sticky Sidebar) */}
      <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1180px] grid-cols-[minmax(0,1fr)] gap-10 py-8 lg:grid-cols-[minmax(0,720px)_360px] lg:justify-between lg:py-10">
        {/* Mobile Sidebar (Visible at top on mobile/tablet) */}
        <div className="min-w-0 lg:hidden">
          <CourseSidebarCard
            course={course}
            onOpenPreview={() => setPreviewOpen(true)}
          />
        </div>

        {/* LEFT COLUMN: Structured Academic & Practical Content */}
        <div className="min-w-0 space-y-10">
          {/* 1. "LO QUE APRENDERÁS" (Udemy-style bordered 2-column box) */}
          <section
            id="aprendizaje"
            className="scroll-mt-24 border border-[#d1d7dc] bg-white p-6"
          >
            <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-[#141e24] sm:text-2xl">
              Lo que aprenderás
            </h2>
            <p className="mt-1 text-xs text-[#5a6970]">
              Competencias prácticas que desarrollarás durante las 4 sesiones del programa:
            </p>

            <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li
                  key={outcome.number}
                  className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#1c1d1f]"
                >
                  <Check className="mt-1 size-4 shrink-0 text-[#141e24]" />
                  <div>
                    <strong className="font-semibold text-[#141e24]">
                      {outcome.title}
                    </strong>{' '}
                    <span className="text-[#4a555b]">{outcome.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 2. ESTRUCTURA DEL PROYECTO APLICADO (University Executive Syllabus Table) */}
          <section id="alcance" className="scroll-mt-32">
            <div className="border-b border-[#d1d7dc] pb-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a6970]">
                Aplicación práctica
              </span>
              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-[#141e24] sm:text-2xl">
                De la idea a una solución funcional en cuatro etapas
              </h2>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-[#3b464c]">
              {course.valuePromise}
            </p>

            <div className="mt-4 overflow-x-auto border border-[#d1d7dc]">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[#d1d7dc] bg-[#f7f9fa] text-[11px] font-semibold uppercase tracking-wider text-[#4a555b]">
                    <th className="px-4 py-3">Sesión</th>
                    <th className="px-4 py-3">Eje de trabajo</th>
                    <th className="px-4 py-3">Entregable verificable del alumno</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e8eb] bg-white">
                  {course.outcomes.map((outcome, index) => (
                    <tr key={outcome.number} className="align-top">
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] font-semibold text-[#141e24]">
                        Sábado {index + 1}
                      </td>
                      <td className="px-4 py-3 text-[#3b464c]">{outcome.title}</td>
                      <td className="px-4 py-3 font-semibold text-[#141e24]">
                        {outcome.artifact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. CONTENIDO DEL CURSO (Udemy-style Curriculum Accordion) */}
          <section id="programa" className="scroll-mt-32">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a6970]">
              Plan de estudios
            </span>
            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-[#141e24] sm:text-2xl">
              Contenido del curso
            </h2>

            {/* Udemy summary bar above curriculum */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4a555b]">
              <span>
                {course.programSummary}
              </span>
              <button
                type="button"
                onClick={toggleAllModules}
                className="cursor-pointer font-semibold text-accent hover:underline"
              >
                {openModules.length === course.modules.length
                  ? 'Contraer todas las secciones'
                  : 'Ampliar todas las secciones'}
              </button>
            </div>

            <div className="mt-2.5 divide-y divide-[#d1d7dc] border border-[#d1d7dc]">
              {course.modules.map((mod, index) => {
                const isOpen = openModules.includes(index)
                return (
                  <article key={mod.number} className="bg-white">
                    <button
                      type="button"
                      onClick={() => toggleModule(index)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 bg-[#f7f9fa] px-4 py-3.5 text-left transition hover:bg-[#eef1f3]"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronDown
                          className={`size-4 shrink-0 text-[#141e24] transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                        <div>
                          <h3 className="text-sm font-bold text-[#141e24]">
                            Módulo {mod.number}: {mod.title}
                          </h3>
                          <p className="text-xs text-[#5a6970]">{mod.subtitle}</p>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-[#5a6970]">
                        1 sesión • {mod.duration}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#e4e8eb] bg-white px-5 py-4">
                        <p className="text-xs leading-relaxed text-[#3b464c]">
                          {mod.description}
                        </p>

                        <ul className="mt-3 space-y-2">
                          {mod.topics.map((topic) => (
                            <li
                              key={topic}
                              className="flex items-start gap-2.5 text-xs text-[#1c1d1f]"
                            >
                              <FileText className="mt-0.5 size-3.5 shrink-0 text-[#6a6f73]" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#eef1f3] pt-2.5 text-[11px] text-[#4a555b]">
                          <span>
                            <strong className="font-semibold text-[#141e24]">
                              Entregable de sesión:
                            </strong>{' '}
                            {mod.deliverable}
                          </span>
                          <span className="font-mono text-[10px] text-[#6a6f73]">
                            {mod.stackTags.join(' · ')}
                          </span>
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </section>

          {/* 4. METODOLOGÍA Y REQUISITOS (Corporate / University Executive Format) */}
          <section id="requisitos" className="scroll-mt-32 space-y-8">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-[#141e24] sm:text-2xl">
                Metodología de enseñanza
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#3b464c]">
                {course.methodology.subheading}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.methodology.steps.map((step, idx) => (
                  <div
                    key={step.time}
                    className="border border-[#d1d7dc] bg-[#f7f9fa] p-4"
                  >
                    <span className="font-mono text-[11px] font-semibold text-[#5a6970]">
                      0{idx + 1}. {step.title}
                    </span>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#3b464c]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 border-t border-[#d1d7dc] pt-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#141e24]">
                  Requisitos
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-4 text-xs leading-relaxed text-[#3b464c]">
                  {course.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#141e24]">
                  ¿Para quién es este curso?
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-4 text-xs leading-relaxed text-[#3b464c]">
                  {course.audiences.map((aud) => (
                    <li key={aud.title}>
                      <strong className="font-semibold text-[#141e24]">
                        {aud.title}:
                      </strong>{' '}
                      {aud.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 5. DOCENTE (University Faculty Profile Style) */}
          <section
            id="docente"
            className="scroll-mt-32 border border-[#26343c] bg-[#141e24] p-6 text-white sm:p-7"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-block bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                Cuerpo docente
              </span>
              <span className="text-[11px] uppercase tracking-[0.12em] text-white/60">
                {course.instructor.division}
              </span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.025em] text-white sm:text-[26px]">
              {course.instructor.name}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-white/70">
              {course.instructor.role}
            </p>

            <div className="mt-5 grid gap-6 border-t border-white/12 pt-5 sm:grid-cols-[150px_1fr] sm:items-start">
              <div className="aspect-[4/5] w-[145px] overflow-hidden border border-white/15 bg-[#1c2b33]">
                <img
                  src={`${import.meta.env.BASE_URL}${course.instructor.image}`}
                  alt={course.instructor.name}
                  className="h-full w-full object-contain object-bottom pt-2"
                />
              </div>

              <div className="space-y-3 text-[13px] leading-relaxed text-white/85">
                <p>{course.instructor.shortBio}</p>
                <p className="text-xs leading-relaxed text-white/70">
                  {course.instructor.extendedBio}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {course.instructor.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/85"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6. CERTIFICACIÓN INSTITUCIONAL */}
          <section className="border border-[#d1d7dc] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-xl">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a6970]">
                  Acreditación académica
                </span>
                <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-[#141e24]">
                  {course.certification.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[#4a555b]">
                  {course.certification.subtitle}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-[#2d3840]">
                  {course.certification.benefits.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ShieldCheck className="size-3.5 shrink-0 text-[#141e24]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 7. PREGUNTAS FRECUENTES */}
          <section id="preguntas" className="scroll-mt-32">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a6970]">
              Consultas habituales
            </span>
            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-[#141e24] sm:text-2xl">
              Preguntas frecuentes
            </h2>

            <div className="mt-4 divide-y divide-[#d1d7dc] border-y border-[#d1d7dc]">
              {course.faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <article key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-[#141e24] transition hover:text-accent"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-[#5a6970] transition-transform ${
                          isOpen ? 'rotate-180 text-[#141e24]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-xs leading-relaxed text-[#4a555b]">
                        {faq.answer}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Outer column stretches full height with negative top margin; inner wrapper sticks cleanly below the header (`top-[96px]`) */}
        <div className="hidden lg:-mt-56 lg:block">
          <div className="lg:sticky lg:top-[96px] lg:z-10">
            <CourseSidebarCard
              course={course}
              onOpenPreview={() => setPreviewOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d1d7dc] bg-white px-4 py-2.5 shadow-[0_-4px_16px_rgba(20,37,45,0.1)] lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div>
            <strong className="font-display text-2xl font-extrabold tracking-tight text-accent">
              {course.pricing.currency} {course.pricing.price}
            </strong>
            <span className="ml-2 text-[11px] text-[#5a6970]">
              {course.enrollmentNote}
            </span>
          </div>
          <a
            href={`https://wa.me/${course.pricing.whatsappPhone}?text=${encodeURIComponent(course.pricing.whatsappDefaultMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 bg-accent px-4 py-2.5 text-[15px] font-semibold text-white"
          >
            <span className="text-white">Inscribirme al curso</span>
            <ArrowRight className="size-4 text-white" />
          </a>
        </div>
      </div>

      <CoursePreviewModal
        course={course}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onEnrollClick={scrollToForm}
      />
    </div>
  )
}
