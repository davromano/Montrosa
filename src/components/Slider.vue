<template>
    <div>
      <input
        type="range"
        class="w-96 h-6 appearance-none bg-black rounded-full focus:outline-none focus:bg-montreux-yellow border-2 border-montreux-yellow"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        @input="updateValue"
      />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1,
    },
    step: {
      type: Number,
      default: 0.01,
    },
  },
  methods: {
    updateValue(event: Event) {
      const value = parseFloat((event.target as HTMLInputElement).value);
      this.$emit("update:modelValue", value);
    },
  },
});
</script>
