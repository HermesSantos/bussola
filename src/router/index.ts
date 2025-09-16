import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import ItemDetails from '../components/ItemDetails.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import EndBuying from '../components/EndBuying.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard, name: 'Dashboard' },
    { path: '/product/:id', component: ItemDetails, name: 'ItemDetails' },
    { path: '/cart', component: ShoppingCart, name: 'ShoppingCart' },
    { path: '/end-buying', component: EndBuying, name: 'EndBuying' },
  ],
})

export default router
