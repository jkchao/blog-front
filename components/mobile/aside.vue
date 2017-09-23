<template>
  <div class="mobile-aside">
    <div class="user-head">
      <img :src="user.gravatar + '?imageView2/1/w/200/h/200'" />
      <p>三毛</p>
    </div>
      <nav>
        <li
        v-for="(list, index) in nav"
        :key="index"
        class="nav-list font-futura"
        >
          <nuxt-link
            :to="list.path"
            exact>
              <i :class="list.icon"></i>
              <span>{{ list.name }}</span>
          </nuxt-link>
        </li>

      </nav>
  </div>
</template>

<script>
export default {
  name: 'mobile-aside',
  data () {
    return {
      nav: [
        { path: '/', name: 'HOME', icon: 'iconfont icon-home'},
        { path: '/code', name: 'CODE', icon: 'iconfont icon-code'},
        { path: '/think', name: 'THINK', icon: 'iconfont icon-read'},
        { path: '/about', name: 'ABOUT', icon: 'iconfont icon-user'},
        { path: '/heros', name: 'WALL', icon: 'iconfont icon-message'}
      ]
    }
  },

  computed: {
    user () {
      return this.$store.state.options.adminInfo
    }
  }
}
</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.mobile-aside {

  >.user-head {
    padding: 3.5rem 1rem 1rem 1rem;
    text-align: center;

    >img {
      border-radius: 50%;
      width: 8rem;
    }

    >p {
      margin-top: 1rem;
      color: $black;
      font-size: 1.6rem;
    }
  }
  nav {
    .nav-list {
      padding: 1rem 1rem 1rem 4rem;
    }
    a {
      margin-right: 2rem;
      padding: .5rem;
      color: $disabled;

      i {
        margin-right: .8rem;
      }

      &:hover {
        color: $black;
      }
    }

    a.link-active {
      color: $black;
    }
  }
}

</style>
