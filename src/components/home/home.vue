<template>
    <div class="search-area">
        <el-input v-model="search.keyWord" style="width:70%;"></el-input>
        <el-button style="margin-left:10px;" @click="goSearch" type="primary">搜索</el-button>
    </div>
    <el-space direction="vertical" alignment="flex-start">
        <el-skeleton style="width: 240px" :loading="loading" animated :count="3">
            <template #template>
                <el-skeleton-item variant="image" style="width: 400px; height: 267px" />
                <div style="padding: 14px">
                    <el-skeleton-item variant="h3" style="width: 50%" />
                    <div style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              ">
                        <el-skeleton-item variant="text" style="margin-right: 16px" />
                        <el-skeleton-item variant="text" style="width: 30%" />
                    </div>
                </div>
            </template>
            <template #default style="width: 100%;">
                <div class="card-container">
                    <div class="card-area">
                        <el-card v-for="item in productList" :key="item.id"
                            :body-style="{ padding: '0px', marginBottom: '1px' }"
                            style="margin-top: 10px; margin-right: 10px;">
                            <img :src="item.imgUrl" class="image multi-content" />
                            <div style="padding: 14px">
                                <span class="title">{{ item.name }}</span>
                                <div class="bottom card-header">
                                    <div class="time">{{ item.phone }}</div>
                                    <div class="pricebt-area">
                                        <el-button text class="button" @click="goDetatil(item.id)">购买</el-button>
                                        <div class="price">￥{{ item.price }} </div>
                                    </div>

                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </template>
        </el-skeleton>
    </el-space>
</template>


<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { getUser, searchProduct } from '@/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter()
const loading = ref(true)
const currentDate = new Date().toDateString()

const productList = ref<Product[]>([])
const user = useUserStore()



const search: Query = reactive({
    keyWord: ""
})

const goSearch = async () => {
    productList.value = (await searchProduct(search)).data
}
const init = async () => {
    await goSearch()
    loading.value = false
    // console.log(productList.value, '==')
    if(localStorage.getItem("userId")){
       let data = await getUser(localStorage.getItem("userId") ?? '')
            user.$state = data.data[0] as User ?? {
                number: '',
                password: '',
                name: '',
                authority: 3,
                userAvaterUrl: '',
                description: '',
                orders: []
            }
    }
}

init()

const goDetatil = (id:string) => {
    let data = {
        id:id
    }
    router.push({
        name:'ProductDetail',
        query:data
    })
}



</script>


<style lang='less'>
.title {
    font-size: 16px;
}

.card-container {
    .card-area {
        display: flex;
        flex-wrap: wrap;
        padding: auto;
    }
}

.image {
    width: 200px;
}

.time {
    font-size: 12px;
    color: #999999;
}

.pricebt-area {
    display: flex;
    height: 30px;
    line-height: 30px;
    .price {
        font-size: 14px;
        margin-left: 70px;
    }
}
</style>
