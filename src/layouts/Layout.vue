<template>
    <div class="min-h-screen min-w-screen flex justify-center items-center bg-[var(--mainBackground)]">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useLayout } from '@/composables/store';

const { currentLayout, getCurrentVars } = useLayout();

watch(currentLayout, () => {
    document.body.className = currentLayout.value;
}, { immediate: true });

</script>

<style lang="scss">
#screen {
    // background: v-bind('getCurrentVars.screenBackground');
    color: v-bind('getCurrentVars.textScreen');
}

.button {
    // color: v-bind('getCurrentVars.keyMainColor');
    // background: v-bind('getCurrentVars.keyMainBcg');

    &-del,
    &-reset {
        // background: v-bind('getCurrentVars.keyDelBcg');
        // color: v-bind('getCurrentVars.keyMainColor');
    }
}

.button-equal {
    // background: v-bind('getCurrentVars.keyEqualBcg');
    color: v-bind('getCurrentVars.keyEqualColor');
}

.toggle {
    color: v-bind('getCurrentVars.textToggle');
}

.toggle-dot {
    // background: v-bind('getCurrentVars.keyEqualBcg');
}
</style>
