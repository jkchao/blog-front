<template>
  <div class="app">
    <my-header></my-header>
    <background></background>
    <transition-group tag="div" class="container clearfix" name="slide-up">
      <div class="content-left" key="1" :class="{'full-page': !isAsdiePage}">
        <nuxt></nuxt>
      </div>
      <div class="content-right" v-if="isAsdiePage" key="2">
        <keep-alive>
          <asideView></asideView>
        </keep-alive>
      </div>
    </transition-group>
    <my-footer></my-footer>
  </div>
</template>

<script>
const MyFooter = () => import('~components/layouts/footer.vue')
const myHeader = () => import('~components/layouts/header.vue')
const background = () => import('~components/layouts/background.vue')
const asideView = () => import('~components/layouts/aside.vue')

export default {
  components: {
    MyFooter,
    myHeader,
    background,
    asideView
  },

  computed: {
    isAsdiePage () {
      return this.$store.state.options.isAsidePage
    }
  },

  methods: {
    watchTab () {
      let reallyDocumentTitle
      document.addEventListener('visibilitychange', event => {
        if (event.target.hidden || event.target.webkitHidden) {
          reallyDocumentTitle = document.title
          document.title = '出 BUG 了，快看！'
        } else {
          document.title = reallyDocumentTitle
        }
      }, false)
    }
  },

  mounted () {
    this.watchTab ()
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';
.app {
  position: relative;
}

.content-left {
  width: 48.5rem;
  float: left;
}

.content-left.full-page {
  width: 100%;
  @include css3-prefix(transition, width .5s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-right {
  width: 20.5rem;
  float: right;
}
</style>
