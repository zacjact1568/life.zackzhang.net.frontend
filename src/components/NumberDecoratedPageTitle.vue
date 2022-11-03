<template>
  <div id="title">
    <span :style="decoration">{{ number }}</span>
    <div>
      <div id="zh">{{ titleZh }}</div>
      <div id="en">{{ titleEn }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  number: Number,
  titleZh: String,
  titleEn: String,
  color: String,
});

// 装饰条的颜色由服务端下发
const decoration = computed(() => {
  return { color: props.color };
});
</script>

<style scoped>
#title {
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#title > span {
  margin-right: 8px;
  font-family: "Barlow", "Helvetica Neue", "Arial", "Roboto", sans-serif;
  font-weight: 500;
  font-size: 40px;
}

#title #zh {
  font-family: "Source Han Sans SC", "Noto Sans SC", serif;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
}

#title #en {
  font-family: "Barlow Semi Condensed", "Roboto Condensed", serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 16px;
}
</style>
