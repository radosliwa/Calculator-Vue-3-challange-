<template>
    <div class="min-h-screen min-w-screen flex justify-center items-center bg-[var(--primary)]">
        <slot />
    </div>
</template>

<script setup lang="ts">
// vue utils
import { ComputedRef, ref, watch } from 'vue';
// composables
import { useLayout } from '@/composables/store';

const { currentLayout, getCurrentVars } = useLayout();
const layout = ref(currentLayout);
watch(currentLayout, () => {
    document.body.className = currentLayout.value;
}, { immediate: true });
</script>

<style lang="scss">
#screen {
    background: v-bind('getCurrentVars.screenBackground');
    color: v-bind('getCurrentVars.textScreen');
}

.button {
    color: v-bind('getCurrentVars.keyMainCol');
    background: v-bind('getCurrentVars.keyMainBcg');
    &-del,
    &-reset {
        background: v-bind('getCurrentVars.keyDelBcg');
        color: v-bind('getCurrentVars.keyDelCol');
    }
}

.button-equal {
    background: v-bind('getCurrentVars.keyEqualBcg');
    color: v-bind('getCurrentVars.keyEqualCol');

}

#controller {
    background: v-bind('getCurrentVars.keypadBackground');
}

.toggle{
    color: v-bind('getCurrentVars.textToggle');
}

.toggle-slider {
    background: v-bind('getCurrentVars.toggleBackground');
}

.toggle-dot {
    background: v-bind('getCurrentVars.keyEqualBcg');
}

</style>
