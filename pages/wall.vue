<template>
  <div class="heroes" :class="{'heroes-mobile': mobileLayout}">
    <div class="head font-futura">
      <div class="box">
        <p>WANT TO SAY SOMETHING?</p>
        <a href="javascript:;" class="join"  @click.stop="open">COME ON!</a>
      </div>
    </div>

    <transition-group name="slide-down" tag="div" class="list-box">
      <div class="list" v-for="(list, index) in items" :key="list._id">
        <h3 class="name">{{ list.name }}</h3>
        <p class="content">{{ list.content }}</p>
        <div class="info">
          <span class="time"><i class="iconfont icon-time"></i>{{ list.create_time | dateFormat('yyyy.MM.dd hh:mm')}}</span>
          <span class="icon">
            <a :href="list.github" target="_blank" v-show="list.github !== ''"><i class="iconfont icon-github"></i></a>
            <a :href="list.blog"  target="_blank" v-show="list.blog !== ''"><i class="iconfont icon-boke"></i></a>
          </span>
        </div>
      </div>
    </transition-group>

    <div class="loading-more " key="-2" v-if="!haveMore">
      <a href="javascript:;" @click="loadMore" v-if="!fetch" class="allow">加载更多</a>
      <a href="javascript:;" v-if="fetch" class="not-allow">加载中</a>
    </div>

    <dialog-com :visible.sync = "show" :class="{'dialog-mobile': mobileLayout}">
      <form>
        <div class="dialog-item name" >
          <span>大名：</span>
          <input type="text" v-model="form.name" maxlength="20" class="form-item" />
        </div>
        <div class="dialog-item github" >
          <span>GITHUB：</span>
          <input type="text" v-model="form.github" maxlength="40" placeholder="http:// or https://" class="form-item" />
        </div>
        <div class="dialog-item blog" >
          <span>BLOG：</span>
          <input type="text" v-model="form.blog" maxlength="40" placeholder="http:// or https://" class="form-item" />
        </div>
        <div class="dialog-item content">
          <span>说点啥？</span>
          <textarea v-model="form.content" maxlength="200" resize="none" rows="6" placeholder="曾经有一个 BUG 摆在我的面前......" class="form-item" />
        </div>
      </form>
      <div class="footer" slot="foot">
        <button @click="show = false">取消</button>
        <button 
        @click="submit" 
        :disabled="posting">{{ posting ? '提交中...' : '确定'}}</button>
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

  fetch ({ store }) {
    return store.dispatch('getHero')
  },

  components: { dialogCom },
  
  data () {
    return {
      show: false,
      form: {
        name: '',
        github: '',
        blog: '',
        content: ''
      },

      regexs: {
        url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      }
    }
  },
  computed: {

    fetch () {
      return this.$store.state.heros.fetch
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    items () {
      return this.$store.state.heros.data.list
    },

    posting () {
      return this.$store.state.heros.posting
    },

    haveMore () {
      return this.$store.state.heros.data.pagination.current_page
              === this.$store.state.heros.data.pagination.total_page
    }
  },

  methods: {
    open () {
      this.form = Object.assign({}, {
        name: '',
        github: '',
        blog: '',
        content: ''
      })
      this.show = true
    },

    loadMore () {
      this.$store.dispatch('getHero', {
        current_page: this.$store.state.heros.data.pagination.current_page + 1
      })
    },

    async submit () {
      if (this.form.name === '') {
        window.alert('姓名必填')
        return
      }
      if (this.form.content === '') {
        window.alert('说点什么？')
        return
      }
      if (!!this.form.github && !this.regexs.url.test(this.form.github)) {
        return alert('github不合法')
      }
      if (!!this.form.blog && !this.regexs.url.test(this.form.blog)) {
        return alert('blog不合法')
      }
      const res = await this.$store.dispatch('postHero', { ...this.form })
      window.alert(res.message)
      if (res.code === 1) {
        this.show = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.heroes {

  &.heroes-mobile {
    margin-bottom: 0;

    >.list-box {
      grid-template-columns: auto;
    }

    >.head {
      grid-column: 1 / 1;
      height: 10rem;
    }

    >.loading-more {
      padding: 1rem;
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
      text-decoration: underline;
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

  .list-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    margin: 1rem 0 0 0;

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

  >.loading-more {
    margin-top: 1rem;
    padding: $md-pad;
    background: $module-bg;
    text-align: center;
    color: $black;

    &:hover {
      background: lighten($module-hover-bg, 60%);
    }

    >.allow {
      cursor: pointer;
    }

    >.not-allow {
      cursor: not-allowed;
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

      &:focus {
        border-color: $black;
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

    .dialog-body {
      top: 4rem;
    }

    .dialog-item {
      grid-template-columns: 100%;
      margin: 0;
      padding: 0 1rem;

      > span {
        text-align: left;
      }
    }

    // .dialog-item.content {
    //   height: 8rem;
    // }
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
