<template>
    <div class="search-area">
        <el-input v-model="search.keyWord" style="width:300px;"></el-input>
        <el-button style="margin-left:10px;" @click="goSearch">搜索</el-button>
        <el-button @click="openDialog" type="primary" style="margin-left:10px;">添加</el-button>
    </div>
    <el-scrollbar>
        <el-table :data="productList" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="150" />
            <el-table-column prop="name" label="商品名" width="120" />
            <el-table-column prop="phone" label="手机型号" width="120" />
            <el-table-column prop="price" label="价格" width="120" />

            <el-table-column prop="date" label="创建日期" width="450" />
            <el-table-column fixed="right" label="操作" width="160">

                <template #default="scope">
                    <el-button link type="primary" size="small" @click="changedialogDetailVisible(scope.row)">详细</el-button>
                    <el-button link type="primary" size="small" @click="changedialogEidtVisible(scope.row)">编辑</el-button>
                    <el-button link type="primary" size="small" @click="goDel(scope.row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>

    <el-dialog v-model="dialogVisible" title="添加" width="50%">
        <el-form :model="EditForm">
            <el-form-item label="商品名" :label-width="formLabelWidth">
                <el-input v-model="EditForm.name" placeholder="请输入商品名" />
            </el-form-item>
            <el-form-item label="手机型号" :label-width="formLabelWidth">
                <el-select v-model="EditForm.phone" filterable allow-create placeholder="选择或填写手机型号" style="width: 240px">
                    <el-option v-for="item in phoneList" :label="item" :value="item" />
                </el-select>
            </el-form-item>

            <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input v-model="EditForm.price" placeholder="请输入商品价格" />
            </el-form-item>

            <el-form-item label="展示图像" :label-width="formLabelWidth">
                <el-upload class="showImg-uploader" action="/api/upload/product/bigimg" method="POST"
                    :show-file-list="false" :on-success="handleShowImgSuccess" :before-upload="beforeUpload">
                    <img v-if="EditForm.imgUrl" :src="EditForm.imgUrl" class="showImg" />
                    <el-icon v-else class="showImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <el-form-item label="轮播图图像" :label-width="formLabelWidth">
                <el-upload class="CarouselImg-uploader" action="/api/upload/product/carimg" method="POST"
                    :show-file-list="false" :on-success="handleCarouselImg1Success" :before-upload="beforeUpload">
                    <img v-if="EditForm.CarouselImg1" :src="EditForm.CarouselImg1" class="CarouselImg" />
                    <el-icon v-else class="CarouselImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-upload class="CarouselImg-uploader" action="/api/upload/product/carimg" method="POST"
                    :show-file-list="false" :on-success="handleCarouselImg2Success" :before-upload="beforeUpload">
                    <img v-if="EditForm.CarouselImg2" :src="EditForm.CarouselImg2" class="CarouselImg" />
                    <el-icon v-else class="CarouselImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-upload class="CarouselImg-uploader" action="/api/upload/product/carimg" method="POST"
                    :show-file-list="false" :on-success="handleCarouselImg3Success" :before-upload="beforeUpload">
                    <img v-if="EditForm.CarouselImg3" :src="EditForm.CarouselImg3" class="CarouselImg" />
                    <el-icon v-else class="CarouselImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="EditForm.description" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"
                    placeholder="请描述一下" />
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

    <el-dialog v-model="dialogDetailVisible" title="详细信息">
        <el-form :model="form">
            <el-form-item label="id" :label-width="formLabelWidth">
                {{ form.id }}
            </el-form-item>

            <el-form-item label="商品名" :label-width="formLabelWidth">
                {{ form.name }}
            </el-form-item>

            <el-form-item label="手机型号" :label-width="formLabelWidth">
                {{ form.phone }}
            </el-form-item>

            <el-form-item label="价格" :label-width="formLabelWidth">
                {{ form.price }}
            </el-form-item>


            <el-form-item label="创建日期" :label-width="formLabelWidth">
                {{ form.date }}
            </el-form-item>

            <el-form-item label="展示图像" :label-width="formLabelWidth">
                <el-image style="width: 100px; height: 100px" :src="form.imgUrl" fit="fill" class="showImg" />
            </el-form-item>

            <el-form-item label="轮播图图像" :label-width="formLabelWidth">
                <el-image style="width: 100px; height: 100px" :src="form.CarouselImg1" fit="fill"
                    class="CarouselImg show" />
                <el-image style="width: 100px; height: 100px" :src="form.CarouselImg2" fit="fill"
                    class="CarouselImg show" />
                <el-image style="width: 100px; height: 100px" :src="form.CarouselImg3" fit="fill"
                    class="CarouselImg show" />

            </el-form-item>

            <el-form-item label="描述" :label-width="formLabelWidth">
                {{ form.description }}
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
            </span>
        </template>
    </el-dialog>


    <el-dialog v-model="dialogEidtVisible" title="编辑">
        <el-form :model="EditForm">
            <el-form-item label="id" :label-width="formLabelWidth">
                {{ EditForm.id }}
            </el-form-item>

            <el-form-item label="商品名" :label-width="formLabelWidth">
                <el-input v-model="EditForm.name" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="手机型号" :label-width="formLabelWidth">
                <el-select v-model="EditForm.phone" placeholder="手机型号编辑">
                    <el-option v-for="item in phoneList" :label="item" :value="item" />
                </el-select>
            </el-form-item>

            <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input v-model="EditForm.price" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="创建日期" :label-width="formLabelWidth">
                {{ EditForm.date }}
            </el-form-item>

            <el-form-item label="展示图像" :label-width="formLabelWidth">
                <el-upload class="showImg-uploader" action="/api/upload/product/bigimg" method="POST"
                    :show-file-list="false" :on-success="handleShowImgSuccess" :before-upload="beforeUpload">
                    <img v-if="EditForm.imgUrl" :src="EditForm.imgUrl" class="showImg" />
                    <el-icon v-else class="showImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <el-form-item label="轮播图图像" :label-width="formLabelWidth">
                <el-upload class="CarouselImg-uploader" action="/api/upload/product/carimg" method="POST"
                    :show-file-list="false" :on-success="handleCarouselImg1Success" :before-upload="beforeUpload">
                    <img v-if="EditForm.CarouselImg1" :src="EditForm.CarouselImg1" class="CarouselImg" />
                    <el-icon v-else class="CarouselImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-upload class="CarouselImg-uploader" action="/api/upload/product/carimg" method="POST"
                    :show-file-list="false" :on-success="handleCarouselImg2Success" :before-upload="beforeUpload">
                    <img v-if="EditForm.CarouselImg2" :src="EditForm.CarouselImg2" class="CarouselImg" />
                    <el-icon v-else class="CarouselImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-upload class="CarouselImg-uploader" action="/api/upload/product/carimg" method="POST"
                    :show-file-list="false" :on-success="handleCarouselImg3Success" :before-upload="beforeUpload">
                    <img v-if="EditForm.CarouselImg3" :src="EditForm.CarouselImg3" class="CarouselImg" />
                    <el-icon v-else class="CarouselImg-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="EditForm.description" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"
                    placeholder="请描述一下" />
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

    <el-dialog v-model="dialogDelVisible" title="Tips" width="30%">
        <span>你确定要删除么</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDelVisible = false">取消</el-button>
                <el-button type="primary" @click="del">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script setup lang='ts'>
