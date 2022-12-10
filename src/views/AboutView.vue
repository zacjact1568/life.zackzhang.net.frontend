<template>
  <div v-if="ready">
    <PageTitle
      title-zh="关于"
      title-en="About"
      :decoration-width="68"
      :decoration-color="photo.color"
    />
    <div id="motto">
      <a :href="motto.link" :title="motto.description">
        {{ motto.content }}
      </a>
    </div>
    <div id="photo">
      <img
        src="/images/back.jpg"
        :alt="photo.title"
        :title="photo.title"
        class="photo"
      />
      <div class="info">
        <div class="primary">
          <div class="title">{{ photo.title }}</div>
          <div>{{ photo.location }}</div>
          <div>{{ photo.date }}</div>
        </div>
        <div class="secondary">
          <font-awesome-icon icon="fa-solid fa-camera-retro" />
          <div>
            {{ photo.camera }} / {{ photo.lens }}<br />Photo by
            {{ photo.photographer }}
          </div>
        </div>
      </div>
    </div>
    <PageSectionTitle
      title-zh="简介"
      title-en="Introduction"
      :color="photo.color"
    />
    <div
      v-if="context.introduction !== undefined"
      v-html="context.introduction"
      id="introduction"
    ></div>
    <div id="link">
      <a href="mailto:zxjue@outlook.com" class="email">
        <font-awesome-icon icon="fa-solid fa-envelope" />
        <span>电子邮件</span>
      </a>
      <a href="https://code.zackzhang.net" class="code-website">
        <font-awesome-icon icon="fa-solid fa-laptop-code" />
        <span>Code 网站</span>
      </a>
    </div>
    <div id="site-name">
      <font-awesome-icon icon="fa-solid fa-microchip" />
      <span>
        随机存取记忆体（Random Access
        Memory，RAM），或称随机访问存储器，一类计算机存储元件，拥有快速访问其内任一存储单元的特性，常见于电子设备的内存。
      </span>
    </div>
    <PageSectionTitle
      title-zh="本站"
      title-en="This Site"
      :color="photo.color"
    />
    <div id="supporters">
      <a href="https://www.djangoproject.com" class="django">
        <img src="/images/django.svg" alt="Django" />
      </a>
      <a href="https://www.vultr.com/?ref=7260027" class="vultr">
        <img src="/images/vultr.svg" alt="Vultr" />
      </a>
      <span>
        使用 Django Web Framework 搭建，托管于 Vultr 美国 Los Angeles 机房。
      </span>
    </div>
    <div id="privacy" @click="onClickPrivacy">
      <font-awesome-icon icon="fa-solid fa-user-secret" />
      <div class="title">Privacy</div>
      <div class="content">
        本网站在代码层面上没有任何记录或分析访问数据的逻辑，即使服务器上存在日志，它们也不会以除排查问题之外的任何理由被查看，请放心浏览。
      </div>
      <a
        v-if="hasSourceCodeLink"
        v-show="showSourceCodeLink"
        :href="context.source_code_link"
        id="source-code-link"
      >
        <div>
          <font-awesome-icon icon="fa-brands fa-github" />
          <span>Review Source Code on GitHub</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import PageTitle from "../components/PageTitle.vue";
import PageSectionTitle from "../components/PageSectionTitle.vue";

// 数据是否加载完成
const ready = ref(false);

// 服务端返回的数据结构
const context = ref({
  motto: {
    content: undefined,
    link: undefined,
    description: undefined,
  },
  photo: {
    title: undefined,
    location: undefined,
    date: undefined,
    camera: undefined,
    lens: undefined,
    photographer: undefined,
    color: undefined,
  },
  introduction: undefined,
  source_code_link: undefined,
});

const motto = computed(() => context.value.motto);

const photo = computed(() => context.value.photo);

const hasSourceCodeLink = computed(
  () => context.value.source_code_link !== undefined
);

const showSourceCodeLink = ref(false);

// TODO 如何移除这个点击事件？
let count = 3;
function onClickPrivacy() {
  if (!hasSourceCodeLink.value) return;
  if (count === 0) {
    console.log("Source code link is on display");
    showSourceCodeLink.value = true;
  } else if (count > 0) {
    console.log("Counting down: " + count--);
  }
}

onMounted(() => {
  axios.get("/api/about/main").then((value) => {
    context.value = value.data;
    ready.value = true;
  });
});
</script>

