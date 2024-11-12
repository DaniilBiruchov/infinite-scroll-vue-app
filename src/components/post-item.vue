<script setup>
const { user } = defineProps({
  user: Object,
});

const textToClipboard = async (text) => {
  if (text) await navigator.clipboard.writeText(text);
};
</script>

<template>
  <div class="card">
    <img :src="user.picture.medium" />
    <div class="card__data">
      <div class="data__name">
        {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
      </div>
      <div
        :title="user.email"
        class="data__email"
        @click="textToClipboard(user.email)"
      >
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid grey;
  background: #557354;
  padding: 15px 15px 15px 25px;
  color: #ffffff;
  width: 350px;
  font-family: "Inter";
  margin-bottom: 10px;
  border-radius: 10px;
}

.card img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.card__data {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data__name {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}

.data__email {
  cursor: copy;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
