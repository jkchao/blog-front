<template>
  <div class="date">
    <p class="title"> {{ date }} </p>

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

  name: 'date',

  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    return store.dispatch('getArtList', params)
  },

  head () {
    return { title: `${this.date} | date` }
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

    date () {
      return this.$route.params.date
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
        date: this.date
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';

.date>.title {
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
