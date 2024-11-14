<script setup>
import PostItem from "@/components/post-item.vue";

import { fetchUsers } from "@/api";

import { onBeforeUnmount, onMounted, ref } from "vue";

const users = ref([]);
const loader = ref(null);
const loading = ref(false);
let currentPage = 1;

const getUsers = async () => {
  loading.value = true;
  const data = await fetchUsers(currentPage);
  users.value.push(...data);
  currentPage += 1;
  loading.value = false;

  if (loader.value) observer.observe(loader.value);
};

const throttle = (func, delay) => {
  let lastCall = 0;

  return function () {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func();
  };
};

const throttledGetUsers = throttle(getUsers, 250);

const observer = new IntersectionObserver(([entries]) => {
  if (entries.isIntersecting && !loading.value) throttledGetUsers();
});

onMounted(async () => {
  await throttledGetUsers();
  if (loader.value) observer.observe(loader.value);
});

onBeforeUnmount(() => {
  if (loader.value) observer.unobserve(loader.value);
});
</script>

<template>
  <header>Count posts: {{ users.length }}</header>
  <main>
    <div v-for="user in users" :key="user.id">
      <PostItem :user="user" />
    </div>
    <div ref="loader">Loading...</div>
  </main>
</template>

<style scoped>
header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background: #e5e5e5;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
}

@font-face {
  font-family: "Inter";
  src: local("Inter-Regular"),
    url("@/assets/fonts/Inter-Regular.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  font-display: block;
}

@font-face {
  font-family: "Inter";
  src: local("Inter-Medium"),
    url("@/assets/fonts/Inter-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  font-display: block;
}

@font-face {
  font-family: "Inter";
  src: local("Inter-Bold"),
    url("@/assets/fonts/Inter-Bold.woff2") format("woff2");
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  font-display: block;
}
</style>
