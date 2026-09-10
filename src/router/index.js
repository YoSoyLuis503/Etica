import { createRouter, createWebHistory } from 'vue-router'
import Verificador from '../views/Verificador.vue'
import Aprender from '../views/Aprender.vue'
import Reportar from '../views/Reportar.vue'
import AlertasView from '../views/AlertasView.vue'
import VoluntariosView from '../views/VoluntariosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Verificador',
      component: Verificador
    },
    {
      path: '/alertas',
      name: 'Alertas',
      component: AlertasView
    },
    {
      path: '/aprender',
      name: 'Aprender',
      component: Aprender
    },
    {
      path: '/reportar',
      name: 'Reportar',
      component: Reportar
    },
    {
      path: '/panel-voluntarios',
      name: 'PanelVoluntarios',
      component: VoluntariosView
    }
  ]
})

export default router
