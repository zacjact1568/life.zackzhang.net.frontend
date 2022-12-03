<template>
  <div v-if="ready">
    <div id="top-space"></div>
    <div v-for="post in context.data" :key="post.label" class="post-item">
      <router-link :to="generatePostRouteParams(post.label)">
        {{ post.title }}
      </router-link>
      <IconDate
        icon="fa-solid fa-calendar-day"
        :date="post.created_at"
        :margin-top="8"
      />
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
      <BlogPostTag
        v-if="post.tags.length > 0"
        :tags="post.tags"
        :margin-top="16"
      />
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
import IconDate from "../components/IconDate.vue";
import BlogPostTag from "../components/BlogPostTag.vue";
import {
  convertRouteNumberQuery,
  generatePostRouteParams,
} from "@/router/utils";

// 数据是否加载完成
const ready = ref(false);

// 服务端返回的数据结构
const context = ref({
  data: [
    {
      title: undefined,
      label: undefined,
      excerpt: undefined,
      created_at: undefined,
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
