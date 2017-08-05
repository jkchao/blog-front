<template>
   <div class="carrousel">
    <div v-swiper:mySwiper="option" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="list in con" :key="list">
          <img :src="list" width="100%" v-if="type === 'banner'">
          <p class="saying-content" v-if="type === 'text'">{{ list.content }}</p>
          <p class="saying-author" v-if="type === 'text'">{{ list.author }}</p>
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
  }
}
</script>

<style scoped lang="scss">
  @import '~assets/scss/variable.scss';
  @import '~assets/scss/mixin.scss';

  .carrousel {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>