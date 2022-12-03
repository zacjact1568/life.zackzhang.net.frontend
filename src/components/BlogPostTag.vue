<template>
  <div id="tags" :style="tagsStyle">
    <div v-for="tag in tags" :key="tag">{{ tag }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  tags: Array,
  marginTop: Number,
});

const tagsStyle = computed(() => {
  return {
    marginTop: props.marginTop + "px",
  };
});
</script>

<style scoped>
#tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

#tags > div {
  margin-right: 4px;
  padding: 2px 8px;
  font-size: 12px;
  color: var(--color-text-40);
  border-radius: 11px;
  background-color: var(--color-10);
}

#tags > div::before {
  content: "# ";
}
</style>
