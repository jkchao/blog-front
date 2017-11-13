<template>
    <div tag="div" class="aside" >
      <!-- <div
        class="aside-item search-box"
        @click="open = true"
        v-click-outside="hide"
        key="1">
        <div class="search" :class="{'open': open}">
          <input
            type="text"
            v-model="keyword"
            placeholder="search..."
            ref="search"
            @keyup.enter="search" 
            :maxlength="10"/>
          <div class="eks" @click.stop="search"></div>
        </div>
      </div> -->
      <div class="aside-item hot-article" key="2">
        <h3 class="title">
          <span>热门文章</span>
          <nuxt-link to="/sitemap">
            <i class="iconfont icon-sitemap"></i>
          </nuxt-link>
        </h3>
        <transition-group tag="div" class="hot-article-list" name="list">
          <p v-for="(list, index) in hotArt" :key="list._id" class="list">
            <nuxt-link 
            :to="`/article/${list._id}`"
            :title="list.title">
              <span class="list-name">{{ list.title }}</span>
            </nuxt-link>
          </p>
        </transition-group>
      </div>
      <!-- <div class="aside-item calendar" key="3">
        <calendar></calendar>
      </div> -->
      <div class="aside-item aside-tag font-futura" key="4">
        <h3 class="title">
          <span>标签</span>
        </h3>
        <ul class="tag clearfix">
          <li class="tag-item" v-for="item in tag" :key="item.id">
            <nuxt-link :to="`/tag/${item._id}`">
              {{ item.name }}
              <span>({{ item.count }})</span>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div 
      class="aside-item aside-tag font-futura aside-fix"  
      key="5"
      v-fix>
        <ul class="tag clearfix">
          <li class="tag-item" v-for="item in tag" :key="item.id">
            <nuxt-link :to="`/tag/${item._id}`">
              {{ item.name }}
              <span>({{ item.count }})</span>
            </nuxt-link>
          </li>
        </ul>
      </div>       

    </div>
</template>

<script>
import calendar from '~components/common/calendar.vue'
export default {
  name: 'aside',
  data () {
    return {
      open : false,
      keyword: ''
    }
  },

  computed: {
    tag () {
      return this.$store.state.tag.data.list
    },
    hotArt () {
      return this.$store.state.article.hotArt.list
    }
  },

  components: { calendar },

  watch: {
    open (val) {
      if (val) {
        this.$refs.search.focus()
      }
    }
  },

  methods: {
    hide () {
      this.open = false
    },
    search () {
      if (!this.open) this.open = true
      this.$router.push(`/search/${this.keyword}`)
      this.open = false
      this.keyword = ''
    }
  },

  directives: {
    fix: {
      inserted (el) {
        window.addEventListener('scroll', _ => {
          const scrollTop = document.documentElement.scrollTop
          if (scrollTop > 900) el.classList.add('fixed')
          else el.classList.remove('fixed')
        })
      },
      unbind () {
        window.onscroll = null
      }
    }
  }
}
</script>

<style scoped lang="scss">

  @import '~assets/scss/variable.scss';
  @import '~assets/scss/mixin.scss';

  .aside-item {
    margin-bottom: $normal-pad;
  }

  .aside-item.hot-article,
  .aside-item.aside-tag {


    >.title {
      display: flex;
      justify-content: space-between;
      padding: $sm-pad 0;
      line-height: 1.5rem;
      font-size: 1rem;
      font-weight: normal;
      border-bottom: 1px solid $border-color;
    }

    >.hot-article-list {
      padding: $sm-pad 0;

      >.list {

        >a {
          display: block;
          color: $secondary;
          padding: $sm-pad;
          @include text-overflow();

          &:hover {
            color: $black;
          }
        }
      }
    }
  }

  .aside-tag {
    margin-bottom: 0;

    >.tag {

      >.tag-item {
        float: left;
        margin: .3rem;

        >a {
          display: block;
          padding: .4rem;
          color: $secondary;
          // background: $light-dark;

          &:hover {
            color: $black;
            // background: $light-dark;
            // text-decoration: underline;
          }
        }
      }
    }
  }

  .aside-fix {
    position: fixed;
    width: 20.5rem;
    top: 1rem;
    transition: all .2s;
    opacity: 0;
    z-index: -1;
    pointer-events: none;

    &.fixed {
      top: 5rem;
      opacity: 1;
      z-index: 5;
      pointer-events: all;
    }
  }
</style>
