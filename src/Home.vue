<template>
  <div class="center-box">
    <h1>欢迎来到数据分析平台</h1>
    <div class="btn-group">
      <button class="nav-btn" @click="$router.push('/login')">登录</button>
      <button class="nav-btn" @click="$router.push('/register')">注册</button>
    </div>
  </div>
</template>

<style scoped>
.center-box {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(34, 139, 34, 0.2);
  padding: 48px 40px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
}
h1 {
  color: #b2c94e;
  margin-bottom: 32px;
  font-size: 2rem;
  letter-spacing: 2px;
}
.btn-group {
  display: flex;
  gap: 24px;
}
.nav-btn {
  background: linear-gradient(90deg, #f7e967 60%, #a8e063 100%);
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 12px 36px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  font-weight: bold;
}
.nav-btn:hover {
  background: linear-gradient(90deg, #a8e063 60%, #f7e967 100%);
  transform: scale(1.08);
}
</style>