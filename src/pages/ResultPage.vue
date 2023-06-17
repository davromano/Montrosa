<template>
  <div>
    <h1>Result Page</h1>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
      const route = useRoute();
      const img_base64=ref('');
      const prefix='data:image/jpeg;base64,'
      // Access the query parameter
      img_base64.value = route.query.image as string;

      const image_url = prefix.concat(" ", img_base64.value);
      return {
      imageUrl: image_url,
      };
    },
});
</script>
