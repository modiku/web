<template>
    <el-affix :offset="100">
        <el-button type="info" style="margin-left: 20px;" @click="back">返回</el-button>
    </el-affix>
    <div class="oredercenter-container">
        <el-table :data="orderList" border style="width: 580px" class="table">
            <el-table-column prop="date" label="订购日期" width="180" />
            <el-table-column prop="totalprice" label="订单总额" width="180" />
            <el-table-column label="支付状态" width="100">
                <template #default="scope">
                    <div v-if="scope.row.pay">
                        已支付
                    </div>
                    <div v-if="!scope.row.pay">
                        未支付
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="支付状态" width="">
                <template #default="scope">
                    <el-button type="primary" @click="goOrder(scope.row.id)">查看订单</el-button>
                </template>
            </el-table-column>



        </el-table>
    </div>
</template>


<script setup lang='ts'>
import { findOrderByUser, getUser } from '@/api';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { oppositeOrderMap } from 'element-plus/es/components/table-v2/src/constants';
import { ref } from 'vue';
const user = useUserStore()
const orderList = ref<Order[]>()
const back = () => {
    router.back()
}

const init = async () => {
    

    orderList.value = (await findOrderByUser(user.number)).data

    orderList.value?.forEach(order => {
        order.date = order.date.substring(0, 19)
    })
    console.log(orderList.value)
}

init()

const goOrder = (id:string) =>{
    const data = ref({
        orderid:id
    })
    router.push({
        path:'/order',
        query:data.value
    })
}


</script>


<style lang='less'>
.oredercenter-container {

    width: 580px;
    margin: auto;
    margin-top: 60px;

}
</style>