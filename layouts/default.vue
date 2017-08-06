<template>
  <div>
    <my-header></my-header>
    <background></background>
    <div class="container clearfix">
      <div class="content-left">
        <nuxt></nuxt>
      </div>
      <div class="content-right">
        <asideView></asideView>
      </div>
    </div>
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
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';
.content-left {
  width: 48.5rem;
  float: left;
}

.content-right {
  width: 20rem;
  float: right;
}
</style>
