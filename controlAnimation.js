export default function animationFrameManager(fps=30,...fns) {
  const interval = 1000 / fps  // 连续帧之间间隔（理论）
  let stop = false  // 停止动画
  let startTime = Date.now()
  let timeNow = Date.now()  // 当前时间
  let timeLast = timeNow  // 上一帧时间
  let delta = 0  // 连续帧之间间隔（实际）

  const step = () => {
    if (stop) return false
    timeNow = Date.now()
    delta = timeNow - timeLast
    if (timeNow - startTime > 10000) stop = true
    if (delta > interval) {
      timeLast = timeNow
      fns.forEach(fn => {
        fn()
      })
    }
    requestAnimationFrame(step)
  }

  step()
}
