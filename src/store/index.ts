import { createPinia } from "pinia";
let pinia = createPinia();
export { useUserStore } from "./modules/user";
export { useConfigStore } from "./modules/config";
export { useMultipleTabs } from "./modules/mutipleTab";
export { useNavigateStore } from "./modules/navigate";
export { pinia };
