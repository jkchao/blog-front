<template>
  <div class="app">
    <div class="app-aside" v-if="mobileLayout" :class="{ open: mobileSidebar }" v-click-outside="hideSide">
      <mobile-side ></mobile-side>
    </div>
    <div class="app-main" :class="{ open: mobileSidebar }">
      <div class="head-box">
        <mobile-header v-if="mobileLayout"></mobile-header>
        <my-header v-else></my-header>
      </div>
      <background v-if="!mobileLayout"></background>
      <transition-group tag="div" class="container clearfix" name="slide-up" :class="{ 'mobile': mobileLayout }">
        <div
          class="content-left" 
          key="1" 
          :class="{
            'full-page': !isAsdiePage,
            'mobile-layout': mobileLayout
          }">
          <nuxt></nuxt>
        </div>
        <div
        class="content-right" 
        v-if="isAsdiePage && !mobileLayout" 
        key="2">
          <keep-alive>
            <asideView></asideView>
          </keep-alive>
        </div>
      </transition-group>
      <my-footer v-if="!isError"></my-footer>
    </div>
    <scoll-top></scoll-top>
  </div>
</template>

<script id="dsq-count-scr" src="https://jkchao-1.disqus.com/count.js" async></script>

<script>

import myFooter from '~components/layouts/footer.vue'
import myHeader from '~components/layouts/header.vue'
import background from '~components/layouts/background.vue'
import asideView from '~components/layouts/aside.vue'
import scollTop from '~components/layouts/scollTop.vue'

import mobileSide from '~components/mobile/aside.vue'
import mobileHeader from '~components/mobile/header.vue'

export default {
  head () {
    return !this.mobileLayout ? {} : {
      bodyAttrs: {
        class: 'mobile' 
      }
    }
  },

  components: {
    mobileHeader,
    myFooter,
    myHeader,
    background,
    asideView,
    mobileSide,
    scollTop
  },

  computed: {
    isAsdiePage () {
      return this.$store.state.options.isAsidePage
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    mobileSidebar () {
      return this.$store.state.options.mobileSidebar
    },

    isError () {
      return this.$store.state.options.isError
    }
  },

  methods: {
    hideSide () {
      this.$store.commit('options/SET_MOBILE_SIDEBAR', false)
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';


.app {

  >.app-aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    width: 60%;
    background: $white;
    @include css3-prefix('transform', 'translateX(-100%)');
    @include transition(all .3s ease-out);

    >.mobile-aside {
      opacity: 0;      
      @include transition(all .3s ease-out);
      @include css3-prefix('transform', 'scale(.8)');
    }
  }

  >.app-aside.open {
    @include css3-prefix('transform', 'translateX(0)');

    >.mobile-aside {
      opacity: 1;
      @include css3-prefix('transform', 'scale(1)');
    }
  }

  >.app-main {
    @include transition(all .3s ease-out);
  }

  >.app-main.open {
    transform: translateX(60%);
  }
}

.content-left {
  width: 48.5rem;
  float: left;
  // @include css3-prefix(transition, width .4s linear -0.4s);
  @include css3-prefix(transition, all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-left.full-page,
.content-left.mobile-layout {
  width: 100%;
  @include css3-prefix(transition, width .5s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-left.mobile-layout {
  width: 100%;
  margin: 0;
  padding: 1rem;
  padding-top: 4.5rem;
}

.content-right {
  width: 20.5rem;
  float: right;
}

.mobile {
  width: 100%;
}
</style>
