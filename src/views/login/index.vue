<template>
    <view class="container">
        <!-- <view class="logo">11</view> -->
        <view class="banner">
            <a-carousel
                class="swiper"
                :default-current="2"
                @change="handleChange"
            >
                <a-carousel-item v-for="image in images" class="swiper__item">
                    <img
                        :src="image"
                        :style="{
                            width: '100%',
                        }"
                    />
                    1
                </a-carousel-item>
            </a-carousel>
        </view>
        <view class="login">
            <view class="form"></view>
            <view class="footer">Nest Arco Admin</view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    const images = [
        "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
        "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
        "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
    ];
    const handleChange = (value: number) => {
        console.log(value);
    };
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .banner {
        width: 500px;
    }

    .login {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .form {
        flex: 1;
    }

    .footer {
        padding: 10px;
        text-align: center;
        flex: none;
    }

    .swiper {
        height: 100%;

        .swiper__item {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
</style>
