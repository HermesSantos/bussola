<script setup lang="ts">
import Card from "./Card.vue";
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService'

const message = ref('Olá!')

async function fetchProducts () {
  const response = await apiService.get('/')
  console.log(response.data)
}
onMounted(() => {
  fetchProducts()
})
</script>
<template>
  <div class="container pt-5">
    <Card />
  </div>
</template>
