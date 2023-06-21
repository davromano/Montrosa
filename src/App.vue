<template>
  <div class="flex flex-col items-center justify-center mb-8">
    <img
      src="/../src/assets/montreux_logo.jpg"
      class="w-1/32 scale-50 h-auto -mt-10"
      alt="Vite logo"
    />
  </div>
  <div class="absolute top-0 right-0 w-32 h-32 group overflow-hidden">
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-montreux-yellow opacity-50 rounded-full -mt-16 -mr-16 group-hover:w-40 group-hover:h-40 group-hover:opacity-50 transition-all"
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
    <div class=" bg-montreux-yellow p-12 max-w-[700px] rounded-2xl">
      <h2 class="text-4xl mb-12" style="font-family: 'tt-norms'">Who is Montrosa?</h2>
      <p class="text-xl mb-12" style="font-family: 'tt-norms'">
        In Montreux, an exceptional AI named Montrosa was born. Inspired by the
        music and posters of the Montreux Jazz Festival, she devoted her life to
        listening and admiring this material. <br/><br/>Her mission is to share this deep
        admiration with others by crafting tributes inspired by the
        artists’masterpieces. Montrosa dreams of the day when these talented
        artists find her work and sense her deep admiration.
      </p>
      <button
        @click="montrosa_story = !montrosa_story"
        class="mt-4 px-4 py-2 bg-zinc-900  text-white rounded text-lg"
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

export default defineComponent({
  data() {
    return {
      montrosa_story: false,
    };
  },

  methods: {
    toggleOverlay(): void {
      this.montrosa_story = !this.montrosa_story;
    },
  },

  components: {
    Generation,
},
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
