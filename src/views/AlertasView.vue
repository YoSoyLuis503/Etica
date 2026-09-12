<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import TarjetaAlertaVerificada from '../components/TarjetaAlertaVerificada.vue'

// Estado
const alertas = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const searchQuery = ref('')
const filtroVeredicto = ref('todos')

// Alertas de muestra con rigor cívico por si la base remota no tiene registros dictaminados aún
const alertasMuestra = [
  {
    id: 1,
    url: 'https://noticias-sv-verdad24.blogspot.com/2026/ministro-huye',
    tipo_engano: 'Clickbait',
    estado: 'engañoso',
    veredicto: 'engañoso',
    justificacion_veredicto: 'Publicación completamente fabricada con el objetivo de generar viralidad artificial. Se verificaron las bitácoras oficiales de la institución y el funcionario se encontraba en sesión ordinaria presencial transmitida en vivo. El portal difusor es un blog gratuito sin firma periodística.',
    fuente_respaldo: 'https://asamblea.gob.sv/sesion-plenaria-transmision-oficial',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: 2,
    url: 'https://laprensa-grafica.noticias-al-dia.info/alerta-bancaria',
    tipo_engano: 'Fuente dudosa',
    estado: 'engañoso',
    veredicto: 'engañoso',
    justificacion_veredicto: 'Intento de suplantación de identidad de un periódico salvadoreño mediante un dominio clonado (.info en lugar de .com). El contenido busca provocar pánico financiero. La Asociación Bancaria de El Salvador (ABANSA) y la Superintendencia del Sistema Financiero emitieron comunicado desmintiendo cualquier alteración operativa.',
    fuente_respaldo: 'https://ssf.gob.sv/comunicados/estabilidad-sistema-financiero',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 3,
    url: 'https://cadena-whatsapp.sv/aviso-corte-agua-satelites',
    tipo_engano: 'Contexto falso',
    estado: 'falta_contexto',
    veredicto: 'falta_contexto',
    justificacion_veredicto: 'Bulo recurrente que mezcla información de mantenimiento rutinario con conceptos incongruentes (satélites con agua potable). Existe un corte programado únicamente para dos colonias de Soyapango por reparación de tubería, pero no en todo el territorio nacional como afirma la cadena.',
    fuente_respaldo: 'https://anda.gob.sv/avisos/reparacion-soyapango-zona-este',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  },
  {
    id: 4,
    url: 'https://www.bcr.gob.sv/estadisticas/remesas-familiares-2026',
    tipo_engano: 'Revisión preventiva',
    estado: 'verificado',
    veredicto: 'verificado',
    justificacion_veredicto: 'El reporte denunciado sobre el incremento interanual en el volumen de remesas coincide con las bases de datos de comercio exterior y liquidación bancaria del Banco Central de Reserva. Los datos y gráficos presentados son auténticos y metodológicamente consistentes.',
    fuente_respaldo: 'https://bcr.gob.sv/informes/estadisticas-macroeconomicas',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  }
]

// Cargar alertas dictaminadas desde Supabase
const cargarAlertas = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await supabase
      .from('reportes')
      .select('*')
      .neq('estado', 'pendiente')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al consultar alertas en Supabase:', error.message)
      errorMessage.value = 'Error al consultar Supabase: ' + error.message
    } else {
      // Filtrar aquellos que tengan veredicto emitido o estado no pendiente
      const conVeredicto = (data || []).filter(d => d.veredicto || (d.estado && d.estado !== 'pendiente'))
      alertas.value = conVeredicto
    }
  } catch (err) {
    console.error('Error al obtener alertas verificadas:', err)
    errorMessage.value = 'Ocurrió un error al cargar el repositorio de alertas.'
  } finally {
    isLoading.value = false
  }
}

// Filtros y búsqueda
const alertasFiltradas = computed(() => {
  return alertas.value.filter(item => {
    // Filtro por Veredicto
    const v = item.veredicto || item.estado
    const coincideVeredicto = 
      filtroVeredicto.value === 'todos' || 
      v === filtroVeredicto.value

    // Filtro por Búsqueda de texto
    const q = searchQuery.value.trim().toLowerCase()
    const coincideBusqueda = 
      !q ||
      item.url?.toLowerCase().includes(q) ||
      item.justificacion_veredicto?.toLowerCase().includes(q) ||
      item.tipo_engano?.toLowerCase().includes(q)

    return coincideVeredicto && coincideBusqueda
  })
})

// Contadores para pestañas de filtros
const conteos = computed(() => {
  return {
    todos: alertas.value.length,
    enganoso: alertas.value.filter(a => (a.veredicto || a.estado) === 'engañoso').length,
    verificado: alertas.value.filter(a => (a.veredicto || a.estado) === 'verificado').length,
    falta_contexto: alertas.value.filter(a => (a.veredicto || a.estado) === 'falta_contexto').length
  }
})

