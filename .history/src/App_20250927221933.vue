<script setup lang="ts">
import { ref } from 'vue'
import Login from './Login.vue'
import Register from './Register.vue'

const showLogin = ref(false)
const showRegister = ref(false)
</script>

<template>
  <div class="app-bg">
    <div class="center-box">
      <h1>欢迎来到数据分析平台</h1>
      <div class="btn-group">
        <button class="nav-btn" @click="$router.push('/login')">登录</button>
        <button class="nav-btn" @click="$router.push('/register')">注册</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7e967 0%, #a8e063 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.center-box {
  background: rgba(255,255,255,0.85);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(34, 139, 34, 0.2);
  padding: 40px 32px;
  margin-bottom: 32px;
  text-align: center;
}
.btn-group {
  margin-top: 24px;
}
.nav-btn {
  background: linear-gradient(90deg, #f7e967 60%, #a8e063 100%);
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 10px 40px;
  margin: 0 12px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}
.nav-btn:hover {
  background: linear-gradient(90deg, #a8e063 60%, #f7e967 100%);
  transform: scale(1.08);
}
</style>