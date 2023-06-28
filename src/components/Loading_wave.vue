<template>
  <div class="loader">
  </div>
</template>

<style scoped>
.loader {
  margin: 40px;
  border: 20px solid #000000;
  border-radius: 50%;
  border-top: 20px solid #fffe53;
  width: 200px;
  height: 200px;
  animation: spinner 4s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
