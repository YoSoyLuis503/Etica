<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('Puente en San Miguel')
const hasSearched = ref(true)

// ==========================================
// 4 CASOS PREDETERMINADOS DE TRIANGULACIÓN
// ==========================================
const mockEvents = [
  {
    id: 'san-miguel',
    tema: 'Puente en San Miguel',
    categoria: 'Infraestructura',
    concordancia: 'Alta (88%)',
    dispersion: 'Moderada',
    resumenTema: 'Comparativa de encuadres sobre el avance de la megaobra vial en oriente, costos de licitación e impacto comunitario.',
    fuentes: [
      {
        id: 1,
        medio: "Diario El Salvador Central",
        fuenteTipo: "Medio Estatal / Institucional",
        fuenteTag: "Fuente 1",
        fecha: "10 de Septiembre, 2026",
        titular: "Gobierno avanza en megaobra vial de San Miguel: Reducirá a la mitad los tiempos de traslado hacia el oriente",
        resumen: "El reporte resalta la celeridad de las obras públicas, la inversión gubernamental de 45 millones de dólares y el impacto positivo directo en el comercio regional de la zona oriental.",
        enfoque: "Gubernamental / Optimista",
        enfoqueColor: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30",
        puntosClave: ["45M de inversión pública", "Generación de 1,200 empleos", "Hito de conectividad regional"],
        neutralidadScore: 78
      },
      {
        id: 2,
        medio: "El Independiente SV",
        fuenteTipo: "Prensa de Investigación",
        fuenteTag: "Fuente 2",
        fecha: "10 de Septiembre, 2026",
        titular: "Comunidades ribereñas advierten tala masiva y riesgo hídrico por nuevo tramo de puente en San Miguel",
        resumen: "La cobertura se enfoca en las advertencias de líderes comunitarios y defensores ambientales ante el posible impacto en la cuenca local y la falta de consulta ciudadana previa.",
        enfoque: "Crítico / Comunitario",
        enfoqueColor: "from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30",
        puntosClave: ["Afectación a mantos acuíferos", "Reclamo por consultas vecinales", "Riesgos de erosión en ribera"],
        neutralidadScore: 82
      },
      {
        id: 3,
        medio: "El Economista Local",
        fuenteTipo: "Análisis Financiero",
        fuenteTag: "Fuente 3",
        fecha: "9 de Septiembre, 2026",
        titular: "Costo de licitación para puente en San Miguel registra variación del 24% respecto al estimado preliminar",
        resumen: "Análisis técnico y presupuestario del financiamiento mediante bonos públicos, comparando los sobrecostos de insumos de construcción con el retorno de inversión proyectado a 10 años.",
        enfoque: "Técnico / Financiero",
        enfoqueColor: "from-cyan-500/20 to-blue-500/10 text-cyan-300 border-cyan-500/30",
        puntosClave: ["Variación presupuestaria 24%", "Retorno estimado en 10 años", "Financiamiento por títulos de deuda"],
        neutralidadScore: 91
      },
      {
        id: 4,
        medio: "Agencia Noticiosa Regional",
        fuenteTipo: "Cable Internacional",
        fuenteTag: "Fuente 4",
        fecha: "10 de Septiembre, 2026",
        titular: "Inician obras de interconexión logística en el oriente salvadoreño con miras al transporte de carga regional",
        resumen: "Sintetiza la obra desde una óptica de integración centroamericana, citando tanto a gremios de transportistas como a voceros ministeriales sin sesgo valorativo.",
        enfoque: "Descriptivo / Balanceado",
        enfoqueColor: "from-purple-500/20 to-indigo-500/10 text-purple-300 border-purple-500/30",
        puntosClave: ["Ruta logística del corredor CA-1", "Opinión gremial de transporte", "Contexto de comercio regional"],
        neutralidadScore: 95
      }
    ]
  },
  {
    id: 'canasta-basica',
    tema: 'Canasta Básica',
    categoria: 'Economía',
    concordancia: 'Alta (92%)',
    dispersion: 'Marcada / Polarizada',
    resumenTema: 'Contraste entre los precios monitoreados en agro-mercados estatales, mercados municipales y el impacto del costo de vida en los hogares.',
    fuentes: [
      {
        id: 1,
        medio: "Diario El Salvador Central",
        fuenteTipo: "Medio Estatal / Institucional",
        fuenteTag: "Fuente 1",
        fecha: "11 de Septiembre, 2026",
        titular: "Agromercados solidarios reportan alivio económico de hasta 35% en hortalizas y granos de primera necesidad",
        resumen: "Enfatiza el éxito de las plazas agrícolas itinerantes impulsadas por el Ministerio de Agricultura, destacando la eliminación de intermediarios y el acceso a precios populares.",
        enfoque: "Gubernamental / Proactivo",
        enfoqueColor: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30",
        puntosClave: ["35% de ahorro en hortalizas", "Eliminación de intermediarios", "Más de 40 puntos de venta activos"],
        neutralidadScore: 76
      },
      {
        id: 2,
        medio: "Defensoría & Observatorio de Precios",
        fuenteTipo: "Monitoreo Técnico Oficial",
        fuenteTag: "Fuente 2",
        fecha: "11 de Septiembre, 2026",
        titular: "Sondeo nacional refleja estabilidad general en granos, pero persisten alzas puntuales en lácteos y huevos",
        resumen: "Informe estadístico con tabla de precios promedio ponderados a nivel nacional. Destaca que frijol y maíz mantienen cotizaciones estables, mientras quesos y huevos sufren alzas estacionales.",
        enfoque: "Estadístico / Neutral",
        enfoqueColor: "from-cyan-500/20 to-blue-500/10 text-cyan-300 border-cyan-500/30",
        puntosClave: ["Estabilidad en frijol de seda", "Incremento estacional en lácteos", "Monitoreo en 200 establecimientos"],
        neutralidadScore: 93
      },
      {
        id: 3,
        medio: "El Independiente SV",
        fuenteTipo: "Prensa Crítica / Sector Productivo",
        fuenteTag: "Fuente 3",
        fecha: "10 de Septiembre, 2026",
        titular: "Asociaciones de agricultores advierten que importación masiva presiona cosechas locales de frijol y maíz",
        resumen: "Reportaje enfocado en las demandas de cooperativas agrícolas que señalan que los alimentos importados exentos de aranceles desincentivan la siembra nacional ante altos costos de fertilizantes.",
        enfoque: "Crítico / Gremial Agrario",
        enfoqueColor: "from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30",
        puntosClave: ["Costo de fertilizantes al alza", "Competencia de granos importados", "Piden subsidio directo a la siembra"],
        neutralidadScore: 84
      },
      {
        id: 4,
        medio: "Agencia Noticiosa Regional",
        fuenteTipo: "Cable Internacional (CEPAL / PMA)",
        fuenteTag: "Fuente 4",
        fecha: "11 de Septiembre, 2026",
        titular: "Inflación de alimentos en el norte de Centroamérica se modera, pero consumo absorbe el 42% del salario mínimo",
        resumen: "Análisis socioeconómico regional comparando los índices de precios al consumidor de El Salvador, Guatemala y Honduras, evaluando el poder adquisitivo real de las familias urbanas y rurales.",
        enfoque: "Analítico / Internacional",
        enfoqueColor: "from-purple-500/20 to-indigo-500/10 text-purple-300 border-purple-500/30",
        puntosClave: ["42% del ingreso a comida", "Comparativa Centroamérica", "Inflación subyacente moderada"],
        neutralidadScore: 94
      }
    ]
  },
  {
    id: 'ciberseguridad',
    tema: 'Ciberseguridad',
    categoria: 'Seguridad',
    concordancia: 'Media (84%)',
    dispersion: 'Técnica / Institucional',
    resumenTema: 'Posturas sobre la modernización de los sistemas digitales del Estado, protección de datos personales y amenazas de phishing.',
    fuentes: [
      {
        id: 1,
        medio: "Secretaría de Innovación Digital",
        fuenteTipo: "Comunicación Oficial del Estado",
        fuenteTag: "Fuente 1",
        fecha: "12 de Septiembre, 2026",
        titular: "El Salvador consolida soberanía digital y ciberdefensa en nube segura para trámites de la administración pública",
        resumen: "Informa sobre la migración de plataformas de atención ciudadana a centros de datos con certificación Tier IV y algoritmos de cifrado de última generación para evitar interrupciones de servicio.",
        enfoque: "Institucional / Tecnológico",
        enfoqueColor: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30",
        puntosClave: ["Infraestructura Tier IV", "Cero caídas en trámites en línea", "Cifrado de extremo a extremo"],
        neutralidadScore: 80
      },
      {
        id: 2,
        medio: "El Economista Local",
        fuenteTipo: "Análisis de Riesgo & Fintech",
        fuenteTag: "Fuente 2",
        fecha: "11 de Septiembre, 2026",
        titular: "Sector financiero incrementa en 40% presupuesto de ciberseguridad ante sofisticación de malware bancario regional",
        resumen: "Estudio de inversiones del sistema bancario salvadoreño enfocado en la prevención de fraudes por ingeniería social, clones de sitios web de banca móvil y autenticación biométrica multifactor.",
        enfoque: "Financiero / Preventivo",
        enfoqueColor: "from-cyan-500/20 to-blue-500/10 text-cyan-300 border-cyan-500/30",
        puntosClave: ["+40% en inversión preventiva", "Auge de ingeniería social y phishing", "Adopción de biometría FIDO2"],
        neutralidadScore: 92
      },
      {
        id: 3,
        medio: "El Independiente SV",
        fuenteTipo: "Prensa de Investigación / Derechos",
        fuenteTag: "Fuente 3",
        fecha: "12 de Septiembre, 2026",
        titular: "Expertos en derechos digitales piden ley marco de protección de datos y auditorías externas independientes",
        resumen: "Recoge los señalamientos de especialistas en derecho informático sobre la necesidad de regular de forma estricta el uso de reconocimiento facial en el espacio público y proteger la privacidad ciudadana.",
        enfoque: "Crítico / Garantista",
        enfoqueColor: "from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30",
        puntosClave: ["Urgencia de Ley de Datos Personales", "Auditoría a sistemas biométricos", "Límites a la vigilancia masiva"],
        neutralidadScore: 85
      },
      {
        id: 4,
        medio: "Agencia Noticiosa Regional",
        fuenteTipo: "Reporte Global de Ciberamenazas",
        fuenteTag: "Fuente 4",
        fecha: "12 de Septiembre, 2026",
        titular: "Centroamérica experimenta alza del 48% en ciberataques contra pequeñas empresas y entidades municipales",
        resumen: "Informe semestral de firmas de seguridad informática que ubica a la región como blanco prioritario de bandas de ransomware automatizado debido a brechas de actualización en software legado.",
        enfoque: "Estadístico / Forense",
        enfoqueColor: "from-purple-500/20 to-indigo-500/10 text-purple-300 border-purple-500/30",
        puntosClave: ["48% más de ataques de ransomware", "Vulnerabilidad en servidores locales", "Falta de copias de seguridad aisladas"],
        neutralidadScore: 96
      }
    ]
  },
  {
    id: 'subsidio-transporte',
    tema: 'Subsidio al Transporte',
    categoria: 'Sociedad',
    concordancia: 'Alta (89%)',
    dispersion: 'Contraste de Intereses',
    resumenTema: 'Triangulación entre la postura oficial sobre la tarifa de pasajes, el reclamo financiero de las gremiales de buses y la queja ciudadana por el servicio.',
    fuentes: [
      {
        id: 1,
        medio: "Viceministerio de Transporte (VMT)",
        fuenteTipo: "Canal Oficial del Estado",
        fuenteTag: "Fuente 1",
        fecha: "12 de Septiembre, 2026",
        titular: "VMT despliega operativos nacionales para garantizar cobro de tarifa legal de $0.20 y fiscalizar subsidio",
        resumen: "Las autoridades aseguran mano firme contra las unidades que cobren tarifas alteradas e informan de multas aplicadas a conductores infractores, ratificando la protección del bolsillo familiar.",
        enfoque: "Oficial / Control Ciudadano",
        enfoqueColor: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30",
        puntosClave: ["Tarifa fija garantizada en $0.20", "Más de 150 multas en terminales", "Condicionamiento del subsidio a buen servicio"],
        neutralidadScore: 79
      },
      {
        id: 2,
        medio: "Mesa Nacional de Transporte",
        fuenteTipo: "Gremial Empresarial de Concesionarios",
        fuenteTag: "Fuente 2",
        fecha: "11 de Septiembre, 2026",
        titular: "Empresarios de transporte piden agilizar desembolsos de compensación ante costos de operación y diésel",
        resumen: "Representantes del sector afirman que el pago de la compensación económica acumula meses de desfase en algunas rutas, lo que complica el pago de créditos bancarios y el mantenimiento mecánico preventivo.",
        enfoque: "Gremial / Financiero",
        enfoqueColor: "from-cyan-500/20 to-blue-500/10 text-cyan-300 border-cyan-500/30",
        puntosClave: ["Demora en pagos de compensación", "Encarecimiento de llantas y repuestos", "Riesgo de reducción de flotas"],
        neutralidadScore: 81
      },
      {
        id: 3,
        medio: "Colectivo de Usuarios Urbanos",
        fuenteTipo: "Voz Ciudadana / Pasajeros",
        fuenteTag: "Fuente 3",
        fecha: "12 de Septiembre, 2026",
        titular: "Usuarios denuncian recortes no autorizados de recorridos y unidades en mal estado en horarios nocturnos",
        resumen: "Muestra testimonios de trabajadores y estudiantes que relatan tiempos de espera superiores a 50 minutos después de las 7:00 PM y reclaman que el subsidio debe exigir la modernización de los microbuses.",
        enfoque: "Crítico / Testimonial",
        enfoqueColor: "from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30",
        puntosClave: ["Abandono de rutas nocturnas", "Unidades sin condiciones mínimas", "Demanda de trato digno al usuario"],
        neutralidadScore: 86
      },
      {
        id: 4,
        medio: "El Independiente SV",
        fuenteTipo: "Estudio de Políticas Públicas (UCA)",
        fuenteTag: "Fuente 4",
        fecha: "11 de Septiembre, 2026",
        titular: "El 78% de la población urbana depende de buses: radiografía del sistema de movilidad y gasto en pasaje",
        resumen: "Investigación académica que desglosa cómo impacta el gasto de transporte en la economía informal y propone una transición hacia sistemas integrados de transporte metropolitano con recaudo electrónico.",
        enfoque: "Académico / Estructural",
        enfoqueColor: "from-purple-500/20 to-indigo-500/10 text-purple-300 border-purple-500/30",
        puntosClave: ["78% de dependencia del bus", "Urgencia de pago electrónico transparente", "Propuesta de troncales integradas"],
        neutralidadScore: 95
      }
    ]
  }
]

