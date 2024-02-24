<template>
    <div class="canvas-container">
        <div class="button-area">
            <el-upload ref="uploadRef" class="upload-demo" action="/api/upload/product/customization" :limit="1"
                :on-success="upLoadSuccess">
                <el-button type="primary">上传素材</el-button>
                <template #tip>
                    <div class="el-upload__tip">

                    </div>
                </template>
            </el-upload>
            <el-button type="primary" size="small" @click="fill">铺满</el-button>
            <el-button type="primary" size="small" @click="">选择型号</el-button>
            <el-button type="primary" size="small" @click="reSet">重置</el-button>
            <el-button type="primary" size="small" @click="submit">保存</el-button>



        </div>
        <div class="col">
            <div class="box" :style="boxStyle">
                <span class="tl" id="tl" :style="tlStyle"></span>
                <span class="bl" id="bl" :style="blStyle"></span>
                <span class="tr" id="tr" :style="trStyle"></span>
                <span class="br" id="br" :style="brStyle"></span>
            </div>
            <!-- 手机背景 -->
            <canvas id="canvas" class="canvas"> </canvas>
            <!-- 画布 -->
            <canvas id="canvas2" class="canvas2"></canvas>
        </div>

        <div class="submitOrder">
            <el-upload class="upload-demo" action="/api/upload/product/bigimg" :limit="1" :on-success="submitSucceess">
                <el-button type="primary">提交订单</el-button>
                <template #tip>
                    <div style="font-size: 20px;margin-top: 5px;">
                        单价：￥15 <span style="font-size: 15px;margin-left: 20px;">请注意：提交保存后的素材</span>
                    </div>

                </template>
            </el-upload>

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
import { addCarProduct, addOrder, addProduct, uploadCustomization } from '@/api';
import type { UploadInstance, UploadProps } from 'element-plus';
import { Callbacks, data } from 'jquery';
import { onMounted, reactive, ref } from 'vue';
import { saveAs } from 'file-saver';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter()

const boxStyle = reactive({
    width: '0px',
    height: '0px',
    // 'background-color': 'blue',
    left: '0',
    display: ''

})

const tlStyle = reactive({
    left: '',
    top: '',
    display: ''
})

const blStyle = reactive({
    left: '',
    top: '',
    display: ''

})

const trStyle = reactive({
    left: '',
    top: '',
    display: ''

})

const brStyle = reactive({
    left: '',
    top: '',
    display: ''

})
const imgsrc = ref('')
const upLoadSuccess: UploadProps['onSuccess'] = (
    response,
    upload
) => {
    imgsrc.value = `/assets/product/customization/${response.data.message ?? ''}`
    imgOnload()

}
let canvas: HTMLCanvasElement = undefined as unknown as HTMLCanvasElement
let canvas2: HTMLCanvasElement = undefined as unknown as HTMLCanvasElement
let body: HTMLElement = undefined as unknown as HTMLElement
let tl: HTMLElement = undefined as unknown as HTMLElement
let tr: HTMLElement = undefined as unknown as HTMLElement
let bl: HTMLElement = undefined as unknown as HTMLElement
let br: HTMLElement = undefined as unknown as HTMLElement
let ctx: CanvasRenderingContext2D = null as unknown as CanvasRenderingContext2D
let ctx2: CanvasRenderingContext2D = null as unknown as CanvasRenderingContext2D
let canvasW = 0
let canvasH = 0
const ifTouch = ref(false)
const ifTlTouch = ref(false)
const ifTrTouch = ref(false)
const ifBlTouch = ref(false)
const ifBrTouch = ref(false)

let enlargePointOrigin = { x: 0, y: 0 };         //图片移动、缩放前的初始参数--（右上角坐标）
let enlargePoint = { x: 0, y: 0 };               //图片移动 、缩放的实时参数--（右上角坐标）
let imgPositionOrigin = { x: 0, y: 0, w: 0, h: 0 };//图片移动、缩放前的初始参数--（左上角坐标+宽高）
let imgPosition = { x: 0, y: 0, w: 0, h: 0 };       //图片移动、缩放的实时参数-（左上角坐标+宽高）
const backgroundImg = new Image(), img = new Image()
// img.crossOrigin = 'Annoymous'

