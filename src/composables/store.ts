import { computed, reactive, toRefs } from 'vue';
import { varsConfig, IVars } from '@/varsConfig';

type TLayout = 'layout1'|'layout2'|'layout3'

const state = reactive({
    currentLayout: 'layout1' as TLayout,
});

export default () => {
    const setCurrentLayout = (layout:string) => {
        state.currentLayout = layout.toLowerCase() as TLayout;
    };
    const getCurrentVars = computed(():IVars => varsConfig[state.currentLayout]);

    return {
        state: toRefs(state),
        setCurrentLayout,
        getCurrentVars
    };
};
