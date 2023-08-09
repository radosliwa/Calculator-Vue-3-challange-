<template>
    <Layout>
        <div
            id="calculator"
            class="relative flex h-auto max-h-[85vh] w-auto max-w-[520px] flex-col justify-center rounded-md"
        >
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller :config="config" :current-layout="currentLayout" @key-selected="selectionHandler" />
            <!-- <h2 class="text-white">OPERATOR {{ operator }}</h2>
            <h2 class="text-white">ALL VALUES ARR {{ allValuesArr }}</h2>
            <h2 class="text-white">ACCUMULATED VALUE {{ accumulatedValue }}</h2>
            <h2 class="text-white">CURR SCREEN VALUE {{ currScreenValue }}</h2> -->
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Layout from '@/layouts/Layout.vue'
import Controller from '@/components/Controller.vue'
import Toggle from '@/components/Toggle.vue'
import Screen from '@/components/Screen.vue'
import { IButton, OperatorValues, TButtonValue, isInputNotANumber, Functions, InputTypes } from './types'
import { config } from '@/buttonsConfig'
import { useLayout } from '@/composables/store'

const { currentLayout } = useLayout()

// @TODO not all must be refs
const currScreenValue = ref<string | number>(0)
const operator = ref<null | TButtonValue>()
const allValuesArr = ref<Array<TButtonValue>>([])
const accumulatedValue = ref<number>(0)

const evaluateExpression = (expression: string): number => Math.round(eval(expression) * 1e10) / 1e10

const selectionHandler = (button: IButton): void => {
    console.log('button in selection handler', button)

    const { value, type, name } = button
    switch (type) {
        case InputTypes.OPERATOR:
            operatorHandler(value as `${OperatorValues}`)
            break
        case InputTypes.FUNCTION:
            functionHandler(name)
            break
        case InputTypes.POINT:
            pointHandler()
            break
        default:
            numberHandler(Number(value))
    }
}

const functionHandler = (currFunction: string): void => {
    switch (currFunction) {
        case Functions.DELETE:
            deleteFunction()
            break
        case Functions.RESET:
            reset()
            break
        default:
            currScreenValue.value = 0
    }
}

const isLastSelectionOperator = computed(() => {
    const lastValue = allValuesArr.value[allValuesArr.value.length - 1]
    return isInputNotANumber(lastValue)
})
const isAfterPoint = computed(() => currScreenValue.value.toString().includes('.') && !isLastSelectionOperator.value)

const evaluateAllAndUpdateScreenValue = (valueToShowOnScreen: number | string | null = null): void => {
    accumulatedValue.value = evaluateExpression(allValuesArr.value.join(''))
    const lastOperatorIndex = operator.value ? allValuesArr.value.lastIndexOf(operator.value) : -1

    /* values to the right of the last selected operator in allValuesArr */
    const valuesToKeepForScreen = lastOperatorIndex >= 0 ? allValuesArr.value.slice(lastOperatorIndex + 1) : []
    if (valuesToKeepForScreen.length > 0 && operator.value !== '=') {
        currScreenValue.value = evaluateExpression(valuesToKeepForScreen.join(''))
        return
    }
    currScreenValue.value = valueToShowOnScreen ?? accumulatedValue.value
}

const pointHandler = (): void => {
    if (isAfterPoint.value) return
    const shouldCurrScreenValueBeZeroWithPoint = allValuesArr.value.length === 0 || isLastSelectionOperator.value
    allValuesArr.value.push(shouldCurrScreenValueBeZeroWithPoint ? '0.' : '.')
    currScreenValue.value = shouldCurrScreenValueBeZeroWithPoint ? '0.' : currScreenValue.value + '.'
}

const numberHandler = (value: TButtonValue): void => {
    currScreenValue.value = currScreenValue.value.toString() + value
    allValuesArr.value.push(value)
    if (operator.value) evaluateAllAndUpdateScreenValue(value)
}

const operatorHandler = (currOperator: `${OperatorValues}`): void => {
    console.log(`🟢 curr operator`, currOperator)
    const lastValue = allValuesArr.value[allValuesArr.value.length - 1]
    if (currOperator === lastValue) return
    operator.value = currOperator

    if (currOperator === '=') {
        equalHandler()
        return
    }

    if (isLastSelectionOperator.value) {
        allValuesArr.value[allValuesArr.value.length - 1] = currOperator
        operator.value = currOperator
        return
    }
    allValuesArr.value.push(currOperator)
}

const deleteFunction = () => {
    allValuesArr.value.pop()
    currScreenValue.value =
        currScreenValue.value.toString().length > 1 ? currScreenValue.value.toString().slice(0, -1) : ''
}

const equalHandler = () => {
    evaluateAllAndUpdateScreenValue()
    operator.value = null
    allValuesArr.value = [accumulatedValue.value]
    accumulatedValue.value = 0
}

const reset = () => {
    accumulatedValue.value = 0
    currScreenValue.value = 0
    allValuesArr.value = []
    operator.value = null
}
</script>

<style lang="scss"></style>
