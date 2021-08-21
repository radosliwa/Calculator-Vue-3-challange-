<template>
    <div class="toggle">
        <h3 class="title">
            Theme
        </h3>
        <ToggleSlider />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToggleSlider from '@/components/ToggleSlider.vue';

export default defineComponent({
    name: 'Toggle',
    components: {
        ToggleSlider,
    },
});
</script>

<style lang="scss" scoped>
.toggle{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;
    .title{
        margin-right: 1rem;
    }
}

</style>
