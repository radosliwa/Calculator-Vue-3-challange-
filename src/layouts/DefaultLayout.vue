<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DefaultLayout',
});
</script>

+
+

<style lang="scss">

.button{
    background: $keyWhiteBcg;
}

</style>
