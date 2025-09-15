<script setup lang="ts">
import Card from "./Card.vue";
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService'

const products = ref(null)

async function fetchProducts () {
  const response = await apiService.get('/get-products')
  products.value = response.data.products
}
onMounted(() => {
  fetchProducts()
})
</script>
<template>
  <div class="container pt-5">
    <div class="cards-grid">
      <div 
        :key="`${product.id}_${product.name}`"
        v-for="product in products"
        class="card-wrapper"
      >
        <Card :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.card-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-wrapper > * {
  flex: 1;
}
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
