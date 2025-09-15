<template>
  <nav class="navbar navbar-expand-lg bg-body-light fixed-top">
    <div class="container d-flex align-items-center">
      <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="/images/logo.png" alt="Logo" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;">
        <span class="hover-effect">House of Wolves</span>
      </a>
    </div>
  </nav>
</template>
<style scoped>
span {
  color: white
}
.navbar {
  background-color: #ffffff4d;
  backdrop-filter: blur(10px);
  padding: 20px;
}
.hover-effect {
  transition: color 0.3s ease;
}

.hover-effect:hover {
  color: #a1a1a1;
}
</style>
