import { createRouter, createWebHistory } from 'vue-router'
import Verificador from '../views/Verificador.vue'
import Aprender from '../views/Aprender.vue'
import Reportar from '../views/Reportar.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Verificador',
      component: Verificador
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
    }
  ]
})

export default router
