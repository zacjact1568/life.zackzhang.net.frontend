<template>
  <div v-if="ready">
    <template v-if="asSong !== undefined">
      <NumberDecoratedPageTitle
        :number="context.year.this"
        title-zh="音乐年度总结"
        title-en="Annual Summary on Music"
        :color="primaryColor"
      />
      <PageSectionTitle
        title-zh="年度歌曲"
        title-en="Song of this Year"
        :color="primaryColor"
      />
      <div id="as-song" class="info-cover-cell cell-background">
        <div id="as-song-info">
          <div class="title">{{ asSong.title }}</div>
          <div class="artist">{{ asSong.artist }}</div>
          <div class="lyric">{{ asSong.lyric }}</div>
          <a
            :href="asSong.link.apple_music"
            class="as-enjoy-link as-enjoy-link-apple-music"
          >
            <img src="/img/apple-music.svg" alt="Apple Music" />
          </a>
          <a
            :href="asSong.link.spotify"
            class="as-enjoy-link as-enjoy-link-spotify"
          >
            <img src="/img/spotify.svg" alt="Spotify" />
          </a>
          <a
            v-if="asSong.link.youtube !== undefined"
            :href="asSong.link.youtube"
            class="as-enjoy-link as-enjoy-link-youtube"
          >
            <img src="/img/youtube.svg" alt="YouTube" />
          </a>
        </div>
        <img
          :src="asSong.cover"
          :title="asSong.album"
          :alt="asSong.album"
          class="cover"
        />
      </div>
      <div v-if="asEssentials !== undefined">
        <PageSectionTitle
          title-zh="年度精选集"
          title-en="Essentials of this Year"
          :color="primaryColor"
        />
        <div id="as-essentials" class="dual-cell-block">
          <div
            v-for="essential in asEssentials.essentials"
            :key="essential.title"
          >
            <div class="info-cover-cell cell-background">
              <div class="as-essentials-info">
                <div class="track">{{ essential.track }}</div>
                <div class="title">{{ essential.title }}</div>
                <div class="artist">{{ essential.artist }}</div>
              </div>
              <img
                :src="essential.cover"
                :title="essential.album"
                :alt="essential.album"
                class="cover"
              />
            </div>
          </div>
        </div>
        <div id="as-essentials-link" class="cell-background">
          <div>Playlist Available On</div>
          <a
            :href="asEssentials.link.apple_music"
            class="as-enjoy-link as-enjoy-link-apple-music"
          >
            <img src="/img/apple-music.svg" alt="Apple Music" />
          </a>
          <a
            :href="asEssentials.link.spotify"
            class="as-enjoy-link as-enjoy-link-spotify"
          >
            <img src="/img/spotify.svg" alt="Spotify" />
          </a>
        </div>
      </div>
      <div v-if="context.blog_post !== undefined || hasOtherYears" id="as-more">
        <div v-if="context.blog_post !== undefined">
          <!-- TODO replace link -->
          <router-link to="/music" class="inline">
            {{ context.blog_post.text }}
          </router-link>
        </div>
        <span v-if="context.blog_post !== undefined && hasOtherYears">
          Or switch to
        </span>
        <div v-if="hasOtherYears" id="rn-more-other-years">
          <router-link
            v-for="year in context.year.others"
            :to="'/music?year=' + year"
            :key="year"
            class="year inline"
          >
            {{ year }}
          </router-link>
        </div>
      </div>
    </template>
    <template v-else>
      <div id="as-empty">你来到了 {{ context.year.this }} 年的一片荒原😛</div>
      <div v-if="hasOtherYears" id="as-more">
        <span>Switch to</span>
        <div id="rn-more-other-years">
          <router-link
            v-for="year in context.year.others"
            :to="'/music?year=' + year"
            :key="year"
            class="year inline"
          >
            {{ year }}
          </router-link>
        </div>
      </div>
    </template>
    <template v-if="recentNotes.length > 0">
      <PageSectionTitle
        title-zh="最近听歌记录"
        title-en="Recent Notes"
        :color="primaryColor"
      />
      <div id="rn-songs" class="dual-cell-block">
        <div v-for="note in recentNotes" :key="note.title">
          <div class="info-cover-cell cell-background">
            <div class="rn-songs-info">
              <div class="title">{{ note.title }}</div>
              <div class="artist">{{ note.artist }}</div>
            </div>
            <img
              :src="note.cover"
              :title="note.album"
              :alt="note.album"
              class="cover"
            />
          </div>
        </div>
      </div>
      <!-- TODO replace link -->
      <router-link
        to="/music"
        id="rn-more"
        :style="{
          background:
            'linear-gradient(to right, ' +
            context.color.secondary +
            ', ' +
            primaryColor +
            ')',
        }"
      >
        <span>And More...</span>
      </router-link>
    </template>
  </div>
  <div v-else>
    <!-- TODO 加载失败 -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import NumberDecoratedPageTitle from "../components/NumberDecoratedPageTitle.vue";
