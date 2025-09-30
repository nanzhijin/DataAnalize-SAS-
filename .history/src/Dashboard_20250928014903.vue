<script setup lang="ts">
import { ref, onMounted } from 'vue'

const uploadStatus = ref('')
const username = ref('')

onMounted(() => {
  const token = sessionStorage.getItem('token')
  if (!token) return
  fetch('http://localhost:3000/api/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) username.value = data.username
    })
})

function handleFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return
  const formData = new FormData()
  formData.append('file', files[0])

  const token = sessionStorage.getItem('token')
  fetch('http://localhost:3000/api/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        uploadStatus.value = '上传成功'
      } else {
        uploadStatus.value = '上传失败: ' + data.message
      }
    })
    .catch(() => {
      uploadStatus.value = '上传失败'
    })
}
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h2>欢迎{{ username ? `，${username}` : '' }}！</h2>
      <div>
        <label class="upload-btn">
          上传文件
          <input type="file" style="display:none" @change="handleFileChange" />
        </label>
        <span style="margin-left:16px;color:#7a9c3a;">{{ uploadStatus }}</span>
      </div>
    </div>
    <!-- 其余内容不变 -->
    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-title">文件总量</div>
        <div class="stat-value">12345</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">今日上传</div>
        <div class="stat-value">56</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">分析报表</div>
        <div class="stat-value">8</div>
      </div>
    </div>
    <div class="dashboard-main">
      <div class="chart-area">
        <div class="chart-title">数据趋势图</div>
        <div class="chart-placeholder">[ 图表区域 ]</div>
      </div>
      <div class="table-area">
        <div class="table-title">数据明细</div>
        <table class="data-table">
          <thead>
            <tr>
              <th>编号</th>
              <th>名称</th>
              <th>数值</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>样本A</td>
              <td>100</td>
              <td>2025-09-27</td>
            </tr>
            <tr>
              <td>2</td>
              <td>样本B</td>
              <td>200</td>
              <td>2025-09-27</td>
            </tr>
            <tr>
              <td>3</td>
              <td>样本C</td>
              <td>300</td>
              <td>2025-09-27</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(34,139,34,0.15);
  padding: 36px 32px 32px 32px;
  min-width: 900px;
  min-height: 600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard-header h2 {
  color: #a8e063;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}
.upload-btn {
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
.upload-btn:hover {
  background: linear-gradient(90deg, #a8e063 60%, #f7e967 100%);
  transform: scale(1.08);
}
.dashboard-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 8px;
}
.stat-card {
  flex: 1;
  background: #f7fbe8;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(168,224,99,0.08);
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-title {
  color: #7a9c3a;
  font-size: 1.1rem;
  margin-bottom: 10px;
}
.stat-value {
  color: #b2c94e;
  font-size: 2rem;
  font-weight: bold;
}
.dashboard-main {
  display: flex;
  gap: 32px;
}
.chart-area, .table-area {
  flex: 1;
  background: #f7fbe8;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(168,224,99,0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.chart-title, .table-title {
  color: #7a9c3a;
  font-size: 1.2rem;
  margin-bottom: 16px;
  font-weight: bold;
}
.chart-placeholder {
  flex: 1;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b2c94e;
  font-size: 1.3rem;
  background: #fff;
  border-radius: 8px;
  border: 1px dashed #a8e063;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  font-size: 1rem;
}
.data-table th, .data-table td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid #e0e8d8;
}
.data-table th {
  background: #eaf7d3;
  color: #7a9c3a;
  font-weight: bold;
}
.data-table tr:last-child td {
  border-bottom: none;
}
</style>