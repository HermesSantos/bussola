<template>
  <div class="container my-5" v-if="product">
    <div class="row main-card">
      <!-- Coluna da Imagem -->
      <div class="col-md-6 text-center">
        <img 
          :src="product.image_url" 
          alt="Imagem do produto"
          class="img-fluid rounded shadow-sm"
          style="max-height: 400px; object-fit: contain;"
        />
      </div>

      <!-- Coluna das Informações -->
      <div class="col-md-6">
        <h2 class="mb-4">{{ product.name }}</h2>

        <!-- Botão principal -->
        <button class="btn btn-danger btn-lg w-100 mb-3">
          <i class="bi bi-cart-fill me-2"></i> COMPRAR PRODUTO
        </button>

        <!-- Botões secundários -->
        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-outline-danger flex-fill">
            <i class="bi bi-play-circle me-2"></i> ASSISTA
          </button>
          <button class="btn btn-outline-danger flex-fill">
            <i class="bi bi-file-earmark-text me-2"></i> MANUAL
          </button>
          <button class="btn btn-outline-danger flex-fill">
            <i class="bi bi-download me-2"></i> DRIVERS
          </button>
        </div>

        <!-- Caixa de informações -->
        <div class="border rounded p-3">
          <div class="row">
            <div class="col-6">
              <h6 class="fw-bold">O que vem na caixa</h6>
              <p class="mb-0">Mouse | Manual</p>
            </div>
            <div class="col-6">
              <h6 class="fw-bold">Informações adicionais</h6>
              <p class="mb-0">---</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Spinner de carregamento -->
  <div v-else class="text-center my-5">
    <div class="spinner-border text-danger"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import apiService from "@/services/apiService"

const route = useRoute()
const product = ref<any>(null)

onMounted(async () => {
  const response = await apiService.get(`/get-product/${route.params.id}`)
  product.value = response.data
})
</script>
<style scoped>
.main-card {
  background-color: white;
  border-radius: 5px;
}
</style>
