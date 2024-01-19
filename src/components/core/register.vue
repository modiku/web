<template>
    <div class="login-container">
        <div class="title">
            用户注册
        </div>
        <div class="input-container">

            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="number">
                    <el-input v-model.number="ruleForm.number" />
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码确认" prop="conPass">
                    <el-input v-model="ruleForm.conPass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    <el-button type="info" @click="">去登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>


<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { addUser, getUser } from '@/api'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const store = useUserStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()

let user: User = reactive({
    name: '',
    password: '',
    number: '',
    authority: 3
})
const ruleForm = reactive({
    number: '',
    pass: '',
    name: '',
    conPass: ''

})
const checkNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    setTimeout(async () => {
        if (value) {
            const data = await getUser(ruleForm.number)
            user = data.data[0] as User ?? {
                name: '',
                password: '',
                number: '',
                authority: 3
            }
            if (user.number) {
                callback(new Error('该账号已存在'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const checkName = (rule: any, value: any, callback: any) => {
    if (value ===  '' ) {
        callback(new Error('请输入用户名'))
    } else {
        callback()
    }
}
const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if( value.length < 6){
        callback(new Error('密码长度小于6位'))
    } 
    else {
        callback()
    }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次密码输入不一致"))
    } else {
        callback()
    }
}




const rules = reactive<FormRules>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    name: [{ validator: checkName, trigger: 'blur' }],
    conPass: [{ validator: validatePass2, trigger: 'blur' }],
    number: [{ validator: checkNumber, trigger: 'blur' }],
})


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {

            user.name = ruleForm.name
            user.password = ruleForm.pass
            user.number = ruleForm.number
            const data = await addUser(user)
            if(data.data.message === '注册成功')
            router.push('/login')
        } else {
            return false
        }
    })

}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>


<style lang='less'>
.login-container {
    display: flex;
    flex-direction: column;

    .title {
        margin: auto;
        font-size: 30px;
        margin-top: 100px;

    }

    .input-container {
        width: 600px;
        margin: auto;
        margin-top: 30px;
    }
}
</style>