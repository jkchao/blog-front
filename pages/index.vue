<template>
  <section  class="clearfix">
    <carrousel :option="swiperOption" type="banner" :con="banners"></carrousel>
    <div class="article"></div>
  </section>
</template>
<script>

import banner1 from '~static/images/banner1.png'
import banner2 from '~static/images/banner2.png'
import banner3 from '~static/images/banner3.png'
import banner4 from '~static/images/banner4.png'
import banner5 from '~static/images/banner5.png'

const carrousel = () => import('~components/common/carrousel.vue')

export default {

  transition: 'fade',

  data () {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        grabCursor: true,
        preloadImages: false,
        lazyLoading: true
      },
      banners: [ banner1, banner2, banner3, banner4, banner5 ]
    }
  },

  components: {
    carrousel
  }

}
</script>


<style lang="scss" scoped>

@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.carrousel {
  height: 20rem;
}
</style>
