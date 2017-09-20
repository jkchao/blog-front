<template>
  <footer :class="{'mobile': mobileLayout}">
    <div
      class="container clearfix font-futura">
      ©{{new Date().getFullYear()}}
      <nuxt-link to="/about">{{ user.name }}</nuxt-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',

  computed: {

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    option () {
      return this.$store.state.options.option
    },

    user () {
      return this.$store.state.options.adminInfo
    }
  }

}
</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';

footer {
  margin-top: 1rem;
  height: $header-height;
  line-height: $header-height;
  background: $module-bg;

  >.container {
    text-align: center;
  }

  &.mobile {
    margin-top: 0;

    >.container {
      widows: 100%;;
    }
  }
}
</style>

