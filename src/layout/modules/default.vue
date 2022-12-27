<template>
    <router-view></router-view>
</template>

<script lang="ts">
    export default {
        name: "default",
    };
</script>

<script lang="ts" setup>
    import { defineComponent } from "vue";

    console.log("this.age");
</script>
<style lang="scss"></style>
