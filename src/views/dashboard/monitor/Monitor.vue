<template>
    <div class="page">
        <div
            class="header tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-grid-flow-row tw-gap-2 tw-mb-2"
        >
            <a-card
                class="!tw-rounded-[4px]"
                v-for="item in 4"
                :bordered="false"
            >
                <template v-slot:title>
                    <div class="tw-text-body-3"
                        >销售分析</div
                    >
                </template>
                <template #extra>
                    <a-link> 刷新 </a-link>
                </template>
                <div>
                    <div
                        class="header__value tw-text-title-4"
                    >
                        ￥
                        <a-statistic
                            :value="125670"
                            show-group-separator
                            :start="true"
                            :animation-duration="1000"
                            animation
                        >
                            <template #suffix>
								<icon-caret-up style="color: green"/>
                              
                            </template>
                        </a-statistic>
                    </div>
                    <div
                        class="header__chart tw-w-full tw-h-14"
                    ></div>
                    <div
                        class="header__footer tw-text-body-2"
                        >累计销售额:$1222670</div
                    >
                </div>
            </a-card>
        </div>
        <!-- 销售表格 -->
        <a-card
            class="chart2 !tw-rounded-[4px] tw-mb-2"
            :bordered="false"
        >
            <template v-slot:title>
                <div class="chart2__header tw-w-full">
                    <a-tabs
                        :type="'line'"
                        size="small"
                        :header-padding="false"
                        :hide-content="true"
                    >
                        <template v-slot:extra>
                            <div class="tw-text-body-3">
                                <a-link> 刷新 </a-link>
                            </div>
                        </template>
                        <div class="tw-text-title-1">
                            <a-tab-pane
                                key="1"
                                title="销售额"
                            >
                            </a-tab-pane>
                            <a-tab-pane
                                key="2"
                                title="访问量"
                            >
                            </a-tab-pane>
                            <a-tab-pane
                                key="3"
                                title="历史销售额"
                            >
                            </a-tab-pane>
                        </div>
                    </a-tabs>
                </div>
            </template>

            <div class="tw-flex tw-flex-wrap -tw-mx-1">
                <!-- chart2 -->
                <div
                    class="chart2__chart tw-min-w-[300px] tw-mx-1 tw-flex-1 tw-h-[420px] tw-grow-[2]"
                >
                    <Chart1 />
                </div>
                <div
                    class="chart2__table tw-flex-col tw-flex tw-min-w-[300px] tw-h-[420px] tw-box-border tw-pl-2 tw-overflow-hidden tw-mx-1 tw-flex-1 tw-grow-[1]"
                >
                    <span
                        class="tw-flex-none tw-text-title-1 tw-pb-4"
                        >销售排名</span
                    >
                    <a-table
                        class="tw-flex-1 tw-min-h-0"
                        :bordered="false"
                        size="small"
                        :columns="columns"
                        :scroll="scroll"
                        :data="data"
                /></div>
            </div>
        </a-card>
        <!-- 销售分步地区表格 -->
        <div class="tw-flex tw-flex-wrap">
            <a-card
                class="chart2 !tw-rounded-[4px] tw-flex-1 tw-min-w-[300px] tw-bg-p-1 tw-mb-2"
                :bordered="false"
            >
                <span
                    class="tw-flex-none tw-text-title-1 tw-pb-4"
                    >销售地区分布</span
                >
                <div
                    class="tw-flex-1 !tw-rounded-[4px] tw-mb-2 tw-h-[300px]"
                >
                    <Chart2 />
                </div>
            </a-card>

            <a-card
                class="chart2 !tw-rounded-[4px] tw-flex-1 tw-min-w-[300px] tw-bg-p-1 tw-mb-2"
                :bordered="false"
            >
                <span
                    class="tw-flex-none tw-text-title-1 tw-pb-4"
                    >销售地区分布</span
                >
                <div
                    class="tw-flex-1 !tw-rounded-[4px] tw-mb-2 tw-h-[300px]"
                >
                    <Chart2 />
                </div>
            </a-card>
        </div>
        <!-- chart4 -->
        <div class="chart4"></div>
    </div>
</template>

<script setup lang="ts">
    import Chart1 from "./components/Chart1.vue";
    import Chart2 from "./components/Chart2.vue";
    const columns = [
        {
            title: "销售团队",
            dataIndex: "name",
        },
        {
            title: "销售金额",
            dataIndex: "salary",
        },
        {
            title: "备注",
            dataIndex: "address",
            width: "auto",
        },
    ];

    const scroll = {
        x: "100%",
        y: "100%",
    };

    const data = reactive([
        {
            key: "1",
            name: "一组",
            salary: 23000,
            address:
                "卢萨卡交罚款善良的啊发射点发生为人情味",
            email: "jane.doe@example.com",
            expand: "Expand Content",
        },
        {
            key: "2",
            name: "二组",
            salary: 25000,
            address:
                "卢萨卡交罚款善良的啊发射点发生为人情味",
            email: "alisa.ross@example.com",
        },
        {
            key: "3",
            name: "三组",
            salary: 22000,
            address:
                "卢萨卡交罚款善良的啊发射点发生为人情味",
            email: "kevin.sandra@example.com",
        },
        {
            key: "4",
            name: "五组",
            salary: 17000,
            address:
                "卢萨卡交罚款善良的啊发射点发生为人情味",
            email: "ed.hellen@example.com",
        },
        {
            key: "5",
            name: "四组",
            salary: 27000,
            address:
                "卢萨卡交罚款善良的啊发射点发生为人情味",
            email: "william.smith@example.com",
        },
        {
            key: "6",
            name: "六组",
            salary: 27000,
            address:
                "卢萨卡交罚款善良的啊发射点发生为人情味",
            email: "william.smith@example.com",
        },
        {
            key: "7",
            name: "九组",
            salary: 27000,
            address:
                "卢萨卡交罚款善良的啊发射点发生为人情味",
            email: "william.smith@example.com",
        },
    ]);
</script>

<style scoped lang="scss">
    .page {
        width: 100%;
        box-sizing: border-box;
        padding-bottom: 12px;
    }
    :deep(.arco-card-header) {
        height: max-content !important;
        padding-bottom: 0 !important;
        border: none !important;
    }
    :deep(.arco-card-body) {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }
</style>
