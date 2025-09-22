<template>
  <!-- Blue Vertical Trim on Left Side, Hidden on Cover -->
  <!-- <div v-if="$nav.currentLayout !== 'cover'" class="absolute top-0 left-0 w-12 h-full" style="background-color: #00A9E0;"></div> -->
  <!-- SVG Logo in Top-Right Corner, Hidden on Cover -->
  <div class="absolute top-0 right-0 p-4">
    <img src="./images/logo_fiit.svg" alt="Logo" class="h-8 w-auto" />
  </div>

  <!-- Slide Numbers in Bottom-Right, Hidden on Cover -->
  <footer v-if="$nav.currentLayout !== 'cover'" class="absolute bottom-0 right-0 p-2">
    <small>
      <SlideCurrentNo /> / <SlidesTotal />
    </small>
  </footer>
</template>

<style scoped>
footer small {
  color: #888;
  font-size: 0.8rem;
}
img {
  max-height: 32px; /* Adjust logo size */
  opacity: 0.8; /* Slight transparency */
}
</style>