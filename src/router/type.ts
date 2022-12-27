import "vue-router";
export enum MenuEnum {
    Catelog = 1, // 菜单
    Page, // 目录
}
// 定义路由的元数据
declare module "vue-router" {
    interface RouteMeta {
        // 名称,展示在菜单和tab上
        title?: string;
        // 当前路由使用的布局,一般在定义路由中使用
        layout?: string;
        type?: MenuEnum;
        // 权限数组
        roles?: string[]; // Controls roles that have access to the page
        // 进入是否需要登录
        requiresAuth: boolean; // Whether login is required to access the current page (every route must declare)

        icon?: string; // 图标
        locale?: string; // The locale name show in side menu and breadcrumb
        hideInMenu?: boolean; // If true, it is not displayed in the side menu
        hideChildrenInMenu?: boolean; // if set true, the children are not displayed in the side menu
        activeMenu?: string; // if set name, the menu will be highlighted according to the name you set
        order?: number; // Sort routing menu items. If set key, the higher the value, the more forward it is
        noAffix?: boolean; // if set true, the tag will not affix in the tab-bar
        residentTab?: boolean; // 如果设置为true,则没有关闭按钮
        ignoreCache?: boolean; // if set true, the page will not be cached
        // 是否不缓存
    }
}
