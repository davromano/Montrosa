<template>
  <div>
    <button @click="performAPICall">Call API</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    async performAPICall() {
      try {
        const engineId = "stable-diffusion-v1-5";
        const apiHost = "https://api.stability.ai";
        const apiKey = "sk-xXYOiGr6P3qRpbzrg8OJ6iOmHESwgctxMej4UewnZ1B722vE";

        if (!apiKey) {
          throw new Error("Missing Stability API key.");
        }

        const textPrompts = [
          {
            text: "A lighthouse on a cliff",
            weight: 0.5,
          },
        ];

        const formData = new FormData();
        const image = await this.loadImageFromFileSystem(); // Load the image from the file system or any other source

        console.log("Image MIME type:", image.type); // Log the MIME type to the console

        formData.append("init_image", image);
        formData.append("init_image_mode", "IMAGE_STRENGTH");
        formData.append("image_strength", "0.35");
        formData.append("text_prompts[0][text]", "Galactic dog wearing a cape");
        formData.append("cfg_scale", "7");
        formData.append("clip_guidance_preset", "FAST_BLUE");
        formData.append("samples", "1");
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

        artifacts.forEach((image: { base64: string }, index: number) => {
          this.saveImageToFileSystem(
            image.base64,
            `out/v1_img2img_${index}.png`
          );
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

    saveImageToFileSystem(base64: string, fileName: string) {
      const link = document.createElement("a");
      link.href = base64;
      link.download = fileName;
      link.click();
    },
  },
});
</script>
