<template>
  <div id='aside'>
    <div class="search-box" @click="open = true" v-click-outside="hide">
      <div class="search" :class="{'open': open}">
        <input
          type="text"
          v-model="keyword"
          placeholder="search..."
          ref="search"
          @keyup.enter="search">
        <div class="eks" @click.stop="search"></div>
      </div>
    </div>
    <div class="aside-item hot-article">
      <h3 class="title">热门文章</h3>
      <transition-group tag="div" class="hot-article-list" name="list">
        <p v-for="(list, index) in articleList" :key="list.id" class="list">
          <nuxt-link to="">
            <span class="list-num">{{ index + 1}}</span>
            <span class="list-name">{{ list.name }}</span>
          </nuxt-link>
        </p>
      </transition-group>
    </div>
    <div class="aside-item calendar"></div>
  </div>
</template>

<script>
export default {
  name: 'aside',
  data () {
    return {
      open : false,
      keyword: '',
      articleList: [
        { name: '第一篇文章',  link: '', id: 1 },
        { name: '第一篇文章',  link: '', id: 2 },
        { name: '第一篇文章',  link: '', id: 3 },
        { name: '第一篇文章',  link: '', id: 4 },
        { name: '第一篇文章',  link: '', id: 5 },
        { name: '第一篇文章',  link: '', id: 6 },
        { name: '第一篇文章',  link: '', id: 6 },
        { name: '第一篇文章',  link: '', id: 6 },
        { name: '第一篇文章',  link: '', id: 6 }
      ]
    }
  },
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
    }
  }
}
</script>

<style scoped lang="scss">

  @import '~assets/scss/variable.scss';
  @import '~assets/scss/mixin.scss';

  .search-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem;
    width: 100%;
    height: 40px;
    background: $module-bg;
    cursor: pointer;

    .search {
      position: relative;
      width: 1.8rem;
      height: 1.8rem;
      border: 3px solid $dividers;
      @include transition (all .3s ease .15s);
      @include border-radius(.9rem);
      cursor: pointer;

      &::after {
        @include def;
        top: 90%;
        left: 100%;
        width: 7px;
        height: 3px;
        background-color: $dividers;
        border-radius: 1px;
        @include transition(width .15s ease .55s);
        @include transform(rotate(45deg));
        @include transform-origin(top left);
      }

      input {
        width: 100%;
        height: 100%;
        font-size: 14px;
        line-height: 38px;
        opacity: 0;
        background-color: transparent;
        color: $text;
        @include transition(opacity .15s ease);
      }

      .eks {
        display: block;
        position: absolute;
        top: 50%;
        right: 2px;
        z-index: 20;
        width: 16px;
        height: 16px;
        cursor: pointer;	
        @include transform(translateY(-50%));

        &:before, &:after {
          @include def;
          right: 1px;
          height: 2px;
          width: 0px;
          border-radius: 1px;
          @include transition(all .25s ease);
        }

        &:before {
          top: 0px;
          background-color: $black;
          @include transform(rotate(-45deg));
          @include transform-origin(top right);
          @include transition-delay(.1s);
        }

        &:after {
          bottom: 0px;
          background-color: $black;
          @include transform(rotate(45deg));
          @include transform-origin(bottom right);
          @include transition-delay(0s);
        }
      }
    }
  }

  .search.open {
    width: 100%;
    border: none;
    @include transition-delay(.1s);

    &:after {
      width: 0px;
      @include transition-delay(0s);
    }

    input {
      position: absolute;
      padding: .5rem 2.5rem .5rem .5rem;      
      background: $lastbg;
      opacity: 1;
      @include transition-delay(.05s);
    }

    .eks {
      right: 10px;

      &:before, &:after {
        width: 15px;
      }

      &:before {
        top: 2px;
        right: 0;
        @include transition-delay(.25s);
      }

      &:after {
        right: 10px;
        bottom: 2px;
        width: 10px;
        @include transition-delay(.3s);
      }
    }
  }

  .hot-article {
    margin-top: 1rem;
    background: $module-bg;

    .title {
      padding: 0 $sm-pad;
      line-height: 2.5rem;
      font-size: 1rem;
      font-weight: normal;
      border-bottom: 1px solid #eee;
    }

    .hot-article-list {
      padding: $sm-pad 0;

      .list {
        a {
          display: block;
          padding: $sm-pad 1rem;
          color: $secondary;

          &:hover {
            color: $black;
            background: $lastbg;
          }

          .list-num {
            margin-right: 1rem;
          }
        }
      }
    }
  }
</style>
