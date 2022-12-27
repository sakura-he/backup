import { request } from "./index";

export function getWorkplaceIndex() {
    return request("api/workplace/index", {
        method: "get",
    });
}
export function getWorkplaceMember(page: number) {
    return request("api/workplace/member", {
        method: "get",
        params: {
            page,
        },
    });
}
