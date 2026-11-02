export interface CourseOutcome {
  number: string
  deliverableTag: string
  title: string
  description: string
  artifact: string
}

export interface CourseModule {
  number: string
  sessionBadge: string
  duration: string
  title: string
  subtitle: string
  description: string
  topics: string[]
  deliverable: string
  stackTags: string[]
}

export interface CourseAudienceProfile {
  badge: string
  title: string
  description: string
  painPoint: string
  result: string
}

export interface CourseProjectStage {
  step: string
  week: string
  title: string
  caption: string
  previewTitle: string
  previewType: 'brief' | 'wireframe' | 'code' | 'live'
  highlights: string[]
}

export interface CourseFaq {
  category: string
  question: string
  answer: string
}

export interface CourseTemplateData {
  slug: string
  category: string
  cohortBadge: string
  urgencyBanner: {
    statusText: string
    highlightText: string
    ctaText: string
  }
  title: string
  titleAccent: string
  subtitle: string
  valuePromise: string
  pricing: {
    currency: string
    price: number
    regularPrice: number
    discountBadge: string
    paymentLabel: string
    installmentNote: string
    guaranteeTitle: string
    guaranteeText: string
    whatsappPhone: string
    whatsappDefaultMessage: string
  }
  quickStats: Array<{
    label: string
    value: string
    subtext: string
    icon: 'calendar' | 'clock' | 'globe' | 'rocket'
  }>
  heroHighlights: string[]
  includedFeatures: string[]
  comparison: {
    eyebrow: string
    heading: string
    subheading: string
    traditionalTitle: string
    traditionalItems: string[]
    methodTitle: string
    methodItems: string[]
  }
  outcomes: CourseOutcome[]
  projectShowcase: {
    eyebrow: string
    heading: string
    subheading: string
    stages: CourseProjectStage[]
  }
  modules: CourseModule[]
  audiences: CourseAudienceProfile[]
  methodology: {
    eyebrow: string
    heading: string
    subheading: string
    steps: Array<{
      time: string
      title: string
      description: string
    }>
  }
  instructor: {
    name: string
    role: string
    division: string
    image: string
    shortBio: string
    extendedBio: string
    quote: string
    specialties: string[]
    stats: Array<{ value: string; label: string }>
  }
  certification: {
    title: string
    subtitle: string
    certificateName: string
    hours: string
    benefits: string[]
  }
  faqs: CourseFaq[]
}

