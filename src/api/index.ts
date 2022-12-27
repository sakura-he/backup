import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosDefaults } from "axios";
import { Message, Modal } from "@arco-design/web-vue";
import { useUserStore } from "@/store";
import NProgress from "nprogress";

export interface HttpResponse<T = any> {
    status: number;
    msg: string;
    code: number;
    data: T;
}

function createRequest() {
    let instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        timeout: 5000,
    });
    return instance;
}

export let request = createRequest();
request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 添加token拦截器
        let userStore = useUserStore();
        const token = userStore.token;
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// add response interceptors
request.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 20000) {
            console.log("业务吗错误");
            Message.error({
                content: res.msg || res.code,
                duration: 0,
            });
            return Promise.reject(res);
        }
        return res;
    },
    (error) => {
        console.log("状态码错误");
        console.log(error);
        // http状态码不为200
        Message.error({
            content: error.msg || "Request Error",
            duration: 0,
        });
        return Promise.reject(error);
    }
);
// 请求时添加进度条
request.interceptors.request.use((value) => {
    NProgress.start();
    NProgress.configure({
        showSpinner: false,
    });
    return value;
});
// 请求结束时完成进度条
request.interceptors.response.use(
    (res) => {
        NProgress.done();
        return res;
    },
    (err) => {
        NProgress.done();
        return Promise.reject(err);
    }
);
