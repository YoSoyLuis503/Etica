<script setup>
import { computed } from 'vue'

const props = defineProps({
  alerta: {
    type: Object,
    required: true
  }
})

// Normaliza el veredicto para estilos
const veredictoConfig = computed(() => {
  const v = props.alerta.veredicto || props.alerta.estado || 'falta_contexto'
  
  if (v === 'verificado') {
    return {
      etiqueta: 'Hecho Verificado / Auténtico',
      icono: '✅',
      badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
      glowClass: 'shadow-emerald-950/20'
    }
  }
  
  if (v === 'engañoso') {
    return {
      etiqueta: 'Contenido Engañoso / Fake News',
      icono: '🛑',
      badgeClass: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      borderClass: 'border-rose-500/30 hover:border-rose-500/60',
      glowClass: 'shadow-rose-950/20'
    }
  }

  // Falta de contexto / por defecto
  return {
    etiqueta: 'Falta Contexto / Manipulado',
    icono: '⚠️',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    borderClass: 'border-amber-500/30 hover:border-amber-500/60',
    glowClass: 'shadow-amber-950/20'
  }
})

const fechaFormateada = computed(() => {
  if (!props.alerta.created_at) return 'Fecha reciente'
  try {
    const fecha = new Date(props.alerta.created_at)
    return new Intl.DateTimeFormat('es-SV', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(fecha)
  } catch (_) {
    return 'Fecha reciente'
  }
})
</script>

<template>
  <article 
    class="glass-panel rounded-3xl p-6 sm:p-7 border transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between relative overflow-hidden group"
    :class="[veredictoConfig.borderClass, veredictoConfig.glowClass]"
  >
    <!-- Top Metadata Header -->
    <div class="space-y-4">
      
      <div class="flex items-center justify-between flex-wrap gap-2">
        <!-- Veredicto Badge -->
        <span 
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
          :class="veredictoConfig.badgeClass"
        >
          <span>{{ veredictoConfig.icono }}</span>
          <span>{{ veredictoConfig.etiqueta }}</span>
        </span>

        <!-- Fecha y Tipo Denunciado -->
        <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{{ fechaFormateada }}</span>
          <span>&bull;</span>
          <span class="text-slate-400">{{ alerta.tipo_engano || 'Reporte Ciudadano' }}</span>
        </div>
      </div>

      <!-- URL o Titular Reportado -->
      <div>
        <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
          Contenido Auditado:
        </span>
        <a 
          :href="alerta.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors break-all flex items-start gap-1.5 group/link"
        >
          <span>{{ alerta.url }}</span>
          <svg class="h-4 w-4 text-slate-500 group-hover/link:text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <!-- Justificación Ética redactada por el voluntario -->
      <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
        <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Dictamen y Evaluación Ética:</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {{ alerta.justificacion_veredicto || alerta.detalles || 'Evaluación ética completada por el cuerpo de voluntarios según principios de contrastación e imparcialidad.' }}
        </p>
      </div>

      <!-- Enlace a Fuente Primaria de Respaldo -->
      <div v-if="alerta.fuente_respaldo" class="pt-1">
        <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
          Fuente Primaria de Respaldo:
        </span>
        <a 
          :href="alerta.fuente_respaldo" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white transition-all max-w-full truncate group/source"
        >
          <span class="text-emerald-400">🔗</span>
          <span class="truncate">{{ alerta.fuente_respaldo }}</span>
          <svg class="h-3.5 w-3.5 flex-shrink-0 text-slate-400 group-hover/source:text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

    </div>

    <!-- Institutional Footer Note -->
    <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
      <div class="flex items-center gap-2">
        <span class="text-xs">🛡️</span>
        <span class="font-medium italic">
          Auditado por un verificador acreditado - No determinado por algoritmos ni votaciones masivas
        </span>
      </div>
      <span class="font-mono text-slate-600 text-[10px]">#{{ alerta.id }}</span>
    </div>
  </article>
</template>
