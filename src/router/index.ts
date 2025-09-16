import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import ItemDetails from '../components/ItemDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard, name: 'Dashboard' },
    { path: '/product/:id', component: ItemDetails, name: 'ShoppingCart' },
  ],
})

export default router
