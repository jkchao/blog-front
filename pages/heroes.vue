<template>
  <div class="heroes">
    <div class="head">
      <div class="box">
        <p>EVERYONE IS A HERO.</p>
      </div>
    </div>
    <div class="list" v-for="(list, index) in lists" :key="index">
      <h3 class="name">{{ list.name }}</h3>
      <p class="content">{{ list.content }}</p>
      <div class="info">
        <span class="time"><i class="iconfont icon-time"></i>{{ list.time | dateFormat('yyyy-MM-dd hh:mm')}}</span>
        <span class="icon">
          <a href="javascript:;" target="_blank"><i class="iconfont icon-github"></i></a>
          <a href="javascript:;"><i class="iconfont icon-boke"></i></a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'heroes',

  transition: 'fade',

  head: {
    title: 'Heroes'
  },
  
  data () {
    return {
      lists: [
        { 
          name: 'KChaoJKChaoJKChaoJKChaoJKChao',
          content: '这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月这被禁忌的游戏 一如既往的岁月',
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
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.heroes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1rem;

  >.head {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-column: 1 / 4;
    width: 100%;
    height: 20rem;
    font-size: 1.3rem;
    font-family: Futura;
    color: $black;
    background: $module-bg;

  }

  >.list {
    position: relative;
    padding: $normal-pad;
    height: 14rem;
    background: $module-bg;

    &:hover {
      color: $black;
      background: $module-hover-bg;
    }

    >.name {
      @include text-overflow();
      max-width: 303px;
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
      i {
        margin-right: .3rem;
        vertical-align: text-top;
      }

      a {
        margin: .3rem;
        color: #555;

        i {
          @include transition(all .5s ease);
        }

        &:hover {
          i {
            font-size: 1.35rem;
          }
        }
      }
    }
  }
}

</style>
