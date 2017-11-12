<template>

    <transition-group tag="div" name="slide-down" class="article-box" :class="{'mobile': mobileLayout}">
      <div
        class="article-item"
        v-for="item in articleList"
        :key="item._id"
        :class="{'mobile-article': mobileLayout}"
        @click="$router.push(`/article/${item._id}`)">
        <div class="content">
          <p class="title">{{ item.title }}</p>
          <nuxt-link :to="`/article/${item._id}`" v-if="mobileLayout">
            <img :src="item.thumb" alt="" width="100%" class="mobil-img"/>
          </nuxt-link>
          <p class="abstrack">{{ item.descript | text(200)}}</p>
          <div class="meta">
            <!-- <span class="tag" v-if="!mobileLayout"><i class="iconfont icon-category"></i>
              {{
                  item.type === 1
                  ? 'Code'
                  : 'Think'
                }}
            </span> -->
            <span class="time">
              {{ 
                item.create_at | dateFormat('yyyy.MM.dd hh:mm')
              }}
            </span>
            <span class="hr"></span>
            <span class="read"> {{ item.meta.views }} 人阅读</span>
            <span class="hr"></span>
            <span class="comments"> {{ item.meta.comments }} 条评论</span>
            <span class="hr"></span>
            <span class="like"> {{ item.meta.likes }} 人喜欢</span>
          </div>
        </div>
        <nuxt-link :to="`/article/${item._id}`" v-if="!mobileLayout">
          <div class="pc-thumb">
            <img :src="item.thumb" alt="" width="180"/>
          </div>
        </nuxt-link>
      </div>
      <div class="end-article" v-if="!haveMoreArt" key="-1">
        <i>end</i>
      </div>
      <div class="loading-more end-article " v-if="haveMoreArt" key="-2">
        <a href="javascript:;" @click="$emit('loadMore')" v-if="!fetch" class="allow"><i>more</i></a>
        <a href="javascript:;" v-if="fetch" class="not-allow"><i>loading...</i></a>
      </div>
    </transition-group>

</template>

<script>
export default {
  name: 'article-box',

  props: ['articleList', 'haveMoreArt'],

  computed: {
    fetch () {
      return this.$store.state.article.fetch
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  }
}
</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.article-box {
  width: 48rem;
  margin: 0 auto;

  >.article-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $normal-pad 0;
    cursor: pointer;
    color: $black;
    border-bottom: 1px solid $border-color;

    .title {
      margin-bottom: $sm-pad;
      font-size: $font-size-large;
    }

    &.mobile-article {

      &:hover {
        background: $module-bg;
      }

      >.content {
        width: 100%;
        margin: 0;
        >a {
          display: block;
          margin-bottom: .5rem;
          width: 100%;
        }

        .meta {
          
          color: #969696;
          
          span {
            margin: 0;
          }
        }

        .mobil-img {
          max-width: 100%;
          max-height: 200px;
        }
      }
    }

    >.content {
      margin-right: 1.3rem;

      >.title {
        &:hover {
          text-decoration: underline;
        }
      }

      >.abstrack {
        min-height: 5rem;
        line-height: 1.8rem;
        color: #555555;
      }

      >.meta {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: $sm-pad;
        height: 1rem;
        line-height: 1rem;
        font-size: $font-size-small;
        color: #969696;
      }
    }
    >a {
      display: block;
      width: 12.8rem;

      >.pc-thumb {
        width: 100%;
        height: 6rem;
        line-height: 6rem;
        overflow: hidden;
      }
    }
  }

  .end-article {
    padding: $md-pad 0;
    color: $black;
  }

  &.mobile {
    width: 100%;

    >.end-article {
      margin-bottom: 0;
      padding: 1rem 0;
    }
  }
}

</style>
