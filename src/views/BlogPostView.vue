<template>
  <div v-if="ready">
    <div id="top-space"></div>
    <div id="title">{{ context.title }}</div>
    <IconDate
      icon="fa-solid fa-calendar-day"
      :date="context.created_at"
      :margin-top="12"
      :margin-right="10"
      :align-end="true"
    />
    <div v-html="context.content" id="content" class="inline-inside"></div>
    <BlogPostTag
      v-if="context.tags.length > 0"
      :tags="context.tags"
      :margin-top="30"
    />
  </div>
  <div v-else>
    <!-- TODO 加载失败 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import IconDate from "../components/IconDate.vue";
import BlogPostTag from "../components/BlogPostTag.vue";

// 数据是否加载完成
const ready = ref(false);

// 服务端返回的数据结构
const context = ref({
  title: undefined,
  content: undefined,
  created_at: undefined,
  tags: [],
});

const route = useRoute();

function updateTitle(title: string | undefined) {
  if (typeof title != "string") return;
  document.title = title + " - " + document.title;
}

onMounted(() => {
  axios.get("/api/blog/post/" + route.params.label).then((value) => {
    context.value = value.data;
    ready.value = true;
    updateTitle(context.value.title);
  });
});
</script>

<style scoped>
#top-space {
  height: 1px;
}

#title {
  margin-top: 40px;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
}

#content {
  margin-top: 60px;
  color: var(--color-text-60);
  font-size: 14px;
  line-height: 1.8;
}
</style>

<style>
/*
 v-html 不会处理 scoped，需要自行处理
 */

#content h1,
#content h2,
#content h3,
#content h4,
#content h5,
#content h6 {
  margin: 16px 0 10px;
  font-weight: bold;
}

#content h1 {
  font-size: 1.5rem;
}

#content h2 {
  font-size: 1.4rem;
}

#content h3 {
  font-size: 1.3rem;
}

#content h4 {
  font-size: 1.2rem;
}

#content h5 {
  font-size: 1.1rem;
}

#content h6 {
  font-size: 1rem;
}

#content p {
  margin-bottom: 10px;
  letter-spacing: 0.01em;
}

#content blockquote {
  font-size: 14px;
  padding: 10px 15px;
  border-left: 4px solid var(--color-10);
  background-color: var(--color-5);
  margin-bottom: 10px;
}

#content blockquote p {
  margin-bottom: 0;
}

#content ul {
  margin-bottom: 10px;
}

#content table {
  border-spacing: 1px;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  border: 1px solid var(--color-15);
}

#content table > thead > tr > th,
#content table > tbody > tr > th,
#content table > tfoot > tr > th,
#content table > thead > tr > td,
#content table > tbody > tr > td,
#content table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.5;
  vertical-align: top;
  border: 1px solid var(--color-15);
}

#content table > thead > tr > th,
#content table > thead > tr > td {
  vertical-align: bottom;
  border-bottom: 2px solid var(--color-15);
  text-align: center;
}

#content code {
  color: var(--color-text-80);
  padding: 2px 4px;
}

#content pre {
  padding: 9px;
  margin-bottom: 0.6rem;
  line-height: 1.5;
}

#content code,
#content pre {
  background-color: var(--color-5);
  border-radius: 6px;
}

#content code,
#content pre span {
  font-family: "JetBrains Mono", "Fira Code", "Menlo", "Consolas", "Roboto Mono",
    "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC",
    monospace;
}

#content img {
  max-width: 100%;
  margin: 1rem auto;
  display: block;
  padding: 2px;
  border: 1px solid var(--color-5);
}

.codehilite .hll {
  background-color: #ffffcc;
}

/* Comment */
.codehilite .c,
/* Comment.Multiline */
.codehilite .cm,
/* Comment.Single */
.codehilite .c1,
/* Comment.Special */
.codehilite .cs {
  color: #8e908c;
}

