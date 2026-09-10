<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('Puente en San Miguel')
const hasSearched = ref(true)
const selectedCategory = ref('Todos')
const activeComparisonView = ref('grid') // 'grid' or 'table'

const categories = ['Todos', 'Infraestructura', 'Economía', 'Seguridad', 'Sociedad']

// Mock datasets for different search terms
const mockEvents = [
  {
    tema: 'Puente en San Miguel',
    fuentes: [
      {
        id: 1,
        medio: "Diario El Salvador Central",
        fuenteTipo: "Medio Estatal / Oficialista",
        fuenteTag: "Fuente 1",
        fecha: "10 de Septiembre, 2026",
        titular: "Gobierno avanza en megaobra vial de San Miguel: Reducirá a la mitad los tiempos de traslado hacia el oriente",
        resumen: "El reporte resalta la celeridad de las obras públicas, la inversión gubernamental de 45 millones de dólares y el impacto positivo directo en el comercio regional de la zona oriental.",
        enfoque: "Gubernamental / Optimista",
        enfoqueColor: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30",
        puntosClave: ["45M de inversión", "Generación de 1,200 empleos", "Hito histórico regional"],
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
        puntosClave: ["Afectación a mantos acuíferos", "Reclamo por consultas vecinales", "Riesgos de erosión"],
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
        puntosClave: ["Variación presupuestaria 24%", "Retorno estimado en 10 años", "Financiamiento por bonos"],
        neutralidadScore: 91
      },
      {
        id: 4,
        medio: "Agencia Noticiosa Regional",
        fuenteTipo: "Cable Internacional",
        fuenteTag: "Fuente 4",
        fecha: "10 de Septiembre, 2026",
        titular: "Inician obras de interconexión logística en el oriente salvadoreño con miras al transporte de carga regional",
        resumen: "Sintetiza la obra desde una óptica de integración regional centroamericana, citando tanto a transportistas como a voceros institucionales sin tomar partido.",
        enfoque: "Descriptivo / Balanceado",
        enfoqueColor: "from-purple-500/20 to-indigo-500/10 text-purple-300 border-purple-500/30",
        puntosClave: ["Ruta comercial CA-1", "Opinión de gremio de transporte", "Contexto centroamericano"],
        neutralidadScore: 95
      }
    ]
  }
]

const currentResults = computed(() => {
  return mockEvents[0].fuentes
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
          placeholder="Busca un evento (ej. Puente en San Miguel, Subsidios, Hospitales)..."
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

    <!-- Quick Trending Topics / Filter Pills -->
    <div class="flex flex-wrap items-center justify-center gap-2 mb-12 text-xs">
      <span class="text-slate-500 font-medium mr-1">Tendencias verificadas:</span>
      <button 
        v-for="topic in ['Puente en San Miguel', 'Canasta Básica', 'Ciberseguridad', 'Subsidio al Transporte']"
        :key="topic"
        @click="quickSearch(topic)"
        class="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer"
      >
        # {{ topic }}
      </button>
    </div>

    <!-- Results Section -->
    <div v-if="hasSearched" class="space-y-8 animate-fade-in">
      
      <!-- Analytics Meta Bar -->
      <div class="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h2 class="text-xl font-bold text-white tracking-tight">
              Análisis comparativo: <span class="text-cyan-400 font-normal">"{{ searchQuery }}"</span>
            </h2>
            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              4 Fuentes trianguladas
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Comparativa estructurada de encuadres mediáticos y puntos de énfasis.</p>
        </div>

        <!-- Metric tags -->
        <div class="flex items-center gap-3">
          <div class="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <span class="text-slate-500 mr-1.5">Concordancia fáctica:</span>
            <span class="text-emerald-400 font-semibold">Alta (88%)</span>
          </div>
          <div class="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <span class="text-slate-500 mr-1.5">Dispersión de encuadre:</span>
            <span class="text-amber-400 font-semibold">Moderada</span>
          </div>
        </div>
      </div>

      <!-- Comparison Grid (Side by side) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <div 
          v-for="(item, index) in currentResults" 
          :key="item.id"
          class="glass-card glass-card-hover rounded-2xl p-6 flex flex-col relative overflow-hidden group border border-slate-800/80"
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
            <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
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
        Ingresa un acontecimiento en la barra superior o selecciona una de las tendencias sugeridas para comparar fuentes.
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