import { addProduct, delProduct, getAllProduct, searchProduct, updateProduct } from '@/api';
import { useUserStore } from '@/stores/user';
import { ElMessage, type UploadProps } from 'element-plus';
import { reactive, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
const store = useUserStore()

const search: Query = reactive({
    keyWord: ""
})

let productList = ref<Product[]>([])
let delId = ref<string>()
let phoneList = ref<string[]>([])
let form = reactive({
    id: '',
    name: '',
    phone: '',
    price:0,
    date: '',
    imgUrl: '',
    CarouselImg1: '',
    CarouselImg2: '',
    CarouselImg3: '',
    description: ''
})

let EditForm = reactive({
    id: '',
    name: '',
    phone: '',
    price:0,
    date: '',
    imgUrl: '',
    CarouselImg1: '',
    CarouselImg2: '',
    CarouselImg3: '',
    description: ''
})

const goSearch = async () => {
    productList.value = (await searchProduct(search)).data
}
const resetEditForm = reactive({ ...EditForm })

const openDialog = () => {
    dialogVisible.value = true;
    Object.assign(EditForm, resetEditForm)
}
const init = async () => {
    productList.value = (await getAllProduct()).data
    for (let data of productList.value) {
        if (phoneList.value.includes(data.phone)) continue
        phoneList.value.push(data.phone)
    }

}

init()

const dialogEidtVisible = ref(false)
const dialogDetailVisible = ref(false)
const dialogDelVisible = ref(false)
const dialogVisible = ref(false)

const formLabelWidth = '90px'

const close = () => {
    dialogEidtVisible.value = false
    dialogDetailVisible.value = false
    dialogDelVisible.value = false
    dialogVisible.value = false
    init()
}


const changedialogDetailVisible = (row: any) => {
    dialogDetailVisible.value = true
    form.id = row.id ?? ""
    form.name = row.name ?? ""
    form.phone = row.phone ?? ""
    form.price = row.price ?? ""
    form.date = row.date ?? ""
    form.imgUrl = row.imgUrl ?? ""
    form.CarouselImg1 = row.CarouselImg1 ?? ""
    form.CarouselImg2 = row.CarouselImg2 ?? ""
    form.CarouselImg3 = row.CarouselImg3 ?? ""
    form.description = row.description ?? ""
}

const changedialogEidtVisible = (row: any) => {
    dialogEidtVisible.value = true
    EditForm.id = row.id ?? ""
    EditForm.name = row.name ?? ""
    EditForm.phone = row.phone ?? ""
    EditForm.price = row.price ?? ""
    EditForm.date = row.date ?? ""
    EditForm.imgUrl = row.imgUrl ?? ""
    EditForm.CarouselImg1 = row.CarouselImg1 ?? ""
    EditForm.CarouselImg2 = row.CarouselImg2 ?? ""
    EditForm.CarouselImg3 = row.CarouselImg3 ?? ""
    EditForm.description = row.description ?? ""

}


// const changeAvaterUrl = (url: string) => {
//     EditForm.userAvaterUrl = url
//     // console.log(url)
// }

const handleShowImgSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // console.log(response)
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    EditForm.imgUrl = `http://localhost:3000/static/product/bigImg/${response.data.message ?? ''}`
}



