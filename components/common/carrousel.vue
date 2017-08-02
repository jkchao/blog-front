<template>
  <!-- <div id="carrousel" class="carrousel">
    <div v-swiper:mySwiper="swiperOption" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="banner in banners" :key="banner">
          <img :src="banner" width="100%">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div> -->
</template>

<script>
// import banner1 from '~static/images/banner6.jpg'
// import banner2 from '~static/images/banner2.png'
// import banner3 from '~static/images/banner3.png'
// import banner4 from '~static/images/banner4.png'
// import banner5 from '~static/images/banner5.jpg'
// export default {
//   name: 'carrousel',
//   data () {
//     return {
//       banners: [banner1, banner2, banner3, banner4, banner5],
//       swiperOption: {
//         autoplay: 3500,
//         setWrapperSize: true,
//         autoHeight: true,
//         pagination: '.swiper-pagination',
//         paginationClickable: true,
//         mousewheelControl: true,
//         autoplayDisableOnInteraction: false,
//         observeParents: true,
//         grabCursor: true,
//         preloadImages: false,
//         lazyLoading: true
//       }
//     }
//   }
// }
// </script>

// <style scoped lang="scss">
//   @import '~assets/scss/variable.scss';
//   @import '~assets/scss/mixin.scss';

//   .carrousel {
//     height: 20rem;
//     margin-bottom: 1em;
//     position: relative;
//     overflow: hidden;
//     background-color: $module-bg;
//     > .swiper {
//       .item {
//         width: 100%;
//         height: 20em;
//         position: relative;
//         overflow: hidden;
//         > img {
//           width: 100%;
//           @include css3-prefix(transform, rotate(0deg) scale(1));
//           @include css3-prefix(transition, transform 1s);
//         }
//       }
//     }
//   }
// </style>