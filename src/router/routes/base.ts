// import { REDIRECT_ROUTE_NAME } from './constants';

// export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');

// export const REDIRECT_MAIN = {
//     path: '/redirect',
//     name: 'redirectWrapper',
//     component: DEFAULT_LAYOUT,
//     meta: {
//         requiresAuth: true,
//         hideInMenu: true,
//     },
//     children: [
//         {
//             path: '/redirect/:path',
//             name: REDIRECT_ROUTE_NAME,
//             component: () => import('@/views/redirect/index.vue'),
//             meta: {
//                 requiresAuth: true,
//                 hideInMenu: true,
//             },
//         },
//     ],
// };
import { DEFAULT_LAYOUT } from "@/layout/const";
import { NOT_FOUND } from "./constant";
// 404路由
export const NOT_FOUND_ROUTE = {
    path: "/:pathMatch(.*)*",
    name: NOT_FOUND,
    meta: {
        layout: DEFAULT_LAYOUT,
    },
    component: () => import("@/views/not-found/index.vue"),
};
