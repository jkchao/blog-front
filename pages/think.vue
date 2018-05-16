<template>
  <section  class="think" >
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </section>
</template>

<script>

const articleView = () => import('~/components/common/article')


export default {

  scrollToTop: true,

  head: {
    title: 'Think'
  },

  transition: 'fade',

  fetch ({ store }) {
    return store.dispatch('getArtList', { type: 2 })
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
        type: 2
      })
    }
  }
}
</script>


<style lang="scss" scoped>

.think {
  >.title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > .title-name {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;      
    }

    > .line {
      top: 50%;
    }
  }
}
</style>
