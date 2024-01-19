<template>
    <el-scrollbar>
        <el-menu :default-openeds="['1', '3']" router="true">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <message />
                    </el-icon>用户管理
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/userManger" >用户管理</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon><icon-menu /></el-icon>Navigator Two
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/productManger" >商品管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="2-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="2-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <setting />
                    </el-icon>Navigator Three
                </template>
                <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="3-1">Option 1</el-menu-item>
                    <el-menu-item index="3-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="3-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="3-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>


<script setup lang='ts'>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'


</script>


<style lang='less'>
.el-scrollbar {
    a {
        text-decoration: none;
        /* 去除默认的下划线 */
        outline: none;
        /* 去除旧版浏览器的点击后的外虚线框 */
        color: #000;
        /* 去除默认的颜色和点击后变化的颜色 */
    }
}

.el-menu {
    border-right: none;
}</style>