import PageSectionTitle from "../components/PageSectionTitle.vue";

// 数据是否加载完成
const ready = ref(false);

// 服务端返回的数据结构
const context = ref({
  year: {
    this: undefined,
    others: [],
  },
  color: {
    primary: undefined,
    secondary: undefined,
  },
  song_of_this_year: {
    title: undefined,
    artist: undefined,
    album: undefined,
    cover: undefined,
    lyric: undefined,
    link: {
      apple_music: undefined,
      spotify: undefined,
      youtube: undefined,
    },
  },
  essentials_of_this_year: {
    essentials: [
      {
        title: undefined,
        artist: undefined,
        album: undefined,
        cover: undefined,
        track: undefined,
      },
    ],
    link: {
      apple_music: undefined,
      spotify: undefined,
    },
  },
  blog_post: {
    text: undefined,
    link: undefined,
  },
  recent_notes: [
    {
      title: undefined,
      artist: undefined,
      album: undefined,
      cover: undefined,
    },
  ],
});

const hasOtherYears = computed(() => context.value.year.others.length > 0);

const primaryColor = computed(() => context.value.color.primary);

const asSong = computed(() => context.value.song_of_this_year);

const asEssentials = computed(() => context.value.essentials_of_this_year);

const recentNotes = computed(() => context.value.recent_notes);

const route = useRoute();

function convertRouteQueryYear(year: any) {
  let y = undefined;
  if (typeof year == "string") {
    let yn = Number(year);
    if (!isNaN(yn)) {
      y = yn;
    }
  }
  return y;
}

function requestData(year: number | undefined) {
  console.log("requestData: year = " + year);
  axios
    .get("/api/music/main", {
      params: {
        // year 是 undefined 的话就不会带这个参数
        year: year,
      },
    })
    .then((value) => {
      context.value = value.data;
      ready.value = true;
    });
}

onMounted(() => {
  // 初始化组件时从路由拿到 year 参数
  // 适用于从其他页面跳转过来，以及在网址栏输入的链接
  let y = convertRouteQueryYear(route.query.year);
  console.log("Route query from onMounted: year = " + y);
  requestData(y);
});

watch(
  () => route.query.year,
  (year) => {
    // 路由 year 参数变化时拿到的值
    // 适用于从本页面跳转到自身，只是 year 参数不同
    let y = convertRouteQueryYear(year);
    console.log("Route query from watch: year = " + y);
    requestData(y);
  }
);
</script>

<style scoped>
/*
 Prefixes:
 as = annual summary
 rn = recent notes
 */

/* --- AS Song --- */

.info-cover-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cell-background {
  border-radius: 12px;
  background-color: var(--color-2);
}

.info-cover-cell .title {
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-cover-cell .artist {
  margin-top: 3px;
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: 500;
  color: var(--color-text-50);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-cover-cell .cover {
  border-radius: 8px;
}

#as-song {
  padding: 32px;
}

#as-song > #as-song-info {
  max-width: 74%;
}

#as-song .title {
  font-size: 32px;
}

#as-song .artist {
  font-size: 18px;
}

#as-song .lyric {
  margin-top: 13px;
  font-family: "Lora", "Source Han Serif SC", "Noto Serif SC", serif;
  font-style: italic;
  font-size: 14px;
  color: var(--color-text-40);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#as-song .lyric::before {
  content: "“";
}

#as-song .lyric::after {
  content: "”";
}

.as-enjoy-link {
  position: relative;
  display: inline-block;
  width: 72px;
  height: 26px;
  border-radius: 13px;
}

#as-song .as-enjoy-link {
  margin-top: 18px;
  margin-right: 8px;
}

.as-enjoy-link-apple-music {
  background-color: #eb3256;
}

.as-enjoy-link-spotify {
  background-color: #1db954;
}

.as-enjoy-link-youtube {
  background-color: #ff0000;
}

.as-enjoy-link:hover {
  filter: saturate(80%);
  text-decoration: none;
}

.as-enjoy-link > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
}

#as-song > .cover {
  width: 160px;
}

/* --- AS Essentials & RN Songs --- */

.dual-cell-block {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.dual-cell-block > div {
  flex-basis: 50%;
  max-width: 50%;
  padding: 8px;
}

.dual-cell-block .info-cover-cell {
  padding: 16px 16px 16px 20px;
}

#as-essentials .as-essentials-info {
  max-width: 72%;
}

