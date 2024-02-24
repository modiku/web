<template>
  <el-affix :offset="100">
    <el-button type="info" style="margin-left: 20px;" @click="back">返回</el-button>
  </el-affix>

  <div class="container">
    <div class="carousel-container">
      <el-carousel style="border-radius: 15px;">
        <el-carousel-item v-for="item in imgList">
          <img :src="item" alt="" style="width: 100%;height:100%;object-fit: contain; border-radius: 15px;">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="detail-container">
      <div class="title">
        {{ product?.name }}
      </div>

      <div class="detail">
        手机型号: {{ product?.phone }}
      </div>

      <div class="detail text">
        产品介绍: {{ product?.description }}
      </div>

      <div class="detail">
        价格: <span style="margin-left: 30px;">￥{{ product?.price }}</span>
      </div>

      <div class="detail">
        数量: <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" style="margin-left: 35px;" />

      </div>

      <div class="button-area">
        <el-button type="warning" round @click="buyNow">立即购买</el-button>
        <el-button type="danger" round @click="toCar">加入购物车</el-button>
        <el-button type="primary" round @click="goCar" link>前往购物车</el-button>

      </div>
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
import { addCarProduct, addOrder, searchProduct } from '@/api';
import { useCarStore } from '@/stores/car';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const productList = ref<Product[]>([])
const product = ref<myProduct>()
const imgList = ref<string[]>([])
const car = useCarStore()
const user = useUserStore()

const dialogVisible = ref(false)
const formLabelWidth = '90px'

let addressDetail = reactive({
    consigneeName: '',
    consigneePhoneNumber: '',
    address: ''
})

const search: Query = reactive({
  keyWord: ""
})

const goSearch = async () => {
  productList.value = (await searchProduct(search)).data
}
const init = async () => {
  await goSearch()
  // console.log(productList.value, '==')
  product.value = productList.value.find(product => product.id == route.query.id)
  imgList.value.push(product.value?.CarouselImg1 ?? '')
  imgList.value.push(product.value?.CarouselImg2 ?? '')
  imgList.value.push(product.value?.CarouselImg3 ?? '')
  console.log(imgList)
}

init()

const carProduct = ref({
  id: '',
  name: '',
  phone: '',
  price: 0,
  num: 0,
  imgUrl: ''
})

const back = () => {
  router.push('/index')
}

const num = ref(1)
const handleChange = (value: number) => {
  // console.log(value)
}

const toCar = () => {
  if (car.productList.find(item => item.id == product.value?.id)) {
    car.productList[car.productList.findIndex(item => item.id == product.value?.id)].num += num.value
  } else {
    carProduct.value.num = num.value
    carProduct.value.id = product.value?.id ?? ''
    carProduct.value.price = product.value?.price ?? 0
    carProduct.value.name = product.value?.name ?? ''
    carProduct.value.imgUrl = product.value?.imgUrl ?? ''
    carProduct.value.phone = product.value?.phone ?? ''
    car.productList.push(carProduct.value)

  }
  car.updateTotal()
  ElMessage({
    message: '加入购物车成功',
    type: 'success',
  })

}
const data = {
  activename: 'third'
}
const goCar = () => {
  router.push({
    path: '/index',
    query: data
  })
}

const buyNow = () => {
  dialogVisible.value = true
}

const close = () => {
    dialogVisible.value = false
}

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

const submitForm = async () => {
    myOrder.user = user.$state
    myOrder.consigneeName = addressDetail.consigneeName
    myOrder.consigneePhoneNumber = addressDetail.consigneePhoneNumber
    myOrder.address = addressDetail.address
    myOrder.totalprice = (product.value?.price ?? 0 ) * num.value
    console.log(num.value)
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
        myCarProduct.product.id = product.value?.id ?? ''
        myCarProduct.num = num.value
        myCarProduct.price = product.value?.price ?? 0
        myCarProduct.order.id = myOrder.id ?? ''
        console.log((await addCarProduct(myCarProduct)).data)
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
.container {
  display: flex;
  width: 80%;
  margin: auto;

  .carousel-container {
    width: 303px;
    margin-top: 80px;
    margin-left: 30px;
  }

  .detail-container {
    width: 40%;
    height: 500px;
    margin-left: 50px;
    margin-top: 80px;
    color: rgba(0, 0, 0, .4);

    .title {
      font-size: 20px;
      color: black;
      margin-bottom: 30px;

    }

    .detail {
      margin-bottom: 30px;

      &.text {
        margin-bottom: 80px;
      }
    }

  }
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}


.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>