const uploadRef = ref<UploadInstance>()
onMounted(() => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
    body = document.getElementById('whole') as HTMLElement

    tl = document.getElementById('tl') as HTMLElement
    tr = document.getElementById('tr') as HTMLElement
    bl = document.getElementById('bl') as HTMLElement
    br = document.getElementById('br') as HTMLElement
    // console.log(canvas.offsetLeft)
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D

    if (ctx && ctx2) {
        backgroundImg.src = "/src/assets/images/bg/i6.png"
        backgroundImg.crossOrigin = 'Annoymous'
        backgroundImg.onload = () => { // 加载背景图片
            if (backgroundImg.height >= 1700) {
                canvasW = backgroundImg.width * 0.24;
                canvasH = backgroundImg.height * 0.24;
            } else if (backgroundImg.height <= 1500) {
                canvasW = backgroundImg.width * 0.28;
                canvasH = backgroundImg.height * 0.28;
            } else if (backgroundImg.height >= 1800) {
                canvasW = backgroundImg.width * 0.22;
                canvasH = backgroundImg.height * 0.22;
            }
            else if (backgroundImg.height >= 1900) {
                canvasW = backgroundImg.width * 0.2;
                canvasH = backgroundImg.height * 0.2;
            }
            else {
                canvasW = backgroundImg.width * 0.26;
                canvasH = backgroundImg.height * 0.26;
            }

            canvas.height = canvasH;
            canvas.width = canvasW;
            boxStyle.height = canvasH + 'px'
            boxStyle.width = canvasW + 'px'
            canvas2.height = canvasH;
            canvas2.width = canvasW;


            clearBg()
            drawBg()
        }
    }

    canvas2.onmousedown = () => {
        ifTouch.value = true
        tlStyle.display = 'block'
        trStyle.display = 'block'
        blStyle.display = 'block'
        brStyle.display = 'block'
    }

    tl.onmousedown = () => {
        ifTlTouch.value = true
    }
    tr.onmousedown = () => {
        ifTrTouch.value = true
    }
    bl.onmousedown = () => {
        ifBlTouch.value = true
    }

    br.onmousedown = () => {
        ifBrTouch.value = true
    }

    body.onmouseup = () => {
        ifTlTouch.value = false
        ifTrTouch.value = false
        ifBlTouch.value = false
        ifBrTouch.value = false
        ifTouch.value = false
    }
    body.onmousemove = (e) => {
        if (ifTlTouch.value) {
            imgPosition.h = imgPosition.h - e.movementY
            imgPosition.w = imgPosition.w - e.movementX
            imgPosition.y = imgPosition.y + e.movementY
            imgPosition.x = imgPosition.x + e.movementX
        }
        if (ifTrTouch.value) {
            imgPosition.h = imgPosition.h - e.movementY
            imgPosition.w = imgPosition.w + e.movementX
            imgPosition.y = imgPosition.y + e.movementY


        }
        if (ifBlTouch.value) {
            imgPosition.h = imgPosition.h + e.movementY
            imgPosition.w = imgPosition.w - e.movementX
            imgPosition.x = imgPosition.x + e.movementX

        }
        if (ifBrTouch.value) {
            imgPosition.h = imgPosition.h + e.movementY
            imgPosition.w = imgPosition.w + e.movementX
            // imgPosition.y = imgPosition.y - e.movementY
            // imgPosition.x = imgPosition.x - e.movementX
        }
    }

    canvas2.onmousemove = (e) => {
        if (ifTouch.value) {
            imgPosition.x = e.offsetX - imgPosition.w / 2
            imgPosition.y = e.offsetY - imgPosition.h / 2
        }


    }

})




const imgOnload = () => {
    img.src = imgsrc.value
    img.crossOrigin = 'Annoymous'
    console.log(img.src)
    img.onload = function () {

        imgPosition.w = canvas.width;
        imgPosition.h = img.height * canvas.width / img.width;
        imgPositionOrigin.w = canvas.width;
        imgPositionOrigin.h = img.height * canvas.width / img.width;
        enlargePoint.x = canvas.width;
        enlargePointOrigin.x = canvas.width;
        // console.log(imgPosition.h)

        changeSpan()
        drawBg()
    }
}

const fill = () => {
    imgPosition.w = canvas.width
    imgPosition.h = canvas.height
    imgPosition.x = 0
    imgPosition.y = 0
}
const reSet = () => {
    img.src = ''
    tlStyle.display = 'none'
    trStyle.display = 'none'
    blStyle.display = 'none'
    brStyle.display = 'none'
    uploadRef.value?.clearFiles()
    erase()
}

