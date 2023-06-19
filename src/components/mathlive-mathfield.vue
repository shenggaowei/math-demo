<template>
  <math-field ref="mathfieldRef" style="width: 300px; height: 100px">
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
  return mathfieldRef.value.hasFocus();
};
const focus = () => {
  mathfieldRef.value.focus();
};
const blur = () => {
  mathfieldRef.value.blur();
};
const getValue = (format) => {
  return mathfieldRef.value.getValue(format);
};
const insert = (text, options) => {
  mathfieldRef.value.insert(text, options);
};

const select = () => {
  mathfieldRef.value.select();
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
