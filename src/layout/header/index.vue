<template>
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
</template>
    
<script setup lang='ts'>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue'

const store = useUserStore()
const {user,admin} = storeToRefs(store)
const logOut = () =>{
    store.init()
}
</script>
    
<style scoped lang='less'>
.header-container {
    width: 100%;
    background-color: aqua;
    display: flex;
    height: 50px;
    .header-area {
        position: absolute;
        right: 10px;
        .log-area {
            a {
                margin-right: 20px;
            }
        }
    }
}
</style>