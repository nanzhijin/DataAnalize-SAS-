<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // 至少8位，含字母和数字

function handleRegister() {
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }
  if (!passwordRule.test(password.value)) {
    error.value = '密码至少8位，包含字母和数字'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = '两次密码不一致'
    return
  }
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        emit('close')
        alert('注册成功，请登录')
      } else {
        error.value = data.message
      }
    })
}
</script>

<template>
  <div class="modal">
    <h2>注册</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <input v-model="confirmPassword" type="password" placeholder="确认密码" />
    <div style="color:red">{{ error }}</div>
    <button @click="handleRegister">注册</button>
    <button @click="$emit('close')">关闭</button>
  </div>
</template>