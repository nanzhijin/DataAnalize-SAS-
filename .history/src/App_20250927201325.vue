<script setup lang="ts">
import { ref } from 'vue'
import Login from './Login.vue'
import Register from './Register.vue'

const showLogin = ref(false)
const showRegister = ref(false)
</script>

<template>
  <h1>You did it!</h1>
  <button @click="showLogin = true">登录</button>
  <button @click="showRegister = true">注册</button>

  <Login v-if="showLogin" @close="showLogin = false" />
  <Register v-if="showRegister" @close="showRegister = false" />
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>
