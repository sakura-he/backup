import { RouteRecordRaw, RouterView } from "vue-router";
import { MenuEnum } from "../type";
// 匹配views里面所有的.vue文件，动态引入
const modules = import.meta.glob("/src/views/**/*.vue");
// modules应该是一下结构的对象
// /src/views/login/index.vue: () => import("/src/views/login/index.vue"),
// /src/views/login/login2.vue: () => import("/src/views/login/login2.vue"),
// /src/views/setting/setting.vue: () => import("/src/views/setting/setting.vue"),
export function getModulesKey() {
    return Object.keys(modules).map((item) =>
        item.replace("/src/views/", "").replace(".vue", "")
    );
}

// 转换后端传递的路由表配置数组 遍历配置数组的每个路由元素,通过coverRoute函数转换成vueRouter路由对象,并将转换完成的路由对象数组返回
// export function createAsyncRoutes2(
// 	asyncRoutes: Array<any>,
// 	topRoute = true
// ): RouteRecordRaw[] {
// 	let routeRecords = asyncRoutes.map((asyncRoute) => {
// 		const coveredRoute = coverRoute(asyncRoute, topRoute);
// 		if (asyncRoute.children && asyncRoute.children.length) {
// 			coveredRoute.children = createAsyncRoutes(asyncRoute.children, false);
// 		}
// 		return coveredRoute;
// 	});
// 	return routeRecords;
// }

export function createAsyncRoutes(
    asyncRoutes: Array<any>,
    parentPath: string = "/"
): RouteRecordRaw[] {
    let routeRecords: any[] = [];
    // 如果是单页,就返回单页,是目录,返回目录所有单页
    asyncRoutes.forEach((route) => {
        if (route.meta.type === MenuEnum["Catelog"]) {
            routeRecords.push(
                ...createAsyncRoutes(
                    route.children,
                    parentPath + route.path + "/"
                )
            );
        } else {
            routeRecords.push(coverRoute(route, parentPath));
        }
    });

    return routeRecords;
}

// 将后台返回的路由数据中的一项转换成vueRouter支持的路由记录对象
// function coverRoute(asyncRoute: any, topRoute: boolean): RouteRecordRaw {
// 	console.log("path:", asyncRoute.path);
// 	let routeRecordRaw: RouteRecordRaw = {
// 		path: topRoute ? `/${asyncRoute.path}` : asyncRoute.path, // 顶层的路由记录因该是以/开头的路径
// 		name: asyncRoute.name || Symbol(asyncRoute.path), // symbol,唯一
// 		meta: {
// 			"type": asyncRoute.meta.type,
// 			"title": asyncRoute.meta.title,
// 			"layout": asyncRoute.meta?.layout,
// 			"roles": asyncRoute.meta?.roles,
// 			"requiresAuth": asyncRoute.meta?.requiresAuth,
// 			"icon": asyncRoute.meta?.icon,
// 			"locale": asyncRoute.meta?.locale,
// 			"hideInMenu": asyncRoute.meta?.hideInMenu,
// 			"hideChildrenInMenu": asyncRoute.meta?.hideChildrenInMenu,
// 			"activeMenu": asyncRoute.meta?.activeMenu,
// 			"order": asyncRoute.meta?.order,
// 			"noAffix": asyncRoute.meta?.noAffix,
// 			"ignoreCache": asyncRoute.meta?.ignoreCache
// 		},
// 		component: <any>null,
// 	};
// 	// 如果当前路由配置对象是一个目录,则组件为viewrouter
// 	if (asyncRoute.type === MenuEnum["Catelog"] && asyncRoute.children && asyncRoute.children.length) {
// 		routeRecordRaw.component = RouterView;
// 	} else {
// 		// 不是目录,去views目录中寻找对应的vue页面
// 		routeRecordRaw.component = loadRouteView(asyncRoute.component);
// 	}
// 	return routeRecordRaw;
// }
// 将后台返回的路由数据中的一项转换成vueRouter支持的路由记录对象
function coverRoute(asyncRoute: any, parentPath: string): RouteRecordRaw {
    console.log("path:", asyncRoute.path);
    let routeRecordRaw: RouteRecordRaw = {
        path: parentPath + asyncRoute.path,
        name: asyncRoute.name || Symbol(asyncRoute.path), // symbol,唯一
        meta: asyncRoute.meta || {},
        component: <any>null,
    };
    // 如果当前路由配置对象是一个目录,则组件为viewrouter
    if (
        asyncRoute.type === MenuEnum["Catelog"] &&
        asyncRoute.children &&
        asyncRoute.children.length
    ) {
        routeRecordRaw.component = RouterView;
    } else {
        // 不是目录,去views目录中寻找对应的vue页面
        routeRecordRaw.component = loadRouteView(asyncRoute.component);
    }
    return routeRecordRaw;
}
// 根据后端的路由配置components字段值,动态加载import.meta.glob中的动态组件
export function loadRouteView(component: string) {
    try {
        // 在import.meta.glob生成的vue页面对象中,寻找出对应属性名包含传入的component名字符串的属性
        const findComponentPath = Object.keys(modules).find((key) => {
            return key.includes(`${component}.vue`);
        });
        if (findComponentPath) {
            return modules[findComponentPath];
        }
        throw Error(`找不到组件${component}，请确保组件路径正确`);
    } catch (error) {
        // console.error(error);
        return RouterView;
    }
}
// 寻找vue router的路由记录对象中第一个页面,作为登陆后跳转的首页
export function firstRoute(
    routes: RouteRecordRaw[]
): RouteRecordRaw | undefined {
    for (const route of routes) {
        // 判断当前路由记录是不是个目录,是的话,尝试在路由记录的chlidren记录中寻找
        if (route.meta?.type === MenuEnum["Catelog"] && route.children) {
            let children = firstRoute(route.children);
            if (children) {
                return children;
            }
        }
        // 如果遍历中遇到meta.type=Page类型的路由记录,说明是个单页,终止遍历并返回,
        if (route.meta?.type === MenuEnum["Page"]) {
            return route;
        }
    }
}
