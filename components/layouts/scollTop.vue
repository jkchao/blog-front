<template>
  <transition-group 
    tag="div" 
    name="fade" 
    class="scoll-aside" 
    :class="{ mobile: mobileLayout }"
    v-if="$route.path !== '/'">
    <a 
      href="javascript:;"
      @click="toogleTheme"
      class="scoll-btn theme"
      key="2"
      v-if="!mobileLayout">
        <i
          class="iconfont"
          :class="{
            'icon-dark': theme === 'light',
            'icon-light': theme === 'dark'
          }"
          ></i>
      </a>

    <a class="scoll-btn" @click="scrollTop" v-if="showScroll" key="1">
      <i class="iconfont icon-arrow-up"></i>
    </a>
  </transition-group>
</template>

<script>
export default {
  name: 'scoll',

  data () {
    return {
      showScroll: false,
      theme: ''
    }
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },

  methods: {
    scrollTop () {
      let timer = null
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn () {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = oTop - 150
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    },

    toogleTheme () {
      const isLight = document.body.id === 'light'

      this.theme = isLight ? 'dark' : 'light'

      document.body.id = this.theme
      window.localStorage.setItem('THEME', this.theme)
    }
  },

  mounted () {
    // 滚动条在Y轴上的滚动距离
    function getScrollTop () {
      let scrollTop = 0
      let bodyScrollTop = 0
      let documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
      return scrollTop
    }
    // 浏览器视口的高度
    function getWindowHeight () {
      let windowHeight = window.innerWidth
      return windowHeight
    }
    window.addEventListener('scroll', () => {
      if (getScrollTop() * 2 > getWindowHeight()) {
        this.showScroll = true
      } else this.showScroll = false
    })

    this.theme = window.localStorage.getItem('THEME') || 'light'
  }
}
</script>

<style scoped lang="scss">

.scoll-aside {
  position: fixed;
  right: 0;
  bottom: 8rem;

  >.scoll-btn {
    display: block;
    width: $xlg-pad;
    height: $xlg-pad;
    margin-bottom: .5rem;
    color: #5ab95c;
    background: $module-bg;
    text-align: center;
    line-height: 2.7rem;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.14);
    border-color: 1px solid $border-color;
    cursor: pointer;

    &.theme {
      color: $black;


      i {
        font-size: $font-size-large;
      }
    }

    &.email {
      color: #d9544e
    }
  }

  &.mobile {
    width: 3rem;
    right: 0rem;
    bottom: 3rem;

    >.scoll-btn {
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
    }
  }
}
</style>
