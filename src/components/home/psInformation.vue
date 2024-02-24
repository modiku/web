<template>
    <el-skeleton style="--el-skeleton-circle-size: 100px" animated :loading="false">
        <template #template>
            <div :style="{
                display: 'flex'
            }">
                <el-skeleton-item variant="circle" />
                <div :style="{
                    width: '15%',
                    display: 'flex',
                    flexDirection: 'column'
                }">
                    <el-skeleton-item variant="text" style="margin-top: 20px; margin-left:40px;" />
                    <el-skeleton-item variant="text" style="margin-top: 10px; margin-left:40px;" />
                    <el-skeleton-item variant="text" style="width: 50%;margin-top: 10px; margin-left:40px;" />

                </div>


            </div>


            <div :style="{
                display: 'flex',
                flexDirection: 'column',
                width: '50%'
            }">
                <el-skeleton-item variant="text" style="margin-top: 20px;" />
                <el-skeleton-item variant="text" style="margin-top: 10px;" />
                <el-skeleton-item variant="text" style="width: 75%;margin-top: 10px;" />
            </div>

        </template>
        <template #default>
            <div :style="{
                display: 'flex'
            }">
                <el-avatar :src="user.userAvaterUrl" class="image multi-content" :size="100" />

                <div :style="{
                    width: '25%',
                    display: 'flex',
                    flexDirection: 'column'
                }">
                    <div style="margin-left:40px; font-size: 25px; color: black;">名字: {{ user.name }}
                    </div>
                    <div style="margin-top: 5px; margin-left:40px; font-size: 20px;">账号: {{ user.number }}</div>
                    <el-tag style="width: 50px; margin-top: 5px; margin-left:40px;">{{ Authority[user.authority] }}</el-tag>


                </div>

                <div>
                    <el-button type="primary" @click="toOrderCenter">订单中心</el-button>
                </div>
            </div>
            <div>
                <el-button type="primary" @click="changeInformation" size="small">修改个人信息</el-button>
            </div>
        </template>
    </el-skeleton>

    <el-dialog v-model="dialogEidtVisible" title="编辑">
        <el-form :model="EditForm">
            <el-form-item label="账号" :label-width="formLabelWidth">
                {{ EditForm.number }}
            </el-form-item>

            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="EditForm.name" placeholder="Please input" />
            </el-form-item>


            <el-form-item label="用户头像" :label-width="formLabelWidth">
                <el-upload class="avatar-uploader" action="/api/upload/user/img" method="POST" :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="EditForm.userAvaterUrl" :src="EditForm.userAvaterUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
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
                <el-button @click="dialogEidtVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { updateUser } from '@/api';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { ElMessage, type UploadProps } from 'element-plus';
import { reactive, ref } from 'vue';

const user = useUserStore()
const Authority: string[] = ['root',
    '管理员',
    '会员',
    '普通用户']

const toOrderCenter = () => {
    router.push('/ordercenter')
}

const dialogEidtVisible = ref(false)

const formLabelWidth = '140px'

let EditForm = reactive({
    number: '',
    name: '',
    authority: 3,
    userAvaterUrl: "",
    description: '',
})
const init = () => {
    EditForm.number = user.number
    EditForm.name = user.name
    EditForm.userAvaterUrl = user.userAvaterUrl ?? ''
    EditForm.description = user.description ?? ''
    EditForm.authority = user.authority
}
init()
const changeInformation = () => {
    dialogEidtVisible.value = true
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {

    // console.log(response)
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    EditForm.userAvaterUrl = `http://localhost:3000/static/userAvater/${response.data.message ?? ''}`
}
const submitForm = async () => {
    if ((await updateUser(EditForm)).data.message === '修改成功') {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        user.number = EditForm.number 
        user.name=EditForm.name 
        user.userAvaterUrl = EditForm.userAvaterUrl
        user.description = EditForm.description

    } else {
        ElMessage.error('修改失败')
    }
    dialogEidtVisible.value = false
}

</script>


<style lang='less'></style>