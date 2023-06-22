/* eslint-disable no-unused-vars */
<template>
    <Layout>
        <div id="calculator" class="relative flex h-auto max-h-[85vh]
             w-auto max-w-[520px] flex-col justify-center rounded-md">
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller @key-selected="selectionHandler" />
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import Layout from '@/layouts/Layout.vue';
import Controller from './components/Controller.vue';
import Toggle from './components/Toggle.vue';
import Screen from './components/Screen.vue';
import { IButton, TValue } from './types';

let allValuesArr: TValue[] = [];
let accumulatedValue: string | number | null = '';
const currScreenValue = ref<string | number>('');
const operator = ref<null | TValue>(null);
const wasOperatorSelected = ref(!!operator.value);

const selectionHandler = ({ value, type, name }: IButton) => {
    console.log('input handler: ', { value, type, name });
    switch (type) {
        case 'operator':
            operatorHandler(value);
            break;
        case 'function':
            functionHandler(name);
            break;
        default:
            numberHandler(value);
    }
};

const numberHandler = (number: TValue) => {
    if (wasOperatorSelected.value) {
        accumulatedValue = eval(`${accumulatedValue} ${operator.value} ${Number(number)}`);
        currScreenValue.value = number;
        allValuesArr = [];
        wasOperatorSelected.value = false;
        return
    }
    allValuesArr.push(number);
    console.log('allValuesArr: ', allValuesArr);
    currScreenValue.value = allValuesArr.join('');
    accumulatedValue = currScreenValue.value;
};

const operatorHandler = (currOperator: TValue) => {
    wasOperatorSelected.value = true;
    accumulatedValue = accumulatedValue ?? Number(currScreenValue.value);
    currScreenValue.value = accumulatedValue;
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
            currScreenValue = null;
    }
};

function reset() {
    allValuesArr = [];
    accumulatedValue = '';
    currScreenValue.value = '';
    operator.value = null;
    wasOperatorSelected.value = !!operator.value;
}

</script>

<style lang="scss"></style>
