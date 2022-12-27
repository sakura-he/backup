// 根据传递的路由name,获取到此路由在菜单树的所有父节点
export const recursiveTreeByLastLevel = (
    val: string,
    data: any[],
    fKey = "name"
) => {
    let returnvalue: { rData: any[]; floorArr: number[] } = {
        rData: [],
        floorArr: [],
    };
    for (let i = 0; i < data.length; i++) {
        // 把遍历中的route添加到返回的数组中
        returnvalue.rData.push(data[i]);
        returnvalue.floorArr.push(i);
        // 如果遍历的路由有子路由,递归进入寻找
        if (data[i].children && data[i].children.length > 0) {
            // 合并子递归返回的数组,数组中存放着找到的部分路由
            let childReturn = recursiveTreeByLastLevel(
                val,
                data[i].children,
                fKey
            );
            returnvalue.rData = returnvalue.rData.concat(childReturn.rData);
            // 判断数组中有没有匹配到的路由,有直接返回
            if (returnvalue.rData.some((item) => item[fKey] === val)) {
                console.log("fanhui", returnvalue);
                returnvalue.floorArr = returnvalue.floorArr.concat(
                    childReturn.floorArr
                );
                return returnvalue;
            }
        } else {
            // 叶子节点,判断这个路由的name是否等于去的路由的name,是的话直接返回
            if (data[i][fKey] === val) return returnvalue;
            // 都不是重置
        }
        // 此次遍历没有找到,那么本次循环的路由不是要找的,清空
        returnvalue.rData.shift();
        returnvalue.floorArr.shift();
    }
    return returnvalue;
};
