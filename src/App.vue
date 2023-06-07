<script setup>
import { ref } from "vue";
import mathPage from "./views/math.vue";
import matchLivePage from "./views/mathLive.vue";

const pageList = ref([
  {
    label: "编辑latex",
    value: mathPage,
  },
  {
    label: "编辑公式",
    value: matchLivePage,
  },
]);

const componentName = ref(mathPage);

const handleClick = (value) => {
  componentName.value = value;
};
</script>

<template>
  <div class="page-container">
    <div class="button-group">
      <div
        class="button"
        @click="() => handleClick(item.value)"
        v-for="(item, index) in pageList"
      >
        {{ item.label }}
      </div>
    </div>
    <component :is="componentName" />
  </div>
</template>

<style scoped>
.page-container {
  height: 100vh;
}
.button-group {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.button {
  background: #ccc;
  margin: 0 10px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>
