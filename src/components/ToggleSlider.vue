<template>
    <div class="toggle-slider">
        <div v-for="(theme, index) in [1, 2, 3]"
             :key="theme + index"
             class="theme-col"
             @click="changeTheme(theme)"
        >
            <span class="theme-number">{{ theme }}</span>
            <div class="toggle-dot"
                 :class="[theme === activeTheme ? 'active':'', dotMovingClass]"
                 :style="`transform:translateX(${slideAmount});`"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayout } from '@/composables/store';

const { setCurrentLayout, currentLayout } = useLayout();
const activeTheme = ref<number>(Number(currentLayout.value.slice(-1)));
const dotMovingClass = ref('');
const slideAmount = ref('');

const changeTheme = (theme: number) => {
    const isRight = theme > activeTheme.value;
    dotMovingClass.value = isRight ? 'right' : 'left';
    slideAmount.value = isRight ? `${25 * (theme - activeTheme.value)}px`
        : `-${25 * (activeTheme.value - theme)}px`;
    setTimeout(() => {
        activeTheme.value = theme;
        dotMovingClass.value = '';
        slideAmount.value = '0px';
        setCurrentLayout(`layout${theme}`);
    }, 200);
};

</script>

<style lang="scss" scoped >
    .toggle-slider {
        padding: 0.25rem;
        display: flex;
        flex-direction: row;
        border-radius: 20px;
        width: 75px;
        height: 25px;
        position: relative;
    }
    .theme-col {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 25px;
    }
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
        &.right{
            position: absolute;
            transition: all .3s ease-out;
        }
        &.left{
            position: absolute;
            transition: all .3s ease-out;
        }
    }
</style>
