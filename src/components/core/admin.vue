<template>
    <el-container class="layout-container-demo" style="height: 500px">
        <el-aside width="200px">
           <asideVue></asideVue>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <headerVue></headerVue>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import asideVue from "@/components/admin/aside.vue"
import headerVue from "@/components/admin/header.vue"
// import mainVue from "@/components/admin/main.vue"

</script>
  
<style scoped lang="less">
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-main {
    padding: 0;
}


</style>
  