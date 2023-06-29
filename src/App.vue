<template>
    <Layout>
        <div id="calculator" class="relative flex h-auto max-h-[85vh] w-auto max-w-[520px] flex-col justify-center rounded-md">
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller @key-selected="selectionHandler" />
            <h2>OPERATOR {{ operator }}</h2>
            <h2>ALL VALUES ARR {{ allValuesArr }}</h2>
            <h2>ACCUMULATED VALUE {{ accumulatedValue }}</h2>
            <h2>CURR SCREEN VALUE {{ currScreenValue }}</h2>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref, unref, watch, toRaw, markRaw } from 'vue'
import Layout from '@/layouts/Layout.vue'
import Controller from './components/Controller.vue'
import Toggle from './components/Toggle.vue'
import Screen from './components/Screen.vue'
import { IButton, TValue, TButtonValue, isOperator } from './types'

const currScreenValue = ref<string | number>(0)
const operator = ref<null | TButtonValue>()
const allValuesArr = ref<Array<TButtonValue>>([])
let accumulatedValue = ref<number>(0)

const selectionHandler = (button: IButton) => {
    const { value, type, name } = button
    switch (type) {
        case 'operator':
            operatorHandler(value)
            break
        case 'function':
            functionHandler(name)
            break
        case 'point':
            pointHandler()
            break
        default:
            numberHandler(Number(value))
    }
}

const pointHandler = () => {
    if (currScreenValue.value.toString().includes('.')) return
    if (allValuesArr.value.length === 0) {
        allValuesArr.value.push('0.')
        currScreenValue.value = '0.'
        return
    }
    const lastValue = allValuesArr.value[allValuesArr.value.length - 1]
    if (typeof lastValue === 'number') {
        allValuesArr.value[allValuesArr.value.length - 1] = (lastValue + '.') as TButtonValue
        currScreenValue.value = currScreenValue.value + '.'
        return
    }
}

const numberHandler = (clickedValue: TButtonValue) => {
    const lastValue = allValuesArr.value[allValuesArr.value.length - 1]
    const isLastValueOperator = isOperator(lastValue)
    const isAfterPoint = currScreenValue.value.toString().includes('.') && !isLastValueOperator
    let valueToStore = clickedValue

    if (isAfterPoint) {
        console.log(`🟢 is after point`)
        valueToStore = Number(currScreenValue.value.toString() + clickedValue)
        allValuesArr.value[allValuesArr.value.length - 1] = valueToStore
        currScreenValue.value = valueToStore
        return
    }

    allValuesArr.value.push(clickedValue)

    if (operator.value) {
        accumulatedValue.value = Math.round(eval(allValuesArr.value.join('')) * 1e10) / 1e10
        currScreenValue.value = clickedValue
        return
    }
    currScreenValue.value = allValuesArr.value.join('')
}

const operatorHandler = (currOperator: TButtonValue) => {
    const lastValue = allValuesArr.value[allValuesArr.value.length - 1]
    const isLastValueOperator = isOperator(lastValue)
    if (isLastValueOperator) {
        allValuesArr.value[allValuesArr.value.length - 1] = currOperator
        operator.value = currOperator
        return
    }

    if (operator.value) {
        accumulatedValue.value = Math.round(eval(allValuesArr.value.join('')) * 1e10) / 1e10
        currScreenValue.value = accumulatedValue.value
    }
    allValuesArr.value.push(currOperator)
    operator.value = currOperator
}

const functionHandler = (currFunction: string) => {
    switch (currFunction) {
        case 'del':
            currScreenValue.value = allValuesArr.value.join('')
            break
        case 'reset':
            reset()
            break
        default:
            currScreenValue.value = 0
    }
}

function reset() {
    accumulatedValue.value = 0
    currScreenValue.value = 0
    allValuesArr.value = []
    operator.value = null
}
</script>

<style lang="scss"></style>
