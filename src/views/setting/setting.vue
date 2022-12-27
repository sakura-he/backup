<template>
    <a-drawer
        :width="340"
        :visible="configStore.globalSettings"
        unmountOnClose
        @cancel="onDrawClose"
        @ok="onDrawOK"
    >
        <template #title> Title </template>
        <div
            >You can cusstomize modal body text by the current situation. This
            modal will be closed immediately once you press the OK button.
        </div>
    </a-drawer>
</template>

<script setup lang="ts">
    import { useConfigStore } from "@/store/modules/config/index";
    let configStore = useConfigStore();
    function onDrawClose() {
        console.log("点击关闭按钮了");
        configStore.globalSettings = false;
    }
    function onDrawOK() {
        console.log("点击确认按钮了");
        configStore.globalSettings = true;
    }
</script>

<style scoped>
    :deep(body .arco-drawer-mask) {
        background-color: red;
    }
</style>
