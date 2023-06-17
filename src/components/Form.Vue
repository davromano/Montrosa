<template>
    <div>
      <div>
        <h2>Screen 1: Click the buttons</h2>
        <Button v-for="button in buttons" :key="button.id" :label="button.label" />
      </div>
      <div v-if="showScreen2">
        <h2>Screen 2: Display clicked buttons</h2>
        <ul>
          <li v-for="button in clickedButtons" :key="button.id">{{ button.label }}</li>
        </ul>
      </div>
      <button v-if="!showScreen2" @click="submitForm">Submit</button>
    </div>
  </template>
  
  <script lang="ts">
  import Button from './Button.vue';
  
  export default {
    components: {
      Button
    },
    data() {
      return {
        buttons: [
          { id: 1, label: 'Piano' },
          { id: 2, label: 'Guitar' },
          { id: 3, label: 'Drums' }
          // Add more buttons as needed
        ],
        clickedButtons: [],
        showScreen2: false
      };
    },
    methods: {
      submitForm() {
        this.clickedButtons = this.buttons.filter(button => button.clicked);
        this.showScreen2 = true;
      }
    }
  };
  </script>
  