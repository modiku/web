<template>
    <el-upload
      class="avatar-uploader"
      action="/api/upload/img"
      method="POST"
      
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      v-if="!props.show">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <div v-if="props.show">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, toRef } from 'vue'
  import { ElMessage, emitChangeFn } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  
  import type { UploadProps } from 'element-plus'
  
 const props = defineProps<{
    userAvaterUrl:any,
    show:boolean
 }>()


 
const emit = defineEmits(['changeUrl'])
const imageUrl = ref(props.userAvaterUrl)
console.log(imageUrl.value)
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
  ) => {

    // console.log(response)
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    imageUrl.value = `http://localhost:3000/static/userAvater/${response.data.message ?? ''}`
    console.log(imageUrl.value)
    emit('changeUrl', imageUrl.value)
  }
  
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!')
      return false
    }
    return true
  }
  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar {
    max-width: 178px;
    max-height: 178px;
    display: block;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  
  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  </style>
  