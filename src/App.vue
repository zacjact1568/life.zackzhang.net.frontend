<script setup lang="ts">
import { inject } from "vue";

const site_name = inject("site_name");
</script>

<template>
  <header>
    <div class="container">
      <a href="https://life.zackzhang.net/">
        <img src="/portrait.png" alt="Portrait" />
        <span>{{ site_name }}</span>
      </a>
      <div>
        <a href="https://life.zackzhang.net/music/">
          <font-awesome-icon icon="fa-solid fa-music" />
        </a>
        <RouterLink to="/photo">
          <font-awesome-icon icon="fa-solid fa-camera" />
        </RouterLink>
        <RouterLink to="/about">
          <font-awesome-icon icon="fa-solid fa-user" />
        </RouterLink>
      </div>
    </div>
  </header>
  <div class="container">
    <RouterView />
  </div>
  <footer>
    <div class="container">
      &copy; 2017-{{ new Date().getFullYear() }} {{ site_name }}
    </div>
  </footer>
</template>

<style scoped>
.container {
  width: 760px;
  margin: 0 auto;
}

header {
  margin-bottom: 40px;
  border-bottom: 1px solid var(--color-divider);
}

header > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 26px;
  padding-bottom: 26px;
}

header > div > a {
  display: flex;
  justify-content: center;
  align-items: center;
}

header > div > a > img {
  width: 30px;
  border: 2px solid var(--color-10);
  border-radius: 15px;
}

header > div > a > img:hover {
  border-color: var(--color-20);
}

header > div > a > span {
  margin-left: 8px;
  font-family: "Source Han Sans SC", "Noto Sans SC", "PingFang SC",
    "Microsoft YaHei", sans-serif;
  font-size: 24px;
  font-weight: bold;
  transform: translateY(-2px);
}

header > div > div > a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  font-size: 18px;
}

footer {
  margin-top: 64px;
  border-top: 1px solid var(--color-divider);
}

footer > div {
  padding-top: 10px;
  padding-bottom: 48px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-30);
}

@media (max-width: 1199px) {
  .container {
    width: 640px;
  }
}

@media (max-width: 991px) {
  .container {
    width: 600px;
  }
}

@media (max-width: 767px) {
  .container {
    width: 540px;
  }
}

@media (max-width: 575px) {
  .container {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
