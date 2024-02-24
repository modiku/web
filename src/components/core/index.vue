<template>
    <div class="index-container">
        <div class="header-area">
            <headerVue></headerVue>
        </div>
       
    </div>
</template>


<script setup lang='ts'>
import { searchProduct } from '@/api';
import { reactive, ref } from 'vue';
import headerVue from '../home/header.vue';

// console.log(localStorage.getItem('userId'))


</script>

<style lang='less'>
.index-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .header-area{
        width: 100%;
    }
    .search-area {
        width: 50%;
        margin: auto;
    }
}
</style>