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

<script>
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
    background: $screenAndToggleBackground;
    border-radius: $mainRadius;
    padding: 1.25rem;
    display: flex;
    justify-content: flex-end;
    &_content {
        color: $keyWhiteBcg;
        font-size: 42px;
        font-weight: 700;
    }
}
</style>
