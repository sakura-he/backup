import { mock, Random } from "mockjs";
import { setupMock, successResponseWrap, failResponseWrap } from "@/utils/mock";
setupMock({
    setup: () => {
        // workplace 初始数据
        mock(new RegExp("api/workplace/index"), (options: any) => {
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
            data.timeline = [];
            for (let i = 0; i <= 7; i++) {
                data.timeline.push({
                    time: Random.time("MM-dd"),
                    user_name: "admin",
                    create_time: Random.time("MM-dd"),
                    action: Random.integer(0, 4),
                    team: Random.cname(),
                    project_name: Random.cname,
                    team_id: 1,
                    project_id: 3,
                    user_id: 1221,
                });
            }

            return successResponseWrap(data);
        });
        mock(new RegExp("api/workplace/member"), (options) => {
            let data: Record<keyof any, any> = {};
            data.page_total = 8;
            data.page_current = options.url;
            data.page_num = 8; // 一分页 8 条数据
            data.members = [];
            for (let index = 0; index < 8; index++) {
                let recordDay = 7;
                let work: any = new Array(recordDay).fill(0).map((_, index) => {
                    return {
                        date: `12-1${index}`,
                        new_work: Random.integer(0, 10),
                        done: Random.integer(0, 30),
                        undone: Random.integer(0, 30),
                    };
                });
                data.members.push({
                    user: "xx1",
                    status: 1,
                    work: work,
                    today_work: {
                        done: 12,
                        undone: 43,
                        underway: 8,
                    },
                });
            }
            return successResponseWrap(data);
        });
    },
});
