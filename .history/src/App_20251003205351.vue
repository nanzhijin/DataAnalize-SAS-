<script setup lang="ts">
import { ref } from 'vue'
import Login from './Login.vue'
import Register from './Register.vue'

const showLogin = ref(false)
const showRegister = ref(false)
const API_URL = import.meta.env.VITE_API_URL || '';
</script>

<template>
  <div class="app-bg">
    <router-view />
  </div>
</template>

<style scoped>
.app-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7e967 0%, #a8e063 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>