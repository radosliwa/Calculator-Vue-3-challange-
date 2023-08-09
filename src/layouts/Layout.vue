<template>
    <div class="min-w-screen flex min-h-screen items-center justify-center bg-[var(--mainBackground)]">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useLayout } from '@/composables/store'

const { currentLayout, getCurrentVars } = useLayout()

watch(
    currentLayout,
    () => {
        document.body.className = currentLayout.value
    },
    { immediate: true }
)
</script>

<style lang="scss">
#screen {
    color: v-bind('getCurrentVars.textScreen');
}

.toggle {
    color: v-bind('getCurrentVars.textToggle');
}
</style>
