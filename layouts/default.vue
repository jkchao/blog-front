<template>
  <div>
    <my-header />
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
const MyFooter = () => import('~components/footer.vue')
const myHeader = () => import('~components/header.vue')

export default {
  components: {
    MyFooter,
    myHeader
  }
}
</script>

<style lang="scss" scoped>

</style>
