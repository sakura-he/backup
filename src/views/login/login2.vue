<template>
    <view class="container">
        <!-- <view class="logo">11</view> -->
        <view class="banner">
            <a-carousel
                class="swiper"
                :default-current="2"
                @change="handleChange"
                indicator-type="slider"
                :auto-play="true"
            >
                <a-carousel-item v-for="image in images" class="swiper__item">
                    <img
                        :src="image"
                        :style="{
                            width: '100%',
                        }"
                    />
                </a-carousel-item>
            </a-carousel>
        </view>
        <view class="content">
            <view class="form">
                <div class="login__title"> Nest Arco Admain </div>
                <div class="login__sub-title"> 欢迎使用 </div>
                <div class="login__err-msg"></div>
                <!-- 登录表单 -->
                <a-form layout="vertical" :model="form" class="login__form">
                    <a-form-item field="11">
                        <a-input
                            v-model="form.username"
                            placeholder="用户名"
                            id="username"
                        >
                            <template #prefix>
                                <icon-user />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item field="post">
                        <a-input-password
                            v-model="form.userpw"
                            placeholder="密码"
                        >
                            <template #prefix>
                                <icon-lock />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item field="isRemenber">
                        <a-checkbox v-model="form.isRemenber">
                            记住密码
                        </a-checkbox>
                        <a-button
                            html-type="submit"
                            class="login__forget"
                            type="text"
                            size="mini"
                            >忘记密码</a-button
                        >
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            html-type="submit"
                            long
                            type="primary"
                            @click="onLogin"
                            :loading="loading"
                            >登录</a-button
                        >
                    </a-form-item>
                </a-form>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { getCurrentInstance } from "vue";
    import { useUserStore } from "@/store";
    import { useRouter, useRoute } from "vue-router";
    import { login } from "@/api/user";
    import { Message } from "@arco-design/web-vue";
    import useLoading from "@/utils/useLoading";
    import login1 from "@/assets/login1.jpg";
    import login2 from "@/assets/login2.jpg";
    import login3 from "@/assets/login3.jpg";
    import { HOME } from "@/router/routes/constant";
    let userStore = useUserStore();
    let router = useRouter();
    let route = useRoute();
    let { loading, setLoading } = useLoading(false);

    const images = [login1, login2, login3];
    const handleChange = (value: number) => {};
    let form = reactive({
        username: "",
        userpw: "",
        agree: false,
        isRemenber: false,
    });

    function onLogin() {
        // 防止重复点击登录
        if (loading.value) return;
        setLoading(true);
        userStore
            .login({ username: form.username, password: form.userpw })
            .then(() => {
                if (route.query.toUrl) {
                    Message.success("登录成功!正在跳转登录前的页面");
                    router.replace({ path: <string>route.query.toUrl });
                } else {
                    Message.success("欢迎使用");
                    router.replace({ name: HOME, replace: true });
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }

    .banner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .content {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        padding-left: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .swiper {
        height: 100%;

        .siwper__item {
            height: 100%;
        }
    }

    .form {
        width: 340px;
        border-radius: var(--border-radius-small);
        // background-color: rgba(255, 255, 255, .6);
        background-image: linear-gradient(
            to bottom,
            var(--color-bg-opacity-1),
            var(--color-bg-opacity-3) 85.2%
        ) !important;
        backdrop-filter: blur(20px);
        box-sizing: border-box;
        // box-shadow: 0 0 15px rgba(163, 163, 163, 0.196);
        padding: 40px;
        pointer-events: initial;
    }

    .login__title {
        color: var(--color-text-1);
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
        user-select: none;
    }

    .login__sub-title {
        user-select: none;
        color: var(--color-text-3);
        font-size: 16px;
        line-height: 24px;
    }

    .login__err-msg {
        color: rgb(var(--red-6));
        height: 32px;
        line-height: 32px;
    }

    .login__forget {
        margin-left: auto;
    }
</style>
