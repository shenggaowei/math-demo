<template>
  <div class="container">
    <div style="position: relative" id="myKeyboardContainer"></div>
    <math-field class="math-editor">{{ mathHtml }}</math-field>
    <textarea
      disabled
      class="latex-text"
      v-model="mathHtml"
      @mouseout="onTextAreaMouseout"
    />
    <div class="math-json">{{ mathJson }}</div>
  </div>
</template>

<script setup type="module">
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import { ref, onMounted } from "vue";

const defaultLatex = "\\Delta C_{ACTUAL,t}-\\Delta C_{BSL,t}-LK_{t}";
const ce = new ComputeEngine();

const transformLatex2MathJson = (latex) => {
  const expr = ce.parse(latex).canonical;
  return expr.json;
};

const mathHtml = ref(defaultLatex);
const mathJson = ref(transformLatex2MathJson(defaultLatex));

const init = () => {
  const oEditor = document.querySelector(".math-editor");

  const oKeyboard = document.getElementById("myKeyboardContainer");

  oEditor.mathVirtualKeyboardPolicy = "manual";

  mathVirtualKeyboard.show();

  mathVirtualKeyboard.container = oKeyboard;

  mathVirtualKeyboard.layouts = {
    rows: [
      [
        "+",
        "-",
        "\\times",
        "\\frac{#@}{#?}",
        "=",
        "(",
        ")",
        "\\sqrt{#0}",
        "#@^{#?}",
        "\\sum_{a}^{b}",
      ],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ],
  };
  oEditor.addEventListener("input", (ev) => {
    mathHtml.value = oEditor.value;
    mathJson.value = transformLatex2MathJson(oEditor.value);
  });
};

onMounted(() => {
  init();
});
</script>

<style>
.container {
  width: 500px;
  position: relative;
}

.math-editor {
  width: 90%;
  height: 300px;
}

.latex-text {
  margin: 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  width: 100%;
  height: 60px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
}

#myKeyboardContainer {
  width: 500px;
  height: 150px;
  margin-bottom: 30px;
  position: relative;
}

.math-editor .ML__virtual-keyboard-toggle {
  display: none !important;
}

#myKeyboardContainer > div .MLK__toolbar {
  display: none;
}
</style>
