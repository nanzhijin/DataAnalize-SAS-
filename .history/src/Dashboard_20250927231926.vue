<template>
  <div class="dashboard-container">
    <h2>数据分析中心</h2>
    <div class="dashboard-content">
      <div class="widgets">
        <div class="widget">
          <p>图表区域（可集成 ECharts、Chart.js 等）</p>
        </div>
        <div class="widget">
          <p>数据表区域</p>
        </div>
        <div class="widget">
          <button class="upload-btn">上传数据</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(34,139,34,0.15);
  padding: 40px 32px;
  min-width: 800px;
  min-height: 500px;
  margin: 40px auto;
}
h2 {
  color: #a8e063;
  margin-bottom: 24px;
}
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.widgets {
  display: flex;
  gap: 24px;
  margin-top: 16px;
}
.widget {
  flex: 1;
  background: #f7fbe8;
  border-radius: 10px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(168,224,99,0.08);
  flex-direction: column;
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
  margin-top: 12px;
}
.upload-btn:hover {
  background: linear-gradient(90deg, #a8e063 60%, #f7e967 100%);
  transform: scale(1.08);
}
</style>