<template>
   <div class="carrousel">
    <div v-swiper:mySwiper="option" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="list in con" :key="list">
          <img :src="mobileLayout ? list.thumb + '?imageView2/2/w/370/h/140' : list.thumb + '?imageView2/2/w/680/h/280'"  v-if="type === 'banner'" />
          <nuxt-link :to="`/article/${list._id}`" class="swiper-title" v-if="type === 'banner'">{{ list.title }}</nuxt-link>
          <p class="saying-content" v-if="type === 'text'">{{ list.content }}</p>
          <p class="saying-author" v-if="type === 'text'">{{ list.auth }}</p>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'carrousel',

  props: ['option', 'type', 'con'],

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