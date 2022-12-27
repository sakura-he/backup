import { setupMock, successResponseWrap, failResponseWrap } from "@/utils/mock";
import { mock, Random } from "mockjs";
import preset from "@/router/preset.json";
// 注册user相关接口的mock
setupMock({
    setup: () => {
        mock(new RegExp("/api/user/login"), (options: any) => {
            console.log(options);

            let token = Random.string(32);
            console.log(token);

            const { username, password } = JSON.parse(options.body);
            if (!username) {
                return failResponseWrap(null, "用户名不能为空", 50000);
            }
            if (!password) {
                return failResponseWrap(null, "密码不能为空", 50000);
            }
            if (username === "admin" && password === "admin") {
                window.localStorage.setItem("userRole", "admin");
                return successResponseWrap(token);
            }
            if (username === "user" && password === "user") {
                window.localStorage.setItem("userRole", "user");
                return successResponseWrap(token);
            }
            return failResponseWrap(null, "账号或者密码错误", 50000);
        });
        // 模拟异步路由列表数据
        mock(new RegExp("/api/user/menu"), () => {
            return successResponseWrap(preset);
        });
    },
});
//
