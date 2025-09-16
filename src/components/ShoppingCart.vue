<template>
  <div class="container my-5" v-if="product">
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
        <h1 class="mb-4">{{ product.name }}</h1>
        <h2 class="mb-4">Valor: R$ {{ product.price }}</h2>

        <div>
          <div class="w-100 mb-3">
            <h2>Descrição: </h2>
            <span>Descrição: {{ product.description }}</span>
          </div>

          <button class="btn btn-danger btn-lg w-100 mb-3 position-relative" @click="addToCart(product)">
            <i class="bi bi-cart-fill me-2"></i> Adicionar ao Carrinho
          </button>

          <button class="btn btn-dark btn-lg w-100 mb-3 position-relative" @click="addToCart(product)">
            <i class="bi bi-cart-fill me-2"></i> Ir Para o Carrinho
          </button>
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

const numberOfCartItems = ref()

function addToCart(product: any) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingProduct = cart.find((item: any) => item.nome === product.name);

  if (existingProduct) {
    existingProduct.quantidade += 1;
  } else {
    cart.push({
      nome: product.name,
      valor: product.price,
      quantidade: 1,
    });
  }
  let totalCartItems = cart.reduce((acc: number, item: any) => acc + item.quantidade, 0);
  numberOfCartItems.value = totalCartItems
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalCartItems", JSON.stringify(totalCartItems));
}
</script>
<style scoped>
.main-card {
  background-color: white;
  border-radius: 5px;
}
</style>
