<script setup>
import { ref, computed } from 'vue'

// ==========================================
// 1. ESTADO DE NAVEGACIÓN (TABS)
// ==========================================
const activeTab = ref('quiz') // 'guias' o 'quiz'

// ==========================================
// 2. CONTENIDO DIDÁCTICO (MICRO-GUÍAS)
// ==========================================
const guias = ref([
  {
    id: 'dominio',
    titulo: 'El Truco del Dominio Clon',
    subtitulo: 'Phishing informativo y suplantación de identidad de medios',
    icono: 'globe',
    badge: 'Filtro Crítico 1',
    resumen: 'Los desinformadores compran dominios baratos que imitan nombres de medios reconocidos para que la gente confíe a primera vista.',
    ejemploReal: {
      falso: 'laprensagrafica.noticias-sv.xyz',
      legitimo: 'laprensagrafica.com',
      diferencia: 'Nota el sufijo extraño (.xyz) o el uso de guiones intermedios agregados para engañar.'
    },
    claves: [
      'Mira siempre lo que está inmediatamente ANTES del primer "/".',
      'Desconfía de terminaciones no corporativas (.tk, .xyz, .blogspot.com, .top).',
      'Si un medio famoso tuviera una exclusiva, estaría en su dominio principal, no en un blog gratuito.'
    ]
  },
  {
    id: 'urgencia',
    titulo: 'Urgencia Emocional & Clickbait',
    subtitulo: 'Secuestro del sistema límbico para anular el juicio reflexivo',
    icono: 'alert',
    badge: 'Filtro Crítico 2',
    resumen: 'Las noticias falsas apelan al pánico, a la ira o a la indignación para que compartas de inmediato antes de verificar.',
    ejemploReal: {
      falso: '¡¡URGENTE!! ¡MIRA ESTO ANTES DE QUE EL GOBIERNO LO BORRE DE INTERNET!',
      legitimo: 'Ministerio de Hacienda presenta informe preliminar de recaudación fiscal 2026',
      diferencia: 'El periodismo informa datos; la desinformación exige reacciones inmediatas y desesperadas.'
    },
    claves: [
      'Titulares con mayúsculas sostenidas y signos excesivos (¡¡!! ??).',
      'Promesas de censura inminente ("antes que lo borren").',
      'Si una noticia te causa un sobresalto visceral, respira 10 segundos antes de reenviar.'
    ]
  },
  {
    id: 'autoria',
    titulo: 'Autoría Fantasma & Fuentes Nulas',
    subtitulo: 'El escudo del anonimato en la era de la infoxicación',
    icono: 'user',
    badge: 'Filtro Crítico 3',
    resumen: 'Una investigación genuina lleva la firma de periodistas con trayectoria y cita documentos oficiales con enlaces directos.',
    ejemploReal: {
      falso: 'Por: "Redacción Ciudadana por la Verdad" (Sin bio, sin redes, sin contacto)',
      legitimo: 'Por: Lic. María Guardado (Periodista de datos acreditada en APES)',
      diferencia: 'Quien publica una verdad comprobable se enorgullece de firmarla con su nombre y apellido.'
    },
    claves: [
      'Busca el nombre del redactor en Google o LinkedIn para verificar si existe.',
      '¿Cita el documento oficial, el número de decreto o el boletín judicial?',
      'Si solo dice "fuentes cercanas confirmaron" sin ninguna prueba adicional, toma distancia.'
    ]
  },
  {
    id: 'cadenas',
    titulo: 'La Trampa de las Cadenas de Chat',
    subtitulo: 'El ciclo eterno de los bulos en WhatsApp y Telegram',
    icono: 'chat',
    badge: 'Filtro Crítico 4',
    resumen: 'Los audios y textos reenviados en mensajería se aprovechan de la confianza familiar para circular durante años.',
    ejemploReal: {
      falso: '«Reenviado muchas veces» — "Cortarán el agua en todo el país este sábado..."',
      legitimo: 'Boletín ANDA: Suspensión programada en 3 colonias de San Salvador por obras en tubería central',
      diferencia: 'Los bulos usan fechas relativas ("este sábado") para que sigan circulando semanas o meses después.'
    },
    claves: [
      'La etiqueta "Reenviado muchas veces" es la señal de alarma número 1.',
      'Audios anónimos de "un primo que trabaja adentro" o "un médico amigo".',
      'Instrucciones de reenvío: "Pásalo a todos tus grupos y familiares antes de medianoche".'
    ]
  }
])

const guiaSeleccionada = ref(guias.value[0])

