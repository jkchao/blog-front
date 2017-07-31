<template>
  <header id='header'>
    <div class="container header">
      <div class="header-left">
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
      <div class="search-box">
        <div class="search" :class="{'open': open}" @click="open = true">
          <input type="text" v-model="keyword">
          <div class="eks"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      keyword: '',
      open: false,
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
    justify-content: space-between;
    height: $header-height;
    line-height: $header-height;
    .header-left {
      display: flex;
    }
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
  .search-box {
    display: flex;
    align-items: center;
  }
  .search {
    position: relative;
    width: 2rem;
    height: 2rem;
    border: 3px solid $blue;
    @include transition (all .3s ease);
    @include border-radius(1rem);
    cursor: pointer;
    &::after {
      @include def;
      top: 90%;
      left: 90%;
      width: 10px;
      height: 3px;
      background-color: $blue;
      border-radius: 1px;
      @include transition(width .15s ease .55s);
      @include transform(rotate(45deg));
      @include transform-origin(top left);
    }
    input {
      width: 100%;
      height: 100%;
      padding: 0 30px 0 15px;
      font-size: 14px;
      line-height: 38px;
      opacity: 0;
      background-color: transparent;
      color: $text;
      @include transition(opacity .15s ease);
    }
    .eks {
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      z-index: 20;
      width: 30px;
      height: 30px;
      cursor: pointer;	
      @include transform(translateY(-50%));
      &:before, &:after {
        @include def;
        right: 5px;
        height: 2px;
        width: 2px;
        border-radius: 1px;
        @include transition(all .25s ease);
      }
      &:before {
        top: 0px;
        background-color: $blue;
        @include transform(rotate(-45deg));
        @include transform-origin(top right);
        @include transition-delay(.1s);
      }
      &:after {
        bottom: 0px;
        background-color: $blue;
        @include transform(rotate(45deg));
        @include transform-origin(bottom right);
        @include transition-delay(0s);
      }
    }
  }
  .search.open {
    width: 200px;
    @include transition-delay(.1s);
    &:after {
      width: 0px;
      @include transition-delay(0s);
    }
    input {
      position: absolute;
      opacity: 1;
      @include transition-delay(.15s);
    }
    .eks {
      &:before, &:after {
        width: 15px;
        right: 12px;
      }
      &:before {
        top: 9px;
        @include transition-delay(.25s);
      }
      &:after {
        bottom: 9px;
        @include transition-delay(.3s);
      }
    }
  }
}
</style>
