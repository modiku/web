<template>
    <div class="login-container">
        <div class="title">
            用户登录
        </div>
        <div class="input-container">

            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="number">
                    <el-input v-model.number="ruleForm.number" />
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    <el-button type="info" @click="toRegist">去注册</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>


<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getUser } from '@/api'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const store = useUserStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const toRegist = () => {
    router.push('/register')
    
}

let user: myUser = reactive({
    number: '',
    password: '',
    name: '',
    authority: 3,
    userAvaterUrl: "",
    description: '',
    orders: []

})




const checkNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    setTimeout(async () => {
        if (value) {
            const data = await getUser(ruleForm.number)
            user = data.data[0] as User ?? {
                number: '',
                password: '',
                name: '',
                authority: 3,
                userAvaterUrl: '',
                description: '',
                orders: []
            }
            if (user.number) {
                callback()
            } else {
                callback('没有该账号')
            }
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        setTimeout(() => {
            if (user.password === value) {
                callback()
            } else {
                callback(new Error('密码输入错误'))
            }
        }, 1000)
    }
}

// const validatePass2 = (rule: any, value: any, callback: any) => {
//     if (value === '') {
//         callback(new Error('Please input the password again'))
//     } else if (value !== ruleForm.pass) {
//         callback(new Error("Two inputs don't match!"))
//     } else {
//         callback()
//     }
//  }

const ruleForm = reactive({
    number: '',
    pass: ''

})

const rules = reactive<FormRules>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    // checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    number: [{ validator: checkNumber, trigger: 'blur' }],
})


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log("登录成功")
            store.name = user.name
            store.number = user.number
            store.authority = user.authority
            store.userAvaterUrl = user.userAvaterUrl
            store.orders = user.orders
            store.description = user.description
            store.password = user.password
            localStorage.clear()
            localStorage.setItem('authority',store.authority+'')
            localStorage.setItem('userId',store.number)
            router.push('/index')
            // localStorage.setItem('userName',store.name)
           

        } else {
            console.log('登陆失败')
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


        // .input-area {
        //     margin-left: 20px;
        //     width: 400px;
        // }

        // .number-area {
        //     margin: auto;
        //     margin-top: 10px;
        //     width: 550px;
        //     display: flex;
        //     line-height: 50px;


        // }

        // .password-area {
        //     margin: auto;
        //     width: 550px;
        //     display: flex;
        //     line-height: 50px;


        // }

        // .button-area {
        //     width: 80px;
        //     margin: auto;
        //     margin-top: 10px;
        // }
    }
}
</style>