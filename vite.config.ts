import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
// Arco组件自动引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			resolvers: [ArcoResolver(),],
			imports: ['vue',],
			dts: true
		}),
		Components({
			resolvers: [
				ArcoResolver({
					sideEffect: true
				})
			]
		})
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src/')
		}
	}
});
