<template>
    <el-scrollbar>
        <el-table :data="orderList" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="150" />
            <el-table-column prop="date" label="创建日期" width="350" />
            <el-table-column label="支付状态" width="150">
                <template #default="scope">
                    <div v-if="scope.row.pay">
                        已支付
                    </div>
                    <div v-if="!scope.row.pay">
                        未支付
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="totalprice" label="订单总额" width="150" />

            <el-table-column prop="user.number" label="用户账号" width="150" />

            <el-table-column prop="user.name" label="用户名" width="150" />


            <el-table-column fixed="right" label="操作" width="160">

                <template #default="scope">
                    <el-button link type="primary" size="small" @click="goOrderDetail(scope.row.id)">详细</el-button>
                    <el-button link type="primary" size="small" @click="goDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>

    <el-dialog v-model="dialogDelVisible" title="Tips" width="30%">
        <span>你确定要删除么</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDelVisible = false">取消</el-button>
                <el-button type="primary" @click="removeOrder">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script setup lang='ts'>
import { delOrder, getAllOrder } from '@/api';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const orderList = ref<Order[]>()
const dialogDelVisible = ref(false)

const orderId = ref<string>()
const goOrderDetail = (orderId: string) => {
    const data = ref({
        orderid: orderId
    })
    router.push({
        path: '/orderdetail',
        query: data.value
    })
}
const init = async () => {
    orderList.value = (await getAllOrder()).data
}
init()

const goDel = (orderid: string) => {
    dialogDelVisible.value = true
    orderId.value = orderid
}

const removeOrder = async () => {
    if ((await delOrder(orderId.value ?? '')).data.message === '删除订单成功') {
        ElMessage({
            message: '删除订单成功',
            type: 'success',
        })
        dialogDelVisible.value = false


        setTimeout(() => {
            init()
        }, 500)

    }

}

</script>


<style lang='less'></style>