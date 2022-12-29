import { request } from "./index";

export function getMonitorSale(type: number) {
	return request("api/monitor/sale", {
		method: "get",
		params: {
			type
		}
	});
}
