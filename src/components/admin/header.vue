<template>
    <div class="toolbar">
        <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
                <setting />
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>View</el-dropdown-item>
                    <el-dropdown-item>Add</el-dropdown-item>
                    <el-dropdown-item>Delete</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span>{{ store.admin.name }}</span>
    </div>
</template>


<script setup lang='ts'>
import { useUserStore } from '@/stores/user';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const store = useUserStore()


</script>


<style lang='less'>
.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>