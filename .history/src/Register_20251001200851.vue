<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL;

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
  fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('注册成功，请登录')
        router.push('/login')
      } else {
        error.value = data.message
      }
    })
}
</script>

<template>
  <div class="form-container">
    <h2>注册</h2>
    <input v-model="username" placeholder="用户名" class="input" />
    <input v-model="password" type="password" placeholder="密码" class="input" />
    <input v-model="confirmPassword" type="password" placeholder="确认密码" class="input" />
    <div class="error">{{ error }}</div>
    <button class="btn" @click="handleRegister">注册</button>
    <p>
      已有账号？
      <router-link to="/login" class="link">去登录</router-link>
    </p>
  </div>
</template>

<style scoped>
.form-container {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(34, 139, 34, 0.2);
  padding: 40px 32px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
}
h2 {
  color: #b2c94e;
  margin-bottom: 24px;
}
.input {
  width: 220px;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #b2c94e;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}
.input:focus {
  border-color: #f7e967;
}
.btn {
  background: linear-gradient(90deg, #f7e967 60%, #a8e063 100%);
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 10px 40px;
  margin-top: 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}
.btn:hover {
  background: linear-gradient(90deg, #a8e063 60%, #f7e967 100%);
  transform: scale(1.05);
}
.link {
  color: #a8e063;
  text-decoration: underline;
  margin-left: 4px;
}
.link:hover {
  color: #f7e967;
}
.error {
  color: #d32f2f;
  min-height: 20px;
  margin-bottom: 8px;
}
</style>