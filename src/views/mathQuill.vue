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
    <div class="editor"></div>
    <div class="math-render">{{ mathHtml }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const mathInstance = ref(null);
const menuList = ref([
  {
    label: "DELTA",
    value: "\\Delta",
  },
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
    value: "+1",
  },
  {
    label: "-",
    value: "-1",
  },
]);

const mathHtml = ref("");

const handleClick = ({ value }) => {
  mathInstance.value.cmd(value);
};

onMounted(() => {
  const answerSpan = document.querySelector(".editor");
  mathInstance.value = MQ.MathField(answerSpan, {
    handlers: {
      edit: function () {
        const enteredMath = mathInstance.value.latex(); // Get entered math in LaTeX format
        mathHtml.value = enteredMath;
      },
    },
  });
});
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 500px;
}
.math-render {
  margin: 40px auto;
  width: 500px;
  height: 500px;
  color: black;
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
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

.latex-text {
  margin: 0 auto;
  margin-top: 30px;
  display: block;
  width: 90%;
  height: 300px;
  border: 1px solid rgb(206, 212, 218);
  background-color: rgba(0, 0, 0, 0);
}

.editor {
  margin: 10px 0;
  width: 400px;
  height: 50px;
  border: 1px dashed #ccc;
}
</style>
