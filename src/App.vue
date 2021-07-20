/* eslint-disable no-unused-vars */
<template>
    <component :is="layout"
               :id="layout"
    >
        <div id="calculator">
            <Toggle />
            <Screen :number="currScreenValue" />
            {{ layout }}
            <Controller @key-value="inputInterceptor" />
        </div>
    </component>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { reactive, ref, defineComponent, markRaw, computed, defineAsyncComponent, watch, Component } from 'vue';
import store from '@/composables/store';

// components
import Controller from './components/Controller.vue';
import Toggle from './components/Toggle.vue';
import Screen from './components/Screen.vue';

// types
import { IButton, TValue } from './types';

export default defineComponent({
    name: 'App',
    components: {
        Toggle,
        Screen,
        Controller,
    },
    setup() {
        let allValuesArr = reactive<TValue[]>([]);
        let accumulatedValue = ref<string | number | null>('');
        let currScreenValue = ref<string | number | null>('');
        let operator = ref<null | TValue>(null);
        let wasOperatorSelected = ref<boolean>(!!operator.value);
        const { state: { currentLayout } } = store();
        let layout = reactive(currentLayout);

        watch(currentLayout, async (newVal:string) => {
            const val = await import(`@/layouts/${newVal}.vue`);
            layout = val.default;
        }, { immediate: true });

        const inputInterceptor = (btnValue: IButton) => {
            const input = ref<IButton>(btnValue);
            inputHandler(input.value);
        };
        const inputHandler = (input: IButton) => {
            const inputValue = input.altValue ?? input.value;
            const inputType = input.type;
            const inputName = input.name;
            switch (true) {
            case inputType === 'operator':
                operatorHandler(inputValue);
                break;
            case inputType === 'function':
                functionHandler(inputName);
                break;
            case inputType === 'number' && wasOperatorSelected.value:
                // eslint-disable-next-line no-eval
                accumulatedValue.value = eval(`${accumulatedValue.value} ${operator.value} ${Number(inputValue)}`);
                // eslint-disable-next-line no-eval
                currScreenValue.value = inputValue;
                allValuesArr = [];
                wasOperatorSelected.value = false;
                break;
            default:
                allValuesArr.push(inputValue);
                currScreenValue.value = allValuesArr.join('');
                accumulatedValue.value = currScreenValue.value;
            }
        };

        const operatorHandler = (currOperator: TValue) => {
            wasOperatorSelected.value = true;
            accumulatedValue.value = accumulatedValue.value ?? Number(currScreenValue.value);
            currScreenValue.value = accumulatedValue.value;
            operator.value = currOperator;
        };

        const functionHandler = (currFunction: string) => {
            switch (currFunction) {
            case 'del':
                allValuesArr.pop();
                currScreenValue.value = allValuesArr.join('');
                break;
            case 'reset':
                reset();
                break;
            default:
                currScreenValue.value = null;
            }
        };

        function reset() {
            allValuesArr = [];
            accumulatedValue.value = '';
            currScreenValue.value = '';
            operator.value = null;
            wasOperatorSelected.value = !!operator.value;
        }

        return {
            inputInterceptor,
            currScreenValue,
            layout,
        };
    },
});
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
            max-height: 85vh;
            position: absolute;
            height: auto;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: $mainRadius;
        }
    }
</style>