// ==========================================
// 3. QUIZ FORENSE: "HAZ CLIC EN LA ZONA CORRECTA"
// ==========================================
const casosQuiz = ref([
  {
    id: 1,
    tituloCaso: 'Caso 1: El Tweet Viral Alarmista',
    plataforma: 'Red Social X / Twitter',
    mision: 'Este tweet ha sido compartido miles de veces en El Salvador. Haz clic en la zona que contiene la mayor señal de manipulación emocional o clickbait.',
    pista: 'Fíjate en las palabras que buscan causarte urgencia artificial y miedo.',
    tipoPlantilla: 'tweet',
    // Zonas interactivas inspeccionables
    zonas: [
      {
        id: 'tweet-perfil',
        nombreZona: 'Perfil y Usuario',
        esCorrecta: false,
        feedback: 'El nombre del perfil es dudoso (@VerdadSV_24), pero no es la bandera roja principal de este tweet. ¡Sigue explorando el contenido del mensaje!'
      },
      {
        id: 'tweet-titular',
        nombreZona: 'Titular Sensacionalista & Urgencia',
        esCorrecta: true,
        feedback: '¡Excelente ojo clínico! 🎯 El titular usa mayúsculas alarmistas, signos de exclamación y la clásica frase trampa: "¡MIRA EL VIDEO ANTES QUE LO BORREN!". Esta urgencia artificial busca que compartas sin pensar.'
      },
      {
        id: 'tweet-enlace',
        nombreZona: 'Enlace del Blog Gratuito',
        esCorrecta: true,
        feedback: '¡Brillante detección! 🎯 Un supuesto escándalo de Estado no se reportaría en un subdominio gratuito (.blogspot.com). Los medios formales poseen infraestructura web propia con servidores dedicados.'
      },
      {
        id: 'tweet-stats',
        nombreZona: 'Métricas de Interacción',
        esCorrecta: false,
        feedback: 'Que tenga 14,000 compartidos solo demuestra la velocidad de viralización del pánico, no su veracidad. Busca el gatillo que provocó esto.'
      }
    ]
  },
  {
    id: 2,
    tituloCaso: 'Caso 2: El Portal de Noticias Clonado',
    plataforma: 'Navegador Web / Noticia Online',
    mision: 'Un atacante intenta imitar la prensa salvadoreña. Haz clic exactamente sobre la barra de dirección web (URL) para inspeccionar la suplantación.',
    pista: 'Revisa la barra del navegador arriba. ¿El dominio termina como un medio oficial o tiene agregados raros?',
    tipoPlantilla: 'web',
    zonas: [
      {
        id: 'web-logo',
        nombreZona: 'Logotipo del Periódico',
        esCorrecta: false,
        feedback: 'El logo imita muy bien el diseño gráfico de un periódico formal, pero los estafadores copian imágenes fácilmente. ¿Dónde está la prueba irrefutable?'
      },
      {
        id: 'web-url',
        nombreZona: 'Barra de Dirección URL (.info / guiones)',
        esCorrecta: true,
        feedback: '¡Diana! 🎯 La URL es "laprensa-grafica.noticias-al-dia.info". El dominio real es ".com". Usaron guiones y un subdominio (.info) para engañar al ojo descuidado. ¡Regla de oro: siempre revisa la barra de direcciones!'
      },
      {
        id: 'web-fecha',
        nombreZona: 'Fecha y Hora de Publicación',
        esCorrecta: false,
        feedback: 'La fecha dice "Hace 10 minutos". Es una técnica de frescura para parecer oportuno, pero no es la trampa técnica fundamental.'
      },
      {
        id: 'web-cuerpo',
        nombreZona: 'Párrafo de Texto',
        esCorrecta: false,
        feedback: 'El texto es alarmista, pero lo que delata con total certeza que es un sitio falso es su dirección web.'
      }
    ]
  },
  {
    id: 3,
    tituloCaso: 'Caso 3: La Cadena de WhatsApp',
    plataforma: 'Mensajería Instantánea',
    mision: 'Llegó este mensaje a un grupo familiar de WhatsApp. Haz clic sobre la zona que demuestra que es un bulo en cadena reciclado.',
    pista: 'Mira la parte superior del mensaje o la forma en que mencionan las fechas.',
    tipoPlantilla: 'whatsapp',
    zonas: [
      {
        id: 'wa-etiqueta',
        nombreZona: 'Etiqueta "Reenviado muchas veces"',
        esCorrecta: true,
        feedback: '¡Exacto! 🎯 La etiqueta de doble flecha "Reenviado muchas veces" indica que el mensaje ha saltado por cadenas infinitas y perdió cualquier rastro de su origen real.'
      },
      {
        id: 'wa-texto',
        nombreZona: 'Fecha Ambigua e Incoherencia Técnica',
        esCorrecta: true,
        feedback: '¡Acertaste! 🎯 Dicen "este sábado a las 8 AM" sin especificar fecha ni año, permitiendo que el bulo recircule año tras año. Además mezclan satélites con corte de agua, una incoherencia técnica total.'
      },
      {
        id: 'wa-audio',
        nombreZona: 'Audio de Testimonio Anónimo',
        esCorrecta: true,
        feedback: '¡Muy bien visto! 🎯 El típico "audio de un primo que trabaja en el ministerio" es la técnica reina de la desinformación por mensajería: emotivo, anónimo y sin respaldo documental.'
      },
      {
        id: 'wa-accion',
        nombreZona: 'Botón de Reenviar a Contactos',
        esCorrecta: false,
        feedback: 'El botón de reenviar es una función estándar de la aplicación. Fíjate en los indicios del contenido del mensaje.'
      }
    ]
  },
  {
    id: 4,
    tituloCaso: 'Caso 4: El Comunicado Institucional Oficial',
    plataforma: 'Portal Gubernamental / Oficial',
    mision: '¡Caso de Verificación Inversa! ¿En qué zona de este comunicado se certifica que es una fuente auténtica y verificable?',
    pista: 'Busca el dominio institucional oficial de El Salvador (.gob.sv) y el enlace al decreto descargable.',
    tipoPlantilla: 'oficial',
    zonas: [
      {
        id: 'ofi-dominio',
        nombreZona: 'Dominio Oficial .gob.sv con Candado SSL',
        esCorrecta: true,
        feedback: '¡Excelente! 🎯 La extensión ".gob.sv" está reservada exclusivamente para instituciones del Estado salvadoreño. Ningún particular puede comprar ese dominio para crear una web falsa.'
      },
      {
        id: 'ofi-firma',
        nombreZona: 'Firma y Enlace a Ficha Técnica Descargable',
        esCorrecta: true,
        feedback: '¡Excelente criterio! 🎯 Los comunicados formales incluyen número de resolución, firma responsable y archivo PDF original descargable para comprobación ciudadana.'
      },
      {
        id: 'ofi-logo',
        nombreZona: 'Escudo Nacional',
        esCorrecta: false,
        feedback: 'Cualquiera puede descargar el Escudo de internet y pegarlo. La verdadera garantía de legitimidad está en el dominio .gob.sv y los documentos oficiales adjuntos.'
      }
    ]
  }
])

