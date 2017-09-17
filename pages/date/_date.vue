<template>
  <div class="date">

    <div class="head font-futura" :class="{'mobile': mobileLayout}">
      <div>
        <p><i class="iconfont icon-date"></i></p>
        <p> {{ date }} </p>
      </div>
    </div>

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

  transition: 'slide-down',

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
              === this.$store.state.article.art.pagination.total_page
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
@import '~assets/scss/mixin.scss';

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  color: $black;
  background: $module-bg;
  text-align: center;

  P {
    line-height: 3.5rem;
  }

  i {
    font-size: 3.5rem;    
  }
}

.head.mobile {
  height: 10rem;
  font-size: 2rem;

  p {
    line-height: 2.5rem;
  }

  i {
    font-size: 2.5rem;
  }
}
</style>
