<template>
    <v-chart
        class="chart"
        :option="option"
        ref="chart"
        :autoresize="false"
    />
</template>

<script setup lang="ts">
    import type { EChartsOption } from "echarts";
    import { MapChart } from "echarts/charts";
    import ChinaMapJSON from "../ChinaMap.json";
    import { useDebounce } from "@/utils/useDebounce";

    import {
        DatasetComponent,
        GeoComponent,
        TitleComponent,
        TooltipComponent,
        VisualMapComponent,
    } from "echarts/components";
    import { use, registerMap } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import { provide } from "vue";
    import VChart, { THEME_KEY } from "vue-echarts";
    import useResizeObserver from "@/utils/resizeObserver";
    let { delay, execDebounce } = useDebounce();
    delay.value = 50;
    use([
        TitleComponent,
        DatasetComponent,
        TooltipComponent,
        VisualMapComponent,
        GeoComponent,
        MapChart,
        CanvasRenderer,
    ]);
    let chart = ref<InstanceType<typeof VChart>>();
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
