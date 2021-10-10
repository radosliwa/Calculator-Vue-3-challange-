<template>
    <div class="controller">
        <div
            v-for="(el, index) in config"
            :key="el + index"
            tabindex="0"
            role="button"
            :class="[`button button--${currentLayout} button-${el.name} `, { active: setButtonState(el)}]"
            @click="clickHandler(el)"
        >
            {{ el.value }}
        </div>
        <!-- <p>{{ currentValue?.value ?? null }}</p> -->
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
// composables
import store from '@/composables/store';
// types
import { IButton } from '@/types';
// helpers
import { config } from '../buttonsConfig';

export default defineComponent({
    name: 'Controller',
    setup(props, { emit }) {
        let currentValue = ref<null | IButton>(null);
        const clickHandler = (val: IButton) => {
            currentValue.value = val;
            if (val.name === 'reset') {
                setTimeout(() => {
                    currentValue.value = null;
                }, 300);
            }
            emit('key-value', currentValue);
        };
        const setButtonState = (btn: IButton) : boolean => (currentValue?.value ? btn.value === currentValue.value.value : false);
        const {
            state: { currentLayout }
        } = store();
        return {
            setButtonState,
            clickHandler,
            currentValue,
            currentLayout,
            config
        };
    },
    emits: ['key-value']
});
</script>

<style lang="scss">
.controller {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    padding: 1.25rem;
    border-radius: $mainRadius;
    column-gap: 1rem;
    row-gap: 1rem;
    margin-top: 1.5rem;
}
</style>
