<template>
    <el-scrollbar>
        <el-menu :default-openeds="['1', '3']" router="true">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <UserFilled />
                    </el-icon>用户
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/userManger">用户管理</el-menu-item>
                </el-menu-item-group>

            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Goods />
                    </el-icon>商品
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/productManger">商品管理</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <Tickets />
                    </el-icon>订单
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/orderManger">订单管理</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>


<script setup lang='ts'>
import { Menu as UserFilled, Goods, Tickets } from '@element-plus/icons-vue'


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