onMounted(() => {
  cargarAlertas()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Hero / Encabezado Institucional -->
    <div class="text-center max-w-3xl mx-auto mb-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
        Gobernanza Cívica Híbrida &bull; Modelo Crowdsourcing + Auditoría Humana
      </div>
      
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Repositorio de <span class="shimmer-text">Alertas Verificadas</span>
      </h1>
      
      <p class="text-base sm:text-lg text-slate-400 leading-relaxed">
        Consultas públicas de contenido denunciado por la ciudadanía y dictaminado formalmente por verificadores voluntarios acreditados mediante contraste de fuentes primarias.
      </p>

      <!-- Banner Informativo del Modelo Ético -->
      <div class="mt-6 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-left flex items-start gap-3 text-xs text-slate-300">
        <span class="text-lg">⚖️</span>
        <div>
          <strong class="text-white block mb-0.5">¿Cómo funciona este repositorio?</strong>
          Los ciudadanos remiten enlaces sospechosos sin rastreo personal. Un equipo cívico de voluntarios contrasta cada hecho con registros oficiales o fuentes directas y emite una resolución pública motivada.
        </div>
      </div>
    </div>

    <!-- Barra de Búsqueda y Filtros -->
    <div class="mb-8 space-y-4">
      
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <!-- Input de Búsqueda -->
        <div class="relative w-full md:max-w-md">
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Buscar por URL, palabras clave o tema auditado..."
            class="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
          />
          <svg class="h-4 w-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button 
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-3 text-xs text-slate-500 hover:text-white"
          >
            Limpiar
          </button>
        </div>

        <!-- Botones de Acción -->
        <div class="flex items-center gap-2.5 w-full md:w-auto">
          <button
            @click="cargarAlertas"
            :disabled="isLoading"
            class="px-3.5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Sincronizar con Supabase"
          >
            <svg class="h-4 w-4" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="hidden sm:inline">Actualizar</span>
          </button>

          <RouterLink 
            to="/reportar"
            class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Reportar Alerta Ciudadana</span>
          </RouterLink>
        </div>

      </div>

      <!-- Filtros por Veredicto (Tabs) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          @click="filtroVeredicto = 'todos'"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          :class="[
            filtroVeredicto === 'todos'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800/60'
          ]"
        >
          <span>Todas las Alertas</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-700/60 font-mono">{{ conteos.todos }}</span>
        </button>

        <button
          @click="filtroVeredicto = 'engañoso'"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          :class="[
            filtroVeredicto === 'engañoso'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
              : 'text-slate-400 hover:text-rose-300 bg-slate-900/40 border border-slate-800/60'
          ]"
        >
          <span>🛑 Engañoso / Fake News</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-mono">{{ conteos.enganoso }}</span>
        </button>

        <button
          @click="filtroVeredicto = 'falta_contexto'"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          :class="[
            filtroVeredicto === 'falta_contexto'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-amber-300 bg-slate-900/40 border border-slate-800/60'
          ]"
        >
          <span>⚠️ Falta Contexto</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-mono">{{ conteos.falta_contexto }}</span>
        </button>

        <button
          @click="filtroVeredicto = 'verificado'"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          :class="[
            filtroVeredicto === 'verificado'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-emerald-300 bg-slate-900/40 border border-slate-800/60'
          ]"
        >
          <span>✅ Verificado / Auténtico</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">{{ conteos.verificado }}</span>
        </button>
      </div>

    </div>

    <!-- Loading State: Skeleton Cards -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="n in 4" 
        :key="n"
        class="glass-panel rounded-3xl p-6 border border-slate-800 animate-pulse space-y-4"
      >
        <div class="flex justify-between items-center">
          <div class="h-6 w-36 bg-slate-800 rounded-full"></div>
          <div class="h-4 w-20 bg-slate-800 rounded"></div>
        </div>
        <div class="h-5 w-3/4 bg-slate-800 rounded"></div>
        <div class="h-20 w-full bg-slate-800/60 rounded-2xl"></div>
        <div class="h-8 w-1/2 bg-slate-800 rounded-xl"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="p-8 text-center glass-panel rounded-3xl border border-rose-500/30">
      <span class="text-3xl mb-3 block">⚠️</span>
      <h3 class="text-base font-bold text-white mb-1">No se pudo cargar el repositorio</h3>
      <p class="text-xs text-slate-400 mb-4">{{ errorMessage }}</p>
      <button 
        @click="cargarAlertas"
        class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
      >
        Reintentar carga
      </button>
    </div>

    <!-- Empty State: Sin alertas que coincidan -->
    <div v-else-if="alertasFiltradas.length === 0" class="p-12 text-center glass-panel rounded-3xl border border-slate-800 space-y-4">
      <div class="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl mx-auto">
        🔍
      </div>
      <div>
        <h3 class="text-lg font-bold text-white">No se encontraron alertas</h3>
        <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
          No hay publicaciones dictaminadas que coincidan con "{{ searchQuery }}" o el filtro seleccionado.
        </p>
      </div>
      <button 
        @click="searchQuery = ''; filtroVeredicto = 'todos'"
        class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
      >
        Restablecer filtros
      </button>
    </div>

    <!-- Grid de Tarjetas de Alertas Verificadas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TarjetaAlertaVerificada 
        v-for="alerta in alertasFiltradas" 
        :key="alerta.id"
        :alerta="alerta"
      />
    </div>

    <!-- Pie institucional -->
    <div class="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
      <p>
        Las verificaciones publicadas son de libre consulta y replicación ciudadana. Se autoriza su cita mencionando la fuente primaria enlazada y el dictamen emitido por el voluntario.
      </p>
    </div>

  </div>
</template>
