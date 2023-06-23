<template>
    <div
        id="screen"
        ref="screen"
        class="flex min-h-[95px] w-full justify-end p-4 rounded-md bg-[var(--screenBackground)]"
        :class="[{ 'justify-start overflow-x-hidden': isContentTooLong }]"
    >
        <span
            ref="content" class="text-[42px] font-bold"
            tabindex="0"
        >
            {{ number }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
    number: number | string
}>()

const screen = ref<HTMLDivElement | null>()
const content = ref<HTMLSpanElement | null>()
const contentWidth = ref(0)
const screenWidth = computed(() => screen.value?.clientWidth ?? 0)
const isContentTooLong = computed(() => contentWidth.value >= screenWidth.value)

watch(
    () => props.number,
    () => (contentWidth.value = content.value?.clientWidth ?? 0)
)
</script>

<style lang="scss">
#screen {
    // border-radius: $mainRadius;
}
</style>
