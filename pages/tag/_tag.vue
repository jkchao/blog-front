<template>
  <div class="tag">
    <p class="title"><i class="iconfont icon-tag"></i> {{ tag.name }} </p>
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </div>
</template>
<script>

import articleView from '~components/common/article.vue'

export default {

  name: 'tag',

  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    return store.dispatch('getArtList', params)
  },

  head () {
    return { title: `${this.tag.name} | tag` }
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

    tag () {
      const _id = this.$route.params.tag
      return this.$store.state.tag.data.list.find(item => item._id === _id)
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
        tag: this.$route.params.tag
      })
    }
  }
}
</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';

.tag>.title {
  display: flex;
  align-items: center;
  padding: 0.5rem 0rem;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: normal;
  border-bottom: 1px solid $border-color;

  i {
    margin-right: .5rem;
  }
}
</style>
