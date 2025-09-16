<template>
  <nav class="navbar navbar-expand-lg bg-body-light fixed-top">
    <div class="container d-flex align-items-center">
      <router-link to="/" class="navbar-brand d-flex align-items-center" href="/">
        <h3 class="hover-effect text-white">House of Wolves</h3>
      </router-link>
      <a href="/cart" style="color: black;" class="position-relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24" fill="white">
          <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
        </svg>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{cartStore.items.length === 0 ? '' : cartStore.items}}
        </span>
      </a>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useCartStore } from "../stores/cartStore"

const cartStore = useCartStore();

const numberOfCartItems = ref(0)

type CartItem = {
  quantidade: string
}
onMounted(async () => {
  let cart = JSON.parse(localStorage.getItem('cart'))
  if(cart.length === 0) return
  cart.map((cartItem: CartItem) => {
    numberOfCartItems.value += cartItem.quantidade
  })
})
</script>
<style scoped>
.navbar {
  background-color: #ffffff4d;
  backdrop-filter: blur(10px);
  padding: 20px;
}
.hover-effect {
  transition: color 0.3s ease;
}

.hover-effect:hover {
  color: #a1a1a1;
}
</style>
