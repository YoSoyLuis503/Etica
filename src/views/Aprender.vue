<script setup>
import { ref, computed } from 'vue'

const quizItems = ref([
  {
    id: 1,
    formato: "Publicación Viral en Redes",
    icono: "alert",
    titular: "¡ESCÁNDALO DE ÚLTIMA HORA! Renuncia ministro clave tras filtración y huye del país en vuelo privado. ¡MIRA EL VIDEO ANTES QUE LO BORREN!",
    fuente: "noticias-sv-verdad24.blogspot.com",
    autor: "Redacción Libertad (Sin firma verificable)",
    fecha: "Hace 12 minutos",
    interacciones: "14.2K compartidos",
    analizado: false,
    esDesinformacion: true,
    veredictoTitulo: "Desinformación Flagrante / Clickbait Malicioso",
    veredictoColor: "from-rose-500/20 via-red-500/10 to-transparent text-rose-400 border-rose-500/40",
    explicacion: "El contenido presenta los 4 patrones clásicos de desinformación viral: urgencia artificial ('antes que lo borren'), tipografía alarmista en mayúsculas sostenidas, dominio gratuito no corporativo (blogspot.com) y ausencia total de periodistas firmantes.",
    banderasRojas: [
      { texto: "Dominio gratuito sospechoso (.blogspot)", severidad: "alta" },
      { texto: "Urgencia artificial & Clickbait", severidad: "alta" },
      { texto: "Autor anónimo no verificable", severidad: "media" },
      { texto: "Cero referencias a documentos o fuentes oficiales", severidad: "alta" }
    ],
    consejoCivico: "Verifica si los medios consolidados del país han reportado la misma noticia antes de compartir."
  },
  {
    id: 2,
    formato: "Boletín Estadístico Institucional",
    icono: "check",
    titular: "Encuesta Nacional: 74.8% de los salvadoreños prioriza el empleo y la estabilidad de precios en el último trimestre",
    fuente: "www.instituto-estudios-sv.org/informes/2026-q3",
    autor: "Dra. Elena Rivas & Lic. Carlos Mendoza (Equipo Demoscópico)",
    fecha: "Publicado ayer, 14:30",
    interacciones: "328 citas académicas",
    analizado: false,
    esDesinformacion: false,
    veredictoTitulo: "Contenido con Alta Credibilidad Metodológica",
    veredictoColor: "from-emerald-500/20 via-teal-500/10 to-transparent text-emerald-400 border-emerald-500/40",
    explicacion: "La pieza periodística e investigativa cumple con estándares de rigor: cita el tamaño de muestra (n=1,200), margen de error (+/- 2.8%), ficha técnica descargable, nombres de los investigadores y enlace al informe íntegro.",
    banderasRojas: [],
    consejoCivico: "Incluso con fuentes formales, es recomendable consultar la ficha metodológica y el financiamiento del estudio."
  },
  {
    id: 3,
    formato: "Cadena Reenviada de Mensajería",
    icono: "warning",
    titular: "¡AVISO URGENTE A TODOS LOS SALVADOREÑOS! Cortarán el agua y luz en todo el país por mantenimiento de satélites este sábado desde las 8 AM. Pasarlo a familiares.",
    fuente: "Cadena de WhatsApp / Telegram",
    autor: "«Reenviado muchas veces»",
    fecha: "Sin fecha identificable",
    interacciones: "Difundido en grupos vecinales",
    analizado: false,
    esDesinformacion: true,
    veredictoTitulo: "Bulo / Cadena Falsa Reenviada",
    veredictoColor: "from-amber-500/20 via-orange-500/10 to-transparent text-amber-400 border-amber-500/40",
    explicacion: "Los bulos de mensajería apelan a la necesidad básica de alertar a seres queridos. Mezclan conceptos incongruentes (satélites con agua y electricidad), omiten fechas precisas usando palabras relativas como 'este sábado' para recircular indefinidamente, y carecen de membrete oficial de ANDA o distribuidoras eléctricas.",
    banderasRojas: [
      { texto: "Etiqueta 'Reenviado muchas veces'", severidad: "alta" },
      { texto: "Fechas imprecisas ('este sábado')", severidad: "alta" },
      { texto: "Incongruencia técnica de servicios", severidad: "alta" }
    ],
    consejoCivico: "Nunca reenvíes cadenas de servicios básicos sin consultar los canales oficiales de las instituciones involucradas."
  }
])

const analizadosCount = computed(() => {
  return quizItems.value.filter(i => i.analizado).length
})

const analizar = (item) => {
  item.analizado = true
}

const toggleAnalisis = (item) => {
  item.analizado = !item.analizado
}

