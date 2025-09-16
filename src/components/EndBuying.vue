<template>
  <div class="container my-5">
    <div class="card p-4">
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
          <input class="form-check-input" type="radio" name="payment" id="card" value="card" v-model="paymentMethod">
          <label class="form-check-label" for="card">
            <b>Cartão de Crédito</b>
          </label>
        </div>
      </div>

      <div v-if="paymentMethod === 'card'" class="mb-4">
        <label for="installments" class="form-label">Parcelamento</label>
        <br><small class="mt-3 mb-3 text-danger">1% de juros ao mês a partir da segunda parcela</small>
        <select id="installments" class="form-select" v-model="installments">
          <option v-for="n in 12" :key="n" :value="n">
            {{ n }}x
          </option>
        </select>
      </div>

      <div class="mb-4 d-flex justify-content-between">
        <h2>
          <strong>Total:</strong>
        </h2>
      </div>

      <button class="btn btn-danger w-100">Finalizar Compra</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from "../stores/cartStore"

onMounted(async () => {
  allItems.value = cartStore.itemsToBuy
  console.log("klkjljk", allItems.value)
})

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
