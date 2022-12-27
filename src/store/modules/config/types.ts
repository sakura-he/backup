export enum deviceEnum {
    "xs" = 1,
    "sm" = 2,
    "md" = 3,
    "lg" = 4,
    "xl" = 5,
    "2xl" = 6,
}
export interface ConfigStore {
    theme: string;
    colorWeak: boolean;
    navbar: boolean;
    menu: boolean;
    hideMenu: boolean;
    menuCollapse: boolean;
    footer: boolean;
    themeColor: string;
    menuWidth: number;
    globalSettings: boolean;
    device: deviceEnum;
    tabBar: boolean;
    menuFromServer: boolean;
    // serverMenu: RouteRecordNormalized[];
    [key: string]: unknown;
}
