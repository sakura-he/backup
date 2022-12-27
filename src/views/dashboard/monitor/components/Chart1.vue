<template>
    <v-chart class="chart" :option="option" ref="chart" />
</template>

<script setup lang="ts">
    import { useDebounce } from "@/utils/useDebounce";
    import { use } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import type { EChartsOption } from "echarts";
    import { BarChart } from "echarts/charts";
    import {
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        GridComponent,
        DatasetComponent,
    } from "echarts/components";
    import VChart, { THEME_KEY } from "vue-echarts";
    import { ref, provide } from "vue";
    import useResizeObserver from "@/utils/resizeObserver";
    let { delay, execDebounce } = useDebounce();
    delay.value = 50;
    use([
        DatasetComponent,
        CanvasRenderer,
        GridComponent,
        BarChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
    ]);
    let chart = ref<InstanceType<typeof VChart>>();
    provide(THEME_KEY, "");
    onMounted(() => {
        useResizeObserver({
            el: chart.value?.$el,
            observer: (entries) => {
                execDebounce({
                    callback: () => {
                    
                        chart.value?.resize();
                    },
                });
            },
        });
    });
    const option: EChartsOption = reactive({
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

                label: {
                    show: false,
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
</script>

<style scoped>
    .chart {
        height: 100%;
        width: 100%;
    }
</style>
