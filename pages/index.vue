<template>
  <section  class="clearfix">
    <carrousel :option="swiperOption" type="banner" :con="banners"></carrousel>
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

const carrousel = () => import('~components/common/carrousel.vue')
const articleView = () => import('~components/common/article.vue')

export default {

  scrollToTop: true,

  transition: 'fade',

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
      banners: [ banner1, banner2, banner3, banner4, banner5 ],
      list: [
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        }
      ]
    }
  },

  components: {
    carrousel,
    articleView
  }

}
</script>


<style lang="scss" scoped>

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.carrousel {
  height: 20rem;
}
</style>
