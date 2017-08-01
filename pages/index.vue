<template>
  <section id="index" class="clearfix">
    <div class="content-left">
      <carrousel></carrousel>
    </div>
    <div class="content-right">
      右边内容区域
    </div>
  </section>
</template>

<script>
const carrousel = () => import('~components/common/carrousel.vue')
export default {
  transition: 'fade',
  components: {
    carrousel
  }
}
</script>


<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
#index {
  .content-left {
    width: 48.5rem;
    float: left;
  }

  .content-right {
    width: 20rem;
    float: right;
  }

}
</style>
