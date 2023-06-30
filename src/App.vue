<template>
    <Layout>
        <div id="calculator" class="relative flex h-auto max-h-[85vh] w-auto max-w-[520px] flex-col justify-center rounded-md">
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller :config="config" :current-layout="currentLayout" @key-selected="selectionHandler" />
            <h2 class="text-white">OPERATOR {{ operator }}</h2>
            <h2 class="text-white">ALL VALUES ARR {{ allValuesArr }}</h2>
            <h2 class="text-white">ACCUMULATED VALUE {{ accumulatedValue }}</h2>
            <h2 class="text-white">CURR SCREEN VALUE {{ currScreenValue }}</h2>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref, unref, watch, toRaw, markRaw } from 'vue'
import Layout from '@/layouts/Layout.vue'
import Controller from '@/components/Controller.vue'
import Toggle from '@/components/Toggle.vue'
import Screen from '@/components/Screen.vue'
import { IButton, TValue, TButtonValue, isOperator, Functions } from './types'
import { config } from '@/buttonsConfig'
import { useLayout } from '@/composables/store'

const { currentLayout } = useLayout()

const currScreenValue = ref<string | number>(0)
const operator = ref<null | TButtonValue>()
const allValuesArr = ref<Array<TButtonValue>>([])

let accumulatedValue = ref<number>(0)

const evaluateExpression = (expression: string): number => Math.round(eval(expression) * 1e10) / 1e10

const selectionHandler = (button: IButton): void => {
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

const evaluateAllAndUpdateValues = (valueToShowOnScreen: number | string): void => {
    accumulatedValue.value = evaluateExpression(allValuesArr.value.join(''))
    currScreenValue.value = valueToShowOnScreen
}

const pointHandler = () => {
    if (currScreenValue.value.toString().includes('.')) return
    allValuesArr.value.push(allValuesArr.value.length === 0 ? '0.' : '.')
    currScreenValue.value += '.'
}

const numberHandler = (clickedValue: TButtonValue) => {
    const lastValue = allValuesArr.value[allValuesArr.value.length - 1]
    const isLastValueOperator = isOperator(lastValue)
    const isAfterPoint = currScreenValue.value.toString().includes('.') && !isLastValueOperator
    let valueToStore = clickedValue

    if (isAfterPoint) {
        console.log(`🟢 IS AFTER POINT`)
        valueToStore = Number(currScreenValue.value.toString() + clickedValue)
        console.log(`🟢 VALUE TO STORE`, valueToStore)
        // allValuesArr.value[allValuesArr.value.length - 1] = valueToStore
        currScreenValue.value = valueToStore
        allValuesArr.value.push(clickedValue)

        return
    }

    allValuesArr.value.push(clickedValue)

    if (operator.value) {
        evaluateAllAndUpdateValues(clickedValue)
        return
    }
    currScreenValue.value = allValuesArr.value.join('')
}

const operatorHandler = (currOperator: TButtonValue): void => {
    const lastValue = allValuesArr.value[allValuesArr.value.length - 1]
    if (currOperator === lastValue) return

    const isLastValueOperator = isOperator(lastValue)

    if (currOperator === '=') {
        evaluateAllAndUpdateValues(accumulatedValue.value)
        operator.value = null
        allValuesArr.value = [accumulatedValue.value]
        accumulatedValue.value = 0
        return
    }

    if (isLastValueOperator) {
        allValuesArr.value[allValuesArr.value.length - 1] = currOperator
        operator.value = currOperator
        return
    }

    if (operator.value) evaluateAllAndUpdateValues(accumulatedValue.value)

    allValuesArr.value.push(currOperator)
    operator.value = currOperator
}

const functionHandler = (currFunction: string): void => {
    switch (currFunction) {
        case Functions.DELETE:
            currScreenValue.value = allValuesArr.value.join('')
            // find last element of allValuesArr

            // if it has '.' remove last numeric value and replace it
            break
        case Functions.RESET:
            reset()
            break
        default:
            currScreenValue.value = 0
    }
}

const reset = () => {
    accumulatedValue.value = 0
    currScreenValue.value = 0
    allValuesArr.value = []
    operator.value = null
}
</script>

<style lang="scss"></style>
