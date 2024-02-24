<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="首页" name="first">
            <homeVue></homeVue>
        </el-tab-pane>
        <el-tab-pane label="个性化定制" name="second">
            <customization></customization>
        </el-tab-pane>
        <el-tab-pane label="购物车" name="third">
            <shopCar></shopCar>
        </el-tab-pane>
        <el-tab-pane label="个人中心" name="fourth">
            <psInformation></psInformation>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import homeVue from './home.vue'
import psInformation from './psInformation.vue'
import { useRoute } from 'vue-router'
import shopCar from './shopCar.vue'
import customization from './customization.vue'
const route = useRoute()

const activeName = ref(route.query?.activename ?? 'first')
console.log(route.query)

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>


<style lang='less'>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
.demo-tabs{
    width: 90%;
    margin: auto;
}
</style>