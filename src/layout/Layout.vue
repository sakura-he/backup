<!--布局组件,根据路由的meta.layout属性加载对应的布局组件-->
<template>
    <!--根据appLayout变量切换布局组件-->
    <keep-alive :exclude="WHITE_LIST">
        <component
            :is="currentLayout"
            ref="componnet"
            :key="currentLayout.name"
        ></component>
    </keep-alive>
</template>

<script lang="ts" setup>
    import LayoutSide from "@/layout/modules/LayoutSide.vue";
    import { WHITE_LIST } from "@/router/routes/constant";
    import { DefineComponent } from "vue";
    import { useRoute } from "vue-router";
    let route = useRoute();
    let componnet = ref(null);
    let modules = import.meta.glob("./modules/**.vue", {
        eager: true,
    }) as Record<string, DefineComponent>;
    let showRouter = ref(true);
    function updateShowRouter(show: boolean) {
        showRouter.value = show;
    }
    provide("updateShowRouter", updateShowRouter);
    provide("showRouter", showRouter);
    let layouts = Object.values(modules).map((module) => module.default);
    let currentLayout = computed(() => {
        let findLayout = layouts.find((layout) => {
            if (!route.meta.layout) {
                return false;
            }
            return (
                (route.meta.layout as string).toLowerCase() ===
                layout.name.toLowerCase()
            );
        });
        // 路由的meta中Layout属性不存在或者不匹配使用默认的空白页面布局
        if (!findLayout) {
            return LayoutSide;
        }
        return findLayout;
    });
</script>

<style scoped></style>
