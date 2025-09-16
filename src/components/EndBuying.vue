<template>
  <div class="container my-5">
    <div class="card p-4" v-if="allItems">
      <h2 class="mb-4">Finalizar Compra</h2>

      <div class="mb-4">
        <h1>Itens</h1>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in allItems" :key="item.id">
            {{ item.nome }} (x{{ item.quantidade }})
            <span>R$ {{ (item.valor * item.quantidade) }}</span>
          </li>
        </ul>
      </div>


      <div class="mb-4">
        <h5>Forma de Pagamento</h5>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="payment" id="pix" value="pix" v-model="paymentMethod">
          <label class="form-check-label" for="pix">
            <b>PIX</b>
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="payment" id="cartao_credito" value="cartao_credito" v-model="paymentMethod">
          <label class="form-check-label" for="cartao_credito">
            <b>Cartão de Crédito</b>
          </label>
        </div>
      </div>

      <div v-if="paymentMethod === 'cartao_credito'" class="mb-4">
        <h5 for="installments" class="form-label">Parcelamento</h5>
        <br><small class="mt-3 mb-3 text-danger" v-if="installments > 1">1% de juros ao mês a partir da segunda parcela</small>
        <select id="installments" class="form-select" v-model="installments" @change="fetchProducts()">
          <option v-for="n in 12" :key="n" :value="n" >
            {{ n }}x
          </option>
        </select>
      </div>

      <div class="mb-4 d-flex justify-content-between" v-if="total">
        <h2>
          <strong>Total: {{formatCurrency(total.valor_total)}}</strong>
        </h2>
          <b><small v-if="paymentMethod === 'pix' || installments === 1" class="text-success">10% de Desconto!</small></b>
      </div>

      <button @click="showAlert" class="btn btn-danger">
        <h4>
          Finalizar Compra
        </h4>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from "../stores/cartStore"
import apiService from '../services/apiService'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  allItems.value = cartStore.itemsToBuy
  fetchProducts()
})

const total = ref()

const formatCurrency = (total: number) => {
  return new Intl
    .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(total)
}

async function fetchProducts () {
  let data = {
    produtos: allItems.value,
    metodo_pagamento: (paymentMethod.value).toUpperCase(),
    parcelas: installments.value
  }
  const response = await apiService.post('/calculate-cart-taxes', data)
  total.value = response.data
}

function showAlert () {
  Swal.fire({
    icon:"question",
    title: "Deseja finalizar a compra?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Sim",
    denyButtonText: "Não"
  }).then((result) => {
      if (result.isConfirmed) {
        handleBuying()
        window.location.href = '/'
      } 
    });
}

function handleBuying () {
  localStorage.removeItem('cart')
  localStorage.removeItem('totalCartItems')
  cartStore.clearCart
}

const cartStore = useCartStore();
const allItems = ref()

const paymentMethod = ref('pix')
const installments = ref(1)

</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
