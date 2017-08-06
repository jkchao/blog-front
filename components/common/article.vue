<template>
  <div class="article-box">
    <div class="article-item" v-for="item in articleList" :key="item.id">
      <div class="content">
        <p class="title">{{ item.title }}</p>
        <p class="abstrack">{{ item.abstrack }}</p>
        <div class="meta">{{ item.meta }}</div>
      </div>
      <nuxt-link to="">
        <img :src="article.log" alt="">
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-box',
  props: ['articleList']
}
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.article-box {
  margin-top: $normal-pad;
}

</style>
