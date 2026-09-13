<script setup>
import { ref } from 'vue'

const pilares = [
  {
    icono: '⚖️',
    titulo: 'Independencia y No Partidismo',
    subtitulo: 'Verificamos hechos, no ideologías',
    descripcion: 'No recibimos financiamiento de partidos políticos ni de conglomerados mediáticos. Nuestro único compromiso es contrastar afirmaciones contra evidencias fácticas reproducibles.'
  },
  {
    icono: '📜',
    titulo: 'Metodología Abierta (IFCN)',
    subtitulo: 'Trazabilidad y fuentes primarias',
    descripcion: 'Ningún dictamen es válido sin adjuntar el enlace oficial, decreto o documento de respaldo comprobable. Todo ciudadano puede auditar el razonamiento detrás de cada veredicto.'
  },
  {
    icono: '🤝',
    titulo: 'Gobernanza Cívica Híbrida',
    subtitulo: 'Crowdsourcing + Criterio Humano',
    descripcion: 'Combinamos el poder de la comunidad para levantar alertas tempranas con la rigurosidad ética de voluntarios acreditados, evitando la censura automatizada por algoritmos.'
  },
  {
    icono: '🔒',
    titulo: 'Privacidad Cero Huella',
    subtitulo: 'Protección absoluta al denunciante',
    descripcion: 'Reportar desinformación no debe implicar riesgos. Nuestra plataforma no solicita registros obligatorios, ni rastrea direcciones IP ni almacena metadatos de los usuarios.'
  }
]

