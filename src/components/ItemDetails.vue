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
        <h1>{{ product.name }}</h1>
        <h2>Valor: R$ {{ product.price }}</h2>

        <div>
          <div class="w-100 mb-3">
            <h2>Descrição: </h2>
            <span>Descrição: {{ product.description }}</span>
          </div>

          <button class="btn btn-success btn-lg w-100 mb-3 position-relative" @click="addToCart(product)"
            :class="{'disabled-link': itemsAll.length > 0}"
          >
            <i class="bi bi-cart-fill me-2"></i> Adicionar ao Carrinho
          </button>

          <button class="btn btn-danger btn-lg w-100 mb-3 position-relative" @click="removeFromCart(product)"
            :class="{'disabled-link': itemsAll.length > 0}"
          >
            <i class="bi bi-cart-fill me-2"></i> Remover do Carrinho
          </button>

        </div>
      </div>
      <div class="mt-5">
        <a
          class="btn btn-dark btn-lg w-100 mb-3 position-relative"
          href="/cart"
        >
          <i class="bi bi-cart-fill me-2"></i> Ir Para o Carrinho
        </a>
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
import { useCartStore } from "../stores/cartStore"
import Swal from 'sweetalert2'

const cartStore = useCartStore();

const route = useRoute()
const product = ref<any>(null)

const itemsAll = cartStore.items

onMounted(async () => {
  const response = await apiService.get(`/get-product/${route.params.id}`)
  product.value = response.data
})

function removeFromCart(product: any) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingProductIndex = cart.findIndex((item: any) => item.nome === product.name);

  if (existingProductIndex !== -1) {
    if (cart[existingProductIndex].quantidade > 1) {
      cart[existingProductIndex].quantidade -= 1;
    } else {
      cart.splice(existingProductIndex, 1);
    }
  }

  let totalCartItems = cart.reduce(
    (acc: number, item: any) => acc + item.quantidade,
    0
  );

  cartStore.items = totalCartItems;
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalCartItems", JSON.stringify(totalCartItems));

  showAlert("Item removido do carrinho!");
}

function addToCart (product: any) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingProduct = cart.find((item: any) => item.nome === product.name);

  if (existingProduct) {
    existingProduct.quantidade += 1;
  } else {
    cart.push({
      nome: product.name,
      valor: product.price,
      image_url: product.image_url,
      descricao: product.description,
      quantidade: 1,
    });
  }
  let totalCartItems = cart.reduce((acc: number, item: any) => acc + item.quantidade, 0);
  cartStore.items++
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalCartItems", JSON.stringify(totalCartItems));
  showAlert("Item adicionado ao carrinho!");
}

function showAlert (message: string, type = "success" ) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: type,
    title: message
  });
}
</script>
<style scoped>
.main-card {
  background-color: white;
  border-radius: 5px;
}
.disabled-link {
  pointer-events: none;
  text-decoration: none;
  cursor: not-allowed;
}
</style>
