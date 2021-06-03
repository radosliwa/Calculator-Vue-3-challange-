<template>
    <div class="buttons">
        <div v-for="(el, index) in config"
             :key="el + index"
             tabindex="0"
             role="button"
             :class="[`button button-${el.value}`, {'active':el.value===currentValue}]"
             @click="clickHandler(el.value)"
        >
            {{ el.value }}
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { config } from './Buttons/buttonsConfig';

export default {
    name: 'Controller',
    setup(props, context) {
        let currentValue = ref(null);
        const clickHandler = (val) => {
            currentValue.value = val;
            context.emit('key-value', val);
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
};
</script>

<style lang="scss">
</style>
