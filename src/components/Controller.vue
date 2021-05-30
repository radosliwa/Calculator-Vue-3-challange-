<template>
    <div class="buttons">
        <div v-for="(el, index) in config"
             :key="el + index"
             tabindex="0"
             role="button"
             :class="`button button-${el.value}`"
        >
            {{ el.value }}
        </div>
    </div>
</template>

<script>
import { config } from './Buttons/buttonsConfig';

export default {
    setup() {

    },
    data() {
        return {
            config, // 2
        };
    },
};
</script>

<style lang="scss">

</style>
