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
    <mathlive-mathfield
      @on-input="onInput"
      :value="latex"
      ref="mathRef"
    ></mathlive-mathfield>
    <div class="latex-text">{{ latex }}</div>
    <div class="latex-text">{{ mathJson }}</div>
  </div>
</template>

<script setup type="module">
import mathliveMathfield from "../components/mathlive-mathfield.vue";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import { symbols } from "../utils/const";
import { ref } from "vue";

const latex = ref("");
const mathRef = ref(null);
const mathJson = ref([]);

const ce = new ComputeEngine();

const menuList = ref(symbols);

const handleClick = ({ value }) => {
  mathRef.value.insert(value);
};

const onInput = (value) => {
  latex.value = value;
  mathJson.value = transformLatex2MathJson(value);
};

const transformLatex2MathJson = (latex) => {
  const expr = ce.parse(latex, { canonical: true });
  splitFormula(expr.json);
  return expr.json;
};

const splitFormula = (expr, deps) => {};
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

.menu-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}

.menu-item {
  cursor: pointer;
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #ccc;
  cursor: pointer;
}

@media not (pointer: coarse) {
  math-field::part(virtual-keyboard-toggle) {
    display: none;
  }
}
</style>
