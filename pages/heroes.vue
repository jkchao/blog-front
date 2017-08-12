<template>
  <div class="heroes" :class="{'heroes-mobile': mobileLayout}">
    <div class="head font-futura">
      <div class="box">
        <p>EVERYONE IS A HERO.</p>
        <a href="javascript:;" class="join"  @click.stop="open">JOIN!</a>
      </div>
    </div>
    <div class="list" v-for="(list, index) in lists" :key="index">
      <h3 class="name">{{ list.name }}</h3>
      <p class="content">{{ list.content }}</p>
      <div class="info">
        <span class="time"><i class="iconfont icon-time"></i>{{ list.time | dateFormat('yyyy-MM-dd hh:mm')}}</span>
        <span class="icon">
          <a :href="list.github" target="_blank" v-show="list.github !== ''"><i class="iconfont icon-github"></i></a>
          <a :href="list.blog"  target="_blank" v-show="list.blog !== ''"><i class="iconfont icon-boke"></i></a>
        </span>
      </div>
    </div>

    <dialog-com :visible.sync = "show" :class="{'dialog-mobile': mobileLayout}">
      <form>
        <div class="dialog-item name" >
          <span>大名：</span>
          <input type="text" v-model="name" maxlength="40" class="form-item" />
        </div>
        <div class="dialog-item github" >
          <span>GITHUB：</span>
          <input type="text" v-model="github" maxlength="40" placeholder="http:// or https://" class="form-item" />
        </div>
        <div class="dialog-item blog" >
          <span>BLOG：</span>
          <input type="text" v-model="blog" maxlength="40" placeholder="http:// or https://" class="form-item" />
        </div>
        <div class="dialog-item content">
          <span>说点啥？</span>
          <textarea maxlength="200" resize="none" rows="6" placeholder="曾经有一个 BUG 摆在我的面前......" class="form-item" />
        </div>
      </form>
      <div class="footer" slot="foot">
        <button @click="show = false">取消</button>
        <button @click="show = false">确定</button>
      </div>
    </dialog-com>

  </div>
</template>

<script>
import dialogCom from '~components/common/dialog.vue'

export default {
  name: 'heroes',

  transition: 'fade',

  head: {
    title: 'Heroes'
  },

  components: { dialogCom },
  
  data () {
    return {
      show: false,
      name: '',
      github: '',
      blog: '',
      content: '',
      lists: [
        {
          name: 'KChaoJKChaoJKChaoJKChaoJKChao',
          content: '这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月',
          github: 'https://github.com/jkchao',
          blog: 'https://github.com/jkchao',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: 'https://github.com/jkchao',
          blog: 'https://github.com/jkchao',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: 'https://github.com/jkchao',
          blog: '',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: '',
          blog: 'https://github.com/jkchao',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: '',
          blog: 'https://github.com/jkchao',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: '',
          blog: '',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: '',
          blog: '',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: '',
          blog: '',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: 'https://github.com/jkchao',
          blog: '',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: '',
          blog: 'https://github.com/jkchao',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        },
        {
          name: 'JKChao',
          content: '这被禁忌的游戏 一如既往的岁月',
          github: '',
          blog: 'https://github.com/jkchao',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          id: 1
        }
      ]
    }
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },

  methods: {
    open () {
      this.show = true
    }
  }
}
</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.heroes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;

  &.heroes-mobile {
    grid-template-columns: auto;

    >.head {
      grid-column: 1 / 1;
    }
  }

  >.head {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-column: 1 / 4;
    width: 100%;
    height: 20rem;
    font-size: 1.3rem;
    color: $black;
    text-align: center;
    background: $module-bg;

    p {
      margin-bottom: .7rem;
    }

    .join {
      position: relative;
      padding: .5rem 1rem;
      color: $black;
      @include border-radius($xs-pad);
      @include transition(all .5s ease);
      @include transform(perspective(1px) translateZ(0));

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        @include border-radius($xs-pad);
        @include transform(scaleY(0));
        @include transform-origin(50% 0px 0px);
        transition-property: transform;
        transition-duration: 0.5s;
        transition-timing-function: ease-out;
        background: $black;
      }

      &:hover {
        color: white;
        // background: $black;
      }

      &:hover::after {
        transform: scaleY(1);
        transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
      }
    }
  }

  >.list {
    position: relative;
    left: 0;
    top: 0;
    padding: $normal-pad;
    height: 14rem;
    background: $module-bg;
    margin: 0;
    @include css3-prefix('transition', 'all .3s');

    &:hover {
      left: -4px;
      top: -4px;
      box-shadow: 4px 4px 10px 0 rgba(0,0,0,.2);
      color: $black;
      background: $white;
    }

    >.name {
      @include text-overflow();
      max-width: 20rem;
      font-weight: normal;
    }

    >.content {
      margin: 1rem 0;
      height: 60%;
      text-indent: 2em;
    }

    >.info {
      display: flex;
      justify-content: space-between;
      height: 1rem;
      font-size: $font-size-small;
      line-height: 1rem;

      >.time>i {
        margin-right: .3rem;
        vertical-align: text-top;
      }

      a {
        margin: .3rem;
        color: #555;

        >i {
          @include transition(all .5s ease);
        }

        &:hover {
          color: $black;

          i {
            font-size: 1.35rem;
          }
        }
      }
    }
  }
}

.dialog {
  .dialog-item {
    display: grid;
    grid-template-columns: 80px auto;
    margin: .8rem 1.5rem 1rem 0;

    >span {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      text-align: right;
    }

    >.form-item {
      padding: .3rem .5rem;
      border: 1px solid $border-color;
      color: $black;
      @include border-radius(4px);

      &:hover {
        border-color: $form-hover;
      }
    }
  }
  .footer {
    text-align: right;

    >button {
      margin-right: 1.5rem;
    }
  }

  &.dialog-mobile {

    .dialog-item {
      grid-template-columns: 100%;
      margin: 0;
      padding: 0 1rem;

      > span {
        text-align: left;
      }
    }

    .dialog-item.content {
      height: 8rem;
    }
    .footer {
      margin-top: 1rem;
      padding-right: 1rem;
      >button {
        margin: 0 0 0 1.5rem;
      }
    }
  }
}

</style>
