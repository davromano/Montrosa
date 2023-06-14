<script setup lang="ts">
import { ref } from 'vue';


defineProps<{ word: string }>()

const isClicked = ref(false);

function toggleButton() {
  isClicked.value = !isClicked.value;

}

</script>

<template>

  <div class="card">
    <button :class="{ clicked: isClicked }" type="button" @click="toggleButton">{{ word }}</button>  
  </div>
</template>

<style scoped>
button {
  /* Define the initial style */
  background-color: initial;
}

button.clicked {
  /* Style for the clicked state */
  background-color: yellow;
}
</style>
