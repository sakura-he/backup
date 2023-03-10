<template>
    <v-chart
        class="chart"
        :option="option"
        :ref="updateChartRef"
        v-if="renderChart"
        v-bind:update-options="{ lazyUpdate: false }"
    />
</template>

<script setup lang="ts">
    import { useDebounce } from "@/utils/useDebounce";
    import { use } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import type { EChartsOption } from "echarts";
    import { LineChart } from "echarts/charts";
    import {
        LabelLayout,
        UniversalTransition,
    } from "echarts/features";
    import {
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        GridComponent,
        DatasetComponent,
    } from "echarts/components";
    import VChart, { THEME_KEY } from "vue-echarts";
    import { ref, provide, VNodeRef } from "vue";
    import useResizeObserver from "@/utils/resizeObserver";
    let renderChart = ref(false);
    nextTick(() => {
        renderChart.value = true;
    });
    let { delay, execDebounce } = useDebounce();
    delay.value = 150;
    use([
        DatasetComponent,
        CanvasRenderer,
        GridComponent,
        LineChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        LabelLayout,
        UniversalTransition,
    ]);
    let chart = ref<InstanceType<typeof VChart>>();
    provide(THEME_KEY, "");

    let isChartResize = false;
    type ChartRefType = InstanceType<typeof VChart>;
    let stopResizeObserver: () => void;
    let updateChartRef: VNodeRef = (ref) => {
        isChartResize = false;
        if (ref) {
            chart.value = ref as ChartRefType;
            stopResizeObserver = useResizeObserver({
                el: (ref as ChartRefType).$el,
                observer: () => {
                    execDebounce({
                        callback: () => {
                            if (isChartResize) {
                                (
                                    ref as ChartRefType
                                ).resize();
                            }
                            isChartResize = true;
                        },
                    });
                },
            }).stopObserver;
        }
    };
    const option: EChartsOption = reactive({
        tooltip: {
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "rgba(22, 93, 255,1)",
                },
            },
            className: "tooltip",
        },
        grid: {
            left: "3%",
            right: "5%",
            bottom: "3%",
            containLabel: true,
        },
        title: {
            text: "?????????",
            left: "center",
        },
        xAxis: {
            boundaryGap: false,
            type: "category",
        },
        yAxis: {
            type: "value",
        },
        dataset: {
            source: [
                ["test", "sale"],
                ["??????", 1020],
                ["??????", 1500],
                ["??????", 1020],
                ["??????", 1200],
                ["??????", 1730],
                ["??????", 1240],
                ["??????", 1600],
                ["??????", 1400],
            ],
        },
        series: [
            {
                type: "line",
                name: "sale",

                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: "rgba(22, 93, 255,.9)", // 0% ????????????
                            },
                            {
                                offset: 1,
                                color: "rgba(190, 218, 255,.4)", // 100% ????????????
                            },
                        ],
                        global: false, // ????????? false
                    },
                },
                label: {
                    show: true,
                },
                lineStyle: {
                    cap: "round",
                },
                emphasis: {
                    focus: "series",
                    label: {
                        show: true,
                    },
                },
            },
        ],
    });
    onUnmounted(() => {
        stopResizeObserver();
    });
</script>

<style scoped>
    .chart {
        height: 100%;
        width: 100%;
    }
    :deep(.tooltip) {
        border-radius: 4px !important;
        border: none !important;
        background-color: var(
            --color-bg-opacity-2
        ) !important;
        backdrop-filter: blur(4px) !important;
    }
</style>
