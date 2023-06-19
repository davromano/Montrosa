<template>
  <div v-if="!showImages">
    <div class="content-start h-56 grid grid-cols-3 gap-4">
      <Keyword
        v-for="word in styles"
        :key="word"
        :word="word"
        @click="handleButtonClick(word)"
      />
      <Keyword
        v-for="word in key_elements"
        :key="word"
        :word="word"
        @click="handleButtonClick(word)"
      />
    </div>
    <button @click="performAPICall" class=" text-white">Generate</button>
  </div>
  <div v-if="showImages" class=" text-white">
    <h3>Robert Bornand</h3>
    <img src="src/assets/68.jpeg"/>
    <h3>Montrosa's Tributes</h3>
    <div v-for="image in imageURLs" :key="image">
      <img :src="image" alt="Fetched Image" />
    </div>
    <button>Change prompt</button><br/>
    <button>Send tributes by email</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Keyword from "../components/Keyword.vue";

export default defineComponent({
  data() {
    return {
      styles: ["Street Art", "Pop Art", "Realistic", "Oil Painting"],
      key_elements: [
        "Pianist",
        "Phonograph",
        "Lake",
        "Crowd",
        "Music",
        "Flower",
      ],
      clickedButtons: [] as string[],
      imageURLs: [] as string[],
      showImages: false,
    };
  },
  components: {
    Keyword,
  },
  methods: {
    handleButtonClick(word: string) {
      if (this.clickedButtons.includes(word)) {
        // Button was clicked and is now unclicked
        const index = this.clickedButtons.indexOf(word);
        this.clickedButtons.splice(index, 1);
        console.log("I removed", word);
      } else {
        // Button was unclicked and is now clicked
        this.clickedButtons.push(word);
        console.log("I added", word);
      }
    },

    async performAPICall() {
      try {
        this.showImages = true;
        const engineId = "stable-diffusion-512-v2-1";
        const apiHost = "https://api.stability.ai";
        const apiKey = "sk-xXYOiGr6P3qRpbzrg8OJ6iOmHESwgctxMej4UewnZ1B722vE";

        if (!apiKey) {
          throw new Error("Missing Stability API key.");
        }

        const formData = new FormData();
        const image = await this.loadImageFromFileSystem(); // Load the image from the file system or any other source

        console.log("Image MIME type:", image.type); // Log the MIME type to the console

        const text_prompt: string = this.clickedButtons
          .join(", ")
          .concat(", ", " Montreux Jazz festival poster");
        console.log("prompt:", text_prompt); // Log the MIME type to the console

        formData.append("init_image", image);
        formData.append("init_image_mode", "IMAGE_STRENGTH");
        formData.append("image_strength", "0.35");
        formData.append("text_prompts[0][text]", text_prompt);
        formData.append("cfg_scale", "7");
        formData.append("clip_guidance_preset", "FAST_BLUE");
        formData.append("samples", "4");
        formData.append("steps", "30");

        const response = await fetch(
          `${apiHost}/v1/generation/${engineId}/image-to-image`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const responseJSON = await response.json();
        const artifacts = responseJSON.artifacts;

        artifacts.forEach((image: { base64: string }) => {
          this.imageURLs.push(
            "data:image/jpeg;base64,".concat(" ", image.base64 as string)
          );
          //this.$router.push({ path: '/results', query: { image: image.base64 } });
        });
      } catch (error) {
        console.error(error);
        // Handle the error as needed (e.g., display an error message)
      }
    },

    async loadImageFromFileSystem() {
      const response = await fetch("/src/assets/68.jpeg");
      const blob = await response.blob();
      const mimeType = "image/jpeg"; // Specify the correct MIME type here
      return new File([blob], "68.jpeg", { type: mimeType });
    },
  },
});

/*
    saveImageToFileSystem(base64: string, fileName: string) {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" }); // Adjust the MIME type if necessary
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url); // Clean up the object URL
    },
*/

</script>
