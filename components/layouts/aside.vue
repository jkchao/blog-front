<template>
    <transition-group tag="div" class="aside" name="slide-left">
      <div
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
            @keyup.enter="search">
          <div class="eks" @click.stop="search"></div>
        </div>
      </div>
      <div class="aside-item hot-article" key="2">
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
      <div class="aside-item calendar" key="3">
        <calendar></calendar>
      </div>
      <div class="aside-item aside-tag" key="4">
        <ul class="tag clearfix">
          <li class="tag-item" v-for="item in tag" :key="item.id">
            <nuxt-link to="">
              {{ item.name }}
              <span>( {{ item.num }} )</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition-group>
</template>

<script>
import calendar from '~components/common/calendar.vue'
export default {
  name: 'aside',
  data () {
    return {
      open : false,
      keyword: '',
      articleList: [
        { name: '文章标题',  link: '', id: 1 },
        { name: '文章标题',  link: '', id: 2 },
        { name: '文章标题',  link: '', id: 3 },
        { name: '文章标题',  link: '', id: 4 },
        { name: '文章标题',  link: '', id: 5 },
        { name: '文章标题',  link: '', id: 6 },
        { name: '文章标题',  link: '', id: 6 },
        { name: '文章标题',  link: '', id: 6 },
        { name: '文章标题',  link: '', id: 6 }
      ],
      tag: [
        { name: 'Javascript', num: '10', id: 1 },
        { name: 'Nodejs', num: '10', id: 2 },
        { name: 'Think', num: '10', id: 3 },
        { name: 'Http', num: '3', id: 4 },
        { name: '世界', num: '4', id: 6 },
        { name: '算法', num: '2', id: 7 },
        { name: 'Css', num: '3', id: 8 },
        { name: '工作', num: '3', id: 9 },
        { name: 'Vue', num: '0', id: 10 },
        { name: 'React', num: '10', id: 10 },
        { name: 'Github', num: '10', id: 10 },
        { name: 'HTML5', num: '10', id: 5 }
      ]
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
        top: 90%;
        left: 100%;
        width: 7px;
        height: 3px;
        background-color: $dividers;
        border-radius: 1px;
        @include def;        
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
      background: $light-dark;
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

  .aside-item {
    background: $module-bg;
    margin-bottom: $normal-pad;
  }

  .aside-item.hot-article {


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
          padding: $sm-pad $normal-pad;
          color: $secondary;

          &:hover {
            color: $black;
            background: $module-hover-bg;
          }

          .list-num {
            margin-right: $normal-pad;
            
          }
        }
      }
    }
  }

  .aside-tag {

    .tag {
      padding: .85rem;

      .tag-item {
        float: left;
        margin: .3rem;

        a {
          display: block;
          padding: .4rem .5rem;
          color: $secondary;
          background: $light-dark;

          &:hover {
            color: $black;
            background: $dividers;
          }
        }
      }
    }
  }
</style>
