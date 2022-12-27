<!-- 匹配到的路由页面将会被在这组件中渲染 -->
<template>
    <div class="container">
        <router-view v-slot="{ Component, route }" v-if="showRouter">
            <keep-alive :include="cacheList">
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup lang="ts">
    import { RouterView } from "vue-router";
    import { useMultipleTabs } from "@/store/modules/mutipleTab";
    let multipleTabs = useMultipleTabs();
    let cacheList = computed(() => {
        return multipleTabs.cacheList;
    });
    let showRouter = inject("showRouter")!;
</script>

<style scoped lang="scss">
    $page-padding: 10px;
    .container {
        min-height: calc(100% - (2 * $page-padding));
        margin: 0 auto;
        margin-top: $page-padding;
        width: calc(100% - (2 * $page-padding));
        box-sizing: border-box;
        border-radius: var(--border-radius-small);

        background-clip: content-box;
        // background-color: var(--color-bg-1);
    }
</style>
