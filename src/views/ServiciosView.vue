<script setup>
const servicios = [
  {
    id: 'triangulacion',
    icono: '🔍',
    nombre: 'Triangulación Multimedio en Tiempo Real',
    tag: 'Herramienta de Análisis',
    descripcion: 'Contrasta cómo 4 medios con diferentes líneas editoriales reportan el mismo acontecimiento. Detecta de inmediato omisiones, sesgos discursivos y grados de concordancia fáctica.',
    beneficio: 'Ideal para lectores que desean una visión balanceada y no quedarse con una sola versión.',
    ruta: '/',
    cta: 'Ir al Verificador'
  },
  {
    id: 'alertas-publicas',
    icono: '🛡️',
    nombre: 'Repositorio Abierto de Alertas Verificadas',
    tag: 'Base de Datos Cívica',
    descripcion: 'Archivo histórico y permanente de contenidos que han sido auditados. Cada alerta incluye la resolución motivada por un verificador y el enlace a la fuente primaria de respaldo.',
    beneficio: 'Evita que bulos y cadenas falsas vuelvan a circular meses después.',
    ruta: '/alertas',
    cta: 'Ver Alertas Verificadas'
  },
  {
    id: 'reportes-anonimos',
    icono: '📬',
    nombre: 'Canal de Alerta Temprana (Cero Huella)',
    tag: 'Crowdsourcing Ciudadano',
    descripcion: 'Buzón digital seguro donde cualquier persona puede denunciar enlaces, tweets o publicaciones sospechosas. Garantizamos privacidad total: sin registro de usuarios ni IPs.',
    beneficio: 'Permite a la ciudadanía participar activamente en la detección temprana de desinformación.',
    ruta: '/reportar',
    cta: 'Enviar un Reporte'
  },
  {
    id: 'alfabetizacion-forense',
    icono: '🎓',
    nombre: 'Gimnasio Forense de Juicio Crítico',
    tag: 'Módulo Educativo',
    descripcion: 'Micro-guías interactivas y quizzes basados en simulaciones reales donde los usuarios aprenden a inspeccionar titulares clickbait, dominios clonados y audios anónimos de chat.',
    beneficio: 'Desarrolla el sentido crítico para no compartir noticias dudosas impulsivamente.',
    ruta: '/aprender',
    cta: 'Entrenar mi Juicio Crítico'
  },
  {
    id: 'auditoria-voluntarios',
    icono: '⚖️',
    nombre: 'Auditoría Humana Acreditada',
    tag: 'Gobernanza Ética',
    descripcion: 'Panel especializado de moderación donde voluntarios contrastan reportes ciudadanos contra decretos de ley, datos del BCR y fuentes oficiales antes de emitir un veredicto público.',
    beneficio: 'Garantiza que la verdad no dependa de algoritmos de redes sociales ni de votos de popularidad.',
    ruta: '/panel-voluntarios',
    cta: 'Panel de Verificadores'
  },
  {
    id: 'talleres-institucionales',
    icono: '🏛️',
    nombre: 'Talleres para Universidades y Comunidades',
    tag: 'Extensión Académica',
    descripcion: 'Ponencias y talleres prácticos dirigidos a estudiantes de periodismo, docentes de secundaria y líderes vecinales para fomentar la verificación de hechos como derecho cívico.',
    beneficio: 'Capacita a nuevas generaciones de verificadores independientes en El Salvador.',
    ruta: '/contacto',
    cta: 'Solicitar Taller'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Hero Header -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 animate-float">
        <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
        Herramientas Tecnológicas y Cívicas
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
        Nuestros <span class="shimmer-text">Servicios Cívicos</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
        Ponemos a disposición de la ciudadanía, la academia y los medios salvadoreños una suite de herramientas de acceso 100% libre y sin publicidad para contrarrestar la desinformación.
      </p>
    </div>

    <!-- Catálogo de 6 Servicios en Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      
      <div 
        v-for="servicio in servicios" 
        :key="servicio.id"
        class="glass-panel rounded-3xl p-7 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 relative overflow-hidden"
      >
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 opacity-40 group-hover:opacity-100 transition-opacity"></div>

        <div>
          <!-- Icon & Tag -->
          <div class="flex items-center justify-between mb-5">
            <div class="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
              {{ servicio.icono }}
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700">
              {{ servicio.tag }}
            </span>
          </div>

          <!-- Title & Description -->
          <h2 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {{ servicio.nombre }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {{ servicio.descripcion }}
          </p>

          <!-- Beneficio destacado -->
          <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6 text-xs text-slate-400">
            <strong class="text-slate-300 block mb-0.5">Impacto ciudadano:</strong>
            {{ servicio.beneficio }}
          </div>
        </div>

        <!-- Call to Action Button -->
        <div>
          <RouterLink 
            :to="servicio.ruta"
            class="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-slate-200 hover:text-white font-bold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 border border-slate-700 hover:border-transparent group/btn cursor-pointer"
          >
            <span>{{ servicio.cta }}</span>
            <span class="group-hover/btn:translate-x-1 transition-transform">→</span>
          </RouterLink>
        </div>

      </div>

    </div>

    <!-- Garantía de Gratuidad y Neutralidad -->
    <div class="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 text-slate-300 max-w-4xl mx-auto space-y-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🌱</span>
        <h3 class="text-lg font-bold text-white">Compromiso de Gratuidad Absoluta</h3>
      </div>
      <p class="text-xs sm:text-sm leading-relaxed text-slate-400">
        Todos nuestros servicios son de libre acceso público, sin muros de pago (*paywalls*) ni suscripciones. La veracidad informativa es un bien público indispensable para la salud democrática de El Salvador.
      </p>
    </div>

  </div>
</template>
