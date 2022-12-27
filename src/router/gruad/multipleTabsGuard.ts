import { Router } from "vue-router";
import { recursiveTreeByLastLevel } from "@/utils/breadcrumb";
import NProgress from "nprogress";
import { useMultipleTabs, useNavigateStore } from "@/store";
export default function setupMultipleTabsGuard(router: Router) {
	router.beforeResolve((to, from) => {

		let multipleStore = useMultipleTabs();
		let navigateStore = useNavigateStore();
		let { matched, redirectedFrom, ...opt } = to;
		multipleStore.addTab(opt);
		navigateStore.updateBreadcrumb(to.name as string);
		NProgress.done();


	});
}
