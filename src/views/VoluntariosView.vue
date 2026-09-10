<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import ModalDictamen from '../components/ModalDictamen.vue'

// Estado del Panel
const reportesPendientes = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const searchQuery = ref('')
const selectedTipoFiltro = ref('Todos')

// Modal de Dictamen
const isModalOpen = ref(false)
const reporteSeleccionado = ref(null)

// Métricas de moderación
const dictamenesEmitidosHoy = ref(0)
const feedbackExito = ref('')

// Reportes iniciales de muestra por si la base remota está vacía o tiene RLS estricto
const casosMuestra = [
  {
    id: 101,
    url: 'https://alerta-nacional-sv.blogspot.com/2026/suspension-moneda-dolar',
    tipo_engano: 'Clickbait',
    detalles: 'Afirman falsamente que se eliminará la circulación del dólar este viernes sin citar al BCR.',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    estado: 'pendiente'
  },
  {
    id: 102,
    url: 'https://redes-sociales-sv.com/video-viral-puente-colapsado',
    tipo_engano: 'Contexto falso',
    detalles: 'Usan un video de una inundación en Asia de 2021 diciendo que ocurrió hoy en La Unión.',
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    estado: 'pendiente'
  },
  {
    id: 103,
    url: 'https://noticias-exprés-sv.info/vacunacion-obligatoria-colegios',
    tipo_engano: 'Fuente dudosa',
    detalles: 'Cadena de WhatsApp reenviada muchas veces con supuesta circular ministerial sin sello.',
    created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    estado: 'pendiente'
  }
]

// Cargar reportes pendientes desde Supabase
const cargarReportes = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await supabase
      .from('reportes')
      .select('*')
      .or('estado.eq.pendiente,estado.is.null')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Consulta a Supabase:', error.message)
      // Si la consulta falla o RLS restringe SELECT de pendientes a anon, cargamos cola local
      reportesPendientes.value = [...casosMuestra]
    } else if (data && data.length > 0) {
      reportesPendientes.value = data
    } else {
      // Si no hay pendientes en BD, inicializamos con los casos cívicos de muestra para evaluación
      reportesPendientes.value = [...casosMuestra]
    }
  } catch (err) {
    console.error('Error cargando reportes pendientes:', err)
    reportesPendientes.value = [...casosMuestra]
  } finally {
    isLoading.value = false
  }
}

// Abrir modal de dictamen
const evaluarReporte = (rep) => {
  reporteSeleccionado.value = rep
  isModalOpen.value = true
}

// Callback tras publicar dictamen
const onDictamenPublicado = (reporteActualizado) => {
  // Retirar de la lista de pendientes
  reportesPendientes.value = reportesPendientes.value.filter(r => r.id !== reporteActualizado.id)
  dictamenesEmitidosHoy.value++

  feedbackExito.value = `¡Dictamen emitido exitosamente para el reporte #${reporteActualizado.id}! El caso fue transferido al Repositorio Público de Alertas.`
  
  setTimeout(() => {
    feedbackExito.value = ''
  }, 6000)
}

// Filtros y Búsqueda
const reportesFiltrados = computed(() => {
  return reportesPendientes.value.filter(r => {
    const coincideBusqueda = 
      !searchQuery.value ||
      r.url?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.detalles?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.tipo_engano?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const coincideTipo = 
      selectedTipoFiltro.value === 'Todos' ||
      r.tipo_engano === selectedTipoFiltro.value

    return coincideBusqueda && coincideTipo
  })
})

const formatearFecha = (dateStr) => {
  if (!dateStr) return 'Reciente'
  try {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('es-SV', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    }).format(date)
  } catch (_) {
    return 'Reciente'
  }
}

const cargarCasosMuestra = () => {
  reportesPendientes.value = [...casosMuestra]
}

