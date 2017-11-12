<template>
  <div class="about" :class="{'mobile': mobileLayout}">
    <div class="info-box" :class="{'info-mobile': mobileLayout}">
      <div class="info font-futura">
        <div class="list">
          <i class="iconfont icon-user"></i>
          <span class="list-content">Guo Wenchao, <span v-if="!mobileLayout">a 90s boy,</span> Web Engineer.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-like"></i>
          <span class="list-content">Code, read, and music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-music"></i>
          <span class="list-content">Folk and Soft Music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-coffee"></i>
          <span class="list-content">Hello world!</span>
        </div>
        <div class="list">
          <i class="iconfont icon-comments"></i>
          <span class="list-content icons">
            <a href="https://github.com/jkchao" target="_blank"><i class="iconfont icon-github"></i></a>
            <a href="https://juejin.im/user/5858c896128fe1006b86cb51" target="_blank"><i class="iconfont icon-juejin"></i></a>
            <a href="https://weibo.com/5329847417/profile?rightmod=1&wvr=6&mod=personinfo" target="_blank"><i class="iconfont icon-weibo"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-twitter"></i></a>
            <a href="https://segmentfault.com/u/sanmao_58e1f28560e06" target="_blank"><i class="iconfont icon-sf"></i></a>
            <!-- <a href="" target="_blank"><i class="iconfont icon-stackoverflow"></i></a> -->
            <!-- <a href="" target="_blank"><i class="iconfont icon-zhihu"></i></a> -->
            <a href="mailto:jkchaom@gmail.com" target="_blank"><i class="iconfont icon-email"></i></a>
            <a
            href="javascript:;" 
            class="wechat"
            @mouseover="showBox = true"
            @mouseleave="showBox = false"><i class="iconfont icon-wechat"></i></a>
          </span>
          <transition name="fade">
            <div 
            class="wechat-box" 
            v-show="showBox"
            @mouseover="showBox = true"
            @mouseleave="showBox = false">
              <img src="../static/images/code.jpeg" alt="code" width="150px">
              <span class="arrow"></span>
            </div>
          </transition>
        </div>
      </div>
      <div class="user-box">
        <div class="user">
          <img :src="user.gravatar" alt="" width="100%">
        </div>
      </div>
    </div>
    <div class="text-box font-futura">
      <div class="text">
        <p>Too young too simple, sometimes native.</p>
        <p>Have so many new ideas, <br v-if="mobileLayout"/>maybe i will go to relize it.</p>
        <p>Enjoy the present.</p>
        <p>Always on the road.</p>
        <p>All of me in the code and music.</p>
      </div>
    </div>

    <!-- <div
      class="foot"
      v-if="!mobileLayout">
        <div class="foot-box">
          <p>我走过山时，山不说话，</p>
          <p>我路过海时，海不说话。</p>
        </div>
    </div> -->
  </div>
</template>

<script>

export default {

  name: 'about',

  transition: 'fade',

  head: {
    title: 'About'
  },

  data () {
    return {
      showBox:  false
    }
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    user () {
      return this.$store.state.options.adminInfo
    }
  }
}

</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.about {
  margin: 0 auto;
  width: $container-min-width;

  >.info-box {
    // display: grid;
    // grid-template-columns: auto 14rem;
    // grid-gap: 1rem;
    display: flex;
    justify-content: space-between;

    >.info {
      position: relative;
      width: calc(100% - 14rem - 1rem);
      padding: $normal-pad $lg-pad;

      >.list {
        display: flex;
        // display: grid;
        // grid-template-columns: 1rem auto;
        // grid-gap: 1.5rem;
        margin: .5rem;
        padding: 0 1rem;
        height: 36px;
        line-height: 36px;

        i {
          color: $dividers;
        }

        >.list-content {
          margin-left: 1rem;
        }


        span.icons {
          display: flex;

          a {
            margin-right: 1rem;
          }

          i {
            color: $black-light;
            @include transition(all .5s);

            &:hover {
              font-size: 1.3rem;
              color: $black;
            }
          }
        }

        >.wechat-box {
          position: absolute;
          right: 11rem;
          bottom: -10rem;
          padding: .5rem;
          background: lighten($module-hover-bg, 30%);

          >.arrow {
            position: absolute;
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 7px;
            border-style: dashed dashed solid;
            border-color: transparent transparent lighten($module-hover-bg, 30%);
            overflow: hidden;
            font-size: 0;
            line-height: 0;
            vertical-align: top;
            top: -14px;
            left: calc(50% - 3.5px);
          }
        }
      }
    }

    >.user-box {
      background: $module-bg;
      width: 14rem;

      .user {
        padding: 1rem;
        overflow: hidden;

        img {
          max-width: 100%;
          @include border-radius(4px);
        }
      }
    }
  }

  &.mobile {
    width: 100%;

    >.info-box {
      // grid-template-columns: 100%;
      width: 100%;
      flex-direction: column-reverse;

      >.info {
        padding: 1rem;
        width: 100%;

        >.list {
          padding: 0;
          // grid-gap: 1rem;
          @include text-overflow();


          >.wechat-box {
            right: 2.6rem;
          }
        }
      }
      >.user-box {
        // grid-row: 1 / 2;
        width: 100%;
        margin-bottom: 1rem;

        >.user {
          padding: 1.5rem;
        }
      }
    }
    .text-box .text {
      padding: 1.5rem;
    }
  }

  >.text-box {
    margin-top: 1rem;

    >.text {
      padding: 3rem;
      line-height: 2rem;
    }
  }

  >.foot {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 0 0;
    height: 390px;
    background: url('http://ovshyp9zv.bkt.clouddn.com/bg.jpg?imageView2/2/w/700') no-repeat center;
    color: $white;
    font-size: 1.3rem;

    p {
      line-height: 2rem;
    }
  }
}

</style>
