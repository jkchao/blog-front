<template>
  <div class="about" :class="{'mobile': mobileLayout}">
    <div class="info-box" :class="{'info-mobile': mobileLayout}">
      <div class="info font-futura">
        <p class="list">
          <i class="iconfont icon-user"></i>
          <span class="list-content">Guo Wenchao, a 90s boy, Web Engineer.</span>
        </p>
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
            <a href="" target="_blank"><i class="iconfont icon-weibo"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-twitter"></i></a>
            <a href="https://segmentfault.com/u/sanmao_58e1f28560e06" target="_blank"><i class="iconfont icon-sf"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-stackoverflow"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-zhihu"></i></a>
          </span>
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
        <p>Have so many new ideas, maybe i will go to relize it.</p>
        <p>Sometimes writing art, but most of the time writing shit.</p>
        <p>Enjoy the present.</p>
        <p>Always on the road.</p>
        <p>All of me in the code and music.</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'about',

  transition: 'fade',

  head: {
    title: 'About'
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
    display: grid;
    grid-template-columns: auto 14rem;
    grid-gap: 1rem;

    >.info {
      padding: $normal-pad $lg-pad;
      background: $module-bg;

      >.list {
        display: grid;
        grid-template-columns: 1rem auto;
        grid-gap: 1.5rem;
        margin: .5rem;
        padding: 0 1rem;
        height: 36px;
        line-height: 36px;

        i {
          color: $dividers;
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
      }
    }

    >.user-box {
      background: $module-bg;

      .user {
        margin: 1rem;
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
      grid-template-columns: 100%;

      >.info {
        padding: 1rem;
        grid-row: 2 / 3;

        >.list {
          width: 100%;
          padding: 0;
          @include text-overflow();
          grid-gap: 1rem;
        }
      }
      >.user-box {
        grid-row: 1 / 2;
      }
    }
    .text-box .text {
      padding: 1rem;
    }
  }
}

.text-box {
  margin-top: 1rem;

  >.text {
    padding: 5rem 10rem;
    background: $module-bg;
    color: $black;
    line-height: 2rem;

  }
}

</style>
