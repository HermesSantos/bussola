<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view :key="$route.fullPath"/>
</template>

<style scoped></style>
