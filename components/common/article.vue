<template>
    <transition-group tag="div" name="slide-down" class="article-box" :class="{'mobile': mobileLayout}">
      <div
        class="article-item"
        v-for="item in articleList"
        :key="item._id"
        :class="{'mobile-article': mobileLayout}">
        <div class="content">
          <p class="title"><nuxt-link :to="`/article/${item._id}`">{{ item.title }}</nuxt-link></p>
          <nuxt-link :to="`/article/${item._id}`" v-if="mobileLayout">
            <img :src="item.thumb + '?imageView2/1/w/350/h/180/watermark/2/text/amtjaGFvLmNu/font/Y2FuZGFyYQ==/fontsize/400/fill/I0ZGRkZGRg=='"
            alt=""
            width="100%"
            class="mobil-img"/>
          </nuxt-link>
          <p class="abstrack">{{ item.descript | text(200)}}</p>
          <div class="meta">
            <span class="time" v-if="!mobileLayout">
              {{ 
                item.create_at | dateFormat('yyyy.MM.dd')
              }}
            </span>
            <span class="time" v-else>
              {{ 
                item.create_at | dateFormat('yyyy.MM.dd')
              }}
            </span>
            <span class="hr"></span>
            <span class="read"> {{ item.meta.views }} 次阅读</span>
            <span class="hr"></span>
            <span class="comments"> {{ item.meta.comments }} 条评论</span>
            <span class="hr"></span>
            <span class="like"> {{ item.meta.likes }} 人喜欢</span>
          </div>
        </div>
        <span class="article-line"></span>
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

.article-box {
  width: $container-left;
  margin: 0 auto;

  >.article-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $lg-pad 0 $normal-pad;
    margin-bottom: $xlg-pad;
    color: $black;

    .title {
      margin-bottom: $sm-pad;
      font-size: $font-size-large;
      font-weight: 700;
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
          color: $descript;
        }

        .mobil-img {
          max-width: 100%;
          max-height: 200px;
        }
      }
    }

    >.content {

      >.title {
        @include content-overflow(1);
      }

      >.abstrack {
        margin: 2rem 0;
        min-height: 4rem;
        line-height: 1.8rem;
        color: $text;
        @include content-overflow(3);
      }

      >.meta {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: $sm-pad;
        height: 1rem;
        line-height: 1rem;
        font-size: $font-size-small;
        color: $descript;
      }
    }

    >a {
      display: block;
      width: 10rem;

      >.pc-thumb {
        width: 100%;
        height: 6rem;
        line-height: 6rem;
        overflow: hidden;
      }
    }

    > .article-line {
      position: absolute;
      left: -$mlg-pad;
      bottom: -$mlg-pad;
      width: $xlg-pad * 2;
      height: 1px;
      background: $border-color;
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
