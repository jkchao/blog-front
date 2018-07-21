<template>
  <div class="walls" :class="{'walls-mobile': mobileLayout}">
    <div class="head ">
      <div class="box">
        <a href="javascript:;" class="join"  @click.stop="open">我要上墙</a>
      </div>
    </div>

    <transition-group name="slide-down" tag="div" class="list-box" v-if="!mobileLayout">
      <div class="column" key="1">
        <div
          class="list"
          v-for="list in list0" 
          :key="list._id">
          <h3 class="user">
            <span class="user-name">
              {{ list.create_time | dateFormat('yyyy.MM.dd hh:mm')}}
            </span>
          </h3>
          <div class="content markdown-content" v-html="marked(list.content)"></div>
          <div class="info">
            <span class="time">{{ list.name }}</span>
          </div>
        </div>
      </div>

      <div class="column" key="2">
        <div
          class="list"
          v-for="list in list1" 
          :key="list._id">
          <h3 class="user">
            <span class="user-name">
              {{ list.create_time | dateFormat('yyyy.MM.dd hh:mm')}}
            </span>
          </h3>
          <div class="content markdown-content" v-html="marked(list.content)"></div>
          <div class="info">
            <span class="time">{{ list.name }}</span>
          </div>
        </div>
      </div>

      <div class="column" key="3">
        <div
          class="list"
          v-for="list in list2"
          :key="list._id">
          <h3 class="user">
            <span class="user-name">
              {{ list.create_time | dateFormat('yyyy.MM.dd hh:mm')}}
            </span>
          </h3>
          <div class="content markdown-content" v-html="marked(list.content)"></div>
          <div class="info">
            <span class="time">{{ list.name }}</span>
          </div>
        </div>
      </div>

    </transition-group>

    <transition-group name="slide-down" tag="div" class="list-box" v-else>
        <div class="column" key="1">
          <div
            class="list"
            v-for="list in items" 
            :key="list._id">
            <h3 class="user">
              <span class="user-name">
                {{ list.create_time | dateFormat('yyyy.MM.dd')}}
              </span>
            </h3>
            <div class="content markdown-content" v-html="marked(list.content)"></div>
            <div class="info">
              <span class="time">{{ list.name }}</span>
            </div>
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
          <span>名字：</span>
          <input type="text" placeholder="称呼（非必填）" v-model="form.name" maxlength="20" class="form-item" />
        </div>
        <div class="dialog-item content">
          <span>说点啥？</span>
          <textarea v-model="form.content" maxlength="160" resize="none" rows="4" placeholder="曾经有一个 BUG 摆在我的面前......（支持部分 markdown，必填）" class="form-item" />
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
import markdown from '~/plugins/marked'
import dialogCom from '~/components/common/dialog'
export default {
  name: 'wall',

  transition: 'fade',

  head: {
    title: 'wall'
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
        content: '',
        email: ''
      },

      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
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

    list0 () {
      return this.items.filter((item, n) => n % 3 === 0)
    },

    list1 () {
      return this.items.filter((item, n) => n % 3 === 1)
    },

    list2 () {
      return this.items.filter((item, n) => n % 3 === 2)
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
    // markdown解析服务
    marked(content) {
      return markdown(content, null, false).html
    },

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
      if (this.form.content === '') return alert('说点什么？')
      if (this.form.content.split('\n').length > 12) return alert('内容需在12行以内')
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

.walls {

  &.walls-mobile {
    margin-bottom: 0;

    >.list-box {
      // grid-template-columns: auto;

      >.column {
        width: 100%;
        margin-right: 0;
      }
    }

    >.head {
      // grid-column: 1 / 1;
      height: 5rem;
    }

    >.loading-more {
      padding: 1rem;
    }
  }

  >.head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    width: 12rem;
    height: 5rem;
    font-size: 1.3rem;
    color: $black;
    text-align: center;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

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
      animation: defaultBtnBg 10s ease infinite alternate;

      &:hover {
        color: white;
        // background: $black;
      }

      // &:hover::after {
      //   transform: scaleY(1);
      //   transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
      // }
    }
  }

  .list-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    >.column {
      display: flex;
      flex-direction: column;
      width: calc(100%/3 - 2rem/3);
    }

    .list {
      position: relative;
      left: 0;
      top: 0;
      padding: $normal-pad;
      min-height: 13rem;
      margin-bottom: 1rem;
      color: $black;
      background: $code-bg;
      @include css3-prefix('transition', 'all .3s');

      &:hover {
        box-shadow: 4px 4px 10px 0 rgba(0,0,0,.2);
        transform: translate(-4px, -4px);
      }

      >.user {

        >.user-name {
          max-width: 20rem;
          font-weight: normal;
          font-size: 1rem;

          @include text-overflow();
        }
      }

      >.content {
        margin: 1rem 0;
        min-height: 6rem;
        max-height: 20rem;
        font-size: .85rem;
        word-break: break-all;
        overflow: hidden;
      }

      >.info {
        height: 1rem;
        font-size: $font-size-small;
        line-height: 1rem;
        text-align: right;
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
      background: $module-hover-bg-light-6;
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
    display: flex;
    margin: .8rem 1.5rem 1rem 0;

    >span {
      display: inline-block;
      height: 30px;
      width: 80px;
      line-height: 30px;
      text-align: right;
    }

    >.form-item {
      width: calc(100% - 80px);
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
      // grid-template-columns: 100%;
      flex-wrap: wrap;
      width: 100%;
      margin: 0;
      padding: 0 1rem;

      > span {
        text-align: left;
      }

      >.form-item {
        width: 100%;
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

@keyframes defaultBtnBg {
  0%   {
    color: white;
    background: rgb(179, 151, 217);
  }
  12%  {
    color: white;
    background: rgb(128, 212, 224);
  }
  24%  {
    color: white;
    background: rgb(242, 141, 160);
  }
  36%  {
    color: white;
    background: rgb(97, 95, 245);
  }
  60% {
    color: white;
    background: rgb(133, 181, 240);
  }
  72% {
    color: white;
    background: rgb(229, 262, 110);
  }
  86% {
    color: white;
    background: rgb(148, 194, 165);
  }
  100% {
    color: white;
    background: rgb(123, 194, 172);
  }
}


</style>
