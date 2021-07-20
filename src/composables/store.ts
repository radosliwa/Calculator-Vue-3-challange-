import { computed, reactive, toRefs } from 'vue';

const state = reactive({
    currentLayout: 'Layout1',
});

// const getCurrLayout = computed(() => state.currentLayout);

export default () => {
    const setCurrentLayout = (layout:string) => {
        state.currentLayout = layout;
        console.log('LAYOut in STORE', state.currentLayout);
    };
    return {
        state: toRefs(state),
        setCurrentLayout,
    };
};
