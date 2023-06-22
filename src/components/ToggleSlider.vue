<template>
    <div class="toggle-slider flex rounded-[20px] p-[4px] w-[75px] h-[25px] relative bg-[var(--toggleBackground)]">
        <div v-for="(theme, index) in [1, 2, 3]" :key="theme + index"
            class="flex justify-center items-center cursor-pointer w-[25px]" @click="changeTheme(theme)">
            <span class="theme-number">{{ theme }}</span>
            <div class="bg-[var(--toggleDotBackground)]" :class="[theme === activeTheme ? 'active' : '', dotMovingClass]"
                :style="`transform:translateX(${slideAmount});`" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayout } from '@/composables/store';

const { setCurrentLayout, currentLayout } = useLayout();
const activeTheme = ref(Number(currentLayout.value.slice(-1)));
const dotMovingClass = ref('');
const slideAmount = ref('');

const changeTheme = (theme: number) => {
    const isMovingRight = theme > activeTheme.value;
    dotMovingClass.value = isMovingRight ? 'right' : 'left';
    slideAmount.value = isMovingRight ? `${25 * (theme - activeTheme.value)}px`
        : `-${25 * (activeTheme.value - theme)}px`;
    setTimeout(() => {
        activeTheme.value = theme;
        dotMovingClass.value = '';
        slideAmount.value = '0px';
        setCurrentLayout(theme);
    }, 200);
};

</script>

<style lang="scss" scoped >
.theme-number {
    padding: 0 0.25rem;
    position: absolute;
    bottom: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}

.toggle-dot {
    visibility: hidden;
    border-radius: 50%;
    height: 15px;
    width: 15px;

    &.active {
        visibility: visible;
    }

    &.right {
        position: absolute;
        transition: all .3s ease-out;
    }

    &.left {
        position: absolute;
        transition: all .3s ease-out;
    }
}
</style>
