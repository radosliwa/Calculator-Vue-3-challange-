/* eslint-disable no-unused-vars */
<template>
    <component :is="layout">
        <div id="calculator">
            <Toggle />
            <Screen :number="currScreenValue" />
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
        let allValuesArr = reactive([]);
        let accumulatedValue = ref(null);
        let currScreenValue = ref('');
        let operator = ref(null);
        let wasOperatorSelected = ref(operator.value);

        function reset() {
            allValuesArr = reactive([]);
            accumulatedValue.value = null;
            currScreenValue.value = '';
            operator.value = null;
            wasOperatorSelected.value = operator.value;
        }

        const interceptor = (btnValue) => {
            const input = ref(btnValue);
            const inputValue = input.value.altValue ?? input.value.value;
            if (input.value.type === 'operator') {
                operatorHandler(input.value);
                wasOperatorSelected.value = true;
                return;
            }
            if (input.value.type === 'function') {
                functionHandler(input.value);
                return;
            }
            if (wasOperatorSelected.value && input.value.type === 'number') {
                // eslint-disable-next-line no-eval
                accumulatedValue.value = eval(`${accumulatedValue.value} ${operator.value} ${Number(inputValue)}`);
                // eslint-disable-next-line no-eval
                currScreenValue.value = accumulatedValue.value;
                allValuesArr = [];
                operatorHandler(input.value, true);
            }
            if ((input.value.type === 'number' || input.value.name === 'dot') && !wasOperatorSelected.value) {
                allValuesArr.push(inputValue);
                currScreenValue.value = allValuesArr.join('');
            }
            console.log('operator value ', operator.value);
            console.log('accumulatedVal ', accumulatedValue.value);
            console.log('allValuesArr ', allValuesArr);
            console.log('currScreenValue ', currScreenValue.value);
        };
        const functionHandler = (currFunction) => {
            switch (currFunction.name) {
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
        const operatorHandler = (currOperator) => {
            console.log('CURR OPERATOR ', currOperator);
            accumulatedValue.value = accumulatedValue.value ?? Number(currScreenValue.value);
            currScreenValue.value = accumulatedValue.value;
            operator.value = currOperator.value;
        };
        return {
            interceptor,
            currScreenValue,
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
