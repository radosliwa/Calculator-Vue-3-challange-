/* eslint-disable no-unused-vars */
<template>
    <Layout>
        <div id="calculator" class="relative flex h-auto max-h-[85vh]
             w-auto max-w-[520px] flex-col justify-center rounded-md">
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller @key-value="inputHandler" />
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Controller from './components/Controller.vue';
import Toggle from './components/Toggle.vue';
import Screen from './components/Screen.vue';
import { IButton, TValue } from './types';

const allValuesArr = ref<TValue[]>([]);
const accumulatedValue = ref<string | number | null>('');
const currScreenValue = ref<string | number>('');
const operator = ref<null | TValue>(null);
const wasOperatorSelected = ref<boolean>(!!operator.value);

const inputHandler = (input: IButton) => {
    console.log('input handler: ', input);

    const inputValue = input.altValue ?? input.value;
    const inputType = input.type;
    const inputName = input.name;
    switch (inputType) {
        case 'operator':
            operatorHandler(inputValue);
            break;
        case 'function':
            functionHandler(inputName);
            break;
        case 'number':
            if (wasOperatorSelected.value) {
                accumulatedValue.value = eval(`${accumulatedValue.value} ${operator.value} ${Number(inputValue)}`);
                currScreenValue.value = inputValue;
                allValuesArr.value = [];
                wasOperatorSelected.value = false;
                break;
            }
        default:
            allValuesArr.value.push(inputValue);
            currScreenValue.value = allValuesArr.value.join('');
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
            allValuesArr.value.pop();
            currScreenValue.value = allValuesArr.value.join('');
            break;
        case 'reset':
            reset();
            break;
        default:
            currScreenValue.value = null;
    }
};

function reset() {
    allValuesArr.value = [];
    accumulatedValue.value = '';
    currScreenValue.value = '';
    operator.value = null;
    wasOperatorSelected.value = !!operator.value;
}

</script>

<style lang="scss"></style>
