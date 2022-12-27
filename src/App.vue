<template>
    <!-- :class="{ ['setting-open']: configStore.globalSettings }" -->
    <div class="page">
        <Layout></Layout>
    </div>
    <!-- <transition name="setting">
    <div class="setting" v-show="configStore.globalSettings">
      <Setting />
    </div>
  </transition> -->
    <a-drawer
        width="300px"
        v-model:visible="configStore.globalSettings"
        placement="right"
        unmountOnClose
        v-bind:footer="false"
    >
        <Setting></Setting>
    </a-drawer>
</template>
<script lang="ts" setup>
    import Setting from "@/layout/components/Setting.vue";
    import useColorMode from "@/utils/colorMode";
    import Layout from "@/layout/Layout.vue";
    import {
        useConfigStore,
        presistedConfigStore,
    } from "@/store/modules/config/index";
    import { deviceEnum } from "@/store/modules/config/types";
    import { presistedUserStore, useUserStore } from "@/store/modules/user";
    import { setThemeColor } from "./utils/themeColor";
    let userStore = useUserStore();
    presistedUserStore(userStore);
    let configStore = useConfigStore();
    presistedConfigStore(configStore);
    // 监听窗口宽度的变化,判断处于桌面端还是移动端
    let bodyResizeObserver = new ResizeObserver((entries) => {
        let width = 0;
        entries.forEach((item) => {
            if (item.target === document.body) {
                width = item.contentRect.width;
            }
        });
        let type: deviceEnum;
        if (width >= 1600) {
            type = deviceEnum["2xl"];
        } else if (width >= 1200) {
            type = deviceEnum["xl"];
        } else if (width >= 992) {
            type = deviceEnum["lg"];
        } else if (width >= 768) {
            type = deviceEnum["md"];
        } else if (width >= 576) {
            type = deviceEnum["sm"];
        } else {
            type = deviceEnum["xs"];
        }
        configStore.setDevice(type);
    });
    bodyResizeObserver.observe(document.body);
    let { themeChangeCallback } = useColorMode();
    // 添加颜色变化后切换指定的arco明暗主题
    themeChangeCallback.addCallback(onDark, "dark");
    themeChangeCallback.addCallback(onLight, "light");
    function onDark() {
        // 设置为暗黑主题
        document.body.setAttribute("arco-theme", "dark");
        document.documentElement.classList.add("dark");
        // 重新生成暗色系列颜色
        setThemeColor(configStore.themeColor, true);
    }
    function onLight() {
        // 移除 body 的 arco-theme 属性
        document.body.removeAttribute("arco-theme");
        document.documentElement.classList.remove("dark");
        // 重新生成亮色系列颜色
        setThemeColor(configStore.themeColor, false);
    }
</script>

<style lang="scss" scoped>
    .page {
        width: 100%;
        height: 100%;
    }

    .setting-open {
        transform: translateX(-320px);
    }

    .setting {
        box-sizing: border-box;
        position: fixed;
        height: 100%;
        width: 320px;
        z-index: 999;
        top: 0;
        left: 100%;
        background-color: var(--color-fill-2);
        transform: translateX(-100%);
        box-shadow: inset 16px 16px 5px -18px var(--color-border-4);
    }

    .setting-enter-from {
        transform: translateX(0);
    }

    .setting-enter-active {
        transition: transform 0.3s;
    }

    .setting-enter-to {
        transform: translateX(-100%);
    }
</style>
