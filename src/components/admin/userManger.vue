<template>
    <el-scrollbar>
        <el-table :data="userList" style="width: 100%">
            <el-table-column fixed prop="number" label="账号" width="150" />
            <el-table-column prop="name" label="用户名" width="120" />
            <el-table-column prop="myAuthority" label="权限" width="120" />
            <el-table-column prop="date" label="创建日期" width="800" />
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="changedialogDetailVisible(scope.row)">详细</el-button>
                    <el-button link type="primary" size="small" @click="changedialogEidtVisible(scope.row)">编辑</el-button>
                    <el-button link type="primary" size="small" @click="goDel(scope.row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>

    <el-dialog v-model="dialogDetailVisible" title="详细信息">
        <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
                {{ form.number }}
            </el-form-item>

            <el-form-item label="用户名" :label-width="formLabelWidth">
                {{ form.name }}
            </el-form-item>

            <el-form-item label="权限" :label-width="formLabelWidth">
                {{ form.myAuthority }}
            </el-form-item>

            <el-form-item label="创建日期" :label-width="formLabelWidth">
                {{ form.date }}
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDetailVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>


    <el-dialog v-model="dialogEidtVisible" title="编辑">
        <el-form :model="EditForm">
            <el-form-item label="账号" :label-width="formLabelWidth">
                {{ EditForm.number }}
            </el-form-item>

            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="EditForm.name" placeholder="Please input" />
            </el-form-item>

            <el-form-item label="权限" :label-width="formLabelWidth">
                <el-select v-model="EditForm.myAuthority" placeholder="权限编辑">
                    <el-option label="管理员" value="管理员" />
                    <el-option label="会员" value="会员" />
                    <el-option label="普通用户" value="普通用户" />
                </el-select>
            </el-form-item>

            <el-form-item label="创建日期" :label-width="formLabelWidth">
                {{ EditForm.date }}
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
import { delUser, getAllUser, updateUser } from '@/api';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const store = useUserStore()
let userList = ref<myUser[]>([])
let delNumber = ref<number>()
const Authority: string[] = ['root',
    '管理员',
    '会员',
    '普通用户']
const init = async () => {
    userList.value = (await getAllUser()).data
    for (let data of userList.value) {
        data.myAuthority = Authority[data.authority]
    }
}

init()

const dialogEidtVisible = ref(false)
const dialogDetailVisible = ref(false)
const dialogDelVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    name: '',
    number: '',
    date: '',
    myAuthority: ''
})

const EditForm = reactive({
    name: '',
    number: '',
    date: '',
    myAuthority: '',
    authority: 3
})

const changedialogDetailVisible = (row: any) => {
    dialogDetailVisible.value = true
    form.name = row.name ?? ""
    form.number = row.number ?? ""
    form.date = row.date ?? ""
    form.myAuthority = row.myAuthority ?? ""
}

const changedialogEidtVisible = (row: any) => {
    dialogEidtVisible.value = true
    EditForm.name = row.name ?? ""
    EditForm.number = row.number ?? ""
    EditForm.date = row.date ?? ""
    EditForm.myAuthority = row.myAuthority ?? ""
}



const submitForm = async () => {
    let myUser: User = userList.value.find(user => user.number == EditForm.number) as User
    myUser.name = EditForm.name
    const auNum = Authority.findIndex(tmp => tmp === EditForm.myAuthority)
    if (auNum < 0) {
        return ElMessage.error('修改失败')
    } else {
        if (store.admin.authority > 0) {
            if (auNum <= 1) {
                ElMessage.error('你不是root不能给予管理员权限')
                return
            } else {
                if (myUser.authority <= 1) {
                    ElMessage.error('你不是root不能取消其它管理员权限')
                    return
                }
                myUser.authority = auNum
            }
        } else {
            if(myUser.authority === 0){
                ElMessage.error('不能修改root的权限')
                return
            }
            myUser.authority = auNum
        }
    }

    if ((await updateUser(myUser)).data.message === '修改成功') {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
    } else {
        ElMessage.error('修改失败')
    }
    init()
    dialogEidtVisible.value = false
}

const del = async () => {
    if (userList.value.find(user => user.number == delNumber.value + '')?.authority == 0) {
        dialogDelVisible.value = false
        return ElMessage.error('不能删除root')
    }
    if ((await delUser(delNumber.value + '')).data.message === '删除成功') {
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
    delNumber.value = row.number
}
const handleClick = () => {
    console.log('click')
}



</script>


<style lang='less'></style>