const handleCarouselImg1Success: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // console.log(response)
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    EditForm.CarouselImg1 = `http://localhost:3000/static/product/carImgs/${response.data.message ?? ''}`
}


const handleCarouselImg2Success: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // console.log(response)
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    EditForm.CarouselImg2 = `http://localhost:3000/static/product/carImgs/${response.data.message ?? ''}`
}


const handleCarouselImg3Success: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // console.log(response)
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    EditForm.CarouselImg3 = `http://localhost:3000/static/product/carImgs/${response.data.message ?? ''}`
}






const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('图像必须是jpg格式')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图像大小不能超过2M')
        return false
    }
    return true
}



const submitForm = async () => {
    const myProduct: myProduct = {
    id: '',
    name: '',
    phone: '',
    imgUrl: '',
    CarouselImg1: '',
    CarouselImg2: '',
    CarouselImg3: '',
    description: '',
    price: 0
}
    myProduct.name = EditForm.name
    myProduct.phone = EditForm.phone
    myProduct.imgUrl = EditForm.imgUrl
    myProduct.CarouselImg1 = EditForm.CarouselImg1
    myProduct.CarouselImg2 = EditForm.CarouselImg2
    myProduct.CarouselImg3 = EditForm.CarouselImg3
    myProduct.description = EditForm.description
    myProduct.price = EditForm.price
    if (EditForm.id) {
        myProduct.id = EditForm.id
        console.log(myProduct)
        if ((await updateProduct(myProduct)).data.message === '修改商品数据成功') {
            ElMessage({
                message: '修改商品数据成功',
                type: 'success',
            })
        } else {
            ElMessage.error('修改失败')
        }
        init()
        dialogEidtVisible.value = false
    } else {
        if ((await addProduct(myProduct)).data.message === '商品创建成功') {
            ElMessage({
                message: '创建商品成功',
                type: 'success',
            })
        } else {
            ElMessage.error('创建失败')
        }
        init()
        dialogVisible.value = false
    }
}

const del = async () => {
    if ((await delProduct(delId.value + '')).data.message === '删除商品成功') {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
    } else {
        ElMessage.error('删除失败')
    }
    init()
    dialogDelVisible.value = false
}

const goDel = (row: any) => {
    dialogDelVisible.value = true
    delId.value = row.id
}




</script>




<style lang='less'>
.search-area {
    margin-left: 50px;
    margin-top: 10px;
}

.showImg {
    width: 80px;
    height: 80px;
    display: block;
}

.CarouselImg {
    width: 70px;
    height: 70px;
    display: block;

    &.show {
        margin-right: 10px;
    }
}

.showImg-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin-right: 10px;
}

.showImg-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.showImg-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    text-align: center;
}


.CarouselImg-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin-right: 10px;
}

.CarouselImg-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.CarouselImg-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    text-align: center;
}
</style>