<template>
  <section  class="fuck" >
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

const articleView = () => import('~components/common/article.vue')


export default {

  scrollToTop: true,

  head: {
    title: 'Fuck'
  },

  transition: 'fade',

  fetch ({ store }) {
    return store.dispatch('getArtList', { type: 3 })
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


    haveMoreArt () {
      return this.$store.state.article.art.pagination.current_page
              !== this.$store.state.article.art.pagination.total_page
    }
  },

  components: {
    articleView
  },

  methods: {
    loadMore () {
      this.$store.dispatch('getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        type: 3
      })
    }
  }
}
</script>


<style lang="scss" scoped>

@import '~assets/scss/variable.scss';

.fuck {
  >.title {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;
    border-bottom: 1px solid $border-color;
  }
}
</style>
