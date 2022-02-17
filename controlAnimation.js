class AnimationFrameManager {
    constructor(fps = 30, ...fns) {
        this.interval = 1000 / fps  // 连续帧之间间隔（理论）
        this.stop = false  // 停止动画
        this.startTime = Date.now()
        this.timeNow = Date.now()  // 当前时间
        this.timeLast = this.timeNow  // 上一帧时间
        this.delta = 0  // 连续帧之间间隔（实际）
        this.fns = fns
    }

    run() {
        this.step()
        return this
    }

    end() {
        this.stop = true
        return this
    }

    add(fn) {
        this.fns.push(fn)
        return this
    }

    step() {
        this.timeNow = Date.now()
        this.delta = this.timeNow - this.timeLast
        if (this.delta > this.interval) {
            this.timeLast = this.timeNow
            this.fns.forEach(fn => {
                fn()
            })
        }
        if (!this.stop) requestAnimationFrame(this.step.bind(this))
    }


}

export default  AnimationFrameManager
