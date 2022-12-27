import createCache from "@/utils/cache";
import defaultSetting from "@/config/setting.json";
import useColorMode from "@/utils/colorMode";
import { setThemeColor } from "@/utils/themeColor";
import { defineStore } from "pinia";
import { ConfigStore, deviceEnum } from "./types";
const STORE_ID = "config_store";
let cache = createCache(STORE_ID);
let { isDarkMode } = useColorMode();
export const useConfigStore = defineStore({
	id: STORE_ID,
	state: (): ConfigStore => {
		let config = cache.getCache("config") || defaultSetting;
		setupInit(config);
		return {
			...config,
		};
	},
	actions: {
		updateMenuWidth(width: number) {
			this.menuWidth = width;
		},
		setDevice(device: deviceEnum) {
			this.device = device;
		},
		setThemeColor(color: string) {
			this.themeColor = color;
			// 当配置对象的颜色改变后,
			setThemeColor(color, isDarkMode.value);
		},
		updateColorWeek(value: boolean) {
			this.colorWeak = value;
			updateColorWeek(value)
		}
	},
});
function setupInit(config: ConfigStore) {
	// 初始化颜色
	setThemeColor(config.themeColor, isDarkMode.value);
	updateColorWeek(config.colorWeak);
}
type useConfigStoreType = typeof useConfigStore;
// 监听state指定键值改变并持久化到本地存储
export function presistedConfigStore(store: ReturnType<useConfigStoreType>) {
	store.$subscribe(
		(mutation, state) => {
			cache.setCache("config", state);
		},
		{ detached: true, immediate: true }
	);
}
function updateColorWeek(value: boolean) {
	document.documentElement.style.filter = value ? 'invert(80%)' : 'none';
}