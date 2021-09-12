/* eslint-disable no-unused-vars */
<template>
    <Layout>
        <div id="calculator">
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller @key-value="inputInterceptor" />
        </div>
    </Layout>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { reactive, ref, defineComponent, markRaw, computed, watch, Component } from 'vue';

// layouts
import Layout from '@/layouts/Layout.vue';

// components
import Controller from './components/Controller.vue';
import Toggle from './components/Toggle.vue';
import Screen from './components/Screen.vue';

// types
import { IButton, TValue } from './types';

export default defineComponent({
    name: 'App',
    components: {
        Layout,
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
        };
    },

});
</script>

<style lang="scss">
    @import '@/assets/styles/main.scss';
    #app {
        font-family: 'Spartan';
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        #calculator {
            max-height: 85vh;
            height: auto;
            margin:auto;
            border-radius: $mainRadius;
            max-width: 520px;
        }
    }
</style>
