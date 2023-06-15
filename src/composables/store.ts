import { computed, ref } from 'vue';
import { varsConfig, IVars } from '@/assets/styles/varsConfig';

type TLayout = 'layout1'|'layout2'|'layout3'
interface IState {
    currentLayout: TLayout;
}

const state = ref<IState>({
    currentLayout: 'layout1',
});

export const useLayout = () => {
    const setCurrentLayout = (layout:string) => {
        state.value.currentLayout = layout.toLowerCase() as TLayout;
    };
    const getCurrentVars = computed(():IVars => varsConfig[state.value.currentLayout]);

    return {
        currentLayout: computed(() => state.value.currentLayout),
        setCurrentLayout,
        getCurrentVars
    };
};
