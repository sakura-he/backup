<!-- 工作区里面员工数据组件 -->
<template>
    <div class="container tw-w-full tw-h-40 tw-relative">
        <div class="chart tw-w-full tw-h-40 tw-relative" ref="chart"></div>
    </div>
</template>

<script setup lang="ts">
    import dayjs from "dayjs";
    import customParseFormat from "dayjs/plugin/customParseFormat";

    import useResizeObserver from "@/utils/resizeObserver";
    // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
    import * as echarts from "echarts/core";
    // 引入柱状图图表，图表后缀都为 Chartz
    import { BarChart, LineChart, PieChart } from "echarts/charts";
    // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
    import {
        DatasetComponent,
        GridComponent,
        LegendComponent,
        TitleComponent,
        TooltipComponent,
        TransformComponent,
    } from "echarts/components";
    // 标签自动布局，全局过渡动画等特性
    import { LabelLayout, UniversalTransition } from "echarts/features";
    // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
    import { CanvasRenderer } from "echarts/renderers";
    import { useDebounce } from "@/utils/useDebounce";
    dayjs.extend(customParseFormat);
    let myChart: echarts.ECharts;
    let props = defineProps<{
        data: { [props: string]: any };
    }>();
    let { delay, execDebounce } = useDebounce();
    delay.value = 50;
    const chart = ref<null | HTMLDivElement>(null);
    // 注册必须的组件
    echarts.use([
        PieChart,
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        BarChart,
        LabelLayout,
        UniversalTransition,
        CanvasRenderer,
        LineChart,
        LegendComponent,
    ]);

    let sourceData = computed<any>(() => {
        console.log("改变了", props.data);
        let sourceData = props.data.map((item: any) => {
            return [
                item.date,
                item.done,
                item.undone,
                item.new_work,
                item.done + item.undone,
            ];
        });
        sourceData.unshift([
            "工作日期",
            "已完成",
            "未完成",
            "新开启",
            "总任务",
        ]);
        return sourceData;
    });
    let defaultOptions = {
        series: [
            {
                emphasis: {
                    focus: "self",
                },
            },
            {
                emphasis: {
                    focus: "self",
                },
            },
            {
                emphasis: {
                    focus: "self",
                },
            },
        ],
    };
    let options = {
        legend: {
            right: "5%",
            width: "50%",
            itemWidth: 10,
            itemHeight: 10,
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.1)",
            zlevel: 1,

            data: [
                {
                    name: "已完成",
                    icon: "circle",
                    textStyle: {
                        fontSize: 8,
                    },
                },
                {
                    name: "未完成",
                    icon: "circle",
                    textStyle: {
                        fontSize: 8,
                    },
                },
                {
                    name: "新开启",

                    textStyle: {
                        fontSize: 8,
                    },
                },
            ],
        },
        tooltip: {
            trigger: "axis",
        },
        dataset: {
            source: sourceData.value,
        },

        grid: {
            containLabel: true,
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
        },
        xAxis: {
            type: "category",
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                type: "line",
                name: "已完成",

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
            {
                type: "line",
                name: "未完成",

                zlevel: 1,
                emphasis: {
                    focus: "series",
                },
            },
            {
                type: "line",
                name: "新开启",

                emphasis: {
                    focus: "series",
                },
            },
        ],
    };
    let updateMemberDateTimer: number;
    let oldFocusIndex = -1; // 折线图类目轴指定索引的系列设置高index值,在前面
    onMounted(() => {
        myChart = echarts.init(chart.value!);
        myChart.setOption(options);
        updateMemberDateTimer = setInterval(() => {
            let source = options.dataset.source;
            source = source.map((item: any, index: number) => {
                if (item.index !== 0) {
                    let date = dayjs(item[0], "MM-DD");
                    date = date.add(1, "day");
                    item[0] = date.format("MM-DD");
                    item[1] = item[1] + 1;
                    item[2] = item[2] + 1;
                    item[3] = item[3] + 1;
                }
                return item;
            });
            options.dataset.source = options.dataset.source;
            myChart.setOption(options);
        }, 5000) as unknown as number;
        myChart.on("mouseover", (evt: any) => {
            let newSeries = myChart.getOption().series as any;
            console.log(newSeries);
            newSeries.forEach((item: any, index: number) => {
                item.zlevel && (item.zlevel = 0);
                item.label && (item.label = { ...item.label, show: false });
                if (index === evt.seriesIndex) {
                    item.zlevel = 99;
                    if (!item.label) {
                        item.label = { show: true } as any;
                    } else {
                        item.label.show = true;
                    }
                }
            });
            myChart.setOption({
                series: newSeries,
            });
        });
        useResizeObserver({
            el: chart.value!,
            observer: (entries) => {
                execDebounce({
                    callback: () => {
                        myChart.resize();
                    },
                });
            },
        });
    });
    onUnmounted(() => {
        clearInterval(updateMemberDateTimer);
    });
</script>

<style scoped></style>
