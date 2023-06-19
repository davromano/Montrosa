<template>
  <div class="card">
    <button
      :class="{
        'bg-yellow-100 text-black': isClicked,
        'bg-gray-800 text-white': !isClicked
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
