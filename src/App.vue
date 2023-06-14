<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Keyword from './components/Keyword.vue';
import Generation from './components/Generation.vue';

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/../src/assets/68.jpeg" class="logo" alt="Vite logo" />
    </a>
  </div>
  <HelloWorld msg="Montrosa" />
  <Keyword word="Street Art"/>
  <Keyword word="Pop Art"/>
  <Keyword word="Realistic"/>
  <Keyword word="Oil Painting"/>
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
</style>
