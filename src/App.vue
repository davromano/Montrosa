<template>
  <div class="flex flex-col items-center justify-center mb-8">
    <img
      src="/../src/assets/montreux_logo.jpg"
      class="w-1/32 scale-50 h-auto -mt-10"
      alt="Vite logo"
    />
    <p class="text-white -mt-10 font-ttnorms text-lg">
      “Just choose a poster and I can show you what I am capable of!” Montrosa
    </p>
  </div>
  <div class="absolute top-0 right-0 w-32 h-32 group overflow-hidden">
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-yellow-300 opacity-50 rounded-full -mt-16 -mr-16 group-hover:w-40 group-hover:h-40 group-hover:opacity-50 transition-all"
    ></div>
    <button
      class="absolute top-0 right-0 text-white text-lg mt-8 mr-7 bg text-center"
      style="font-family: 'tt-norms'"
      @click="montrosa_story = !montrosa_story"
    >
      Who is <br />Montrosa?
    </button>
  </div>
  <div
    v-if="montrosa_story"
    class="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm"
  >
    <div class="bg-white p-4">
      <p>This is the overlay content.</p>
      <p>You can add multiple paragraphs or any other elements here.</p>
      <button
        @click="montrosa_story = !montrosa_story"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
  <Generation />
</template>

<script lang="ts">
import Generation from "./pages/Generation.vue";
import { defineComponent } from "vue";

export default defineComponent ({
  data() {
    return {
      montrosa_story: false
    };
  },

  methods: {
    toggleOverlay(): void {
      this.montrosa_story = !this.montrosa_story;
    }
  },

  components: {
    Generation
  }
});
</script>

<style scoped>
@import "./assets/fonts.css";

@import "./styles/style.css";

p,
h1 {
  font-family: "tt-norms";
}
</style>