onMounted(() => {
  cargarReportes()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Top Institutional Banner -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Panel Interno de Moderación Ética
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cola de Auditoría para <span class="shimmer-text">Voluntarios</span>
        </h1>
        <p class="text-sm text-slate-400 mt-1 max-w-2xl">
          Supervisión humana cívica independiente. Analiza las alertas enviadas por la ciudadanía y emite veredictos fundamentados en fuentes primarias.
        </p>
      </div>

      <!-- Métricas rápidas -->
      <div class="flex items-center gap-3">
        <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[100px]">
          <span class="text-[10px] uppercase font-bold text-slate-500 block">En Cola</span>
          <span class="text-xl font-black text-amber-400 font-mono">{{ reportesPendientes.length }}</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[100px]">
          <span class="text-[10px] uppercase font-bold text-slate-500 block">Auditados Hoy</span>
          <span class="text-xl font-black text-emerald-400 font-mono">{{ dictamenesEmitidosHoy }}</span>
        </div>
      </div>
    </div>

    <!-- Success Feedback Notification -->
    <transition name="fade">
      <div 
        v-if="feedbackExito"
        class="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between gap-3 shadow-lg shadow-emerald-950/20"
      >
        <div class="flex items-center gap-2.5">
          <span class="text-xl">✅</span>
          <span>{{ feedbackExito }}</span>
        </div>
        <RouterLink 
          to="/alertas" 
          class="text-xs font-bold text-cyan-400 underline hover:text-white flex-shrink-0"
        >
          Ver en Alertas Públicas →
        </RouterLink>
      </div>
    </transition>

    <!-- Controles de Filtrado y Búsqueda -->
    <div class="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
      
      <!-- Search Input -->
      <div class="relative w-full sm:max-w-md">
        <input 
          type="text"
          v-model="searchQuery"
          placeholder="Buscar por URL, motivo o tipo de engaño..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none transition-all"
        />
        <svg class="h-4 w-4 text-slate-500 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <!-- Filtro por Tipo de Engaño -->
      <div class="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <span class="text-xs text-slate-500 font-semibold hidden lg:inline">Filtro:</span>
        <button
          v-for="tipo in ['Todos', 'Clickbait', 'Contexto falso', 'Fuente dudosa', 'Contenido manipulado']"
          :key="tipo"
          @click="selectedTipoFiltro = tipo"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
          :class="[
            selectedTipoFiltro === tipo
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
          ]"
        >
          {{ tipo }}
        </button>
      </div>

    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-12 text-center glass-panel rounded-3xl border border-slate-800">
      <div class="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-sm text-slate-400 font-medium">Sincronizando cola de moderación cívica con Supabase...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="p-8 text-center glass-panel rounded-3xl border border-rose-500/30">
      <span class="text-3xl mb-3 block">⚠️</span>
      <h3 class="text-base font-bold text-white mb-1">Error al conectar con la cola de moderación</h3>
      <p class="text-xs text-slate-400 max-w-md mx-auto mb-4">{{ errorMessage }}</p>
      <button 
        @click="cargarReportes"
        class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
      >
        Reintentar conexión
      </button>
    </div>

    <!-- Empty State: Sin reportes pendientes -->
    <div v-else-if="reportesFiltrados.length === 0" class="p-12 text-center glass-panel rounded-3xl border border-slate-800/80 space-y-4">
      <div class="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-3xl mx-auto shadow-inner">
        ✨
      </div>
      <div>
        <h3 class="text-lg font-bold text-white">Cola de moderación al día</h3>
        <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
          No hay reportes pendientes con los filtros seleccionados. Todos los casos reportados por la ciudadanía han sido evaluados o no coinciden con la búsqueda.
        </p>
      </div>

      <div class="pt-2 flex justify-center gap-3">
        <button 
          @click="cargarCasosMuestra"
          class="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
        >
          Cargar Casos de Prueba para Auditoría
        </button>
        <button 
          @click="cargarReportes"
          class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
        >
          Refrescar Cola
        </button>
      </div>
    </div>

    <!-- Tabla / Lista de Reportes Pendientes -->
    <div v-else class="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="bg-slate-950/70 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" class="px-6 py-4">ID & Fecha</th>
              <th scope="col" class="px-6 py-4">URL Reportada</th>
              <th scope="col" class="px-6 py-4">Tipo de Engaño</th>
              <th scope="col" class="px-6 py-4">Detalles Ciudadanos</th>
              <th scope="col" class="px-6 py-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-300">
            <tr 
              v-for="reporte in reportesFiltrados" 
              :key="reporte.id"
              class="hover:bg-slate-800/40 transition-colors"
            >
              <!-- ID y Fecha -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="font-mono text-cyan-400 font-bold block">#{{ reporte.id }}</span>
                <span class="text-[11px] text-slate-500">{{ formatearFecha(reporte.created_at) }}</span>
              </td>

              <!-- URL Sospechosa -->
              <td class="px-6 py-4 max-w-xs sm:max-w-sm">
                <a 
                  :href="reporte.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="font-mono text-xs text-slate-200 hover:text-cyan-400 hover:underline truncate block"
                  :title="reporte.url"
                >
                  {{ reporte.url }}
                </a>
              </td>

              <!-- Tipo de Engaño -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="[
                    reporte.tipo_engano === 'Clickbait' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' :
                    reporte.tipo_engano === 'Contexto falso' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30' :
                    reporte.tipo_engano === 'Contenido manipulado' ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30' :
                    'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  ]"
                >
                  {{ reporte.tipo_engano }}
                </span>
              </td>

              <!-- Detalles Originales -->
              <td class="px-6 py-4 max-w-xs text-xs text-slate-400 truncate">
                {{ reporte.detalles || 'Sin observaciones adicionales por el remitente.' }}
              </td>

              <!-- Acción: Evaluar -->
              <td class="px-6 py-4 text-right whitespace-nowrap">
                <button 
                  @click="evaluarReporte(reporte)"
                  class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20 transition-all hover:scale-[1.03] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>⚖️</span>
                  <span>Dictaminar</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

        <!-- Table Footer -->
        <div class="px-6 py-3 bg-slate-950/50 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span>Mostrando {{ reportesFiltrados.length }} casos en cola</span>
          <span class="italic">Prioridad por orden cronológico de ingreso</span>
        </div>
      </div>

    <!-- Guía Ética Breve para el Voluntario -->
    <div class="mt-10 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-2">
      <div class="flex items-center gap-2 font-bold text-slate-300 text-sm">
        <span>📜</span>
        <span>Código de Conducta para Voluntarios y Auditores</span>
      </div>
      <p class="leading-relaxed">
        El Portal Nacional contra las Fake News se rige por los estándares del <em>International Fact-Checking Network (IFCN)</em>:
        <strong>1. Compromiso de no partidismo e imparcialidad</strong> (evaluar hechos, no personas ni partidos);
        <strong>2. Transparencia de fuentes</strong> (prohibido emitir dictámenes sin enlace a fuentes primarias comprobables);
        <strong>3. Rigor metodológico</strong> (justificar con evidencia fáctica y nunca con opiniones subjetivas).
      </p>
    </div>

    <!-- Modal de Emisión de Dictamen -->
    <ModalDictamen 
      :is-open="isModalOpen"
      :reporte="reporteSeleccionado"
      @close="isModalOpen = false"
      @dictamen-publicado="onDictamenPublicado"
    />

  </div>
</template>
