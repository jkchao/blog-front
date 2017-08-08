<template>
  <section  class="think">
    <div class="head">
      <div class="content">
        <p>我走过山时，山不说话，</p>
        <p>我路过海时，海不说话。</p>
      </div>
    </div>
    <div class="article">
      <articleView :articleList = "list"></articleView>
    </div>
  </section>
</template>
<script>

import banner4 from '~static/images/banner4.png'

const articleView = () => import('~components/common/article.vue')

export default {

  scrollToTop: true,

  head: {
    title: 'Think'
  },

  transition: 'fade',

  data () {
    return {
      list: [
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
          tag: 'Think',
          time: new Date().getTime() - 3600 * 1000 * 24 * Math.random() * 10,
          read: ~~(Math.random() * 100),
          comments: ~~(Math.random() * 100),
          like: ~~(Math.random() * 100)
        },
        {
          logo: banner4,
          title: '生活',
          abstrack: '生活，就是一个又一个故事，参杂着一个又一个的人、事、物的故事，一个又一个梦想的故事，的连续剧。 而成都这座城市，闲适又轻慢的城市，又特别的适合温养着无数的故事。甜的咸的，辣的...',
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
  }
}
</script>


<style lang="scss" scoped>

@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.carrousel {
  height: 20rem;
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  margin-bottom: $normal-pad;
  font-size: 1.3rem;
  color: $black;
  background: $module-bg;
}
</style>
