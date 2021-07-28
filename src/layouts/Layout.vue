<template>
    <div :class="layout">
        <slot />
    </div>
</template>

<script lang="ts">
// vue utils

// eslint-disable-next-line no-unused-vars
import { defineComponent, reactive, ref, markRaw, computed, defineAsyncComponent, watch, Component } from 'vue';
// composables
import store from '@/composables/store';

export default defineComponent({
    name: 'Layout',
    setup() {
        const { state: { currentLayout }, getCurrentVars } = store();
        const layout = ref(currentLayout);
        return {
            layout,
            getCurrentVars

        };
    },
});
</script>

<style lang="scss">
.screen{
    background: v-bind('getCurrentVars.screenAndToggleBackground');
}
.button{
    background: v-bind('getCurrentVars.keyMainBcg');
}
.button-equal{
    background: v-bind('getCurrentVars.equalBcg');
}
.toggle-slider {
    background: v-bind('getCurrentVars.screenAndToggleBackground');
}
.toggle-dot {
    background: v-bind('getCurrentVars.equalBcg');
}
</style>
