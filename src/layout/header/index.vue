<!-- <template>
    <div class="header-container">
        <div class="header-area">
            <div v-if="!user.name" class="log-area">
                <a href="/login">登录</a>
                <a href="/register">注册</a>
            </div>

            <div v-if="user.name" class="log-area">
                你好 {{ user.name }} <a href="/login" @click="logOut">登出</a>
            </div>

            <div v-if="!admin.name">
                <a href="/adminlogin">管理员入口</a>
            </div>

            <div v-if="admin.name">
                管理员: {{ admin.name }}  <a href="/adminlogin" @click="logOut">登出</a>
            </div>
        </div>
    </div>
</template> -->

<template>
    <el-page-header :icon="null" class="header-container" title=" ">
        <template #content>
            <div class="flex items-center">
                <el-avatar :size="32" class="mr-3" :src="user.userAvaterUrl" />
                <span class="text-large font-600 mr-3"> {{ user.number }}</span>
                <span class="text-large font-600 mr-3" v-if="!user.number"> 未登录</span>

                <span class="text-sm mr-2" style="color: var(--el-text-color-regular);margin-left: 10px;">
                    {{ user.name }}
                </span>
                <el-tag v-if="user.number" style="margin-left: 10px;">{{ Authority[user.authority] }}</el-tag>
            </div>
        </template>
        <template #extra>
            <div class="flex items-center">
                <el-button v-if="!user.number" @click="toPage('/login')">登录</el-button>
                <el-button v-if="!user.number" type="primary" class="ml-2" @click="toPage('/register')">注册</el-button>
                <el-button v-if="user.number" @click="logOut">退出</el-button>

            </div>
        </template>
    </el-page-header>
</template>
  
    
<script setup lang='ts'>
import { getUser } from '@/api';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';

const user = useUserStore()
const router = useRouter()
console.log(user.number)
const Authority: string[] = ['root',
    '管理员',
    '会员',
    '普通用户']






const logOut = () => {
    user.init()
    router.push('/login')
}

const toPage = (url: string) => {
    router.push(url)
}
</script>
    
<style scoped lang='less'>
.header-container {
    width: 95%;
    margin: auto;
}
</style>