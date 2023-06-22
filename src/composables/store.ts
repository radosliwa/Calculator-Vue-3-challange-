import { computed, ref } from 'vue';
import { varsConfig, IVars } from '@/assets/styles/varsConfig';

type TLayout = `layout${number}`;
interface IState {
    currentLayout: TLayout;
}

const state = ref<IState>({
    currentLayout: 'layout1',
});

export const useLayout = () => {
    const setCurrentLayout = (layout: number) => {
        const currentLayout: TLayout = `layout${layout}`;
        state.value.currentLayout = currentLayout;
    };

    const getCurrentVars = computed<IVars>(() => varsConfig[state.value.currentLayout]);

    return {
        currentLayout: computed(() => state.value.currentLayout),
        setCurrentLayout,
        getCurrentVars
    };
};
