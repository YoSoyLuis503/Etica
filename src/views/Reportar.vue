<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

const form = ref({
  url: '',
  tipo_engano: 'Clickbait',
  detalles: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')
const urlTouched = ref(false)

const tiposEngano = [
  {
    id: 'Clickbait',
    titulo: 'Clickbait / Titular Engañoso',
    descripcion: 'Titular exagerado o falso que no coincide con el contenido real.',
    icono: '🎣',
    color: 'hover:border-amber-500/50 hover:bg-amber-500/5',
    activeColor: 'border-amber-500 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40'
  },
  {
    id: 'Contexto falso',
    titulo: 'Contexto Falso / Fuera de Época',
    descripcion: 'Fotos, videos o datos auténticos pero atribuidos a otro momento o lugar.',
    icono: '🧩',
    color: 'hover:border-purple-500/50 hover:bg-purple-500/5',
    activeColor: 'border-purple-500 bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/40'
  },
  {
    id: 'Fuente dudosa',
    titulo: 'Fuente Dudosa / Sin Autoría',
    descripcion: 'Sitios clonados, dominios falsificados o cadenas sin origen verificable.',
    icono: '🕵️‍♂️',
    color: 'hover:border-cyan-500/50 hover:bg-cyan-500/5',
    activeColor: 'border-cyan-500 bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/40'
  },
  {
    id: 'Contenido manipulado',
    titulo: 'Contenido Manipulado / Deepfake',
    descripcion: 'Imágenes editadas digitalmente, audios alterados o IA generativa engañosa.',
    icono: '✂️',
    color: 'hover:border-rose-500/50 hover:bg-rose-500/5',
    activeColor: 'border-rose-500 bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/40'
  }
]

const isUrlValid = computed(() => {
  if (!form.value.url) return false
  try {
    const parsed = new URL(form.value.url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch (_) {
    return false
  }
})

const nuevoReporteId = ref(null)

const submitReport = async () => {
  errorMessage.value = ''
  urlTouched.value = true

  if (!form.value.url) {
    errorMessage.value = 'Por favor, ingresa la dirección web (URL) del contenido.'
    return
  }

  if (!isUrlValid.value) {
    errorMessage.value = 'Ingresa una URL completa y válida (ej. https://ejemplo.com/noticia).'
    return
  }

  if (!form.value.tipo_engano) {
    errorMessage.value = 'Por favor, selecciona el tipo de engaño detectado.'
    return
  }

  isSubmitting.value = true

  try {
    const { data, error } = await supabase
      .from('reportes')
      .insert([
        { 
          url: form.value.url.trim(), 
          tipo_engano: form.value.tipo_engano, 
          detalles: form.value.detalles.trim() || null,
          estado: 'pendiente'
        }
      ])
      .select()

    if (error) throw error

    nuevoReporteId.value = data && data[0] ? data[0].id : null
    isSuccess.value = true
    
    // Clean form
    form.value = {
      url: '',
      tipo_engano: 'Clickbait',
      detalles: ''
    }
    urlTouched.value = false

  } catch (error) {
    console.error('Error enviando reporte a Supabase:', error)
    errorMessage.value = 'No se pudo conectar con la base de datos de moderación. Verifica tu conexión o intenta en unos minutos.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Title & Privacy Shield -->
    <div class="text-center max-w-3xl mx-auto mb-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        Canal de Alerta Temprana &bull; Privacidad Cero Huella
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Bandeja Ética <span class="shimmer-text">Ciudadana</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-400 leading-relaxed">
        Reporta contenido sospechoso sin compartir datos personales. Cada reporte es analizado por nuestro equipo de moderación periodística independiente.
      </p>
    </div>

    <!-- Main Card Container -->
    <div class="max-w-2xl mx-auto">
      
      <!-- Floating Glass Form Card -->
      <div class="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
        
        <!-- Ambient subtle glow behind form -->
        <div class="absolute -top-24 -right-24 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Success Toast Notification -->
        <transition name="slide-fade">
          <div 
            v-if="isSuccess" 
            class="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-slate-900/90 border border-emerald-500/40 shadow-xl shadow-emerald-950/50 flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div class="flex items-start gap-3.5">
              <div class="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-400 font-bold">
                ✓
              </div>
              <div>
                <h3 class="text-sm font-bold text-emerald-300">
                  ¡Reporte {{ nuevoReporteId ? '#' + nuevoReporteId : '' }} recibido con éxito!
                </h3>
                <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                  El reporte ha ingresado a la cola de auditoría de los voluntarios verificadores.
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <RouterLink 
                to="/panel-voluntarios" 
                class="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors"
              >
                Ver en Cola →
              </RouterLink>
            </div>
          </div>
        </transition>

        <!-- Error Alert -->
        <transition name="slide-fade">
          <div 
            v-if="errorMessage" 
            class="mb-8 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-3"
          >
            <svg class="h-5 w-5 text-rose-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>
        </transition>

        <form @submit.prevent="submitReport" class="space-y-7">
          
          <!-- URL Input -->
          <div>
            <label for="url-input" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
              <span>URL de la noticia o publicación <span class="text-rose-400">*</span></span>
              <span v-if="urlTouched && isUrlValid" class="text-[11px] text-emerald-400 font-medium normal-case flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Formato válido
              </span>
            </label>

            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>

              <input 
                id="url-input"
                v-model="form.url"
                @blur="urlTouched = true"
                type="url"
                placeholder="https://diario-o-red-social.com/noticia-falsa"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
                :class="{
                  '!border-rose-500/80 focus:!ring-rose-500/20': urlTouched && !isUrlValid && form.url,
                  '!border-emerald-500/60': urlTouched && isUrlValid
                }"
              />
            </div>
            <p v-if="urlTouched && !isUrlValid && form.url" class="mt-1.5 text-xs text-rose-400">
              Debes incluir el protocolo completo (ej. https://...)
            </p>
          </div>

          <!-- Tipo de Engaño (Interactive Card Pills) -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
              Tipo de manipulación identificada <span class="text-rose-400">*</span>
            </label>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                v-for="tipo in tiposEngano"
                :key="tipo.id"
                @click="form.tipo_engano = tipo.id"
                class="p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3 bg-slate-900/60"
                :class="form.tipo_engano === tipo.id ? tipo.activeColor : `border-slate-800 text-slate-300 ${tipo.color}`"
              >
                <span class="text-2xl mt-0.5">{{ tipo.icono }}</span>
                <div>
                  <h4 class="text-xs font-bold text-slate-100 mb-0.5">{{ tipo.titulo }}</h4>
                  <p class="text-[11px] text-slate-400 leading-tight">{{ tipo.descripcion }}</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Detalles adicionales -->
          <div>
            <label for="detalles-input" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex justify-between">
              <span>Detalles u observaciones adicionales</span>
              <span class="text-slate-500 font-normal lowercase">(opcional)</span>
            </label>

            <textarea 
              id="detalles-input"
              v-model="form.detalles"
              rows="3"
              placeholder="¿Qué elementos específicos te parecen manipulados o cuestionables en la publicación?..."
              class="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all resize-none"
            ></textarea>
            
            <div class="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500">
              <svg class="w-3.5 h-3.5 text-cyan-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span>Garantía de neutralidad: Este formulario no solicita ni almacena nombres, correos o direcciones IP.</span>
            </div>
          </div>

          <!-- Submit Action Button -->
          <div class="pt-2">
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/25 hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>

              <span>{{ isSubmitting ? 'Transmitiendo a cola segura...' : 'Enviar Reporte Anónimo' }}</span>
            </button>
          </div>

        </form>

      </div>

      <!-- Trust Badges & Protocol Pillars -->
      <div class="mt-8 grid grid-cols-3 gap-4 text-center">
        <div class="p-3.5 rounded-2xl glass-card border border-slate-800/80">
          <div class="text-cyan-400 text-lg mb-1">🔒</div>
          <h4 class="text-xs font-bold text-slate-200">100% Anónimo</h4>
          <p class="text-[10px] text-slate-400 mt-0.5">Sin rastreo de identidad</p>
        </div>

        <div class="p-3.5 rounded-2xl glass-card border border-slate-800/80">
          <div class="text-indigo-400 text-lg mb-1">⚖️</div>
          <h4 class="text-xs font-bold text-slate-200">Moderación Humana</h4>
          <p class="text-[10px] text-slate-400 mt-0.5">Cotejo periodístico ético</p>
        </div>

        <div class="p-3.5 rounded-2xl glass-card border border-slate-800/80">
          <div class="text-emerald-400 text-lg mb-1">⚡</div>
          <h4 class="text-xs font-bold text-slate-200">Triangulación</h4>
          <p class="text-[10px] text-slate-400 mt-0.5">Ingreso al radar nacional</p>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