export const programmerIaCourse: CourseTemplateData = {
  slug: 'programacion-con-ia',
  category: 'Programación e Inteligencia Artificial Aplicada',
  cohortBadge: 'EDICIÓN EN VIVO · CUPOS LIMITADOS POR MENTORÍA',
  urgencyBanner: {
    statusText: 'Inscripciones abiertas · Próximo grupo de 4 sábados prácticos',
    highlightText: 'Tarifa de lanzamiento S/ 180 (Ahorra 35%)',
    ctaText: 'Asegurar mi vacante',
  },
  title: 'Programa con IA.',
  titleAccent: 'De la idea a una solución real.',
  subtitle:
    'Aprende a diseñar, programar y publicar un proyecto digital funcional para un negocio o necesidad real, incluso si estás empezando desde cero.',
  valuePromise:
    'Olvídate de meses de teoría abstracta. En 4 sábados de trabajo práctico y guiado construirás paso a paso un Producto Mínimo Viable (MVP) asistido por Inteligencia Artificial y lo dejarás publicado en internet.',
  pricing: {
    currency: 'S/',
    price: 180,
    regularPrice: 280,
    discountBadge: '35% OFF · PREVENTA',
    paymentLabel: 'Pago único por participante · Acceso completo',
    installmentNote: 'Incluye sesiones en vivo, grabaciones, plantillas de prompts y certificado oficial AGENCSI.',
    guaranteeTitle: 'Metodología 100% orientada a un entregable real',
    guaranteeText:
      'Terminas el programa con tu propio proyecto funcional publicado y listo para mostrar a clientes, usuarios o a tu organización.',
    whatsappPhone: '51993762400',
    whatsappDefaultMessage:
      'Hola AGENCSI, quiero información e inscribirme en el curso "Programa con IA: De la idea a una solución real" (S/ 180).',
  },
  quickStats: [
    {
      label: 'Formato intensivo',
      value: '4 sábados de práctica',
      subtext: 'Sesiones guiadas paso a paso',
      icon: 'calendar',
    },
    {
      label: 'Carga horaria',
      value: '14 horas académicas',
      subtext: 'Práctica en tiempo real + feedback',
      icon: 'clock',
    },
    {
      label: 'Modalidad',
      value: '100% virtual en vivo',
      subtext: 'Con acceso a grabaciones HD',
      icon: 'globe',
    },
    {
      label: 'Resultado final',
      value: '1 MVP publicado',
      subtext: 'Enlace web real y funcional',
      icon: 'rocket',
    },
  ],
  heroHighlights: [
    'No necesitas saber programar previamente',
    'Trabajas sobre tu propia idea o caso de negocio',
    'Acompañamiento en vivo y revisión directa del docente',
  ],
  includedFeatures: [
    '4 sesiones prácticas en vivo (14 horas académicas)',
    'Acceso a todas las grabaciones y recursos descargables',
    'Kit de prompts de ingeniería, diseño UI y desarrollo',
    'Despliegue de tu aplicación con enlace público en la nube',
    'Revisión personalizada del avance de tu proyecto',
    'Certificado oficial emitido por AGENCSI Formación',
  ],
  comparison: {
    eyebrow: 'CAMBIO DE PARADIGMA',
    heading: '¿Por qué este programa logra en 4 semanas lo que antes tomaba meses?',
    subheading:
      'La Inteligencia Artificial cambió la forma de construir software. Hoy el diferencial no es memorizar sintaxis de código, sino saber estructurar un problema, diseñar la experiencia y dirigir a la IA para construir una solución útil.',
    traditionalTitle: 'El camino tradicional (Lento y teórico)',
    traditionalItems: [
      'Meses viendo videos grabados de sintaxis sin construir nada aplicable a tu realidad.',
      'Frustración al primer error técnico por no contar con un mentor que revise tu caso en vivo.',
      'Ideas de negocio o mejoras operativas estancadas por depender al 100% de terceros.',
      'Terminar el curso con apuntes teóricos, pero sin ningún proyecto publicado en internet.',
    ],
    methodTitle: 'El Método AGENCSI: Programa con IA',
    methodItems: [
      'Partes de una necesidad real desde el Sábado 1 y la conviertes en un alcance claro y accionable.',
      'Usas IA generativa como copiloto para diseñar la interfaz, programar la lógica y corregir errores.',
      'Avanzas acompañado en vivo por un especialista que te guía en cada decisión técnica y de producto.',
      'En el Sábado 4 publicas tu MVP con una URL real, listo para validar con usuarios o presentar.',
    ],
  },
  outcomes: [
    {
      number: '01',
      deliverableTag: 'ENTREGABLE SÁBADO 01',
      title: 'Definir una necesidad y convertirla en un brief accionable.',
      description:
        'Aprenderás a aterrizar una idea o dolor de negocio en un documento de alcance claro: qué problema resuelve, para quién y cuál es la funcionalidad central de tu primera versión.',
      artifact: 'Product Brief & Mapa de Alcance MVP',
    },
    {
      number: '02',
      deliverableTag: 'ENTREGABLE SÁBADO 02',
      title: 'Diseñar una interfaz clara que responda a una tarea real.',
      description:
        'Estructurarás las pantallas, jerarquía visual y recorrido del usuario para que cualquier persona entienda y utilice tu herramienta sin fricciones.',
      artifact: 'Arquitectura de Interfaz & Flujo UX',
    },
    {
      number: '03',
      deliverableTag: 'ENTREGABLE SÁBADO 03',
      title: 'Usar IA para crear una primera versión funcional.',
      description:
        'Dominarás flujos de programación asistida por IA para transformar tu diseño en código funcional, integrando formularios, estados, lógica de negocio y componentes interactivos.',
      artifact: 'Aplicación Web Funcional con IA',
    },
    {
      number: '04',
      deliverableTag: 'ENTREGABLE SÁBADO 04',
      title: 'Publicar y presentar un MVP listo para validar.',
      description:
        'Realizarás pruebas reales, pulirás los detalles críticos, desplegarás tu aplicación en internet con un enlace compartible y estructurarás una demostración convincente.',
      artifact: 'MVP en Producción + Pitch de Validación',
    },
  ],
  projectShowcase: {
    eyebrow: 'EVOLUCIÓN DE TU PROYECTO',
    heading: 'De una hoja en blanco a un producto digital en producción.',
    subheading:
      'Cada sábado desbloqueas una capa real de tu proyecto. Mira cómo evoluciona tu solución semana a semana durante el programa:',
    stages: [
      {
        step: 'Fase 01',
        week: 'Sábado 1',
        title: 'De la Idea al Brief Accionable',
        caption: 'Delimitas el problema real, el usuario objetivo y el flujo crítico para no construir de más.',
        previewTitle: 'brief-proyecto-mvp.md',
        previewType: 'brief',
        highlights: [
          'Definición del problema y métrica de éxito',
          'Perfil de persona usuaria y tarea principal',
          'Priorización de funcionalidades esenciales (MoSCoW)',
        ],
      },
      {
        step: 'Fase 02',
        week: 'Sábado 2',
        title: 'Diseño de Experiencia e Interfaz',
        caption: 'Conviertes el brief en pantallas limpias, intuitivas y enfocadas en completar la tarea.',
        previewTitle: 'ui-system-wireframe.fig',
        previewType: 'wireframe',
        highlights: [
          'Estructura de navegación y pantallas clave',
          'Diseño de formularios, tablas o paneles de control',
          'Criterios de claridad visual y experiencia móvil/escritorio',
        ],
      },
      {
        step: 'Fase 03',
        week: 'Sábado 3',
        title: 'Construcción Asistida por IA',
        caption: 'Generas, conectas e iteras el código funcional con acompañamiento experto en vivo.',
        previewTitle: 'app-mvp-engine.tsx',
        previewType: 'code',
        highlights: [
          'Prompts estructurados para generación de componentes',
          'Lógica interactiva, validaciones y persistencia de datos',
          'Depuración asistida y control de calidad paso a paso',
        ],
      },
      {
        step: 'Fase 04',
        week: 'Sábado 4',
        title: 'Despliegue y Validación en Vivo',
        caption: 'Publicas tu solución en un dominio web accesible desde cualquier dispositivo.',
        previewTitle: 'https://tu-proyecto-mvp.app',
        previewType: 'live',
        highlights: [
          'Publicación en la nube con URL pública instantánea',
          'Checklist de pruebas con usuarios reales',
          'Presentación ejecutiva y hoja de ruta de evolución',
        ],
      },
    ],
  },
  modules: [
    {
      number: '01',
      sessionBadge: 'SÁBADO 01 · SESIÓN EN VIVO',
      duration: '3.5 horas académicas',
      title: 'Define la oportunidad',
      subtitle: 'De una necesidad real a un alcance claro.',
      description:
        'Todo gran producto digital empieza entendiendo el problema correcto. En esta primera sesión aprenderás a identificar una oportunidad real en tu trabajo, negocio o emprendimiento y a traducirla en un brief técnico-funcional listo para ser ejecutado con IA.',
      topics: [
        'Identificación y validación rápida de necesidades reales vs. ideas sueltas.',
        'Cómo usar IA generativa para investigar al usuario, mapear dolores y estructurar requerimientos.',
        'Recorte inteligente de alcance: qué debe entrar (y qué no) en tu primera versión funcional (MVP).',
        'Taller práctico: redacción asistida de tu Product Brief y arquitectura funcional.',
      ],
      deliverable: 'Brief accionable del proyecto y mapa del flujo principal.',
      stackTags: ['Product Discovery', 'Prompting Estratégico', 'Alcance MVP'],
    },
    {
      number: '02',
      sessionBadge: 'SÁBADO 02 · SESIÓN EN VIVO',
      duration: '3.5 horas académicas',
      title: 'Diseña la experiencia',
      subtitle: 'Estructura una interfaz que prioriza a la persona usuaria.',
      description:
        'Antes de generar código, definimos cómo interactuará la persona usuaria con tu solución. Diseñarás la estructura visual, los textos y el recorrido paso a paso para que tu aplicación sea clara, profesional y fácil de usar.',
      topics: [
        'Principios esenciales de UI/UX aplicados a herramientas y productos digitales.',
        'Traducción de tareas de usuario en pantallas, formularios, vistas de resultados y acciones.',
        'Generación rápida de prototipos y sistemas visuales limpios apoyados en IA.',
        'Taller práctico: construcción del esqueleto interactivo y guía visual de tu aplicación.',
      ],
      deliverable: 'Diseño de interfaz y flujo de pantallas de tu solución.',
      stackTags: ['UX Flow', 'Diseño de Interfaz', 'Prototipado con IA'],
    },
    {
      number: '03',
      sessionBadge: 'SÁBADO 03 · SESIÓN EN VIVO',
      duration: '3.5 horas académicas',
      title: 'Construye con IA',
      subtitle: 'Programa una primera versión con acompañamiento.',
      description:
        'El corazón técnico del programa. Aprenderás a dirigir herramientas de generación de código con IA para construir tu aplicación bloque por bloque, entendiendo cómo conectar la interfaz con la lógica real sin bloquearte.',
      topics: [
        'Metodología de programación asistida por IA: cómo pedir, iterar y estructurar código limpio.',
        'Construcción de componentes interactivos, captura de datos, cálculos y estados dinámicos.',
        'Cómo diagnosticar errores y resolverlos en segundos junto a tu copiloto de IA.',
        'Taller práctico con mentoría en vivo: programación de la versión funcional de tu proyecto.',
      ],
      deliverable: 'Primera versión funcional de tu aplicación ejecutándose en tiempo real.',
      stackTags: ['AI Coding', 'Lógica Funcional', 'Iteración en Vivo'],
    },
    {
      number: '04',
      sessionBadge: 'SÁBADO 04 · SESIÓN EN VIVO',
      duration: '3.5 horas académicas',
      title: 'Publica y presenta',
      subtitle: 'Prueba, mejora y muestra tu solución.',
      description:
        'Un proyecto solo genera valor cuando las personas pueden usarlo. En la sesión final someterás tu aplicación a pruebas reales, aplicarás mejoras de acabado, la publicarás en internet y presentarás tu MVP.',
      topics: [
        'Revisión de calidad: pruebas de flujo, adaptabilidad móvil y claridad de mensajes.',
        'Despliegue paso a paso en la nube para obtener tu propio enlace web público.',
        'Cómo estructurar una demostración efectiva para clientes, socios o líderes de tu empresa.',
        'Presentación de proyectos, retroalimentación final del docente y entrega de certificados.',
      ],
      deliverable: 'MVP publicado en internet con URL propia y presentación validada.',
      stackTags: ['Deploy en la Nube', 'QA & Validación', 'Demo Day'],
    },
  ],
  audiences: [
    {
      badge: 'PERFIL 01 · GESTIÓN Y NEGOCIOS',
      title: 'Profesionales, Consultores y Líderes de Área',
      description:
        'Que identifican procesos lentos, hojas de cálculo complejas o necesidades desatendidas en su organización y quieren crear herramientas digitales propias.',
      painPoint: 'Depender de meses de espera del área técnica o proveedores externos.',
      result: 'Capacidad de prototipar y lanzar soluciones internas funcionales en días.',
    },
    {
      badge: 'PERFIL 02 · EMPRENDIMIENTO E INNOVACIÓN',
      title: 'Emprendedores, Fundadores y Creadores',
      description:
        'Que tienen una idea de negocio o servicio digital y necesitan salir al mercado rápido con un producto real antes de realizar grandes inversiones.',
      painPoint: 'Gastar miles de soles desarrollando a ciegas sin haber validado con clientes.',
      result: 'Un MVP real publicado en la web listo para recibir usuarios y ventas.',
    },
    {
      badge: 'PERFIL 03 · CRECIMIENTO PROFESIONAL',
      title: 'Estudiantes y Profesionales en Transición Digital',
      description:
        'Que buscan incorporar la habilidad más demandada del mercado actual: construir soluciones tecnológicas reales apalancándose en Inteligencia Artificial.',
      painPoint: 'Cursos teóricos que no enseñan a terminar ni publicar un proyecto completo.',
      result: 'Portafolio real con un proyecto desplegado y metodología replicable.',
    },
  ],
  methodology: {
    eyebrow: 'METODOLOGÍA PRÁCTICA AGENCSI',
    heading: 'Cómo funciona cada sábado de entrenamiento.',
    subheading:
      'Nada de monólogos teóricos de 3 horas. Cada sesión está diseñada como un laboratorio práctico de construcción donde avanzas con acompañamiento directo:',
    steps: [
      {
        time: 'ETAPA 01 · 20%',
        title: 'Demostración en vivo y marco de trabajo',
        description:
          'El docente explica el concepto clave del día construyendo un caso en pantalla paso a paso, sin cajas negras.',
      },
      {
        time: 'ETAPA 02 · 50%',
        title: 'Trabajo guiado en tu propio proyecto',
        description:
          'Aplicas de inmediato las plantillas, prompts y herramientas sobre tu idea mientras el docente guía el proceso.',
      },
      {
        time: 'ETAPA 03 · 20%',
        title: 'Revisión de avances y desbloqueo en tiempo real',
        description:
          'Resolvemos dudas específicas, corregimos errores en vivo y afinamos el diseño y código de los participantes.',
      },
      {
        time: 'ETAPA 04 · 10%',
        title: 'Hito completado y siguiente paso claro',
        description:
          'Cierras cada sábado con un entregable tangible listo que sirve de base exacta para la siguiente sesión.',
      },
    ],
  },
  instructor: {
    name: 'Yimmi Urbano',
    role: 'Docente Principal · Especialista en IA Generativa y Soluciones Digitales',
    division: 'AGENCSI Tecnología & Formación',
    image: 'yimmi-urbano.png',
    shortBio:
      'Profesional del sector tecnológico con experiencia en inteligencia artificial generativa, programación web, gestión de proyectos y diseño de soluciones digitales.',
    extendedBio:
      'Combina visión estratégica de negocio con ejecución técnica moderna. En AGENCSI participa en el diseño y despliegue de soluciones digitales y programas de transferencia de capacidades, ayudando a profesionales y organizaciones a adoptar la Inteligencia Artificial con enfoque práctico, ético y orientado a resultados medibles.',
    quote:
      'Hoy la barrera ya no es escribir código desde cero; la verdadera ventaja competitiva es saber entender un problema real y usar la IA para convertirlo en una solución que funcione.',
    specialties: [
      'Inteligencia Artificial Generativa',
      'Programación Web Moderna',
      'Gestión de Proyectos Digitales',
      'Diseño de Soluciones y MVPs',
    ],
    stats: [
      { value: '100%', label: 'Enfoque práctico en casos reales' },
      { value: '4 Sáb.', label: 'Acompañamiento directo en vivo' },
      { value: 'MVP', label: 'Orientado a producto publicado' },
    ],
  },
  certification: {
    title: 'Certificación oficial respaldada por AGENCSI',
    subtitle:
      'Al culminar las 4 sesiones y presentar tu MVP funcional, recibirás un certificado digital verificable que acredita tus competencias prácticas.',
    certificateName: 'Programa con IA: De la idea a una solución real',
    hours: '14 horas académicas de formación práctica aplicada',
    benefits: [
      'Certificado nominal emitido por AGENCSI por 14 horas académicas.',
      'Acredita el diseño, desarrollo asistido por IA y despliegue de un MVP.',
      'Ideal para enriquecer tu perfil de LinkedIn, CV y portafolio profesional.',
    ],
  },
  faqs: [
    {
      category: 'Requisitos',
      question: '¿Necesito saber programar?',
      answer:
        'No. El curso parte de una idea o necesidad real y te guía paso a paso para construir una solución. Aprenderás desde cero cómo estructurar el proyecto y cómo darle instrucciones precisas a la Inteligencia Artificial para generar y ajustar el código.',
    },
    {
      category: 'Herramientas',
      question: '¿Qué necesito para participar?',
      answer:
        'Una laptop o computadora de escritorio, conexión estable a internet y disposición para trabajar activamente en tu propio proyecto durante los 4 sábados. Todas las herramientas de IA y despliegue que utilizaremos cuentan con versiones gratuitas para que no tengas costos adicionales.',
    },
    {
      category: 'Metodología',
      question: '¿Las sesiones son prácticas?',
      answer:
        'Sí, 100% prácticas. Cada sesión combina demostración en vivo, trabajo guiado sobre tu proyecto y revisión directa de avances con Yimmi Urbano para que nunca te quedes estancado.',
    },
    {
      category: 'Modalidad y Grabaciones',
      question: '¿Qué pasa si un sábado no puedo conectarme o quiero repasar la clase?',
      answer:
        'Todas las sesiones en vivo quedan grabadas en alta definición y se suben junto con las plantillas, prompts y materiales de apoyo para que puedas repasarlas a tu propio ritmo en cualquier momento.',
    },
    {
      category: 'Proyecto',
      question: '¿Qué pasa si aún no tengo una idea de proyecto definida?',
      answer:
        'No hay problema. En el Sábado 1 trabajaremos una dinámica práctica para identificar oportunidades reales en tu entorno laboral o profesional, además de contar con un banco de casos reales propuestos por AGENCSI.',
    },
    {
      category: 'Inversión y Certificación',
      question: '¿El pago de S/ 180 es único e incluye el certificado?',
      answer:
        'Sí. La inversión de S/ 180 es un pago único por participante. Incluye las 4 sesiones en vivo (14 horas académicas), acceso a grabaciones, material de trabajo y la emisión de tu certificado al finalizar el programa.',
    },
  ],
}

export const courseCatalog: Record<string, CourseTemplateData> = {
  [programmerIaCourse.slug]: programmerIaCourse,
  'programmer-ia-proyect': programmerIaCourse,
}

export function findCourseBySlug(slug: string): CourseTemplateData | undefined {
  return courseCatalog[slug]
}
