export function setupMock({
    mock = true,
    setup,
}: {
    mock?: boolean;
    setup: () => void;
}) {
    if (import.meta.env.VITE_MOCKJS) {
        console.log("开始注册");
        setup();
    }
}
export const successResponseWrap = (data: unknown) => {
    return {
        data,
        status: "ok",
        msg: "请求成功",
        code: 20000,
    };
};

export const failResponseWrap = (data: unknown, msg: string, code = 50000) => {
    return {
        data,
        status: "fail",
        msg,
        code,
    };
};
