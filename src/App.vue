<template>
    <Layout>
        <div id="calculator" class="relative flex h-auto max-h-[85vh] w-auto max-w-[520px] flex-col justify-center rounded-md">
            <Toggle />
            <Screen :number="currScreenValue" />
            <Controller @key-selected="selectionHandler" />
            <h2>OPERATOR {{ operator }}</h2>
            <h2>ALL VALUES ARR {{ allValuesArr }}</h2>
            <h2>ACCUMULATED VALUE {{ accumulatedValue }}</h2>
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

const currScreenValue = ref<string | number>(0)
const operator = ref<null | TButtonValue>()
const allValuesArr = ref<Array<string | number>>([])
const accumulatedValue = ref<number>(0)

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

const numberHandler = (clickedValue: TButtonValue) => {
    const isPoint = clickedValue === '.'

    allValuesArr.value.push(clickedValue)

    if (operator.value) {
        accumulatedValue.value = eval(allValuesArr.value.join(''))
        currScreenValue.value = !isPoint ? clickedValue : currScreenValue.value + '.'
        // operator.value = null
        return
    }
    currScreenValue.value = allValuesArr.value.join('')
}

const operatorHandler = (currOperator: TButtonValue) => {
    if (operator.value) {
        console.log('yooo', eval(allValuesArr.value.join('')))
        accumulatedValue.value = eval(allValuesArr.value.join(''))

        currScreenValue.value = accumulatedValue.value
        // return
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
    accumulatedValue = 0
    currScreenValue.value = 0
    operator.value = null
}

// watch(allValuesArr.value, newVal => {
//     console.log('allValuesArr: ', toRaw(newVal))
// })
</script>

<style lang="scss"></style>
