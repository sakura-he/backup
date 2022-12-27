import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { router } from "@/router/index";
import { pinia } from "./store";
import { Message } from "@arco-design/web-vue";
import "nprogress/nprogress.css";
import "@/api";
import "@/mock";
let app = createApp(App);
Message._context = app._context;
import "@arco-design/web-vue/dist/arco.css";

// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
app.use(router);
router.isReady().then((res) => {
    app.mount("#app");
});
app.use(pinia);
app.use(ArcoVueIcon);
