import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMusic,
  faCamera,
  faUser,
  faCameraRetro,
  faEnvelope,
  faLaptopCode,
  faMicrochip,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faAndroid } from "@fortawesome/free-brands-svg-icons";

library.add(
  faMusic,
  faCamera,
  faUser,
  faCameraRetro,
  faEnvelope,
  faLaptopCode,
  faMicrochip,
  faUserSecret,
  faGithub,
  faAndroid
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
// 用依赖注入的方式添加全局变量
app.provide("site_name", "随机存取记忆体");

app.mount("#app");
