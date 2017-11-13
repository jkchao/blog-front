<template>
  <section  class="clearfix main">
    <p class="title">最新文章</p>
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
    return store.dispatch('getArtList', { type: 1 })
  },

  data () {
    return {}
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
.main {
  >.title {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    font-size: 1rem;
    font-weight: normal;
    border-bottom: 1px solid $border-color;
  }
}

</style>