const etapasFlujo = [
  {
    paso: '01',
    titulo: 'Alerta Ciudadana',
    desc: 'Un usuario detecta un titular alarmista o cadena sospechosa en redes o WhatsApp y remite el enlace anónimamente.',
    color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400'
  },
  {
    paso: '02',
    titulo: 'Cotejo en Fuentes Primarias',
    desc: 'El cuerpo de verificadores voluntarios busca decretos, estadísticas del BCR, registros judiciales o declaraciones oficiales directas.',
    color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400'
  },
  {
    paso: '03',
    titulo: 'Dictamen Motivado',
    desc: 'Se redacta una justificación ética neutral y se clasifica como Engañoso, Falta de Contexto o Verificado.',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400'
  },
  {
    paso: '04',
    titulo: 'Publicación Abierta',
    desc: 'El caso ingresa al repositorio público permanente de alertas para frenar la recirculación del bulo en el país.',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Hero / Header -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        Iniciativa Cívica Independiente &bull; El Salvador
      </div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
        Defendiendo el derecho a la <span class="shimmer-text">verdad informativa</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
        El <strong>Portal Nacional contra las Fake News</strong> es una plataforma tecnológica sin fines de lucro creada para combatir la infodemia, fomentar el pensamiento crítico y proteger la deliberación democrática en El Salvador.
      </p>
    </div>

    <!-- Manifiesto Cívico -->
    <div class="max-w-4xl mx-auto mb-20">
      <div class="glass-card rounded-3xl p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-20 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-6 text-slate-200 text-sm sm:text-base leading-relaxed">
          <h2 class="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>🇸🇻</span>
            <span>Nuestro Manifiesto</span>
          </h2>
          <p>
            En la era digital, la desinformación no es un simple malentendido: es una industria calculada que explota sesgos cognitivos, difunde miedo colectivo y debilita la confianza en las instituciones.
          </p>
          <p>
            Creemos que la respuesta ante este desafío no debe ser la censura gubernamental ni la imposición de algoritmos de inteligencia artificial como jueces absolutos de la realidad. La verdadera solución reside en la <strong>educación ciudadana, la contrastación rigurosa de fuentes primarias y la vigilancia comunitaria transparente</strong>.
          </p>
          <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-cyan-300 font-mono text-xs sm:text-sm">
            «Ninguna opinión es sagrada; ningún hecho es negociable. La verdad se construye con evidencia trazable y apertura al escrutinio público.»
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Pilares Éticos -->
    <div class="mb-20">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h2 class="text-3xl font-extrabold text-white tracking-tight">Nuestros Pilares Fundamentales</h2>
        <p class="text-sm text-slate-400 mt-2">Los estándares inquebrantables que guían cada línea de código y cada dictamen ético.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="(pilar, idx) in pilares" 
          :key="idx"
          class="glass-panel rounded-3xl p-8 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div class="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-2xl mb-5 shadow-inner">
              {{ pilar.icono }}
            </div>
            <h3 class="text-lg font-bold text-white mb-1">{{ pilar.titulo }}</h3>
            <span class="text-xs font-semibold text-cyan-400 block mb-3">{{ pilar.subtitulo }}</span>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">{{ pilar.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Justificación Ética: Justicia, Solidaridad e Impacto -->
    <div class="mb-20">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">Fundamentación Cívica</span>
        <h2 class="text-3xl font-extrabold text-white tracking-tight">Justificación Ética del Proyecto</h2>
        <p class="text-sm text-slate-400 mt-2">Cómo aplicamos los principios éticos fundamentales y su impacto directo en la sociedad salvadoreña.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Justicia -->
        <div class="glass-panel rounded-3xl p-7 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between shadow-xl">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-2xl mb-5 shadow-inner">
              ⚖️
            </div>
            <h3 class="text-lg font-bold text-white mb-1">¿Cómo aplica la Justicia?</h3>
            <span class="text-xs font-semibold text-cyan-400 block mb-4">Verdad e imparcialidad como derecho</span>
            
            <ul class="space-y-3 text-xs sm:text-sm text-slate-300">
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 font-bold mt-0.5">•</span>
                <span><strong>Derecho a la verdad:</strong> Engañar a la población es injusto porque anula su libertad para decidir informadamente.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 font-bold mt-0.5">•</span>
                <span><strong>Imparcialidad:</strong> Se juzgan hechos comprobables con fuentes oficiales, nunca ideologías ni partidos.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 font-bold mt-0.5">•</span>
                <span><strong>Acceso equitativo:</strong> Herramienta 100% gratuita y abierta para todos, sin barreras de pago.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Solidaridad -->
        <div class="glass-panel rounded-3xl p-7 border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between shadow-xl">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-2xl mb-5 shadow-inner">
              🤝
            </div>
            <h3 class="text-lg font-bold text-white mb-1">¿Cómo aplica la Solidaridad?</h3>
            <span class="text-xs font-semibold text-indigo-400 block mb-4">Bien común y protección mutua</span>
            
            <ul class="space-y-3 text-xs sm:text-sm text-slate-300">
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong>Cuidado mutuo:</strong> Un ciudadano reporta una sospecha para proteger a su familia y a toda su comunidad.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong>Voluntariado cívico:</strong> Profesionales donan su tiempo para auditar hechos por el bien común.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 font-bold mt-0.5">•</span>
                <span><strong>Protección al vulnerable:</strong> Defiende a adultos mayores y personas con menor alfabetización digital de estafas o pánico.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Impacto en la población -->
        <div class="glass-panel rounded-3xl p-7 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between shadow-xl">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-2xl mb-5 shadow-inner">
              🎯
            </div>
            <h3 class="text-lg font-bold text-white mb-1">¿Qué impacto tiene en la población?</h3>
            <span class="text-xs font-semibold text-emerald-400 block mb-4">Autonomía y cohesión social</span>
            
            <ul class="space-y-3 text-xs sm:text-sm text-slate-300">
              <li class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold mt-0.5">•</span>
                <span><strong>Pensamiento crítico:</strong> Enseña al ciudadano a dudar sanamente y verificar antes de compartir impulsivamente.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold mt-0.5">•</span>
                <span><strong>Prevención del pánico:</strong> Evita compras desesperadas, zozobra social o riesgos de salud por rumores falsos.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-emerald-400 font-bold mt-0.5">•</span>
                <span><strong>Cohesión social:</strong> Reduce la polarización al ofrecer un terreno común de hechos comprobables.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <!-- Cómo Funciona el Ciclo Ético (Infografía de pasos) -->
    <div class="mb-20">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">Metodología Paso a Paso</span>
        <h2 class="text-3xl font-extrabold text-white tracking-tight">El Ciclo de la Información Verificada</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="etapa in etapasFlujo" 
          :key="etapa.paso"
          class="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 relative flex flex-col justify-between"
        >
          <div>
            <span class="text-3xl font-black font-mono block mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {{ etapa.paso }}
            </span>
            <h3 class="text-base font-bold text-white mb-2">{{ etapa.titulo }}</h3>
            <p class="text-xs text-slate-400 leading-relaxed">{{ etapa.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Compromisos Institucionales -->
    <div class="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 text-center max-w-4xl mx-auto">
      <h3 class="text-xl font-bold text-white mb-3">¿Deseas sumarte al cuerpo de voluntarios?</h3>
      <p class="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6">
        Buscamos periodistas, docentes, estudiantes universitarios y ciudadanos comprometidos con el rigor informativo para colaborar en la verificación cívica.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <RouterLink 
          to="/contacto" 
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          Postularme como Voluntario
        </RouterLink>
        <RouterLink 
          to="/alertas" 
          class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700 cursor-pointer"
        >
          Explorar Alertas Públicas
        </RouterLink>
      </div>
    </div>

  </div>
</template>
