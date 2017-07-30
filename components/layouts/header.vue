<template>
  <header id='header'>
    <div class="container header">
      <div class="logo">
        <nuxt-link to="/">
          三毛
        </nuxt-link>
      </div>
      <nav>
        <nuxt-link
          v-for="(list, index) in nav"
          :key="index"
          :to="list.path"
          exact>
            <i class="icon"></i>
            <span>{{ list.name }}</span>
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      nav: [
        { path: '/', name: 'HOME', icon: '' },
        { path: '/article', name: 'ARTICLE', icon: '' },
        { path: '/think', name: 'THINK', icon: '' },
        { path: '/music', name: 'MUSIC', icon: '' },
        { path: '/project', name: 'PROJECT', icon: '' },
        { path: '/about', name: 'ABOUT', icon: '' }
      ]
    }
  }
}
</script>
<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

#header {
  position: fixed;
  top: 0;
  width: 100%;
  height: $header-height;
  background: rgba(255, 255, 255, .4);
  @include box-shadow(0, 1px, 2px, rgba(0,0,0,.05));

  .header {
    display: flex;
    height: $header-height;
    line-height: $header-height;
    .logo a {
      color: $blue;
      font-size: 2rem;
    }
  }
  nav {
    margin-left: 4rem;
    a {
      margin-right: 2rem;
      padding: .5rem;
      color: #555;
      &:hover {
        color: $blue;
      }
    }
    a.link-active {
      color: $blue;
    }
  }
}
</style>
