<template>
    <div :class="['layout', layout]">
        <slot />
    </div>
</template>

<script lang="ts">
// vue utils
import { defineComponent, ref } from 'vue';
// composables
import store from '@/composables/store';

export default defineComponent({
    name: 'Layout',
    setup() {
        const {
            state: { currentLayout },
            getCurrentVars
        } = store();
        const layout = ref(currentLayout);
        return {
            layout,
            getCurrentVars
        };
    }
});
</script>

<style lang="scss">
.layout {
    background-color: v-bind('getCurrentVars.mainBackground');
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

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
