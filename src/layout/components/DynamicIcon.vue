<script lang="tsx">
    import { h, resolveComponent, VNode } from "vue";
    export default defineComponent({
        props: {
            icon: {
                type: String,
                required: false,
            },
        },
        setup(props) {
            let iconComp: VNode;
            return () => {
                if (props.icon === undefined) {
                    console.log("没有传入图标名称");
                    return () => <></>;
                }
                let bkIcon = h(resolveComponent("icon-apps"));
                // 引入图标组件
                let icon = resolveComponent(props.icon);
                if (typeof icon === "string") {
                    console.log("没有找到对应名称的图标,使用默认图标");
                    // 没找到图标组件,使用备用的图标
                    iconComp = bkIcon;
                } else {
                    iconComp = h(icon);
                }

                return <>{iconComp}</>;
            };
        },
    });
</script>
