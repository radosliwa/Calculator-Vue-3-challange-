<template>
    <div id="controller" class="mt-6 grid grid-cols-4 grid-rows-1 gap-6 rounded-md bg-[var(--keypadBackground)] p-5">
        <button
            v-for="(el, index) in config"
            :key="index"
            :class="[
                `button ${el.name} button--${currentLayout}`,
                `inline-flex h-[80px] cursor-pointer items-center justify-center rounded-md px-6 text-[32px] font-bold leading-[80px]
                 ${setButtonClasses(el)}`
            ]"
            @click="clickHandler(el)"
        >
            {{ el.type === 'function' ? el.value.toString().toUpperCase() : el.value }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IButton, TButtonValue } from '@/types'

interface Props {
    config: Array<IButton>
    currentLayout: `layout${number}`
}

interface Emits {
    (e: 'key-selected', payload: IButton): void
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const currentValue = ref<TButtonValue | ''>('')

const setButtonClasses = ({ value, name }: IButton) => {
    const state = ` ${currentValue.value === value ? 'active' : ''}`
    switch (name) {
        case 'del':
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
