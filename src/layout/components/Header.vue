<template>
    <!-- 左侧logo -->
    <a-row align="center" class="container">
        <!-- 左侧logo -->
        <a-col :flex="`${menuWidth}`" class="left">
            <div class="left-side" :class="[menuCollapse ? 'collapse' : '']">
                <div class="logo">
                    <img src="@/assets/logo.svg" alt="" />
                </div>
                <transition name="title">
                    <h1 class="title" v-show="!menuCollapse"
                        >Nest Arco Admin
                    </h1>
                </transition>
            </div>
        </a-col>
        <a-col flex="initial">
            <!-- 控制侧边菜单折叠按钮(手机模式下现实) -->
            <a-button
                type="text"
                class="nav-btn"
                @click="updateMenuCollapse(!menuCollapse)"
                v-if="configStore.device <= deviceEnum['sm']"
            >
                <template #icon color="#333">
                    <!-- 已隐藏 -->
                    <icon-menu-fold v-if="menuCollapse" />
                    <!-- 已展开 -->
                    <icon-menu-unfold v-else />
                </template>
            </a-button>
            <!--刷新按钮 -->
            <a-button type="text" class="nav-btn">
                <template #icon color="#333">
                    <Refresh />
                </template>
            </a-button>
        </a-col>
        <a-col flex="1" v-if="configStore.device > deviceEnum['sm']">
            <a-breadcrumb>
                <a-breadcrumb-item
                    :key="item.name"
                    v-for="item in breadcurmb"
                    >{{ item.meta.title }}</a-breadcrumb-item
                >
            </a-breadcrumb>
        </a-col>
        <!-- 右侧按钮组 -->
        <a-col flex="initial" class="right-side__col">
            <!-- 顶部导航栏按钮组 -->
            <a-space>
                <!-- 颜色模式切换 -->
                <a-popover
                    trigger="hover"
                    position="bottom"
                    :content-class="style['color-radio-outer']"
                >
                    <a-button
                        type="secondary"
                        shape="circle"
                        class="right-side__btn"
                        @click="toggleColorMode"
                    >
                        <DynamicIcon :icon="currentColorModeIcon" />
                    </a-button>
                    <template v-slot:content>
                        <a-radio-group
                            type="button"
                            size="large"
                            class="theme-radio"
                            @change="onColorModeRadioChange"
                            :model-value="colorMode"
                        >
                            <a-radio :value="colorModeEnum['LIGHT']">
                                <icon-sun />
                            </a-radio>
                            <a-radio :value="colorModeEnum['DARK']">
                                <icon-moon-fill />
                            </a-radio>
                            <a-radio :value="colorModeEnum['AUTO']">
                                跟随系统
                            </a-radio>
                        </a-radio-group>
                    </template>
                </a-popover>
                <!-- 全屏按钮 -->
                <a-button
                    type="secondary"
                    shape="circle"
                    class="right-side__btn"
                    @click="toggleFullscreen"
                >
                    <icon-fullscreen v-show="!isFullscreen" />
                    <icon-fullscreen-exit v-show="isFullscreen" />
                </a-button>
                <!-- 设置按钮 -->
                <a-button
                    type="secondary"
                    shape="circle"
                    class="right-side__btn"
                    @click="onSetting"
                >
                    <icon-settings />
                </a-button>
            </a-space>
            <!-- 右侧头像 -->
            <a-dropdown trigger="hover">
                <div class="right-side__avatar">
                    <img
                        src="@/assets/avatar.png"
                        alt=""
                        class="right-side__avatar-img"
                    />
                </div>
                <template v-slot:content>
                    <a-doption>
                        <a-space>
                            <icon-user />
                            <span>用户中心</span>
                        </a-space>
                    </a-doption>
                    <a-doption @click="logout">
                        <a-space>
                            <icon-export />
                            <span>退出登录</span>
                        </a-space>
                    </a-doption>
                </template>
            </a-dropdown>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
    import { useUserStore, useConfigStore, useNavigateStore } from "@/store";
    // 刷新按钮组件，复用
    import Refresh from "./Refresh.vue";
    import { deviceEnum } from "@/store/modules/config/types";
    import useColorMode, { colorModeEnum } from "@/utils/colorMode";
    import { useFullscreen } from "@vueuse/core";
    import { Ref } from "vue";
    import DynamicIcon from "./DynamicIcon.vue";
    let style = useCssModule("header");
    let userStore = useUserStore();
    let configStore = useConfigStore();
    let navigateStore = useNavigateStore();
    let breadcurmb = computed(() => navigateStore.breadCrumb);
    let menuCollapse = inject<Ref<boolean>>("menuCollapse")!;
    let updateMenuCollapse =
        inject<(value: boolean) => void>("updateMenuCollapse")!;
    let menuWidth = computed(() => {
        if (menuCollapse.value) return 48 + "px";
        return configStore.menuWidth + "px";
    });
    let styleMenuWidth = computed(() => configStore.menuWidth + "px");
    let {
        value: colorMode,
        setColorMode,
        isDarkMode,
        themeChangeCallback,
    } = useColorMode();
    let currentColorModeIcon = computed(() => {
        if (colorMode.value === colorModeEnum["AUTO"]) return "icon-desktop";
        if (colorMode.value === colorModeEnum["DARK"]) return "icon-moon-fill";
        if (colorMode.value === colorModeEnum["LIGHT"]) return "icon-sun";
    });
    function onColorModeRadioChange(evt: any) {
        setColorMode(evt);
    }
    function toggleColorMode() {
        if (isDarkMode.value) {
            setColorMode(colorModeEnum["LIGHT"]);
        } else {
            setColorMode(colorModeEnum["DARK"]);
        }
    }

    // 打开全局设置
    function onSetting() {
        configStore.globalSettings = !configStore.globalSettings;
    }
    function logout() {
        userStore.logout();
    }
    // 切换全屏以及全屏状态
    let { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
</script>

<style scoped lang="scss">
    .container {
        height: 60px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0px 1px 1px var(--color-border-1);
        overflow: hidden;
        z-index: 10;
        background-color: var(--color-bg-opacity-2);
        backdrop-filter: blur(25px) saturate(150%);
    }
    .left {
        transition: flex 0.2s;
        min-width: 0;
        overflow: hidden;
    }
    .left-side {
        display: flex;
        transition: width 0.2s;
        overflow: hidden;
        padding: 0 20px;
        box-sizing: border-box;
        align-items: center;
        height: 60px;
        overflow: hidden;
        &.collapse {
            padding: 0;
            justify-content: center;
        }
        .logo {
            flex: none;
            width: 30px;
            height: 30px;
            min-width: 0;
        }
        .title {
            min-width: 0;
            flex: none;
            width: calc(v-bind(styleMenuWidth) - 80px);
            font-size: var(--font-size-title-1);
            color: var(--color-text-2);
            margin-left: 10px;
            line-height: 1.2em;
        }
    }

    .right-side__col {
        padding-right: 20px;
        display: flex;
        align-items: center;
        margin-left: auto;
    }

    .right-side__col > * {
        margin-left: 20px;
    }

    .right-side {
        display: flex;
        align-items: center;
    }

    .right-side__item:not(:first-of-type) {
        margin-left: 10px;
    }

    .right-side__avatar {
        border-radius: 999vw;
        width: 40px;
        height: 40px;
        overflow: hidden;
    }

    .right-side__btn {
        border-color: rgb(var(--gray-2)) !important;
        color: rgb(var(--gray-8)) !important;
        font-size: 16px;
    }

    .right-side__avatar-img {
        width: 100%;
    }
    :deep(.nav-btn) {
        color: var(--color-text-2) !important;
    }
    .theme-radio {
        border-radius: 999vw !important;
        padding: 3px;
    }

    :deep(.arco-radio-button) {
        border-radius: 999vw !important;
    }
    .title-enter-from {
        opacity: 0;
    }
    .title-enter-active {
        transition: all 0.2s;
    }
</style>
<style lang="scss" module="header">
    .color-radio-outer {
        padding: 5px 10px !important;
    }
</style>
