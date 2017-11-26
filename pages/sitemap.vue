<template>
  <div class="sitemap" :class="{'mobile': mobileLayout}">
    <h3 class="title">标签</h3>
    <ul class="tag clearfix">
      <li class="tag-item" v-for="item in tag" :key="item.id">
        <nuxt-link :to="`/tag/${item._id}`">
          {{ item.name }}
          <span>({{ item.count }})</span>
        </nuxt-link>
      </li>
    </ul>

    <h3 class="title sitemap-article">文章</h3>
    <ul class="sitemap-list">
      <li
        class="sitemap-item"
        v-for="(item,index) in list"
        :key="item._id">
        <article>
          <time>
            {{ item.create_at | dateFormat('yyyy.MM.dd') }}
          </time>
          <nuxt-link :to="`/article/${item._id}`">
            {{ item.title }}
          </nuxt-link>
        </article>
      </li>
      <li class="sitemap-item" v-if="list.length === 0">
        暂无文章
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sitemap',

  scrollToTop: true,

  transition: 'fade',

  head: {
    title: 'sitemap'
  },

  fetch ({ store }) {
    return store.dispatch('getSitemap', { page_size: 1000 })
  },

  computed: {
    tag () {
      return this.$store.state.tag.data.list
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    list () {
      return this.$store.state.sitemap.art.list
    }
  }
}
</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.sitemap {
  width: $container-min-width;
  // transform: translateX(($container-width - $container-min-width)/2);
  margin: 0 auto;

  >.title {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;
    border-bottom: 1px solid $border-color;

    &.sitemap-article {
      margin-top: 1rem;
    }
  }

  &.mobile {
    padding: $lg-pad;
    width: 100%;
    transform: translate(0);

    >.sitemap-list {
      padding: .8rem;

      >.sitemap-item {
        padding: .8rem;
      }
    }

    >.tag {
      padding: .8rem;
    }
  }

  >.sitemap-list {
    padding: 1rem 2rem;

    >.sitemap-item {
      padding: 1rem;

      >article {
        position: relative;
        display: flex;
        align-items: center;
        height: 20px;
        line-height: 20px;

        &::before {
          content: " ";
          position: absolute;
          left: 0px;
          top: 6px;
          width: 6px;
          height: 6px;
          margin-left: -4px;
          background: $dividers;
          border-radius: 50%;
        }

        >time {
          margin-left: $md-pad;
          color: $dividers;
          font-size: $font-size-small;

        }

        >a {
          margin-left: $md-pad;
          color: $black;
          @include text-overflow();
        }
      }
    }
  }

  >.tag {
    padding: 1rem 2rem;

    >.tag-item {
      float: left;
      margin: .3rem;

      >a {
        display: block;
        padding: .4rem;
        color: $secondary;

        &:hover {
          color: $black;
        }
      }
    }
  }
}

</style>
