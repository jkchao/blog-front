<template>
  <header v-fix>
    <div class="container header font-futura">
        <div class="header-left">
          <div class="logo">
            <nuxt-link to="/">
              <img src="~static/images/logo.png" alt="" width="36">
              三毛
            </nuxt-link>
          </div> 
          <nav>
            <nuxt-link
              v-for="(list, index) in nav"
              :key="index"
              :to="list.path"
              exact>
                <i :class="list.icon"></i>
                <span>{{ list.name }}</span>
            </nuxt-link>
          </nav>
        </div>
        <div class="player">
          <div class="panel">
            <button class="prev-song btn" @click="prevSong" :disabled="!playerState.ready">
              <i class="iconfont icon-music-prev"></i>
            </button>
            <button class="toggle-play btn" @click="togglePlay" :disabled="!playerState.ready">
              <i class="iconfont" :class="[playerState.playing ? 'icon-music-pause' : 'icon-music-play']"></i>
            </button>
            <button class="next-song btn" @click="nextSong" :disabled="!playerState.ready">
              <i class="iconfont icon-music-next"></i>
            </button>
            <button class="muted-toggle btn" @click="toggleMuted" :disabled="!playerState.ready">
              <i class="iconfont" :class="[playerState.muted ? 'icon-music-muted' : 'icon-music-volume']"></i>
            </button>
          </div>
          <div class="song" v-if="currentSong">
            <nuxt-link to="/" 
                       class="link" 
                       :title="`${currentSong.name} / ${currentSong.album.name || 'unknow'}`">
              <span>{{ currentSong.name }}</span>
              <span> By </span>
              <span v-for="(artist, index) in currentSong.artists" :key="index">{{ artist.name }}</span>
              <span> / </span>
              <span>{{ currentSong.album.name || 'unknow' }}</span>
            </nuxt-link>
          </div>
          <div class="song" v-else>Music is the eye of ear.</div>
        </div>
    </div> 
  </header>
</template>

<script>

// import carrousel from '~components/common/carrousel.vue'
import EventBus from '~/utils/event-bus'

export default {
  name: 'header',
  data () {
    return {
      keyword: '',
      open: false,
      nav: [
        { path: '/', name: 'HOME', icon: 'iconfont icon-home'},
        { path: '/code', name: 'CODE', icon: 'iconfont icon-code'},
        { path: '/think', name: 'THINK', icon: 'iconfont icon-read'},
        { path: '/about', name: 'ABOUT', icon: 'iconfont icon-user'},
        { path: '/wall', name: 'WALL', icon: 'iconfont icon-comments'}
      ]
    }
  },

  computed: {
    player () {
      return EventBus.player.player
    },
    playerState () {
      return EventBus.player.playerState
    },
    currentSong () {
      return EventBus.currentSong
    }
  },
  methods: {
    togglePlay() {
      if (this.playerState.ready) {
        this.player.togglePlay()
      }
    },
    toggleMuted() {
      if (this.playerState.ready) {
        this.player.toggleMuted()
      }
    },
    prevSong() {
      if (this.playerState.ready) {
        this.player.prevSong()
      }
    },
    nextSong() {
      if (this.playerState.ready) {
        this.player.nextSong()
      }
    }
  },

  directives: {
    fix: {
      inserted (el) {
        window.addEventListener('scroll', _ => {
          const top = window.pageYOffset
          if (top > 64) el.classList.add('draken')
          else el.classList.remove('draken')
        })
      },
      unbind () {
        window.onscroll = null
      }
    }
  },

  mounted () {
    if (process.browser) {
      const self = this
      const player = EventBus.player
      const play = () => {
        if (player.playerState.ready && player.player && player.player.play) {
          player.player.play()
        } else {
          setTimeout(play, 1666)
        }
      }
      window.addEventListener('load', event => {
        window.setTimeout(() => {
          play()
        }, 1666)
      })
    }
  }
}
</script>

<style lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: $header-height;
  background: $module-bg;
  @include box-shadow(0, 1px, 2px, rgba(0,0,0,.05));

  &:hover {
    background: $white;
  }

  &.draken {
    background: $white;
  }

  >.header {
    display: flex;
    justify-content: space-between;
    height: $header-height;
    line-height: $header-height;

    >.header-left {
      display: flex;

      >.logo{

        a {
          color: $black;
          font-size: 2rem;
        }
      }
    }
  }

  nav {
    margin-left: 2rem;

    >a {
      margin-right: 2rem;
      padding: .5rem;
      color: $disabled;

      >i {
        margin-right: .5rem;
      }

      &:hover {
        color: $black;
      }
    }

    >a.link-active {
      color: $black;
    }
  }

  .player {
    width: 13rem;
    display: flex;
    flex-direction: column;
    align-items: inherit;
    justify-content: center;
    font-size: $font-size-small;
    line-height: $normal-pad;
    @include text-overflow();
    opacity: .4;
  
    &:hover {
      opacity: 1;
    }

    > .panel {
      display: flex;
      justify-content: flex-start;
      margin-bottom: .2rem;

      > .btn {
        margin-right: 1em;
        padding: 0;
        border: 0;

        &:hover {

          > .iconfont {
            color: darken($text, 20%);
          }
        }
      }
    }
    > .song {
      margin-top: .3rem;
      font-size: .8rem;
      @include text-overflow();

      > .link {
        color: $dividers;

        &:hover {
          color: darken($text, 20%);
        }
      }
    }

    .iconfont {
      color: $dividers;
    }

    // .swiper {
    //   height: $header-height;
    //   color: $dividers;

    //   .item {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     height: 100%;

    //     >.saying-content {
    //       text-align: left;
    //     }

    //     >.saying-author {
    //       margin-top: .3rem;
    //       text-align: right;
    //     }
    //   }

    //   &:hover {
    //     color: $black;
    //   }
    // }
  }
}
</style>
