const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  const cpuNum = os.cpus().length
  for (let i = 0; i < cpuNum; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`)
    cluster.fork()
  })
} else {
  require('./app.cjs')
}