const reiniciarTodo = () => {
  quizItems.value.forEach(i => i.analizado = false)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto mb-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
        Gimnasio de Juicio Crítico &bull; Módulo Interactivo
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Alfabetización <span class="shimmer-text">Mediática</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-400 leading-relaxed">
        Pon a prueba tu criterio frente a casos reales de manipulación. Analiza titulares y desglosa los indicios forenses de desinformación.
      </p>

      <!-- Interactive Progress Bar -->
      <div class="mt-8 max-w-md mx-auto p-4 rounded-2xl glass-card border border-slate-800">
        <div class="flex justify-between items-center text-xs font-semibold mb-2">
          <span class="text-slate-400">Progreso de Análisis:</span>
          <span class="text-cyan-400">{{ analizadosCount }} de 3 casos evaluados</span>
        </div>
        <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
          <div 
            class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
            :style="{ width: `${(analizadosCount / 3) * 100}%` }"
          ></div>
        </div>
        <div v-if="analizadosCount === 3" class="mt-3 text-xs text-emerald-400 flex items-center justify-center gap-1 font-semibold animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          ¡Completaste todos los análisis del módulo!
        </div>
      </div>
    </div>

    <!-- 3 Case Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div 
        v-for="item in quizItems" 
        :key="item.id"
        class="glass-card rounded-3xl overflow-hidden flex flex-col border transition-all duration-500 relative"
        :class="[
          item.analizado 
            ? 'border-slate-700 shadow-2xl shadow-blue-900/10' 
            : 'border-slate-800/80 hover:border-slate-700'
        ]"
      >
        <!-- Mock UI Card Header -->
        <div class="p-5 border-b border-slate-800/60 bg-slate-900/40 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span class="text-[11px] font-semibold text-slate-400 ml-1.5">{{ item.formato }}</span>
          </div>

          <!-- Analysis State Badge -->
          <span 
            class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
            :class="item.analizado ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'"
          >
            {{ item.analizado ? 'Desglosado' : 'Pendiente' }}
          </span>
        </div>

        <!-- Simulated Headline & Metadata Section -->
        <div class="p-6 flex-grow flex flex-col">
          
          <div class="mb-4">
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span>{{ item.fecha }}</span>
              <span>&bull;</span>
              <span class="text-slate-400">{{ item.interacciones }}</span>
            </div>

            <!-- Headline with dynamic styling -->
            <h3 class="text-lg font-bold text-white leading-snug mb-3">
              {{ item.titular }}
            </h3>

            <!-- Source & Author snippet -->
            <div class="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-slate-500 font-medium">Fuente:</span>
                <span class="font-mono text-cyan-300/90 truncate">{{ item.fuente }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-slate-500 font-medium">Firma:</span>
                <span class="text-slate-300">{{ item.autor }}</span>
              </div>
            </div>
          </div>

          <!-- Unanalyzed State Action Button -->
          <div v-if="!item.analizado" class="mt-auto pt-6">
            <button 
              @click="analizar(item)"
              class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Analizar Indicios</span>
            </button>
          </div>

          <!-- Analyzed State (Forensic breakdown with animated transition) -->
          <transition name="expand">
            <div v-if="item.analizado" class="mt-auto pt-4 border-t border-slate-800/80 space-y-4">
              
              <!-- Verdict Banner -->
              <div 
                class="p-3.5 rounded-xl border bg-gradient-to-br flex items-start gap-3"
                :class="item.veredictoColor"
              >
                <div class="mt-0.5">
                  <svg v-if="item.esDesinformacion" class="h-5 w-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold tracking-wide uppercase">
                    {{ item.veredictoTitulo }}
                  </h4>
                  <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                    {{ item.explicacion }}
                  </p>
                </div>
              </div>

              <!-- Red Flags Pills -->
              <div v-if="item.banderasRojas.length > 0">
                <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">Banderas rojas detectadas:</span>
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="(flag, fIdx) in item.banderasRojas" 
                    :key="fIdx"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20"
                  >
                    <svg class="h-3 w-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {{ flag.texto }}
                  </span>
                </div>
              </div>

              <!-- Civic Verification Tip -->
              <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <span class="text-cyan-400 text-sm">💡</span>
                <p><span class="text-slate-300 font-semibold">Consejo Cívico:</span> {{ item.consejoCivico }}</p>
              </div>

              <!-- Collapse / Re-analyze button -->
              <button 
                @click="toggleAnalisis(item)"
                class="text-xs text-slate-500 hover:text-slate-300 transition-colors w-full text-center py-1 cursor-pointer"
              >
                Ocultar análisis
              </button>

            </div>
          </transition>

        </div>

      </div>

    </div>

    <!-- Reset module button -->
    <div v-if="analizadosCount > 0" class="mt-12 text-center">
      <button 
        @click="reiniciarTodo"
        class="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors border-b border-dashed border-slate-700 hover:border-cyan-500 pb-0.5 cursor-pointer"
      >
        Reiniciar todos los casos para volver a practicar
      </button>
    </div>

  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
