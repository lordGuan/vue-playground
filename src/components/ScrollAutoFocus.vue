<template>
  <div class="wrapper" ref="wrapper">
    <div class="target" style="position: absolute;top: 300px;right: 0;">
      2012年
    </div>
    <div class="target" style="position: absolute;top: 600px;left: 0;">
      2018年
    </div>
    <div class="target" style="position: absolute;top: 900px;right: 0;">
      2022年
    </div>
    <div class="axios">

    </div>
    <div class="point" ref="point"></div>
  </div>
</template>

<script>
import {debounce} from "lodash";
import Tween from '@tweenjs/tween.js'

/**
 * 随着滚动自然聚焦的动效
 */
export default {
  name: "ScrollAutoFocus",
  data() {
    return {
      innerHeight: 0,
      wrapperOffsetTop: -1,
      oldTop: 0,
      tweenInstance: null
    }
  },
  mounted() {
    this.initTween()
    // 记录目标区域的offsetTop，用于判断是否进入区域
    let ref = this.$refs['wrapper']
    if (ref) {
      this.wrapperOffsetTop = ref.offsetTop
    }

    function updateInnerHeight() {
      this.innerHeight = window.innerHeight
      if (this._scrollHandler) this._scrollHandler()
    }

    this._resizeHandler = updateInnerHeight.bind(this)
    // 先初始化一下窗口高度
    this._resizeHandler()

    window.addEventListener('resize', this._resizeHandler)

    function scrollHandler() {
      let scrollY = window.scrollY
      let middle = scrollY - this.wrapperOffsetTop + this.innerHeight / 2
      // 寻找小球的新位置
      this.scrollPointTo(middle)
      let targets = document.querySelectorAll('.target')
      targets.forEach(e => {
        let diff = Math.abs(middle - e.offsetTop)

        if (diff < 50) {
          let scale = Math.floor((50 - diff) / 5) / 20 + 1
          e.style.setProperty('transform', `scale(${scale})`)
        } else {
          e.style.setProperty('transform', 'scale(1)')
        }
      })
    }

    this._scrollHandler = debounce(scrollHandler.bind(this), 20)
    window.addEventListener('scroll', this._scrollHandler)
  },
  methods: {
    initTween() {
      function update(time) {
        requestAnimationFrame(update)
        Tween.update(time)
      }

      requestAnimationFrame(update)
    },
    scrollPointTo(y) {
      if (this.tweenInstance) this.tweenInstance.stop()
      if (y < 0) y = 0
      if (y > 1000) y = 1000 - 40
      let point = this.$refs['point']
      if (point) {
        let oldY = this.oldTop
        let startP = {top: oldY}
        this.tweenInstance = new Tween.Tween(startP)
            .to({top: y}, 100)
            .easing(Tween.Easing.Exponential.Out)
            .onUpdate(p => {
              point.style.setProperty('top', p.top + 'px')
            }).onStop(p => {
              this.oldTop = p.top
            })
            .onComplete(p => {
              this.oldTop = p.top
            }).start()
      }
    },

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._scrollHandler)
    window.removeEventListener('resize', this._resizeHandler)
  }

}
</script>

<style>
.wrapper {
  position: relative;
  height: 1000px;
  width: 100%;
}

.target {
  text-align: center ;
  border: 1px solid red;
  width: 50%;
  height: 20px;
  transition: all 0.3s ease-in-out;
}

.axios {
  position: absolute;
  width: 10px;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  height: 100%;
  background: red;
}

.point {
  position: absolute;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: green;
  left: 50%;
  transform: translateX(-50%);
}
</style>