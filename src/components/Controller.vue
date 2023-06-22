<template>
  <div id="controller" class="grid grid-cols-4 grid-rows-1 gap-6 p-5 mt-6 rounded-md bg-[var(--keypadBackground)]">
    <div v-for="(el, index) in config" :key="index" tabindex="0" role="button" :class="[
      `button ${el.name} ${setButtonClasses(el.name)}`, { active: setButtonState(el) }]" @click="clickHandler(el)">
      {{ el.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from "vue";
import { useLayout } from "@/composables/store";
import { IButton } from "@/types";
import { config } from "../buttonsConfig";

const emit = defineEmits(["key-selected"]);
const { currentLayout } = useLayout();
const currentValue = ref<null | IButton>(null);

const setButtonClasses = (name) => {
  switch (name) {
    case "del":
      return "bg-[var(--keyDelBcg)] text-[var(--keyDelColor)]";
    case "reset":
      return "bg-[var(--keyResetBcg)] text-[var(--keyResetColor)]";
    case "equal":
      return "bg-[var(--keyEqualBcg)] text-[var(--keyEqualColor)]";
    default:
      return "bg-[var(--keyMainBcg)] text-[var(--keyMainColor)]";
  }
};

const clickHandler = (val: IButton) => {
  if (val.name === "reset") {
    setTimeout(() => {
      currentValue.value = null;
    }, 300);
  }
  emit("key-selected", val);
};

const setButtonState = (btn: IButton): boolean =>
  currentValue?.value ? btn.value === currentValue.value.value : false;

</script>
