<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 我把接口返回的文件项类型定义了，这样就能把类型不能确定的问题解决。
interface FileItem {
  id: number
  filename: string
  size: number
  upload_time: string
}
const files = ref<FileItem[]>([])
// const files = ref([])
const loading = ref(true)
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL;

onMounted(() => {
  const token = sessionStorage.getItem('token')
  fetch(`${API_URL}/api/file-list`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        files.value = data.files
      } else {
        error.value = data.message || '加载失败'
      }
      loading.value = false
    })
    .catch(() => {
      error.value = '加载失败'
      loading.value = false
    })
})

function handleAnalyze(fileId: number) {
  // 跳转到分析页面，或弹窗等
  alert('分析文件ID: ' + fileId)
}
</script>

<template>
  <div class="files-container">
    <h2>我的文件列表</h2>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <table v-else class="files-table">
      <thead>
        <tr>
          <th>文件名</th>
          <th>大小</th>
          <th>上传时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td>{{ file.filename }}</td>
          <td>{{ (file.size / 1024).toFixed(2) }} KB</td>
          <td>{{ file.upload_time }}</td>
          <td>
            <button @click="handleAnalyze(file.id)">分析</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.files-container {
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(34,139,34,0.15);
  padding: 36px 32px 32px 32px;
  min-width: 700px;
  margin: 40px auto;
}
.files-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  font-size: 1rem;
}
.files-table th, .files-table td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid #e0e8d8;
}
.files-table th {
  background: #eaf7d3;
  color: #7a9c3a;
  font-weight: bold;
}
.files-table tr:last-child td {
  border-bottom: none;
}
button {
  background: linear-gradient(90deg, #f7e967 60%, #a8e063 100%);
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  font-weight: bold;
}
button:hover {
  background: linear-gradient(90deg, #a8e063 60%, #f7e967 100%);
  transform: scale(1.08);
}
</style>