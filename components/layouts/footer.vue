<template>
  <footer :class="{'mobile': mobileLayout}" class="">
    <div class="container">
      <p class="mune">
        <nuxt-link to="/about">关于博主</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/wall">留言墙</nuxt-link>
      </p>
      <div
        class="clearfix font-futura">
        <span v-if="mobileLayout">©{{new Date().getFullYear()}}</span>
        <span v-else>BASE ON NUXT + NODE + MONGODB</span>
        <span> BY
          <nuxt-link to="/about">{{ user.name }}</nuxt-link>
        </span>
      </div>
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
  margin-top: $normal-pad;
  height: $header-height;
  line-height: $header-height;
  background: $module-bg;
  border-top: 1px solid $border-color;

  >.container {
    display: flex;
    justify-content: space-between;    
  }

  &.mobile {
    margin-top: 0;
    padding: 0 1rem;

    >.container {
      width: 100%;
    }
  }
}
</style>

