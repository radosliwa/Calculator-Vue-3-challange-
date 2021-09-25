<template>
    <div ref="screen"
         :class="['screen',{'overflown':isContentTooLong}]"
    >
        <span ref="content"
              class="screen_content"
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
        let contentWidth = ref<number>(0);
        const screenWidth = computed((): number => screen.value?.clientWidth ?? 0);
        const isContentTooLong = computed((): boolean => contentWidth.value >= screenWidth.value);
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

<style lang="scss" scoped>
.screen {
    border-radius: $mainRadius;
    padding: 1rem;
    min-height: 95px;
    display: flex;
    justify-content: flex-end;
    &.overflown {
        overflow-x: hidden;
        justify-content: flex-start;
    }
    &_content {
        font-size: 42px;
        font-weight: 700;
    }
}
</style>
