<template>
    <div id="controller" class="mt-6 grid grid-cols-4 grid-rows-1 gap-6 rounded-md bg-[var(--keypadBackground)] p-5">
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
import { IButton, TValue, TButtonValue } from '@/types'
import { config } from '../buttonsConfig'

const emit = defineEmits(['key-selected'])
const { currentLayout } = useLayout()
const currentValue = ref<TButtonValue | ''>('')

const setButtonClasses = ({ value, name }: IButton) => {
    const state = ` ${currentValue.value === value ? 'active' : ''}`
    switch (name) {
        case 'delete':
            return 'bg-[var(--keyDelBcg)] text-[var(--keyDelColor)]' + state
        case 'reset':
            return 'bg-[var(--keyResetBcg)] text-[var(--keyResetColor)]' + state
        case 'equal':
            return 'bg-[var(--keyEqualBcg)] text-[var(--keyEqualColor)]' + state
        default:
            return 'bg-[var(--keyMainBcg)] text-[var(--keyMainColor)]' + state
    }
}

const clickHandler = ({ value, name, type }: IButton) => {
    currentValue.value = value
    if (name === 'reset') {
        setTimeout(() => {
            currentValue.value = ''
        }, 300)
    }
    emit('key-selected', { value, name, type })
}
</script>
