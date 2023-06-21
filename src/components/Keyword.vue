<template>
  <div class="card">
    <button
      :class="{
        'bg-montreux-yellow text-black text-3xl rounded-full py-3 px-6 hover:bg-yellow-200 border-2 border-montreux-yellow': isClicked,
        'bg-black text-white text-3xl rounded-full py-3 px-6 hover:bg-yellow-900 border-montreux-yellow border-2' : !isClicked
      }"
      type="button"
      @click="toggleButton"
    >
      {{ word }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    word: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isClicked: false
    };
  },
  methods: {
    toggleButton() {
      this.isClicked = !this.isClicked;
    }
  }
};
</script>

<style>
@import "./../assets/fonts.css";

button {
  font-family: 'tt-norms';
}
</style>
