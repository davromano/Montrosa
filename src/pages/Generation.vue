<template>
  <div v-if="!showImages" class="flex items-center justify-center">
    <p class="text-white -mt-24 font-ttnorms text-lg">
      “Just choose a poster and I can show you what I am capable of!” Montrosa
    </p>
  </div>

  <div v-if="!showImages" class="flex items-center justify-center flex-grow">
    <div class="flex justify-center items-center">
      <div class="flex flex-col items-center ml-24">
        <img src="src/assets/68_re.jpeg" class="w-96 auto" />
        <h2 class="text-white text-3xl mt-3">1968</h2>
        <h3 class="text-white text-2xl">Robert Bornand</h3>
      </div>
      <div class="flex-col justify-center flex items-center">
        <div class="flex-col justify-center item-center ml-24">
          <p class="text-white text-2xl mb-4" style="font-family: 'rebelton'">
            Styles
          </p>
          <div class="content-start h-56 grid grid-cols-3 gap-6">
            <Keyword
              v-for="word in styles"
              :key="word"
              :word="word"
              @click="handleButtonClick(word)"
            />
          </div>
          <p class="text-white text-2xl mb-4" style="font-family: 'rebelton'">
            Key elements
          </p>
          <div class="content-start h-56 grid grid-cols-3 gap-6">
            <Keyword
              v-for="word in key_elements"
              :key="word"
              :word="word"
              @click="handleButtonClick(word)"
            />
          </div>
        </div>
        <button
          @click="performAPICall"
          :disabled="disabledState"
          class="text-black text-3xl rounded py-6 px-24 bg-montreux-yellow hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          style="font-family: 'rebelton'"
        >
          Generate
        </button>
      </div>
      <div class="inline-flex flex-col items-center w-24 ml-6">
        <p class="text-white max-w-sm mb-48 text-center" style="font-family: 'tt-norms'">Creativity</p>
        <div class="transform -rotate-90">
          <Slider v-model="sliderValue" />
        </div>
        <p class="text-white max-w-sm mt-48" style="font-family: 'tt-norms'">{{ sliderValue }}</p>
      </div>
    </div>
  </div>
  <div
    v-if="showImages"
    class="text-white flex-col items-center justify-center -mt-16"
  >
    <div class="flex justify-center">
      <div class="flex-col items-center text-center">
        <h3 class="text-white text-2xl mb-3" style="font-family: 'tt-norms'">
          Robert Bornand
        </h3>
        <img src="src/assets/68_re.jpeg" class="w-96 auto" />
      </div>
      <div
        v-if="receivedImages"
        class="flex flex-col ml-24 justify-center items-center text-center"
      >
        <h3 class="text-white text-2xl mb-3" style="font-family: 'tt-norms'">
          Montrosa's Tributes
        </h3>
        <div class="flex-col">
          <div class="content-start grid grid-cols-2 gap-4">
            <div v-for="image in imageURLs" :key="image">
              <img
                :src="image"
                alt="Fetched Image"
                class="w-48 auto hover:w-96 hover:auto transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!receivedImages"
        class="flex flex-col ml-24 justify-center items-center text-center"
      >
        <p class="text-white -mt-10 font-ttnorms text-xl">
          Montrosa is creating...
        </p>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        :disabled="!receivedImages"
        @click="changePrompt()"
        class="text-black text-3xl rounded py-4 px-20 bg-montreux-yellow hover:bg-yellow-400 text-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        style="font-family: 'rebelton'"
      >
        Change prompt
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Keyword from "../components/Keyword.vue";
import Slider from "../components/Slider.vue";

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
      disabledState: true,
      receivedImages: false,
      sliderValue: 0.35,
    };
  },
  components: {
    Keyword,
    Slider,
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

      this.disabledState = this.clickedButtons.length === 0 ? true : false;
    },

    async performAPICall() {
      try {
        this.showImages = true;
        const engineId = "stable-diffusion-xl-beta-v2-2-2";
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

        this.receivedImages = true;
        artifacts.forEach((image: { base64: string }) => {
          this.imageURLs.push(
            "data:image/jpeg;base64,".concat(" ", image.base64 as string)
          );
        });
      } catch (error) {
        console.error(error);
        // Handle the error as needed (e.g., display an error message)
      }
    },

    async loadImageFromFileSystem() {
      const response = await fetch("/src/assets/68_re.jpeg");
      const blob = await response.blob();
      const mimeType = "image/jpeg"; // Specify the correct MIME type here
      return new File([blob], "68_re.jpeg", { type: mimeType });
    },

    changePrompt() {
      this.showImages = !this.showImages;
      this.clickedButtons = [];
    },
  },
});
</script>

<style>
@import "./../assets/fonts.css";
</style>
