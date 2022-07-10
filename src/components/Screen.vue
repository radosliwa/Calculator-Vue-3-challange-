<template>
    <div id="screen"
         ref="screen"
         class="flex justify-end p-4 min-h-[95px] w-full"
         :class="[{'overflow-x-hidden justify-start':isContentTooLong}]"
    >
        <span ref="content"
              class="text-[42px] font-bold"
              tabindex="0"
        >
            {{ number }}
        </span>
    </div>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from 'vue';

export default defineComponent({
    name: 'Screen',
    props: {
        number: {
            type: [Number, String],
            default: 0
        }
    },
    setup(props) {
        const screen = ref<HTMLDivElement | null>();
        const content = ref<HTMLSpanElement | null>();
        const contentWidth = ref(0);
        const screenWidth = computed(() => screen.value?.clientWidth ?? 0);
        const isContentTooLong = computed(() => contentWidth.value >= screenWidth.value);
        watch(() => props.number, () => {
            contentWidth.value = content.value?.clientWidth ?? 0;
        }, {
            flush: 'post'
        });
        return {
            screen,
            content,
            isContentTooLong,
            contentWidth,
        };
    },
});
</script>

<style lang="scss" >
#screen {
    border-radius: $mainRadius;
    // padding: 1rem;
    // min-height: 95px;
    // display: flex;
    // justify-content: flex-end;
    // &.overflown {
    //     overflow-x: hidden;
    //     justify-content: flex-start;
    // }
    // &_content {
    //     font-size: 42px;
    //     font-weight: 700;
    // }
}
</style>
