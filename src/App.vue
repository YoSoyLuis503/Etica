<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 relative selection:bg-cyan-500 selection:text-white">
    <!-- Ambient Gradient Backdrops (Light blooms) -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
      <div class="absolute -bottom-20 left-1/3 w-[28rem] h-[28rem] bg-cyan-600/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 4s;"></div>
      <!-- Subtle Grid Pattern Overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </div>

    <!-- Modern Glassmorphism Navbar -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/60 shadow-lg shadow-black/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          
          <!-- Logo & Branding -->
          <RouterLink to="/" class="flex items-center gap-3.5 group">
            <div class="relative flex items-center justify-center">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-500/30 transition-all duration-300 group-hover:scale-105">
                <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400 group-hover:rotate-6 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
              </div>
              <span class="absolute -top-1 -right-1 flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Portal Nacional
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  SV
                </span>
              </div>
              <p class="text-xs text-slate-400 font-medium tracking-wide">Contra las Fake News &bull; Observatorio Cívico</p>
            </div>
          </RouterLink>

          <!-- Desktop Navigation -->
          <nav class="hidden xl:flex items-center gap-1 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-xs">
            <RouterLink 
              to="/" 
              class="relative px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              active-class="!text-white !bg-gradient-to-r !from-blue-600/90 !to-indigo-600/90 !shadow-md !shadow-blue-500/20"
            >
              <span>Verificador</span>
            </RouterLink>

            <RouterLink 
              to="/alertas" 
              class="relative px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              active-class="!text-white !bg-gradient-to-r !from-blue-600/90 !to-indigo-600/90 !shadow-md !shadow-blue-500/20"
            >
              <span>Alertas</span>
            </RouterLink>

            <RouterLink 
              to="/aprender" 
              class="relative px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              active-class="!text-white !bg-gradient-to-r !from-blue-600/90 !to-indigo-600/90 !shadow-md !shadow-blue-500/20"
            >
              <span>Aprender</span>
            </RouterLink>

            <RouterLink 
              to="/reportar" 
              class="relative px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              active-class="!text-white !bg-gradient-to-r !from-blue-600/90 !to-indigo-600/90 !shadow-md !shadow-blue-500/20"
            >
              <span>Reportar</span>
            </RouterLink>

            <RouterLink 
              to="/servicios" 
              class="relative px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              active-class="!text-white !bg-gradient-to-r !from-blue-600/90 !to-indigo-600/90 !shadow-md !shadow-blue-500/20"
            >
              <span>Servicios</span>
            </RouterLink>

            <RouterLink 
              to="/acerca" 
              class="relative px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              active-class="!text-white !bg-gradient-to-r !from-blue-600/90 !to-indigo-600/90 !shadow-md !shadow-blue-500/20"
            >
              <span>Acerca de</span>
            </RouterLink>

            <RouterLink 
              to="/contacto" 
              class="relative px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              active-class="!text-white !bg-gradient-to-r !from-blue-600/90 !to-indigo-600/90 !shadow-md !shadow-blue-500/20"
            >
              <span>Contacto</span>
            </RouterLink>
          </nav>

          <!-- Status Indicator & Discrete Volunteer Access -->
          <div class="hidden lg:flex items-center gap-2.5">
            <RouterLink 
              to="/panel-voluntarios" 
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-all duration-200 group"
              active-class="!border-cyan-500/50 !text-cyan-300 !bg-cyan-500/10"
              title="Panel interno para voluntarios y auditores acreditados"
            >
              <span class="text-xs group-hover:scale-110 transition-transform">⚖️</span>
              <span>Acceso Verificadores</span>
            </RouterLink>

            <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs font-medium text-slate-300">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Gobernanza Cívica</span>
            </div>
          </div>

          <!-- Mobile Hamburger -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div v-if="mobileMenuOpen" class="xl:hidden py-4 border-t border-slate-800/80 space-y-1.5">
          <RouterLink 
            @click="mobileMenuOpen = false"
            to="/" 
            class="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800"
            active-class="bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
          >
            🔍 Verificador
          </RouterLink>
          <RouterLink 
            @click="mobileMenuOpen = false"
            to="/alertas" 
            class="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800"
            active-class="bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
          >
            🛡️ Alertas Ciudadanas
          </RouterLink>
          <RouterLink 
            @click="mobileMenuOpen = false"
            to="/aprender" 
            class="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800"
            active-class="bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
          >
            🎓 Aprender (Quiz Forense)
          </RouterLink>
          <RouterLink 
            @click="mobileMenuOpen = false"
            to="/reportar" 
            class="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800"
            active-class="bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
          >
            📬 Reportar Sospecha
          </RouterLink>
          <RouterLink 
            @click="mobileMenuOpen = false"
            to="/servicios" 
            class="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800"
            active-class="bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
          >
            🌱 Servicios Cívicos
          </RouterLink>
          <RouterLink 
            @click="mobileMenuOpen = false"
            to="/acerca" 
            class="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800"
            active-class="bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
          >
            📖 Acerca del Proyecto
          </RouterLink>
          <RouterLink 
            @click="mobileMenuOpen = false"
            to="/contacto" 
            class="block px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800"
            active-class="bg-blue-600/20 text-cyan-400 border border-cyan-500/30"
          >
            ✉️ Contacto & FAQ
          </RouterLink>
          
          <div class="pt-2 border-t border-slate-800/80">
            <RouterLink 
              @click="mobileMenuOpen = false"
              to="/panel-voluntarios" 
              class="block px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 hover:bg-slate-800/60 border border-cyan-500/20"
              active-class="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
            >
              ⚖️ Acceso Verificadores (Panel Interno)
            </RouterLink>
          </div>
        </div>

      </div>
    </header>

    <!-- Main Content with view transitions -->
    <main class="flex-grow relative z-10">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- Rich Institutional Footer -->
    <footer class="relative z-10 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl py-14 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          <!-- Col 1: Branding & Manifesto (2 cols) -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px]">
                <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-white text-xs">
                  SV
                </div>
              </div>
              <div>
                <span class="font-extrabold text-base text-white tracking-tight">Portal Nacional</span>
                <p class="text-xs text-slate-400">Contra las Fake News &bull; El Salvador</p>
              </div>
            </div>

            <p class="text-xs text-slate-400 leading-relaxed max-w-sm">
              Iniciativa cívica independiente de código abierto para la contrastación de medios, verificación trazable de hechos y alfabetización digital en El Salvador.
            </p>

            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% Cívico &bull; Sin Fines de Lucro &bull; Código Abierto</span>
            </div>
          </div>

          <!-- Col 2: Herramientas Cívicas -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">Herramientas</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <RouterLink to="/" class="hover:text-cyan-300 transition-colors">Triangulador de Fuentes</RouterLink>
              </li>
              <li>
                <RouterLink to="/alertas" class="hover:text-cyan-300 transition-colors">Alertas Ciudadanas</RouterLink>
              </li>
              <li>
                <RouterLink to="/aprender" class="hover:text-cyan-300 transition-colors">Laboratorio Forense & Quiz</RouterLink>
              </li>
              <li>
                <RouterLink to="/reportar" class="hover:text-cyan-300 transition-colors">Buzón de Reportes</RouterLink>
              </li>
              <li>
                <RouterLink to="/panel-voluntarios" class="hover:text-cyan-300 transition-colors">Acceso Verificadores</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Col 3: Institucional -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">Iniciativa</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <RouterLink to="/acerca" class="hover:text-cyan-300 transition-colors">Acerca del Proyecto</RouterLink>
              </li>
              <li>
                <RouterLink to="/servicios" class="hover:text-cyan-300 transition-colors">Servicios Cívicos</RouterLink>
              </li>
              <li>
                <RouterLink to="/acerca" class="hover:text-cyan-300 transition-colors">Metodología Abierta IFCN</RouterLink>
              </li>
              <li>
                <RouterLink to="/acerca" class="hover:text-cyan-300 transition-colors">Gobernanza Híbrida</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Col 4: Contacto & Transparencia -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">Transparencia</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <RouterLink to="/contacto" class="hover:text-cyan-300 transition-colors">Canales de Contacto</RouterLink>
              </li>
              <li>
                <RouterLink to="/contacto" class="hover:text-cyan-300 transition-colors">Preguntas Frecuentes (FAQ)</RouterLink>
              </li>
              <li>
                <RouterLink to="/contacto" class="hover:text-cyan-300 transition-colors">Postulación como Voluntario</RouterLink>
              </li>
              <li>
                <span class="text-slate-500 font-mono">contacto@eticasv.org</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {{ new Date().getFullYear() }} Portal Nacional contra las Fake News &bull; El Salvador.</p>
          <div class="flex items-center gap-4">
            <span>Privacidad Cero Huella</span>
            <span>&bull;</span>
            <span>Metodología Trazable</span>
            <span>&bull;</span>
            <span>San Salvador, SV</span>
          </div>
        </div>

      </div>
    </footer>
  </div>
</template>

<style>
/* Page Transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
