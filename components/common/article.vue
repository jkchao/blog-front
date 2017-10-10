<template>

    <transition-group tag="div" name="list" class="article-box" :class="{'mobile': mobileLayout}">
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
            <span class="tag" v-if="!mobileLayout"><i class="iconfont icon-category"></i>
              {{
                  item.type === 1
                  ? 'Code'
                  : 'Think'
                }}
            </span>
            <span class="time"><i class="iconfont icon-time"></i>
              {{ 
                item.create_at | dateFormat('yyyy.MM.dd hh:mm')
              }}
            </span>
            <span class="read"><i class="iconfont icon-icon"></i> {{ item.meta.views }}</span>
            <span class="comments"><i class="iconfont icon-comments"></i> {{ item.meta.comments }}</span>
            <span class="like"><i class="iconfont icon-like"></i> {{ item.meta.likes }}</span>
          </div>
        </div>
        <nuxt-link :to="`/article/${item._id}`" v-if="!mobileLayout">
          <img :src="item.thumb" alt="" width="180"/>
        </nuxt-link>
      </div>
      <div class="end-article" v-if="!haveMoreArt" key="-1">
        无更多文章
      </div>
      <div class="loading-more end-article " v-if="haveMoreArt" key="-2">
        <a href="javascript:;" @click="$emit('loadMore')" v-if="!fetch" class="allow">加载更多</a>
        <a href="javascript:;" v-if="fetch" class="not-allow">加载中</a>
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
  width: 48.5rem;
  margin: 0 auto;

  >.article-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $normal-pad;
    padding: $normal-pad;
    background: $module-bg;
    cursor: pointer;

    &:hover {
      color: $black;
      background: lighten($module-hover-bg, 60%);

      .title {
        color: $black;
      }
    }

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
          justify-content: space-between;
          
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
        min-height: 3rem;
      }

      >.meta {
        display: flex;
        flex-wrap: nowrap;
        margin-top: $sm-pad;
        height: 1rem;
        line-height: 1rem;
        font-size: $font-size-small;

        >span {
          margin-right: 1rem;

          >i {
            margin-right: .2rem;
            vertical-align: text-bottom;
          }
        }

        // .tag-list {
        //   margin-right: .5rem;
        // }

        // .tag-list:last-child {
        //   margin: 0;
        // }
      }
    }
    >a {
      width: 180px;
    }
  }

  .end-article {
    // margin-bottom: $normal-pad;
    padding: $md-pad;
    background: $module-bg;
    text-align: center;
    color: $black;
  }

  &.mobile {
    width: 100%;

    >.end-article {
      margin-bottom: 0;
      padding: 1rem;
    }
  }
}

</style>
