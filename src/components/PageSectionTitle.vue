<template>
  <div id="section">
    <div id="decoration" :style="decoration"></div>
    <div id="zh">{{ titleZh }}</div>
    <div id="en">{{ titleEn }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  titleZh: String,
  titleEn: String,
  color: String,
});

// 装饰条的颜色由服务端下发
const decoration = computed(() => {
  return { backgroundColor: props.color };
});
</script>

<style scoped>
#section {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 7px;
  margin: 32px 0 16px 2px;
}

#section > #decoration {
  grid-row-start: 1;
  grid-row-end: 3;
  width: 5px;
}

#section > #zh {
  font-family: "Source Han Sans SC", "Noto Sans SC", serif;
  font-size: 19px;
  font-weight: bold;
}

#section > #en {
  font-family: "Barlow Semi Condensed", "Roboto Condensed", serif;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
