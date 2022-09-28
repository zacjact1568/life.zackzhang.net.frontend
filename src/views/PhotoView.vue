<template>
  <div id="pt-container">
    <div>
      <font-awesome-icon icon="fa-solid fa-camera-retro" />
    </div>
    <span>敬请期待🥰</span>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#pt-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 72vh;
  text-align: center;
  color: var(--color-text-diluted);
}

#pt-container > div {
  font-size: 16vh;
}

#pt-container > span {
  font-size: 20px;
  font-weight: bold;
}
</style>
