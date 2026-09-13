<script setup>
import { ref } from 'vue'

const form = ref({
  nombre: '',
  email: '',
  asunto: 'Consulta general',
  mensaje: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const asuntosDisponibles = [
  'Consulta general',
  'Postulación como voluntario verificador',
  'Prensa, medios y entrevistas',
  'Alianzas con universidades y colegios',
  'Sugerencia de mejora técnica'
]

// FAQ interactivo
const faqList = ref([
  {
    pregunta: '¿Quién financia el Portal Nacional contra las Fake News?',
    respuesta: 'Somos una iniciativa cívica e independiente sin fines de lucro. No aceptamos fondos de partidos políticos, candidatos ni conglomerados que puedan comprometer nuestra línea editorial. Nos sustentamos a través del trabajo voluntario de profesionales y donaciones comunitarias transparentes.',
    abierto: true
  },
  {
    pregunta: '¿Cómo garantizan que no favorecen a ningún partido político?',
    respuesta: 'Aplicamos el estándar del International Fact-Checking Network (IFCN): evaluamos hechos comprobables, nunca opiniones. Cada veredicto emitido en el repositorio debe citar obligatoriamente la fuente primaria oficial (decretos de ley, actas, estadísticas del BCR o boletines sanitarios) para que cualquier persona pueda contrastar la evidencia por su cuenta.',
    abierto: false
  },
  {
    pregunta: '¿Cuáles son los requisitos para ser voluntario verificador?',
    respuesta: 'Buscamos personas con criterio ético, rigor analítico y compromiso con la verdad. Es deseable (pero no excluyente) contar con experiencia en periodismo, derecho, docencia, ciencias sociales o análisis de datos. Los voluntarios pasan por un proceso de inducción sobre el código ético antes de dictaminar.',
    abierto: false
  },
  {
    pregunta: '¿Qué sucede si un dictamen contiene una imprecisión o error?',
    respuesta: 'Mantenemos una política de correcciones abierta y honesta. Si una institución o ciudadano aporta evidencia documental nueva que rectifique un hecho, el caso se re-evalúa y se publica una fe de erratas visible en la misma tarjeta de alerta.',
    abierto: false
  },
  {
    pregunta: '¿Almacenan mi dirección IP cuando reporto una noticia?',
    respuesta: 'No. La bandeja de reportes fue diseñada con arquitectura de "cero huella": la base de datos almacena exclusivamente el enlace reportado, la categoría y la observación, sin capturar cookies de seguimiento, direcciones IP ni datos de navegación.',
    abierto: false
  }
])

const toggleFaq = (index) => {
  faqList.value[index].abierto = !faqList.value[index].abierto
}

const enviarMensaje = () => {
  errorMessage.value = ''
  
  if (!form.value.nombre.trim() || !form.value.email.trim() || !form.value.mensaje.trim()) {
    errorMessage.value = 'Por favor, completa todos los campos requeridos.'
    return
  }

  isSubmitting.value = true

  // Simulación de envío exitoso
  setTimeout(() => {
    isSubmitting.value = false
    isSuccess.value = true
    form.value = {
      nombre: '',
      email: '',
      asunto: 'Consulta general',
      mensaje: ''
    }

    setTimeout(() => {
      isSuccess.value = false
    }, 7000)
  }, 1000)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Hero Header -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
        Atención Ciudadana y Medios
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
        Canales de <span class="shimmer-text">Contacto</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
        ¿Tienes dudas, deseas unirte como voluntario o quieres coordinar un taller en tu institución educativa? Estamos para servirte.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
      
      <!-- Columna Izquierda: Formulario de Contacto (7 cols) -->
      <div class="lg:col-span-7">
        <div class="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative">
          
          <h2 class="text-2xl font-bold text-white mb-2">Envíanos un mensaje</h2>
          <p class="text-xs sm:text-sm text-slate-400 mb-6">
            Responderemos a tu solicitud en menos de 24 horas hábiles.
          </p>

          <!-- Success Alert -->
          <transition name="fade">
            <div 
              v-if="isSuccess" 
              class="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-start gap-3 shadow-lg shadow-emerald-950/30"
            >
              <span class="text-xl">✓</span>
              <div>
                <strong class="block text-white">¡Mensaje enviado con éxito!</strong>
                Gracias por comunicarte con nosotros. Nuestro equipo cívico te responderá a la brevedad.
              </div>
            </div>
          </transition>

          <!-- Error Alert -->
          <div 
            v-if="errorMessage" 
            class="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs sm:text-sm flex items-center gap-2"
          >
            <span>⚠️</span>
            <span>{{ errorMessage }}</span>
          </div>

          <form @submit.prevent="enviarMensaje" class="space-y-5">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Nombre o Pseudónimo <span class="text-rose-400">*</span>
                </label>
                <input 
                  type="text"
                  v-model="form.nombre"
                  required
                  placeholder="Tu nombre completo o alias"
                  class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Correo Electrónico <span class="text-rose-400">*</span>
                </label>
                <input 
                  type="email"
                  v-model="form.email"
                  required
                  placeholder="tu.correo@ejemplo.com"
                  class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Motivo del Contacto <span class="text-rose-400">*</span>
              </label>
              <select 
                v-model="form.asunto"
                class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-200 outline-none transition-all cursor-pointer"
              >
                <option v-for="asunto in asuntosDisponibles" :key="asunto" :value="asunto">
                  {{ asunto }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Mensaje <span class="text-rose-400">*</span>
              </label>
              <textarea 
                v-model="form.mensaje"
                required
                rows="5"
                placeholder="Escribe aquí tu consulta, propuesta o comentarios..."
                class="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ isSubmitting ? 'Enviando mensaje...' : 'Enviar Mensaje Cívico' }}</span>
            </button>

          </form>

        </div>
      </div>

      <!-- Columna Derecha: Canales Directos y Seguros (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        
        <div class="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 class="text-lg font-bold text-white">Canales Directos</h3>
          
          <div class="space-y-4 text-xs sm:text-sm">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                ✉️
              </div>
              <div>
                <strong class="text-white block font-semibold">Correo de Redacción y Moderación:</strong>
                <span class="font-mono text-cyan-300">contacto@eticasv.org</span>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
                💬
              </div>
              <div>
                <strong class="text-white block font-semibold">Comunidad en Telegram:</strong>
                <span class="text-slate-400">Canal público de alertas verificadas al instante.</span>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 flex-shrink-0">
                📍
              </div>
              <div>
                <strong class="text-white block font-semibold">Sede de Operaciones Cívicas:</strong>
                <span class="text-slate-400">San Salvador, El Salvador &bull; Red Distribuida de Voluntarios Nacionales.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-2">
          <div class="flex items-center gap-2 font-bold text-cyan-400 text-sm">
            <span>🛡️</span>
            <span>Canal Confidencial para Filtraciones</span>
          </div>
          <p class="leading-relaxed">
            Si eres funcionario, empleado de un medio de comunicación o testigo de una campaña orquestada de desinformación y deseas aportar pruebas confidenciales, contáctanos a través de Signal con autodestrucción de mensajes activada.
          </p>
        </div>

      </div>

    </div>

    <!-- Sección de Preguntas Frecuentes (FAQ Interactivo) -->
    <div class="max-w-4xl mx-auto pt-10 border-t border-slate-800/80">
      <div class="text-center mb-10">
        <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">Transparencia Total</span>
        <h2 class="text-3xl font-extrabold text-white tracking-tight">Preguntas Frecuentes (FAQ)</h2>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, fIdx) in faqList" 
          :key="fIdx"
          class="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-colors"
        >
          <button 
            @click="toggleFaq(fIdx)"
            class="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/40 transition-colors"
          >
            <span class="font-bold text-sm sm:text-base text-slate-100">{{ faq.pregunta }}</span>
            <span class="text-cyan-400 text-xl font-bold flex-shrink-0">
              {{ faq.abierto ? '−' : '+' }}
            </span>
          </button>
          
          <div 
            v-if="faq.abierto"
            class="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60"
          >
            {{ faq.respuesta }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
