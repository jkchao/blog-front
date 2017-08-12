<template>
  <div class="mobile-aside ">
    <div class="user-head">
      <img src="~static/images/muserFace.jpeg" />
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
        { path: '/think', name: 'THINK', icon: 'iconfont icon-read'},
        { path: '/music', name: 'MUSIC', icon: 'iconfont icon-music'},
        { path: '/about', name: 'ABOUT', icon: 'iconfont icon-user'},
        { path: '/heroes', name: 'HEROES', icon: 'iconfont icon-hero'}
      ]
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
