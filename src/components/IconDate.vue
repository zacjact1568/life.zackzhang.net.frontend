<template>
  <div id="date" :style="dateStyle">
    <font-awesome-icon :icon="icon" />
    <time datetime="YYYY-MM-DD">{{ date }}</time>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  icon: String,
  date: String,
  marginTop: Number,
  marginRight: Number,
  alignEnd: Boolean,
});

const dateStyle = computed(() => {
  return {
    marginTop: props.marginTop + "px",
    marginRight: props.marginRight + "px",
    textAlign: props.alignEnd ? "end" : "start",
  };
});
</script>

<style scoped>
#date {
  font-family: "Barlow", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-50);
}

#date > time {
  margin-left: 4px;
}
</style>
