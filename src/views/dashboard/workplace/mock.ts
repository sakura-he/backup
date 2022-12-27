import { mock, Random } from "mockjs";
import { setupMock, successResponseWrap, failResponseWrap } from "@/utils/mock";
setupMock({
    setup: () => {
        type kk = {
            name: string;
            age: 13;
        };
        type aa = Pick<kk, "name">;
        let aaa: aa = {
            name: "234",
        };
        // workplace 初始数据
        mock(new RegExp("api/workplace/getIndex"), (options: any) => {
            let data: { [props: string]: any } = {};
            data.user = {
                nick_name: "admin",
                work: {
                    underway: 10,
                    done: 34,
                    undone: 26,
                    total: 70,
                },
            };
            data.slide = [];
            data.shortcut = [];
            data.timeline = [
                {
                    time: "12:00:00",
                    user: "admin",
                    create_time: "12:00:00",
                    action: 1,
                    team: "test",
                    project_name: "测试项目",
                    team_id: 1,
                    project_id: 3,
                    user_id: 1221,
                },
            ];
            successResponseWrap(data);
        });
        // 模拟异步路由列表数据
        mock(new RegExp("/api/user/menu"), () => {
            // return successResponseWrap(preset);
        });
    },
});
