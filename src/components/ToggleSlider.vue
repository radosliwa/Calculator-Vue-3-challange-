<template>
    <div class="toggle-slider">
        <div v-for="(theme, index) in themes"
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

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { defineComponent, nextTick, reactive, ref } from 'vue';
import store from '@/composables/store';

export default defineComponent({
    setup() {
        const { setCurrentLayout, state: { currentLayout }, getCurrentVars } = store();
        const currentVars = reactive(getCurrentVars);
        let activeTheme = ref<number>(Number(currentLayout.value.slice(-1)));
        let dotMovingClass = ref<string>('');
        let slideAmount = ref<string>('');

        const changeTheme = (theme: number) => {
            if (theme > activeTheme.value) {
                dotMovingClass.value = 'right';
                slideAmount.value = `${25 * (theme - activeTheme.value)}px`;
            } else {
                dotMovingClass.value = 'left';
                slideAmount.value = `-${25 * (activeTheme.value - theme)}px`;
            }
            setTimeout(() => {
                activeTheme.value = theme;
                dotMovingClass.value = '';
                slideAmount.value = '0px';
                setCurrentLayout(`layout${theme}`);
                console.log('in timeout', currentVars);
            }, 200);
        };
        return {
            themes: [1, 2, 3],
            dotMovingClass,
            activeTheme,
            changeTheme,
            slideAmount,
            currentVars
        };
    },
});
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
