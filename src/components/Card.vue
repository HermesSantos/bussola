<template>
  <div class="card image-effect">
    <img src="https://drivers.pichau.com.br/pichaugaming/Banner/PC-PRS27-V2.png"
      class="card-img-top card-img-top zoom-img"
      alt="..."
    >
    <div class="overlay">
      <span class="overlay-text">Texto do Hover</span>
    </div>
  </div>
</template>
<style scoped>
.card-body{
  display: none
}
.zoom-img {
  transition: transform 0.3s ease;
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
</style>
