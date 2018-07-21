<template>
  <header v-fix class="darken">
    <div class="header">
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
    </div> 
  </header>
</template>

<script>

import EventBus from '~/utils/event-bus'
import _ from '~/utils/underscore'
export default {
  name: 'Mheader',
  data () {
    return {
      keyword: '',
      open: false,
      nav: [
        // { path: '/all', name: '所有文章', icon: 'iconfont icon-home'},
        { path: '/code', name: '码农', icon: 'iconfont icon-home'},
        { path: '/think', name: '读书', icon: 'iconfont icon-read'},
        { path: '/fuck', name: '民谣', icon: 'iconfont icon-user'}
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
        let beforeScrollTop = document.documentElement.scrollTop || 
                                window.pageYOffset || 
                                window.scrollY ||
                                document.body.scrollTop
        window.addEventListener('scroll', _.throttle(() => {
          let afterScrollTop = document.documentElement.scrollTop || 
                              window.pageYOffset || 
                              window.scrollY ||
                              document.body.scrollTop
          let delta = afterScrollTop - beforeScrollTop
          if (delta === 0 ) return false
          delta > 0
          ? el.classList.add('fixed')
          : el.classList.remove('fixed')
          setTimeout(() => {
            beforeScrollTop = afterScrollTop
          }, 0)
        }, 200))
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

header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: $header-height;
  background: $white;
  transform: translateY(0);

  &:hover {
    background: $white;
  }

  &.fixed {
    transform: translateY(-100%);
  }

  &.darken {    
    @include box-shadow(0, 1px, 2px, rgba(0,0,0,.05));
  }

  >.header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: $container-width;
    height: $header-height;
    padding: 0 $lg-pad;
    line-height: $header-height;

    >.header-left {
      display: flex;

      >.logo{
        position: absolute;
        left: 50%;
        height: $header-height;
        line-height: $header-height;
        @include transform(translateX(-50%));

        a {
          color: $black;
          font-size: 2rem;

          img {
            vertical-align: text-bottom;
          }
        }
      }
    }
  }

  nav {

    >a {
      margin-right: 2.25rem;
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
    @include transform(translate3d(0,0,0));

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
        position: absolute;
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
