<!--带有侧栏的布局-->
<template>
    <MyHeader></MyHeader>
    <a-layout class="content" :style="{ ['--menu-width']: menuWidth + 'px' }">
        <a-layout-sider
            class="app-sider"
            :width="menuWidth"
            v-if="configStore.device > deviceEnum['sm']"
            :collapsible="true"
            :collapsed="menuCollapse"
            @update:collapsed="collapseChange"
        >
            <Menu />
        </a-layout-sider>
        <a-layout-content class="app-main">
            <MutipleTab class="mutiple-tab" />
            <Main></Main>
        </a-layout-content>
        <a-drawer
            :width="'60%'"
            :visible="!menuCollapse && configStore.device <= deviceEnum['sm']"
            @update:visible="menuCollapse = !menuCollapse"
            placement="left"
            unmountOnClose
            :footer="false"
        >
            <Menu />
        </a-drawer>
    </a-layout>
</template>

<script lang="ts">
    export default {
        name: "LayoutSide",
    };
</script>

<script lang="ts" setup>
    import MyHeader from "@/layout/components/Header.vue";
    import Main from "@/layout/components/Main.vue";
    import Menu from "@/layout/components/Menu.vue";
    import { useConfigStore } from "@/store/modules/config/index";
    import { deviceEnum } from "@/store/modules/config/types";
    import MutipleTab from "../components/MutipleTab.vue";

    let configStore = useConfigStore();
    let menuCollapse = ref(false); // 控制侧边菜单是否收起
    let updateMenuCollapse = (value: boolean) => (menuCollapse.value = value);
    let menuWidth = computed(() => {
        console.log();
        // 移动端模式下隐藏侧边栏
        if (configStore.device <= deviceEnum["sm"]) {
            menuCollapse.value = true;
            return 0;
        }
        console.log("bushi");
        if (menuCollapse.value) return 48;
        return configStore.menuWidth;
    });
    function collapseChange(evt: any) {
        menuCollapse.value = evt;
    }
    provide("menuCollapse", menuCollapse);
    provide("updateMenuCollapse", updateMenuCollapse);
    watch(
        () => configStore.device,
        (newv) => {
            if (newv <= deviceEnum["sm"]) {
                menuCollapse.value = true;
            }
            if (newv === deviceEnum["md"]) {
                menuCollapse.value = false;
            }
            if (newv == deviceEnum["lg"]) {
                menuCollapse.value = true;
            }
            if (newv >= deviceEnum["xl"]) {
                menuCollapse.value = false;
            }
        }
    );
</script>

<style scoped lang="scss">
    .content {
        width: 100%;
        box-sizing: border-box;
        min-height: 100vh;
        padding-top: 60px;
        transition: padding 0.2s;
        padding-left: var(--menu-width);
    }

    .app-sider {
        position: fixed;
        top: 60px;
        left: 0;
        height: calc(100% - 60px);
        overflow: hidden;
        box-sizing: border-box;
        box-shadow: 1px 0px 1px var(--color-border-1);
        z-index: 2;
    }

    .app-main {
        z-index: 1;
        background-clip: content-box;
        background-color: var(--color-fill-2);
        overflow-y: hidden; // 不加会导致有滚动条
        box-sizing: border-box;
        position: relative;
        min-height: 100%;

        padding-top: 40px;
    }
    .mutiple-tab {
        z-index: 3;
        position: fixed;
        width: 100%;
        padding-left: var(--menu-width);

        box-sizing: border-box;
        top: 60px;
    }
</style>
