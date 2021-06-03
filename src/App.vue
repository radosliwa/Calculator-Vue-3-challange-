/* eslint-disable no-unused-vars */
<template>
    <component :is="layout">
        <div id="calculator">
            <Toggle />
            <Screen :number="currValue" />
            <Controller @key-value="interceptor" />
        </div>
    </component>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref } from 'vue';
import Controller from './components/Controller.vue';
import Toggle from './components/Toggle.vue';
import Screen from './components/Screen.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

export default {
    name: 'App',
    components: {
        DefaultLayout,
        Toggle,
        Screen,
        Controller,
    },
    setup() {
        const accumulator = reactive([]);
        let currValue = ref(null);
        const interceptor = (input) => {
            accumulator.push(input);
            currValue.value = accumulator.join('');
        };
        console.log('CURR VALUE ', currValue);
        return {
            interceptor,
            currValue,
        };
    },
    data() {
        return {
            layout: 'DefaultLayout',
        };
    },
};
</script>

<style lang="scss">
@import './assets/styles/main.scss';
#app {
    font-family: 'Spartan';
    background: $mainBackground;
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
    #calculator {
        position: absolute;
        height: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: $mainRadius;
    }
}
</style>
