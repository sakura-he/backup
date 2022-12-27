import { request } from "./index";
export interface ILoginData {
    username: string;
    password: string;
}
export function login({ username, password }: ILoginData) {
    return request.post("/api/user/login", {
        username,
        password,
    });
}
export function getMenuList() {
    return request.get("/api/user/menu");
}
