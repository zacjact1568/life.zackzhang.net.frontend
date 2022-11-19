<template>
  <div v-if="ready">
    <PageTitle
      title-zh="听歌记录"
      title-en="Song Notes"
      :decoration-width="108"
      :decoration-color="context.color"
    />
    <div id="updated-at">
      <font-awesome-icon icon="fa-solid fa-clock" />
      <time datetime="YYYY-MM-DD">{{ context.updated_at }}</time>
    </div>
    <div v-for="song in context.data" :key="song.title" class="song">
      <div class="info">
        <div class="title">{{ song.title }}</div>
        <div class="artists">
          <div class="artist">{{ song.artist_leading }}</div>
          <template v-if="hasFeaturingArtist(song)">
            <div class="featuring" title="Featuring">
              <div>Ft</div>
            </div>
            <div class="artist">{{ song.artist_featuring }}</div>
          </template>
        </div>
        <div v-if="song.genres.length > 0" class="genres">
          <div>
            <div
              v-for="genre in song.genres"
              :key="genre.name"
              :title="genre.name_zh_cn"
            >
              {{ genre.name }}
            </div>
          </div>
        </div>
      </div>
      <img
        :src="song.cover"
        :title="song.album"
        :alt="song.album"
        class="cover"
      />
    </div>
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
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import PageTitle from "../components/PageTitle.vue";
import DigestPagination from "../components/DigestPagination.vue";
import { convertRouteNumberQuery } from "@/router/utils";

// 数据是否加载完成
const ready = ref(false);

// 服务端返回的数据结构
const context = ref({
  data: [
    {
      title: undefined,
      artist_leading: undefined,
      artist_featuring: undefined,
      album: undefined,
      cover: undefined,
      genres: [
        {
          name: undefined,
          name_zh_cn: undefined,
        },
      ],
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
  updated_at: undefined,
  color: undefined,
});

const paging = computed(() => context.value.paging);

const route = useRoute();

function hasFeaturingArtist(song: any) {
  const af = song.artist_featuring;
  return af !== undefined && af.length > 0;
}

function requestData(page: number | undefined) {
  console.log("requestData: page = " + page);
  axios
    .get("/api/music/song/notes", {
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
#updated-at {
  text-align: end;
  margin-right: 10px;
  font-family: "Barlow", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-50);
}

#updated-at > time {
  margin-left: 4px;
}

/* --- Note Item --- */

.song {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  border-radius: 12px;
  padding: 20px 20px 20px 24px;
  background-color: var(--color-3);
}

.song > .info {
  max-width: 85%;
}

.song .title {
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: bold;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song .artists {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 4px;
}

.song .artist {
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: var(--color-text-50);
}

.song .artists .featuring {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin: 0 6px;
  border-radius: 4px;
  background-color: var(--color-10);
}

.song .artists .featuring > div {
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-40);
  transform: scale(0.8);
}

.song .genres {
  margin-top: 12px;
}

.song .genres > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: -4px;
}

.song .genres > div > div {
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-40);
  border-radius: 4px;
  background-color: var(--color-10);
  margin: 4px;
  padding: 2px 8px;
}

.song .cover {
  width: 90px;
  border-radius: 8px;
}

@media (max-width: 1199px) {
  .song > .info {
    max-width: 82%;
  }
}

@media (max-width: 991px) {
  .song > .info {
    max-width: 80%;
  }
}

@media (max-width: 767px) {
  .song > .info {
    max-width: 78%;
  }
}

@media (max-width: 575px) {
  .song > .info {
    max-width: 72%;
  }

  .song .cover {
    width: 80px;
  }

  .song .title {
    font-size: 16px;
  }

  .song .artist {
    font-size: 13px;
  }
}

@media (max-width: 400px) {
  .song > .info {
    max-width: 66%;
  }
}

/* The minimum supported width is 320px */
</style>