/* Comment.Preproc */
.codehilite .cp,
.codehilite .cpf,
/* Keyword */
.codehilite .k,
/* Keyword.Type */
.codehilite .kt {
  color: #8959a8;
}

/* Error */
.codehilite .err {
  color: #a61717;
  background-color: #e3d2d2;
}

.codehilite .n,
/* Operator */
.codehilite .o {
  color: #4d4d4c;
}

/* Generic.Deleted */
.codehilite .gd {
  color: #000000;
  background-color: #ffdddd;
}

/* Generic.Emph */
.codehilite .ge,
/* Keyword.Constant */
.codehilite .kc,
/* Keyword.Declaration */
.codehilite .kd,
/* Keyword.Namespace */
.codehilite .kn,
/* Keyword.Pseudo */
.codehilite .kp,
/* Keyword.Reserved */
.codehilite .kr,
/* Operator.Word */
.codehilite .ow {
  color: #000000;
}

/* Name.Attribute */
.codehilite .na,
/* Name.Variable */
.codehilite .nv,
/* Name.Variable.Class */
.codehilite .vc,
/* Name.Variable.Global */
.codehilite .vg,
/* Name.Variable.Instance */
.codehilite .vi {
  color: #008080;
}

/* Generic.Error */
.codehilite .gr,
/* Generic.Traceback */
.codehilite .gt {
  color: #aa0000;
}

/* Generic.Heading */
.codehilite .gh,
/* Name.Builtin.Pseudo */
.codehilite .bp {
  color: #999999;
}

/* Generic.Output */
.codehilite .go {
  color: #888888;
}

/* Generic.Inserted */
.codehilite .gi {
  color: #000000;
  background-color: #ddffdd;
}

/* Generic.Prompt */
.codehilite .gp,
/* Name.Namespace */
.codehilite .nn {
  color: #555555;
}

/* Generic.Strong */
.codehilite .gs {
  font-weight: bold;
}

/* Generic.Subheading */
.codehilite .gu {
  color: #aaaaaa;
}

/* Name.Class */
.codehilite .nc {
  color: #445588;
}

/* Name.Constant */
.codehilite .no {
  color: #008080;
}

/* Name.Decorator */
.codehilite .nd {
  color: #3c5d5d;
}

/* Name.Entity */
.codehilite .ni {
  color: #800080;
}

/* Name.Builtin */
.codehilite .nb,
/* Name.Exception */
.codehilite .ne,
/* Name.Function */
.codehilite .nf,
/* Name.Label */
.codehilite .nl {
  color: #f5871f;
}

/* Name.Tag */
.codehilite .nt {
  color: #000080;
}

/* Text.Whitespace */
.codehilite .w {
  color: #bbbbbb;
}

/* Literal.Number */
.codehilite .m,
/* Literal.Number.Float */
.codehilite .mf,
/* Literal.Number.Hex */
.codehilite .mh,
/* Literal.Number.Integer */
.codehilite .mi,
/* Literal.Number.Oct */
.codehilite .mo,
/* Literal.Number.Integer.Long */
.codehilite .il,
/* Literal.String */
.codehilite .s,
/* Literal.String.Single */
.codehilite .s1,
/* Literal.String.Backtick */
.codehilite .sb,
/* Literal.String.Char */
.codehilite .sc,
/* Literal.String.Doc */
.codehilite .sd,
/* Literal.String.Double */
.codehilite .s2,
/* Literal.String.Escape */
.codehilite .se,
/* Literal.String.Heredoc */
.codehilite .sh,
/* Literal.String.Interpol */
.codehilite .si,
/* Literal.String.Other */
.codehilite .sx {
  color: #3e999f;
}

/* Literal.String.Regex */
.codehilite .sr {
  color: #009926;
}

/* Literal.String.Symbol */
.codehilite .ss {
  color: #990073;
}

@media (max-width: 575px) {
  #top-space {
    display: none;
  }
}
</style>