const submit = async () => {
    const newImage = new Image()
    if (canvas) {
        newImage.src = canvas.toDataURL()
        // newImage.setAttribute("crossOrigin",'Anonymous')
    }
    let file;
    canvas.toBlob((blob) => {
        saveAs(blob as Blob, 'image.png')
    })
    // console.log((await uploadCustomization(file)).data.message) 



}

setInterval(() => {
    drawBg()
    changeSpan()
}, 20)

const changeSpan = () => {         //控制方框


    // $('span').css("display", 'block')
    // console.log(imgPosition.x, "==",imgPosition.y)


    tlStyle.left = imgPosition.x - 20 + 'px'
    tlStyle.top = imgPosition.y - 20 + 'px'


    trStyle.left = imgPosition.x + 20 + imgPosition.w + 'px'
    trStyle.top = imgPosition.y - 20 + 'px'

    blStyle.left = imgPosition.x - 20 + 'px'
    blStyle.top = imgPosition.y + 20 + imgPosition.h + 'px'

    brStyle.left = imgPosition.x + 20 + imgPosition.w + 'px'
    brStyle.top = imgPosition.y + 20 + imgPosition.h + 'px'

}




const drawBg = () => {
    ctx.drawImage(backgroundImg, 0, 0, canvasW, canvasH)
    erase()
    draw()
}
const clearBg = () => { //清空背景
    ctx.clearRect(0, 0, canvasW, canvasH)
}

const erase = () => { //清空画布

    ctx2.clearRect(0, 0, canvasW, canvasH)
}

const draw = () => {// 将图片载入画布中
    canvas2.style.opacity = '0'
    ctx2.drawImage(img, imgPosition.x, imgPosition.y, imgPosition.w, imgPosition.h)

    let pat = ctx.createPattern(canvas2, 'no-repeat')
    ctx.fillStyle = pat as CanvasPattern
    ctx.globalCompositeOperation = 'source-atop'
    ctx.fillRect(0, 0, canvasW, canvasH)

}

const submitProduct = ref({
    id: '',
    imgUrl: '',
    name: '个性化定制产品',
    isShow: false,
    price: 15,
    phone: 'IPhone9'
})

const dialogVisible = ref(false)
let addressDetail = reactive({
    consigneeName: '',
    consigneePhoneNumber: '',
    address: ''
})
const formLabelWidth = '90px'

const user = useUserStore()

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
    totalprice: 0,
    pay: false
})
const submitForm = async () => {
    myOrder.user = user.$state
    myOrder.consigneeName = addressDetail.consigneeName
    myOrder.consigneePhoneNumber = addressDetail.consigneePhoneNumber
    myOrder.address = addressDetail.address
    myOrder.totalprice = submitProduct.value.price
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
    myCarProduct.product.id = submitProduct.value?.id ?? ''
    myCarProduct.num = 1
    myCarProduct.price = submitProduct.value?.price ?? 0
    myCarProduct.order.id = myOrder.id ?? ''
    await addCarProduct(myCarProduct)
    const data = ref({
        orderid: myCarProduct.order.id
    })
    router.push({
        path: '/order',
        query: data.value
    })

}
const submitSucceess: UploadProps['onSuccess'] = async (
    response,
    upload
) => {
    submitProduct.value.imgUrl = `http://localhost:3000/static/product/bigImg/${response.data.message ?? ''}`
    submitProduct.value.id = (await addProduct(submitProduct.value)).data.productId
    dialogVisible.value = true

}




</script>


<style lang='less'>
.canvas-container {
    width: 700px;
    margin: auto;

    .button-area {
        margin-bottom: 40px;
    }

    .col {
        position: relative;

        .box {
            position: absolute;
            left: -50px;

            span {
                display: none;
            }

            .tl {

                width: 8px;
                height: 8px;
                position: absolute;
                background: rgb(230, 46, 46);
                cursor: nwse-resize;
                z-index: 10;
                // left: 20px;
                // top: 10px;
            }

            .tr {

                width: 8px;
                height: 8px;
                position: absolute;
                background: rgb(230, 46, 46);
                cursor: ne-resize;
                z-index: 10;
            }

            .bl {

                width: 8px;
                height: 8px;
                position: absolute;
                background: rgb(230, 46, 46);
                cursor: ne-resize;
                z-index: 10;

            }

            .br {

                width: 8px;
                height: 8px;
                position: absolute;
                background: rgb(230, 46, 46);
                cursor: nwse-resize;
                z-index: 10;
            }
        }
    }

    // .canvas {
    //     // background-color: red;
    //     // position: absolute;
    // }

    .canvas2 {
        background-color: green;
        position: absolute;
        left: 0;
    }
}
</style>