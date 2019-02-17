<template>
  <div
    class="article-thumb">
    <img 
      ref="smallImg"
      :src="smallThumb"
      alt=""
      :class="{
        'img-placeholder': true,
        'loaded': loadingLarge
      }"
      crossorigin="anonymous"
      @load="loadingLarge = true">
    <img 
      v-if="loadingLarge"
      :src="largeThumb"
      alt=""
      :class="{
        loaded: loadedLarge
      }"
      @load="handleLoadLarge">
    <div style="padding-bottom: 47.61%"></div>
  </div>
</template>

<script>
export default {
  name: 'progressiveImage',
  props: ['thumb'],
  data() {
    return {
      loadingLarge: false,
      loadedLarge: false,
      loadedSmall: false
    }
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    largeThumb() {
      return this.mobileLayout
            ? `${this.thumb}?imageView2/1/w/350/h/170/format/webp/q/75|imageslim`
            : `${this.thumb}?imageView2/1/w/630/h/300/format/webp/q/75|imageslim`
    },

    smallThumb() {
      return this.mobileLayout
            ? `${this.thumb}?imageView2/1/w/350/h/170/format/webp/q/1|imageslim`
            : `${this.thumb}?imageView2/1/w/630/h/300/format/webp/q/1|imageslim`

    },
  },

  methods: {
    handleLoadLarge() {
      setTimeout(() => {
        this.loadedLarge = true;
      }, 200);
    }
  }
}
</script>


<style lang="scss" scoped>
.article-thumb {
  background-color: var(--module-bg);
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  margin: $lg-pad 0;
  // padding-top: 47%;

  .img-placeholder {
    filter: blur(8px);
    transform: scale(1);
  }

  img {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    // transition: opacity 1s linear;

    &.loaded {
      opacity: 1;
    }
  }
}
</style>

