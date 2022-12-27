import { DEFAULT_LAYOUT } from "@/layout/const";
import { createRouter, createWebHashHistory } from "vue-router";
import createRouterGuard from "./gruad";
import "./type.ts";
import { NOT_FOUND, LOGIN, HOME } from "./routes/constant";
let router = createRouter({
    history: createWebHashHistory(),
    // 预置的路由,包含登录页和404页,不需要鉴权
    routes: [
        {
            path: "/",
            name: HOME,
            redirect: "login",
        },
        {
            path: "/login",
            name: LOGIN,
            component: () => import("@/views/login/login2.vue"),
            meta: {
                requiresAuth: false,
                layout: DEFAULT_LAYOUT,
                noAffix: true,
            },
        },
    ],
});
createRouterGuard(router);
export { router };
