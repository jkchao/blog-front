<template>
  <footer :class="{'mobile': mobileLayout}" class="">
    <div class="container">
      <p class="icp">
        <time>©{{new Date().getFullYear()}}</time>
        {{ option.icp }}
      </p>
      <!-- <p class="mune">
        <nuxt-link to="/about">关于博主</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/wall">留言墙</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/sitemap">归档</nuxt-link>
      </p> -->
      <div
        class="clearfix">
        <span>Theme</span>
        <span> By
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
  },

  created () {
    console.log(this.option.icp)
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

