<script setup lang="ts">
import Generation from './components/Generation.vue';

</script>

<template>    
  <img src="/../src/assets/68.jpeg" class="logo" alt="Vite logo" />
  <h1>Montrosa</h1>
  <Generation />

</template>

<style scoped>
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
</style>
