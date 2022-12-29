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
    import { BarChart } from "echarts/charts";
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
        BarChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        LabelLayout,
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
                            if (isChartResize){
								(ref as ChartRefType).resize();
							}
							isChartResize = true; 
                        },
                    });
                },
            }).stopObserver;
        }
    };
    const option: EChartsOption = reactive({
        animationDurationUpdate: 1000,
        title: {
            text: "销售额",
            left: "center",
        },
        xAxis: {
            type: "category",
        },
        yAxis: {
            type: "value",
        },
        dataset: {
            source: [
                ["test", "sale"],
                ["一月", 1020],
                ["二月", 1500],
                ["三月", 1020],
                ["四月", 1200],
                ["五月", 1730],
                ["六月", 1240],
                ["七月", 1600],
                ["八月", 1400],
            ],
        },
        series: [
            {
                type: "bar",
                name: "sale",
                smooth: true,
                label: {
                    show: false,
                },
                emphasis: {
                    focus: "series",
                    label: {
                        show: true,
                    },
                },
                animationDurationUpdate: 1000,
                universalTransition: true,
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
</style>
