import { generate, getRgbStr } from "@arco-design/color";
//根据传入的新颜色生成主题色，设置给body元素
export function setThemeColor(color: string, isDarkMode: boolean) {
	let colors = generate(color, {
		format: "hex",
		dark: isDarkMode,
		list: true,
		index: 1,
	});
	colors.forEach((color: string, index: number) => {
		const rgb = getRgbStr(color);
		document.body.style.setProperty(`--primary-${index + 1}`, rgb);
	});
}
export function previewColor(color: string, isDarkMode: boolean): string[] {
	let colors = generate(color, {
		format: "hex",
		dark: isDarkMode,
		list: true,
		index: 1,
	});
	return colors;
}
