<template>
    <div class="shopCar-container">
        <el-table :data="car.productList" border style="width: 100%" @selection-change="handleSelectionChange"
            empty-text="购物车空空如也">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="商品名字" width="180" />
            <el-table-column prop="price" label="价格" width="100">

            </el-table-column>
            <el-table-column prop="phone" label="手机型号" width="100" />

            <el-table-column label="数量 " width="180">
                <template #default="scope">
                    <div>
                        <el-input-number v-model="scope.row.num" :min="1" :max="99" @change="handleChange" />
                    </div>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                        我不想要了
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <div class="price">
            总价: {{ total }} 元
            <el-button type="success" round class="button" @click="readySubmit">提交订单</el-button>
        </div>
    </div>

    <el-dialog v-model="dialogVisible" title="填写收货信息" width="50%">
        <el-form :model="addressDetail">
            <el-form-item label="收货人姓名" :label-width="formLabelWidth">
                <el-input v-model="addressDetail.consigneeName" placeholder="请输入收货人姓名" />
            </el-form-item>
        </el-form>

        <el-form :model="addressDetail">
            <el-form-item label="收货人电话" :label-width="formLabelWidth">
                <el-input v-model="addressDetail.consigneePhoneNumber" placeholder="请输入收货人电话" />
            </el-form-item>
        </el-form>


        <el-form :model="addressDetail">
            <el-form-item label="收货地址" :label-width="formLabelWidth">
                <el-input v-model="addressDetail.address" placeholder="请输入收货地址" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submitForm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script setup lang='ts'>
import { addCarProduct, addOrder } from '@/api';
import router from '@/router';
import { useCarStore } from '@/stores/car';
import { useUserStore } from '@/stores/user';
import { reactify } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';


const car = useCarStore()
const multipleSelection = ref<myCar[]>([])
const total = ref<number>(0)
const dialogVisible = ref(false)
const formLabelWidth = '90px'
const user = useUserStore()

const myOrder = reactive<myOrder>({
    user: {
        number: '',
        password: '',
        name: '',
        authority: 0,
        userAvaterUrl: '',
        description: '',
        orders: []
    },
    address: '',
    consigneeName: '',
    consigneePhoneNumber: '',
    totalprice:0,
    pay:false
})
let addressDetail = reactive({
    consigneeName: '',
    consigneePhoneNumber: '',
    address: ''
})
const handleSelectionChange = (val: myCar[]) => {
    multipleSelection.value = val
    total.value = 0
    multipleSelection.value.forEach(product => {
        total.value += product.price * product.num
    })
}

const handleChange = () => {
    total.value = 0
    multipleSelection.value.forEach(product => {
        total.value += product.price * product.num
    })
}

const deleteRow = (index: number) => {
    car.productList.splice(index, 1)
}

const readySubmit = () => {
    if (total.value <= 0) {
        return ElMessage({
            message: '请选择要购买的物品',
            type: 'warning'
        })
    }
    dialogVisible.value = true
}

const close = () => {
    dialogVisible.value = false
}

const submitForm = async () => {
    myOrder.user = user.$state
    myOrder.consigneeName = addressDetail.consigneeName
    myOrder.consigneePhoneNumber = addressDetail.consigneePhoneNumber
    myOrder.address = addressDetail.address
    myOrder.totalprice = total.value
    myOrder.id = (await addOrder(myOrder)).data.id

    let myCarProduct: myCarProduct = {
        product: {
            id: ''
        },
        num: 0,
        price: 0,
        order: {
            id: ''
        }
    }

    multipleSelection.value.forEach(async product => {
        myCarProduct.product.id = product.id ?? ''
        myCarProduct.num = product.num
        myCarProduct.price = product.price
        myCarProduct.order.id = myOrder.id ?? ''

        console.log((await addCarProduct(myCarProduct)).data)
    })
    const data = ref({
        orderid:myCarProduct.order.id
    })
    router.push({
        path:'/order',
        query:data.value
    })

}

</script>


<style lang='less'>
.shopCar-container {
    width: 70%;
    min-width: 800px;
    margin: auto;

    .price {
        margin-top: 20px;
        position: relative;

        .button {
            position: absolute;
            right: 0;
            top: 10px;
        }
    }

}
</style>