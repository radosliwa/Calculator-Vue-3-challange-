<template>
    <div class="controller">
        <div
            v-for="(el, index) in config"
            :key="el + index"
            tabindex="0"
            role="button"
            :class="[`button button-${el.name}`, { active: el.value === currentValue }]"
            @click="clickHandler(el)"
        >
            {{ el.value }}
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

import { IButton } from '@/types';
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
        return {
            clickHandler,
            currentValue,
        };
    },
    emits: ['key-value'],
    data() {
        return {
            config, // 2
        };
    },
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
        background-color: $deviceBackground;
        margin-top: 1.5rem;
    }
</style>
