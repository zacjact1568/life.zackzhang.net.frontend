import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 本地开发环境服务器配置
  server: {
    proxy: {
      // 请求转发到 Django 本地开发服务器，解决跨域问题
      "/api": "http://127.0.0.1:8000",
    },
  },
});
