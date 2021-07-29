<template>
    <div class="screen">
        <span
            class="screen_content"
            tabindex="0"
        >
            {{ number }}
        </span>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Screen',
    props: {
        number: {
            type: [Number, String],
            default: 0,
        },
    },

};
</script>

<style lang="scss" scoped>
.screen {
    border-radius: $mainRadius;
    padding: 1rem;
    min-height: 95px;
    display: flex;
    justify-content: flex-end;
    &_content {
        font-size: 42px;
        font-weight: 700;
    }
}
</style>
