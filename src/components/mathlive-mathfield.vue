<template>
  <math-field ref="mathfieldRef">
    {{ value }}
  </math-field>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";

const emits = defineEmits(["onInput"]);

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

const mathfieldRef = ref(null);

watch(
  () => props.value,
  (newValue, _oldValue) => {
    const oldMathfieldValue = mathfieldRef.value.getValue();
    if (newValue !== oldMathfieldValue) {
      mathfieldRef.value.setValue(newValue, {
        suppressChangeNotifications: true,
      });
    }
  }
);

const hasFocus = () => {
  return mathfieldRef.value.executeCommand(["hasFocus"]);
};
const focus = () => {
  return mathfieldRef.value.executeCommand(["focus"]);
};
const blur = () => {
  return mathfieldRef.value.executeCommand(["blur"]);
};
const getValue = (format) => {
  return mathfieldRef.value.executeCommand(["getValue", format]);
};
const insert = (text) => {
  return mathfieldRef.value.executeCommand(["insert", text]);
};

const select = () => {
  return mathfieldRef.value.executeCommand(["select"]);
};

onMounted(() => {
  mathfieldRef.value.addEventListener("input", (event) => {
    emits("onInput", event.target.value);
  });
});

defineExpose({
  hasFocus,
  focus,
  blur,
  getValue,
  insert,
  select,
});
</script>

<style scoped>
math-field {
  min-width: 150px;
  font-size: 32px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  --caret-color: red;
  --selection-background-color: lightgoldenrodyellow;
  --selection-color: darkblue;
}
</style>
