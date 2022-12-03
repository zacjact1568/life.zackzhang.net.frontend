import { createRouter, createWebHistory } from "vue-router";
import BlogMainView from "../views/BlogMainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: BlogMainView,
    },
    {
      path: "/post/:label",
      name: "post",
      component: () => import("../views/BlogPostView.vue"),
    },
    {
      path: "/music",
      name: "music",
      component: () => import("../views/MusicMainView.vue"),
      meta: {
        title: "音乐",
      },
    },
    {
      path: "/music/song/notes",
      name: "music_song_notes",
      component: () => import("../views/MusicSongNotesView.vue"),
      meta: {
        title: "听歌记录",
      },
    },
    {
      path: "/photo",
      name: "photo",
      component: () => import("../views/PhotoView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: {
        title: "关于",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title;
  document.title = (title ? title + " - " : "") + "随机存取记忆体";
  next();
});

export default router;