#rn-songs .rn-songs-info {
  max-width: 76%;
}

#as-essentials .track {
  margin-bottom: 5px;
  font-family: "Barlow Semi Condensed", "Roboto Condensed", "Arial", sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: var(--color-text-30);
  text-transform: uppercase;
}

#as-essentials .title {
  font-size: 20px;
}

#rn-songs .title {
  font-size: 18px;
}

#as-essentials .artist {
  font-size: 14px;
}

#rn-songs .artist {
  font-size: 13px;
}

#as-essentials .cover {
  width: 80px;
}

#rn-songs .cover {
  width: 64px;
}

#as-essentials-link {
  margin-top: 16px;
  padding: 14px;
  text-align: center;
}

#as-essentials-link > div {
  font-family: "Barlow Semi Condensed", "Roboto Condensed", serif;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
}

#as-essentials-link .as-enjoy-link {
  margin: 10px 4px 0;
}

/* --- AS More --- */

#as-more {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
  font-size: 12px;
}

#as-more > span,
#as-more .year {
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
}

#as-more > span {
  margin-left: 10px;
  margin-right: 4px;
}

#as-more .year {
  margin-left: 6px;
  padding-bottom: 2px;
}

#rn-more-other-years {
  line-height: 16px;
}

/* --- AS Empty --- */

#as-empty {
  margin: 60px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

/* --- RN More --- */

#rn-more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 16px;
  text-align: center;
  border-radius: 12px;
}

#rn-more:hover {
  filter: saturate(80%);
  text-decoration: none;
}

#rn-more > span {
  font-family: "Barlow Semi Condensed", "Roboto Condensed", serif;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
}

@media (max-width: 1199px) {
  #as-song > #as-song-info {
    max-width: 70%;
  }

  #as-essentials .as-essentials-info {
    max-width: 68%;
  }

  #rn-songs .rn-songs-info {
    max-width: 74%;
  }
}

@media (max-width: 991px) {
  #as-song .title {
    font-size: 26px;
  }

  #as-song .artist {
    font-size: 16px;
  }

  #as-song .lyric {
    font-size: 13px;
  }

  #as-song > .cover {
    width: 148px;
  }

  #as-essentials .track {
    font-size: 14px;
  }

  #as-essentials .title {
    font-size: 18px;
  }

  #rn-songs .title {
    font-size: 17px;
  }

  #as-essentials .artist {
    font-size: 13px;
  }

  #as-essentials .cover {
    width: 68px;
  }
}

@media (max-width: 767px) {
  #as-song > #as-song-info {
    max-width: 66%;
  }

  #as-song > .cover {
    width: 140px;
  }

  .dual-cell-block > div {
    flex-basis: 100%;
    max-width: 100%;
  }

  #as-essentials .as-essentials-info {
    max-width: 84%;
  }

  #rn-songs .rn-songs-info {
    max-width: 85%;
  }
}

@media (max-width: 575px) {
  #as-song {
    flex-direction: column-reverse;
    flex-wrap: wrap;
  }

  #as-song > #as-song-info {
    flex-basis: 100%;
    max-width: 100%;
  }

  #as-song-info {
    margin-top: 12px;
    text-align: center;
  }

  #as-song .title {
    font-size: 28px;
  }

  #as-song .artist {
    font-size: 17px;
  }

  #as-song .as-enjoy-link {
    margin-left: 4px;
    margin-right: 4px;
  }

  #as-song > .cover {
    width: 200px;
  }

  #as-essentials .as-essentials-info {
    max-width: 76%;
  }

  #rn-songs .rn-songs-info {
    max-width: 78%;
  }
}

@media (max-width: 400px) {
  #as-song .title {
    font-size: 24px;
  }

  #as-song .artist {
    font-size: 14px;
  }

  #as-song .lyric {
    font-size: 12px;
  }

  #as-song .as-enjoy-link {
    margin-left: 2px;
    margin-right: 2px;
  }

  #as-song > .cover {
    width: 180px;
  }

  #as-essentials .as-essentials-info {
    max-width: 70%;
  }

  #rn-songs .rn-songs-info {
    max-width: 72%;
  }

  #as-more {
    flex-wrap: wrap;
    text-align: center;
  }

  #as-more > * {
    flex-basis: 100%;
  }

  #as-more > span {
    margin: 12px 0;
  }

  #as-more .year {
    margin-left: 3px;
    margin-right: 3px;
  }
}

/* The minimum supported width is 320px */
</style>
