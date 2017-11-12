<template>
  <section  class="think" >
    <div class="head" :class="{'mobile': mobileLayout}">
      <p class="font-futura">CREATE ART WITH CODE</p>
    </div>
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
    title: 'code'
  },

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
        type: 1,
      })
    }
  }
}
</script>


<style lang="scss" scoped>

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';


.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48rem;
  height: 20rem;
  margin: 0 auto $normal-pad auto;
  font-size: 1.3rem;
  color: $black;
  background: $module-bg;
}

.head.mobile {
  height: 10rem;
  width: 100%;
}
</style>
