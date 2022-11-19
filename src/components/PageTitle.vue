<template>
  <div id="title">
    <div id="zh">{{ titleZh }}</div>
    <div id="decoration" :style="decoration"></div>
    <div id="en">{{ titleEn }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  // 对象形式声明 props，可用于类型校验
  titleZh: String,
  titleEn: String,
  decorationWidth: Number,
  decorationColor: String,
});

const decoration = computed(() => {
  return {
    width: props.decorationWidth + "px",
    // 装饰条的颜色由服务端下发
    backgroundColor: props.decorationColor,
  };
});
</script>

<style scoped>
#title {
  margin-bottom: 32px;
  text-align: center;
}

#title > #zh {
  font-family: "Source Han Sans SC", "Noto Sans SC", serif;
  font-size: 22px;
  font-weight: bold;
}

#title > #decoration {
  height: 5px;
  margin: 2px auto;
  border-radius: 3px;
}

#title > #en {
  font-family: "Barlow Semi Condensed", "Roboto Condensed", serif;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