const casoActualIdx = ref(0)
const casoActual = computed(() => casosQuiz.value[casoActualIdx.value])
const zonaSeleccionada = ref(null)
const mostrarPista = ref(false)
const aciertos = ref(new Set())
const puntaje = ref(0)
const quizCompletado = ref(false)

const progresoPorcentaje = computed(() => {
  return ((casoActualIdx.value + (aciertos.value.has(casoActual.value.id) ? 1 : 0)) / casosQuiz.value.length) * 100
})

const rangoDetective = computed(() => {
  if (puntaje.value >= 400) return { titulo: 'Analista Forense Élite 🏆', desc: 'Capaz de detectar las falsificaciones digitales más sofisticadas.', color: 'text-amber-400' }
  if (puntaje.value >= 250) return { titulo: 'Inspector de Medios 🎖️', desc: 'Tienes un sentido crítico afilado contra el sensacionalismo.', color: 'text-cyan-400' }
  return { titulo: 'Detective en Formación 🔍', desc: 'Estás aprendiendo a no caer en las trampas virales.', color: 'text-indigo-400' }
})

const clickZona = (zona) => {
  zonaSeleccionada.value = zona
  if (zona.esCorrecta) {
    if (!aciertos.value.has(casoActual.value.id)) {
      aciertos.value.add(casoActual.value.id)
      puntaje.value += 100
    }
  }
}

const siguienteCaso = () => {
  zonaSeleccionada.value = null
  mostrarPista.value = false
  if (casoActualIdx.value < casosQuiz.value.length - 1) {
    casoActualIdx.value++
  } else {
    quizCompletado.value = true
  }
}

