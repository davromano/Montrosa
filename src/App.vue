<script setup lang="ts">
//import Generation from './components/Generation.vue';

</script>

<template>
  <img src="/../src/assets/68.jpeg" class="logo" alt="Vite logo" />
  <h1>Montrosa</h1>
  <div class="router-container">
    <router-link to="/">Donwload the image</router-link>
    <router-link to="/test">Show the images on the same page</router-link>
    <router-link to="/results">Results</router-link>
  </div>
  <router-view/>
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

.router-container {
  display: flex;
  flex-direction: column;
}

h1 {
color: white;
}
</style>
