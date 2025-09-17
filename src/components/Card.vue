<script setup lang="ts">
const props = defineProps({
  product: String
})
</script>
<template>
  <router-link :to="/product/ + product.id" class="card image-effect mt-3">
    <img :src="product.image_url"
      class="card-img-top card-img-top zoom-img full-card-img"
    >
    <div class="overlay p-2 flex flex-column">
      <span class="overlay-text">{{product.description}}</span>
      <span class="overlay-text mt-3">R$ {{product.price}}</span>
    </div>
  </router-link>
  <div class="description">{{product.description}}</div>
</template>
<style scoped>
.card-body{
  display: none
}
.zoom-img {
  transition: transform 0.3s ease;
}

.full-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.zoom-img:hover {
  transform: scale(1.1);
}
.image-effect:hover .zoom-img {
  transform: scale(1.1);
}
.image-effect:hover .overlay {
  opacity: 1;
}
.image-effect{
  width: 18rem;
  overflow: hidden;
  border-radius: 8px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.overlay-text {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}
.description {
  margin-top: 1%;
  color: white;
  max-width: 40%;
}
</style>
