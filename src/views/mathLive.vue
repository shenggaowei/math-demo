<template>
  <div class="container">
    <div class="menu-list">
      <div
        class="menu-item"
        @click="() => handleClick(item)"
        v-for="(item, index) in menuList"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
    <textarea
      class="latex-text"
      v-model="mathHtml"
      @mouseout="onTextAreaMouseout"
    />
    <math-field class="math-editor">{{ mathHtml }}</math-field>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mathHtml = ref("\\frac{-b\\pm\\sqrt{{b}^{2}-4ac}}{2a4}");

const menuList = ref([
  {
    label: "frac",
    value: "\\frac{}{}",
  },
  {
    label: "sum",
    value: "\\sum_{}^{}",
  },
  {
    label: "+",
    value: "+",
  },
  {
    label: "-",
    value: "-",
  },
]);

const handleClick = ({ value }) => {
  console.log(value);
};
</script>

<style scoped>
.container {
  width: 500px;
}
.menu-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
}

.menu-item {
  cursor: pointer;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin-right: 10px;
  text-align: center;
  border: 1px solid #ccc;
  cursor: pointer;
}

.math-editor {
  width: 90%;
  height: 300px;
}

.latex-text {
  margin: 10px auto;
  margin-top: 30px;
  display: block;
  width: 90%;
  height: 100px;
  border: 1px solid rgb(206, 212, 218);
  background-color: rgba(0, 0, 0, 0);
}
</style>
