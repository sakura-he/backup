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
    import { MapChart } from "echarts/charts";
    import {
        DatasetComponent,
        GeoComponent,
        TitleComponent,
        TooltipComponent,
        VisualMapComponent,
    } from "echarts/components";
    import { registerMap, use } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import { provide, VNodeRef } from "vue";
    import VChart, { THEME_KEY } from "vue-echarts";
    import ChinaMapJSON from "../ChinaMap.json";

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
    let updateChartRef: VNodeRef = (ref) => {
        if (ref) {
            chart.value = ref as ChartRefType;
            stopResizeObserver = useResizeObserver({
                el: (ref as ChartRefType).$el,
                observer: () => {
                    execDebounce({
                        callback: () => {
                            chart.value?.resize();
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
        VisualMapComponent,
        GeoComponent,
        MapChart,
        CanvasRenderer,
    ]);
    onUnmounted(() => {
        console.log(chart);
        // 注意 当组件卸载后,为元素绑定的resizeobserver仍然会执行,需要手动卸载
        // https://vuejs.org/guide/essentials/lifecycle.html
        stopResizeObserver();
    });
    provide(THEME_KEY, "");
    registerMap("ChinaMap", ChinaMapJSON as any);
    const option: EChartsOption = reactive({
        tooltip: {},
        visualMap: {
            left: "0",
            top: "10%",
            min: 50,
            max: 100,
            orient: "vertical",
            text: ["", "Price"],
            realtime: true,
            calculable: true,
            inRange: {
                color: ["#dbac00", "#db6e00", "#cf0000"],
            },
        },
        series: [
            {
                name: "ChinaMap",
                type: "map",
                map: "ChinaMap",
                roam: false,
                emphasis: {
                    label: {
                        show: false,
                    },
                },
                selectedMode: false,
                data: [
                    { name: "河北省", value: 15 },
                    { name: "北京市", value: 35 },
                    { name: "河南省", value: 15 },
                    {
                        name: "浙江省",
                        value: 25,
                    },
                    {
                        name: "天津市",
                        value: 45,
                    },
                    { name: "湖北省", value: 85 },
                    {
                        name: "湖南省",
                        value: 25,
                    },
                    { name: "云南省", value: 15 },
                    {
                        name: "四川省",
                        value: 55,
                    },
                    {
                        name: "上海市",
                        value: 25,
                    },
                    {
                        name: "青海",
                        value: 65,
                    },
                    { name: "甘肃省", value: 45 },
                    {
                        name: "Bavettede de flanchet",
                        value: 85,
                    },
                    { name: "上海市", value: 35 },
                    { name: "山西省", value: 75 },
                    {
                        name: "山东省",
                        value: 65,
                    },
                    {
                        name: "陕西省",
                        value: 65,
                    },
                    {
                        name: "辽宁省",
                        value: 85,
                    },
                    { name: "黑龙江省", value: 75 },
                    { name: "吉林省", value: 65 },
                    {
                        name: "辽宁省",
                        value: 55,
                    },
                    { name: "宁夏回族自治区", value: 45 },
                    { name: "Collier", value: 85 },
                    {
                        name: "内蒙古自治区",
                        value: 15,
                    },
                    { name: "江苏", value: 65 },
                    {
                        name: "安徽省",
                        value: 45,
                    },
                    { name: "福建省", value: 85 },
                    {
                        name: "广东省 baronne",
                        value: 65,
                    },
                    { name: "贵州省", value: 95 },
                ],
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