<style scoped>
#motto {
  font-family: "Lora", "Source Han Serif SC", "Noto Serif SC", serif;
  font-style: italic;
  font-size: 14px;
  text-align: center;
  color: var(--color-text-40);
}

#motto::before {
  content: "“";
}

#motto::after {
  content: "”";
}

#motto > a {
  color: var(--color-text-40);
}

#motto > a:hover {
  color: var(--color-text-50);
  text-decoration: none;
  border-bottom: 1px solid var(--color-text-50);
}

#photo {
  margin-top: 32px;
}

#photo > .photo {
  width: 100%;
  border-radius: 8px 8px 0 0;
  vertical-align: middle;
}

#photo > .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-2);
  border-radius: 0 0 8px 8px;
  padding: 12px 16px;
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: 500;
}

#photo > .info > .primary {
  color: var(--color-text-50);
  font-size: 13px;
}

#photo > .info > .primary > .title {
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text);
}

#photo > .info > .secondary {
  margin-top: 2px;
  color: var(--color-text-30);
  font-size: 12px;
  text-align: end;
}

#photo > .info > .secondary > svg {
  font-size: 18px;
}

#introduction {
  font-size: 16px;
  color: var(--color-text);
}

#link {
  margin-top: 10px;
}

#link > a {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  width: 124px;
  height: 36px;
  padding: 10px 14px;
  border-radius: 12px;
  color: white;
}

#link > a:hover {
  filter: saturate(80%);
  text-decoration: none;
}

#link > .email {
  background-color: #f5a41f;
}

#link > .code-website {
  background-color: #f04358;
}

#link > a > svg {
  font-size: 14px;
}

#link > a > span {
  margin-left: 8px;
  font-size: 12px;
  text-transform: uppercase;
}

#site-name {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px 14px;
  background-color: var(--color-2);
  border-radius: 8px;
  color: var(--color-text-40);
}

#site-name > svg {
  font-size: 22px;
}

#site-name > span {
  margin-left: 10px;
  font-size: 12px;
}

#supporters {
  display: flex;
  flex-wrap: wrap;
}

#supporters > a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 28px;
  margin-right: 4px;
  border-radius: 16px;
}

#supporters > a:hover {
  filter: saturate(80%);
}

#supporters > .django {
  background-color: #0c3c26;
}

#supporters > .vultr {
  background-color: #142467;
}

#supporters > a > img {
  width: 40px;
}

#supporters > span {
  width: 100%;
  margin-top: 6px;
  font-size: 14px;
  color: var(--color-text);
}

#privacy {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background-color: var(--color-2);
}

#privacy > svg {
  color: var(--color-text-50);
  font-size: 13px;
}

#privacy > .title {
  margin-left: 4px;
  font-family: "Barlow", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: var(--color-text-50);
}

#privacy > .content {
  width: 100%;
  margin-top: 2px;
  font-size: 12px;
  color: var(--color-text-40);
  text-transform: uppercase;
}

#privacy > #source-code-link {
  margin-top: 4px;
  padding: 1px 0;
  border-radius: 6px;
  background-color: var(--color-5);
}

#privacy > #source-code-link:hover {
  background-color: var(--color-7);
  text-decoration: none;
}

#privacy > #source-code-link > div {
  transform: scale(0.8);
  font-size: 12px;
  color: var(--color-text-40);
}

#privacy > #source-code-link > div > span {
  margin-left: 4px;
  font-family: "Barlow Semi Condensed", "Roboto Condensed", serif;
  font-weight: 500;
  text-transform: uppercase;
}

@media (max-width: 575px) {
  #photo > .info {
    flex-direction: column;
    align-items: flex-start;
  }

  #photo > .info > .primary {
    display: grid;
    grid-column-gap: 6px;
    font-size: 12px;
  }

  #photo > .info > .primary > .title {
    grid-column-start: 1;
    grid-column-end: 3;
    margin-bottom: 2px;
    font-size: 17px;
  }

  #photo > .info > .secondary {
    display: grid;
    grid-template-columns: auto 1fr;
    margin-top: 6px;
    text-align: start;
  }

  #photo > .info > .secondary > svg {
    grid-row-start: 1;
    grid-row-end: 3;
    align-self: center;
    font-size: 15px;
  }

  #photo > .info > .secondary > div {
    line-height: 14px;
    transform: scale(0.9) translateX(-2px);
  }
}
</style>
