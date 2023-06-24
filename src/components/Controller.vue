<template>
    <div
        id="controller"
        class="mt-6 grid grid-cols-4 grid-rows-1 gap-6 rounded-md bg-[var(--keypadBackground)] p-5"
    >
        <button
            v-for="(el, index) in config"
            :key="index"
            :class="[
                `button ${el.name} button--${currentLayout}`,
                `flex cursor-pointer justify-center px-6 py-4 text-[32px] font-extrabold
                 ${setButtonClasses(el)}`
            ]"
            @click="clickHandler(el)"
        >
            {{ el.value }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLayout } from '@/composables/store'
import { IButton, TValue } from '@/types'
import { config } from '../buttonsConfig'

const emit = defineEmits(['key-selected'])
const { currentLayout } = useLayout()
const currentValue = ref<TValue>('')

const setButtonClasses = ({ value, name }: IButton) => {
    let classes = ''
    switch (name) {
        case 'del':
            classes = 'bg-[var(--keyDelBcg)] text-[var(--keyDelColor)]'
            break
        case 'reset':
            classes = 'bg-[var(--keyResetBcg)] text-[var(--keyResetColor)]'
            break
        case 'equal':
            classes = 'bg-[var(--keyEqualBcg)] text-[var(--keyEqualColor)]'
            break
        default:
            classes = 'bg-[var(--keyMainBcg)] text-[var(--keyMainColor)]'
    }

    return classes + ` ${currentValue.value === value ? 'active' : ''}`
}

const clickHandler = ({ value, name }: IButton) => {
    currentValue.value = value
    if (name === 'reset') {
        setTimeout(() => {
            currentValue.value = ''
        }, 300)
    }
    emit('key-selected', value)
}
</script>