const reiniciarQuiz = () => {
  casoActualIdx.value = 0
  zonaSeleccionada.value = null
  mostrarPista.value = false
  aciertos.value.clear()
  puntaje.value = 0
  quizCompletado.value = false
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Header Principal -->
    <div class="text-center max-w-3xl mx-auto mb-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        Gimnasio de Juicio Crítico &bull; El Salvador
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Alfabetización <span class="shimmer-text">Mediática</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-400 leading-relaxed">
        Domina las reglas de oro para desenmascarar la manipulación y ponte a prueba como detective digital en nuestro simulador interactivo.
      </p>

      <!-- Selector de Modo / Pestañas -->
      <div class="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <button
          @click="activeTab = 'quiz'"
          :class="[
            'px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer',
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
              : 'text-slate-400 hover:text-white'
          ]"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Laboratorio Forense (Quiz "Clic en la Zona")</span>
        </button>

        <button
          @click="activeTab = 'guias'"
          :class="[
            'px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer',
            activeTab === 'guias'
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
              : 'text-slate-400 hover:text-white'
          ]"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Píldoras de Aprendizaje Rápido</span>
        </button>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- MODO 1: QUIZ INTERACTIVO ("CLIC EN LA ZONA CORRECTA")           -->
    <!-- ============================================================== -->
    <div v-if="activeTab === 'quiz'" class="space-y-8">

      <!-- Pantalla de Victoria / Finalización -->
      <div v-if="quizCompletado" class="max-w-2xl mx-auto p-8 rounded-3xl glass-panel border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl shadow-cyan-900/20 animate-fade-in">
        <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-xl shadow-cyan-500/30">
          🏆
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          Misión Completada
        </span>
        <h2 class="text-3xl font-extrabold text-white mt-3 mb-2">
          ¡Felicidades, Detective Digital!
        </h2>
        <p class="text-slate-300 text-sm max-w-lg mx-auto mb-6">
          Has demostrado la habilidad de escanear publicaciones engañosas e identificar con precisión quirúrgica las trampas y señuelos de la desinformación.
        </p>

        <!-- Resumen de puntuación -->
        <div class="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span class="text-xs text-slate-400 block mb-1">Puntaje Total</span>
            <span class="text-3xl font-black text-cyan-400 font-mono">{{ puntaje }} XP</span>
          </div>
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span class="text-xs text-slate-400 block mb-1">Rango Obtenido</span>
            <span class="text-sm font-bold block" :class="rangoDetective.color">{{ rangoDetective.titulo }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            @click="reiniciarQuiz"
            class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            🔄 Jugar Nuevamente
          </button>
          <button
            @click="activeTab = 'guias'"
            class="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700 cursor-pointer"
          >
            📖 Repasar Píldoras Teóricas
          </button>
        </div>
      </div>

      <!-- Caso Activo del Quiz -->
      <div v-else class="max-w-4xl mx-auto space-y-6">

        <!-- Barra Superior de Estado del Caso -->
        <div class="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-sm">
              #{{ casoActualIdx + 1 }}
            </span>
            <div>
              <h3 class="font-bold text-white text-base">{{ casoActual.tituloCaso }}</h3>
              <span class="text-xs text-slate-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {{ casoActual.plataforma }}
              </span>
            </div>
          </div>

          <!-- XP y Rango -->
          <div class="flex items-center gap-4">
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Experiencia</span>
              <span class="text-base font-black text-cyan-400 font-mono">{{ puntaje }} XP</span>
            </div>
            <button
              @click="mostrarPista = !mostrarPista"
              class="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>💡</span>
              <span>{{ mostrarPista ? 'Ocultar Pista' : 'Pedir Pista' }}</span>
            </button>
          </div>
        </div>

        <!-- Misión y Pista Desplegable -->
        <div class="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/30 border border-cyan-500/20 flex items-start gap-3">
          <span class="text-xl">🎯</span>
          <div class="flex-grow">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-cyan-300 uppercase tracking-wider">Tu Misión Forense:</h4>
              <span class="text-[11px] text-slate-400">Caso {{ casoActualIdx + 1 }} de {{ casosQuiz.length }}</span>
            </div>
            <p class="text-sm text-slate-200 mt-1 font-medium leading-relaxed">
              {{ casoActual.mision }}
            </p>
            <div v-if="mostrarPista" class="mt-3 pt-3 border-t border-cyan-500/20 text-xs text-amber-300 bg-amber-500/5 p-2.5 rounded-lg">
              <strong>Pista del analista:</strong> {{ casoActual.pista }}
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- SIMULADOR INTERACTIVO CON ZONAS CLICABLES (HOTSPOTS)      -->
        <!-- ========================================================= -->
        <div class="p-6 sm:p-8 rounded-3xl glass-card border border-slate-700/80 shadow-2xl relative">
          
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <span class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              Modo Inspección Activo — Haz clic en el elemento sospechoso
            </span>
            <span class="text-[11px] text-cyan-400 hidden sm:inline">Pasa el cursor para escanear zonas</span>
          </div>

          <!-- CASO 1: POST ESTILO RED SOCIAL (TWEET) -->
          <div v-if="casoActual.tipoPlantilla === 'tweet'" class="max-w-xl mx-auto rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-4 font-sans shadow-xl">
            
            <!-- Zona 1: Perfil de usuario -->
            <div 
              @click="clickZona(casoActual.zonas[0])"
              class="group relative p-2.5 rounded-xl border border-dashed transition-all duration-200 cursor-crosshair"
              :class="[
                zonaSeleccionada?.id === 'tweet-perfil'
                  ? (casoActual.zonas[0].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                  : 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-500/5'
              ]"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-xs">
                    SV24
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-bold text-sm text-white">Noticias Libertad SV</span>
                      <span class="text-[11px] text-cyan-400">☑️</span>
                    </div>
                    <span class="text-xs text-slate-500 font-mono">@VerdadSV_24 &bull; Hace 15m</span>
                  </div>
                </div>
                <span class="text-[10px] uppercase font-bold text-slate-500 group-hover:text-cyan-400 tracking-wider">
                  🔍 Zona Perfil
                </span>
              </div>
            </div>

            <!-- Zona 2: Titular / Texto Alarmista -->
            <div 
              @click="clickZona(casoActual.zonas[1])"
              class="group relative p-3.5 rounded-xl border border-dashed transition-all duration-200 cursor-crosshair"
              :class="[
                zonaSeleccionada?.id === 'tweet-titular'
                  ? (casoActual.zonas[1].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                  : 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-500/5'
              ]"
            >
              <div class="text-sm sm:text-base font-bold text-white leading-snug">
                ¡¡ESCÁNDALO DE ÚLTIMA HORA EN EL SALVADOR!! 🚨💣 Renuncia ministro clave tras filtración comprometedora y huye del país en vuelo privado. ¡¡MIRA EL VIDEO ANTES QUE LO BORREN DE INTERNET!!
              </div>
              <div class="mt-2 flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 group-hover:text-cyan-400">
                <span>Contenido textual</span>
                <span>🔍 Zona Mensaje</span>
              </div>
            </div>

            <!-- Zona 3: Enlace / Fuente Blogspot -->
            <div 
              @click="clickZona(casoActual.zonas[2])"
              class="group relative p-3 rounded-xl border border-dashed transition-all duration-200 cursor-crosshair bg-slate-900/60"
              :class="[
                zonaSeleccionada?.id === 'tweet-enlace'
                  ? (casoActual.zonas[2].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                  : 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-500/5'
              ]"
            >
              <div class="flex items-center gap-2">
                <span class="text-rose-400 font-mono text-xs">🔗 noticias-sv-verdad24.blogspot.com/2026/video-censurado</span>
              </div>
              <div class="mt-1 flex justify-between items-center text-[10px] text-slate-500 group-hover:text-cyan-400">
                <span class="text-[11px] text-slate-400">Ver video completo sin censura &bull; 2 min de lectura</span>
                <span>🔍 Zona Enlace</span>
              </div>
            </div>

            <!-- Zona 4: Métricas de Interacción -->
            <div 
              @click="clickZona(casoActual.zonas[3])"
              class="group relative p-2.5 rounded-xl border border-dashed transition-all duration-200 cursor-crosshair flex items-center justify-between text-xs text-slate-500"
              :class="[
                zonaSeleccionada?.id === 'tweet-stats'
                  ? (casoActual.zonas[3].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                  : 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-500/5'
              ]"
            >
              <div class="flex gap-4">
                <span>💬 1.2K</span>
                <span class="text-rose-400 font-bold">🔁 14.8K Compartidos</span>
                <span>❤️ 32K</span>
              </div>
              <span class="text-[10px] uppercase font-bold group-hover:text-cyan-400">
                🔍 Zona Métricas
              </span>
            </div>

          </div>

          <!-- CASO 2: NAVEGADOR WEB CON URL CLONADA -->
          <div v-else-if="casoActual.tipoPlantilla === 'web'" class="max-w-2xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            
            <!-- Barra superior del navegador -->
            <div class="p-3 bg-slate-900 border-b border-slate-800 flex items-center gap-3">
              <div class="flex gap-1.5">
                <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>

              <!-- Zona 2 (URL Clonada): Barra de direcciones -->
              <div 
                @click="clickZona(casoActual.zonas[1])"
                class="flex-grow group relative px-3 py-1.5 rounded-lg border border-dashed transition-all duration-200 cursor-crosshair flex items-center justify-between bg-slate-950"
                :class="[
                  zonaSeleccionada?.id === 'web-url'
                    ? (casoActual.zonas[1].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-500/5'
                ]"
              >
                <div class="flex items-center gap-2 text-xs font-mono truncate">
                  <span class="text-amber-400">⚠️</span>
                  <span class="text-slate-500">https://</span>
                  <span class="text-rose-400 font-bold">laprensa-grafica.noticias-al-dia.info</span>
                  <span class="text-slate-600">/nacionales/alerta/</span>
                </div>
                <span class="text-[10px] uppercase font-bold text-slate-500 group-hover:text-cyan-400 ml-2">
                  🔍 Zona URL
                </span>
              </div>
            </div>

            <!-- Contenido de la web -->
            <div class="p-6 space-y-4">
              <!-- Zona Logo -->
              <div 
                @click="clickZona(casoActual.zonas[0])"
                class="group p-2 rounded-xl border border-dashed transition-all cursor-crosshair flex justify-between items-center"
                :class="[
                  zonaSeleccionada?.id === 'web-logo'
                    ? (casoActual.zonas[0].esCorrecta ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-800/80 hover:border-cyan-400'
                ]"
              >
                <span class="text-lg font-black tracking-tighter text-white uppercase italic">LA PRENSA GRÁFICA <span class="text-rose-500 text-xs">LIVE</span></span>
                <span class="text-[10px] uppercase font-bold text-slate-500 group-hover:text-cyan-400">🔍 Zona Cabecera</span>
              </div>

              <!-- Zona Fecha -->
              <div 
                @click="clickZona(casoActual.zonas[2])"
                class="group p-2 rounded-xl border border-dashed transition-all cursor-crosshair flex justify-between items-center text-xs text-slate-500"
                :class="[
                  zonaSeleccionada?.id === 'web-fecha'
                    ? (casoActual.zonas[2].esCorrecta ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-800/80 hover:border-cyan-400'
                ]"
              >
                <span>Publicado hoy a las 14:02 | Por Redacción Especial (Sin firma verificada)</span>
                <span class="text-[10px] uppercase font-bold group-hover:text-cyan-400">🔍 Zona Metadatos</span>
              </div>

              <!-- Zona Cuerpo Noticia -->
              <div 
                @click="clickZona(casoActual.zonas[3])"
                class="group p-3 rounded-xl border border-dashed transition-all cursor-crosshair text-slate-300 text-sm leading-relaxed"
                :class="[
                  zonaSeleccionada?.id === 'web-cuerpo'
                    ? (casoActual.zonas[3].esCorrecta ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-800/80 hover:border-cyan-400'
                ]"
              >
                <p class="font-bold text-white mb-1">Inminente devaluación de depósitos bancarios causaría retiro masivo este fin de semana según fuentes anónimas.</p>
                <span class="text-[10px] uppercase font-bold text-slate-500 group-hover:text-cyan-400 block text-right mt-1">🔍 Zona Texto</span>
              </div>
            </div>

          </div>

          <!-- CASO 3: MENSAJERÍA (WHATSAPP) -->
          <div v-else-if="casoActual.tipoPlantilla === 'whatsapp'" class="max-w-md mx-auto rounded-3xl bg-[#0b141a] border border-slate-800 overflow-hidden shadow-2xl p-4 space-y-3 font-sans">
            <div class="text-xs text-slate-400 font-semibold px-2 flex justify-between">
              <span>Chat Familiar SV</span>
              <span>🔒 Cifrado</span>
            </div>

            <!-- Burbuja de mensaje -->
            <div class="bg-[#202c33] rounded-2xl p-4 space-y-3 relative text-slate-100 shadow-md">
              
              <!-- Zona Etiqueta Reenviado -->
              <div 
                @click="clickZona(casoActual.zonas[0])"
                class="group p-2 rounded-lg border border-dashed transition-all cursor-crosshair flex items-center justify-between text-xs text-slate-400"
                :class="[
                  zonaSeleccionada?.id === 'wa-etiqueta'
                    ? (casoActual.zonas[0].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-700/60 hover:border-cyan-400 hover:bg-cyan-500/5'
                ]"
              >
                <div class="flex items-center gap-1.5 text-slate-400 italic">
                  <span>⏩⏩</span>
                  <span>Reenviado muchas veces</span>
                </div>
                <span class="text-[10px] uppercase font-bold group-hover:text-cyan-400">🔍 Zona Etiqueta</span>
              </div>

              <!-- Zona Texto del Bulo -->
              <div 
                @click="clickZona(casoActual.zonas[1])"
                class="group p-2.5 rounded-lg border border-dashed transition-all cursor-crosshair text-sm leading-relaxed"
                :class="[
                  zonaSeleccionada?.id === 'wa-texto'
                    ? (casoActual.zonas[1].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-700/60 hover:border-cyan-400 hover:bg-cyan-500/5'
                ]"
              >
                <p class="font-medium text-slate-200">
                  ⚠️ AVISO URGENTE: Suspenderán el servicio de agua potable y luz eléctrica en todo El Salvador <strong>este sábado</strong> desde las 7 AM por mantenimiento de satélites climáticos. Junten agua y pasen esto a sus seres queridos.
                </p>
                <span class="text-[10px] uppercase font-bold text-slate-400 group-hover:text-cyan-400 block text-right mt-1">🔍 Zona Contenido</span>
              </div>

              <!-- Zona Audio Falso -->
              <div 
                @click="clickZona(casoActual.zonas[2])"
                class="group p-2.5 rounded-xl border border-dashed transition-all cursor-crosshair flex items-center justify-between bg-slate-900/60"
                :class="[
                  zonaSeleccionada?.id === 'wa-audio'
                    ? (casoActual.zonas[2].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-700/60 hover:border-cyan-400 hover:bg-cyan-500/5'
                ]"
              >
                <div class="flex items-center gap-2 text-xs">
                  <span class="text-emerald-400 text-base">▶️</span>
                  <span>Audio (0:48) "Primo_empleado_ministerio.opus"</span>
                </div>
                <span class="text-[10px] uppercase font-bold text-slate-400 group-hover:text-cyan-400">🔍 Zona Audio</span>
              </div>

              <!-- Zona Botón Reenvío -->
              <div 
                @click="clickZona(casoActual.zonas[3])"
                class="group p-1.5 rounded-lg border border-dashed transition-all cursor-crosshair flex justify-between items-center text-xs text-slate-400"
                :class="[
                  zonaSeleccionada?.id === 'wa-accion'
                    ? (casoActual.zonas[3].esCorrecta ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10')
                    : 'border-slate-700/60 hover:border-cyan-400'
                ]"
              >
                <span>21:44 &bull; Leído</span>
                <span class="text-[10px] uppercase font-bold group-hover:text-cyan-400">🔍 Zona Acción</span>
              </div>

            </div>
          </div>

          <!-- CASO 4: FUENTE OFICIAL LEGÍTIMA -->
          <div v-else-if="casoActual.tipoPlantilla === 'oficial'" class="max-w-xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-4 shadow-xl">
            
            <!-- Zona Dominio .gob.sv -->
            <div 
              @click="clickZona(casoActual.zonas[0])"
              class="group p-3 rounded-xl border border-dashed transition-all cursor-crosshair bg-slate-900/60"
              :class="[
                zonaSeleccionada?.id === 'ofi-dominio'
                  ? (casoActual.zonas[0].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                  : 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-500/5'
              ]"
            >
              <div class="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <span>🔒</span>
                <span>https://www.salud.gob.sv/comunicados/resolucion-sanitaria-2026</span>
              </div>
              <div class="mt-1 flex justify-between items-center text-[10px] text-slate-400 group-hover:text-cyan-400">
                <span>Certificado TLS emitido para Gobierno de El Salvador (.gob.sv)</span>
                <span>🔍 Zona Dominio Oficial</span>
              </div>
            </div>

            <!-- Zona Escudo -->
            <div 
              @click="clickZona(casoActual.zonas[2])"
              class="group p-2.5 rounded-xl border border-dashed transition-all cursor-crosshair flex items-center justify-between text-xs text-slate-400"
              :class="[
                zonaSeleccionada?.id === 'ofi-logo'
                  ? (casoActual.zonas[2].esCorrecta ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10')
                  : 'border-slate-800 hover:border-cyan-400'
              ]"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">🇸🇻</span>
                <span class="font-bold text-white">Ministerio de Salud &bull; República de El Salvador</span>
              </div>
              <span class="text-[10px] uppercase font-bold group-hover:text-cyan-400">🔍 Zona Membrete</span>
            </div>

            <!-- Zona Firma y PDF -->
            <div 
              @click="clickZona(casoActual.zonas[1])"
              class="group p-3 rounded-xl border border-dashed transition-all cursor-crosshair bg-slate-900/40 text-xs text-slate-300 space-y-2"
              :class="[
                zonaSeleccionada?.id === 'ofi-firma'
                  ? (casoActual.zonas[1].esCorrecta ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30' : 'border-amber-500 bg-amber-500/10')
                  : 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-500/5'
              ]"
            >
              <p>Resolución Ministerial N° 481-2026 sobre medidas sanitarias preventivas. Publicado en Diario Oficial Tomo 440.</p>
              <div class="flex justify-between items-center pt-2 border-t border-slate-800 text-cyan-300 font-mono text-[11px]">
                <span>📄 Descargar Acta Oficial Firmada (.PDF - 1.4MB)</span>
                <span class="text-[10px] uppercase font-bold text-slate-500 group-hover:text-cyan-400">🔍 Zona Documentación</span>
              </div>
            </div>

          </div>

        </div>

        <!-- ========================================================= -->
        <!-- PANEL DE RETROALIMENTACIÓN INMEDIATA                      -->
        <!-- ========================================================= -->
        <transition name="fade">
          <div 
            v-if="zonaSeleccionada"
            class="p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden"
            :class="[
              zonaSeleccionada.esCorrecta
                ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                : 'bg-gradient-to-r from-amber-950/30 to-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-950/20'
            ]"
          >
            <div class="flex items-start gap-3.5">
              <div class="mt-0.5">
                <span v-if="zonaSeleccionada.esCorrecta" class="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-lg">
                  ✓
                </span>
                <span v-else class="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-black text-lg">
                  ?
                </span>
              </div>

              <div class="flex-grow">
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <h4 
                    class="text-sm font-bold uppercase tracking-wider"
                    :class="zonaSeleccionada.esCorrecta ? 'text-emerald-400' : 'text-amber-400'"
                  >
                    {{ zonaSeleccionada.esCorrecta ? '¡Zona de Manipulación Detectada!' : 'Elemento Estándar o No Concluyente' }}
                  </h4>

                  <span 
                    v-if="zonaSeleccionada.esCorrecta"
                    class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  >
                    +100 XP Ganados
                  </span>
                </div>

                <p class="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                  {{ zonaSeleccionada.feedback }}
                </p>

                <!-- Botón de Siguiente Caso si acertó -->
                <div v-if="zonaSeleccionada.esCorrecta" class="mt-4 pt-3 border-t border-emerald-500/20 flex justify-end">
                  <button
                    @click="siguienteCaso"
                    class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                  >
                    <span>{{ casoActualIdx < casosQuiz.length - 1 ? 'Siguiente Desafío Forense' : 'Ver Resultados Finales' }}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Barra de Progreso Global del Quiz -->
        <div class="p-4 rounded-2xl glass-panel border border-slate-800">
          <div class="flex justify-between items-center text-xs font-semibold mb-2">
            <span class="text-slate-400">Progreso del Entrenamiento Forense:</span>
            <span class="text-cyan-400 font-mono">{{ aciertos.size }} de {{ casosQuiz.length }} casos resueltos</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
              :style="{ width: `${progresoPorcentaje}%` }"
            ></div>
          </div>
        </div>

      </div>

    </div>

    <!-- ============================================================== -->
    <!-- MODO 2: PÍLDORAS DE MICRO-APRENDIZAJE                           -->
    <!-- ============================================================== -->
    <div v-else-if="activeTab === 'guias'" class="space-y-8 max-w-5xl mx-auto">
      
      <!-- Selector de Píldoras -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="guia in guias"
          :key="guia.id"
          @click="guiaSeleccionada = guia"
          class="p-4 rounded-2xl glass-card text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer"
          :class="[
            guiaSeleccionada.id === guia.id
              ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 scale-[1.02]'
              : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
          ]"
        >
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 mb-2 inline-block">
              {{ guia.badge }}
            </span>
            <h3 class="font-bold text-sm text-white leading-snug">{{ guia.titulo }}</h3>
          </div>
          <p class="text-xs text-slate-400 mt-2 line-clamp-2">{{ guia.subtitulo }}</p>
        </button>
      </div>

      <!-- Detalle de la Píldora Seleccionada -->
      <div class="p-6 sm:p-8 rounded-3xl glass-card border border-slate-700/80 shadow-2xl relative space-y-6">
        
        <div>
          <div class="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <span>{{ guiaSeleccionada.badge }}</span>
            <span>&bull;</span>
            <span class="text-slate-400">Guía Práctica Ciudadana</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white">{{ guiaSeleccionada.titulo }}</h2>
          <p class="text-sm text-slate-300 mt-2 leading-relaxed">{{ guiaSeleccionada.resumen }}</p>
        </div>

        <!-- Comparativa Visual: Engaño vs Verdad -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <!-- Lado Desinformación -->
          <div class="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <div class="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <span>✕</span>
              <span>Anzuelo o Trampa Típica</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-950/80 border border-rose-500/20 font-mono text-xs text-rose-300 break-all">
              {{ guiaSeleccionada.ejemploReal.falso }}
            </div>
            <p class="text-xs text-slate-400 italic">
              {{ guiaSeleccionada.ejemploReal.diferencia }}
            </p>
          </div>

          <!-- Lado Verificación Legítima -->
          <div class="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div class="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span>✓</span>
              <span>Formato Auténtico Verificable</span>
            </div>
            <div class="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 font-mono text-xs text-emerald-300 break-all">
              {{ guiaSeleccionada.ejemploReal.legitimo }}
            </div>
            <p class="text-xs text-slate-400">
              Cumple con dominios corporativos e institucionales oficiales (.com, .org, .gob.sv).
            </p>
          </div>

        </div>

        <!-- Claves para Detectarlo -->
        <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">
            Reglas de Oro del Observatorio:
          </h4>
          <ul class="space-y-2">
            <li 
              v-for="(clave, cIdx) in guiaSeleccionada.claves" 
              :key="cIdx"
              class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
            >
              <span class="text-cyan-400 font-bold">▪</span>
              <span>{{ clave }}</span>
            </li>
          </ul>
        </div>

        <!-- CTA al Laboratorio -->
        <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-xs text-slate-400">
            ¿Listo para poner a prueba lo aprendido sobre este patrón?
          </span>
          <button
            @click="activeTab = 'quiz'"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer"
          >
            Ir al Quiz "Clic en la Zona" →
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.cursor-crosshair {
  cursor: crosshair;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
