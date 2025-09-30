<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])
const username = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  // 简单校验
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }
  // 调用后端API
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.token)
        emit('close')
      } else {
        error.value = data.message
      }
    })
}
</script>

<template>
  <div class="modal">
    <h2>登录</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <div style="color:red">{{ error }}</div>
    <button @click="handleLogin">登录</button>
    <button @click="$emit('close')">关闭</button>
  </div>
</template>