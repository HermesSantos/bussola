<template>
  <div v-if="itemsToBuy && itemsToBuy.length" class="container">
    <div class="text-white mt-5">
      <h1>Confirmação de Itens</h1>
    </div>

    <div
      class="my-5 bg-white rounded"
      v-for="(product, index) in itemsToBuy"
      :key="index"
    >
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
              <h4><b>Preço: </b> R$ {{ product.valor }},00</h4>
              <h4><b>Descrição</b>: {{ product.descricao }}</h4>
            </div>

            <button
              class="btn btn-outline-danger w-100"
              @click="removeItem(product.nome)"
            >
              <i class="bi bi-trash me-2"></i> Remover 1
            </button>
          </div>
        </div>
      </div>
    </div>

    <router-link
      class="btn btn-danger btn-lg w-100 mb-5 p-4 position-relative"
      to="/end-buying"
    >
      <i class="bi bi-cart-fill me-2"></i> Finalizar Compra
    </router-link>
  </div>

  <div v-else class="text-center my-5">
    <div class="spinner-border text-danger"></div>
    <p class="text-white mt-3">Carrinho vazio</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useCartStore } from "../stores/cartStore"

const cartStore = useCartStore()
const itemsToBuy = ref<Product[]>([])

onMounted(() => {
  itemsToBuy.value = [...cartStore.allItems]
})

function removeItem(nome: string) {
  const product = itemsToBuy.value.find((item: {nome: string}) => item.nome === nome)

  if (product) {
    if (product.quantidade > 1) {
      product.quantidade -= 1
    } else {
      itemsToBuy.value = itemsToBuy.value.filter((item: {nome: string}) => item.nome !== nome)
    }
  }

  cartStore.itemsToBuy = itemsToBuy.value

  //atualiza localStorage, TODO: verificar se a funcao funciona com low latence
  localStorage.setItem("cart", JSON.stringify(itemsToBuy.value))
  const totalCartItems = itemsToBuy.value.reduce(
    (acc, item) => acc + item.quantidade,
    0
  )
  cartStore.items = totalCartItems
  localStorage.setItem("totalCartItems", JSON.stringify(totalCartItems))
}
</script>
