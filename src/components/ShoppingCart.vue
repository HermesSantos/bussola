<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import apiService from "@/services/apiService"

const route = useRoute()

onMounted(async () => {
  const response = await apiService.get(`/get-product/${route.params.id}`)
  product.value = response.data
})
const product = ref<any>({
  price: 0
})

</script>

<template>
  <div class="container py-5 d-flex" v-if="product">
    <div>1</div>
    <div>2</div>
  </div>
</template>
<style scoped>
*{
  color: white
}
</style>
