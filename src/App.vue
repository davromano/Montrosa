<script setup lang="ts">
import Generation from "./pages/Generation.vue"
</script>

<template>
  <img src="/../src/assets/montreux_logo.jpg" alt="Vite logo" class="content-center justify-center"/>
  <p class="content-center text-center text-white">“Just choose a poster and I can show you what I am capable of!” Montrosa </p>
  <h1 class="content-center text-center	">Who is Montrosa?</h1>
  <Generation/>
</template>

<style scoped>

@import './styles/style.css';

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.read-the-docs {
  color: #888;
}

h1 {
color: white;
}
</style>
