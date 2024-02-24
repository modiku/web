<template>
    <el-affix :offset="100">
        <el-button type="info" style="margin-left: 20px;" @click="back">返回</el-button>
    </el-affix>
    <div class="order-container">
        <el-table :data="productList" border style="width: 800px" class="table">
            <el-table-column label="图片" width="220">
                <template #default="scope">
                    <div class="img-area">
                        <img :src="scope.row.product.imgUrl" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="product.name" label="商品名字" width="180" />
            

            <el-table-column prop="product.phone" label="手机型号" width="100" />
            <el-table-column label="单价 " prop="price" width="100">
            </el-table-column>
            <el-table-column label="数量 " prop="num" width="100">
            </el-table-column>
            <el-table-column label="小计" width="100">
                <template #default="scope">
                    <div>
                        {{ scope.row.price * scope.row.num }}
                    </div>
                </template>
            </el-table-column>

        </el-table>

        <div class="price-area">
            总计: {{ order.totalprice }} 元
        </div>

        <el-descriptions class="margin-top" title="收货信息" :column="2" style="width: 700px;margin: auto; margin-top: 20px;"
            border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon style="margin-right: 5px;">
                            <user />
                        </el-icon>
                        收货人姓名
                    </div>
                </template>
                {{
                    order.consigneeName
                }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon style="margin-right: 5px;">
                            <iphone />
                        </el-icon>
                        收货人电话
                    </div>
                </template>
                {{ order.consigneePhoneNumber }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon style="margin-right: 5px;">
                            <office-building />
                        </el-icon>
                        收货地址
                    </div>
                </template>
                {{ order.address }}
            </el-descriptions-item>
        </el-descriptions>

        <div class="button-area">
            <el-button type="danger" round v-if="!order.pay" @click="pay">立即支付</el-button>
            <el-button type="success" round v-if="order.pay" disabled>已支付</el-button>

            <el-button link :disabled="order.pay" @click="del">取消订单</el-button>

        </div>
    </div>

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
import { delOrder, findOneCarProduct, findOneOrder, payOrder } from '@/api';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const router = useRouter()
const route = useRoute()
// (await findOneOrder(route.query.orderid as string)).data

const back = () => {
    router.back()
}
const order = ref<myOrder>({
    id: '',
    carproducts: [],
    user: {
        number: '',
        password: '',
        name: '',
        authority: 0
    },
    address: '',
    consigneeName: '',
    consigneePhoneNumber: '',
    totalprice: 0,
    pay: false
})
const productList = ref<carProduct[]>([])

const init = async () => {
    
    order.value = (await findOneOrder(route.query.orderid as string)).data[0]

    order.value.carproducts?.forEach(async carproduct => {
        productList.value.push((await findOneCarProduct(carproduct.id)).data[0])
    })

    console.log(productList.value)

}
init()
const dialogDelVisible = ref(false)
const pay = async () => {
    if ((await payOrder(order.value.id ?? '')).data.message === '支付成功') {
        ElMessage({
            message: '支付成功',
            type: 'success',
        })
        order.value.pay = true
        setTimeout(() => {
            router.push('/index')
        }, 2000)
    }
}
const del = () => {
    dialogDelVisible.value = true
}

const removeOrder = async () => {
    if ((await delOrder(order.value.id ?? '')).data.message === '删除订单成功') {
        setTimeout(() => {
            ElMessage({
                message: '删除订单成功',
                type: 'success',
            })
        }, 500)
        dialogDelVisible.value = false
        setTimeout(() => {
            router.push('/index')
        }, 2000)

    }

}
</script>


<style lang='less'>
.order-container {
    margin: auto;
    margin-top: 60px;
    width: 900px;
    .img-area{
        img{
            max-width: 200px;
            max-height:300px;
        }
    }
    .table {
        margin: auto;
    }

    .cell-item {
        display: flex;
        align-items: center;
    }

    .price-area {
        margin-top: 20px;
        width: 150px;
        margin-left: auto;
        font-size: larger;
    }

    .button-area {
        margin-top: 30px;
        width: 200px;
        margin-left: auto;
    }
}
</style>