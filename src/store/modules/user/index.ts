import { getMenuList, ILoginData, login } from "@/api/user";
import { router } from "@/router";
import { createAsyncRoutes, firstRoute } from "@/router/routes";
import { NOT_FOUND_ROUTE } from "@/router/routes/base";
import { HOME, LOGIN } from "@/router/routes/constant";
import createCache, { removePrefix } from "@/utils/cache";
import { defineStore } from "pinia";
import { useNavigateStore } from "@/store/modules/navigate";
const STORE_ID = "user";
let cache = createCache(STORE_ID);
export const useUserStore = defineStore(STORE_ID, {
    state: () => {
        return {
            token: (() => cache.getCache("token") || "")(),

            userInfo: {},
        };
    },
    actions: {
        async login(loginData: ILoginData) {
            let navigateStore = useNavigateStore();
            try {
                const res = await login(loginData);
                let token: string = res.data;
                this.token = token;
                // 请求异步路由数组
                await navigateStore.getAsyncMenu();
            } catch (error) {
                return Promise.reject(error);
            }
        },
        logout() {
            // 删除用户信息
            removePrefix(STORE_ID);
            router.replace({ name: LOGIN });
        },
    },
});

type useUserStoreType = typeof useUserStore;
// 监听state指定键值改变并持久化到本地存储
export function presistedUserStore(store: ReturnType<useUserStoreType>) {
    console.log("开始监听");
    store.$subscribe(
        (mutation, state) => {
            console.log("监听到改变了");
            cache.setCache("token", state.token);
        },
        { detached: true }
    );
}
