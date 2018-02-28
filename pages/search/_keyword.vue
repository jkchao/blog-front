<template>
  <div class="keyword">

    <p class="title ">
      <span class="title-name"><i class="iconfont icon-search"></i>{{ keyword }}</span>
      <span class="line"></span>
    </p>

    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </div>
</template>
<script>

import articleView from '~/components/common/article'

export default {

  name: 'keyword',

  transition: 'fade',

  scrollToTop: true,

  head() {
    return { title: `${this.keyword} | keyword` }
  },

  fetch ({ store, params }) {
    return store.dispatch('getArtList', params)
  },

  data () {
    return {}
  },

  components: {
    articleView
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    keyword () {
      return this.$route.params.keyword
    },

    list () {
      return this.$store.state.article.art.list
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.current_page
              !== this.$store.state.article.art.pagination.total_page
    }
  },

  methods: {
    loadMore () {
      this.$store.dispatch('getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        keyword: this.keyword
      })
    }
  }
}
</script>

<style scoped lang="scss">

.keyword > .title {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0rem;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: normal;

  i {
    margin-right: .5rem;
  }

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
</style>
