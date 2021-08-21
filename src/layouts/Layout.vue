<template>
    <div :class="['layout', layout]">
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
.screen {
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
}

.controller {
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

.layout{
    background-color: v-bind('getCurrentVars.mainBackground');
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.layout1 {
    .button {
        &:hover:not(.active) {
            box-shadow: 0px 8px 0px rgba(52, 65, 99, 1);
        }
        &.active {
            transform: scale(0.95);
            box-shadow: 0px 5px 0px rgba(25, 25, 25, 0.5);
        }
        box-shadow: 0px 5px 0px rgba(64, 78, 114, 0.6);
        &-equal {
            box-shadow: 0px 5px 0px hsl(6, 70%, 34%);
            &:hover:not(.active) {
                box-shadow: 0px 8px 0px hsl(6, 70%, 34%);
            }
        }
    }
}

.layout2 {
    .button {
        box-shadow: 0px 5px 0px rgb(27, 95, 101);
        &:hover:not(.active) {
            box-shadow: 0px 8px 0px rgb(27, 95, 101);
            // A69D91
        }
        &-equal {
            box-shadow: 0px 5px 0px rgb(137, 57, 1);
            &:hover:not(.active) {
                box-shadow: 0px 8px 0px rgb(137, 57, 1);
            }
        }
    }
}

.layout3 {
    .button {
        box-shadow: 0px 5px 0px rgb(135, 28, 156);
        &:hover:not(.active) {
            box-shadow: 0px 8px 0px rgb(135, 28, 156);
            // A69D91
        }
        &-equal {
            box-shadow: 0px 5px 0px rgb(137, 57, 1);
            &:hover:not(.active) {
                box-shadow: 0px 8px 0px rgb(137, 57, 1);
            }
        }
    }
}
</style>
