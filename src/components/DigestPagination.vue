<template>
  <div id="pagination">
    <a v-if="first" href="?page=1"><span>1</span></a>
    <template v-if="former.length > 0">
      <span v-if="formerMore">...</span>
      <a v-for="page in former" :key="page" :href="'?page=' + page">
        <span>{{ page }}</span>
      </a>
    </template>
    <a :href="'?page=' + current" id="current">
      <span>{{ current }}</span>
    </a>
    <template v-if="latter.length > 0">
      <a v-for="page in latter" :key="page" :href="'?page=' + page">
        <span>{{ page }}</span>
      </a>
      <span v-if="latterMore">...</span>
    </template>
    <a v-if="last" :href="'?page=' + total">
      <span>{{ total }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { convertRouteNumberQuery } from "@/router/utils";

defineProps({
  current: Number,
  total: Number,
  former: Array,
  latter: Array,
  formerMore: Boolean,
  latterMore: Boolean,
  first: Boolean,
  last: Boolean,
});

const emit = defineEmits({
  // 对象语法定义 emit，可对触发事件的参数进行验证
  turnTo(page: number | undefined) {
    // 返回值为 true/false 判断验证是否通过
    if (typeof page == "number") {
      // TODO 想办法引用到 props 以判断不超过最大页数
      // 因为 defineEmits 是定义在 setup 作用域之外的
      // https://stackoverflow.com/q/69951687
      return page > 0;
    }
    return true;
  },
});

const route = useRoute();

watch(
  () => route.query.page,
  (page) => {
    const p = convertRouteNumberQuery(page);
    console.log("Route query from watch: page = " + p);
    // 向上级组件发射翻页事件
    emit("turnTo", p);
  }
);
</script>

<style scoped>
#pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

#pagination > a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  margin: 0 6px;
  border-radius: 6px;
  background-color: var(--color-10);
  padding: 2px 8px;
}

#pagination > a:hover {
  background-color: var(--color-20);
  text-decoration: none;
}

#pagination span {
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-text-80);
}

#pagination > #current {
  background-color: var(--color-80);
}

#pagination > #current:hover {
  background-color: var(--color-70);
}

#pagination > #current > span {
  font-weight: bold;
  color: var(--color-text-reverse-80);
}

#pagination > span {
  margin: 0 6px;
}
</style>
