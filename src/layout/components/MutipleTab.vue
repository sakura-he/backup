<template>
    <div class="container">
        <a-tabs
            type="line"
            :hide-content="true"
            :editable="true"
            :justify="true"
            :active-key="currentTabIndex"
            @tab-click="onTabclick"
            @delete="onCloseTab"
            class="tabs"
        >
            <a-tab-pane
                :key="tabIndex"
                v-for="(tab, tabIndex) in multipleTabs.tabs"
                :closable="!tab?.meta?.residentTab"
            >
                <template v-slot:title>
                    <a-dropdown trigger="contextMenu">
                        <span>
                            <icon-pushpin
                                v-if="tab?.meta.residentTab"
                            />
                            <DynamicIcon
                                v-else
                                :icon="tab?.meta.icon"
                            />
                            {{
                                tab.meta.title as string
                            }}</span
                        >
                        <template #content>
                            <a-doption
                                @click="
                                    onCloseRigthTabs(
                                        tabIndex
                                    )
                                "
                            >
                                <template #icon>
                                    <icon-to-right />
                                </template>
                                <template #default>
                                    <span
                                        >关闭右侧标签页</span
                                    >
                                </template>
                            </a-doption>

                            <a-doption
                                @click="
                                    onCloseLeftTabs(
                                        tabIndex
                                    )
                                "
                            >
                                <template #icon>
                                    <icon-to-left />
                                </template>
                                <template #default>
                                    <span
                                        >关闭左侧标签页</span
                                    >
                                </template>
                            </a-doption>
                            <a-doption
                                @click="
                                    onCloseOtherTabs(
                                        tabIndex
                                    )
                                "
                            >
                                <template #icon>
                                    <icon-close />
                                </template>
                                <template #default>
                                    <span
                                        >关闭其他标签页</span
                                    >
                                </template>
                            </a-doption>
                            <a-doption
                                @click="onCloseAllTabs"
                            >
                                <template #icon>
                                    <icon-delete />
                                </template>

                                <template #default>
                                    <span
                                        >关闭全部标签页</span
                                    >
                                </template>
                            </a-doption>
                            <a-doption
                                @click="
                                    onSwitchResidentTab(
                                        tabIndex
                                    )
                                "
                            >
                                <template #icon>
                                    <icon-unlock
                                        v-if="
                                            tab?.meta
                                                .residentTab
                                        "
                                    />
                                    <icon-pushpin v-else />
                                </template>

                                <template #default>
                                    <span>{{
                                        tab?.meta
                                            ?.residentTab
                                            ? "取消常驻标签页"
                                            : "常驻标签页"
                                    }}</span>
                                </template>
                            </a-doption>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
    import { useMultipleTabs } from "@/store/modules/mutipleTab/index";
    import DynamicIcon from "./DynamicIcon.vue";
    import { useRouter } from "vue-router";
    import { Ref } from "vue";
    let multipleTabs = useMultipleTabs();
    let router = useRouter();
    const currentRoute = ref(router.currentRoute);
    let menuCollapse =
        inject<Ref<boolean>>("menuCollapse")!;
    let updateMenuCollapse = inject<
        (value: boolean) => void
    >("updateMenuCollapse")!;
    function onTabclick(evt: string | number) {
        if (typeof evt === "string")
            evt = Number.parseInt(evt);
        router.push({
            name: multipleTabs.tabs[evt].name as any,
        });
    }

    function onCloseRigthTabs(evt: string | number) {
        if (typeof evt === "string")
            evt = Number.parseInt(evt);
        multipleTabs.closeRigthTabs(evt);
    }
    function onCloseLeftTabs(evt: string | number) {
        if (typeof evt === "string")
            evt = Number.parseInt(evt);
        multipleTabs.closeLeftTabs(evt);
    }
    function onCloseOtherTabs(evt: string | number) {
        if (typeof evt === "string")
            evt = Number.parseInt(evt);
        multipleTabs.closeOtherTabs(evt);
    }
    function onCloseAllTabs() {
        multipleTabs.closeAllTabs();
    }
    function onCloseTab(evt: string | number) {
        if (typeof evt === "string")
            evt = Number.parseInt(evt);
        multipleTabs.closeTab(evt);
    }
    function onSwitchResidentTab(evt: string | number) {
        if (typeof evt === "string")
            evt = Number.parseInt(evt);
        multipleTabs.switchResidentTab(evt);
    }
    let currentTabIndex = computed(() => {
        return multipleTabs.tabs.findIndex(
            (item) => item.name === currentRoute.value.name
        );
    });
</script>

<style scoped lang="scss">
    .container {
        border-radius: var(--border-radius-small);
        right: 0;
        display: flex;
        width: 100%;
        align-items: center;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        background-color: var(--color-bg-opacity-2);
        backdrop-filter: blur(25px);
        user-select: none;
    }
    .tabs {
        flex: 1;
        min-width: 0;
    }
    .collapse_btn {
        box-sizing: border-box;
        flex: none;
        min-width: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 40px;
        color: var(--color-text-2);
        transition: background-color 0.2s;
        &:hover {
            cursor: pointer;
            background-color: var(--color-fill-1);
        }
        &:active {
            background-color: var(--color-fill-3);
        }
    }
    :deep(.arco-tabs-nav-type-line .arco-tabs-tab) {
        margin-left: 8px;
        margin-right: 8px;
    }
</style>
