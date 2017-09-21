<template>
  <section  class="clearfix main">
    <carrousel :option="swiperOption" type="banner" :con="banners" :class="{ mobile: mobileLayout }"></carrousel>
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </section>
</template>
<script>

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
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.current_page
              !== this.$store.state.article.art.pagination.total_page
    }
  },

  components: {
    carrousel,
    articleView
  },

  methods: {
    loadMore () {
      this.$store.dispatch('getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1
      })
    }
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
        padding: $normal-pad / 2;
        // background: lighten($module-hover-bg, 60%);
        color: $black;
        z-index: 999;
        cursor: pointer;

        &:hover {
          background: $module-hover-bg;
        }
      }
    }
  }

  .carrousel.mobile {
    height: 10rem;

    .swiper-title {
      position: absolute;
      right: $normal-pad/2;
      top: $normal-pad/2;
      color: $black;
      z-index: 999;
      cursor: pointer;
    }
  }
}

</style>
