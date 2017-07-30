<template>
  <div>
    <my-header></my-header>
    <background></background>
    <div class="container">
      <nuxt></nuxt>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
const MyFooter = () => import('~components/layouts/footer.vue')
const myHeader = () => import('~components/layouts/header.vue')
const background = () => import('~components/layouts/background.vue')

export default {
  components: {
    MyFooter,
    myHeader,
    background
  },
  watch: {
    '$route' (to, form, next) {
      console.log(to)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
