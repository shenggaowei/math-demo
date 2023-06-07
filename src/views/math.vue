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
    <div class="math-render"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { stringSplice } from "../utils/str";

const cursorPosition = ref(0);
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

const mathHtml = ref("\\frac{-b\\pm\\sqrt{{b}^{2}-4ac}}{2a4}");

const onTextAreaMouseout = () => {
  const oTextArea = document.querySelector(".latex-text");
  cursorPosition.value = oTextArea.selectionStart;
  console.log("光标位置: " + cursorPosition.value);
};

const handleClick = ({ value }) => {
  const { result } = stringSplice(
    mathHtml.value,
    cursorPosition.value,
    0,
    value
  );
  mathHtml.value = result;
  console.log(result);
};

const generateMath = (val) => {
  const ele = document.querySelector(".math-render");
  let options = MathJax.getMetricsFor(ele, true);
  const html = MathJax.tex2svg(val, options);
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
  ele.appendChild(html);
};

watch(mathHtml, (val) => {
  generateMath(val);
});

onMounted(() => {
  generateMath(mathHtml.value);
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
</style>
