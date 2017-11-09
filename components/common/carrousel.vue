<template>
   <div class="carrousel">
    <div v-swiper:mySwiper="option" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="list in con" :key="list">
          <div class="swiper-content">
            <img 
            :src="mobileLayout
            ? list.thumb + '?imageView2/1/w/380/h/140'
            : list.thumb + '?imageView2/1/w/679/h/280'"/>
            <nuxt-link :to="`/article/${list._id}`" class="swiper-title">{{ list.title }}</nuxt-link>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'carrousel',

  props: ['option', 'con'],

  data () {
    return {}
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    } 
  }
}
</script>

<style lang="scss">

  @import '~assets/scss/variable.scss';
  @import '~assets/scss/mixin.scss';

  .carrousel {
    position: relative;
    margin-bottom: $normal-pad;
    height: 100%;
    overflow: hidden;

    >.swiper-pagination-bullet {
      opacity: .5;
    }

    >.swiper-pagination-bullet-active {
      background-color: lighten($black, 20%);
      opacity: 1;
    }
  }
</style>