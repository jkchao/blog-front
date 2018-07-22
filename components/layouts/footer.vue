<template>
  <footer :class="{'mobile': mobileLayout}" class="">

    <div class="container center">
      <ul class="friends clearfix">
          <a
            v-for="(friend,index) in friends"
            :key="index" 
            :href="friend.url" target="_blank">
              {{ friend.name }}
            <span 
              class="hr"
              v-if="index !== friends.length - 1"
              ></span>
          </a>
      </ul>
    </div>

    <div class="container center">
      <p class="mune">
        <nuxt-link to="/about">我</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/wall">留言墙</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/sitemap">归档</nuxt-link>
      </p>
    </div>

    <!-- <div class="container">
      <p class="icp">
        <time>©{{new Date().getFullYear()}}</time>
        {{ option.icp }}
      </p>
      <div
        class="clearfix">
        <span>Theme</span>
        <span> By
          <nuxt-link to="/about">{{ user.name }}</nuxt-link>
        </span>
      </div>
    </div> -->
  </footer>
</template>
<script>

export default {
  name: 'Mfooter',

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    option () {
      return this.$store.state.options.option
    },

    user () {
      return this.$store.state.options.adminInfo
    },

    friends () {
      return this.$store.state.link.data.list
    }
  }
}

</script>

<style scoped lang="scss">

footer {
  margin-top: $normal-pad;
  padding: $normal-pad 0;
  background: $white;
  border-top: 1px solid $border-color;
  color: $text;

  >.container {
    display: flex;
    justify-content: space-between;

    &.center {
      justify-content: center;
    }

    > ul,
    > .mune {
      padding: $normal-pad / 2 0;
    }

    > .mune {
      padding: $normal-pad / 2 $normal-pad;
      border-top: 1px solid $border-color;
    }
  }

  &.mobile {
    display: none;
    margin-top: 0;
    padding: 0 1rem;

    >.container {
      width: 100%;
    }
  }
}
</style>

