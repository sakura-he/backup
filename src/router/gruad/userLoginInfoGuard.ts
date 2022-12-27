import { Router } from "vue-router";
import { useUserStore } from "@/store";
import { useNavigateStore } from "@/store/modules/navigate";
import NProgress from "nprogress";
import { WHITE_LIST } from "@/router/routes/constant";
import { Message } from "@arco-design/web-vue";
// 用户登录验证
export default function setupUserLoginInfoGuard(router: Router) {
    router.beforeEach((to, from, next) => {
        NProgress.start();
        console.log("守卫", to.name);
        let userStore = useUserStore();
        let navigateStore = useNavigateStore();
        // 已登录用户
        if (userStore.token) {
            // 判断登录后加载过路由了吗
            if (navigateStore.asyncMenuList.length) {
                console.log("已经将路由表载入到router了");
                next(); // 添加过路由了,继续跳转
            } else {
                console.log("登录,但是没有路由表");
                navigateStore.getAsyncMenu().then((res) => {
                    // 请求路由成功后重新跳转
                    next({ ...to, replace: true });
                });
            }
            return;
        }
        // 白名单路由直接跳转
        if (WHITE_LIST.findIndex((item) => item === to.name) >= 0) {
            next();
            return;
        }
        // 未登录用户 没有命中白名单跳转登录页
        Message.error({
            content: "请登陆后访问",
        });
        next({ name: "login", query: { toUrl: to.fullPath }, replace: true });
    });
}

// 全新登陆:登陆获取用户token->开始跳转用户访问的页面->跳转时判断vuex里有没有路由(如果有基本上就加载到router里面了),有就跳,咩有就获取路由,加载到vuex,route里面->转成路由并跳转
// 刷新:初始化是判断本地有没有路由数据->有就加载到vuex里并转成真实路由,没有就不加载,在跳转的时候从后台获取
// 方案二
// 全新登陆的时候异步获取用户信息一并获取路由信息,并加载到router里,跳转的时候判断有没有登陆,登陆就继续跳转,未登录就跳转登录
// 刷新,从本地获取用户信息,包括路由,并加载到vue中
let isAddedRoute = false;
// 在前置守卫中(路由没有跳转前)判断用户的权限added
let routesMap = [
    {
        name: "status",
        path: "/status",
        meta: {
            layout: "AppLayoutDefault",
        },
        component: "Status",
    },
    {
        name: "config",
        path: "/config",
        meta: {
            layout: "AppLayoutDefault",
        },
        component: "Config",
        children: [
            {
                name: "config1",
                path: "config1",
                meta: {
                    layout: "AppLayoutDefault",
                },
                component: defineComponent({
                    render() {
                        return h("div", "config/config1");
                    },
                }),
            },
            {
                name: "config2",
                path: "config2",
                meta: {
                    layout: "AppLayoutDefault",
                },
                component: defineComponent({
                    render() {
                        return h("div", "config/config2");
                    },
                }),
            },
        ],
    },
];
