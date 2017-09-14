<template>
  <section  class="clearfix main">
    <carrousel :option="swiperOption" type="banner" :con="banners" :class="{ mobile: mobileLayout }"></carrousel>
    <div class="article">
      <articleView :articleList = "list"></articleView>
    </div>
  </section>
</template>
<script>

import banner1 from '~static/images/banner1.png'
import banner2 from '~static/images/banner2.png'
import banner3 from '~static/images/banner3.png'
import banner4 from '~static/images/banner4.png'
import banner5 from '~static/images/banner5.png'

import carrousel from '~components/common/carrousel.vue'
import articleView from '~components/common/article.vue'

export default {

  scrollToTop: true,

  transition: 'fade',

  fetch ({ store }) {
    return store.dispatch('getArtList')
  },

  data () {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        grabCursor: true,
        preloadImages: false,
        lazyLoading: true
      },
      // banners: [ banner1, banner2, banner3, banner4, banner5 ]
    }
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    list () {
      return this.$store.state.article.art.list
    },

    banners () {
      return this.list.slice(0, 9)
    }
  },

  components: {
    carrousel,
    articleView
  }

}
</script>


<style lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';
.main {
  .carrousel {
    height: 20rem;


    .swiper-slide {
      text-align: center;
      position: relative;

      >.swiper-title {
        position: absolute;
        right: $normal-pad;
        top: $normal-pad;
        color: $black;
        z-index: 999;
        cursor: pointer;
      }
    }
  }

  .carrousel.mobile {
    min-height: 8rem;
    height: auto;
  }
}

</style>
