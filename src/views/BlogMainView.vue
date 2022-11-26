<template>
  <div v-if="ready">
    <div id="top-space"></div>
    <div v-for="post in context.data" :key="post.link" class="post-item">
      <a :href="post.link">{{ post.title }}</a>
      <div class="date">
        <font-awesome-icon icon="fa-solid fa-calendar-day" />
        <time datetime="YYYY-MM-DD">{{ post.created_at }}</time>
      </div>
      <div v-html="post.excerpt" class="excerpt inline-inside"></div>
      <div v-if="post.images.length > 0" class="images">
        <img
          v-for="image in post.images"
          :key="image.link"
          :src="image.link"
          :title="image.description"
          :alt="image.description"
        />
      </div>
      <div v-if="post.tags.length > 0" class="tags">
        <div v-for="tag in post.tags" :key="tag">{{ tag }}</div>
      </div>
    </div>
    <!-- TODO paging.digest 是条件表达式？-->
    <DigestPagination
      v-if="paging.digest"
      :current="paging.current"
      :total="paging.total"
      v-bind="paging.digest"
      @turn-to="requestData"
    />
  </div>
  <div v-else>
    <!-- TODO 加载失败 -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import DigestPagination from "../components/DigestPagination.vue";
import { convertRouteNumberQuery } from "@/router/utils";

// 数据是否加载完成
const ready = ref(false);

// 服务端返回的数据结构
const context = ref({
  data: [
    {
      title: undefined,
      excerpt: undefined,
      created_at: undefined,
      link: undefined,
      images: [
        {
          link: undefined,
          description: undefined,
        },
      ],
      tags: [],
    },
  ],
  paging: {
    digest: {
      former: [],
      latter: [],
      former_more: false,
      latter_more: false,
      first: false,
      last: false,
    },
    current: 0,
    total: 0,
    count: 0,
    previous: null,
    next: null,
  },
});

const paging = computed(() => context.value.paging);

const route = useRoute();

function requestData(page: number | undefined) {
  console.log("requestData: page = " + page);
  axios
    .get("/api/blog/main", {
      params: {
        page: page,
      },
    })
    .then((value) => {
      context.value = value.data;
      ready.value = true;
    });
}

onMounted(() => {
  const p = convertRouteNumberQuery(route.query.page);
  console.log("Route query from onMounted: page = " + p);
  requestData(p);
});
</script>

<style scoped>
#top-space {
  height: 1px;
}

.post-item {
  margin-top: 40px;
}

.post-item > a {
  font-size: 24px;
  font-weight: 500;
}

.post-item > .date {
  margin-top: 0.5rem;
  font-family: "Barlow", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-50);
}

.post-item > .date > time {
  margin-left: 4px;
}

.post-item > .excerpt {
  margin-top: 1rem;
  line-height: 1.8;
  font-size: 14px;
  color: var(--color-text-60);
}

.images {
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-gap: 10px;
  margin-top: 1rem;
}

.images > img {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 1rem;
}

.tags > div {
  margin-right: 4px;
  padding: 2px 8px;
  font-size: 12px;
  color: var(--color-text-40);
  border-radius: 11px;
  background-color: var(--color-10);
}

.tags > div::before {
  content: "# ";
}

@media (max-width: 991px) {
  .images {
    grid-template-columns: repeat(4, 120px);
    grid-gap: 8px;
  }

  .images > img {
    width: 120px;
    height: 80px;
  }
}

@media (max-width: 575px) {
  #top-space {
    display: none;
  }

  .images {
    grid-template-columns: repeat(2, 150px);
    grid-gap: 10px;
  }

  .images > img {
    width: 150px;
    height: 100px;
  }
}

/* The minimum supported width is 340~350px */
</style>
