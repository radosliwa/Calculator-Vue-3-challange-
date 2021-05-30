<template>
    <component :is="layout">
        <div id="calculator">
            <Toggle />
            <Screen />
            <Controller />
        </div>
    </component>
</template>

<script>
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
    #calculator {
        position: absolute;
        width: 30vw;
        height: auto;
        background-color: $deviceBackground;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
