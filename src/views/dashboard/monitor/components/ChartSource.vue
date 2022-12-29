<template>
    <v-chart
        v-if="renderChart"
        class="chart"
        :option="option"
        :ref="updateChartRef"
        :autoresize="false"
    />
</template>

<script lang="ts" setup>
    import useResizeObserver from "@/utils/resizeObserver";
    import { useDebounce } from "@/utils/useDebounce";
    import type { EChartsOption } from "echarts";
    import {
        DatasetComponent,
        TitleComponent,
        TooltipComponent,
    } from "echarts/components";
    import { use } from "echarts/core";
    import { PieChart } from "echarts/charts";
    import { CanvasRenderer } from "echarts/renderers";
    import { provide, VNodeRef } from "vue";
    import VChart, { THEME_KEY } from "vue-echarts";
    import { DatasetOption } from "echarts/types/dist/shared";

    let { delay, execDebounce } = useDebounce();
    delay.value = 150;
    // 等组件挂载到dom上在渲染,延迟一下优化卡顿
    let renderChart = ref(false);
    let chart = ref<InstanceType<typeof VChart>>();
    nextTick(() => {
        renderChart.value = true;
    });
    let stopResizeObserver: () => void;
    type ChartRefType = InstanceType<typeof VChart>;
    let isChartResize = false;
    let updateChartRef: VNodeRef = (ref) => {
        isChartResize = false;
        if (ref) {
            chart.value = ref as ChartRefType;
            stopResizeObserver = useResizeObserver({
                el: (ref as ChartRefType).$el,
                observer: () => {
                    execDebounce({
                        callback: () => {
                            isChartResize &&
                                chart.value?.resize();
                            isChartResize = true;
                        },
                    });
                },
            }).stopObserver;
        }
    };

    use([
        TitleComponent,
        DatasetComponent,
        TooltipComponent,
        PieChart,
        CanvasRenderer,
    ]);
    onUnmounted(() => {
        // 注意 当组件卸载后,为元素绑定的resizeobserver仍然会执行,需要手动卸载
        // https://vuejs.org/guide/essentials/lifecycle.html
        stopResizeObserver();
    });
    provide(THEME_KEY, "");
    let highlightIndex = 0;

    let option: EChartsOption = reactive({
        tooltip: {
            position: (
                _a,
                _b,
                _c,
                tooltip,
                { viewSize }
            ) => {
                let tooltipWidth = (_c as HTMLDivElement)
                    .offsetWidth;
                let tooltipHeight = (_c as HTMLDivElement)
                    .offsetHeight;
                let chartWith = viewSize[0];
                let chartHeight = viewSize[1];
                let left = chartWith / 2 - tooltipWidth / 2;
                let top =
                    chartHeight / 2 - tooltipHeight / 2;
                return {
                    left,
                    top,
                };
            },
            padding: 0,
            formatter: "{c} <br /> {d}% ",
            confine: true,
            borderWidth: 0,
            trigger: "item",
            backgroundColor: "rgba(0,0,0,0)",
            className: "chart_test",
        },
        dataset: {
            source: [
                ["source", "value"],
                ["百度", 25],
                ["Youtube", 29],
                ["哔哩哔哩", 25],
                ["Github", 22],
                ["谷歌", 28],
                ["4chan", 24],
                ["贴吧", 23],
                ["推特", 17],
                ["微信", 21],
                ["Telegram", 18],
            ],
        } as DatasetOption,
        series: [
            {
                name: "平台",
                type: "pie",
                // roseType:"area",
                label: {
                    show: true,
                    formatter: "{c} \n {d}%",
                },
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "rgba(255,255,255,0.8)",
                    borderWidth: 5,
                    // borderType:'dotted',
                },
                emphasis: {
                    label: {
                        fontWeight: "bold",
                    },
                },
                radius: ["30%", "70%"],
            },
        ],
    });
    let timer = setInterval(() => {
        let dataset = option.dataset as DatasetOption;
        let dataestLength = dataset.source
            ?.length as number;
        if (renderChart.value && chart.value) {
            // 取消之前高亮的图形
            chart.value.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: highlightIndex,
            });
            // 高亮新的
            if (++highlightIndex >= dataestLength - 1) {
                highlightIndex = 0;
            }
            chart.value.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: highlightIndex,
            });
            chart.value.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: highlightIndex,
            });
        }
    }, 1500);
    onUnmounted(() => {
        clearInterval(timer);
    });
</script>

<style scoped>
    .chart {
        height: 100%;
        width: 100%;
    }
    :deep(.chart_test) {
        font-weight: bold !important;
        text-align: center !important;
        box-shadow: none !important;
        width: 20%;
    }
    :deep(.chart_test *) {
        text-align: center !important;
    }
</style>
<style></style>
