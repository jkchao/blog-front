<template>
  <header v-fix>
    <div class="container header font-futura">
        <div class="header-left">
          <div class="logo">
            <nuxt-link to="/">
              <img src="~static/images/logo.png" alt="" width="36">
            </nuxt-link>
          </div> 
          <nav>
            <nuxt-link
              v-for="(list, index) in nav"
              :key="index"
              :to="list.path"
              exact>
                <!-- <i :class="list.icon"></i> -->
                <span>{{ list.name }}</span>
            </nuxt-link>
          </nav>
        </div>

      <div class="header-right">
        <div
          class="search-box"
          @click="open = true"
          v-click-outside="hide"
          key="1">
          <div class="search" :class="{'open': open}">
            <input
              type="text"
              v-model="keyword"
              placeholder="search..."
              ref="search"
              @keyup.enter="search" 
              :maxlength="10"/>
            <div class="eks" @click.stop="search"></div>
          </div>
        </div>
      </div>


        <!-- <div class="player">
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
            <a href="javascript:;"
                       class="link" 
                       :title="`${currentSong.name} / ${currentSong.album.name || 'unknow'}`">
              <span>{{ currentSong.name }}</span>
              <span> By </span>
              <span v-for="(artist, index) in currentSong.artists" :key="index">{{ artist.name }}</span>
              <span> / </span>
              <span>{{ currentSong.album.name || 'unknow' }}</span>
            </a>
          </div>
          <div class="song" v-else>Music is the eye of ear.</div>
        </div> -->
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
        { path: '/', name: '码农', icon: 'iconfont icon-home'},
        // { path: '/code', name: 'CODE', icon: 'iconfont icon-code'},
        { path: '/think', name: '读书', icon: 'iconfont icon-read'},
        { path: '/fuck', name: '民谣', icon: 'iconfont icon-user'},
        // { path: '/wall', name: 'WALL', icon: 'iconfont icon-comments'},
        // { path: '/download', name: 'DOWNLOAD', icon: 'iconfont icon-download'}
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
      if (!this.open) {
        this.open = true
        return
      }
      this.$router.push(`/search/${this.keyword}`)
      this.open = false
      this.keyword = ''
    },

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
      // const self = this
      // const player = EventBus.player
      // const play = () => {
      //   if (player.playerState.ready && player.player && player.player.play) {
      //     player.player.play()
      //   } else {
      //     setTimeout(play, 1666)
      //   }
      // }
      // window.addEventListener('load', event => {
      //   window.setTimeout(() => {
      //     play()
      //   }, 1666)
      // })
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
    align-items: center;
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
      margin-right: 2.25rem;
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

  .header-right {
    width: 200px;
  }

  .search-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: .5rem;
    width: 100%;
    height: 40px;
    cursor: pointer;
    webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    -o-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);

    >.search {
      position: relative;
      width: 1rem;
      height: 1rem;
      border: 2px solid $dividers;
      @include transition (all .3s ease .15s);
      @include border-radius(.9rem);
      cursor: pointer;

      &::after {
        top: 90%;
        left: 100%;
        width: 5px;
        height: 2px;
        background-color: $dividers;
        border-radius: 1px;
        @include def;        
        @include transition(width .15s ease .45s);
        @include transform(rotate(45deg));
        @include transform-origin(top left);
      }

      >input {
        width: 100%;
        height: 100%;
        font-size: 14px;
        line-height: 38px;
        opacity: 0;
        background-color: transparent;
        color: $text;
        @include transition(opacity .15s ease);
      }

      >.eks {
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

    >input {
      position: absolute;
      padding: .5rem 2.5rem .5rem .5rem; 
      line-height: 1rem;     
      // background: $light-dark;
      opacity: 1;
      @include transition-delay(.05s);
    }

    >.eks {
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
        width: 8px;
        @include transition-delay(.3s);
      }
    }
  }

  // .player {
  //   width: 13rem;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: inherit;
  //   justify-content: center;
  //   font-size: $font-size-small;
  //   line-height: $normal-pad;
  //   @include text-overflow();

  //   > .panel {
  //     display: flex;
  //     justify-content: flex-end;
  //     margin-bottom: .2rem;

  //     > .btn {
  //       margin-right: 1em;
  //       padding: 0;
  //       border: 0;

  //       &:hover {

  //         > .iconfont {
  //           color: $black;
  //         }
  //       }
  //     }
  //   }

  //   > .song {
  //     margin-top: .3rem;
  //     font-size: .8rem;
  //     text-align: right;
  //     @include text-overflow();

  //     > .link {
  //       color: $dividers;

  //       &:hover {
  //         color: $black;
  //       }
  //     }
  //   }

  //   .iconfont {
  //     color: $dividers;
  //   }
  // }
}
</style>
