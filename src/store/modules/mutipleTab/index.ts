import createCache from "@/utils/cache";
import { defineStore } from "pinia";
import {
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded,
    Router,
    useRouter,
} from "vue-router";
import { WHITE_LIST } from "@/router/routes/constant";
import { router } from "@/router";
const STORE_ID = "mutiple_tab";
type TTabRoute = Omit<RouteLocationNormalized, "matched" | "redirectedFrom">;
interface IMultipleTabState {
    tabs: TTabRoute[];
    cacheList: string[];
}
let cache = createCache(STORE_ID);
export const useMultipleTabs = defineStore(STORE_ID, {
    state: (): IMultipleTabState => {
        return {
            tabs: [],
            cacheList: [],
        };
    },
    actions: {
        // 添加新的标签页
        addTab(route: TTabRoute) {
            if (!this.canAddRoute(route)) {
                return;
            }
            this.tabs.push(route);
            this.updateCacheList();
        },
        // 是否允许添加新的路由对象到数组中
        canAddRoute(route: TTabRoute): boolean {
            let hasTab =
                this.tabs.findIndex((tab) => tab.fullPath === route.fullPath) >=
                0;
            let noAffix = route.meta?.noAffix;
            return !(hasTab || noAffix);
        },
        // 根据当前打开的标签页更新缓存的页面组件
        updateCacheList() {
            let newTabs: string[] = [];
            this.tabs.forEach((tab) => {
                if (this.canCacheTab(tab, newTabs)) {
                    newTabs.push(tab.name as string);
                }
            });
            this.cacheList = newTabs;
        },

        // 是否缓存标签页
        canCacheTab(route: TTabRoute, arr: string[]): boolean {
            if (
                !route.name ||
                typeof route.name == "symbol" ||
                route?.meta?.ignoreCache ||
                WHITE_LIST.includes(route.name!) ||
                arr.includes(route.name)
            ) {
                return false;
            }
            return true;
        },
        // 关闭标签页
        closeTab(index: number) {
            // 判断当前关闭的标签页时不是正在浏览的标签页
            let currentRoute = router.currentRoute.value;
            if (this.tabs[index].fullPath === currentRoute.fullPath) {
                // 关闭的时正在浏览的标签页
                this.closeCurrentTab(index);
            } else {
                this.tabs.splice(index, 1);
            }
            console.log(currentRoute);
            // 在keep-alive的缓存数组中同时一并删除(currentRouter是.value不存在)
            this.updateCacheList();
        },
        // 关闭当前标签页
        closeCurrentTab(index: number) {
            if (index >= this.tabs.length - 1) {
                // 当前打开的页面为最后一个标签页,关闭后激活最后一个标签
                this.tabs.pop();
                // 跳转到
                router.replace({ name: this.tabs[this.tabs.length - 1].name! });
            } else {
                // 不是最后的标签,关闭后激活右侧的标签
                router.replace({ name: this.tabs[index + 1].name! });
                this.tabs.splice(index, 1);
            }
        },
        closeCacheTab(name: string) {
            let cacheTabIndex = this.cacheList.findIndex(
                (item) => item === name
            );
            if (cacheTabIndex >= 0) {
                this.cacheList.splice(cacheTabIndex, 1);
            }
        },
        // 关闭右侧标签页
        closeRigthTabs(tabIndex: number) {
            let currentRoute = router.currentRoute.value;
            let newTabs: TTabRoute[];
            newTabs = this.tabs.filter((item, index) => {
                // 判断索引是否在左侧
                let isSaveIndex = index <= tabIndex;
                // 判断是否常驻tab(固定的)
                let isResidentTab = item?.meta?.residentTab;
                return isSaveIndex || isResidentTab;
            });
            this.tabs = newTabs;
            this.updateCacheList();
            // 判断当前打开的标签页有没有关闭,没有关闭就不跳转路由,关闭了,跳转到tabIndex页面
            let hasCurrentRoute =
                newTabs.findIndex(
                    (tab) => tab.fullPath === currentRoute.fullPath
                ) > 0
                    ? true
                    : false;
            if (!hasCurrentRoute) {
                router.replace(this.tabs[tabIndex].fullPath);
            }
        },
        // 关闭左侧标签页
        closeLeftTabs(tabIndex: number) {
            let currentRoute = router.currentRoute.value;
            let newTabs: TTabRoute[];
            newTabs = this.tabs.filter((item, index) => {
                let isSaveIndex = index >= tabIndex;
                let isResidentTab = item?.meta?.residentTab;
                return isSaveIndex || isResidentTab;
            });
            this.tabs = newTabs;
            this.updateCacheList();
            // 判断当前打开的标签页有没有关闭,没有关闭就不跳转路由,关闭了,跳转到tabIndex页面
            let hasCurrentRoute =
                newTabs.findIndex(
                    (tab) => tab.fullPath === currentRoute.fullPath
                ) > 0
                    ? true
                    : false;
            if (!hasCurrentRoute) {
                router.replace(this.tabs[tabIndex].fullPath);
            }
        },
        // 关闭所有标签页
        closeAllTabs() {
            let newTabs: TTabRoute[];
            newTabs = this.tabs.filter((item, index) => {
                let isResidentTab = item?.meta?.residentTab;
                return isResidentTab;
            });
            this.tabs = newTabs;
            this.updateCacheList();
        },
        // 关闭其他标签页
        closeOtherTabs(tabIndex: number) {
            let currentRoute = router.currentRoute.value;
            let newTabs: TTabRoute[];
            newTabs = this.tabs.filter((item, index) => {
                let isSaveIndex = index == tabIndex;
                let isResidentTab = item?.meta?.residentTab;
                return isSaveIndex || isResidentTab;
            });
            this.tabs = newTabs;
            this.updateCacheList();
            // 判断当前打开的标签页有没有关闭,没有关闭就不跳转路由,关闭了,跳转到tabIndex页面
            let hasCurrentRoute =
                newTabs.findIndex(
                    (tab) => tab.fullPath === currentRoute.fullPath
                ) > 0
                    ? true
                    : false;
            if (!hasCurrentRoute) {
                router.replace(this.tabs[tabIndex].fullPath);
            }
        },
        // 切换固定状态
        switchResidentTab(index: number) {
            this.tabs[index].meta = this.tabs[index].meta || {};
            this.tabs[index].meta.residentTab =
                !this.tabs[index].meta.residentTab;
        },
    },
});

// type useUserStoreType = typeof useUserStore;
// // 监听state指定键值改变并持久化到本地存储
// export function presistedUserStore(store: ReturnType<useUserStoreType>) {
// 	console.log("开始监听");
// 	store.$subscribe(
// 		(mutation, state) => {
// 			console.log("监听到改变了");
// 			cache.setCache("token", state.tabs);
// 		},
// 		{ detached: true }
// 	);
// }