// Identificar el evento activo por búsqueda o selección
const eventoActivo = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return mockEvents[0]

  const encontrado = mockEvents.find(e => 
    e.tema.toLowerCase().includes(q) || 
    q.includes(e.tema.toLowerCase()) ||
    e.categoria.toLowerCase().includes(q)
  )

  return encontrado || mockEvents[0]
})

const currentResults = computed(() => {
  return eventoActivo.value.fuentes
})

const quickSearch = (term) => {
  searchQuery.value = term
  hasSearched.value = true
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    hasSearched.value = true
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Hero & Header -->
    <div class="text-center max-w-3xl mx-auto mb-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        Triangulación de Fuentes &bull; Algoritmo de Contraste
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Compara las noticias <span class="shimmer-text">lado a lado</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-400 leading-relaxed">
        Analiza cómo diferentes medios reportan el mismo acontecimiento. Identifica sesgos, omisiones y encuadres discursivos en tiempo real.
      </p>
    </div>

    <!-- Search Box with Floating Glow -->
    <div class="max-w-3xl mx-auto mb-8 relative group">
      <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-indigo-600/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
      
      <div class="relative glass-panel rounded-2xl p-2.5 shadow-2xl flex items-center gap-3">
        <div class="pl-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input 
          v-model="searchQuery" 
          @keyup.enter="performSearch"
          type="text" 
          placeholder="Busca un evento (ej. Puente en San Miguel, Canasta Básica, Ciberseguridad)..."
          class="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 text-base sm:text-lg"
        />

        <button 
          @click="performSearch"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>Triangular</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 4 Quick Trending Topics / Filter Pills -->
    <div class="flex flex-wrap items-center justify-center gap-2.5 mb-12 text-xs">
      <span class="text-slate-500 font-semibold mr-1">4 Ejemplos predeterminados:</span>
      <button 
        v-for="ev in mockEvents"
        :key="ev.id"
        @click="quickSearch(ev.tema)"
        class="px-3.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-1.5"
        :class="[
          eventoActivo.id === ev.id
            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10 font-bold scale-[1.03]'
            : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
        ]"
      >
        <span class="text-[10px]">#</span>
        <span>{{ ev.tema }}</span>
        <span class="text-[10px] text-slate-500 uppercase">({{ ev.categoria }})</span>
      </button>
    </div>

    <!-- Results Section -->
    <div v-if="hasSearched" class="space-y-8 animate-fade-in">
      
      <!-- Analytics Meta Bar -->
      <div class="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <h2 class="text-xl font-bold text-white tracking-tight">
              Análisis comparativo: <span class="text-cyan-400 font-normal">"{{ eventoActivo.tema }}"</span>
            </h2>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              4 Fuentes trianguladas
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400 border border-slate-700/60">
              {{ eventoActivo.categoria }}
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            {{ eventoActivo.resumenTema }}
          </p>
        </div>

        <!-- Metric tags -->
        <div class="flex items-center gap-3 flex-wrap">
          <div class="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            <span class="text-slate-500 mr-1.5">Concordancia fáctica:</span>
            <span class="text-emerald-400 font-semibold">{{ eventoActivo.concordancia }}</span>
          </div>
          <div class="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            <span class="text-slate-500 mr-1.5">Dispersión de encuadre:</span>
            <span class="text-amber-400 font-semibold">{{ eventoActivo.dispersion }}</span>
          </div>
        </div>
      </div>

      <!-- Comparison Grid (Side by side 4 Sources) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <div 
          v-for="(item, index) in currentResults" 
          :key="item.id"
          class="glass-card glass-card-hover rounded-3xl p-6 flex flex-col relative overflow-hidden group border border-slate-800/80"
          :style="{ animationDelay: `${index * 120}ms` }"
        >
          <!-- Accent Gradient Top Border -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <!-- Source & Tag Header -->
          <div class="flex items-start justify-between gap-2 mb-4">
            <div>
              <span class="text-[10px] font-bold tracking-wider uppercase text-cyan-400 block mb-0.5">
                {{ item.fuenteTag }}
              </span>
              <h3 class="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {{ item.medio }}
              </h3>
              <span class="text-[11px] text-slate-400">{{ item.fuenteTipo }}</span>
            </div>
            <span class="text-[11px] text-slate-500 whitespace-nowrap bg-slate-900/60 px-2 py-1 rounded-md border border-slate-800">
              {{ item.fecha.split(',')[0] }}
            </span>
          </div>

          <!-- Headline -->
          <div class="mb-4">
            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">Titular publicado:</span>
            <h4 class="text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
              "{{ item.titular }}"
            </h4>
          </div>

          <!-- Neutral Summary -->
          <div class="mb-6 flex-grow">
            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">Resumen neutral del contenido:</span>
            <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-2xl border border-slate-800/50">
              {{ item.resumen }}
            </p>
          </div>

          <!-- Key Points / Angles Detected -->
          <div class="mb-5">
            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">Puntos de énfasis:</span>
            <ul class="space-y-1.5">
              <li 
                v-for="(punto, pIdx) in item.puntosClave" 
                :key="pIdx"
                class="text-[11px] text-slate-300 flex items-center gap-1.5"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
                <span>{{ punto }}</span>
              </li>
            </ul>
          </div>

          <!-- Framing & Tone Badge -->
          <div class="mt-auto pt-4 border-t border-slate-800/70">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Enfoque:</span>
              <span 
                class="text-xs font-semibold px-2.5 py-1 rounded-lg border bg-gradient-to-r"
                :class="item.enfoqueColor"
              >
                {{ item.enfoque }}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- Empty Search State -->
    <div v-else class="text-center py-20 glass-card rounded-3xl border border-slate-800/60 max-w-2xl mx-auto">
      <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-slate-200 mb-1">Comienza tu primera triangulación</h3>
      <p class="text-sm text-slate-400 max-w-md mx-auto">
        Ingresa un acontecimiento en la barra superior o selecciona una de las 4 tendencias sugeridas para comparar fuentes.
      </p>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
