<template>
    <div class="container">
        <div class="content">
            <!-- 风格和颜色 -->
            <div class="form">
                <div class="form-title"> 菜单栏宽度 </div>
                <div class="form-item">
                    <div class="form-item__title"
                        >设置主题颜色
                        <span class="tw-ml-4 tw-text-body-1"
                            >当前颜色:
                            <span class="tw-text-p-6">{{ color }}</span></span
                        >
                    </div>
                    <div
                        class="tw-flex-none tw-w-16 tw-px-[2px] tw-py-[2px] tw-leading-none tw-rounded-sm tw-box-border tw-border-p-7 tw-border-solid tw-border"
                    >
                        <pick-colors
                            class="tw-w-full"
                            :colors="presetColors"
                            :value="color"
                            :theme="isDarkMode ? 'dark' : 'light'"
                            @update:value="colorChange($event)"
                        />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item__title">生成颜色预览</div>
                    <ul
                        class="form-item tw-flex tw-rounded-sm tw-overflow-hidden"
                    >
                        <li
                            class="tw-h-7 tw-flex-1 tw-ring-inset tw-ring-p-8"
                            :style="{ backgroundColor: color }"
                            :class="{
                                'tw-mx-[2px]': index === 5,
                                'tw-ring-2': index === 5,
                            }"
                            v-for="(color, index) in colorPreviews"
                        ></li>
                    </ul>
                </div>

                <div class="form-item">
                    <div class="form-item__title">菜单栏宽度</div>
                    <a-slider
                        class="form-item__sw"
                        :model-value="configStore.menuWidth"
                        :min="150"
                        :max="270"
                        :show-input="true"
                        @update:modelValue="onUpdateMenuWidth"
                    />
                </div>
            </div>
            <a-divider :margin="20" />
            <!-- 组件设置 -->
            <div class="form">
                <div class="form-title">组件设置</div>
                <div class="form-item row" v-for="item in 4">
                    <span class="form-item__title">选项{{ item }}</span>
                    <a-switch class="form-item__sw" size="small" type="line">
                    </a-switch>
                </div>
            </div>
            <a-divider :margin="20" />
            <div class="form">
                <div class="form-title">其他设置</div>
                <div
                    class="form-item row"
                    v-for="(option, index) in otherOptions"
                >
                    <span class="form-item__title">{{ option[0] }}</span>
                    <a-switch
                        class="form-item__sw"
                        size="small"
                        type="line"
                        :model-value="option[1].value"
                        @update:model-value="onOtherOptionsChang(index, $event)"
                    >
                    </a-switch>
                </div>
            </div>
            <a-divider :margin="20" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useConfigStore } from "@/store";
    import { previewColor } from "@/utils/themeColor";
    import { getPresetColors } from "@arco-design/color";
    import PickColors from "vue-pick-colors";
    import useColorMode from "@/utils/colorMode";
    import { storeToRefs } from "pinia";
    import { Ref } from "vue";

    let configStore = useConfigStore();
    let { colorWeak } = storeToRefs(configStore);
    let color = ref(configStore.themeColor);
    let { isDarkMode } = useColorMode();
    // 获取arco预置颜色，设置给取色器的预置色板
    let presetColors = computed(() => {
        let presetColor = getPresetColors();
        let mode = isDarkMode.value ? "dark" : "light";
        return Object.keys(presetColor).map((color) => {
            return presetColor[color][mode][5];
        });
    });
    // 通过 arco/color 计算当前选择的颜色生成的颜色阶梯 预览
    let colorPreviews = computed(() => {
        let colors = previewColor(color.value, isDarkMode.value);
        return colors;
    });
    // 设置左侧菜单的宽度
    function onUpdateMenuWidth(evt: any) {
        configStore.updateMenuWidth(evt);
    }
    // 监听取色器组件的颜色改变事件（v-model）
    function colorChange(evt: any) {
        color.value = evt;
        configStore.setThemeColor(color.value);
    }
    // 其他选项
    let otherOptions: Array<[string, Ref<boolean>]> = reactive([
        ["色弱模式", colorWeak],
    ]);
    function onOtherOptionsChang(index: number, event: any) {
        if (index === 0) {
            configStore.updateColorWeek(event);
        }
    }
</script>

<style scoped lang="scss">
    $padding: 20px;
    $title-padding: 18px;
    $item-padding: 16px;
    $item-padding-sm: 12px;
    $item-title-size: var(--font--size-body-3);
    .container {
        border-radius: 0 0 var(--border-radius-small);
        height: 100%;
        box-sizing: border-box;
        line-height: 1.5;
        font-size: var(--font--size-body-2);
        color: var(--color-text-2);
        display: flex;
        flex-direction: column;
    }
    .form {
        &-title {
            text-align: left;
            color: var(--color-text-1);
            font-size: var(--font-size-title-1);
            margin-bottom: $title-padding;
        }
        &-item {
            margin-bottom: $item-padding;

            justify-content: space-between;
            &__title {
                font-size: $item-title-size;
                margin-bottom: $item-padding-sm;
            }
            &.row {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            &.row &__sw {
                margin-bottom: 0;
            }
            &.row &__title {
                font-size: $item-title-size;
                margin-bottom: 0;
            }
        }
    }

    .form-item__sw {
        flex: none;
    }
    // 颜色选择器的样式穿透
    :deep(.color-picker) {
        height: 15px !important;
    }
    :deep(.color-picker > .color-item) {
        width: 100% !important;
        border-radius: 2px !important;
        border: none !important;
        margin: 0 !important;
        height: 15px !important;
    }
    :deep(.color-picker > .picker) {
        border-radius: 2px !important;
        border: none !important;

        margin: 0 !important;
    }
    :deep(.scrollbar__inner) {
        height: 100%;
        overflow: auto;
    }
</style>
