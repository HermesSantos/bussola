import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import ShoppingCart from '../components/ShoppingCart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard, name: 'Dashboard' },
    { path: '/product/:id', component: ShoppingCart, name: 'ShoppingCart' },
  ],
})

export default router
