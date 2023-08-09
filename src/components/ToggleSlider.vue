<template>
    <div class="toggle-slider relative flex h-[25px] w-[75px] rounded-[20px] bg-[var(--toggleBackground)] p-[4px]">
        <div
            v-for="(theme, index) in [1, 2, 3]"
            :key="theme + index"
            class="flex w-[25px] cursor-pointer items-center justify-center"
            @click="changeTheme(theme)"
        >
            <span class="theme-number">{{ theme }}</span>
            <div
                class="toggle-dot absolute h-[15px] w-[15px] rounded-[50%] bg-[var(--toggleDotBackground)]"
                :class="[theme === activeTheme ? 'active visible' : 'invisible', dotMovingClass]"
                :style="`transform:translateX(${slideAmount});`"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLayout } from '@/composables/store'

const { setCurrentLayout, currentLayout } = useLayout()
const activeTheme = ref(Number(currentLayout.value.slice(-1)))
const dotMovingClass = ref('')
const slideAmount = ref('')

const changeTheme = (theme: number) => {
    const isMovingRight = theme > activeTheme.value
    dotMovingClass.value = isMovingRight ? 'right' : 'left'
    slideAmount.value = isMovingRight
        ? `${25 * (theme - activeTheme.value)}px`
        : `-${25 * (activeTheme.value - theme)}px`
    setTimeout(() => {
        activeTheme.value = theme
        dotMovingClass.value = ''
        slideAmount.value = '0px'
        setCurrentLayout(theme)
    }, 200)
}
</script>

<style lang="scss" scoped>
.theme-number {
    padding: 0 0.25rem;
    position: absolute;
    bottom: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}

.toggle-dot {
    &.right {
        transition: all 0.3s ease-out;
    }

    &.left {
        transition: all 0.3s ease-out;
    }
}
</style>
