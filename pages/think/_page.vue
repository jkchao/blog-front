<template>
  <section  class="think" >
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        :havePreArt="havePreArt"
        :currentPage="currentPage"
        :currentType="2"></articleView>
    </div>
  </section>
</template>

<script>

const articleView = () => import('~/components/common/article')

export default {
  name: 'think',

  scrollToTop: true,

  head: {
    title: 'Think'
  },

  // transition: 'fade',

  fetch ({ store, params }) {
    return store.dispatch('article/getArtList', {
      type: 2,
      current_page: params.page || 1
    })
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

    currentPage() {
      return this.$store.state.article.art.pagination.current_page
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.current_page
              < this.$store.state.article.art.pagination.total_page
    },

    havePreArt () {
      return this.$store.state.article.art.pagination.current_page !== 1
    }
  },

  components: {
    articleView
  },

  methods: {
    nextPage () {
      this.$store.dispatch('article/getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        type: 1
      })
    },

    prePage () {
      this.$store.dispatch('article/getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page - 1,
        type: 1
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
