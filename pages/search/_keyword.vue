<template>
  <div class="keyword">

    <div class="head font-futura" :class="{'mobile': mobileLayout}">
      <div>
        <p><i class="iconfont icon-search"></i></p>
        <p> {{ keyword }} </p>
      </div>
    </div>

    <div class="article">
      <articleView :articleList = "list"></articleView>
    </div>
  </div>
</template>
<script>

import banner4 from '~static/images/banner4.png'
import articleView from '~components/common/article.vue'

export default {

  name: 'keyword',

  transition: 'slide-down',

  head() {
    return { title: `${this.keyword} | keyword` }
  },

  data () {
    return {
      list: [
        {
          logo: banner4,
          title: '生活',
          abstrack: '而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        }
      ]
    }
  },

  components: {
    articleView
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    keyword () {
      return this.$route.params.keyword
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  margin-bottom: 1rem;
  font-size: 3rem;
  color: $black;
  background: $module-bg;
  text-align: center;

  P {
    line-height: 3.5rem;
  }

  i {
    font-size: 3.5rem;    
  }
}

.head.mobile {
  height: 10rem;
  font-size: 2rem;

  p {
    line-height: 2.5rem;
  }

  i {
    font-size: 2.5rem;
  }
}
</style>
