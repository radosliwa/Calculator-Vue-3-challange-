<template>
    <Layout>
        <div id="calculator" class="relative flex h-auto max-h-[85vh] w-auto max-w-[520px] flex-col justify-center rounded-md">
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller @key-selected="selectionHandler" />
            <h2>ACC VALUE {{ accumulatedValue }}</h2>
            <h2>OPERATOR {{ operator }}</h2>
            <h2>ACTIVE SIDE {{ activeSide }}</h2>
            <h2>LEFT SIDE {{ leftSideValue }}</h2>
            <h2>RIGHT SIDE {{ rightSideValue }}</h2>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { ref, unref, watch, toRaw } from 'vue'
import Layout from '@/layouts/Layout.vue'
import Controller from './components/Controller.vue'
import Toggle from './components/Toggle.vue'
import Screen from './components/Screen.vue'
import { IButton, TValue, TButtonValue } from './types'

let leftSideValue = ''
let rightSideValue = ''

const activeSide = ref<'left' | 'right'>('left')

let accumulatedValue: string | number | null = ''
const currScreenValue = ref<string | number>(0)
const operator = ref<null | TButtonValue>()

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
            if (currScreenValue.value.toString().includes('.')) return
            // currScreenValue.value += '.'
            numberHandler('.')
            break
        default:
            numberHandler(Number(value))
    }
}

const numberHandler = (number: TButtonValue) => {
    if (activeSide.value === 'left' && !accumulatedValue) leftSideValue += number
    else rightSideValue += number
    console.log('leftSideValue, rightSideValue: ', leftSideValue, rightSideValue)

    console.log('accumulatedValue in NUMBER HANDLER: ', accumulatedValue)

    currScreenValue.value = activeSide.value === 'left' ? leftSideValue : rightSideValue
}

const operatorHandler = (currOperator: TButtonValue) => {
    if (!rightSideValue && leftSideValue) {
        activeSide.value = activeSide.value === 'left' ? 'right' : 'left'
        operator.value = currOperator
        return
    }
    if (leftSideValue && rightSideValue) {
        accumulatedValue = eval(`${leftSideValue} + ${accumulatedValue} ${operator.value} ${rightSideValue}`)
        console.log('ACCUMULATED VALUE, right', Number(accumulatedValue), Number(rightSideValue))
        // debugger
        currScreenValue.value = accumulatedValue
        leftSideValue = ''
        rightSideValue = ''
    }
    console.log('OPERATOR, accumulatedValue, activeSide.value, leftSideValue', accumulatedValue, activeSide.value, leftSideValue)
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
    accumulatedValue = 0
    currScreenValue.value = 0
    operator.value = null
}

// watch(allValuesArr.value, newVal => {
//     console.log('allValuesArr: ', toRaw(newVal))
// })
</script>

<style lang="scss"></style>
