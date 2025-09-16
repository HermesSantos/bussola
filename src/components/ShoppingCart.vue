<template>
  <div v-if="itemsToBuy" class="container">
    <div class=" my-5 bg-white rounded" v-for="product in itemsToBuy" :key="product.id">
      <div class="row main-card p-5">
        <div class="col-md-6 text-center">
          <img
            :src="product.image_url" 
            alt="Imagem do produto"
            class="img-fluid rounded shadow-sm"
            style="max-height: 400px; object-fit: contain;"
          />
        </div>

        <div class="d-flex flex-column justify-content-between col-md-6">
          <h1 class="mb-4">{{ product.nome }}</h1>
          <h4 class="mb-4"><b>Quantidade:</b> {{ product.quantidade }}</h4>

          <div>
            <div class="w-100 mb-3">
              <h4><b>Preço: </b>R$ {{product.valor}},00</h4>
              <h4><b>Descrição</b>: {{ product.descricao }}</h4>
            </div>


          </div>

        </div>
      </div>
    </div>
    <router-link class="btn btn-danger btn-lg w-100 mb-5 p-4 position-relative" to="/end-buying">
      <i class="bi bi-cart-fill me-2"></i> Finalizar Compra
    </router-link>
  </div>

  <!-- Spinner de carregamento -->
  <div v-else class="text-center my-5">
    <div class="spinner-border text-danger"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useCartStore } from "../stores/cartStore"

const cartStore = useCartStore();
const itemsToBuy = ref()

onMounted(async () => {
  itemsToBuy.value = cartStore.allItems
})
</script>
