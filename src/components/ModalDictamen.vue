<script setup>
import { ref, watch, computed } from 'vue'
import { supabase } from '../supabase'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  reporte: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'dictamen-publicado'])

// Form State
const veredicto = ref('engañoso')
const justificacion = ref('')
const fuenteRespaldo = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

// Reset form when modal opens with a report
watch(() => props.reporte, (newVal) => {
  if (newVal) {
    veredicto.value = newVal.veredicto || 'engañoso'
    justificacion.value = newVal.justificacion_veredicto || ''
    fuenteRespaldo.value = newVal.fuente_respaldo || ''
    errorMessage.value = ''
  }
}, { immediate: true })

const isUrlValid = computed(() => {
  if (!fuenteRespaldo.value.trim()) return false
  try {
    const parsed = new URL(fuenteRespaldo.value.trim())
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch (_) {
    return false
  }
})

const canSubmit = computed(() => {
  return (
    veredicto.value &&
    justificacion.value.trim().length >= 10 &&
    isUrlValid.value &&
    !isSubmitting.value
  )
})

const cerrar = () => {
  if (!isSubmitting.value) {
    emit('close')
  }
}

const publicarDictamen = async () => {
  if (!canSubmit.value) {
    if (!justificacion.value.trim()) {
      errorMessage.value = 'La justificación ética del dictamen es obligatoria (mínimo 10 caracteres).'
      return
    }
    if (!isUrlValid.value) {
      errorMessage.value = 'Debes ingresar una URL válida de la fuente primaria de respaldo (ej. https://ejemplo.gob.sv).'
      return
    }
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const payload = {
      estado: veredicto.value,
      veredicto: veredicto.value,
      justificacion_veredicto: justificacion.value.trim(),
      fuente_respaldo: fuenteRespaldo.value.trim()
    }

    // Actualizar en Supabase
    const { error } = await supabase
      .from('reportes')
      .update(payload)
      .eq('id', props.reporte.id)

    if (error) {
      console.error('Error al actualizar en Supabase:', error)
      errorMessage.value = 'No se pudo guardar en Supabase: ' + error.message
      return
    }

    // Emit event with updated data for immediate UI reaction
    emit('dictamen-publicado', {
      ...props.reporte,
      ...payload
    })

    cerrar()
  } catch (err) {
    console.error('Error al publicar dictamen:', err)
    errorMessage.value = 'Ocurrió un error al procesar el dictamen. Inténtalo nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <transition name="modal-fade">
    <div 
      v-if="isOpen && reporte" 
      class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    >
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        @click="cerrar"
      ></div>

      <!-- Modal Panel -->
      <div 
        class="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">
              ⚖️
            </div>
            <div>
              <h3 class="text-base font-bold text-white">Emitir Dictamen Ético</h3>
              <p class="text-xs text-slate-400">Auditoría humana cívica &bull; Reporte #{{ reporte.id }}</p>
            </div>
          </div>

          <button 
            @click="cerrar"
            class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          <!-- Resumen del Reporte Ciudadano -->
          <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Contenido Denunciado por la Ciudadanía</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {{ reporte.tipo_engano }}
              </span>
            </div>

            <div>
              <span class="text-xs text-slate-500 block mb-0.5 font-medium">URL Sospechosa:</span>
              <a 
                :href="reporte.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-xs font-mono text-cyan-400 hover:underline break-all flex items-center gap-1.5"
              >
                <span>{{ reporte.url }}</span>
                <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div v-if="reporte.detalles">
              <span class="text-xs text-slate-500 block mb-0.5 font-medium">Detalles aportados por el ciudadano:</span>
              <p class="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                "{{ reporte.detalles }}"
              </p>
            </div>
          </div>

          <!-- Formulario de Evaluación Ética -->
          <form @submit.prevent="publicarDictamen" class="space-y-5">
            
            <!-- Campo 1: Veredicto -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Veredicto del Verificador <span class="text-rose-400">*</span>
              </label>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <!-- Opción: Engañoso / Fake News -->
                <label 
                  class="p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between"
                  :class="[
                    veredicto === 'engañoso'
                      ? 'bg-rose-500/10 border-rose-500 text-rose-300 ring-1 ring-rose-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  ]"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-xs flex items-center gap-1.5">
                      <span>🛑</span>
                      <span>Engañoso</span>
                    </span>
                    <input type="radio" value="engañoso" v-model="veredicto" class="sr-only" />
                  </div>
                  <span class="text-[11px] text-slate-400 leading-tight">Es desinformación o falsedad comprobada.</span>
                </label>

                <!-- Opción: Falta Contexto -->
                <label 
                  class="p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between"
                  :class="[
                    veredicto === 'falta_contexto'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  ]"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-xs flex items-center gap-1.5">
                      <span>⚠️</span>
                      <span>Falta Contexto</span>
                    </span>
                    <input type="radio" value="falta_contexto" v-model="veredicto" class="sr-only" />
                  </div>
                  <span class="text-[11px] text-slate-400 leading-tight">Dato real pero sesgado o fuera de época.</span>
                </label>

                <!-- Opción: Verificado / Auténtico -->
                <label 
                  class="p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between"
                  :class="[
                    veredicto === 'verificado'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  ]"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-xs flex items-center gap-1.5">
                      <span>✅</span>
                      <span>Verificado</span>
                    </span>
                    <input type="radio" value="verificado" v-model="veredicto" class="sr-only" />
                  </div>
                  <span class="text-[11px] text-slate-400 leading-tight">Información legítima y fidedigna.</span>
                </label>

              </div>
            </div>

            <!-- Campo 2: Justificación Ética -->
            <div>
              <label for="justificacion" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                2. Justificación del Dictamen <span class="text-rose-400">*</span>
              </label>
              <textarea 
                id="justificacion"
                v-model="justificacion"
                rows="4"
                required
                placeholder="Explica detalladamente por qué se emite este dictamen (metodología utilizada, contrastación de datos y argumentación imparcial)..."
                class="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder-slate-500 transition-all outline-none resize-none"
              ></textarea>
              <p class="text-[11px] text-slate-500 mt-1">
                Mínimo 10 caracteres. Esta explicación será visible públicamente en el Repositorio de Alertas.
              </p>
            </div>

            <!-- Campo 3: Fuente Primaria de Respaldo -->
            <div>
              <label for="fuenteRespaldo" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. URL de Fuente Primaria de Respaldo <span class="text-rose-400">*</span>
              </label>
              <div class="relative">
                <input 
                  id="fuenteRespaldo"
                  type="url"
                  v-model="fuenteRespaldo"
                  required
                  placeholder="https://diariooficial.gob.sv/decreto-o-enlace-oficial"
                  class="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm font-mono text-cyan-300 placeholder-slate-600 transition-all outline-none"
                />
              </div>
              <p class="text-[11px] text-slate-500 mt-1">
                Enlace a documento oficial, medio de referencia o comunicado que sustenta tu veredicto.
              </p>
            </div>

            <!-- Error Banner -->
            <div 
              v-if="errorMessage"
              class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"
            >
              <span>⚠️</span>
              <span>{{ errorMessage }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button 
                type="button"
                @click="cerrar"
                :disabled="isSubmitting"
                class="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancelar
              </button>

              <button 
                type="submit"
                :disabled="!canSubmit"
                class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Publicando...' : 'Publicar Dictamen Ético' }}</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
