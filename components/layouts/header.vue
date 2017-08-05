<template>
  <header id='header'>
    <div class="container header">
      <!-- <div class="header-left"> -->
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
      <div class="saying">
        <carrousel :option="swiperOption" type="text" :con="saying"></carrousel>
        <!-- <div v-swiper:mySwiper="swiperOption" class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide item" v-for="list in says" :key="list">
              <p class="saying-content">{{ list.content }}</p>
              <p class="saying-author">{{ list.author }}</p>
            </div>
          </div>
        </div> -->
      </div>
    </div> 
  </header>
</template>

<script>

import carrousel from '~components/common/carrousel.vue'
import saying from '~assets/saying/index.js'
export default {
  name: 'header',
  data () {
    return {
      keyword: '',
      open: false,
      nav: [
        { path: '/', name: 'HOME'},
        { path: '/article', name: 'ARTICLE'},
        { path: '/think', name: 'THINK'},
        { path: '/music', name: 'MUSIC'},
        { path: '/project', name: 'PROJECT'},
        { path: '/about', name: 'ABOUT'}
      ],
      saying,
      swiperOption: {
        direction: 'vertical',
        loop: true,
        autoplay: 5000,
        setWrapperSize: true,
        autoHeight: true,
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        grabCursor: true,
        spaceBetween: 30,
        mousewheelControl: true
      }
    }
  },
  components: { carrousel }
}
</script>

<style lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

#header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: $header-height;
  background: $module-bg;
  @include box-shadow(0, 1px, 2px, rgba(0,0,0,.05));

  .header {
    display: flex;
    justify-content: space-between;
    height: $header-height;
    line-height: $header-height;

    .header-left {
      display: flex;
    }

    .logo{
      a {
        color: $black;
        font-size: 2rem;
      }
    }
  }

  nav {

    a {
      margin-right: 2rem;
      padding: .5rem;
      color: $disabled;

      &:hover {
        color: $black;
      }
    }

    a.link-active {
      color: $black;
    }
  }

  .saying {
    width: 20rem;
    font-size: $font-size-small;
    line-height: 1rem;
    overflow: hidden;

    .swiper {
      height: 100%;
      color: $dividers;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;

        .saying-author {
          margin-top: .3rem;
          text-align: right;
        }
      }

      &:hover {
        color: $black;
      }
    }
  }
}
</style>
